import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const router = express.Router();

//ROUTE FOR REGISTER
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        const savedUser = await newUser.save();

        const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ token, message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

const createToket = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET);
};

//ROUTE FOR LOGIN
router.post('/login', async (req, res) => {
    // try {
    //     const { email, password } = req.body;

    //     const user = await User.findOne({ email });
    //     if (!user) {
    //         return res.status(400).json({ message: 'Invalid credentials' });
    //     }

    //     const isMatch = await bcrypt.compare(password, user.password);
    //     if (isMatch) {
    //         const payload = {
    //             id: user._id,
    //             email: user.email
    //         };

    //         jwt.sign(
    //             payload,
    //             process.env.JWT_SECRET,
    //             { expiresIn: 3600 },
    //             (error, token) => {
    //                 if (error) throw error;

    //                 res.json({
    //                     token,
    //                     user: { id: user._id, email: user.email }
    //                 });
    //             }
    //         );
    //     } else {
    //         return res.status(400).json({ message: 'Invalid credentials' });
    //     }
    // } catch (error) {
    //     console.error(error);
    //     res.status(500).send('Server error');
    // }

    const { email, password } = req.body;

	try {
		const user = await userModel.findOne({ email });
		if (!user) {
			return res.json({ success: false, message: "User does's nor exist" });
		}
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.json({ success: false, message: 'Invalid credentials' });
		}

		const token = createToket(user._id);
		res.json({ success: true, token });
	} catch (error) {
		console.log(error);
		res.json({ success: false, message: 'Error' });
	}
});

export { router as authRouter };