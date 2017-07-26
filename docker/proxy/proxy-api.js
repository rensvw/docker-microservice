var HOST = process.env.HOST || process.argv[2] || "127.0.0.1"
var BASES = (process.env.BASES || process.argv[3] || "127.0.0.1:39000,127.0.0.1:39001").split(",");
var SILENT = process.env.SILENT || process.argv[4] || "true"

var Hapi = require("hapi")
var Rif = require("rif")

var server = new Hapi.Server()
var rif = Rif()

// Gets an IP from an hostname
var host = rif(HOST) || HOST

server.connection({
  port: 8000
});

// Registers proxy plugin for hapi
server.register({
  register: require("wo"),
  options: {
    bases: BASES,
    sneeze: {
      host: host,
      silent: JSON.parse(SILENT),
        swim: {interval: 1111}
      }
  }
});

// Get sum route from api
server.route({
  method: "GET", path: "/api/calculate/sum",
  handler: {
    wo: {
      passThrough: true
    }
  }
});

// Get product route from api
server.route({
  method: "GET", path: "/api/calculate/product",
  handler: {
    wo: {
      passThrough: true
    }
  }
});

server.start(function(){
  console.log("Proxy api is running on:",server.info.uri)
});