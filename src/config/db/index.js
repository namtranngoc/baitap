const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Kết nối Database thành công!');
    } catch (error) {
        console.log('❌ Kết nối Database thất bại!');
        console.log(error);
    }
}

module.exports = { connect };