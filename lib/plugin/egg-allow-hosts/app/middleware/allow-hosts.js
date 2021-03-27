module.exports = (options) => {
  return async (ctx, next) => {
    const { referer } = ctx.request.headers;
    if (referer) {
      const url = new URL(referer);
      if (options.includes(url.host)) {
        await next();
        return;
      }
    }
    ctx.body = {
      status: 403,
      errMsg: `host被禁止`,
    };
  };
};
