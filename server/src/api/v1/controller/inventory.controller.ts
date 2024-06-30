import { Request, Response } from 'express';
import { responseHandler } from '../../../utils/responseHandler/responseHandler';
import inventoryService from '../services/inventory.service';
import { IDeliveryAttributes, IInventoryAttributes } from '../../../types/db.type';
import { getFile } from '../../../utils/getFile/getFile';
import { IassignVehicleBody, IInventoryBody } from '../../../types/request.type';

class InventoryController {
  addInventory(req: Request, res: Response) {
    const { body } = req;
    const rcBook = getFile(req, 'rcBook');
    const insuranceDoc = getFile(req, 'insuranceDoc');
    const proofDoc = getFile(req, 'proofDoc');

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
      isNew: body.is,
    };

    inventoryService
      .addVehicle(data)
      .then((data: any) => {
        responseHandler(res, 'CREATED', { message: data.message });
      })
      .catch((error) => {
        responseHandler(res, 'INTERNAL_SERVER_ERROR', null, error);
      });
  }

  sellVehicle(req: Request, res: Response) {
    const { body } = req;
    const data = {
      account_id: body.accountId,
      salesRate: body.soldRate,
      salesDate: body.soldDate,
    };
  }

  assignVehiclesToFinance(req: Request, res: Response) {
    const { Vehicles }: IassignVehicleBody = req.body;

    if (Vehicles.length > 10) {
      throw new Error('Only 10 vehicles can assign at a time');
    }

    inventoryService
      .assignVehiclesToFinance(Vehicles)
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

  assignVehiclesToDelivery(req: Request, res: Response) {
    const { Vehicles }: IassignVehicleBody = req.body;
    inventoryService
      .assignVehiclesToDelivery(Vehicles)
      .then((data: any) => {
        responseHandler(res, 'CREATED', { message: data.message });
      })
      .catch((error) => {
        responseHandler(res, 'INTERNAL_SERVER_ERROR', null, error);
      });
  }

  


}

export default new InventoryController();
