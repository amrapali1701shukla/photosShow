var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/prfl',{useNewUrlParser:true});

var userSchema = mongoose.Schema({
  name:String,
  image:String
})

module.exports = mongoose.model('users',userSchema);