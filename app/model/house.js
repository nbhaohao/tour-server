module.exports = (app) => {
  const {STRING, INTEGER, DATE} = app.Sequelize;
  return app.model.define('house', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: STRING(50),
    info: STRING(150),
    address: STRING(200),
    price: INTEGER,
    publish_time: DATE,
    city_code: STRING,
    show_count: INTEGER,
    start_time: DATE,
    end_time: DATE
  })
};
