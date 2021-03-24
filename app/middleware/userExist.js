module.exports = (options) => async (ctx, next) => {
  const user = await ctx.service.user.getUser(ctx.username);
  if (!user) {
    ctx.service.user.fail("用户不存在");
    return;
  }
  await next();
};
