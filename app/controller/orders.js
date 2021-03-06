const BaseController = require("./base");

class OrdersController extends BaseController {
  async hasOrder() {
    const { ctx } = this;
    const result = await ctx.service.orders.hasOrder({
      userId: ctx.userId,
      houseId: ctx.params("id"),
    });
    this.success(result);
  }
  async addOrder() {
    const { ctx } = this;
    const result = await ctx.service.orders.addOrder({
      user_id: ctx.userId,
      house_id: ctx.params("id"),
      is_payed: 0,
      create_time: ctx.helper.time(),
    });
    this.success(result);
  }
  async delOrder() {
    const { ctx } = this;
    const result = await ctx.service.orders.delOrder(ctx.params("id"));
    this.success(result);
  }
  async lists() {
    const { ctx } = this;
    const result = await ctx.service.orders.lists({
      ...ctx.params(),
      userId: ctx.userId,
    });
    this.success(result);
  }
  async invokePay(params) {
    return {
      orderNumber: `${params.id}${new Date().getTime()}`,
    };
  }
  async pay() {
    const { ctx } = this;
    const { id } = ctx.params();
    const order = await ctx.model.Orders.findByPk(id);
    if (order) {
      try {
        const beforePay = await this.invokePay({ id });
        const result = await ctx.service.orders.pay({
          id,
          orderNumber: beforePay.orderNumber,
        });
        this.success(result);
      } catch (e) {
        this.error("订单支付失败");
      }
    } else {
      this.error("订单不存在");
    }
  }
}

module.exports = OrdersController;
