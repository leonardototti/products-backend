import upload from "@config/upload";
import fs from "fs";
import { resolve, extname } from "path";
import { v4 } from "uuid";

import IStorageProvider from "../IStorageProvider";

class LocalStorageProvider implements IStorageProvider {
  private readonly path = resolve(process.env?.DISK_PATH || "tmp");

  async save(file: string, folder: string): Promise<string> {
    const tempFolder = resolve(upload.tmpFolder, file);
    const destFolder = `${this.path}/${folder}`;
    const newName = v4() + extname(file);
    const destFile = resolve(destFolder, newName);

    const dirExists = fs.existsSync(destFolder);

    if (!dirExists) {
      await fs.promises.mkdir(destFolder);
    }

    await fs.promises.rename(tempFolder, destFile);

    return `${folder}/${newName}`;
  }

  async delete(file: string): Promise<void> {
    const filename = resolve(`${this.path}/${file}`);

    try {
      await fs.promises.stat(filename);
    } catch (err) {
      console.error(err);
      return;
    }

    await fs.promises.unlink(filename);
  }
}

export default LocalStorageProvider;
