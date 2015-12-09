
/**
 * Module dependencies.
 */

var mongoose = require('mongoose');
var utils = require('../../lib/utils');

/**
 * Load category
 */

exports.load = function (req, res, next, id) {
  var recentlyViewed = req.recentlyViewed;
  utils.findByParam(recentlyViewed.categorys, { id: id }, function (err, comment) {
    if (err) return next(err);
    req.category = comment;
    next();
  });
};

/**
 * Create category
 */

exports.create = function (req, res) {
  var recentlyViewed = req.recentlyViewed;
  var user = req.user;
  console.log(req.body);
  if (!req.body.category) return res.redirect('/recentlyVieweds/'+ recentlyViewed.id);

  recentlyViewed.addCategory(user, req.body, function (err) {
    if (err) return res.render('500');
    res.redirect('/recentlyVieweds/'+ recentlyViewed.id);
  });
}

/**
 * Delete comment
 */

exports.destroy = function (req, res) {
  var recentlyViewed = req.recentlyViewed;
  recentlyViewed.removeCategory(req.params.recentlyViewedCategoryId, function (err) {
    if (err) {
      req.flash('error', 'Oops! The comment was not found');
    } else {
      req.flash('info', 'Removed category');
    }
    res.redirect('/recentlyVieweds/' + recentlyViewed.id);
  });
};
