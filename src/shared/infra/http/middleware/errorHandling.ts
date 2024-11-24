import { Request, Response, NextFunction } from "express";
import ErrorsApp from "@shared/errors/ErrorsApp";
import { isCelebrateError } from "celebrate";
import { errorsMessageCelebrate } from "@shared/utils/errorsMessageCelebrate";

const errorHandling = async (
  err: Error | any,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (err instanceof ErrorsApp) {
    response
      .status(err.statusCode)
      .json({ success: false, message: err.message });
    return;
  }

  if (isCelebrateError(err)) {
    response
      .status(400)
      .json({ success: false, ...errorsMessageCelebrate(err) });
    return;
  }

  response.status(500).json({
    success: false,
    message: "Erro interno no servidor.",
  });
};

export default errorHandling;
