// app.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express = require('express');        // call express
var app = express();                 // define our app using express
var bodyParser = require('body-parser');
var escapeString = require('querystring');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

var Meal = require('./models/meal');
var meal = new Meal();

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function (req, res, next) {
    // do logging
    console.log('Something is happening.');
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function (req, res) {
    res.json({message: 'hooray! welcome to our api!'});
});

// more routes for our API will happen here
router.route('/meals')
    .get(function (req, res) {
        var key = '';
        var cal = req.query.cal;

        switch (req.query.key) {
            case '0':
                key = 'Vegetarian';
                break;
            case '1':
                key = 'NonVegetarian';
                break;
        }

        meal.query(key, function (err, items) {
            if (err)
                res.send(err);

            var result = filterItems(items, cal);
            res.json(result);
        });
    });

function filterItems(items, cal) {
    var meals = {
        breakfast: items.filter(function (item) {
            return item.Type == 'Breakfast'
        }),
        lunch: items.filter(function (item) {
            return item.Type == 'Lunch'
        }),
        snack: items.filter(function (item) {
            return item.Type == 'Snack'
        }),
        dinner: items.filter(function (item) {
            return item.Type == 'Dinner'
        })
    };

    var filteredMeals = [];
    var imageUri = 'http://givememymeal.blob.core.windows.net/images/';

    for (var i = 0; i < 7; i++) {
        var breakfast = meals.breakfast[Math.floor(Math.random() * meals.breakfast.length)];
        var lunch = meals.lunch[Math.floor(Math.random() * meals.lunch.length)];
        var snack = meals.snack[Math.floor(Math.random() * meals.snack.length)];
        var dinner = meals.dinner[Math.floor(Math.random() * meals.dinner.length)];
        var meal = {
            breakfast: {
                meal: breakfast.RowKey,
                calories: breakfast.Calories,
                image: imageUri + escapeString.escape(breakfast.RowKey) + '.jpg'
            },
            lunch: {
                meal: lunch.RowKey,
                calories: lunch.Calories,
                image: imageUri + escapeString.escape(lunch.RowKey) + '.jpg'
            },
            snack: {
                meal: snack.RowKey,
                calories: snack.Calories,
                image: imageUri + escapeString.escape(snack.RowKey) + '.jpg'
            },
            dinner: {
                meal: dinner.RowKey,
                calories: dinner.Calories,
                image: imageUri + escapeString.escape(dinner.RowKey) + '.jpg'
            }
        };

        filteredMeals.push(meal);
    }

    return filteredMeals;
}

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);