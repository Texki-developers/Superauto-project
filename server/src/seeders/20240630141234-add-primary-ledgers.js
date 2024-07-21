'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'primary_ledger',
      [
        {
          pl_id: 1,
          ledger_name: 'Inventory',
          account_head: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
          type: 'asset',
        },
        {
          pl_id: 2,
          ledger_name: 'Sundry Debtors',
          account_head: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
          type: 'asset',
        },
        {
          pl_id: 3,
          ledger_name: 'Cash',
          account_head: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
          type: 'asset',
        },
        {
          pl_id: 4,
          ledger_name: 'Bank',
          account_head: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
          type: 'asset',
        },
        {
          pl_id: 5,
          ledger_name: 'Fixed Assets',
          account_head: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
          type: 'asset',
        },
        {
          pl_id: 6,
          ledger_name: 'Sundry Creditor',
          account_head: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
          type: 'liability',
        },
        {
          pl_id: 7,
          ledger_name: 'Salary Payables',
          account_head: 7,
          createdAt: new Date(),
          updatedAt: new Date(),
          type: 'liability',
        },
        {
          pl_id: 8,
          ledger_name: 'Other Payables',
          account_head: 8,
          createdAt: new Date(),
          updatedAt: new Date(),
          type: 'liability',
        },
        {
          pl_id: 9,
          ledger_name: 'Loan',
          account_head: 9,
          createdAt: new Date(),
          updatedAt: new Date(),
          type: 'liability',
        },
        {
          pl_id: 10,
          ledger_name: 'Tax Payables',
          account_head: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
          type: 'liability',
        },
        {
          pl_id: 11,
          ledger_name: 'Capital A/C',
          account_head: 11,
          createdAt: new Date(),
          updatedAt: new Date(),
          type: 'equity',
        },
        {
          pl_id: 12,
          ledger_name: 'Retained Earnings',
          account_head: 12,
          createdAt: new Date(),
          updatedAt: new Date(),
          type: 'equity',
        },
        {
          pl_id: 13,
          ledger_name: 'Direct Expense',
          account_head: 13,
          createdAt: new Date(),
          updatedAt: new Date(),
          type: 'expense',
        },
        {
          pl_id: 14,
          ledger_name: 'Other Expense',
          account_head: 14,
          createdAt: new Date(),
          updatedAt: new Date(),
          type: 'expense',
        },
        {
          pl_id: 15,
          ledger_name: 'Administration Expense',
          account_head: 15,
          createdAt: new Date(),
          updatedAt: new Date(),
          type: 'expense',
        },
        {
          pl_id: 16,
          ledger_name: 'Purchase',
          account_head: 16,
          createdAt: new Date(),
          updatedAt: new Date(),
          type: 'revenue',
        },
        {
          pl_id: 17,
          ledger_name: 'Sale',
          account_head: 17,
          createdAt: new Date(),
          updatedAt: new Date(),
          type: 'revenue',
        },
        {
          pl_id: 18,
          ledger_name: 'Difference Opening',
          account_head: 17,
          createdAt: new Date(),
          updatedAt: new Date(),
          type: 'asset',
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
