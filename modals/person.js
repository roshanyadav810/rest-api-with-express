var mongoose = require('mongoose') ;
var schema = mongoose.Schema;

var personSchema = new schema({
    name : String
});

module.exports = mongoose.model('person' , personSchema);