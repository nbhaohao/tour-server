const BaseService = require("./base");

class HouseService extends BaseService {
  commonAttr(app) {
    return {
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
    };
  }
  async hot() {
    return this.run(async (ctx, app) => {
      const houses = await ctx.model.House.findAll({
        ...this.commonAttr(app),
        limit: 4,
      });
      return houses;
    });
  }
  async search(params) {
    return this.run(async (ctx, app) => {
      const { lte, gte, like } = app.Sequelize.Op;
      const where = {
        city_code: Array.isArray(params.code) ? params.code[0] : params.code,
        // start_time: {
        //   [lte]: params.startTime,
        // },
        // end_time: {
        //   [gte]: params.endTime,
        // },
        name: {
          [like]: `%${params.houseName}%`,
        },
      };
      if (!params.houseName) {
        delete where.name;
      }
      const houses = await ctx.model.House.findAll({
        ...this.commonAttr(app),
        limit: params.pageSize,
        offset: (params.pageNum - 1) * params.pageSize,
        where,
      });
      return houses;
    });
  }
}

module.exports = HouseService;
