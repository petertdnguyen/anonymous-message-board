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
                  .then(updatedThread => response.send(updatedThread))
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
          .post( (request, response) => {
            //create new thread and upsert into the board
            console.log(request.body);
            boardName = request.body.board;
            threadName = request.body.text;
            threadPassword = request.body.delete_password;
            // console.log({boardName: boardName, threadName: threadName, threadPassword: threadPassword});
            //find board and create if not existing
            createAndUpdateBoard(boardName, threadName, threadPassword);
          } )

  app.route('/api/replies/:board')

};
