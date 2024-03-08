const {Model, DataTypes} = require('sequelize');
const sequelize          = require('../config/connection');

// Create Project model and datatypes, including the user_id foreign key.
class Task extends Model {}

Task.init(
	{
		id:             {
			type:          DataTypes.INTEGER,
			allowNull:     false,
			primaryKey:    true,
			autoIncrement: true
		},
		name:           {
			type:      DataTypes.STRING,
			allowNull: false
		},
		description:    {
			type: DataTypes.STRING
		},
		date_created:   {
			type:         DataTypes.DATE,
			allowNull:    false,
			defaultValue: DataTypes.NOW
		},
		notes: {
			type:      DataTypes.TEXT,
			allowNull: true
		},
		user_id:        {
			type:       DataTypes.INTEGER,
			references: {
				model: 'user',
				key:   'id'
			}
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

module.exports = Task;
