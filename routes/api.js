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

  //message board functions, with new thread to update
  function createAndUpdateBoard(boardName, newThread, deletePassword) {
    //search filters
    let query = { boardName: boardName};
    let update = { $push: {threadName: newThread, threadPassword: deletePassword} };
    let options = { upsert: true, new: true, setDefaultsOnInsert: true };

    messageBoard  .findOneAndUpdate(query, update, options)
                  .catch(err => {
                    return {
                      message: err.message || "Error occured in looking up message board."
                    };
                  });
  }

  app.route('/api/threads/:board')
          .get( (request, response) => {
            const boardRequested = {boardName: request.params.board};
            // console.log("boardRequested: " + boardRequested);
            createAndUpdateBoard(boardRequested);

            messageBoard.find(boardRequested)
                    .then( board => response.send(board) )
                    .catch(err => {
                      response.status(500).send({
                        message: err.message || "Error occured in retrieving issues"
                      })
          })}) //End app.route.get('/api/threads/:board')
          .post( (request, rsponse) => {
            //create new thread and upsert into the board
            console.log(request);
            boardName = request.params.board;
            threadName = request.params.text;
            threadPassword = request.params.delete_password;
            console.log({boardName: boardName, threadName: threadName, threadPassword: threadPassword});
            //find board and create if not existing

          } )

  app.route('/api/replies/:board')

};
