// src/routes/transactionRoutes.js
const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const authMiddleware = require('../utils/authMiddleware');

router.use(authMiddleware);

router.post('/transactions', transactionController.createTransaction);
router.get('/transactions', transactionController.getAllTransactions);
router.get('/transactions/:id_transaction', transactionController.getTransactionById);
router.put('/transactions/:id_transaction', transactionController.updateTransaction);
router.delete('/transactions/:id_transaction', transactionController.deleteTransaction);

module.exports = router;
