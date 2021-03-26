const BaseController = require("./base");

class CommonsController extends BaseController {
  async cities() {
    this.success([
      [
        { label: "杭州", value: "10001" },
        { label: "苏州", value: "10002" },
        { label: "上海", value: "10003" },
      ],
    ]);
  }
}

module.exports = CommonsController;
