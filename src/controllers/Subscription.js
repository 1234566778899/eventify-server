const { MercadoPagoConfig, Payment } = require('mercadopago');
const User = require('../db/Schemas/User');


const client = new MercadoPagoConfig({ accessToken: 'TEST-7202469223624190-102900-eca2d8e1bf7cb63bbe8796e6313ac266-2063123401' });
const payment = new Payment(client);

const addSubscription = (req, res) => {
    payment.create({ body: req.body }).then((response) => {
        return res.status(200).send({ ok: 'Successfull' });
    }).catch((error) => {
        console.log(error);
        return res.status(500).send({ error: 'Error on server', details: error });
    });
};

module.exports = {
    addSubscription
};

