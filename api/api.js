var PORT = process.env.PORT || process.argv[2] || 3000;
var HOST = process.env.HOST || process.argv[2] || "127.0.0.1";
var BASES = (process.env.BASES || process.argv[3] || "127.0.0.1:39000,127.0.0.1:39001").split(",");
var SILENT = process.env.SILENT || process.argv[4] || "true";

const Chairo = require("chairo");
const Seneca = require("seneca");
const Hapi = require("hapi");
const Rif = require("rif");
const Good = require("good");
const tag = "api";

// Creates a new server instance
const server = new Hapi.Server();
var rif = Rif()

var host = rif(HOST) || HOST

// Add server’s connection information
server.connection({
  port: PORT,
  host: host
});

// Register plugins to server instance
server.register([
  {
    // Plugin for webserver logs
    register: Good,
    options: {
      ops: {
        interval: 10000
      },
      reporters: {
        console: [
          {
            module: "good-squeeze",
            name: "Squeeze",
            args: [ { log: "*", response: "*", request: "*" } ]
          },
          {
            module: "good-console"
          },
          "stdout"
        ]
      }
    }
  },
  { 
    // Plugin for senecajs integration in Hapi webserver
    register: Chairo,
    options: {
        seneca: Seneca({
            tag: tag,
            internal: {
                logger: require("seneca-demo-logger")
            },
            debug: {
                short_logs: true
            }
        })
    }
},
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
}], function (err) {
  if (err) {
    server.log("error", "failed to install plugins");
    throw err;
  }

  server.log("info", "Plugins registered");



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
    },
    {
      method: "GET",
      path: "/api/calculate/product",
      config: {
        description: "Calculates the outcome of the product of 2 numbers",
        handler: product
      }
    }
  ]);

  server.log("info", "Routes registered");

// Set up mesh network
server.seneca
  .use("mesh", {
    host: host,
    bases: BASES,
    sneeze: {
      silent: JSON.parse(SILENT),
      swim: {
        interval: 1111
      }
    }
  });

  // start the server after plugin registration
  server.start(function (err) {
    if (err) {
      server.log("error", "failed to start server")
      server.log("error", err);
      throw err
    }
    server.log("info", "Server running at: " + server.info.uri)
  });
});



