const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/products');

// GET /api/products?categoryId=&subCategoryId=&q=&page=&limit=
router.get('/', ctrl.list);

// GET /api/products/:id
router.get('/:id', ctrl.getById);

module.exports = router;