import express from 'express';
import { createUser, getUserByEmail, updateUser, deleteUser, followUser, unfollowUser,checkPassword } from '../controllers/userController.js';

const router = express.Router();


router.post('/users', createUser);


router.get('/get', getUserByEmail);


router.put('/update', updateUser);


router.delete('/delete', deleteUser);


router.post('/follow', followUser);


router.post('/unfollow', unfollowUser);

 router.post('/check-password', checkPassword);

export default router;
