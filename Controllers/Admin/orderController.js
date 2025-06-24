const catchAsync = require('../../Utils/catchAsync')
const Orders = require('../../Models/ordersModel')


const updateOrder = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const user = req.user;

  const order = await Orders.findById(id);
  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }


  if (user.role === 'user') {
    if (!order.user || order.user.toString() !== user._id.toString()) {
      return res.status(403).json({ message: 'You can only update your own orders' });
    }

    if (status !== 'cancelled') {
      return res.status(400).json({ message: 'Users can only cancel their order' });
    }

    if (order.status === 'cancelled') {
      return res.status(400).json({ message: 'Order is already cancelled' });
    }

    order.status = 'cancelled';
  }


  if (user.role === 'admin') {
    if (status) {
      const allowedStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
      if (!allowedStatuses.includes(status)) {
        return res.status(400).json({ message: 'Invalid status value' });
      }
      order.status = status;
    }
  }

  await order.save();

  res.status(200).json({
    message: 'Order updated successfully',
    data: order
  });
});

const deleteOrder = catchAsync(async (req, res) => {
  const { id } = req.params;

  const order = await Orders.findByIdAndDelete(id);
  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }

  res.status(200).json({
    message: 'Order deleted successfully'
  });
});

module.exports = {deleteOrder, updateOrder}