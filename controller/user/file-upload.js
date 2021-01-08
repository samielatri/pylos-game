var multer = require('multer');
var path = require('path');
var fs = require('fs');
var mkdirp = require('mkdirp');
var crypto = require('crypto');

// var basePath = constants.PUBLIC_DIRECTORY.ORDER_RESULTS;
const FILES_UPLOAD_PATH =  process.env.FILE_PATH;
  //console.log("File path is ",FILES_UPLOAD_PATH)
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    var uploadPath = FILES_UPLOAD_PATH;
    console.log("upload path", uploadPath)
    if (!fs.existsSync(uploadPath)) {
      mkdirp.sync(uploadPath);
    }
    cb(null, uploadPath);
  },
  filename: function(req, file, cb) {
    var bytes = crypto.pseudoRandomBytes(32);
    var checksum = crypto
      .createHash('MD5')
      .update(bytes)
      .digest('hex');
    var tokens = file.originalname.split('.');
    var tempext = '';
    // console.log('Original', tokens, tokens.length);

    if (tokens.length > 1) {
      tempext = file.originalname.split('.')[1];
      var ext = '.' + tempext;
      cb(null, checksum + ext);
    } else {
    //   console.log('here');
      cb(new Error('File is without the extension'));
    }
  }
});
var limits = {
  files: 1, // allow only 1 file per request
  fileSize: process.env.FILE_SIZE * 1024 * 1024 * 8 // 5 MB (max file size)
};
exports.upload = multer({
  storage: storage,
  preservePath: true,
  limits: limits
});
