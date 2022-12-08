import { Router } from 'express';
import {
  deleteRental,
  getRentals,
  postRental,
  returnRental,
} from '../controllers/rentals.controller.js';
import checkGetRentalsQuery from '../middlewares/checkGetRentalsQuery.middleware.js';
import checkRentalGameAndCustomerId from '../middlewares/checkRentalGameAndCustomerId.middleware.js';
import checkRentalReturned from '../middlewares/checkRentalReturned.middleware.js';
import validateRentalId from '../middlewares/validateRentalId.middleware.js';
import validateRentalModel from '../middlewares/validateRentalModel.middleware.js';

const router = Router();

router.get('/rentals', checkGetRentalsQuery, getRentals);
router.post(
  '/rentals',
  validateRentalModel,
  checkRentalGameAndCustomerId,
  postRental
);
router.post('/rentals/:id/return', validateRentalId, returnRental);
router.delete(
  '/rentals/:id',
  validateRentalId,
  checkRentalReturned,
  deleteRental
);

export default router;
