const {getSessionId} = require("../utils/sessionUtil")


const requireAuth = async (req, res, next) => {
    try {
        const session_id = await getSessionId(req.session.id);
        if (
            req.session &&
            req.session.id === session_id &&
            req.session.sessionKey === req.headers.sessionkey
        ) {
            next();
        } else {
            res.status(401).json({ message: "Unauthorized" });
        }
    } catch (error) {
        console.error("Error checking authentication:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
  
module.exports = requireAuth;
  