const Blog = require('../models/Blogs');

class BlogController {

    // GET /blogs/:slug
    show(req, res, next) {

        Blog.findOne({ slug: req.params.slug })
            .lean()
            .then(blog => {

                if (!blog) {
                    return res.status(404).send('Không tìm thấy bài viết');
                }

                res.render('detail', {
                    blog
                });

            })
            .catch(next);
    }
}

module.exports = new BlogController();