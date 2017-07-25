const instances = 1;

module.exports = {

  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [
    {
    name        : "Webserver",
    script      : "./app.js",
    instances : instances,
    exec_mode : "cluster",
    watch       : "./app.js",
  },
  {
    name        : "Math",
    script      : "./math-service.js",
    instances : instances,
    exec_mode : "cluster",
    watch       : "./math-service.js",
  }]
 
};