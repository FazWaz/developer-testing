
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';
import { useQuery } from '@apollo/client';
import { GET_PROPERTY_BY_ID } from '@/graphql/queries/GetPropertyById';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Spinner from '@/components/Spinner';
import PropertyHeaderImage from '@/components/PropertyHeaderImage';
import PropertyDetails from '@/components/PropertyDetails';
import PropertyImages from '@/components/PropertyImages';
import DefaultPropertyImage from '@/assets/images/property-default-image.jpg';

const PropertyPage = () => {
    const router = useRouter();
    const { id } = router.query;
    const [property, setProperty] = useState(null);

    const { loading, error, data } = useQuery(GET_PROPERTY_BY_ID, {
        variables: { id },
      });

    useEffect(() => {
      if(data?.property){
        setProperty(data.property);
      }
    },[data]);
      const images = (property?.images && JSON.parse(property.images)) || [DefaultPropertyImage];
      return (
        <>
        <Navbar/>
         {!property && !loading && (
            <h1 className='text-center text-2xl font-bold mt-10'>
            Property Not Found
          </h1>
         )}
          {loading && <Spinner loading={loading} />}
          {!loading && property && (
            <>
            <PropertyHeaderImage image={images[0]} />
            <section>
            <div className='container m-auto py-6 px-6'>
              <Link
                href='/'
                className='text-blue-500 hover:text-blue-600 flex items-center'
              >
                <FaArrowLeft className='mr-2' /> Back to Properties
              </Link>
            </div>
          </section>
          <section className='bg-blue-50'>
            <div className='container m-auto py-10 px-6'>
              <div className='grid grid-cols-1 md:grid-cols-70/30 w-full gap-6'>
                <PropertyDetails property={property} />
              </div>
            </div>
          </section>
          <PropertyImages images={images} />
            </>
          )}
          <Footer/>
          </>
      )
}
export default PropertyPage;