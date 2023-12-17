const mongoose = require('mongoose');

module.exports = function() {
    mongoose.connect(process.env.MongoDB);
    const db = mongoose.connection;
    
    db.on('error', console.error.bind(console, '[INFO] Couldn\'t connect to MongoDB\n'));
    db.once('open', () => {
        console.log('[INFO] Connected to MongoDB');
    });
};