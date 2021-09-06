var express = require('express');
var router = express.Router();
var multer = require('multer');
var userModel = require('./users');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/uploads')
  },
  filename: function (req, file, cb) {
    var filename =  Math.floor(Math.random()*109800)+Date.now()+file.originalname ;
    cb(null, filename)
  }
})
 
var upload = multer({ storage: storage })
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});

router.post('/profile',upload.single('image'),function(req,res){
   var fileaddress = `./images/uploads/${req.file.filename}`;
   userModel.create({
     name:req.body.name,
     image:fileaddress
   }).then(function(alldata){
    //  res.send(req.file);
     res.redirect('/profile');
     console.log(fileaddress);
   })
});

router.get('/profile',function(req,res){
  userModel.find()
  .then(function(alldata){
    res.render('profile',{alldata:alldata});
  })
})

module.exports = router;
