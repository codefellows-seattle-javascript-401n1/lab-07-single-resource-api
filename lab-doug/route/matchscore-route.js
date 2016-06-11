'use strict';

//const MatchScore = require('../model/matchscore');
const response = require('../lib/response');
const Storage = require('../lib/Storage');
const uuid = require('node-uuid');
var matchScoreStorage = new Storage(__dirname + '/../test/data');
//var matchScorePool = {};

module.exports = function(router){
  router.post('/api/matchscore', function(req, res){
    if(req.body){
      var postUuid = uuid.v4();
      req.body.uuid = postUuid;
      matchScoreStorage.setItem('matchscore', req.body)
      .then(function(item){
        response(200, item)(res);
      }).catch(function(err){
        response(400, 'bad request')(res);
      });
    } else {
      response(404, 'not found')(res);
    }
  }).put('/api/matchscore', function(req, res){
    if(req.body){
      var postUuid = req.body.uuid;
      matchScoreStorage.deleteItem('matchscore', postUuid)
      .then ((uuid, req) => {
        matchScoreStorage.setItem('matchscore', req.body)
        .then(function(item) {
          response(200, item.body)(res);
        }).catch(function(err){
          response(400, 'bad request')(res);
        });
      });
      response(404, 'not found')(res);
    }
  }).get('/api/matchscore', function(req, res){
    console.log('req.url.query: ', req.url.query);
    if(!req.url.query.id) return response(400, 'bad request')(res);
    matchScoreStorage.fetchItem('matchscore', req.url.query.id)
    .then(function(item){
      console.log('value of item in get route in matchsocre-route: ', item);
      return response(200, item)(res);
    }).catch(function(){
      return response(404, 'not found')(res);
    });
  })
  .delete('/api/matchscore', function(req, res){
    matchScoreStorage.deleteItem('matchscore', req.body.uuid)
    .then((uuid) => {
      return response(200, `the file with uuid ${uuid} was deleted successfully`)(res);
    }).catch(function(){
      return response(400,'bad request' )(res);
    });
    //response(404, 'not found in matchscore-route.js')(res);
  });
};
