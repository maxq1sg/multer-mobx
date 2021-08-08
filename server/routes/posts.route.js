const Router = require("express");
const postController = require("../controllers/postController");
const upload = require("./../multer-config");
const router = new Router();

router.get("/", postController.getAllPosts);
router.get("/:id", postController.getSinglePost);
router.post("/", upload.single("image"), postController.createNewPost);
router.put("/", postController.updateSinglePost);
router.delete("/", postController.deleteSinglePost);

module.exports = router;
