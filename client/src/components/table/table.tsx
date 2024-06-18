import './style.scss';

const Table = () => {
  return (
    <div className='bg-white-100 table w-full overflow-hidden rounded-lg border border-gray-300'>
      <table className='w-full'>
        <thead className='border-b border-gray-300'>
          <tr className='p-3'>
            <th>ID</th>
            <th>vehicle No</th>
            <th>Customer</th>
            <th>Moblie</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>23</td>
            <td>kl40u4668</td>
            <td>manshad</td>
            <td>90903243534</td>
          </tr>
          <tr>
            <td>23</td>
            <td>kl40u4668</td>
            <td>manshad</td>
            <td>90903243534</td>
          </tr>
        </tbody>
      </table>
      <footer className='flex justify-between border-t border-gray-300 p-3 align-middle'>
        <div className='perpage flex items-center gap-2'>
          <p className='text-[12px] leading-none'>Per Page</p>
          <select className='rounded border border-black-200 bg-gray-200 p-1 text-[12px]'>
            <option value='10'>10</option>
            <option value='20'>20</option>
            <option value='30'>30</option>
          </select>
        </div>
        <div className='pagination flex gap-1 align-middle'>
          <span className='pagination-box'>1</span>
          <span className='pagination-box'>2</span>
          <span className='pagination-box'>3</span>
          <span className='font-bold leading-none tracking-wide'>...</span>
          <span className='pagination-box'>8</span>
        </div>
      </footer>
    </div>
  );
};

export default Table;
