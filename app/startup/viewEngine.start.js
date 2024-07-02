const express = require('express');
const path = require('path');

module.exports = function(app) {
    app.set("view engine", "ejs");
    app.set('views','./app/views');
    
    // Serve static files from the 'public' directory
    app.use(express.static(path.join(__dirname, 'public')));
};
