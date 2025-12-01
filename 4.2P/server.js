var express = require("express");
var app = express();

// 👀 Use PORT (uppercase) so it works with typical env vars
var port = process.env.PORT || 3004;

const mongoose = require("mongoose");

// Middleware
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 1. Connect to MongoDB (modern Mongoose – no deprecated options)
mongoose
  .connect("mongodb://127.0.0.1:27017/myprojectDB") // 127.0.0.1 is often safer in WSL
  .then(() => {
    console.log("✅ Connected to MongoDB");

    // 2. Define schema and model
    const ProjectSchema = new mongoose.Schema({
      title: String,
      image: String,
      link: String,
      description: String,
    });

    const Project = mongoose.model("Project", ProjectSchema);

    // 3. REST API route
    app.get("/api/projects", async (req, res) => {
      try {
        const projects = await Project.find({});
        res.json({ statusCode: 200, data: projects, message: "Success" });
      } catch (err) {
        console.error("❌ Error fetching projects:", err);
        res.status(500).json({ statusCode: 500, message: "Server error" });
      }
    });

    // 4. Start server *after* DB connection succeeds
    app.listen(port, () => {
      console.log(`🚀 App listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });
