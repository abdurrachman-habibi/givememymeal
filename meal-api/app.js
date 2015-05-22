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

            try {
                var result = filterItems(items, parseInt(cal));
                res.json(result);
            }
            catch (e) {
                res.json([]);
            }
        });
    });

function filterItems(items, cal) {
    var filteredMeals = [];
    var ingredients = {};
    var imageUri = 'http://givememymeal.blob.core.windows.net/images/';

    var mealUnit = {
        Milk: 'ml',
        Spices: 'g',
        Flour: 'g',
        Eggs: 'pc',
        Cheese: 'g',
        Sugar: 'g',
        Butter: 'g',
        Meat: 'g',
        Vegetable: 'g',
        Wine: 'ml',
        Bread: 'slices',
        Tofu: 'g',
        Pasta: 'g',
        Fruit: 'g',
        Fish: 'g',
        Rice: 'g',
        Poultry: 'g',
        Bar: 'pc',
        Nut: 'g'
    };

    function shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }

    function addIngredients(meal) {
        for (var prop in meal) {
            if (meal.hasOwnProperty(prop) && meal[prop] && mealUnit[prop]) {
                if (!ingredients[prop]) {
                    ingredients[prop] = 0;
                }

                ingredients[prop] += parseInt(meal[prop]);
            }
        }
    }

    function appendIngredientUnit() {
        for (var prop in ingredients) {
            if (ingredients.hasOwnProperty(prop)) {
                ingredients[prop] += ' ' + mealUnit[prop];
            }
        }
    }

    function createIngredientObj(meal) {
        var item = {};

        for (var prop in meal) {
            if (meal.hasOwnProperty(prop) && meal[prop] && mealUnit[prop]) {
                item[prop] = parseInt(meal[prop]) + ' ' + mealUnit[prop];
            }
        }

        return item;
    }

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

    for (var i = 0; i < 7; i++) {
        var tempCal = cal;
        var meal = {};
        var arr = ['breakfast', 'lunch', 'dinner'];
        shuffleArray(arr);
        var avg = 0.3 * tempCal;

        for (var j = 0; j < arr.length; j++) {
            var temps = meals[arr[j]].filter(function (item) {
                return item.Calories >= avg - 100 && item.Calories <= avg + 100
            });

            var mealType = temps[Math.floor(Math.random() * temps.length)];

            if (mealType) {
                meal[arr[j]] = {
                    meal: mealType.RowKey,
                    image: imageUri + escapeString.escape(mealType.RowKey) + '.jpg',
                    ingredients: createIngredientObj(mealType)
                };

                addIngredients(mealType);
            }

            tempCal -= mealType.Calories;
        }

        var snacks = meals.snack.filter(function (item) {
            return item.Calories <= tempCal
        });

        var snack = snacks[Math.floor(Math.random() * snacks.length)];

        if (snack) {
            meal.snack = {
                meal: snack.RowKey,
                image: imageUri + escapeString.escape(snack.RowKey) + '.jpg',
                ingredients: createIngredientObj(snack)
            };

            addIngredients(snack);
        }

        filteredMeals.push(meal);
    }

    appendIngredientUnit();

    return {
        meals: filteredMeals,
        groceries: ingredients
    };
}

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);