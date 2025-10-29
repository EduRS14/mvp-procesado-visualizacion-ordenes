const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
  try {
    const r = await db.query('SELECT "Postal_Code","City","State","Country","Region" FROM public.ubicaciones ORDER BY "City"');
    res.json(r.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al listar ubicaciones' });
  }
});

module.exports = router;