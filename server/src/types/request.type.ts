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

interface IRecieptBody {
    payment_from: number;
    payment_to: 'CASH' | 'BANK';
    description: string;
    date: Date;
    amount: number;
}

interface IPaymentBody {
    payment_to: number;
    payment_from: 'CASH' | 'BANK';
    description: string;
    date: Date;
    amount: number;
}


interface IsellVehicle {
    accountId: number;
    soldRate: string;
    soldDate: Date;
    paymentMode: string;
    financeAmount: number;
    financeCharge: number;
    soldVehicleId: number;
    isFinance: boolean;
    is_exchange: boolean;
    rate: string;
    amount: number;
    due_date: string;
}

export type {
    IAccountBody,
    IInventoryBody,
    IassignVehicleBody,
    IassignVehicle,
    IOtherExpenseBody,
    IRecieptBody,
    IPaymentBody,
    IsellVehicle
}