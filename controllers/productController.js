const productService=require('../services/productService');
const {invalidateCache}=require('../middleware/cache');

const getAll=async (req,res)=>{
  try{
    const products=await productService.getAllProducts();
    res.json(products);
  }catch(err){
    res.status(500).json({error:'Internal server error'});
  }
};

const getById=async (req,res)=>{
  try{
    const {id}=req.params;
    const product=await productService.getProductById(id);
    if(!product){
      return res.status(404).json({error:'Product not found'});
    }
    res.json(product);
  }catch(err){
    res.status(500).json({error:'Internal server error'});
  }
};

const create=async (req,res)=>{
  try{
    const newProduct=await productService.createProduct(req.body);
    invalidateCache();
    res.status(201).json(newProduct);
  }catch(err){
    res.status(500).json({error:'Internal server error'});
  }
};

const update=async (req,res)=>{
  try{
    const {id}=req.params;
    const updatedProduct=await productService.updateProduct(id,req.body);
    if(!updatedProduct){
      return res.status(404).json({error:'Product not found'});
    }
    invalidateCache();
    res.json(updatedProduct);
  }catch(err){
    res.status(500).json({error:'Internal server error'});
  }
};

const patch=async (req,res)=>{
  try{
    const {id}=req.params;
    const patchedProduct=await productService.patchProduct(id,req.body);
    if(!patchedProduct){
      return res.status(404).json({error:'Product not found'});
    }
    invalidateCache();
    res.json(patchedProduct);
  }catch(err){
    res.status(500).json({error:'Internal server error'});
  }
};

const remove=async (req,res)=>{
  try{
    const {id}=req.params;
    const success=await productService.deleteProduct(id);
    if(!success){
      return res.status(404).json({error:'Product not found'});
    }
    invalidateCache();
    res.json({message:'Product deleted successfully'});
  }catch(err){
    res.status(500).json({error:'Internal server error'});
  }
};

module.exports={
  getAll,
  getById,
  create,
  update,
  patch,
  remove,
  getAllProducts:getAll,
  getProductById:getById,
  createProduct:create,
  updateProduct:update,
  patchProduct:patch,
  deleteProduct:remove
};
