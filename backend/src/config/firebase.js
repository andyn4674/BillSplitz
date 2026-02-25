/**
 * This file configures the firebase admin
 */

const admin = require('firebase-admin');
const {
  FIREBASE_PROJECT_ID,
  FIREBASE_PRIVATE_KEY,
  FIREBASE_CLIENT_EMAIL,
} = require('./env');

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: FIREBASE_PROJECT_ID,
    privateKey: FIREBASE_PRIVATE_KEY,
    clientEmail: FIREBASE_CLIENT_EMAIL,
  }),
});

module.exports = admin;