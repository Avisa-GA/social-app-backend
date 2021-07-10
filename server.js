///////////////////////////////
// DEPENDENCIES
////////////////////////////////
// get .env variables
require("dotenv").config();
// pull PORT from .env, give default value of 4000
const { 
  PORT = 4000,
  CLIENT_ID,
  PRIVATE_KEY,
  PRIVATE_KEY_ID
 } = process.env;
// import express
const express = require("express");
// create application object
const app = express();
// import middlware
const cors = require("cors");
const morgan = require("morgan");
const fileupload = require('express-fileupload');
const cloudinary = require('cloudinary').v2;
const admin = require('firebase-admin');

// Cloudinary Config
cloudinary.config( {
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

// ==================
// CONFIGURE MONGOOSE
// ==================
// & connect to the MongoDB with mongoose
require('./config/database')

///////////////////////////////
// MiddleWare
////////////////////////////////
app.use(cors()); // to prevent cors errors, open access to all origins
app.use(morgan("dev")); // logging
app.use(express.json()); // parse json bodies
app.use(express.static('public'));
app.use(express.static('uploads'));
app.use(fileupload({ createParentPath: true }));
app.use(express.urlencoded( { extended: true }))

// *********************** Firebase Googles
// Google firebase middleware

// Configure firebase service account
admin.initializeApp({
  credential: admin.credential.cert({
    "type": "service_account",
    "project_id": "socialapp-b16b7",
    "private_key_id": PRIVATE_KEY_ID,
    "private_key": PRIVATE_KEY.replace(/\\n/g, '\n'),
    "client_email": "firebase-adminsdk-xayuo@socialapp-b16b7.iam.gserviceaccount.com",
    "client_id": CLIENT_ID,
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-xayuo%40socialapp-b16b7.iam.gserviceaccount.com"
    })
});



///////////////////////////////
// ROUTES
////////////////////////////////
// create a test route
app.get("/", (req, res) => {
    res.send("hello world");
});

// Authorization Middleware
app.use(async (req, res, next) => {
  const token = req.get('authorization');
  if(!token) return next();
  const authenticatedUser = await admin.auth().verifyIdToken(token.replace('bearer ', ''));
  if(authenticatedUser) {
      req.user = authenticatedUser;
  } else {
      return res.status(401).json({error: 'invalid authorization token'});
  }
  next();
});

app.use('/', require('./routes/user'));
app.use('/', require('./routes/post'));
app.use(express.status('routes'));

///////////////////////////////
// LISTENER
////////////////////////////////
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));



// DEPLOYED URL : https://social-app-end.herokuapp.com/api/users