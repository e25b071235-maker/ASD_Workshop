const db=require('../database/db');

const getAllProducts=async ()=>{
  return await db.getAll();
};

const getProductById=async (id)=>{
  return await db.getById(id);
};

const createProduct=async (data)=>{
  return await db.create(data);
};

const updateProduct=async (id,data)=>{
  return await db.update(id,data);
};

const patchProduct=async (id,data)=>{
  return await db.patch(id,data);
};

const deleteProduct=async (id)=>{
  return await db.remove(id);
};

module.exports={
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  patchProduct,
  deleteProduct
};
