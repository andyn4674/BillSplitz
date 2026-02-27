// import zod
const { z } = require("zod");

/**
 * Validates the name and phone number of adding a friend
 */
const addFriendSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  phone_number: z.string().min(7, "Invalid phone number").max(20),
});

module.exports = { addFriendSchema };