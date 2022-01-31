import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { en } from "../../../../../locales/en";
import { ru } from "../../../../../locales/ru";
import { ua } from "../../../../../locales/ua";
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
const AdminOrdersList = ({ Akey, isKeyValid, keyData, orders, locale }) => {
  const router = useRouter();

  function getLang(selectedLocale) {
    switch (selectedLocale) {
      case "en":
        return en;
      case "ru":
        return ru;
      case "de":
        return de;
      case "ua":
        return ua;
    }
  }
  const [t, setT] = useState(getLang(locale));

  const [search, setSearch] = useState({ searchRequest: "" });
  const handleChange = (e) => {
    setSearch({
      ...search,
      [e.target.name]: e.target.value,
    });
  };
  const [deletingOrderId, setDeletingOrderId] = useState();
  const [acceptingOrderId, setAcceptingOrderId] = useState();
  useEffect(async () => {
    if (deletingOrderId) {
      const deleted = await fetch(
        `${process.env.API_HOST}/cart/order/${deletingOrderId}`,
        {
          method: "DELETE",
        }
      );
      router.push(`/admin/${Akey}/${locale}/orders/`);
    }
  }, [deletingOrderId]);
  useEffect(async () => {
    if (acceptingOrderId) {
      const accepted = await fetch(
        `${process.env.API_HOST}/cart/order/${acceptingOrderId}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ accepted: true }),
        }
      );
      router.push(`/admin/${Akey}/${locale}/orders/`);
    }
  }, [acceptingOrderId]);

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
                placeholder={t.searchPlaceholder}
              ></input>
              <Link
                href={`/admin/${Akey}/${locale}/orders/${search.searchRequest}`}
              >
                <button
                  className={`${shopBlock.searchButton} font-medium px-8 ml-2 py-1 rounded-lg`}
                >
                  {t.searchBtn}
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
                    }/orders`
                  );
                }}
                defaultValue={locale}
              >
                <option value="en">{t.english}</option>
                <option value="ru">{t.russian}</option>
                <option value="de">{t.deutsch}</option>
                <option value="ua">{t.ukrainian}</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      {isKeyValid && keyData[0].orders ? (
        <div>
          <div
            className={`${shopBlock.shopContainer} container mx-auto flex py-12 justify-center`}
          >
            <div className={`grid auto-rows-max grid-cols-4`}>
              {orders ? (
                <>
                  {orders.map((order) => {
                    if (!order.accepted && order.archivedAt == undefined) {
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
                                {t.NameReq}
                              </span>
                              <span className="break-words block text-base text-gray-700 px-2">
                                {order.name}
                              </span>
                            </div>

                            <div className="w-1/2 px-3">
                              <span className="block text-sm font-medium text-gray-700">
                                {t.SnameReq}
                              </span>
                              <span className="break-words block text-base text-gray-700 px-2">
                                {order.surname}
                              </span>
                            </div>
                          </div>

                          <span className="block text-sm font-medium text-gray-700 mx-3">
                            {t.PhoneReq}
                          </span>
                          <span className="break-words block text-base text-gray-700 mx-5">
                            {order.phone}
                          </span>

                          <span className="block text-sm font-medium text-gray-700 mx-3">
                            {t.EmailReq}
                          </span>
                          <span className="break-words block text-base text-gray-700 mx-5 mb-3">
                            {order.email}
                          </span>

                          <div className="absolute bottom-0 right-0 w-full px-4 pb-4">
                            <div className="w-full py-1 flex">
                              <button
                                className={`${
                                  requestStyle.shopBuyButton
                                } ${`w-1/2 rounded-l-lg`}`}
                                onClick={() => {
                                  setAcceptingOrderId(order._id);
                                }}
                              >
                                {t.acceptBtn}
                              </button>

                              <button
                                className={`${
                                  requestStyle.deleteButton
                                } ${`w-1/2 rounded-r-lg`}`}
                                onClick={() => {
                                  setDeletingOrderId(order._id);
                                }}
                              >
                                {t.deleteBtn}
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
            {t.nothingFound}
          </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center">
<div className="mt-48 text-4xl">
{t.keyIsIncorrect}
          </div>
        </div>
      )}
    </div>
  );
};

AdminOrdersList.getInitialProps = async ({ query: { key, locale } }) => {
  const keyRes = await fetch(`${process.env.API_HOST}/keys/findKey/${key}`);
  const orders = await fetch(`${process.env.API_HOST}/cart/${locale}`);
  const { success, keyData } = await keyRes.json();
  const { ordersData } = await orders.json();
  return {
    Akey: key,
    isKeyValid: success,
    keyData: keyData,
    orders: ordersData,
    locale: locale,
  };
};

export default AdminOrdersList;
