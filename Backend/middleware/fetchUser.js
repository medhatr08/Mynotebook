const jwt = require('jsonwebtoken');
const JWT_SECRET = 'Goodgi$rl';

const fetchUser = (req, res, next) => {
    //Get the user from the jwt token and id tp req object
    const token = req.header('auth-token');
    console.log(token)
    if (!token) {
        res.status(401).send({ error: "Please authenticate using valid token" })
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    }
    catch (error) {
        res.status(401).send({ error: "Please authenticate using valid token" })
        console.log(error);
    }
}

module.exports = fetchUser;