module.exports = (app) => {
  const { STRING, INTEGER, DATE } = app.Sequelize;
  const Comment = app.model.define("comment", {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: INTEGER,
    house_id: INTEGER,
    msg: STRING(500),
    create_time: DATE,
  });
  Comment.associate = () => {
    app.model.Comment.belongsTo(app.model.User, {
      foreignKey: "user_id",
    });
  };
  return Comment;
};
