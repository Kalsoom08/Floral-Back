const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
  totalPrice: {
    type: Number,
    required: true
  },
  discountCode: {
    type: String
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Orders = mongoose.model('Orders', orderSchema);
module.exports = Orders; 