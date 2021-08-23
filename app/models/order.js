const mongoose = require('mongoose');
const Schema = mongoose.Schema

const orderSchema = new Schema({
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    items: { type: Object, required: true },
    address: { type: String, required: true },
    paymentMethod: { type: String, default: 'COD' },
    status: { type: String, default: 'Order Placed Successfully' }
}, { timestamps: true })


// Export Scheme

module.exports = mongoose.model('Orders', orderSchema)