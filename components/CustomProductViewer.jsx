import React,{useState, useEffect, useCallback} from 'react'
import Image from "next/image";
import Link from "next/link";
import {intervalToDuration} from "date-fns";


function CustomProductViewer({ product }) {

  const [saleType, setSaleType] = useState("");
  const [productInfo,setProductInfo] = useState(product)
  const [countDown, setCountDown] = useState("");
  const [inventory, setInventory] = useState("");
  const [saleTypeStatus, setSaleTypeStatus] = useState("normal");

  const handleCountDown = function (salesEndAt){

    const lastDate = new Date(salesEndAt).getTime();
    const currentDate = new Date();

    let duration = intervalToDuration({
      start: lastDate, 
      end: currentDate,
    })

    const {years,months,days,hours,minutes,seconds} = duration;
    let countDown = "";

    years>0 && (years>=10 ? countDown+= years+"yrs " : countDown+= 0+years+"yrs ");
    months>0 && (months>=10 ? countDown+= months+"mo " : countDown+= 0+months+"mo ");
    days>=10 ? countDown+= days+"d " : countDown+= 0+days+"d ";
    hours>=10 ? countDown+= hours+"h " : countDown+= 0+hours+"h ";
    minutes>=10 ? countDown+= minutes+"m " : countDown+= 0+minutes+"m ";
    seconds>=10 ? countDown+= seconds+"s " : countDown+= 0+seconds+"s ";

    const liveAt = new Date(productInfo.liveAt).getTime();
    
    if([years,months,days,hours,minutes,seconds].every(element => element <= 0)){

      setSaleTypeStatus("reload");
      return "Checking status ..."

    } 

    if( productInfo.auctions.length != 0 ){

      if(currentDate > liveAt && productInfo.auctions[0].info.bids.length>0){
        setSaleTypeStatus("liveAt");
      }

    }

    if( [years,months,days].every(element => element <= 0)  && hours<=1 ){

      if(currentDate > liveAt && productInfo.auctions[0].info.bids.length>0){
        setSaleTypeStatus("closeUp");
      }
      
    }

    return countDown;

  };


  const countDownFunction = useCallback( handleCountDown,[productInfo]);

  function getActualBid(array){

    let timeArray = [];
    array.forEach( bid => {
      const date = new Date(bid.createdAt).getTime();
      timeArray = [...timeArray, date];
    });
  
    const lastBid = Math.max(...timeArray);
  
    const lastPrice = array.filter(child => {
  
      const childUNIX = new Date(child.createdAt).getTime();
      return childUNIX == lastBid;
  
    } );

    return lastPrice[0].amount;
  
  }

  function getOptimizedImage(url,width,height){

    const splitUrl = url.split('/');
    const domain =  "https://cdn.bitskistatic.com/cdn-cgi/image/";
    const settings = `width=${width},height=${height},quality=100,fit=cover,onerror=redirect,f=auto/tokens-raw/`
    const token = splitUrl[splitUrl.length - 2]+"/"+splitUrl[splitUrl.length - 1];
    return domain + settings + token;

    
  }

  useEffect( () => {

    const saleTypes = {

      LIMITED_EDITION : "Limited edition",
      AUCTION : "Auction",
      OFF_CHAIN_AUCTION : "Auction",
      OPEN_CHAIN_AUCTION : "Auction",
      OPEN_EDITION : "Open edition"
  
    }

    setSaleType(saleTypes[productInfo.saleType]);

    let interval;

    if(saleTypes[productInfo.saleType] == "Auction" || saleTypes[productInfo.saleType] == "Open edition"){

      if(productInfo?.auctions[0]?.info?.ended === false || (saleTypes[productInfo.saleType] == "Open edition" && new Date(productInfo.salesEndAt).getTime() >  new Date().getTime())){

        if(saleTypeStatus != "reload"){
          interval = setInterval(() => {
            setCountDown(countDownFunction(productInfo.salesEndAt,interval) )
          }, 1000);
        }

      }else{
        setCountDown("Closed")
      }
      
    }

    if(saleTypes[productInfo.saleType] == "Limited edition"){

      if(productInfo.totalSold === productInfo.totalAvailable){
        setInventory("Sold Out");
      }else{
        setInventory(`${productInfo.totalAvailable - productInfo.totalSold } of ${productInfo.totalAvailable} left`); 
      }

    }

    return () => clearInterval(interval); // Always clear intervals and events in useeffect to evit event propagation

  }, [productInfo,countDownFunction,saleTypeStatus]);

  useEffect(() => {

    if(saleTypeStatus === "reload" ){

      setTimeout( () => {

        async function reloadComponent(){

          const request = await fetch(process.env.NEXT_PUBLIC_API_KEY+`/${product.id}`);
          const response = await request.json();
          setProductInfo(response.product);
          setSaleTypeStatus("normal");

        }
        
        reloadComponent();



      }, 60000);

    }

  }, [saleTypeStatus,product]);

  return (

    <div className='w-full flex flex-col items-start select-none'>

      <Link href={productInfo?.purchaseLink} passHref>
        
        <a rel="noreferrer" target={"_blank"} href={productInfo?.purchaseLink} className='w-full relative pb-[calc(100%*1)] rounded-[32px] shadow-productViewer'>

          <div className="absolute inset-0 w-full flex flex-col justify-center items-center">

            <div className='relative h-full w-full flex max-h-full justify-center max-w-full transition-transform duration-200 ease-[ease-in-out] md:hover:scale-105'>

              {
                productInfo?.tokenMetadata?.animation_url != undefined ? (

                  <video loop muted playsInline autoPlay  className='object-cover h-full min-w-full max-h-full object-center w-full  mx-auto rounded-[32px]' >

                    <source src={productInfo.tokenMetadata.animation_url} />
                    <source src={productInfo.tokenMetadata.image} />
                    <p>Your browser Dont support videos</p>
                    
                  </video>

                ) :

                (

                  <div className='w-full h-full '>
                    <Image
                      className='object-cover h-full w-full object-center rounded-[32px]'
                      src={ getOptimizedImage(productInfo?.tokenMetadata?.image,608,608) }
                      alt={productInfo?.tokenMetadata?.title}
                      layout="responsive"
                      height={608}
                      width={608}
                      quality={100}
                      priority={true}
                    />
                  </div>

                )

              }

            </div>       

          </div>

        </a>

      </Link>

      <section className='w-full flex flex-col items-start'>

        <div className={`flex w-full items-center py-2 justify-between border-standard ${saleTypeStatus == "liveAt"? "liveActionColor" : ""}  ${saleTypeStatus == "closeUp" ? "closeUP text-white" : ""} rounded-lg mt-5 mb-3 border-2 px-2 space-x-2`}>

          <p className='flex text-xs font-black leading-[14.4px] items-center'>

            {
              saleType != "Auction" || saleTypeStatus == "normal"  ? (

                <>
                  {saleType}
                </>

              ) : saleTypeStatus == "liveAt" || saleTypeStatus == "reload" ? (

                <>

                  Live auction

                  <span className='ml-2 h-2.5 mt-live_auction w-2.5 rounded-full liveActionBg animate-pulse transition-all block'>
                  </span>

                </>

              ) : saleTypeStatus == "closeUp" ? (
                <>
                  Live auction
                </>
              ) : null
                
            }
            
          </p>

          <p className="text-xs font-body leading-[14.4px] text-right">
            {
              saleType === "Auction" || saleType === "Open edition"  ? (

                <>
                  {countDown}
                </>
                
              ): (
                <>
                  {inventory}
                </>
              )
            }
          </p>

        </div>

        <div className='w-full flex flex-col space-y-2 items-start'>

          <h2 className="text-lg leading-[21px] font-body uppercase">
            <Link href={productInfo?.purchaseLink}>
              <a rel="noreferrer" target={"_blank"} href={productInfo?.purchaseLink}>
                {productInfo?.tokenMetadata?.name}
              </a>
            </Link>
          </h2>

          {/* <h3 className="text-sm">
            <Link passHref href={`https://www.bitski.com/${productInfo?.username}`}>

              <a className='flex items-center space-x-2'>

                <Image
                  className='rounded-full object-cover '
                  src={`https://www.bitski.com/${productInfo?.username}/image`}
                  alt={""}
                  width={20}
                  height={20}
                  priority={true}
                />

                <p className='text-[#93979F] '>&#64;{productInfo?.username}</p>

              </a>

            </Link>
          </h3> */}

          <p className='font-body text-lg leading-[22px]'>

            {
              saleType !== "Auction" ? (
                <>
                  ${productInfo?.prices[0]?.price}
                </>
              ) : (saleTypeStatus == "normal" || saleTypeStatus == "reload") && (countDown != "Closed" || productInfo.auctions[0].info.bids.length == 0) ? (
                <>
                  ${productInfo.auctions[0].info.minBid}
                </>
              ) : (
                <>
                  ${getActualBid(productInfo.auctions[0].info.bids)}

                  { countDown != "Closed" ? (

                    <span className="text-sm ml-2 text-[#93979f]">
                     Current bid
                    </span>

                  ): ""}
                  
                </>
                
              )
              
            }

          </p>

        </div>

      </section>

    </div>

  )
}

export default CustomProductViewer