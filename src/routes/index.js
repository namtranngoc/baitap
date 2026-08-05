const homeRouter = require('./home');
const blogRouter = require('./blog');

function route(app) {

    app.use('/blogs', blogRouter);

    app.use('/', homeRouter);

}

module.exports = route;