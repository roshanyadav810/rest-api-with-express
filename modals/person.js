var mongoose = require('mongoose') ;
var schema = mongoose.Schema;

var personSchema = new schema({
    name : String,
    school : String
});

module.exports = mongoose.model('person' , personSchema);