const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter');
const ProductRouter = require('./Routes/ProductRouter');
const ExpenseRouter = require('./Routes/ExpensesROuter');
const ensureAuthenticated = require('./Middlewares/Auth');

require('dotenv').config();
require('./Models/db');
const PORT = process.env.PORT || 8080;

app.get('/ping', (req, res) => {
    res.send('PONG');
});

app.use(bodyParser.json());
app.use(cors({
    origin: 'https://expense-tracker-frontend-kappa-ten.vercel.app',
    methods: ["GET","POST","DELETE", "PUT"],
    credentials: true,
}));


app.use('/auth', AuthRouter);
app.use('/products', ProductRouter);
app.use('/expenses', ensureAuthenticated, ExpenseRouter);


app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})