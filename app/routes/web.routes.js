const express = require('express');

const baseController = require('@controllers/web/base.controller');
const apiErrorsMiddleware = require('@middlewares/apiErrors.middleware');
const homepageController = require('@controllers/web/homepage.controller');
const adminController = require('@controllers/web/admin.controller');

module.exports = function (app) {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    // All Routes to Controller
    app.use('/api/', baseController);
    app.use('/', homepageController);
    app.use('/admin', adminController);
    // Log all API thrown errors
    app.use(apiErrorsMiddleware);
};