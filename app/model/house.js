module.exports = (app) => {
  const { STRING, INTEGER, DATE } = app.Sequelize;
  const House = app.model.define("house", {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: STRING(50),
    info: STRING(150),
    address: STRING(200),
    price: INTEGER,
    publish_time: {
      type: DATE,
      get() {
        return new Date(this.getDataValue("publish_time")).getTime();
      },
    },
    city_code: STRING,
    show_count: INTEGER,
    start_time: {
      type: DATE,
      get() {
        return new Date(this.getDataValue("start_time")).getTime();
      },
    },
    end_time: {
      type: DATE,
      get() {
        return new Date(this.getDataValue("end_time")).getTime();
      },
    },
  });
  // House -> Img 一对多
  House.associate = () => {
    app.model.House.hasMany(app.model.Img, {
      foreignKey: "house_id",
    });
  };
  return House;
};
