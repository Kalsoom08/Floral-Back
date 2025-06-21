const {Products} = require('../../Models/productsModel')
const cloudinary = require('../../Config/cloudinary')
const catchAsync = require('../../Utils/catchAsync')
const fs = require('fs')

const addProduct = catchAsync(async(req, res)=>{
    const {title, description, price} = req.body;
    const filePath = req.file.path;

    const result = await cloudinary.uploader.upload(filePath, {
        folder: 'products',
        resource_type: 'raw'
    })
    fs.unlinkSync(filePath);

    const product = await Products.create({
        title,
        description,
        price,
        fileUrl: result.secure_url,
        publicId: result.public_id
    })

    res.status(201).json({
        message: 'Product Added Successfully',
        data : product
    })
})



const updateProduct = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { title, description, price } = req.body;

  const findProduct = await Products.findByIdAndUpdate(id);
  // if (!findProduct) {
  //   return res.status(404).json({ message: 'Product Not Found' });
  // }

  if (title) findProduct.title = title;
  if (description) findProduct.description = description;
  if (price) findProduct.price = price;

  if (req.file) {
    const filePath = req.file.path;

    if (findProduct.publicId) {
      await cloudinary.uploader.destroy(findProduct.publicId, {
        resource_type: 'raw',
      });
    }

    const result = await cloudinary.uploader.upload(filePath, {
      folder: 'products',
      resource_type: 'raw',
    });

    await fs.promises.unlink(filePath);

    findProduct.fileUrl = result.secure_url;
    findProduct.publicId = result.public_id;
  }

  await findProduct.save();

  res.status(200).json({
    message: 'Product updated successfully',
    product: findProduct.toObject(),
  });
});


const deleteProduct = catchAsync(async(req, res)=>{
    const {id} = req.params;
    await Products.findByIdAndDelete(id);
    res.status(200).json({
        message: 'Product Deleted Successfully'
    })
})



module.exports = {addProduct, updateProduct, deleteProduct}