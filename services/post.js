const Post = require("../models/post");
exports.createPost = async (data) => {
  const post = new Post(data);
  // let response = {};
  return  await post.save();

  // return response;
  // post.save().then(result => {
  //   res.status(200).json({ post: result });
  // });
};