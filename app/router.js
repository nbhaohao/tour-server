"use strict";

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, controller } = app;
  const userExist = app.middleware.userExist();
  router.post("/api/user/register", controller.user.register);
  router.post("/api/user/login", controller.user.login);
  router.post("/api/user/detail", userExist, controller.user.detail);
  router.post("/api/user/logout", controller.user.logout);
  router.post("/api/user/edit", controller.user.edit);
  router.get("/api/commons/cities", controller.commons.cities);
  router.get("/api/house/hot", controller.house.hot);
  router.post("/api/house/search", controller.house.search);
  router.get("/api/house/detail", controller.house.detail);
};
