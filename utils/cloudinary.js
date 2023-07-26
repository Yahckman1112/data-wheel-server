const cloudinary = require("cloudinary").v2;
// const {clou}

cloudinary.config({
  cloud_name: "duoepyh8c",
  api_key: "168811165825386",
  api_secret: "2miLcWXd2cJJ15dFHy3MdPG4qxM",
});

module.exports = {cloudinary}


// exports.uploads = (file) => {
//     return new Promise((resolve) => {
//       cloudinary.uploader.upload(
//         file,
//         (result) => {
//           resolve({ url: result.url, id: result.public_id });
//         },
//         { resource_type: "auto" }
//       );
//     });
//   };