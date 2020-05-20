const multer = require('multer');
const sharp = require('sharp');

const factory = require('./factoryGenerator');
const catchAsyncC = require('./../utils/catchAsync')

// Image upload generating
const multerFilter = (req: any, file: any, cb: Function) => {
	if (file.mimetype.startsWith('image')) {
		cb(null, true);
	} else {
		cb(new AppError('Not an image, please upload only images', 400), false);
	}
};
const multerStorage = multer.memoryStorage();

const upload = multer({
	storage: multerStorage,
	fileFilter: multerFilter
}).single('photo');

exports.uploadPhoto = upload;

exports.resizePhoto = catchAsyncC(async (req: any, res: any, next: Function) => {
	if (!req.file) return next();

	req.file.filename = `user-${req.currentUser.id}-${Date.now()}.jpeg`;

	await sharp(req.file.buffer)
		.resize(500, 500)
		.toFormat('jpeg')
		// 90 percent image quality
		// .jpeg({ quality: 90 });
		.toFile(`public/img/users/${req.file.filename}`);

	next();
});

exports.getAllBikes = factory.getAll('bikes');

exports.getBike = factory.getById('bikes');

exports.createBike = factory.create('bikes');

exports.updateBike = factory.update('bikes');

exports.updateBikeStock = factory.updateStock('bikes');

exports.deleteBike = factory.delete('bikes');

exports.makeQueries = factory.makeQueries({});

exports.getDownloadableLink = factory.getDownloadableLink('bikes');