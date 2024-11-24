import { Request, Response } from "express";
import { container } from "tsyringe";

import CreateProductImageUseCase from "./CreateProductImageUseCase";

class CreateProductImageController {
  async handle(request: Request, response: Response) {
    const data = request.body;

    try {
      const createProductImageUseCase = container.resolve(
        CreateProductImageUseCase
      );

      const image = request.file?.filename;

      const productImage = await createProductImageUseCase.execute(data, image);

      response.status(201).json({ success: true, ...productImage });
    } catch (err) {
      response.status(400).json({ success: false, message: err.message });
    }
  }
}

export default CreateProductImageController;
