const instances = 4;

module.exports = {

  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [
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