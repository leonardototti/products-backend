import crypto from "crypto";
import fs from "fs";
import multer from "multer";
import { resolve } from "path";

const tmpFolder = resolve(__dirname, "..", "..", "tmp");

export default {
  tmpFolder,
  fileFilter: (_req, file, cb) => {
    const allowedMimes = [
      "image/jpeg",
      "image/pjpeg",
      "image/png",
      "image/gif",
    ];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Tipo de arquivo inválido."));
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 },
  storage: multer.diskStorage({
    destination: (_req, _file, cb) => {
      fs.mkdirSync(tmpFolder, { recursive: true });
      cb(null, tmpFolder);
    },
    filename: (request, file, callback) => {
      const fileHash = crypto.randomBytes(16).toString("hex");
      const fileName = `${fileHash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
} as multer.Options & { tmpFolder: string };
