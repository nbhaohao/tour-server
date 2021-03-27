const BaseController = require("./base");

class CommentController extends BaseController {
  async add() {
    const { ctx } = this;
    const user = await ctx.service.user.getUser(ctx.username);
    const result = await ctx.service.comment.add({
      user_id: user.id,
      house_id: ctx.params("houseId"),
      msg: ctx.params("comment"),
      create_time: ctx.helper.time(),
    });
    this.success(result);
  }
  async lists() {
    const { ctx } = this;
    const user = await ctx.service.user.getUser(ctx.username);
    const result = await ctx.service.comment.lists(ctx.params(), user.id);
    this.success(result);
  }
}

module.exports = CommentController;
