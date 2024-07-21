'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.bulkInsert('accounts',[
      {
        name: 'Cash',
        contact_info: '',
        category: 'Built-In',
        head: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Bank',
        contact_info: '',
        category: 'Built-In',
        head: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Salary Payables',
        contact_info: '',
        category: 'Built-In',
        head: 7,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Other Payables',
        contact_info: '',
        category: 'Built-In',
        head: 8,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Loan',
        contact_info: '',
        category: 'Built-In',
        head: 9,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Tax Payables',
        contact_info: '',
        category: 'Built-In',
        head: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Capital A/C',
        contact_info: '',
        category: 'Built-In',
        head: 11,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Retained Earnings',
        contact_info: '',
        category: 'Built-In',
        head: 12,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Direct Expense',
        contact_info: '',
        category: 'Built-In',
        head: 13,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Other Expense',
        contact_info: '',
        category: 'Built-In',
        head: 14,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Administration Expense',
        contact_info: '',
        category: 'Built-In',
        head: 15,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Purchase',
        contact_info: '',
        category: 'Built-In',
        head: 16,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Sale',
        contact_info: '',
        category: 'Built-In',
        head: 17,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Difference Opening',
        contact_info: '',
        category: 'Built-In',
        head: 18,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ])
  },

};
