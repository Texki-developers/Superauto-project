export const dummyData = [
  {
    id: '23',
    vehicle_no: 'KL 07 BT 8889',
    customer: 'Marshad',
    mobile: '8866143005',
    rc: true,
    insurance: false,
    proof: true,
    date: '19/11/2024',
  },
  {
    id: '33',
    vehicle_no: 'KL 08 ZY 1234',
    customer: 'Anjali',
    mobile: '9867543210',
    rc: false,
    insurance: true,
    proof: false,
    date: '20/11/2024',
  },
  {
    id: '43',
    vehicle_no: 'KL 09 AB 4321',
    customer: 'Rohan',
    mobile: '7766554433',
    rc: true,
    insurance: true,
    proof: true,
    date: '21/11/2024',
  },
  {
    id: '53',
    vehicle_no: 'KL 10 CD 5678',
    customer: 'Sofia',
    mobile: '9988776655',
    rc: false,
    insurance: false,
    proof: true,
    date: '22/11/2024',
  },
  {
    id: '63',
    vehicle_no: 'KL 11 EF 6789',
    customer: 'Arun',
    mobile: '8899776655',
    rc: true,
    insurance: false,
    proof: false,
    date: '23/11/2024',
  },
];

export const ColumnData = [
  {
    name: 'ID',
    key: 'id',
  },
  {
    name: 'Vehicle No',
    key: 'vehicle_no',
  },
  {
    name: 'Customer',
    key: 'customer',
  },
  {
    name: 'Mobile',
    key: 'mobile',
  },
  {
    name: 'RC',
    key: 'rc',
    columnData: (value: string) => {
      return value ? (
        <p className='text-green'>Yes</p>
      ) : (
        <p className='text-red'>No</p>
      );
    },
  },
  {
    name: 'Insurance',
    key: 'insurance',
    columnData: (value: string) => {
      return value ? (
        <p className='text-green'>Yes</p>
      ) : (
        <p className='text-red'>No</p>
      );
    },
  },
  {
    name: 'Proof',
    key: 'proof',
    columnData: (value: string) => {
      return value ? (
        <p className='text-green'>Yes</p>
      ) : (
        <p className='text-red'>No</p>
      );
    },
  },
  {
    name: 'Date',
    key: 'date',
  },
];
