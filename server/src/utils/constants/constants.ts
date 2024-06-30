enum E_ACCOUNT_CATEGORIES {
  EMPLOYEE = 'Employee',
  SERVICE_SHOP = 'Service Shop',
  DELIVERY_SERVICE = 'Delivery Service',
  FINANCER = 'Financer',
  BROKER = 'Broker',
}

enum E_PRIMARY_LEDGERS {
  Employee = 'salary payables' ,
    'Service Shop' ='Customer',
    'Delivery Service' ='',
    Financer ='',
    Broker ='Payables'

}

export { E_ACCOUNT_CATEGORIES,E_PRIMARY_LEDGERS };
