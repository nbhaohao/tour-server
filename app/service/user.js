"use strict";

const BaseService = require("./base");
const md5 = require("md5");

class UserService extends BaseService {
  async getUser(username, password) {
    return this.run(async (ctx, app) => {
      const _where = password
        ? { username, password: md5(`${password}${app.config.SALT}`) }
        : { username };
      const result = await ctx.model.User.findOne({
        where: _where,
      });
      return result;
    });
  }
  async add(params) {
    return this.run(async (ctx, app) => {
      const result = await ctx.model.User.create(params);
      return result;
    });
  }
  async edit(params) {
    return this.run(async (ctx) => {
      const result = await ctx.model.User.update(params, {
        where: {
          username: ctx.username,
        },
      });
      return result;
    });
  }
}

module.exports = UserService;
