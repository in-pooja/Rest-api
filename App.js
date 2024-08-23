import express from 'express';
import sequelize from './config/database.js'; 
import User from './models/usermodel.js'; 
import userRoutes from './routes/userRoutes.js';

const app = express();

app.use(express.json());
app.use('/user', userRoutes);

const PORT = process.env.PORT || 3000;


sequelize.sync({ alter: true }) 
    .then(() => {
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch(err => {
        console.error("Unable to sync the database:", err);
    });
