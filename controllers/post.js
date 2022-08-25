const postServices = require('../services/post');
const Post = require('../models/post');
const formidable = require("formidable");
const fs = require('fs');
const _ = require('lodash');

exports.getPosts = (req, res) => {
  const posts = Post.find()
        .populate("postedBy", "_id, name")
        .select("_id title description")
        .then(posts => {
          res.status(200).json({posts: posts});
        })
        .catch(err => console.log(err));
};

exports.createPost = async (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if(err) {
      return res.status(400).json({
        error: "Image could not be uploaded"
      });
    }
    let post = new Post(fields);
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    // console.log(req.profile);
    post.postedBy = req.profile;
    if(files.photo) {
      post.photo.data = fs.readFileSync(files.photo.path);
      post.photo.contentType = files.photo.type;
    }
    post.save((err, result) => {
      if(err) {
        return res.status(400).json({
          error: err
        });
      }
      res.json(result);
    })
  });

  // const result = await postServices.createPost(req.body);
  // // console.log("lone no ------41",result)
  // if(result) {
  //   res.status(200).json({ message: "Post saved successfully." });
  //   // res.status(200).json({ post: result });
  // } else {
  //   res.status(500).json({error: "Something went wrong, please try again."})
  // }
};

exports.postsByUser = (req, res) => {
  Post.find({postedBy: req.profile._id})
  .populate("postedBy", "_id, name")
  .sort("_created")
  .exec((err, posts) => {
    if(err) {
      return res.status(400).json({
        error: err
      });
    }
    return res.json(posts);
  });
};

exports.postById = (req, res, next, id) => {
  Post.findById(id)
  .populate("postedBy", "_id, name")
  .exec((err, post) => {
    if(err || !post) {
      return res.status(400).json({
        error: err
      });
    }
    req.post = post;
    next();
  });
};

exports.isPoster = (req, res, next) => {
  // console.log(req.auth._id);
  // console.log(req.post.postedBy._id);
  let isPoster = req.post && req.auth && req.post.postedBy._id == req.auth._id;
  if(!isPoster) {
    // console.log("not matched");
    return res.status(403).json({
      error: "User is not authorized."
    });
  }
  // console.log("matched");
  next();
}

exports.deletePost = (req, res, next) => {
  let post = req.post;
  post.remove((err, post) => {
    if(err) {
      return res.status(400).json({
        error: err
      });
    }
    return res.json(post);
  });
}

exports.updatePost = (req, res, next) => {
  let post = req.post;
  // console.log("Request post: ", req.post);
  post = _.extend(post, req.body);
  post.updated = Date.now();
  post.save(err => {
    // console.log(err);
    if(err) {
      return res.status(400).json({
        error: err
      });
    }
    return res.json(post);
  });
}