import { IfileReturn } from '../../../types/base.type';
import { IInventoryAttributes } from '../../../types/db.type';
import { IInventoryBody } from '../../../types/request.type';
import messages from '../../../utils/constants/messages';
import { uploadFile } from '../../../utils/fileUpload/fileUpload';
import accountsQueries from '../queries/accounts.queries';
import inventoryQueries from '../queries/inventory.queries';

class InventoryService {
  addVehicle = (data: IInventoryBody) => {
    return new Promise(async (resolve, reject) => {
      const allowedExtension = ['pdf', 'jpg'];
      const fileType = 'doc';
      try {
        const docs = [data.rc_book, data.proof_doc, data.insurance_doc];
        const docsResult: any = await Promise.all(docs.map((file) => uploadFile(file, fileType, allowedExtension)));
        let uploadDocs;

        let brandID;
        if (docsResult && docsResult.length > 0) {
          uploadDocs = await inventoryQueries.uploadManyDocs(docsResult);
        }

        if (data.isNew) {
          const brandResult = await inventoryQueries.uploadBrandModel(data.brand, data.model);
          if (brandResult) {
            brandID = brandResult.brand_model_id;
          }
        } else {
          brandID = data?.brand_model_id;
        }

        const insertInventoryData: IInventoryAttributes = {
          account_id: data.account_id,
          brand_model_id: brandID || 0,
          year_of_manufacture: data.year_of_manufacture,
          ownership_name: data.ownership_name,
          purchase_rate: data.purchase_rate,
          insurance_date: data.insurance_date,
          sale_status: data.sale_status,
          rc_book: uploadDocs?.[0]?.file_id ?? null,
          insurance_doc: uploadDocs?.[3]?.file_id ?? null,
          proof_doc: uploadDocs?.[2]?.file_id ?? null,
          date_of_purchase: data.date_of_purchase,
          sold_price: data.sold_price,
          registration_number: data.registration_number,
        };

        await inventoryQueries.addVehicle(insertInventoryData);
        await accountsQueries.generateTransaction([
          {
            amount:data.purchase_rate,
            credit_account:data.account_id,
            debit_account: data.account_id
          }
        ])


        return resolve({ message: messages.success.ACCOUNT_CREATED });
      } catch (error) {
        throw new Error('Failed to add Vehicle to inventory...');
      }
    });
  };
}

export default new InventoryService();
