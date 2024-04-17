const express = require('express');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/fetchUser');
const User = require('../model/User');
const SGPA = require('../model/SGPA');
const dotenv = require('dotenv');

dotenv.config();

const router = express.Router();

const semesters = [1, 2, 3, 4, 5, 6, 7, 8];
//Validation middleware for Signup
const validationSignup = [
    body('semester').isNumeric().withMessage("Invalid semester"),
    body('points').isNumeric().withMessage("Invalid points"),
    body('credits').isNumeric().withMessage("Invalid Credits"),
];

// ROUTE 1: Set SGPA: POST-'/api/semester/sgpa'
router.post('/sgpa', fetchUser, validationSignup, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { semester, points, credits } = req.body;
        if (!semesters.includes(semester)) return res.status(400).send('Invalid Semester');
        if (points / credits < 0 || points / credits > 10) return res.status(400).send('Invalid SGPA');
        const userId = req.headers['userId'];

        let sgpaSemester = await SGPA.findOne({ userId, semester });
        if (sgpaSemester) {
            await SGPA.findOneAndUpdate({ userId, semester }, { $set: { points, credits } })
        } else {
            await SGPA.create({ userId, semester, points, credits });
        }
        res.status(201).json({ success: "Done" });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error');
    }
});

// ROUTE 2: Get CGPA User: GET-'/api/semester/cgpa'
router.get('/cgpa', fetchUser, async (req, res) => {
    try {
        const userId = req.headers['userId'];

        let currentUser = await User.findOne({ _id: userId }).select("-password");
        if (!currentUser) {
            return res.status(400).json({ errors: "Invalid credentials" });
        }
        let points = 0;
        let credits = 0;

        let sgpas = await SGPA.find({ userId });

        res.status(200).json(sgpas);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ errors: 'Internal Server Error' });
    }
});

module.exports = router;
