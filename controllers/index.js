var _       = require('underscore');
var express = require('express');
var Brand   = require('../models/brand');

var router = express.Router();

router.get('/', function (req, res, next) {
    Brand.all(function(err, brands) {
        if (err) {
            return next(err);
        }
        res.render('index', { brands_by_letter: _.groupBy(brands, function(brand) {
            return _.first(brand.name).toUpperCase();
        }) });
    });
});

module.exports = router;
