import React from 'react';
import Image from 'next/image';
import { Gallery, Item } from 'react-photoswipe-gallery';
import 'photoswipe/dist/photoswipe.css';
import DefaultPropertyImage from '@/assets/images/property-default-image.jpg';

const PropertyImages = ({ images }) => {
  return (
    <Gallery>
      <section className='bg-blue-50 p-4'>
        <div className='container mx-auto'>
          {images.length === 1 ? (
            <Item
              original={images[0]}
              thumbnail={images[0]}
              width='1000'
              height='600'
            >
              {({ ref, open }) => (
                <Image
                  ref={ref}
                  onClick={open}
                  src={images[0] || DefaultPropertyImage}
                  alt=''
                  className='object-cover h-[400px] mx-auto rounded-xl cursor-pointer'
                  width={900}
                  height={400}
                  priority={true}
                />
              )}
            </Item>
          ) : (
            <div className='grid grid-cols-2 gap-4'>
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`
                  ${
                    images.length === 3 && index === 2
                      ? 'col-span-2'
                      : 'col-span-1'
                  }
                `}
                >
                  <Item
                    original={image || DefaultPropertyImage}
                    thumbnail={image || DefaultPropertyImage}
                    width='1000'
                    height='600'
                  >
                    {({ ref, open }) => (
                      <Image
                        ref={ref}
                        onClick={open}
                        src={image || DefaultPropertyImage}
                        alt=''
                        className='object-cover h-[400px] w-full rounded-xl cursor-pointer'
                        width={500}
                        height={300}
                        sizes='(max-width: 768px) 100vw, 50vw'
                        priority={index === 0}
                      />
                    )}
                  </Item>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </Gallery>
  );
};

export default PropertyImages;
