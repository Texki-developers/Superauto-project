import express, { Router } from 'express';
import inventoryController from '../controller/inventory.controller';


const router: Router = express.Router();

router.post('/add/vehicle', inventoryController.addInventory);
router.post('/opening-stock', inventoryController.createOpeningStock);
router.delete('/delete/vehicle', inventoryController.deleteVehicle);
router.post('/edit/vehicle', inventoryController.EditVehicle);
router.get('/list/vehicle', inventoryController.listVehicle);
router.post('/exchange/vehicle', inventoryController.exchangeVehicle);
router.get('/list/vehicle/registration-number', inventoryController.listVehicleRegNumber);
router.post('/sell/vehicle', inventoryController.sellVehicle)
router.post('/assign-vehicle/finance',inventoryController.assignVehiclesToFinance)
router.post('/assign-vehicle/delivery-service',inventoryController.assignVehiclesToDeliveryService)
router.post('/assign-vehicle/service',inventoryController.assignVehiclesToService)
router.get('/model-brand/vehicle', inventoryController.getBrandModel);
router.get('/list/edit-vehicle',inventoryController.editGetApi)
router.get('/vehicle/mrp',inventoryController.getVehicleMrp)
router.get('/sales',inventoryController.getVehicleMrp)
export default router;
