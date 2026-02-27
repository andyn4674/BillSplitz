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
 * 
 * @param {*} userId 
 * @param {*} param1 
 * @returns 
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
 * 
 * @param {*} friendId 
 * @param {*} userId 
 * @returns 
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