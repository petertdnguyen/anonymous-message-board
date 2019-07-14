/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

require("dotenv").config();
const mongoose = require("mongoose");
const messageBoard = require("../models/messageBoard.model");
const expect = require('chai').expect; //provided through FCC project template

//Setup API routing
module.exports = function (app) {

  //connect to the database
  mongoose
          .connect(process.env.DATABASE_URL, {
            useNewUrlParser: true
          })
          .then( () => {
            console.log("Successfully connected to the database.")
          })
          .catch( (error) => {
            console.log("Error connecting to the database.")
            process.exit();
          });

  
  
  app.route('/api/threads/:board');

  app.route('/api/replies/:board');

};
