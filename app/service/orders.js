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
  async lists(params) {
    return this.run(async (ctx, app) => {
      const result = await ctx.model.Orders.findAll({
        where: {
          is_payed: params.is_payed,
          user_id: params.userId,
        },
        limit: params.pageSize,
        offset: (params.pageNum - 1) * params.pageSize,
        include: {
          model: app.model.House,
          as: "house",
          include: [
            {
              model: app.model.Img,
              attributes: ["url"],
              limit: 1,
            },
          ],
        },
      });
      return result;
    });
  }
  async pay(params) {
    return this.run(async (ctx) => {
      const result = await ctx.model.Orders.update(
        {
          is_payed: 1,
          order_number: params.orderNumber,
        },
        {
          where: {
            id: params.id,
          },
        }
      );
      return result;
    });
  }
}

module.exports = OrdersService;
