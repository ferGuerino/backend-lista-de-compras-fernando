interface iProductList {
  name: string;
  quantity: string;
}

interface iPurchaseList {
  listname: string;
  data: iProductList[];
}
interface iPurchaseListId extends iPurchaseList {
  id: number;
}

export { iProductList, iPurchaseList, iPurchaseListId };
