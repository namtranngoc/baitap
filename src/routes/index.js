
const homeRouter = require('./home');
const blogRouter = require('./blog');

function route(app) {

    // Các route liên quan đến blog
    app.use('/blogs', blogRouter);

    // Các route trang chính
    app.use('/', homeRouter);

}

module.exports = route;
