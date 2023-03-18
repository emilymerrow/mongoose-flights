const Flight = require('../models/flights');

module.exports = {
    index,
    new: newFlight,
    create,
    show
};

function index(req, res) {
    // Flight.find({},
    // function(err, allFlights) {
    //     res.render('flights/index.ejs', {flights:allFlights});
    // })
      
      Flight.find({}).then(function(allFlights){

				console.log(allFlights, " <_ data from the db")
				// respond to the client in the .then, we have to wait 
				// for the data to come back from the database
				res.render('flights/index', {flights: allFlights})
			  })
}
function newFlight(req, res) {
    res.render('flights/new.ejs');
}
function create(req, res) {

    // for (let key in req.body) {
    //     if (req.body[key] === '') delete req.body[key];
    //   }
    //   const flight = new Flight(req.body);
    //   flight.save(function(err) {
    //     // one way to handle errors
    //     if (err) return res.render('flights/new.ejs');
    //     console.log(flight);
    //     // for now, redirect right back to new.ejs
    //     res.redirect('/flights');
    //   });
      	
	Flight.create(req.body)
	.then(function(flightWeCreatedInTheDb){
			
				
				
				res.redirect('/flights'); // 404 because we haven't made the index route yet
		
			}).catch((err) => {
				console.log(err);
				res.send('There was an error check the terminal, or log the err object')
			})
}
function show(req, res) {
	
	Flight.findById(req.params.id)
			  .then(function(flightDoc){
				console.log(flightDoc)
				res.render('flights/show', { flight: flightDoc });
			  }).catch((err) =>{
				console.log(err);
				res.send(err)
			  })
  }