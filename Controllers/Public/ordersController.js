const Orders = require('../../Models/ordersModel');
const catchAsync = require('../../Utils/catchAsync');

  const addOrder = catchAsync(async (req, res) => {
    const { totalPrice, discountCode, status, products } = req.body;

    if (!totalPrice || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({
        message: 'Total price and at least one product are required'
      });
    }

    const order = await Orders.create({
      totalPrice,
      discountCode,
      status,
      products
    });


  const populatedOrder = await Orders.aggregate([
    {
      $match: { _id: order._id }
    },
    {
      $unwind: '$products'
    },
    {
      $lookup: {
        from: 'products', 
        localField: 'products',
        foreignField: '_id',
        as: 'product'
      }
    },
    {
      $unwind: '$product'
    },
    {
      $project: {
        _id: 1,
        totalPrice: 1,
        discountCode: 1,
        status: 1,
        createdAt: 1,
        product: 1
      }
    }
  ]);

  res.status(201).json({
      message: 'Order created successfully',
      data: populatedOrder
    });
  });



module.exports = { addOrder};
