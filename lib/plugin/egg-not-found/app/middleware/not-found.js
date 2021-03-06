module.exports = () => async (ctx, next) => {
  const isMatchRoute = ctx.app.router.stack.some((item) =>
    item.regexp.test(ctx.request.url.split("?")[0])
  );
  if (!isMatchRoute) {
    ctx.body = {
      status: 404,
      errMsg: `接口${ctx.request.url.split("?")[0]}不存在`,
    };
    return;
  }
  await next();
};
