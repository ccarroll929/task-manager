// import models
const Task    = require('./Task');
const User   = require('./User');

// Products belongsTo Category
Task.belongsTo(User, {foreignKey: 'category_id'});

// Categories have many Products
User.hasMany(Task, {foreignKey: 'category_id'});
