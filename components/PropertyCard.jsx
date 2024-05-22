
import Image from 'next/image';
import Link from 'next/link';
import {
  FaBed,
  FaRulerCombined,
  FaMoneyBill
} from 'react-icons/fa';
import DefaultPropertyImage from '@/assets/images/property-default-image.jpg';

const PropertyCard = ({ property }) => {
  const images = property.images && JSON.parse(property.images);
  return (
    <div className='rounded-xl shadow-md relative shadow-md hover:shadow-2xl hover:scale-102 transition-shadow duration-300'>
      <Link 
        href={`/properties/${property.id}`}
      >
      <Image
        src={images[0] || DefaultPropertyImage }
        alt=''
        height={0}
        width={0}
        sizes='100vw'
        className='w-full h-auto rounded-t-xl md:h-[260px]'
      />
      <div className='absolute bg-blue-700 text-white px-4 py-1 rounded-tl-md' style={{top:0,left:0}}>
        For {property.type}
      </div>
      <div className='p-4'>
        <div className='text-left md:text-center lg:text-left mb-4'>
          <h3 className='text-xl font-bold'>{property.project_name}</h3>
        </div>

        <div className='flex gap-4 text-gray-500 mb-3 text-sm'>
          <p>
            <FaBed className='inline mr-2' /> {property.bedroom_count}{' '}
            <span className='md:hidden lg:inline'>Beds</span>
          </p>
          <p>
            <FaRulerCombined className='inline mr-2' />
            {property.area}{' '}
            <span className='md:hidden lg:inline'>sqft</span>
          </p>
          <p>
            <FaMoneyBill className='inline-block mr-2 mb-1' />
            {property.price} {' '}
            <span className='hidden sm:inline'>THB</span>
          </p>
        </div>

        <div className='border border-gray-100 mb-5'></div>

        <div className='flex flex-col lg:flex-row justify-between mb-4'>
          <div className='flex align-middle gap-2 mb-4 lg:mb-0'>
            {property.short_title}
          </div>
        </div>
      </div>
      </Link>
    </div>
  );
};
export default PropertyCard;
