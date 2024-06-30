import express, { Router } from 'express';
import inventoryController from '../controller/inventory.controller';


const router: Router = express.Router();

router.post('/add/vehicle', inventoryController.addInventory);
router.post('/sell/vehicle', inventoryController.sellVehicle)
router.post('/assign/vehicle/finance',inventoryController.assignVehiclesToFinance)
router.post('/assign/vehicle/service',inventoryController.assignVehiclesToService)
export default router;
