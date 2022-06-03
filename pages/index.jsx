import Head from "next/head";
import Hero from "../components/Hero";
import Grid from "../components/Grid";
import {useEffect} from "react";
import { assignColors } from "../helpers";
import Contact from "../components/Contact";
import Main from "../components/Main";

import { Bitski, AuthenticationStatus } from 'bitski';
import Web3 from 'web3';

const Home = ({featuredProduct,products}) => {

  useEffect(() => {

    if(typeof window !== "undefined"){

      const bitski = new Bitski('c22c9d82-1e37-4855-b48e-2ac9e48849bd', 'https://automobilist.netlify.app/'); // error because url CORS
      const provider = bitski.getProvider();
      const web3 = new Web3(provider);
      console.log(web3);

      function checkAuthStatus() {

        console.log("into function");
        //Check if we are logged in
        if (bitski.authStatus === AuthenticationStatus.NotConnected) {
          //create the connect button
          const containerElement = document.querySelector('#bitski-button');
          const connectButton = bitski.getConnectButton({ container: containerElement});
          
          connectButton.callback = (error, user) => {
            if (error) {
              // Handle errors
              return;
            }
            //Logged in!
            connectButton.remove();
            continueToApp();
          };
          // Optionally handle cancellation
          connectButton.onCancel = () => {
            // Will be called when the user clicks sign in, but dismisses popup
          };
        } else {
          //already logged in
          continueToApp();
        }
      }

      function handleLoad(){
        checkAuthStatus();
      }
      
      window.addEventListener('load', handleLoad);
      return window.removeEventListener('load', handleLoad, true);
      
    }

  },[])

  useEffect(() => {
    assignColors();
  }, [products]);

  return (
    <>

      <Head>
        <title>{process.env.NEXT_PUBLIC_SITE_TITLE}</title>
        <link rel="shortcut icon" href={`/${process.env.NEXT_PUBLIC_FAVICON}`} />
      </Head>
      
      <Hero />

      <Main featuredProduct={featuredProduct}/>
      
      <Grid products={products} featuredProduct={featuredProduct}/>

      <Contact />
      
    </>
  );

};

export const getServerSideProps = async () => {

  const endpoint = process.env.NEXT_PUBLIC_API_KEY;

  async function featuredProduct(){

    try {

      const res = await fetch(endpoint.toString().concat(`/${process.env.NEXT_PUBLIC_MIDSECTION_FEATURED_PRODUCT ?? "2096389b-aa71-4f03-9cd0-242d6050e964" }`));
      const response = await res.json();
      const {error} = response;
      if(error){
        return {};
      }else{
        const {product:featured_product} = response;
        return featured_product;      
      }

    } catch (error) {
      return {};
    }



  }

  async function x(){

    const res = await fetch(endpoint+"?all=true&limit=100&offset=0");
    const data = await res.json()
    const {products} = data;
    console.log(products.map(p => p.id));
    return products;
    
  }

  async function requestProduct(id){

    try {

      if (!String.prototype.replaceAll) {
        String.prototype.replaceAll = function(str, newStr){
      
          // If a regex pattern
          if (Object.prototype.toString.call(str).toLowerCase() === '[object regexp]') {
            return this.replace(str, newStr);
          }
      
          // If a string
          return this.replace(new RegExp(str, 'g'), newStr);
      
        };
      }

      // example ID = 5f267ee7-aaa1-4f7d-b9cf-776cdafe71db -> 844412 (each number is string.length of the split)

      const productId = id.toString().trim().replaceAll("'","").replaceAll('"',"");

      const keys = productId.split("-");
      let validCombination = "";

      keys.forEach(key => validCombination += `${key.length}` )

      if(validCombination === "844412"){
        const request = await fetch(endpoint.concat(`/${productId}`));
        const response = await request.json();
        const {error} = response;
        if(error){
          return {id};
        }else{
          return response.product;      
        }
        
      }

      return {id};

    } catch (error) {
      return {id};
    }
    
  }

  async function specificProducts(){

    let arrayProducts =  process.env.NEXT_PUBLIC_ARRAY_IDS.split(",");
    
    try {
      const allResponses = await Promise.all(arrayProducts.map(id => requestProduct(id)));  
      return allResponses;
    } catch (error) {
      return {}
    }
    
    
  }

  const [featured_product,products] = await Promise.all([featuredProduct(),specificProducts()]);
  
  return {
    props: {
      featuredProduct: featured_product,
      products
    },
  };

};


export default Home;
