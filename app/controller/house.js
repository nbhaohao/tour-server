const BaseController = require("./base");

class HouseController extends BaseController {
  async hot() {
    const { ctx } = this;
    const houses = await ctx.service.house.hot();
    this.success(houses);
  }
  async search() {
    const { ctx } = this;
    const house = await ctx.service.house.search(ctx.params());
    this.success(house);
  }
  async detail() {
    const { ctx } = this;
    const house = await ctx.service.house.detail(ctx.params("id"));
    this.success({
      info: house,
      banner: house.imgs,
    });
  }
}

module.exports = HouseController;
