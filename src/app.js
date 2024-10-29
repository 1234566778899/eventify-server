const express = require('express')
const app = express();
const cors = require('cors')
require('./db/index')
app.use(express.json());
const port = process.env.PORT || 4000;

app.use(cors({
    origin: ['http://localhost:3000', 'https://eventify-gilt-gamma.vercel.app'],
    credentials: true
}));

app.get('/', (req, res) => {
    res.send('v.1.0.13')
})

app.use('/users', require('./routes/User'));
app.use('/spaces', require('./routes/Space'));
app.use('/reservations', require('./routes/Reservation'));

app.listen(port, () => {
    console.log('server running on port: ' + port);
})