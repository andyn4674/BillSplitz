const service = require("./scan.service");
const catchAsync = require("../../utils/catchAsync");
const AppError = require("../../utils/AppError");
const { base64 } = require("zod");

exports.scanReceipt = catchAsync(async (req, res, next) => {
    if(!req.file) {
        return next(new AppError("No image provided", 400));
    }

    const base64Image = req.file.buffer.toString('base64');
    
    const result = await service.scanReceipt(base64Image);
    res.status(200).json({ receipt: result });
});