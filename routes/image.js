const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
// const upload = require('../utils/multer')
const {cloudinary} = require('../utils/cloudinary')
// const multer = require('multer');
// const upload = multer({ dest: 'uploads/' })
// require('')
const imageSchema = new mongoose.Schema({
  name: String,
  image: { type: String, contentType: String },
 cloudinary_id:{type:String} 
});

const Image = mongoose.model("Image", imageSchema);

// const storage = multer.memoryStorage();

// const upload = multer({ storage: storage });

router.get('/', async(req,res)=>{
  const images = await Image.find()

  res.send(images)
})



router.post("/", async (req, res) => {
const imagePath = req.body.imagePath



  try {
    const result = await cloudinary.uploader.upload(imagePath, {upload_preset:'uploads'})

    let image = new Image({
      name: req.body.name,
      image: result.secure_url,
      cloudinary_id: result.public_id
    })
    
  
    await image.save()
    res.send(image)
  
    // console.log(result);
    res.send('done')
    
  } catch (error) {
    res.status(500).send("something went wrong");
    console.log(error);
    
  }

});

module.exports = router;
