const mongoose = require('mongoose');
//const Schema = mongoose.Schema;
//define the destination subdocument schema
const destinationSchema = new mongoose.Schema({
    airport: {
        type: String,
        enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN']
    },
    arrival: Date
});
//define the flight parent schema
const flightSchema = new mongoose.Schema({
	airline: {
		type: String,
		enum: ['American', 'Southwest', 'United']
	},
    airport: {
        type: String,
        enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN'],
        default: 'DEN'
    },
    flightNo: {
        type: Number, 
        required: true, 
        min: 10, 
        max: 9999
    },
    departs: {
        type: Date,
        default: function () {
            return new Date().getFullYear()+1;
          }
    } ,
    //add the destinations subdocument array
    destinations: [destinationSchema],
	
}, {
timestamps: true 

});
module.exports = mongoose.model('Flight', flightSchema);