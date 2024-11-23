const { Firestore } = require("@google-cloud/firestore");
const { Storage } = require("@google-cloud/storage");
const path = require("path");

// Tambahkan log untuk memastikan path kredensial
const keyFilePath = path.join(__dirname, "your-credential.json");
console.log("Key File Path:", keyFilePath);

const db = new Firestore({
  keyFilename: keyFilePath,
  projectId: "your-project-id",
});

const storage = new Storage({
  keyFilename: keyFilePath,
  projectId: "your-project-id",
});

// Inisialisasi bucket
const bucket = storage.bucket("your-bucket"); // Pastikan nama bucket sesuai
console.log("Storage Bucket:", bucket.name);

module.exports = { db, storage, bucket };
