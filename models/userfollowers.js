
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './usermodel.js';  // Correct import for User model

const UserFollowers = sequelize.define('UserFollowers', {
    followerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'User',
            key: 'id',
        },
    },
    followingId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'User',
            key: 'id',
        },
    },
});

User.belongsToMany(User, {
    through: UserFollowers,
    as: 'Followers',
    foreignKey: 'followingId',
    otherKey: 'followerId',
});

User.belongsToMany(User, {
    through: UserFollowers,
    as: 'Following',
    foreignKey: 'followerId',
    otherKey: 'followingId',
});

sequelize
    .sync({ alter: true })
    .then(() => {
        console.log('USERFOLLOWERS TABLE CREATED SUCCESSFULLY');
    })
    .catch((error) => {
        console.error('SOMETHING WENT WRONG', error);
    });

export default UserFollowers;

