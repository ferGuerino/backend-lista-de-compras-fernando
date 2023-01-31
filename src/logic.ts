import { Response, Request, request } from "express";
import { data, ids } from "./database";
import { iProductList, iPurchaseList, iPurchaseListId } from "./interface";

const validateList = (payload: any): iPurchaseList => {
  const keys: Array<string> = Object.keys(payload);
  const requiredKeys = ["listName", "data"];

  const containRequiredKeys: boolean = requiredKeys.every((key: string) => {
    return keys.includes(key);
  });

  if (!containRequiredKeys || keys.length != 2 || !isNaN(payload.listName)) {
    throw new Error(`Required keys must be: ${requiredKeys}.`);
  }

  return payload;
};

const validateListItem = (payload: any): iProductList => {
  const keys: Array<string> = Object.keys(payload);
  const requiredKeys = ["name", "quantity"];

  const containRequiredKeys: boolean = requiredKeys.every((key: string) => {
    return keys.includes(key);
  });

  if (!containRequiredKeys || keys.length != 2 || !isNaN(payload.listName)) {
    throw new Error(`Required keys must be: ${requiredKeys}.`);
  }

  return payload;
};

const criatePurchaseList = (request: Request, response: Response): Response => {
  try {
    const purchaseList: iPurchaseList = validateList(request.body);

    const dataLength = data.map((elem) => {
      return elem;
    });
    const id = ids.push(dataLength.length);
    const newPurchaseList: iPurchaseListId = {
      id: id,
      ...purchaseList,
    };

    data.push(newPurchaseList);

    return response.status(201).json(newPurchaseList);
  } catch (error) {
    if (error instanceof Error) {
      return response.status(400).json({
        message: error.message,
      });
    }
    console.log(error);
    return response.status(500).json({
      message: "Internal server error",
    });
  }
};

const listPurchaseList = (request: Request, response: Response): Response => {
  return response.status(200).json(data);
};
const listPurchaseListByID = (
  request: Request,
  response: Response
): Response => {
  const findIndexId: number = request.purchaseList.findIndexId;
  return response.json(data[findIndexId]);
};

const deletePurchaseList = (request: Request, response: Response): Response => {
  const findIndexId: number = request.purchaseList.findIndexId;

  data.splice(findIndexId, 1);

  return response.status(204).json();
};

const updateListIten = (request: Request, response: Response): Response => {
  try {
    const productList: iProductList = validateListItem(request.body);
    const findIndexId: number = request.purchaseList.findIndexId;
    const fruitName: string = request.params.fruitName;
    const fruitList: Array<iProductList> = data[findIndexId].data;

    const findFruit = fruitList.findIndex((elem) => {
      return elem.name === fruitName;
    });
    if (findFruit === -1) {
      return response.status(404).json({
        message: "Item not found in the list",
      });
    }

    const newFruit = fruitList.splice(findFruit, 1, productList);

    return response.json(data[findIndexId]);
  } catch (error) {
    if (error instanceof Error) {
      return response.status(400).json({
        message: error.message,
      });
    }
    console.log(error);
    return response.status(500).json({
      message: "Internal server error",
    });
  }
};

const deleteListIten = (request: Request, response: Response): Response => {
  const findIndexId: number = request.purchaseList.findIndexId;
  const fruitName: string = request.params.fruitName;
  const fruitList: Array<iProductList> = data[findIndexId].data;

  const findFruit = fruitList.findIndex((elem) => {
    return elem.name === fruitName;
  });

  if (findFruit === -1) {
    return response.status(404).json({
      message: "Item not found in the list",
    });
  }
  const newFruit = fruitList.splice(findFruit, 1);

  return response.json(data[findIndexId]);
};

export {
  criatePurchaseList,
  listPurchaseList,
  listPurchaseListByID,
  deletePurchaseList,
  updateListIten,
  deleteListIten,
};
