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

  app.route('/api/threads/:board')
  ; //End app.route('/api/threads/:board')

  //message board functions
  function createAndUpdateBoard(boardName) {
    //search filters
    let query = { boardName: boardName};
    let update = {  };
    let options = { upsert: true, new: true, setDefaultsOnInsert: true };

    messageBoard  .findOneAndUpdate(query, update, options)
                  .catch(err => {
                    return {
                      message: err.message || "Error occured in looking up message board."
                    };
                  });
  }


  app.route('/api/replies/:board')
          .get( (request, response) => {
            const boardRequested = req.params.board;
            console.log(boardRequested);
            createAndUpdateBoard(boardRequested);
          })

};
