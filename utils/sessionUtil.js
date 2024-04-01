const db = require("../database/config/database");
const collection = db.collection("sessions");

exports.getSessionId =  async (sessionID) => {
    const sessions = await collection.findOne({ _id: sessionID });
    return sessions ? sessions.session.passport.user : null;
};