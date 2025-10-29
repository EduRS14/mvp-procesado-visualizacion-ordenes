const db = require('../db');

// Listado con filtros y joins (product + subcategory + category)
exports.list = async (req, res) => {
  try {
    const { categoryId, subCategoryId, q, page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;

    const filters = [];
    const params = [];

    if (categoryId) {
      params.push(categoryId);
      filters.push(`sc."Category_ID" = $${params.length}`);
    }
    if (subCategoryId) {
      params.push(subCategoryId);
      filters.push(`p."Sub_Category_ID" = $${params.length}`);
    }
    if (q) {
      params.push(`%${q}%`);
      filters.push(`p."Product_Name" ILIKE $${params.length}`);
    }

    const where = filters.length ? `WHERE ${filters.join(' AND ')}` : '';

    const sql = `
      SELECT p."Product_ID", p."Product_Name",
             p."Sub_Category_ID",
             sc."Sub_Category",
             c."Category_ID", c."Category"
      FROM public.productos p
      LEFT JOIN public.sub_categorias sc ON p."Sub_Category_ID" = sc."Sub_Category_ID"
      LEFT JOIN public.categorias c ON sc."Category_ID" = c."Category_ID"
      ${where}
      ORDER BY p."Product_Name"
      LIMIT $${params.length + 1} OFFSET $${params.length + 2}
    `;
    params.push(limit, offset);

    const result = await db.query(sql, params);
    res.json({ data: result.rows, page: Number(page), limit: Number(limit) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al listar productos' });
  }
};

exports.getById = async (req, res) => {
  try {
    const id = req.params.id;
    const sql = `
      SELECT p.*,
             sc."Sub_Category",
             c."Category"
      FROM public.productos p
      LEFT JOIN public.sub_categorias sc ON p."Sub_Category_ID" = sc."Sub_Category_ID"
      LEFT JOIN public.categorias c ON sc."Category_ID" = c."Category_ID"
      WHERE p."Product_ID" = $1
    `;
    const result = await db.query(sql, [id]);
    if (!result.rows.length) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener producto' });
  }
};