import { Router } from 'express';
import { CustomerController } from '../controllers/customerController';

import { asyncHandler } from '../utils/asyncHandler';

const router = Router();
const controller = new CustomerController();


router.post('/', asyncHandler(controller.create));
router.get('/', asyncHandler(controller.getAll));
router.get('/:id', asyncHandler(controller.getById));
router.put('/:id', asyncHandler(controller.update));
router.delete('/:id', asyncHandler(controller.delete));
router.patch('/:id', asyncHandler(controller.update));

export default router;
