const {
  addArticleHandler,
  getAllArticlesHandler,
  deleteArticleHandler,
} = require("./handler");

const routes = [
  {
    method: "POST",
    path: "/articles",
    handler: addArticleHandler,
    options: {
      payload: {
        maxBytes: 10 * 1024 * 1024, // Maksimal file size 10MB
        output: "stream", // Parsing sebagai stream
        parse: true,
        multipart: true, // Mendukung form-data
      },
      cors: {
        origin: ["*"], // Izinkan semua origin
      },
    },
  },
  {
    method: "GET",
    path: "/articles",
    handler: getAllArticlesHandler,
    options: {
      cors: {
        origin: ["*"], // Izinkan semua origin
      },
    },
  },
  {
    method: "DELETE",
    path: "/articles/{id}",
    handler: deleteArticleHandler,
    options: {
      cors: {
        origin: ["*"], // Izinkan semua origin
      },
    },
  },
];

console.log("Routes registered");

module.exports = routes;
