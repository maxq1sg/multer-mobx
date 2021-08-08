const db = require("./../database/connect");

class PostController {
  async getAllPosts(req, res) {
    const posts = await db.query(`SELECT * FROM post`);
    res.json(posts.rows);
  }
  async getSinglePost(req, res) {}
  async createNewPost(req, res) {
    // const { text } = req.body;
    // const newPost = await db.query(
    //   "INSERT INTO post(post_text,post_date) VALUES($1,now()) RETURNING *",
    //   [text]
    // );
    // res.json(newPost);
    console.log(req.file)
    res.json(req.body);
  }
  async deleteSinglePost(req, res) {
    console.log(req.body);
    const { id } = req.body;
    const deleted = await db.query(
      `DELETE FROM files WHERE post_id=$1;
       DELETE FROM post WHERE id=$1;`,
      [id]
    );
    console.log(deleted);
    res.json(deleted);
  }

  async updateSinglePost(req, res) {}
}

module.exports = new PostController();
