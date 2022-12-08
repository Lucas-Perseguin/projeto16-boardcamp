import { Router } from 'express';
import {
  getCustomerById,
  getCustomers,
  postCustomer,
  updateCustomer,
} from '../controllers/customers.controller.js';
import checkCustomerCpfExistence from '../middlewares/checkCustomerCpfExistence.middleware.js';
import validateCustomerModel from '../middlewares/validateCustomerModel.middleware.js';

const router = Router();

router.get('/customers', getCustomers);
router.get('/customers/:id', getCustomerById);
router.post(
  '/customers',
  validateCustomerModel,
  checkCustomerCpfExistence,
  postCustomer
);
router.put('/customers/:id', validateCustomerModel, updateCustomer);

export default router;
