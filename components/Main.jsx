import React from 'react'
import CustomProductViewer from './CustomProductViewer';

const topText = process.env.NEXT_PUBLIC_HERO_SECTION_BODY ?? "";
const headline = process.env.NEXT_PUBLIC_MIDSECTION_HEADLINE ?? "";
const description = process.env.NEXT_PUBLIC_MIDSECTION_DESCRIPTION ?? "";

function Main({featuredProduct}) {

  return (

    <section className='w-full pb-10 lg:pb-0 max-w-[1960px] px-4 md:px-10 lg:px-20 mx-auto h-full flex flex-col justify-center items-center pt-20 md:pt-[120px]'>

      <div className='w-full justify-center items-center mb-20 md:mb-[120px]'>
        <h2 className='text-lg md:text-[24px] text-center font-body md:font-semibold max-w-[616px] mx-auto leading-[28px] md:leading-[38.4px]'>
          {topText}
        </h2>
      </div>

      <div className="flex flex-col space-y-10 lg:space-y-0 lg:space-x-5 xl:space-x-0 lg:flex-row md:items-center justify-between w-full max-w-[1140px] base:max-w-[calc(89.0625%)] mr-auto">

        <div className="flex flex-col items-start">
          <h2 className='text-[32px] leading-[32px] md:text-[52px] font-headline md:font-black md:max-w-[552px] md:mx-auto md:text-center lg:text-left lg:mx-0 lg:max-w-[600px] md:leading-[52px] mb-4 md:mb-6'>
            {headline}
          </h2>
          <p className='text-base lg:max-w-[487px] lg:mx-0 md:mx-auto lg:text-left md:text-center  md:max-w-[552px] font-body leading-[25px]'>
            {description}
          </p>
        </div>

        <div className='block w-full lg:min-w-[320px] lg:w-[36.5%] lg:max-w-[573.3px]'>
          
            { Object.keys(featuredProduct) > 1 && (
              <CustomProductViewer product={featuredProduct} />
            ) }
          
        </div>
        

      </div>

      
    </section>
  )
  
}

export default Main