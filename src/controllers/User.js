const User = require("../db/Schemas/User");

const register = async (req, res) => {
    try {
        await User.create(req.body);
        return res.status(200).json({ ok: 'Successful' });
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
const getInfo = async (req, res) => {
    try {
        const { email } = req.params;
        const user = await User.findOne({ email });
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
const editInfo = async (req, res) => {
    try {
        const { email } = req.params;
        await User.findOneAndUpdate({ email }, { ...req.body });
        return res.status(200).json({ ok: 'Successful' });
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    register,
    getInfo,
    editInfo
}

