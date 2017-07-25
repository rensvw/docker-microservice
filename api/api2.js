var PORT = process.env.PORT || process.argv[2] || 3000;
var HOST = process.env.HOST || process.argv[2] || "127.0.0.1";
var BASES = (process.env.BASES || process.argv[3] || "127.0.0.1:39000,127.0.0.1:39001").split(",");
var SILENT = process.env.SILENT || process.argv[4] || "true";

const Seneca = require("seneca");
const Chairo = require("chairo");
const Hapi = require("hapi");
const Rif = require("rif");
const Good = require("good");
var tag = 'api';


// create new server instance
const server = new Hapi.Server();
var rif = Rif()

var host = rif(HOST) || HOST

// add server’s connection information
server.connection({
  port: PORT,
  host: host
});

server.register([

  {
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
  { register: Chairo,
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
},{
  register: require("wo"),
  options:{
    bases: BASES,
    route: [
        {path: "/api/", method: "get"},        
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

});

server.route([
    {
    method: "GET",
    path: "/api/",
    config: {
    description: "",
    notes: "",
    handler: testAuth
    }
},
    {   
    method: "GET",
    path: "/api/",
    config: {
    description: "",
    notes: "",
    handler: testAuth
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

  // start your server after plugin registration
  server.start(function (err) {
    if (err) {
      server.log("error", "failed to start server")
      server.log("error", err);

      throw err
    }
    server.log("info", "Server running at: " + server.info.uri)
  });