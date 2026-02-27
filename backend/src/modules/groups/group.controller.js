const catchAsync = require("../../utils/catchAsync");
const service = require("./groups.service");
const { createGroupSchema, addMemberSchema } = require("./groups.schema");
const AppError = require("../../utils/AppError");

exports.getGroups = catchAsync(async(req, res) => {
    const groups = await service.getGroups(req.user.id);
    res.status(200).json({groups});
})

exports.createGroup = catchAsync(async(req, res, next) => {
    const parsed = createGroupSchema.safeParse(req.body);
    if(!parsed.success) return next(new AppError(parsed.error.errors, 400));

    const newGroup = service.createGroup(req.user.id, parsed.data);
    res.status(201).json({newGroup});
})

exports.deleteGroup = catchAsync(async(req, res) => {
    await service.deleteGroup(req.user.id, req.params.id);
    res.status(200).json({message : "Your group is gone"})
});

exports.addMember = catchAsync(async(req, res, next) => {
    const parsed = addMemberSchema.safeParse(req.body);
    if(!parsed.success) return next(new AppError(parsed.error.errors, 400));

    const newMember = await service.addMember(req.user.id, req.params.id, parsed.data.friend_id);
    res.status(201).json({newMember});
});

exports.removeMember = catchAsync(async(req, res) => {
    await service.removeMember(req.user.id, req.params.id, req.params.friendId);
    res.status(200).json({message : "Member removal successful"})
});