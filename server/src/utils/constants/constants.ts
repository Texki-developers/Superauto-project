enum E_ACCOUNT_CATEGORIES {
  EMPLOYEE = 'EMPLOYEE',
  SERVICE_SHOP = 'SERVICE_SHOP',
  DELIVERY_SERVICE = 'DELIVERY_SERVICE',
  FINANCER = 'FINANCER',
  BROKER = 'BROKER',
  CUSTOMER = 'SUNDRY_CREDITOR'
}

enum E_PRIMARY_LEDGERS {
  EMPLOYEE = 7, // Salary Payables
  SERVICE_SHOP = 1, // Inventory
  DELIVERY_SERVICE = 13, // Direct Expense
  FINANCER = 14, // Other Expense
  BROKER = 8, // Other Payables
  INVENTORY = 1,
  CUSTOMER = 2,  //
  CASH = 3,
  BANK = 4,
  FIXED_ASSETS = 5,
  SUNDRY_CREDITOR = 6,
  SALARY_PAYABLES = 7,
  OTHER_PAYABLES = 8,
  LOAN = 9,
  TAX_PAYABLES = 10,
  CAPITAL_AC = 11,
  RETAINED_EARNINGS = 12,
  DIRECT_EXPENSE = 13,
  OTHER_EXPENSE = 14,
  ADMINISTRATION_EXPENSE = 15,
  PURCHASE = 16,
  SALE = 17,
}

enum E_LEDGERS_BASIC {
  BANK = 'Bank',
  CASH = 'Cash',
  SALARY_PAYABLES = 'Salary Payables',
  OTHER_PAYABLES = 'Other Payables',
  LOAN = 'Loan',
  TAX_PAYABLES = 'Tax Payables',
  CAPITAL_AC = 'Capital A/C',
  RETAINED_EARNINGS = 'Retained Earnings',
  DIRECT_EXPENSE = 'Direct Expense',
  OTHER_EXPENSE = 'Other Expense',
  ADMINISTRATION_EXPENSE = 'Administration Expense',
  PURCHASE = 'Purchase',
  SALE = 'Sale',
}

enum E_VOUCHERS {
  Purchase ='Purchase',
Sale	= 'Sale',
 	Expense	= 'Expense',
	Reciept	='Reciept',
 	Payments	='Payments',
	Salary  = 'Salary',
  
}

export { E_ACCOUNT_CATEGORIES, E_PRIMARY_LEDGERS, E_LEDGERS_BASIC,E_VOUCHERS };
