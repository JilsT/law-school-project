const bcrypt = require('bcryptjs');
const User = require("../models/Users");
const jwt = require('jsonwebtoken');
const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");

const signup = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new HttpError("Invalid inputs passes, please check the provided data.", 422);
        return next(error);
    }

    const { name, email, password } = req.body;

    let exsistingUser;
    try {
        exsistingUser = await User.findOne({ email: email });
    } catch (err) {
        const error = new HttpError("Signup failed, please try again.", 500);
        return next(error);
    }

    if (exsistingUser) {
        const error = new HttpError("User with the provided email already exists again, try to login or signup with a different mail.", 422);
        return next(error);
    }

    let hashedPassword;

    try {
        hashedPassword = await bcrypt.hash(password, 12);
    } catch (err) {

    }

    const createdUser = new User({
        name,
        email,
        password: hashedPassword
    });

    try {
        await createdUser.save();
    } catch (err) {
        const error = new HttpError("Signing up failed, please try again", 500);
        return next(error);
    }

    res.status(201).json({ createdUser });
}

const login = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new HttpError("Invalids input passed, please try again.", 422);
        return next(error);
    }

    const { email, password } = req.body;

    let exsistingUser;
    try {
        exsistingUser = await User.findOne({ email: email });
    } catch (err) {
        const error = new HttpError("Login failed, please try again.", 500);
        return next(error);
    }

    if (!exsistingUser) {
        const error = new HttpError("Invalid credentials provided, please try again.", 401);
        return next(error);
    }

    let isValidPassword = false;
    try {
        isValidPassword = await bcrypt.compare(password, exsistingUser.password);
    } catch (err) {
        const error = new HttpError("Could not login, please check your credentials and try again.", 401);
        return next(error);
    }

    if (!isValidPassword) {
        const error = new HttpError("Invalid credentials provided, please try again.", 401);
        return next(error);
    }

    const token = jwt.sign(
        { userId: exsistingUser._id, email: exsistingUser.email, name: exsistingUser.name },
        'huehue_secret-key_huehue',
        {
            expiresIn: '1h'
        }
    );

    res.json({
        userId: exsistingUser.id,
        token: token,
        tokenExpiration: 1,
        name: exsistingUser.name
    });

}

exports.login = login;
exports.signup = signup;