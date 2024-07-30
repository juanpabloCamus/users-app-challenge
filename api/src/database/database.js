import { Sequelize } from 'sequelize';
import User from '../models/User.js';

const DB_NAME = process.env.DB_NAME || 'users';
const DB_USER = process.env.DB_USER || 'root';
const DB_PASSWORD = process.env.DB_PASSWORD || 'juanpablo';

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: 'localhost',
  dialect: 'mysql',
  logging: (sql) => console.log(sql),
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log(
      'Connection to the database has been established successfully.',
    );
  } catch (error) {
    console.error('Database connection error: ', error);
  }
})();

User.initialize(sequelize);

export default sequelize;
