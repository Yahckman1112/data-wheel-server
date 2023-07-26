// const multer = require("multer");
// const path = require("path"); 
// module.exports = multer({
//   storage: multer.diskStorage({}),
//   fileFilter: (req, file, cb) => {
//     let ext = path.extname(file.originalname);
//       if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
//       cb(new Error("File type is not supported"), false);
//       return;
//     }
//     cb(null, true);
//   },
// });


// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       // Define the destination folder where uploaded files will be stored.
//       cb(null, 'uploads/');
//     },
//     filename: function (req, file, cb) {
//       // Define the filename for the uploaded file.
//       cb(null, Date.now() + '-' + file.originalname);
//     }
//   });
  
//   const fileFilter = function (req, file, cb) {
//     // Define the allowed file types.
//     if (file.mimetype.startsWith('image/')) {
//       cb(null, true);
//     } else {
//       cb(new Error('File type is not supported'));
//     }
//   };
  
//   const upload = multer({ storage: storage, fileFilter: fileFilter });

  
//   module.exports= upload



// module.exports = upload;



// multer.js
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Define the destination folder where uploaded files will be stored.
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Define the filename for the uploaded file.
  }
});

const fileFilter = function (req, file, cb) {
  // Add any necessary file filtering logic here if required.
  // For example, you can check file types and reject certain files.
  // To accept all files, simply call the callback without an error.
  cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

module.exports = upload;
