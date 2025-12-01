const mongoose = require('mongoose');

// 1️⃣ Connect to MongoDB (no deprecated options)
mongoose
  .connect('mongodb://127.0.0.1:27017/myprojectDB') // safer for WSL2
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ Connection error:', err));

// 2️⃣ Define schema and model
const ProjectSchema = new mongoose.Schema({
  title: String,
  image: String,
  description: String,
});

const Project = mongoose.model('Project', ProjectSchema);

// 3️⃣ Define sample data
const sampleData = [
  {
    title: "Local Z Feature Map",
    image: "images/feature_local_z.png",
    description: "Applies local Z rotations to each qubit based on the input value."
  },
  {
    title: "Feature Reuploading",
    image: "images/feature_reuploading.png",
    description: "Re-encodes the same inputs multiple times to increase expressiveness."
  },
  {
    title: "Feature ZZ Interaction",
    image: "images/feature_zz_interaction.png",
    description: "Encodes qubit-qubit correlations by adding ZZ rotations between neighbors."
  }
];

// 4️⃣ Insert documents
(async () => {
  try {
    await Project.deleteMany({}); // optional: clear previous entries
    await Project.insertMany(sampleData);
    console.log("✅ Sample data inserted successfully");
  } catch (err) {
    console.error("❌ Error inserting data:", err);
  } finally {
    await mongoose.connection.close();
  }
})();
