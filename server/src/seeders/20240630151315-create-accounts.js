'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.bulkInsert('accounts',[
      {
        account_id: 1,
        name: 'Cash',
        contact_info: '',
        category: 'Built-In',
        head: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        account_id: 2,
        name: 'Bank',
        contact_info: '',
        category: 'Built-In',
        head: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        account_id: 3,
        name: 'Salary Payables',
        contact_info: '',
        category: 'Built-In',
        head: 7,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        account_id: 4,
        name: 'Other Payables',
        contact_info: '',
        category: 'Built-In',
        head: 8,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        account_id: 5,
        name: 'Loan',
        contact_info: '',
        category: 'Built-In',
        head: 9,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        account_id: 6,
        name: 'Tax Payables',
        contact_info: '',
        category: 'Built-In',
        head: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        account_id: 7,
        name: 'Capital A/C',
        contact_info: '',
        category: 'Built-In',
        head: 11,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        account_id: 8,
        name: 'Retained Earnings',
        contact_info: '',
        category: 'Built-In',
        head: 12,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        account_id: 9,
        name: 'Direct Expense',
        contact_info: '',
        category: 'Built-In',
        head: 13,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        account_id: 10,
        name: 'Other Expense',
        contact_info: '',
        category: 'Built-In',
        head: 14,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        account_id: 11,
        name: 'Administration Expense',
        contact_info: '',
        category: 'Built-In',
        head: 15,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        account_id: 12,
        name: 'Purchase',
        contact_info: '',
        category: 'Built-In',
        head: 16,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        account_id: 13,
        name: 'Sale',
        contact_info: '',
        category: 'Built-In',
        head: 17,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ])
  },

};
