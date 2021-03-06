module.exports = (options) => {
  return async (ctx, next) => {
    const url = ctx.request.url;
    const token = ctx.request.token;
    let username;
    try {
      username = await ctx.app.redis.get(ctx.username);
    } catch (e) {
      console.log("error", e);
    }
    const user = username && username === token;
    if (!user && !options.exclude.includes(url.split("?")[0])) {
      ctx.body = {
        status: 1001,
        errMsg: "用户未登录",
      };
    } else {
      await next();
    }
  };
};
