module.exports = (app) => {
  const { STRING, INTEGER, DATE } = app.Sequelize;
  return app.model.define("img", {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    url: STRING(500),
    house_id: INTEGER,
    create_time: DATE,
  });
};
