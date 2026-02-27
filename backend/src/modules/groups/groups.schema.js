const { z } = require("zod");

const createGroupSchema = z.object({
    name: z.string().min(1, "Group name is required").max(100)
});

const addMemberSchema = z.object({
    friend_id: z.string().min(1, "Invalid friend ID")
});

modules.export = { createGroupSchema, addMemberSchema };