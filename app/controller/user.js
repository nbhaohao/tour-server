"use strict";

const md5 = require("md5");
const BaseController = require("./base");

class UserController extends BaseController {
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
    };
  }
  async register() {
    const { ctx, app } = this;
    const params = ctx.params();
    const user = await ctx.service.user.getUser(params.username);
    if (user) {
      this.error("用户已经存在");
      return;
    }
    const result = await ctx.service.user.add({
      ...params,
      password: md5(`${params.password}${app.config.SALT}`),
      create_time: ctx.helper.time(),
    });
    if (result) {
      const token = await this.jwtSign();
      this.success({
        ...ctx.helper.unPick(result.dataValues, ["password"]),
        create_time: ctx.helper.timestamp(result.create_time),
        token,
      });
    } else {
      this.error("注册用户失败");
    }
  }
  async login() {
    const { ctx } = this;
    const { username, password } = ctx.params();
    const user = await ctx.service.user.getUser(username, password);
    if (user) {
      const token = await this.jwtSign();
      this.success({
        ...this.parseResult(ctx, user),
        token,
      });
    } else {
      this.error("该用户不存在");
    }
  }
  async detail() {
    const { ctx } = this;
    const user = await ctx.service.user.getUser(ctx.username);
    // if (user) {
    this.success({
      ...ctx.helper.unPick(user.dataValues, ["password"]),
      create_time: ctx.helper.timestamp(user.create_time),
    });
    // } else {
    //   this.fail("该用户不存在");
    // }
  }
  async logout() {
    const { ctx, app } = this;
    try {
      await app.redis.set(ctx.username, null);
      this.success("ok");
    } catch (error) {
      this.fail("退出登录失败");
    }
  }
}

module.exports = UserController;
