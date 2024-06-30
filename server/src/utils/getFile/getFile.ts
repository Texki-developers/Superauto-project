import { Request } from 'express';

export const getFile = (req:Request,fileName:string) =>{

    if(req?.files && req.files[fileName]){
        return req.files[fileName]
    } 
    return null
}

