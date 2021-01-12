var multer = require('multer'); // distinguish text from files
var path = require('path'); // path
var fs = require('fs'); // filesystem
var mkdirp = require('mkdirp'); // dir
var crypto = require('crypto');  // crypto

// var basePath = constants.PUBLIC_DIRECTORY.ORDER_RESULTS;
const FILES_UPLOAD_PATH =  process.env.FILE_PATH;
//console.log("File path is ",FILES_UPLOAD_PATH)

// temporarly save file
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    var uploadPath = FILES_UPLOAD_PATH;
    console.log("upload path", uploadPath)
    if (!fs.existsSync(uploadPath)) {
      mkdirp.sync(uploadPath);
    }
    // call back
    cb(null, uploadPath);
  },
  filename: function(req, file, cb) {
    // crypt file (using MD5, returning Hex code)
    var bytes = crypto.pseudoRandomBytes(32);
    var checksum = crypto
      .createHash('MD5')
      .update(bytes)
      .digest('hex');
    var tokens = file.originalname.split('.'); // ['name', 'extension', ...]
    var tempext = '';
    // console.log('Original', tokens, tokens.length);
    if (tokens.length > 1) {
      tempext = file.originalname.split('.')[1]; // extension
      var ext = '.' + tempext;
      // call back
      cb(null, checksum + ext);
    } else {
      // console.log('no extension file');
      // call back
      cb(new Error('File is without the extension'));
    }
  }
});

// limits of file upload
var limits = {
  files: 1, // allow only 1 file per request
  fileSize: process.env.FILE_SIZE * 1024 * 1024 * 8 // 5 MB (max file size)
};

// exports
exports.upload = multer({
  storage: storage,
  preservePath: true,
  limits: limits
});
