const app = require('./app');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({
    path: './config.env',
});

mongoose.connect(process.env.DATABASE, {}, async () => {
    try {
        console.log('DATABASE IS CONNECTEDⓂ️');
    } catch (error) {
        console.log('DATABASE IS NOT CONNECTED');
        process.exit(1);
    }
});

app.listen(process.env.PORT, '127.0.0.1', async () => {
    try {
        console.log('Server is running✅');
    } catch (error) {
        console.log('Server is on fire🔥');
        process.exit(1);
    }
});
