const express = require('express');
const router = express.Router();
const { getCouncils, createCouncil } = require('../controllers/councilController');
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/roles');

router.get('/', getCouncils);
router.post('/', protect, authorize('admin'), createCouncil);

module.exports = router;
