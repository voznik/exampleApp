
/**
 * Module dependencies.
 */

var mongoose = require('mongoose');
var utils = require('../../lib/utils');

/**
 * Load rating
 */

exports.load = function (req, res, next, id) {
  var recentlySearched = req.recentlySearched;
  utils.findByParam(recentlySearched.ratings, { id: id }, function (err, comment) {
    if (err) return next(err);
    req.rating = comment;
    next();
  });
};

/**
 * Create rating
 */

exports.create = function (req, res) {
  var recentlySearched = req.recentlySearched;
  var user = req.user;
  console.log(req.body);
  if (!req.body.rating) return res.redirect('/recentlySearcheds/'+ recentlySearched.id);

  recentlySearched.addRating(user, req.body, function (err) {
    if (err) return res.render('500');
    res.redirect('/recentlySearcheds/'+ recentlySearched.id);
  });
}

/**
 * Delete comment
 */

exports.destroy = function (req, res) {
  var recentlySearched = req.recentlySearched;
  recentlySearched.removeRating(req.params.recentlySearchedRatingId, function (err) {
    if (err) {
      req.flash('error', 'Oops! The comment was not found');
    } else {
      req.flash('info', 'Removed rating');
    }
    res.redirect('/recentlySearcheds/' + recentlySearched.id);
  });
};
