const { Firestore } = require("@google-cloud/firestore");
const { Storage } = require("@google-cloud/storage");
const path = require("path");

// Tambahkan log untuk memastikan path kredensial
const keyFilePath = path.join(__dirname, "../config/project-article-442009-e284d6e084c7.json");
console.log("Key File Path:", keyFilePath);

const db = new Firestore({
  keyFilename: keyFilePath,
  projectId: "project-article-442009",
});

const storage = new Storage({
  keyFilename: keyFilePath,
  projectId: "project-article-442009",
});

// Inisialisasi bucket
const bucket = storage.bucket("my-article-images"); // Pastikan nama bucket sesuai
console.log("Storage Bucket:", bucket.name);

module.exports = { db, storage, bucket };
