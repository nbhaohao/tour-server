const BaseController = require("./base");

class HouseController extends BaseController {
  async hot() {
    const { ctx } = this;
    const houses = await ctx.service.house.hot();
    this.success(houses);
  }
}

module.exports = HouseController;
