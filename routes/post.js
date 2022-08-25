const express = require('express');
const router = express.Router();
const {
  getPosts,
  createPost,
  postsByUser,
  postById,
  isPoster,
  deletePost,
  updatePost
} = require("../controllers/post");
const { requireSignIn } = require("../controllers/auth");
const schemas = require("../validator/schemas");
const { middleware } = require("../middleware/validatorMiddleware");
const { userById } = require("../controllers/user");
router.get("/posts", getPosts);
router.post(
  "/posts/create/:userId",
  requireSignIn,
  createPost,
  middleware(schemas.schemas.createPost)
);
router.get("/posts/by/:userId", requireSignIn , postsByUser);
router.delete("/post/:postId", requireSignIn, isPoster, deletePost);
router.put("/post/:postId", requireSignIn, isPoster, updatePost);
//any route containing :userId our app will first execute userById()
router.param("userId", userById);

//any route containing :postId our app will first execute postById()
router.param("postId", postById);
module.exports = router;