  
const Post = require('../../models/Post')
// const checkAuth = require('../../utils/checkAuth')
// const user = checkAuth(context)

module.exports = {
    Query: {
        async getPosts() {
          try {
            const posts = await Post.find();
            return posts;
          } catch (err) {
            console.log(err);
            throw new Error(err);
          }
        },
      },
}