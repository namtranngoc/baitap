require('dotenv').config();
const express = require('express');
const app = require('./app');

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server đang chạy tại http://localhost:${port}`);
});