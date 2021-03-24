const Service = require("egg").Service;

class BaseService extends Service {
  run(callback) {
    const { ctx, app } = this;
    try {
      if (callback) {
        return callback(ctx, app);
      }
    } catch (e) {
      console.log("error", e);
      return null;
    }
  }
}

module.exports = BaseService;
