const express=require('express');
const router=express.Router();
const productController=require('../controllers/productController');
const {cacheMiddleware,invalidateMiddleware}=require('../middleware/cache');

router.get('/',cacheMiddleware,productController.getAll);
router.get('/:id',cacheMiddleware,productController.getById);
router.post('/',invalidateMiddleware,productController.create);
router.put('/:id',invalidateMiddleware,productController.update);
router.patch('/:id',invalidateMiddleware,productController.patch);
router.delete('/:id',invalidateMiddleware,productController.remove);

module.exports=router;
