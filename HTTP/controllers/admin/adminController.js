const order = require('../../../app/models/order')

function adminController() {

    return {
        index(req, res) {

            // Fetching orders from order collection of db

            order.find({ status: { $ne: 'Delivered' } }, null, { sort: { 'createdAt': -1 } })
                .populate('customerId', '-password').exec((err, orders) => {
                    if (err) {
                        console.log('In error block', err);
                        return res.redirect('/admin/dashboard')
                    }

                    return res.render('admin/dashboard', { orders: orders })

                })




        },
        status(req, res) {
            console.log(req.body);
            const { orderId, status } = req.body

            order.findOneAndUpdate(
                { _id: orderId },
                {
                    $set: {
                        status: status,
                    }
                }
            )
                .then(() => {

                    order.find({ status: { $ne: 'Delivered' } }, null, { sort: { 'createdAt': -1 } })
                        .populate('customerId', '-password').exec((err, orders) => {
                            if (err) {
                                console.log('In error block', err);
                                return res.redirect('/admin/dashboard')
                            }

                            return res.render('admin/dashboard', { orders: orders })

                        })

                })
                .catch(error => console.error(error))



        }
    }

}


module.exports = adminController