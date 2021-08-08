const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const directory = path.join(
      __dirname,
      "..",
      "..",
      "uploads",
      `${req.body.text}`
    );
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true });
    }
    cb(null, directory);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function checkFiles(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    console.log("no error");
    return cb(null, true);
  } else {
    console.log("error");
    cb("Error: Images Only!");
  }
}
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => checkFiles(file, cb),
});

router.post("/", upload.single("image"), (req, res) => {
  //   console.log(req.file.path);
  //   res.send(`/${req.file.path.replace(/\\/g, "/")}`);
  res.json("received");
  // console.log("inside upload");
  // res.json({ mes: "loshara" });
});

module.exports = router;
