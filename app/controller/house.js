const BaseController = require("./base");

class HouseController extends BaseController {
  async hot() {
    const { ctx } = this;
    const houses = await ctx.service.house.hot();
    this.success(houses);
  }
  async search(params) {
    const { ctx } = this;
    const house = await ctx.service.house.search(ctx.params());
    this.success(house);
  }
}

module.exports = HouseController;
