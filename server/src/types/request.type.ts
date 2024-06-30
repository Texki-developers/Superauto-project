import { IAccountAttributes, IDeliveryAttributes, IEmployeeAttributes, IInventoryAttributes } from "./db.type";

interface IAccountBody extends IAccountAttributes, IEmployeeAttributes {}


interface IInventoryBody extends IInventoryAttributes,IDeliveryAttributes {
    isNew :boolean,
    brand:string,
    model:string
}


interface IassignVehicle {
    amount:number;
    regNum:string;
}

interface IassignVehicleBody{
    Vehicles: IassignVehicle[]
}


export type {
    IAccountBody,
    IInventoryBody,
    IassignVehicleBody,
    IassignVehicle
}