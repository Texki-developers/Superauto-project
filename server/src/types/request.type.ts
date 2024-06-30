import { IAccountAttributes, IDeliveryAttributes, IEmployeeAttributes, IInventoryAttributes } from "./db.type";

interface IAccountBody extends IAccountAttributes, IEmployeeAttributes {}


interface IInventoryBody extends IInventoryAttributes,IDeliveryAttributes {
    isNew :boolean,
    brand:string,
    model:string
}



export type {
    IAccountBody,
    IInventoryBody
}