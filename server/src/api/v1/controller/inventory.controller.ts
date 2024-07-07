import { Request, Response } from 'express';
import { responseHandler } from '../../../utils/responseHandler/responseHandler';
import inventoryService from '../services/inventory.service';
import { IDeliveryAttributes, IInventoryAttributes } from '../../../types/db.type';
import { getFile } from '../../../utils/getFile/getFile';
import { IassignVehicleBody, IInventoryBody, IsellVehicleBody } from '../../../types/request.type';

class InventoryController {
  addInventory(req: Request, res: Response) {
    const { body } = req;
    const rcBook = getFile(req, 'rcBook');
    const insuranceDoc = getFile(req, 'insuranceDoc');
    const proofDoc = getFile(req, 'proofDoc');
    if (!rcBook && !insuranceDoc && !proofDoc) {
      throw new Error('The Required Docs are not provided');
    }
    const data: IInventoryBody = {
      account_id: body.accountId,
      ownership_name: body.ownershipName,
      registration_number: body?.registrationNumber,
      brand_model_id: body?.brand,
      year_of_manufacture: body.yearOfManufacture,
      purchase_rate: body.purchaseRate,
      sale_status: false,
      insurance_date: body.insuranceDate,
      delivery_service: body.deliveryService,
      delivery_amount: body.deliveryAmount,
      rc_book: rcBook,
      insurance_doc: insuranceDoc,
      proof_doc: proofDoc,
      date_of_purchase: body.dateOfPurchase,
      model: body.model,
      brand: body.brand,
      isNew: body.isNew,
      is_delivery: body.isDelivery,
      party_phone_number:body.partyPhoneNumber,
      delivery_service_phone_number:body.deliveryServicePhoneNumber,
      party_name:body.partyName,
      delivery_name:body.deliveryName
        };

    inventoryService
      .addVehicle(data)
      .then((data: any) => {
        responseHandler(res, 'CREATED', { message: data.message });
      })
      .catch((error) => {
        console.log(error, 'ERROR');
        responseHandler(res, 'INTERNAL_SERVER_ERROR', null, error);
      });
  }

  sellVehicle(req: Request, res: Response) {
    const { body } = req;
    const data: IsellVehicleBody = {
      account_id: body.accountId,
      sales_rate: body.soldRate,
      sales_date: body.soldDate,
      payment_mode: body.paymentMode,
      finance_amount: body.financeAmound,
      finance_charge: body.financeCharge,
      sold_vehicle_id: body.soldVehicleId,
      is_finance: body.isFinance,
      is_exchange: body.is_exchange,
      rate: body.rate,
      amount: body.amount,
      due_date: body.due_date,
      exchange_vehicle_id: body.exchangeVehicleId,
    };

    inventoryService
      .sellVehicle(data)
      .then((data: any) => {
        responseHandler(res, 'CREATED', { message: data.message, data: data.data });
      })
      .catch((error) => {
        console.log(error, 'ERROR');
        responseHandler(res, 'INTERNAL_SERVER_ERROR', null, error);
      });
  }

  assignVehiclesToFinance(req: Request, res: Response) {
    const { Vehicles }: IassignVehicleBody = req.body;

    inventoryService
      .assignVehiclesToFinance(Vehicles)
      .then((data: any) => {
        responseHandler(res, 'CREATED', { message: data.message });
      })
      .catch((error) => {
        console.log(error, 'ERROR');
        responseHandler(res, 'INTERNAL_SERVER_ERROR', null, error);
      });
  }

  assignVehiclesToDeliveryService(req: Request, res: Response) {
    const { Vehicles }: IassignVehicleBody = req.body;

    inventoryService
      .assignVehiclesToDeliveryService(Vehicles)
      .then((data: any) => {
        responseHandler(res, 'CREATED', { message: data.message });
      })
      .catch((error) => {
        responseHandler(res, 'INTERNAL_SERVER_ERROR', null, error);
      });
  }

  assignVehiclesToService(req: Request, res: Response) {
    const { Vehicles }: IassignVehicleBody = req.body;
    inventoryService
      .assignVehiclesToService(Vehicles)
      .then((data: any) => {
        responseHandler(res, 'CREATED', { message: data.message });
      })
      .catch((error) => {
        responseHandler(res, 'INTERNAL_SERVER_ERROR', null, error);
      });
  }

  listVehicle(req: Request, res: Response) {

    let { page, perPage } = req.query;
    const pageNum = page ? parseInt(page as string, 10) : 1;
    const perPageNum = perPage ? parseInt(perPage as string, 10) : 10;
  
    inventoryService
      .listVehicles(pageNum, perPageNum)
      .then((data: any) => {
        responseHandler(res, 'OK', data.accounts, { message: data.message ,meta:data.meta});
      })
      .catch((error) => {
        responseHandler(res, 'INTERNAL_SERVER_ERROR', null, error);
      });
  }

  listVehicleRegNumber(req: Request, res: Response) {
    inventoryService
      .listVehicleRegNumber()
      .then((data: any) => {
        responseHandler(res, 'OK', data.accounts, { message: data.message });
      })
      .catch((error) => {
        responseHandler(res, 'INTERNAL_SERVER_ERROR', null, error);
      });
  }

  exchangeVehicle(req: Request, res: Response) {
    const { body } = req;
    const rcBook = getFile(req, 'rcBook');
    const insuranceDoc = getFile(req, 'insuranceDoc');
    const proofDoc = getFile(req, 'proofDoc');
    if (!rcBook && !insuranceDoc && !proofDoc) {
      throw new Error('The Required Docs are not provided');
    }
    const data: IInventoryBody = {
      account_id: body.accountId,
      ownership_name: body.ownershipName,
      registration_number: body?.registrationNumber,
      brand_model_id: body?.brand,
      year_of_manufacture: body.yearOfManufacture,
      purchase_rate: body.purchaseRate,
      sale_status: false,
      insurance_date: body.insuranceDate,
      delivery_service: body.deliveryService,
      delivery_amount: body.deliveryAmount,
      rc_book: rcBook,
      insurance_doc: insuranceDoc,
      proof_doc: proofDoc,
      date_of_purchase: body.dateOfPurchase,
      model: body.model,
      brand: body.brand,
      isNew: body.isNew,
      is_sales_return: Boolean(body.salesReturn),
      inventory_id: body.inventoryId,
      is_delivery: body.isDelivery,
      sold_price: body.soldPrice,
    };

    inventoryService
      .exchangeVehicle(data)
      .then((data: any) => {
        console.log(data,"RETRUN")
        responseHandler(res, 'OK', data, { message: data.message, });
      })
      .catch((error) => {
        responseHandler(res, 'INTERNAL_SERVER_ERROR', null, error);
      });
  }

  getBrandModel(req: Request, res: Response) {
    inventoryService
      .listBrandModel()
      .then((data: any) => {
        responseHandler(res, 'OK', data, { message: data.message });
      })
      .catch((error) => {
        responseHandler(res, 'INTERNAL_SERVER_ERROR', null, error);
      });
  }

  editGetApi(req: Request, res: Response) {
    const { inventoryId } = req.query;
    inventoryService
      .editGetApi(Number(inventoryId))
      .then((data: any) => {
        responseHandler(res, 'OK', data, { message: data.message });
      })
      .catch((error) => {
        responseHandler(res, 'INTERNAL_SERVER_ERROR', null, error);
      });
  }
}

export default new InventoryController();
