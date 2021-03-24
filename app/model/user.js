module.exports = app => {
  const {STRING, INTEGER, TEXT, DATE} = app.Sequelize;

  return app.model.define('user', {
    id: {type: INTEGER, primaryKey: true, autoIncrement: true},
    username: STRING(20),
    password: STRING(64),
    avatar: TEXT('long'),
    phone: STRING(20),
    sign: STRING(300),
    create_time: DATE,
    update_time: DATE
  });
}