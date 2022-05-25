import {useEffect, useState} from 'react'
import Image from "next/image";
import Link from "next/link";
const logoFileName = '/' +process.env.NEXT_PUBLIC_NAVBAR_LOGO;


const Navbar = () => {

  const [height, setHeight] = useState();
  const [width, setWidth] = useState();
  const [isLoadImage, setIsLoadImage] = useState(false);
  
  useEffect(() => {

    if(logoFileName != "/undefined"){
      
      const image = document.createElement("IMG");
      image.src = logoFileName;
      image.onload = () => {


        setHeight(52);
        setWidth(300);
        setIsLoadImage(true);
        return;

      
      }
      
    }

  }, []);

  return (

    <nav className="fixed top-0 z-40 bg-NavBar w-full flex flex-col justify-center items-center py-6 md:py-10">

      <div className="max-w-[1960px] w-full pr-4 md:pr-10 lg:pr-20 flex items-center justify-end">

        {/* <div className="max-w-max space-x-[51px] md:space-x-0 md:max-w-[431px] lg:max-w-[700px] w-full flex items-center justify-between"> */}
        <div className="w-full flex items-center">

        <style jsx>{`

          @media(min-width: 768px){
            .max-w-image{
              max-width: ${width}px;
            }
          }
          .max-w-navBar {
            max-width: calc(50% +${width/2}px);
          }

          .w-navBar{
            width: calc(50vw +${width/2}px - 14px);
          }

          @media(min-width: 768px){
            .w-navBar{
              width: calc(50vw +${width/2}px - 38px);
            }
          }

          @media(min-width: 1024px){
            .w-navBar{
              width: calc(50vw +${width/2}px - 78px);
            }
          }

        `}</style>

        {/* <div className="w-[calc(50vw+152px-16px)] md:w-[calc(50vw+152px-40px)] lg:w-[calc(50vw+152px-80px)] max-w-[calc(50%+150px)] flex items-center justify-between ml-auto"> */}

          <div className="w-navBar max-w-navBar flex items-center justify-between ml-auto">

            <a 
              className="block w-full max-w-[60%] max-w-image" 
              target="_blank"
              rel="noopener noreferrer"
              href={process.env.NEXT_PUBLIC_NAVBAR_LOGO_LINK}
            >

              {

                isLoadImage && (

                  <Image
                    className="w-full"
                    src={logoFileName}
                    alt={logoFileName.replace("/","")}
                    width={width}
                    height={height}                
                    layout="responsive"
                    quality={100}
                  />
                )

              }

              </a>

              <a 
              target="_blank"
              rel="noopener noreferrer"
              href={process.env.NEXT_PUBLIC_NAVBAR_WALLET_LINK} 
              className=" py-[9.5px] px-[19px] md:px-[62.5px] leading-[13px] bg-primary md:py-[13.5px] text-center text-secondary buttonShape text-[12px] font-body"
              >
              {process.env.NEXT_PUBLIC_NAVBAR_WALLET_TEXT}
              </a>
          </div>

        </div>

      </div>

    </nav>

  );

};

export default Navbar;
