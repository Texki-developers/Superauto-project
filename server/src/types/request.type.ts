import { IAccountAttributes, IDeliveryAttributes, IEmployeeAttributes, IInventoryAttributes } from "./db.type";

interface IAccountBody extends IAccountAttributes, IEmployeeAttributes {}


interface IInventoryBody extends IInventoryAttributes,IDeliveryAttributes {
    isNew :boolean,
    brand:string,
    model:string
    is_sales_return?:boolean
    is_delivery:boolean

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


interface IsellVehicleBody {
    account_id: number;
    sales_rate: number;
    sales_date: Date;
    payment_mode: string;
    finance_amount: number;
    finance_charge: number;
    sold_vehicle_id: number;
    is_finance: boolean;
    is_exchange: boolean;
    exchange_vehicle_id:number
    rate: string;
    amount: number;
    due_date: Date;

}

export type {
    IAccountBody,
    IInventoryBody,
    IassignVehicleBody,
    IassignVehicle,
    IOtherExpenseBody,
    IRecieptBody,
    IPaymentBody,
    IsellVehicleBody
}