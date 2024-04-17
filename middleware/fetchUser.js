const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const fetchUser = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).send({ errors: "Please login in" });
    }

    try {
        const data = jwt.verify(token, process.env.JWT_SECRET);
        req.headers["userId"] = data.user.id;
        next();
    } catch (error) {
        return res.status(401).send({ errors: "Not Authorized" });
    }
};

module.exports = fetchUser;
