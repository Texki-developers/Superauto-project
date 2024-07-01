import express, { Router } from 'express';
import inventoryController from '../controller/inventory.controller';


const router: Router = express.Router();

router.post('/add/vehicle', inventoryController.addInventory);
router.post('/sell/vehicle', inventoryController.sellVehicle)
router.post('/assign/vehicle/finance',inventoryController.assignVehiclesToFinance)
router.post('/assign/vehicle/delivery-service',inventoryController.assignVehiclesToDeliveryService)
router.post('/assign/vehicle/ervice',inventoryController.assignVehiclesToService)
export default router;
