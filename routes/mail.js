const express = require("express");
const router = express.Router();
const axios = require('axios')
const Joi = require('joi')



function validate(userInfo){
  const schema = Joi.object({
    name:Joi.string().required(),
    email:Joi.string().required().email(),
    subject: Joi.string(),
    message:Joi.string().required()
  })
  return schema.validate(userInfo)
}


const apiKey = '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';
const apiBaseUrl = 'https://api.sendinblue.com/v3';


router.get("/", (req, res) => {
  res.send("mail");
});

// Adeniran081
// const apiKey='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'



router.post("/",async (req, res) => {
  const {error} = validate(req.body)
  if(error) return res.status(400).send(error.details[0].message)

  
const emailData = {
 

  sender: { email: 'adeniranyaqubtest@gmail.com', name: 'Yahckman' },
  to: [{ email: req.body.email, name: req.body.name }],
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
