const catchAsync = require("../../utils/catchAsync");
const admin = require("../../config/firebase");
const service = require("./auth.service")
const AppError = require('../../utils/AppError');

// Authenicates a user token from a request
exports.verify = catchAsync(async (req, res, next) => {
    // fetches the authorization information from the request
    const authHeader = req.headers.authorization;

    // error if no header in request
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return next(new AppError("No token provided", 401));
    }

    // finds the token and decodes it
    const token = authHeader.split("Bearer ")[1];
    const decoded = await admin.auth().verifyIdToken(token);

    // Finds the user in the database based on the decoded token or creates a new one
    const user = await service.findOrCreate({ 
        firebase_uid: decoded.id,
        name: decoded.name || "",
        email: decoded.email || "",
        phoneNumber: decoded.phoneNumber || null
     });
     // Returns the user to the response
     res.status(200).json({ user });
})