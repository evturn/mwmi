'use strict';
const _ = require('underscore');

exports.initLocals = function(req, res, next) {

  var locals = res.locals;

  locals.navLinks = [
    { label: 'Home',      key: 'home',      href: '/' },
    { label: 'Blog',      key: 'blog',      href: '/blog' },
    { label: 'Gallery',   key: 'gallery',   href: '/gallery' },
    { label: 'Contact',   key: 'contact',   href: '/contact' }
  ];

  locals.user = req.user;

  next();

};

exports.flashMessages = function(req, res, next) {

  var flashMessages = {
    info: req.flash('info'),
    success: req.flash('success'),
    warning: req.flash('warning'),
    error: req.flash('error')
  };

  res.locals.messages = _.any(flashMessages, function(msgs) { return msgs.length; }) ? flashMessages : false;

  next();

};

exports.requireUser = function(req, res, next) {

  if (!req.user) {
    req.flash('error', 'Please sign in to access this page.');
    res.redirect('/keystone/signin');
  } else {
    next();
  }

};
