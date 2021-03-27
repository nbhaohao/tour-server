module.exports = (app) => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Orders = app.model.define("orders", {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    order_number: STRING(20),
    user_id: INTEGER,
    house_id: INTEGER,
    is_payed: INTEGER,
    create_time: {
      type: DATE,
      get() {
        return new Date(this.getDataValue("created_time")).getTime();
      },
    },
    update_time: {
      type: DATE,
      get() {
        return new Date(this.getDataValue("created_time")).getTime();
      },
    },
  });
  return Orders;
};
