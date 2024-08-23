// // import { DataTypes, Model } from 'sequelize';
// // import sequelize from '../config/database.js'; 
// // import bcrypt from "bcryptjs";

// // // import { Association } from './association.js';


// // const User = sequelize.define("userData", {
// //     username:{
// //       type:DataTypes.STRING,
// //       allowNull:false,
  
// //     },
// //     email:{
// //       type:DataTypes.STRING,
// //       unique:true,
// //       allowNull:false
// //     },
// //     password:{
// //       type:DataTypes.STRING,
// //       allowNull:false,
// //       unique:true,
// //       set(value){
// //         let saltKey = bcrypt.genSaltSync(12);
// //         let encryptedPassword =bcrypt.hashSync(value,saltKey);
// //         this.setDataValue("password",encryptedPassword);
// //       }
// //     },
// //     bio:{
// //       type:DataTypes.STRING,
// //       allowNull:false
// //     },
// //     gender:{
// //       type:DataTypes.ENUM('Male','female'),
// //       allowNull:false
// //     }
  
// //   });
  
  
  
// //   sequelize
// //     .sync()
// //     .then((result) => {
// //       console.log("USER TABLE CREATED SUCCESFULLY");
// //     })
// //     .catch((reject) => {
// //       console.log("SOMETHING WENT WRONG");
// //     });
  
// //   User.checkPassword = (password, encryptedPassword) => {
// //     let status = bcrypt.compareSync(password, encryptedPassword);
// //     console.log(password, encryptedPassword);
// //     console.log(status);
// //     return status;
// //   };
// //   export default User;
// import { DataTypes, Model } from 'sequelize';
// import sequelize from '../config/database.js'; 
// import bcrypt from "bcryptjs";

// const User = sequelize.define("userData", {
//     username: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     email: {
//         type: DataTypes.STRING,
//         unique: true, // Unique constraint for email
//         allowNull: false,
//     },
//     password: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         set(value) {
//             let saltKey = bcrypt.genSaltSync(12);
//             let encryptedPassword = bcrypt.hashSync(value, saltKey);
//             this.setDataValue("password", encryptedPassword);
//         }
//     },
//     bio: {
//         type: DataTypes.STRING,
//         allowNull: true,
//     },
//     gender: {
//         type: DataTypes.ENUM('Male', 'Female'),
//         allowNull: false,
//     }
// });

// sequelize
//     .sync({ alter: true })  // Adjust the schema if necessary without dropping the table
//     .then((result) => {
//         console.log("USER TABLE CREATED SUCCESSFULLY");
//     })
//     .catch((error) => {
//         console.error("SOMETHING WENT WRONG", error);
//     });

// User.checkPassword = (password, encryptedPassword) => {
//     return bcrypt.compareSync(password, encryptedPassword);
// };

// export default User;
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import bcrypt from 'bcryptjs';

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
            const saltKey = bcrypt.genSaltSync(12);
            const encryptedPassword = bcrypt.hashSync(value, saltKey);
            this.setDataValue('password', encryptedPassword);
        },
    },
    bio: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    gender: {
        type: DataTypes.ENUM('Male', 'Female'),
        allowNull: false,
    },
});

User.checkPassword = (password, encryptedPassword) => {
    return bcrypt.compareSync(password, encryptedPassword);
};

export default User;
