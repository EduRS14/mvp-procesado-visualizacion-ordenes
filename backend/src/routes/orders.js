const express = require('express');
const router = express.Router();
const db = require('../db');

// Obtener órdenes con su cliente y totals (ejemplo)
router.get('/', async (req, res) => {
  try {
    const sql = `
      SELECT o."Order_ID", o."Order_Date", o."Ship_Date", o."Postal_Code",
             c."Customer_Name",
             SUM(od."Sales") AS total_sales,
             SUM(od."Quantity") AS total_items
      FROM public.ordenes o
      LEFT JOIN public.ordenes_detalles od ON o."Order_ID" = od."Order_ID"
      LEFT JOIN public.clientes c ON o."Customer_ID" = c."Customer_ID"
      GROUP BY o."Order_ID", c."Customer_Name"
      ORDER BY o."Order_Date" DESC
      LIMIT 100
    `;
    const r = await db.query(sql);
    res.json(r.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al listar ordenes' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const header = await db.query(`
      SELECT o.*, c."Customer_Name", u."City", u."Region"
      FROM public.ordenes o
      LEFT JOIN public.clientes c ON o."Customer_ID" = c."Customer_ID"
      LEFT JOIN public.ubicaciones u ON o."Postal_Code" = u."Postal_Code"
      WHERE o."Order_ID" = $1
    `, [id]);

    const details = await db.query(`
      SELECT od.*, p."Product_Name"
      FROM public.ordenes_detalles od
      LEFT JOIN public.productos p ON od."Product_ID" = p."Product_ID"
      WHERE od."Order_ID" = $1
    `, [id]);

    if (!header.rows.length) return res.status(404).json({ error: 'Orden no encontrada' });
    res.json({ header: header.rows[0], details: details.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener orden' });
  }
});

module.exports = router;