const { db, bucket } = require("./firebase");
const { v4: uuidv4 } = require("uuid");

const addArticleHandler = async (request, h) => {
  try {
    console.log("Payload received:", request.payload); // Log payload

    const { file, title, description } = request.payload;

    if (!file || !title || !description) {
      console.log("Validation failed: Missing required fields");
      return h
        .response({
          status: "fail",
          message: "Mohon isi semua field (file, title, description).",
        })
        .code(400);
    }

    console.log("Start uploading file...");
    const buffer = file._data; // Buffer file
    const filename = `${uuidv4()}-${Date.now()}.jpg`; // Nama file unik
    const storageFile = bucket.file(filename);

    await storageFile.save(buffer, {
      contentType: file.hapi.headers["content-type"],
    });
    console.log("File uploaded successfully:", filename);

    const imageUrl = `https://storage.googleapis.com/${bucket.name}/${filename}`;
    console.log("File URL:", imageUrl);

    console.log("Saving article to Firestore...");
    const newArticle = {
      title,
      description,
      image: imageUrl,
      createdAt: new Date(),
    };

    const articleRef = await db.collection("articles").add(newArticle);
    console.log("Article saved with ID:", articleRef.id);

    return h
      .response({
        status: "success",
        message: "Artikel berhasil ditambahkan.",
        data: { articleId: articleRef.id },
      })
      .code(201);
  } catch (error) {
    console.error("Error occurred:", error.message);
    return h
      .response({
        status: "error",
        message: "Terjadi kesalahan pada server.",
        error: error.message,
      })
      .code(500);
  }
};

const getAllArticlesHandler = async (request, h) => {
  try {
    const articlesSnapshot = await db.collection("articles").get();
    const articles = articlesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return h
      .response({
        status: "success",
        data: { articles },
      })
      .code(200);
  } catch (error) {
    console.error("Error fetching articles:", error.message);
    return h
      .response({
        status: "error",
        message: "Terjadi kesalahan saat mengambil artikel.",
        error: error.message,
      })
      .code(500);
  }
};

const deleteArticleHandler = async (request, h) => {
  try {
    const { id } = request.params;
    console.log("Deleting article with ID:", id);

    await db.collection("articles").doc(id).delete();
    console.log("Article deleted successfully");

    return h
      .response({
        status: "success",
        message: "Artikel berhasil dihapus.",
      })
      .code(200);
  } catch (error) {
    console.error("Error deleting article:", error.message);
    return h
      .response({
        status: "error",
        message: "Terjadi kesalahan saat menghapus artikel.",
        error: error.message,
      })
      .code(500);
  }
};

module.exports = {
  addArticleHandler,
  getAllArticlesHandler,
  deleteArticleHandler,
};
