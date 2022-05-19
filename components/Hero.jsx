import {useEffect, useState} from "react";
import Image from "next/image";


const title = process.env.NEXT_PUBLIC_HERO_SECTION_HEADLINE ?? "";
const imageDesktop = "/".concat(process.env.NEXT_PUBLIC_HERO_IMAGE_DESKTOP) ?? "";
const imageMobile = "/".concat(process.env.NEXT_PUBLIC_HERO_IMAGE_MOBILE) ?? "";
const cta_text = process.env.NEXT_PUBLIC_HERO_CTA_TEXT ?? "";
const cta_link = process.env.NEXT_PUBLIC_HERO_CTA_LINK ?? "/";


const Hero = () => {

  const [desktopImage,setDesktopImage] = useState(typeof window !== "undefined" ? window.innerWidth > 768 ? true : false : false);
  const [currentImage, setCurrentImage] = useState(imageDesktop);

  useEffect(() => {

    if(typeof window !== "undefined"){

      if(window.innerWidth > 768){
        setCurrentImage(imageDesktop)
      }else{
        setCurrentImage(imageMobile)
      }

      function handleResizeEvent(){

        if(window.innerWidth > 768){
          setDesktopImage(true);
        }else{
          setDesktopImage(false);
        }
  
      }
      
      window.addEventListener("resize", handleResizeEvent);
      return window.removeEventListener("resize",handleResizeEvent,true);

    }

  }, []);

  useEffect(() => {

    if(desktopImage){
      setCurrentImage(imageDesktop)
    }else{
      setCurrentImage(imageMobile)
    }

  }, [desktopImage]);

  return (
    <>

      <section className="mt-[88px] md:mt-[120px] h-[368px] md:h-[500px] lg:h-[560px] w-full mx-auto flex flex-col justify-center items-center max-w-[2500px] relative">

        <div className="absolute inset-0 w-full h-full max-h-full">
    
          <div className="relative w-full h-full max-h-full">
            {process.env.NEXT_PUBLIC_HERO_VIDEO ? (

              <video loop muted playsInline autoPlay  className="object-cover !w-full h-full" >

                <source src={process.env.NEXT_PUBLIC_HERO_VIDEO} />
                <source src={process.env.NEXT_PUBLIC_HERO_VIDEO} />
                <p>Your browser Dont support videos</p>
                
              </video>
                          
            ) : (
              <Image
              src={currentImage}
              alt={currentImage.replace("/","")}
              className="object-cover min-h-full"
              layout="fill"
              quality={100}
              priority={true}
            />
            )}

          </div>

        </div>

        <div className="absolute inset-0 w-full h-full items-center flex flex-col justify-center lg:justify-start">

            <h1 className="max-w-[343px] md:max-w-[560px] lg:max-w-[955px] px-1 md:px-0 w-full text-5xl text-[52px] leading-[52px] md:text-[60px] md:leading-[60px] lg:text-[64px] lg:leading-[64px] text-white font-headline text-center mb-6 md:mb-10 lg:pt-[180px]">
              {title}
            </h1>

            <a 
              href={cta_link}
              className="px-[53.5px] leading-[14px] bg-primary py-[13px] text-center text-secondary buttonShape text-[12px] font-body"
            >
            {cta_text}

            </a>

        </div>

      </section>

    </>
  );
};

export default Hero;
