const stripe = require("stripe")("sk_test_vUYEsycvblLUgdu67tzH1s2g00a4P4Pkmy");

module.exports= {
    charge: async(req, res) => {

        const {payment_amount} = req.body

        let {status} = await stripe.charges.create ({
            amount: payment_amount,
            currency: 'usd',
            description: 'Lesson',
            source: req.body.token.id
          })
      
          res.status(200).json({status})
    }
}