const {Model, DataTypes} = require('sequelize');
const sequelize          = require('../config/connection');

// Create Project model and datatypes, including the user_id foreign key.
class User extends Model {}

User.init(
	{
		id:           {
			type:          DataTypes.INTEGER,
			allowNull:     false,
			primaryKey:    true,
			autoIncrement: true
		},
		first_name: {
			type:      DataTypes.STRING,
			allowNull: false,
			validate: {
				isAlpha: true
			}
		},
		last_name: {
			type:      DataTypes.STRING,
			allowNull: false,
			validate: {
				isAlpha: true
			}
		},
		password: {
			type:      DataTypes.STRING,
			allowNull: false
		},
		username:         {
			type:      DataTypes.STRING,
			allowNull: false
		},
		email:        {
			type: DataTypes.STRING,
			validate: {
				isEmail: true
			}
		},
		date_created: {
			type:         DataTypes.DATE,
			allowNull:    false,
			defaultValue: DataTypes.NOW
		}
	},
	{
		sequelize,
		timestamps:      false,
		freezeTableName: true,
		underscored:     true,
		modelName:       'project'
	}
);

module.exports = User;
