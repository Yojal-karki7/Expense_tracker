const { fetchExpenses, addExpenses, deleteExpenses } = require('../Controllers/ExpenseController');

const router = require('express').Router();


// fetch all the expenses of the user based on user_id
router.get('/', fetchExpenses);
// add expenses of the user based on user_id
router.post('/', addExpenses);
// delete expenses of the user based on user_id
router.delete('/:expenseId', deleteExpenses);

module.exports = router;