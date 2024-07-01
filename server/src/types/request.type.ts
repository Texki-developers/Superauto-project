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
    financerId?:number;
    deliveryId?:number;
    serviceId?:number
}

interface IassignVehicleBody{
    Vehicles: IassignVehicle[]
}

interface IOtherExpenseBody{
    expense_to: number;
    description: string;
    date: Date;
    amount: number;
}

export type {
    IAccountBody,
    IInventoryBody,
    IassignVehicleBody,
    IassignVehicle,
    IOtherExpenseBody
}