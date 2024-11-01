const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new mongoose.Schema({
    cart_id : String,
    customer_id : String,
    orderType: {
        type: String,
        enum: ['Dine In', 'Delivery'],
        required: true,
    },
    dishes: [
        {
            name : String,
            dish_id : String,
            quantity : Number,
            price : Number,
            imageUrl : String,
        }
    ],
    totalAmount: {
        type: Number,
        required: [true, 'Total amount is required'],
        min: [0, 'Total amount must be a positive number']
    },
    // "Dine In"
    dineInDetails: [{ type: Schema.Types.ObjectId, ref: 'TableBooking' }],
    deliveryDetails: {
        address: String,
        deliveryTime: Date,
    },
    deleted: {  // dùng để xem lịch sử của khách hàng => Hóa đơn đã thanh toán delected = true
        type: Boolean,
        default: false,
    },
},
    {
        timestamps: true
    }
);
// Validate the order before saving
OrderSchema.pre('save', function (next) {
    if (this.orderType === 'Dine In' && !this.dineInDetails.tableId) {
      return next(new Error('Dine In order must have table details.'));
    }
    if (this.orderType === 'Delivery' && !this.deliveryDetails.address) {
      return next(new Error('Delivery order must have address details.'));
    }
    next();
  });


const Order = mongoose.model('Order', OrderSchema , "order");

module.exports = Order;
