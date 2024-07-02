const express = require('express');

const baseController = require('@controllers/web/base.controller');
const apiErrorsMiddleware = require('@middlewares/apiErrors.middleware');
const homepageController = require('@controllers/web/homepage.controller');

module.exports = function (app) {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    // All Routes to Controller
    app.use('/api/', baseController);
    app.use('/', homepageController);

    // Log all API thrown errors
    app.use(apiErrorsMiddleware);
};