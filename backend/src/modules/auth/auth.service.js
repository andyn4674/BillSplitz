const db = require('../../config/db.js');

// Finds the user in the database or else creates one
exports.findOrCreate = async ({ firebase_uid, name, email, phoneNumber }) => {
    // Finds the user in the database
    const { data: user } = await db
        .from("users")
        .select("*")
        .eq("firebase_uid", firebase_uid)
        .single();
    if(user) return user;

    // Creates a user if not in the database
    const { data: newUser, error } = await db
        .from("users")
        .insert({ firebase_uid, name, email, phoneNumber })
        .select() // "*" by default
        .single();
    if(error) return error;
    return newUser;
};