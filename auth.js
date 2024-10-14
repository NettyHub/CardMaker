const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const users = []; 

function hashPassword(password) {
    return bcrypt.hashSync(password, 8);
}

function verifyPassword(inputPassword, hashedPassword) {
    return bcrypt.compareSync(inputPassword, hashedPassword);
}

function generateToken(user) {
    return jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
}

function register(username, password) {
    const hashedPassword = hashPassword(password);
    const newUser = {
        id: users.length + 1,
        username,
        password: hashedPassword,
    };
    users.push(newUser);

    return { message: "User registered successfully", user: newUser };
}

function login(username, password) {
    const user = users.find((user) => user.username === username);

    if(!user) {
        return { error: "User not found" };
    }
    const passwordIsValid = verifyPassword(password, user.password);
    
    if (!passwordIsValid) {
        return { error: "Password is incorrect" };
    }

    const token = generateToken(user);
    return { message: "Login successful", token: token };
}

function isAuthenticated(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1]; 

    if (!token) {
        return res.status(403).send({ message: "A token is required for authentication" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).send({ message: "Invalid Token" });
    }
}

module.exports = {
    register,
    login,
    isAuthenticated
};