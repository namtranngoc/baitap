const mongoose = require('mongoose');

let isConnected = false;

async function connect() {
    if (isConnected) {
        return;
    }

    try {
        if (!process.env.MONGODB_URI) {
            throw new Error('MONGODB_URI chưa được thiết lập');
        }

        await mongoose.connect(process.env.MONGODB_URI);

        isConnected = true;
        console.log('✅ Kết nối MongoDB thành công!');
    } catch (error) {
        console.error('❌ MongoDB connection error:', error.message);
        throw error;
    }
}

module.exports = { connect };