const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const users = []; 

function hashPassword(password) {
    try {
        return bcrypt.hashSync(password, 8);
    } catch (error) {
        throw new Error('Error hashing password');
    }
}

function verifyPassword(inputPassword, hashedPassword) {
    try {
        return bcrypt.compareSync(inputPassword, hashedPassword);
    } catch (error) {
        throw new Error('Error verifying password');
    }
}

function generateToken(user) {
    try {
        return jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    } catch (error) {
        throw new Error('Error generating token');
    }
}

function register(username, password) {
    const userExists = users.some((user) => user.username === username);
    if(userExists){
        return { error: "Username already exists" };
    }

    try {
        const hashedPassword = hashPassword(password);
        const newUser = {
            id: users.length + 1,
            username,
            password: hashedPassword,
        };
        users.push(newUser);

        return { message: "User registered successfully", user: newUser };
    } catch (error) {
        return { error: "Failed to register user" };
    }
    
}

function login(username, password) {
    const user = users.find((user) => user.username === username);

    if(!user) {
        return { error: "User not found" };
    }

    try {
        const passwordIsValid = verifyPassword(password, user.password);
        
        if (!passwordIsValid) {
            return { error: "Password is incorrect" };
        }

        const token = generateToken(user);
        return { message: "Login successful", token: token };
    } catch (error) {
        return { error: "Login failed" };
    }
    
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