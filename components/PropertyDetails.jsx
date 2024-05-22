import {
    FaBed,
    FaDollarSign,
    FaRulerCombined,
    FaMoneyBill
  } from 'react-icons/fa';
  
  const PropertyDetails = ({ property }) => {
    return (
      <main>
        <div className='bg-white p-6 rounded-lg shadow-md text-center md:text-left'>
          <div className='text-gray-500 mb-4'>
            <span className='text-white bg-blue-600 px-4 py-1 font-bold'> {property.type} </span>
          </div>
          <h1 className='text-3xl font-bold mb-4'>{property.project_name}</h1>
        </div>
        <div className='bg-white p-6 rounded-lg shadow-md mt-6'>
          <h3 className='text-lg font-bold mb-6'>Description & Details</h3>
          <div className='flex justify-center gap-4 text-blue-500 mb-4 text-xl space-x-9'>
            <p>
              <FaBed className='inline-block mr-2' /> {property.bedroom_count}{' '}
              <span className='hidden sm:inline'>Beds</span>
            </p>
            <p>
              <i className='fa-solid fa-ruler-combined'></i>
              <FaRulerCombined className='inline-block mr-2' />
              {property.area}{' '}
              <span className='hidden sm:inline'>sqft</span>
            </p>
            <p className='mb-3'>
                <FaMoneyBill className='inline-block mr-2 mb-1' />
                {property.price}{' '}
                <span className='hidden sm:inline'>THB</span>
            </p>
          </div>
          <h4 className='text-gray-800 text-xl mt-4 mb-2 text-center'>{property.short_title}</h4>
          <p className='text-gray-500 mb-4 text-center'>{property.short_description}</p>
        </div>
      </main>
    );
  };
  export default PropertyDetails;
  