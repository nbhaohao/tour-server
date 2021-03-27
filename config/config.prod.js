/* eslint valid-jsdoc: "off" */

"use strict";
const path = require("path");
const { dbPass, redisPass } = require("../PASS");

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = (appInfo) => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + "_1575812978932_7706";

  // add your middleware config here
  config.middleware = [];

  // config.httpLog = {
  //   type: "all",
  // };

  config.security = {
    csrf: {
      enable: false,
    },
  };

  config.view = {
    mapping: {
      ".html": "ejs",
    },
    root: [
      path.join(appInfo.baseDir, "app/html"),
      path.join(appInfo.baseDir, "app/view"),
    ].join(","),
  };

  config.ejs = {
    delimiter: "%",
  };

  config.static = {
    prefix: "/assets/",
    dir: path.join(appInfo.baseDir, "app/assets"),
  };

  config.session = {
    key: "TOUR_SESS",
    httpOnly: true,
    maxAge: 1000 * 5000,
    renew: true,
  };

  config.auth = {
    exclude: ["/api/user/login", "/api/user/register"],
  };

  config.sequelize = {
    dialect: "mysql",
    host: "8.136.222.10",
    port: "3306",
    user: "root",
    password: dbPass,
    database: "egg_house",
    define: {
      timestamps: false,
      freezeTableName: true,
    },
  };

  config.jwt = {
    secret: "tour-server",
  };

  config.redis = {
    client: {
      port: 6379,
      host: "8.136.222.10",
      db: 0,
      password: redisPass,
    },
  };

  config.allowHosts = ["https://zhangzihao1.gitee.io"];

  // add your user config here
  const userConfig = {
    SALT: "tour-server",
    REDIS_EXPIRED: 5000,
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
