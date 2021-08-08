const db = require("./../database/connect");

class PostController {
  async getAllPosts(req, res) {
    const posts = await db.query(`SELECT * FROM post`);
    res.json(posts.rows);
  }
  async getSinglePost(req, res) {
    const { id } = req.params;
    const postInfo = await db.query(`SELECT * FROM post where id=$1`, [id]);
    console.log();
    const staticFiles = await db.query(
      `SELECT file_path from files WHERE post_id=$1`,
      [id]
    );
    res.json({ ...postInfo.rows[0], files: staticFiles.rows });
  }
  async createNewPost(req, res) {
    const { text } = req.body;
    const newPost = await db.query(
      `INSERT INTO post(post_text,post_date) VALUES($1,now()) RETURNING *;
        `,
      [text]
    );
    const newPostId = newPost.rows[0].id;
    if (req.files.length > 0) {
      const paths = req.files.map((item) => {
        return item.path.replace(/^.*[\\\/]/, "");
      });
      const values = paths.map((path) => `('${path}',${newPostId})`).join(",");
      console.log(values);
      console.log(`INSERT INTO files(file_path,post_id) VALUES ${values};`);
      await db.query(`INSERT INTO files(file_path,post_id) VALUES ${values};`);
    }
    res.json(newPost.rows[0]);
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
