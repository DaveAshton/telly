lirc_node = require('lirc_node');
lirc_node.init();

module.exports = async (req, res) => {
    let keys;
    console.log('selectChannel request', req.params);
    if (req.params) {
        console.log('about to irsend command..' + req.params.id);
        keys = ['KEY_' + req.params.id];
    }

    console.log(lirc_node.remotes);

    lirc_node.irsend.send_once('TEL', keys, function() {
        console.log('Sent command!');
        console.log(keys);
    });
    res.sendStatus(200);
};
