const BaseService = require("./base");

class HouseService extends BaseService {
  async hot() {
    return this.run(async (ctx, app) => {
      const houses = await ctx.model.House.findAll({
        limit: 4,
        order: [["show_count", "DESC"]],
        attributes: {
          exclude: ["start_time", "end_time", "publish_time"],
        },
        include: [
          {
            model: app.model.Img,
            limit: 1,
            attributes: ["url"],
          },
        ],
      });
      return houses;
    });
  }
}

module.exports = HouseService;
