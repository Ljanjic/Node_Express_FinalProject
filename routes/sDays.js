const express = require('express');
const router = express.Router();

const {
    seeAllSdays,
    seeSday,
    createSday,
    updateSday,
    deleteSday,
} = require('../controllers/sDays');

router.route('/').post(createSday).get(seeAllSdays);
router.route('/:id').get(seeSday).delete(deleteSday).patch(updateSday);

module.exports = router;
