const db = require("../../config/db")

/**
 * Get user's friends from the database
 * @param {*} userId current user id
 * @returns friends
 */
exports.getFriends = async (userId) => {
    // make 2 fields called data and error
    const {data: friends, error} = await db
        .from('friends')
        .select()
        .eq("user_id", userId)
        .order("name");
    if (error) return error;

    return friends;
};

/**
 * Add a new friend 
 * @param {*} userId current userId
 * @param {*} param1 friend's name, phone_number 
 * @returns the new friend added
 */
exports.addFriend = async (userId, {name, phone_number}) => {
    const {data: newFriend, error} = await db
        .from('friends')
        .insert({'user_id': userId, name, phone_number})
        .select()
        .single();

    if (error) return error;
    return newFriend;
};

/**
 * Delete a friend
 * @param {*} friendId friend's id
 * @param {*} userId current user's id
 * @returns void
 */
exports.deleteFriend = async (friendId, userId) => {
    const {error} = await db
        .from('friends')
        .delete()
        .eq('id', friendId)
        .eq('user_id', userId);

    if (error) return error;
    return;
};