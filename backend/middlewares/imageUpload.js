const multer = require("multer");
const path = require("path");

console.log("Iniciando a configuração do multer...");

// Destination to store image
const imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    let folder = "";

    //console.log("Determinando o diretório de destino...");
    //console.log("baseUrl:", req.baseUrl);

    if (req.baseUrl.includes("users")) {
      folder = "users";
    } else if (req.baseUrl.includes("photos")) {
      folder = "photos";
    }

    //console.log(`Diretório de destino determinado: backend/uploads/${folder}/`);
    cb(null, `backend/uploads/${folder}/`);
  },
  filename: (req, file, cb) => {
    const generatedFilename = Date.now() + path.extname(file.originalname);
    //console.log(`Nome do arquivo gerado: ${generatedFilename}`);
    cb(null, generatedFilename);
  },
});

const imageUpload = multer({
  storage: imageStorage,
  fileFilter(req, file, cb) {
    //console.log("Verificando o formato do arquivo...");
    
    if (!file.originalname.match(/\.(png|jpg)$/)) {
      //console.log("Formato de arquivo não suportado!");
      return cb(new Error("Por favor, envie apenas png ou jpg!"));
    }

    //console.log("Formato do arquivo é válido.");
    cb(undefined, true);
  },
});

//console.log("Configuração do multer concluída.");

module.exports = { imageUpload };
