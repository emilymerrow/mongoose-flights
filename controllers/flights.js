const Flight = require('../models/movies');

module.export = {
    index,
    new: newFlight,
    create
};

function index(req, res) {
    Flight.find({}, function(err, flights) {
        res.render('flights/index.ejs', {flights});
    });
}
function newFlight(req, res) {
    res.render('flights/new.ejs');
}
function create(req, res) {

    for (let key in req.body) {
        if (req.body[key] === '') delete req.body[key];
      }
      const flight = new Flight(req.body);
      flight.save(function(err) {
        // one way to handle errors
        if (err) return res.render('flights/new.ejs');
        console.log(flight);
        // for now, redirect right back to new.ejs
        res.redirect('/flights');
      });
}
