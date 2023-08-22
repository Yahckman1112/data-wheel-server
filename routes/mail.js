const express = require("express");
const router = express.Router();
const axios = require('axios')
const Joi = require('joi')
// const config = require('config')

// console.log();

function validate(userInfo){
  const schema = Joi.object({
    name:Joi.string().required(),
    email:Joi.string().required().email(),
    subject: Joi.string(),
    message:Joi.string().required()
  })
  return schema.validate(userInfo)
}


const apiKey = process.env.MAIL_API_KEY ;
const apiBaseUrl = 'https://api.sendinblue.com/v3';


router.get("/", (req, res) => {
  res.send("mail");
});

// Adeniran081


router.post("/",async (req, res) => {
  const {error} = validate(req.body)
  if(error) return res.status(400).send(error.details[0].message)

  
const emailData = {
 

  sender: { email: req.body.email, name: req.body.name },
  to: [{ email: 'adeniranyaqubtest@gmail.com', name: 'Yahckman' }],
  subject: req.body.subject,
  htmlContent: req.body.message
};
  try {
    const response = await axios.post(`${apiBaseUrl}/smtp/email`, emailData, {
      headers: {
        'api-key': apiKey,
        'content-type': 'application/json'
      }
    });

    console.log('Email sent successfully:', response.data);
    res.send('success') 
  } catch (error) {
    console.error('Error sending email:', error.response.data);
    res.send(error) 
  }

});

async function sendEmail() {

}

module.exports = router;
