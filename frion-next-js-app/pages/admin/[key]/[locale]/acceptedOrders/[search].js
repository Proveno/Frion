import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { en } from "../../../../../locales/en";
import { ru } from "../../../../../locales/ru";
import { uk } from "../../../../../locales/uk";
import { de } from "../../../../../locales/de";

import fetch from "isomorphic-unfetch";
import Link from "next/link";
import Image from "next/image";

import navBar from "../../../../../styles/navBar.module.css";
import MenuIcon from "../../../../../assets/logo.png";

import shopBlock from "../../../../../styles/products.module.css";
import cartIcon from "../../../../../assets/Icons/Tilda_Icons_3st_cart.png";
import manIcon from "../../../../../assets/Icons/Tilda_Icons_3st_man.svg";
import magnifierIcon from "../../../../../assets/Icons/Tilda_Icons_2web_magnifier.png";
import dataIcon from "../../../../../assets/Icons/Tilda_Icons_40_IT_data.svg";

import requestStyle from "../../../../../styles/requests.module.css";
const AdminOrdersList = ({ Akey, isKeyValid, keyData, orders, locale, searchText }) => {
  const router = useRouter();

  function getLang(selectedLocale) {
    switch (selectedLocale) {
      case "en":
        return en;
      case "ru":
        return ru;
      case "de":
        return de;
      case "uk":
        return uk;
    }
  }
  const [t, setT] = useState(getLang("en"));

  const [search, setSearch] = useState({ searchRequest: "" });
  const handleChange = (e) => {
    setSearch({
      ...search,
      [e.target.name]: e.target.value,
    });
  };
  const [archivingOrderId, setArchivingOrderId] = useState();
  useEffect(async () => {
    if (archivingOrderId) {
      const archived = await fetch(
        `http://localhost:3000/api/cart/order/${archivingOrderId}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({archivedAt: new Date()}),
        }
      );
      router.push(`/admin/${Akey}/${locale}/acceptedOrders/${searchText}`);
    }
  }, [archivingOrderId]);

  return (
    <div>
      <div
        className={`sticky flex justify-between top-0 py-3 px-10 ${navBar.navBar}`}
      >
        {/* Logo/Home */}
        <Link href={`/admin/${Akey}/${locale}`}>
          <div className={`flex`}>
            <div className={`${navBar.imageLogo}`}>
              <Image src={MenuIcon} alt="Logo picture :>" />
            </div>
            <div className={`ml-2 ${navBar.textLogo}`}>
              <a>Frion</a>
            </div>
          </div>
        </Link>

        {/* NavButtons */}
        {/* TODO: replace links to scroll */}
        <div className={`flex justify-between w-full`}>
          <div className={`w-full self-center flex justify-end`}>
            <div className="flex w-1/2 mx-4">
              <input
                onChange={handleChange}
                name="searchRequest"
                className={`${shopBlock.searchInput} w-full rounded px-2 mr-2 placeholder-gray-400`}
                placeholder="Enter owner..."
                defaultValue={searchText}
              ></input>
              <Link
                href={`/admin/${Akey}/${locale}/acceptedOrders/${search.searchRequest}`}
              >
                <button
                  className={`${shopBlock.searchButton} font-medium px-8 ml-2 py-1 rounded-lg`}
                >
                  Search
                </button>
              </Link>
            </div>
          </div>
          <div className="flex justify-center w-1/6">
            <div className="self-center mx-4">
              <select
                className={`${navBar.langButton} px-4 text`}
                id="LanguageSelect"
                onChange={() => {
                  setT(
                    getLang(document.getElementById("LanguageSelect").value)
                  );
                  router.push(
                    `/admin/${Akey}/${
                      document.getElementById("LanguageSelect").value
                    }/acceptedOrders/${searchText}`
                  );
                }}
                defaultValue={locale}
              >
                <option value="en">{t.english}</option>
                <option value="ru">{t.russian}</option>
                <option value="de">{t.deutsch}</option>
                <option value="uk">{t.ukrainian}</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      {isKeyValid && keyData[0].acceptedOrders ? (
        <div>
          <div
            className={`${shopBlock.shopContainer} container mx-auto flex py-12 justify-center`}
          >
            <div className={`grid auto-rows-max grid-cols-4`}>
              {orders ? (
                <>
                  {orders.map((order) => {
                    if (order.accepted && order.archivedAt == undefined) {
                      return (
                        <div
                          className={`${requestStyle.requestItems} w-full text-gray-700 relative justify-self-auto text-start px-4 pt-3 pb-16 rounded-lg`}
                          // onClick={()=>{
                          //     router.push(`/admin/${Akey}/${
                          //       document.getElementById("LanguageSelect").value
                          //     }/giving/request/${request._id}`)
                          // }}
                        >
                            <Image
                            width={500}
                            height={500}
                            className={`${shopBlock.shopImages} border-none rounded-3xl`}
                            src={manIcon}
                            alt="Product picture"
                          ></Image>
                          <div className="flex mt-3">
                            <div className="w-1/2 px-3">
                              <span className="block text-sm font-medium text-gray-700">
                                Name
                              </span>
                              <span className="break-words block text-base text-gray-700 px-2">
                                {order.name}
                              </span>
                            </div>

                            <div className="w-1/2 px-3">
                              <span className="block text-sm font-medium text-gray-700">
                                Surname
                              </span>
                              <span className="break-words block text-base text-gray-700 px-2">
                                {order.surname}
                              </span>
                            </div>
                          </div>

                          <span className="block text-sm font-medium text-gray-700 mx-3">
                            Phone
                          </span>
                          <span className="break-words block text-base text-gray-700 mx-5">
                            +{order.phone}
                          </span>

                          <span className="block text-sm font-medium text-gray-700 mx-3">
                            Email
                          </span>
                          <span className="break-words block text-base text-gray-700 mx-5 mb-3">
                            {order.email}
                          </span>
                          <div className="absolute bottom-0 right-0 w-full px-4 pb-4">
                            <div className="w-full py-1 flex">
                              <button
                                className={`${
                                  requestStyle.deleteButton
                                } ${`w-full rounded-lg`}`}
                                onClick={() => {
                                    setArchivingOrderId(order._id);
                                }}
                              >
                                ARCHIVE
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    }
                  })}
                </>
              ) : (
                // TODO: make beautifyll exeption
<div className="mt-48 text-4xl">
            Nothing found
          </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center">
<div className="mt-48 text-4xl">
            Admin key is incorrect
          </div>
        </div>
      )}
    </div>
  );
};

AdminOrdersList.getInitialProps = async ({ query: { key, locale, search } }) => {
  const keyRes = await fetch(`http://localhost:3000/api/keys/findKey/${key}`);
  const orders = await fetch(`http://localhost:3000/api/cart/${locale}/${search}`);
  const { success, keyData } = await keyRes.json();
  const { orderData } = await orders.json();
  return {
    Akey: key,
    isKeyValid: success,
    keyData: keyData,
    orders: orderData,
    locale: locale,
    searchText: search
  };
};

export default AdminOrdersList;
