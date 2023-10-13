const express = require('express');
const Router = express.Router();
const Module = require('../models/module');

Router.get('/', (req, res) => {
    const { alert } = req.query;
    res.render('login', { title: alert ? alert : '', password: '', email: '' });
});

Router.post('/register', async (req, res) => {
    try {
        const {
            name,
            email,
            password,
            cpassword
        } = req.body;

        const user = await Module.findOne({ email: email });

        if (user) {
            res.redirect('/?alert=Email already exists');
        } else if (password === cpassword) {
            const userData = new Module({
                name,
                email,
                password,
            });
            await userData.save();
            res.redirect('/?alert=Registration successful');
        } else {
            res.redirect('/?alert=Passwords do not match');
        }
    } catch (error) {
        console.error(error);
        res.redirect('/?alert=Error occurred during registration');
    }
});

// Register
Router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Module.findOne({ email: email });

        if (user && user.password === password) {
            res.render('dashboard', { name: user.name });
        } else {
            res.redirect('/?alert=Invalid email or password');
        }
    } catch (error) {
        console.error(error);
        res.redirect('/?alert=Error occurred during login');
    }
});

module.exports = Router;
