const catchAsync = require('../../Utils/catchAsync')
const {Products} = require('../../Models/productsModel')

const getAllProducts = catchAsync(async(req, res)=>{
    const products = await Products.find();
    if(products.length == 0){
        res.json({
            message : 'No Product Found',
            data : products
        })}
    res.status(200).json({
        message: 'Products Fetched Successfylly',
        data : products
    })
})

const getProductByName = catchAsync(async(req, res)=>{
    const {title} = req.params;

    const product = await Products.find({title});
    if(product.length == 0){
        res.json({
            message : 'No Product Found',
            data : product
        })}
    res.status(200).json({
        message: 'Products Fetched Successfylly',
        data : product
    })

})


const getProductByID = catchAsync(async (req, res) => {
  const { id } = req.params;

  const product = await Products.findById(id);

  if (!product) {
    return res.status(404).json({
      message: 'No Product Found',
      data: null
    });
  }
  
  return res.status(200).json({
    message: 'Product fetched successfully',
    data: product
  });
});

module.exports = {getAllProducts, getProductByName, getProductByID}

