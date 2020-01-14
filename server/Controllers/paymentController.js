module.exports = {
    createPayment: async(req, res) => {
        const {payment_amount, payment_duedate, lesson_id} = req.body

        const db = req.app.get('db')

        const result = await db.payment.create_payment(lesson_id, payment_amount, payment_duedate, false)

        res.status(200).json(result)
    },
    editPayment: async(req, res) => {
        const {payment_amount, payment_duedate, payment_ispaid} = req.body
        const {payment_id} = req.params

        const db = req.app.get('db')

        const result = await db.payment.edit_payment(payment_amount, payment_duedate, payment_ispaid, payment_id)

        res.status(200).json(result)
    },
    deletePayment: async(req, res) => {
        const {payment_id} = req.params

        const db = req.app.get('db')

        await db.payment.delete_payment(payment_id)

        res.sendStatus(200)
    }
}