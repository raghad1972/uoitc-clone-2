const express = require('express');
const path = require('path');
const port = process.env.PORT || 8080;
const bodyParser = require("body-parser");
const app = express();
const cookieParser = require("cookie-parser")
const admin = require('firebase-admin');

const ptsa = path.resolve("myservice_account.json")
const serviceAccount = require(ptsa);
var firebaseApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
databaseURL: 'https://fir-basic-d9b19-default-rtdb.firebaseio.com'  
});

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(cookieParser())

function sendPush(message){
  admin.messaging().send(message)
  .then((response) => {
    // Response is a message ID string.
  console.log('Successfully sent message:', response);
  })
  .catch((error) => {
  console.log('Error sending message:', error);
  });
}
app.post('/api/message1', (req, res) => {
// This registration token comes from the client FCM SDKs.

const message = {
  notification: {
  title: req.body.title1,
  body: req.body.message1
  },
  token: req.body.token1
};

// Send a message to the device corresponding to the provided
// registration token.
sendPush(message)
});

app.post('/api/push1', (req, res) => {

var notification = {
  'title': req.body.title1,
  'body': req.body.message1,
  'icon': 'firebase-logo.png',
  'click_action': 'http://localhost:8081'
};

fetch('https://fcm.googleapis.com/fcm/send', {
  'method': 'POST',
  'headers': {
    'Authorization': 'key=' + key,
    'Content-Type': 'application/json'
  },
  'body': JSON.stringify({
    'notification': notification,
    'to': req.body.token1
  })
}).then(function(response) {
  res.send(response);
}).catch(function(error) {
  res.send(error);
})

});

// serve static assets normally
app.use(express.static(path.join(__dirname, "public")))

// handle every other route with index.html, which will contain
// a script tag to your application's JavaScript file(s).
//app.get('*', (req, res) => {
  //console.log(req.cookies.sb-access-token);
 //console.log(req.params);
  //res.send("Success!")
 // res.sendFile(path.join(__dirname, "pages", 'index.html'));
//});

app.get('*', (req, res) => {
  //console.log(req.cookies.sb-access-token);
 // console.log(req.params);
  //res.send("Success!")
  res.render(path.join(__dirname, "pages", 'index.ejs'));
 // res.sendFile(path.join(__dirname, "public", 'gapidrv.html'));
});

app.listen(port);
console.log("server started on port " + port);