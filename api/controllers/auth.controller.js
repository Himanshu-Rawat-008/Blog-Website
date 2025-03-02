import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';

export const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password)
            return res.status(400).json({ message: 'All field are required' });

        if (username.length < 1 || email.length < 1 || password.length < 1)
            return res.status(400).json({ message: 'Empty Data is not validated ' });

        const hashedPassword = bcryptjs.hashSync(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        await newUser.save();
        return res.status(200).json({ message: 'Successfully Signed Up.' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export default signup;