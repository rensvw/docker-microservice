var PORT = process.env.PORT || process.argv[2] || 3001;
var HOST = process.env.HOST || process.argv[2] || "127.0.0.1";
var BASES = (process.env.BASES || process.argv[3] || "127.0.0.1:39000,127.0.0.1:39001").split(",");
var SILENT = process.env.SILENT || process.argv[4] || "true";

const Chairo = require("chairo");
const Seneca = require("seneca");
const tag = "api";

const Hapi = require("hapi");

const Rif = require("rif");

const Good = require("good");

// create new server instance
const server = new Hapi.Server();
var rif = Rif()

var host = rif(HOST) || HOST
console.log("host:", host)

// add server’s connection information
server.connection({
  port: PORT,
  host: host
});

// register plugins to server instance
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
},
{
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

// Tests if user is logged in!
const testAuth = (request, reply) => {
  return reply({
    message: "nooooo"
  });
}
  // Routes
  server.route([{
      method: "GET",
      path: "/api",
      config: {
        description: "Checks if the user is currently logged in!",
        notes: "Returns auth:yesss if the user is authenticated!",
        tags: ["api"],
        handler: testAuth
      }
    },
  ]);

  server.log("info", "Routes registered");

  server.seneca
  .use("mesh",{
            bases: BASES,
            host: HOST,
            sneeze: {
                  silent: JSON.parse(SILENT),
                  swim: {interval: 1111}
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


});



