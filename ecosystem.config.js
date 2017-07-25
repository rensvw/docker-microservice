const instances = 1;

module.exports = {

  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [
    {
    name        : "base0",
    script      : "./base.js",
    instances : instances,
    exec_mode : "cluster",
    watch       : "./base.js",
    env: {
      "NODE_ENV": "development",
      "PORT"  : 39000
    },
  },
  {
    name        : "base1",
    script      : "./base.js",
    instances : instances,
    exec_mode : "cluster",
    watch       : "./base.js",
    env: {
      "NODE_ENV": "development",
      "PORT"  : 39001
    },
  },
  {
    name        : "webserver",
    script      : "./app.js",
    instances : instances,
    exec_mode : "cluster",
    watch       : "./app.js",
  },
  {
    name        : "math",
    script      : "./math-service.js",
    instances : instances,
    exec_mode : "cluster",
    watch       : "./math-service.js",
  }]
 
};