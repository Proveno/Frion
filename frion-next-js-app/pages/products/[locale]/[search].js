// import { useRouter } from "next/router";
// import { useState } from "react";
// import { en } from "../../../locales/en";
// import { ru } from "../../../locales/ru";
// import { uk } from "../../../locales/uk";
// import { de } from "../../../locales/de";

// import fetch from "isomorphic-unfetch";
// import Link from "next/link";
// import Image from "next/image";

// import navBar from "../../../styles/navBar.module.css";
// import MenuIcon from "../../../assets/logo.png";
// import shopBlock from "../../../styles/products.module.css";
// import cartIcon from "../../../assets/Icons/Tilda_Icons_3st_cart.png";
// import cartBlock from "../../../styles/cartState.module.css";
// import crossIcon from "../../../assets/Icons/Tilda_Icons_27bu_8.svg";

// const ProductSearch = ({ products, searchText, locale }) => {
//   const router = useRouter();
//   function getLang(selectedLocale) {
//     switch (selectedLocale) {
//       case "en":
//         return en;
//       case "ru":
//         return ru;
//       case "de":
//         return de;
//       case "uk":
//         return uk;
//     }
//   }
//   const [t, setT] = useState(getLang(locale));

//   const [search, setSearch] = useState({ searchRequest: "" });
//   const handleChange = (e) => {
//     setSearch({
//       ...search,
//       [e.target.name]: e.target.value,
//     });
//   };
//   const [ShouldNavButtons, setShouldNavButtons] = useState(true);
//   const [isCartOpened, setIsCartOpened] = useState(false);
//   const [cart, setCart] = useState([]);
//   return (
//     <div>

// {isCartOpened && (
//         <div
//           className={`${cartBlock.blurBack} flex justify-center fixed w-screen h-screen`}
//         >
//           <div className={`${cartBlock.cart} self-center w-2/5 rounded-3xl`}>
//             <div className={`${cartBlock.products} px-4 pt-2`}>
//               <div className="flex justify-between">
//                 <div className="text-start text-2xl font-bold text-gray-700">
//                   {t.myOrder}
//                 </div>
//                 <div
//                   className={`${cartBlock.close} mt-1`}
//                   onClick={() => {
//                     setShouldNavButtons(true);
//                     setIsCartOpened(false);
//                   }}
//                 >
//                   <Image src={crossIcon} alt="Close"></Image>
//                 </div>
//               </div>

//               <div className={`${cartBlock.product} mt-4 w-full rounded-lg`}>
//                 {/* One product order */}
//                 {cart.map((product) => {
//                   return (
//                     <>
//                       <div className="flex bg-white  justify-between">
//                         <div className={`${cartBlock.images}  mt-2`}>
//                           <Image
//                             className="rounded-lg"
//                             src={product.photo}
//                             width={130}
//                             height={130}
//                           ></Image>
//                         </div>
//                         <div className="w-4/5">
//                           <span className="block text-sm text-lg text-gray-700 my-2">
//                             {product.title}
//                           </span>
//                           <div className="w-full pr-5">
//                             <div className="block text-sm text-sm text-gray-700 my-3 flex justify-between">
//                               <div>{t.priceCart}</div>
//                               <div>
//                                 <span>{product.price["$numberDecimal"]}</span>$
//                               </div>
//                             </div>
//                             <div className="block text-sm text-sm text-gray-700 my-3 flex justify-between">
//                               <div>{t.quantityCart}</div>
//                               <input
//                                 className="w-14 border rounded-xl pl-3"
//                                 type={"number"}
//                                 defaultValue={product.number}
//                                 onChange={(e) => {
//                                   product.number = e.target.value;
//                                   console.log(product.number);
//                                 }}
//                               ></input>
//                             </div>
//                           </div>
//                         </div>
//                         <div className={`w-4 mt-2 mr-2`}>
//                           <Image
//                             src={crossIcon}
//                             alt="Close"
//                             onClick={() => {
//                               setCart([
//                                 ...cart.slice(0, cart.indexOf(product)),
//                                 ...cart.slice(cart.indexOf(product) + 1),
//                               ]);
//                             }}
//                           ></Image>
//                         </div>
//                       </div>
//                       {cart[cart.length - 1] != product && (
//                         <div className={`${cartBlock.line} w-full h-0.5`}></div>
//                       )}
//                     </>
//                   );
//                 })}
//               </div>
//             </div>
//             <div className="flex">
//               <div
//                 className={`${cartBlock.submit} self-end w-full rounded-b-xl text-center py-4 text-xl`}
//                 onClick={()=>{
//                   console.log(cart);
//                 }
//                 }
//               >
//                 {t.buyButtonCart}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}


//       {ShouldNavButtons && (
//       <div
//         className={`sticky flex justify-between top-0 py-3 px-10 ${navBar.navBar}`}
//       >
//         {/* Logo/Home */}
//         <Link href={`/`}>
//           <div className={`flex`}>
//             <div className={`${navBar.imageLogo}`}>
//               <Image src={MenuIcon} alt="Logo picture :>" />
//             </div>
//             <div className={`ml-2 ${navBar.textLogo}`}>
//               <a>Frion</a>
//             </div>
//           </div>
//         </Link>

//         {/* NavButtons */}
//         {/* TODO: replace links to scroll */}
//         <div className={`flex justify-between w-full`}>
//           <div className={`w-full self-center flex justify-end`}>
//             <div className="flex w-1/2 mx-4">
//               <input
//                 onChange={handleChange}
//                 name="searchRequest"
//                 className={`${shopBlock.searchInput} w-full rounded px-2 mr-2 placeholder-gray-400`}
//                 placeholder="Enter title..."
//                 defaultValue={searchText}
//               ></input>
//               <Link href={`/products/${locale}/${search.searchRequest}`}>
//                 <button
//                   className={`${shopBlock.searchButton} font-medium px-8 ml-2 py-1 rounded-lg`}
//                 >
//                   Search
//                 </button>
//               </Link>
//             </div>
//           </div>
//           <div className="flex justify-center w-1/6">
//             <div className="self-center mx-4">
//               <select
//                 className={`${navBar.langButton} px-4 text`}
//                 id="LanguageSelect"
//                 onChange={() => {
//                   setT(getLang(document.getElementById("LanguageSelect").value));
//                   router.push(
//                     `/products/${
//                       document.getElementById("LanguageSelect").value
//                     }/${searchText}`
//                   );
//                 }}
//                 defaultValue={locale}
//               >
//                 <option value="en">{t.english}</option>
//                 <option value="ru">{t.russian}</option>
//                 <option value="de">{t.deutsch}</option>
//                 <option value="uk">{t.ukrainian}</option>
//               </select>
//             </div>
//             <div className={`self-center mx-4`}>
//               <Image
//                 width={35}
//                 height={35}
//                 src={cartIcon}
//                 onClick={() => {
//                   if(cart.length > 0){
//                   setShouldNavButtons(false);
//                   setIsCartOpened(true);}
//                 }}
//                 layout="fixed"
//               ></Image>
//             </div>
//           </div>
//         </div>
//       </div>
//       )}
//       <div
//         className={`${shopBlock.shopContainer} container mx-auto flex py-12 justify-center`}
//       >
//         <div className={`grid auto-rows-max grid-cols-4`}>
//           {products ? (
//             <>
//               {products.map((product) => {
//                 return (
//                   <div
//                     className={`${shopBlock.shopItems} text-gray-700 relative justify-self-auto text-center px-4 pt-3 pb-16 rounded-lg`}
//                   >
//                     <Link href={`/products/${router.locale}/product/${product._id}`}>
//                       <Image
//                         width={500}
//                         height={500}
//                         className={`${shopBlock.shopImages} border-none rounded-3xl`}
//                         src={product.photo}
//                         alt="Product picture"
//                       ></Image>
//                     </Link>
//                     <span className="block text-sm text-lg text-gray-700 my-2">
//                       {product.title}
//                     </span>
//                     <div className="absolute bottom-0 right-0 w-full px-4 pb-4">
//                       <button
//                         className={`${shopBlock.shopBuyButton} w-full rounded-lg py-1`}
//                         onClick={() => {
//                           if (!cart.map((e) => e._id).includes(product._id)) {
//                             // console.log(cart.map(e => e._id).includes(product._id));
//                             setCart([...cart, { ...product, number: 1 }]);
//                           }
//                         }}
//                       >
//                         {t.buyFor}
//                         <span>{product.price["$numberDecimal"]}</span>$
//                       </button>
//                     </div>
//                   </div>
//                 );
//               })}
//             </>
//           ) : (
//             // TODO: make beautifyll exeption
//             <div>Nothing here</div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// ProductSearch.getInitialProps = async ({ query: { locale, search } }) => {
//   const res = await fetch(
//     `http://localhost:3000/api/products/${locale}/${search}`
//   );
//   const { data } = await res.json();
//   return { products: data, searchText: search, locale: locale };
// };

// export default ProductSearch;
