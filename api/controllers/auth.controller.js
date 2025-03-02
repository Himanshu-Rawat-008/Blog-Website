import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';

export const signup = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password)
            return next(errorHandler(400, 'All field are required'));

        if (username.length < 1 || email.length < 1 || password.length < 1)
            return next(errorHandler(400, 'Empty Data is not validated'));

        const hashedPassword = bcryptjs.hashSync(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        await newUser.save();
        return res.status(200).json({ message: 'Successfully Signed Up.' });
    } catch (err) {
        next(err);
    }
};

export default signup;