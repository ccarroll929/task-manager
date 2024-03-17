// Required libraries
const {Model, DataTypes} = require('sequelize');
// const bcrypt             = require('bcrypt');
const crypt              = require('argon2');
const sequelize          = require('../config/connection');

const passwordMinLen = 8;

// User model for users
class User extends Model {
	/**
	 * Hashes a user password.
	 *
	 * @async
	 * @param {string} password - The plaintext password.
	 * @returns {Promise<string>} Hashed password.
	 */
	static async hashPassword(password) {
		return await crypt.hash(password);
	}

	/**
	 * Check the entered password against the hash in the database.
	 *
	 * @param {string} password - The plaintext password.
	 * @returns {boolean} The result of comparing the hashed and plaintext passwords.
	 */
	async checkPassword(password) {
		return await crypt.verify(this.password, password);
	}
}

// Run the init function
User.init({
	          // ID
	          id: {
		          type:          DataTypes.INTEGER,
		          allowNull:     false,
		          primaryKey:    true,
		          autoIncrement: true
	          },
	          // Username
	          username: {
		          type:      DataTypes.STRING,
		          allowNull: false,
		          unique:    true,
		          validate:  {
			          isAlphanumeric: true
		          }
	          },
	          // Password
	          password: {
		          type:      DataTypes.STRING,
		          allowNull: false,
		          validate:  {
			          len: [passwordMinLen]
		          }
	          }
          },
          // Extra parameters
          {
	          // Hooks
	          hooks:           {
		          // Before creating the entry, make sure that the user's password is encrypted
		          beforeCreate: async (userData) => {
			          console.log('Updated Password');
			          // Hash user password
			          userData.password = await User.hashPassword(userData.password);
			          return userData;
		          },
		          // Before updating, make sure the user's password is encrypted.
		          beforeUpdate: async (userData) => {
			          // Hash user password
			          userData.password = await User.hashPassword(userData.password);
			          return userData;
		          }
	          },
	          sequelize,
	          timestamps:      false,
	          freezeTableName: true,
	          underscored:     true,
	          modelName:       'user'
          });
// Export module
module.exports = User;
