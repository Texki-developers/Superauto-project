import { E_ACCOUNT_CATEGORIES } from "../utils/constants/constants";

interface IAuthServiceParams {
    category: E_ACCOUNT_CATEGORIES,
    salary?:number,
    name:string,
    contact_info:string
    head?:string
}




export {
    IAuthServiceParams
}