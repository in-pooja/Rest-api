
import { Sequelize } from 'sequelize';
import mysql from 'mysql2/promise';

const databaseName = 'social_media';

const createDatabase = async () => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
    });

    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${databaseName}\`;`);
    await connection.end();
};

await createDatabase();
const sequelize = new Sequelize(databaseName, 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
});

sequelize.authenticate()
    .then(() => {
        console.log("Database connected...");
    })
    .catch(err => {
        console.log('Unable to connect to the database:', err);
    });

export default sequelize;
