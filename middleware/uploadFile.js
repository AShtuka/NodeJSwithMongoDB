const multer = require('multer');

const storage = multer.diskStorage({
    destination(req, file, cb){
        cb(null, 'public/images')
    },
    filename(req, file, cb){
        let date = new Date().toISOString().replace(/:/g, '-');
        cb(null, date + '-' + file.originalname)
    }
});

const allowTypes = ['image/png', 'image/jpg', 'image/jpeg'];

const fileFilter = (req, file, cb) => {
    if (allowTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

module.exports = multer({
    storage: storage,
    fileFilter: fileFilter
});