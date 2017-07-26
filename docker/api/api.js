"use strict"

var PORT = process.env.PORT || process.argv[2] || 3000;
var HOST = process.env.HOST || process.argv[2] || "127.0.0.1";
var BASES = (process.env.BASES || process.argv[3] || "127.0.0.1:39000,127.0.0.1:39001").split(",");
var SILENT = process.env.SILENT || process.argv[4] || "true";

const Hapi   = require('hapi')
const Chairo = require('chairo')
const Seneca = require('seneca')
const Rif    = require('rif')

const tag = 'api'

var server = new Hapi.Server()
var rif = Rif()

var host = rif(HOST) || HOST

server.connection({
    port: PORT,
    host: host
})

server.register({
  register: Chairo,
  options:{
    seneca: Seneca({
      tag: tag,
      internal: {logger: require('seneca-demo-logger')},
      debug: {short_logs:true}
    })
    //.use('zipkin-tracer', {sampling:1})
  }
})

server.register([
{
  // Set up the proxies
  register: require("wo"),
  options:{
    bases: BASES,
    route: [
        {path: "/api/calculate/sum", method: "get"},      
        {path: "/api/calculate/product", method: "get"},      
    ],
    sneeze: {
      host: host,
      silent: JSON.parse(SILENT),
      swim: {interval: 1111}
    }
  }
}]);


// Handling logic sum route
const sum = (request, reply) => {
   server.seneca.act("role:math,cmd:sum", {
    left: request.query.left,
    right: request.query.right
  }, function (err, respond) {
    if (err) {
      reply(err);
    }
    else{
      return reply(respond);
    }
  });
}

// Handling logic product route
const product = (request, reply) => {
   server.seneca.act("role:math,cmd:product", {
    left: request.query.left,
    right: request.query.right
  }, function (err, respond) {
    if (err) {
      reply(err);
    }
    else{
      return reply(respond);
    }
  });
}


  // Routes
server.route([{
      method: "GET",
      path: "/api/calculate/sum",
      config: {
        description: "Calculates the outcome of the sum of 2 numbers",
        handler: sum
      }
    }])

server.route([{
      method: "GET",
      path: "/api/calculate/product",
      config: {
        description: "Calculates the outcome of the product of 2 numbers",
        handler: product
      }
    }
  ]);

server.seneca
  .add('role:api,cmd:ping', function(msg,done){
    done( null, {pong:true,api:true,time:Date.now()})
  })
    .use('mesh',{
	host: host,
	bases: BASES,
	sneeze: {
          silent: JSON.parse(SILENT),
          swim: {interval: 1111}
        }
    })


server.start(function(){
  console.log(tag,server.info.host,server.info.port)
})
