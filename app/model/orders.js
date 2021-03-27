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
        return new Date(this.getDataValue("create_time")).getTime();
      },
    },
    update_time: {
      type: DATE,
      get() {
        return new Date(this.getDataValue("update_time")).getTime();
      },
    },
  });
  Orders.associate = () => {
    app.model.Orders.belongsTo(app.model.House, {
      foreignKey: "house_id",
      as: "house",
    });
  };
  return Orders;
};
