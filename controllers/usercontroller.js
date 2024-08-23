import User from '../models/usermodel.js';
import UserFollowers from '../models/userfollowers.js';
import bcrypt from 'bcryptjs'; // Use 'bcryptjs' for consistency
import { resolveInclude } from 'ejs';

export const createUser = async (req, res) => {
    try {
        const { username, email, password, bio, gender } = req.body;

        if (!username || !email || !password || !bio || !gender) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newUser = await User.create({ username, email, password, bio, gender });

        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const getUserByEmail = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }

        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { email } = req.body;
        const { username, password, bio, gender } = req.body;

        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }

        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (username) user.username = username;
        if (password) {
            const saltKey = bcrypt.genSaltSync(12);
            user.password = bcrypt.hashSync(password, saltKey);
        }
        if (bio) user.bio = bio;
        if (gender) user.gender = gender;

        await user.save();

        res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }

        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await user.destroy();

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// export const followUser = async (req, res) => {
//     const { userId, userToFollowId } = req.body;

//     try {
//         const user = await User.findByPk(userId);
//         const userToFollow = await User.findByPk(userToFollowId);

//         if (!user || !userToFollow) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         await user.addFollowing(userToFollow);
//         return res.status(200).json({ message: 'User followed successfully' });
//     } catch (error) {
//         console.error('Error following user:', error);
//         return res.status(500).json({ message: 'Internal server error' });
//     }
// };

// export const unfollowUser = async (req, res) => {
//     const { userId, userToUnfollowId } = req.body;

//     try {
//         const user = await User.findByPk(userId);
//         const userToUnfollow = await User.findByPk(userToUnfollowId);

//         if (!user || !userToUnfollow) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         await user.removeFollowing(userToUnfollow);
//         return res.status(200).json({ message: 'User unfollowed successfully' });
//     } catch (error) {
//         console.error('Error unfollowing user:', error);
//         return res.status(500).json({ message: 'Internal server error' });
//     }
// };
// import User from '../models/usermodel.js'; // Ensure the correct path to your User model
export const followUser = async (req, res) => {
    const { userId, userToFollowId } = req.body;

    try {
        // Check if both user IDs are provided
        if (!userId || !userToFollowId) {
            return res.status(400).json({ message: 'Both userId and userToFollowId are required' });
        }

        // Find the users
        const user = await User.findByPk(userId);
        const userToFollow = await User.findByPk(userToFollowId);

        // Check if both users exist
        if (!user || !userToFollow) {
            return res.status(404).json({ message: 'User or user to follow not found' });
        }

        // Check if the user is already following the other user
        const isFollowing = await user.hasFollowing(userToFollow);
        if (isFollowing) {
            return res.status(400).json({ message: 'User is already following the specified user' });
        }

        // Add the following relationship
        await user.addFollowing(userToFollow);

        return res.status(200).json({ message: 'User followed successfully' });
    } catch (error) {
        console.error('Error following user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


export const unfollowUser = async (req, res) => {
    const { userId, userToUnfollowId } = req.body;

    try {
        
        if (!userId || !userToUnfollowId) {
            return res.status(400).json({ message: 'Both userId and userToUnfollowId are required' });
        }


        const user = await User.findByPk(userId);
        const userToUnfollow = await User.findByPk(userToUnfollowId);

    
        if (!user || !userToUnfollow) {
            return res.status(404).json({ message: 'User or user to unfollow not found' });
        }

    
        const isFollowing = await user.hasFollowing(userToUnfollow);
        if (!isFollowing) {
            return res.status(400).json({ message: 'User is not following the specified user' });
        }


        await user.removeFollowing(userToUnfollow);

        return res.status(200).json({ message: 'User unfollowed successfully' });
    } catch (error) {
        console.error('Error unfollowing user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const checkPassword = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = bcrypt.compareSync(password, user.password);

        if (isMatch) {
            res.status(200).json({ message: 'Password is correct' });
        } else {
            res.status(400).json({ message: 'Invalid password' });
        }
    } catch (error) {
        console.error('Error checking password:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
