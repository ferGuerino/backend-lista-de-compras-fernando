import express, { Application, Request, Response } from "express";
import { data, ids } from "./database";
import { iProductList, iPurchaseList, iPurchaseListId } from "./interface";
import {
  criatePurchaseList,
  listPurchaseList,
  listPurchaseListByID,
  deletePurchaseList,
  updateListIten,
  deleteListIten,
} from "./logic";
import { validatePurchaseListExists } from "./middleware";

const app: Application = express();
app.use(express.json());

app.post("/purchaseList", criatePurchaseList);
app.get("/purchaseList", listPurchaseList);
app.get("/purchaseList/:id", validatePurchaseListExists, listPurchaseListByID);
app.delete("/purchaseList/:id", validatePurchaseListExists, deletePurchaseList);
app.patch(
  "/purchaseList/:id/:fruitName",
  validatePurchaseListExists,
  updateListIten
);
app.delete(
  "/purchaselist/:id/:fruitName",
  validatePurchaseListExists,
  deleteListIten
);

app.listen(3000, () => {
  console.log("Server is on!");
});
