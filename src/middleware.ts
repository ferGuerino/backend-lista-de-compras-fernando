import { NextFunction, Request, Response } from "express";
import { data } from "./database";

const validatePurchaseListExists = (
  request: Request,
  response: Response,
  next: NextFunction
): Response | void => {
  const id: number = +request.params.id;

  const findIndexId = data.findIndex((elem) => {
    return elem.id === id;
  });
  if (findIndexId === -1) {
    return response.status(404).json({
      message: "list not found",
    });
  }
  request.purchaseList = {
    findIndexId: findIndexId,
  };
  return next();
};

export { validatePurchaseListExists };
