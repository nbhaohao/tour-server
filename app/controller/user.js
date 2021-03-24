"use strict";

const Controller = require("egg").Controller;
const md5 = require("md5");
const dayjs = require("dayjs");

class UserController extends Controller {
  async jwtSign() {
    const { ctx, app } = this;
    const username = ctx.params("username");
    const token = app.jwt.sign(
      {
        username,
      },
      app.config.jwt.secret
    );
    await app.redis.set(username, token, "EX", app.config.REDIS_EXPIRED);
    return token;
  }
  parseResult(ctx, result) {
    return {
      ...ctx.helper.unPick(result.dataValues, ["password"]),
      create_time: ctx.helper.timestamp(result.create_time),
    }
  }
  async register() {
    const { ctx, app } = this;
    const params = ctx.params();
    const user = await ctx.service.user.getUser(params.username);
    if (user) {
      ctx.body = {
        status: 500,
        errMsg: "用户已经存在",
      };
      return;
    }
    const result = await ctx.service.user.add({
      ...params,
      password: md5(`${params.password}${app.config.SALT}`),
      create_time: ctx.helper.time(),
    });
    if (result) {
      const token = await this.jwtSign();
      ctx.body = {
        status: 200,
        data: {
          ...ctx.helper.unPick(result.dataValues, ["password"]),
          create_time: ctx.helper.timestamp(result.create_time),
          token,
        },
      };
    } else {
      ctx.body = {
        status: 500,
        errMsg: "注册用户失败",
      };
    }
  }
  async login() {
    const { ctx } = this;
    const { username, password } = ctx.params();
    const user = await ctx.service.user.getUser(username, password);
    if (user) {
      const token = await this.jwtSign();
      ctx.body = {
        status: 200,
        data: {
          ...this.parseResult(ctx, user),
          token,
        },
      };
    } else {
      ctx.body = {
        status: 500,
        errMsg: "该用户不存在",
      };
    }
  }
  async detail() {
    const { ctx } = this;
    const user = await ctx.service.user.getUser(ctx.username);
    if (user) {
      ctx.body = {
        status: 200,
        data: {
          ...ctx.helper.unPick(user.dataValues, ["password"]),
          create_time: ctx.helper.timestamp(user.create_time),
        },
      };
    } else {
      ctx.body = {
        status: 500,
        errMsg: "该用户不存在",
      };
    }
  }
  async logout() {
    const { ctx, app } = this;
    try {
      app.redis.set(ctx.username, null);
      ctx.body = {
        status: 200,
        data: "ok",
      };
    } catch (error) {
      ctx.body = {
        status: 500,
        errMsg: "退出登录失败",
      };
    }
  }
}

module.exports = UserController;
