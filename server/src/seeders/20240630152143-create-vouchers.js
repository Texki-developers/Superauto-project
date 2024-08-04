'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'vouchers',
      [
        {
          voucher_id: 1,
          voucher_name: 'Purchase',
          prefix: 'PUR',
          last_invoice_number: 0,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          voucher_id: 2,
          voucher_name: 'Sale',
          prefix: 'SAL',
          last_invoice_number: 0,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          voucher_id: 3,
          voucher_name: 'Expense',
          prefix: 'EXP',
          last_invoice_number: 0,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          voucher_id: 4,
          voucher_name: 'Reciept',
          prefix: 'REC',
          last_invoice_number: 0,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          voucher_id: 5,
          voucher_name: 'Payments',
          prefix: 'PAY',
          last_invoice_number: 0,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          voucher_id: 6,
          voucher_name: 'Salary',
          prefix: 'SAL',
          last_invoice_number: 0,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          voucher_id: 7,
          voucher_name: 'Adjustment',
          prefix: 'ADJ',
          last_invoice_number: 0,
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ],
      {}
    );
  },
};
