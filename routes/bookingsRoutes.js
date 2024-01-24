const express= require("express");
const router = express.Router();
const {getBooking,putBooking,deleteBooking,postBooking} = require("../controllers/bookingsController");
const validateToken = require("../middleware/validateTokenHandler");

router.use(validateToken);
router.route('/').get(getBooking);

router.route('/:id').put(putBooking);

router.route('/').post(postBooking);

router.route('/:id').delete(deleteBooking);

module.exports = router;