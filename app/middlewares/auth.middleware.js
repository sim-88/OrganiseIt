const { getUserById } = require('@models/user.model');
const { getSessionById, slideSessionFrame } = require('@models/session.model');

module.exports = function auth(authKeyword) {
    return function auth(req, res, next) {
        // Manually parse the cookie to get the session ID
        const cookies = req.headers.cookie;
        let token;
        
        if (cookies) {
            const parsedCookies = cookies.split(';').reduce((acc, cookie) => {
                const [key, value] = cookie.trim().split('=');
                acc[key] = value;
                return acc;
            }, {});
            
            token = parsedCookies.sessionid; // Assuming the session ID is stored under 'sessionid'
        }

        const userAgent = req.header('user-agent');

        console.log('Received token:', token);
        console.log('Received user-agent:', userAgent);

        // Check token availability
        if (!token) {
            return res.status(401).send('Access Denied. No Token Provided.');
        }

        // Check DB for session Token & Verify User Agent
        const session = getSessionById(token);
        console.log('Session from DB:', session);

        if (!session || session.userAgent !== userAgent) {
            console.log('Session validation failed. User agent does not match.');
            return res.status(401).send('Access Denied. Invalid Session.');
        }

        // Check for token Expiry
        if (session.expires < new Date()) {
            return res.status(401).send('Access Denied. Session Expired.');
        }

        // Slide User Expiry Time
        slideSessionFrame(token);

        // Get User by ID
        const user = getUserById(session.userId);
        if (!user) {
            return res.status(401).send('Access Denied. User Not Found.');
        }

        // Check for inactive user or user locking
        if (!user.isActive || user.isLocked) {
            return res.status(401).send('Access Denied. User is inactive or locked.');
        }

        // Authorization (Requires NO DATABASE CALL)
        // Check for User Role
        req.user = { name: user.name, _id: user._id, role: user.role };
        req.authKeyword = authKeyword;
        next();
    };
};
