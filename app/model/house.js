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
    publish_time: DATE,
    city_code: STRING,
    show_count: INTEGER,
    start_time: DATE,
    end_time: DATE,
  });
  // House -> Img 一对多
  House.associate = () => {
    app.model.House.hasMany(app.model.Img, {
      foreignKey: "house_id",
    });
  };
  return House;
};
