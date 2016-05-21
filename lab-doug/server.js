'use strict';

const http = require('http');
const Router = require(__dirname + '/lib/router');
const port = process.env.PORT || 3000;
const router = new Router();
console.log('server.js instantiates empty router obect: ', router);
const matchScoreRoute = require('./route/matchscore-route');

//register routes on router object constructed above
matchScoreRoute(router);
console.log('routes are registered in router object: ', router);
console.log('POST route:\n ', router.routes.POST['/api/matchscore']);
/*the createServer is looking for a function that takes req and res as its arguments.  the router.route() returns a function that takes req and res as its arguments*/
const server = http.createServer(router.route());

server.listen(port, function(){
  console.log('http server started on port: ', port);
});
