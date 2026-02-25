/**
 * This is the middleware that protects every route: 
 * - reads the token from the request header
 * - verifies it with Firebase
 * - looks up the user in your database
 * - attaches them to req.user.
 */

const admin = require('../config/firebase');
const db = require('../config/db');
const AppError = require('../utils/AppError');

/**
 * Middleware for authentication
 * @param {*} req : request that the user sent in
 * @param {*} res : output of the server
 * @param {*} next : function that tell Express to continue
 * @returns 
 */
module.exports = async (req, res, next) => {
  try {
    // 1. Check the header exists
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next(new AppError('No token provided', 401));
    }

    // 2. Extract the token
    const token = authHeader.split('Bearer ')[1];

    // 3. Verify with Firebase
    const decoded = await admin.auth().verifyIdToken(token);

    // 4. Look up user in your database by firebase_uid
    const { data: user, error } = await db
      .from('users')
      .select('*')
      .eq('firebase_uid', decoded.uid)
      .single();

    if (error || !user) {
      return next(new AppError('User not found, please login again', 401));
    }

    // 5. Attach user to request
    req.user = user;
    next();
  } catch (err) {
    return next(new AppError('Invalid or expired token', 401));
  }
};