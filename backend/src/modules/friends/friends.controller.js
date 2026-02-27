const service = require('./friends.service');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/AppError');
const { addFriendSchema } = require('./friends.schema');

exports.getFriends = catchAsync(async(req, res) => {
    const friends = await service.getFriends(req.user.id);
    res.status(200).json({friends});
});

exports.addFriend = catchAsync(async(req, res, next) => {
    const parsed = addFriendSchema.safeParse(req.body);
    if (!parsed.success) {
        return next(new AppError(parsed.error.errors, 400));
    }

    const newFriend = await service.addFriend(req.user.id, parsed.data);
    res.status(201).json({newFriend});
})


exports.deleteFriend = catchAsync(async(req, res) => {
    await service.deleteFriend(req.params.id, req.user.id);
    res.status(200).json({message : "Your friend is gone"})
})