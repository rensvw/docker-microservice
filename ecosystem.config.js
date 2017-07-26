var instances = 1;

module.exports = {

  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [
    {
    name        : "base0",
    script      : "./base/base.js",
    instances : instances,
    exec_mode : "cluster",
    watch       : "./base",
    env: {
      "NODE_ENV": "development",
      "PORT"  : 39000
    },
    env_production : {
       "NODE_ENV": "production"
    }
  },
  {
    name        : "base1",
    script      : "./base/base.js",
    watch       : "./base",
    instances : instances,
    exec_mode : "cluster",
    env: {
      "NODE_ENV": "development",
      "PORT"  : 39001
    },
    env_production : {
       "NODE_ENV": "production"
    }
    },
    // First application
    {
    name        : "api",
    script      : "./api/api.js",
    watch       : "./api",
    instances : instances,
    exec_mode : "cluster",
    env: {
      "NODE_ENV": "development",
      
    },
    env_production : {
       "NODE_ENV": "production"
    }

    },
   {
    name        : "proxy-api",
    script      : "./proxy-api/proxy-api.js",
    watch       : "./proxy-api",
    instances : instances,
    exec_mode : "cluster",
    env: {
      "NODE_ENV": "development",
      
    },
    env_production : {
       "NODE_ENV": "production"
    }

    },
  {
    name        : "math",
    script      : "./math/math-service.js",
    watch       : "./math",
    instances : instances,
    exec_mode : "cluster",
    env: {
      "NODE_ENV": "development",
      
    },
    env_production : {
       "NODE_ENV": "production"
    }

    }
  ]

  
  
};
