const channels = require('../data/channels.json');

module.exports = async (req, res) => {
    res.send(channels);
};
