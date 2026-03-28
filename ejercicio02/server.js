const http = require("http");
const fs = require("fs");
const path = require("path");
const handlebars = require("handlebars");

const PORT = 3000;

handlebars.registerHelper("gt", function (a, b) {
  return a > b;
});

const server = http.createServer((req, res) => {

  let filePath = "";

  if (req.url === "/") {
    filePath = path.join(__dirname, "views", "home.hbs");
  } 
  else if (req.url === "/about") {
    filePath = path.join(__dirname, "views", "about.hbs");
  } 
  else if (req.url === "/students") {
    filePath = path.join(__dirname, "views", "students.hbs");
  } 
  else {
    res.statusCode = 404;
    return res.end("<h1>404 - Página no encontrada</h1>");
  }

  fs.readFile(filePath, "utf8", (err, templateData) => {
    if (err) {
      res.statusCode = 500;
      return res.end("Error interno del servidor");
    }

    const template = handlebars.compile(templateData);

    const data = {
      title: "Servidor con Handlebars 🚀",
      welcomeMessage: "Bienvenido al laboratorio de Node.js",
      day: new Date().toLocaleDateString("es-PE"),

      course: "Desarrollo de Aplicaciones Web Avanzado",
      teacher: "Edwin Arévalo",
      date: "2026",

      students: [
        { name: "Ana", grade: 18 },
        { name: "Luis", grade: 14 },
        { name: "Pedro", grade: 16 },
        { name: "María", grade: 12 }
      ]
    };

    const html = template(data);

    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.end(html);
  });
});

server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});