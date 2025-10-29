const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
  try {
    const r = await db.query('SELECT "Category_ID", "Category" FROM public.categorias ORDER BY "Category"');
    res.json(r.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al listar categorias' });
  }
});

// src/routes/categories.js
router.get('/:id/subcategories', async (req, res) => {
  try {
    const { id } = req.params;
    const r = await db.query(
      'SELECT "Sub_Category_ID", "Sub_Category" FROM public.sub_categorias WHERE "Category_ID" = $1 ORDER BY "Sub_Category"',
      [id]
    );
    res.json(r.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al listar subcategorías' });
  }
});

module.exports = router;