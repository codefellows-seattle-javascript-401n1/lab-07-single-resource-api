'use strict';

const Note = require('../model/note');
const response = require('../lib/response');

var notePool = {};

module.exports = function(router){
  router
  //Create New
  .post('/api/note', function(req, res){
    if(req.body){
      const note = new Note(req.body.content);
      notePool[note.id] = note;
      return response(200, note)(res);
    }
    response(400, 'bad request')(res);
  })

  .get('/api/note', function(req, res){
    const note = notePool[req.url.query.id];
    if(note){
      return response(200, note)(res);
    }
    response(404, 'not found')(res);
  })
  //Update Existing
  .put('/api/note', function(req,res){
    const note = notePool[req.url.query.id];
    if(note){
      notePool[req.body.content];
      return response(201, 'New note created' +note.id)(res);
    }
    response(400, 'bad request')(res);
  })
  .delete('/api/note'), function(req,res){
    const note = notePool[req.url.query.id];
    if(note){
      delete notePool[req.body.content];
      delete note[req.id];
      return response(200, 'Note deleted')(res);
    } else{
      response(400, 'bad request')(res);
    }
  };
};
