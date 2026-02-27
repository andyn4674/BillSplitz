const db = require("../../config/db");
const AppError = require("../../utils/AppError");

exports.getGroups = async (userId) => {
    const { data: groups, error } = await db
        .from('groups')
        .select(`*,
            group_members (
                id,
                friend_id,
                friends (
                    id,
                    name,
                    phone_number
                )
            )`
        )
        .eq("user_id", userId)
        .order("name");

    if (error) throw error;
    return groups;
}

exports.createGroup = async (userId, { name }) => {
    const { data: group, error } = await db
        .from('groups')
        .insert({ "user_id": userId, name })
        .select()
        .single();
    
    if (error) throw error;
    return group;
}

exports.deleteGroup = async (userId, groupId) => {
    const { error } = await db
        .from('groups')
        .delete()
        .eq("user_id", userId)
        .eq("id", groupId);
    if(error) throw error;
    return;
}

exports.addMember = async (userId, groupId, friendId) => {
    const { data: group, error: groupError } = await db
        .from("groups")
        .select("id")
        .eq("id", groupId)
        .eq("user_id", userId)
        .single();
    if(groupError || !group) throw new AppError("Group not found", 404);

    const { data: friend, error: friendError } = await db
        .from("friends")
        .select("id")
        .eq("id", friendId)
        .eq("user_id", userId)
        .single();
    if(friendError || !friend) throw new AppError("Friend not found", 404);

    const { data: addedFriend, error } = await db
        .from("group_members")
        .insert({ "group_id": groupId, "friend_id": friendId })
        .select()
        .single();
    if(error) {
        if(error.code === "23505") {
            throw new AppError("Friend already in group", 400);
        }
        throw error;
    }
    return addedFriend;
}

exports.removeMember = async (userId, groupId, friendId) => {
    const { data: group, error: groupError } = await db
        .from("groups")
        .select("id")
        .eq("user_id", userId)
        .eq("id", groupId)
        .single();
    if(groupError || !group) throw AppError("Group not found", 404);

    const { error } = await db
        .from("group_members")
        .delete()
        .eq("friend_id", friendId)
        .eq("group_id", groupId);
    if(error) throw error;
}