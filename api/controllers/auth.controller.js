import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

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


export const signInController = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password || email === '' || password === '') {
        next(errorHandler(400, 'All fields are required'));
    }
    try {
        const validUser = await User.findOne(({ email }));
        if (!validUser) {
            return next(errorHandler(400, 'User not found'));
        }

        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) {
            return next(errorHandler(400, 'Invalid Password'));
        }

        // eslint-disable-next-line no-undef
        const token = jwt.sign({ id: validUser._id, isAdmin: validUser.isAdmin }, process.env.JWT_SECRET_KEY);
        const { password: pass, ...rest } = validUser._doc;

        res.status(200).cookie('access_token', token, { httpOnly: true }).json(rest);
    } catch (err) {
        next(err);
    }
};

export const googleController = async (req, res, next) => {
    const { email, name, googlePhotoUrl} = req.body;
    try {
        let user = await User.findOne({ email });
        if(!user) {
            const generatedPassword = Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10); 
            const newUser = new User({
                username: name.toLowerCase().split(' ').join('') + Math.random().toString(9).slice(-4),
                email,
                password: hashedPassword,
                profilePicture: googlePhotoUrl,
            });
            await newUser.save();
            user = newUser;
        }

        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin  }, process.env.JWT_SECRET_KEY);
        const { password, ...rest} = user._doc;
        res.status(200).cookie('access_token', token, {httpOnly:true}).json(rest);
        
    } catch(err) {
        next(err);
    }
}