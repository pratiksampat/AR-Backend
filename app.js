var express = require("express");
var app     = express();
var path    = require("path");
const ejs = require('ejs');
var bodyParser = require('body-parser');

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.json())

app.get('/',function(req,res){
  res.render('test_ui.ejs');
});

app.get('/post_test',function(req,res){
  objData = req.query.myData;
  imgData = req.query.myImageUrl;
  videoData = req.query.myVideoUrl;

  if(objData.length !=0){
    response = JSON.parse(objData);
    response = {
      pattern: req.query.file_name,
      objects: JSON.parse(objData)
    };
    if(videoData.length !=0){
      response.videoUrl = videoData;
    }
    else{
      response.videoUrl = "No-video";
    }
    if(imgData.length !=0){
      response.imgUrl = imgData;
    }
    else{
      response.imgUrl = 'no-img';
    }
    console.log(response);
  }
  else{
    response = {
      pattern: req.query.file_name,
      objects:
        [{ obj: 'No-obj',
       color: '#ff0000',
       opacity: '1',
       scale: '1 1 1',
       pos: '0 0 0',
       rotate: '0 0 0' 
      }]
    };
    if(videoData.length !=0){
      response.videoUrl = videoData;
    }
    else{
      response.videoUrl = "No-video";
    }
    if(imgData.length !=0){
      response.imgUrl = imgData;
    }
    else{
      response.imgUrl = 'no-img';
    }
  }
  app.render('Ar_test.ejs',response,function(err,html){
  //console.log(err);
  console.log(html);
  res.send(html);
  })
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
