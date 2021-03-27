const BaseService = require("./base");

class OrdersService extends BaseService {
  async hasOrder(params) {
    return this.run(async (ctx) => {
      const result = await ctx.model.Orders.findOne({
        where: {
          user_id: params.userId,
          house_id: params.houseId,
        },
      });
      return result;
    });
  }
  async addOrder(params) {
    return this.run(async (ctx) => {
      const result = await ctx.model.Orders.create(params);
      return result;
    });
  }
  async delOrder(id) {
    return this.run(async (ctx) => {
      const result = await ctx.model.Orders.destroy({
        where: {
          id,
        },
      });
      return result;
    });
  }
}

module.exports = OrdersService;