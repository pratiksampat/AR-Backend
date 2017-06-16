var express = require("express");
var app = express();
var path = require("path");
const ejs = require('ejs');
var bodyParser = require('body-parser');

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.json())

//index of the creation page.
app.get('/', function(req, res) {
  res.render('test_ui.ejs');
});

//gets the from data from creation page and renders the AR page
app.get('/AR', function(req, res) {
  //Get the data
  objData = req.query.myData;
  imgData = req.query.myImageUrl;
  videoData = req.query.myVideoUrl;

  //Takes care of all the conditions when either one data is not present
  //When no object obj: 'No-obj'
  //When no image imgUrl = 'no-img'
  //When no video videoUrl = "No-video"
  //These are then checked in the template to render and display
  if (objData.length != 0) {
    response = JSON.parse(objData);
    response = {
      pattern: req.query.file_name,
      objects: JSON.parse(objData)
    };
    if (videoData.length != 0) {
      response.videoUrl = videoData;
    } else {
      response.videoUrl = "No-video";
    }
    if (imgData.length != 0) {
      response.imgUrl = imgData;
    } else {
      response.imgUrl = 'No-img';
    }
    console.log(response);
  } else {
    response = {
      pattern: req.query.file_name,
      objects: [
        {
          obj: 'No-obj',
          color: '#ff0000',
          opacity: '1',
          scale: '1 1 1',
          pos: '0 0 0',
          rotate: '0 0 0'
        }
      ]
    };
    if (videoData.length != 0) {
      response.videoUrl = videoData;
    } else {
      response.videoUrl = "No-video";
    }
    if (imgData.length != 0) {
      response.imgUrl = imgData;
    } else {
      response.imgUrl = 'No-img';
    }
  }
  //Render the page - res.render can also be used but here even errors can be monitored.
  app.render('Ar_test.ejs', response, function(err, html) {
    //console.log(err);
    console.log(html);
    res.send(html);
  })
});

//Listen to the port 3000. can be changed for local deployment.
app.listen(process.env.PORT || 3000, function() {
  console.log('Example app listening on port 3000!')
})
