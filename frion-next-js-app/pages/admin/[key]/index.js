import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { en } from "../../../locales/en";
import { ru } from "../../../locales/ru";
import { uk } from "../../../locales/uk";
import { de } from "../../../locales/de";

import fetch from "isomorphic-unfetch";
import Link from "next/link";
import Image from "next/image";

import navBar from "../../../styles/navBar.module.css";
import MenuIcon from "../../../assets/logo.png";

import adminMenu from "../../../styles/adminMenu.module.css";
import shopBlock from "../../../styles/products.module.css";
import cartIcon from "../../../assets/Icons/Tilda_Icons_3st_cart.png";
import magnifierIcon from "../../../assets/Icons/Tilda_Icons_2web_magnifier.png";
import dataIcon from "../../../assets/Icons/Tilda_Icons_40_IT_data.svg";

const AdminList = ({ Akey, isKeyValid, keyData }) => {
  const router = useRouter();
  function getSelectedLang() {
    return document.getElementById("LanguageSelect").value;
  }
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
  const [t, setT] = useState(getLang(router.locale));

  return (
    <div>
      <div
        className={`sticky flex justify-between top-0 py-3 px-10 ${navBar.navBar}`}
      >
        {/* Logo/Home */}
        <Link href={`/`}>
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
          <div className="flex justify-end w-full">
            <div className="self-center mx-4">
              <select
                className={`${navBar.langButton} px-4 text`}
                id="LanguageSelect"
                onChange={(e) => {
                  setT(getLang(e.target.value));
                }}
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
      {isKeyValid ? (
        <div>
          <div
            className={`${shopBlock.shopContainer} container mx-auto flex py-12 justify-center`}
          >
            <div
              className={`grid auto-rows-max grid-cols-4 justify-between w-full`}
            >
              {keyData[0].addKeys && (
                <div
                  className={`${adminMenu.adminButtons} self-center text-gray-700 relative justify-self-auto text-center px-4 py-4  mx-3 my-3 rounded-lg`}
                >
                  <button className="">Add key</button>
                </div>
              )}
              {keyData[0].updateKeys && (
                <div
                  className={`${adminMenu.adminButtons} self-center text-gray-700 relative justify-self-auto text-center px-4 py-4 mx-3 my-3 rounded-lg`}
                >
                  <button className="">Update key</button>
                </div>
              )}
              {keyData[0].deleteKeys && (
                <div
                  className={`${adminMenu.adminButtons} self-center text-gray-700 relative justify-self-auto text-center px-4 py-4 mx-3 my-3 rounded-lg`}
                >
                  <button className="">Delete key</button>
                </div>
              )}
              {(keyData[0].addAndUpdateProducts ||
                keyData[0].deleteProducts) && (
                <Link href={`/admin/${Akey}/products/${router.locale}/`}>
                  <div
                    className={`${adminMenu.adminButtons} self-center text-gray-700 relative justify-self-auto text-center px-4 py-4 mx-3 my-3 rounded-lg`}
                  >
                    <button className="">Edit products</button>
                  </div>
                </Link>
              )}

              {(keyData[0].takingReq || keyData[0].deletingTakingReq) && (
                <div
                  className={`${adminMenu.adminButtons} self-center text-gray-700 relative justify-self-auto text-center px-4 py-4  mx-3 my-3 rounded-lg`}
                >
                  <button className="">Taking requests</button>
                </div>
              )}
              {(keyData[0].givingReq || keyData[0].deletingGivingReq) && (
                <div
                  className={`${adminMenu.adminButtons} self-center text-gray-700 relative justify-self-auto text-center px-4 py-4 mx-3 my-3 rounded-lg`}
                >
                  <button className="">Giving requests</button>
                </div>
              )}
              {(keyData[0].healingReq || keyData[0].deletingHealingReq) && (
                <div
                  className={`${adminMenu.adminButtons} self-center text-gray-700 relative justify-self-auto text-center px-4 py-4 mx-3 my-3 rounded-lg`}
                >
                  <button className="">Healing requests</button>
                </div>
              )}
              {(keyData[0].addPlaces || keyData[0].deletePlaces) && (
                <div
                  className={`${adminMenu.adminButtons} self-center text-gray-700 relative justify-self-auto text-center px-4 py-4 mx-3 my-3 rounded-lg`}
                >
                  <button className="">Places</button>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center">
          <div className="text-2xl">Admin key is incorrect</div>
        </div>
      )}
    </div>
  );
};

AdminList.getInitialProps = async ({ query: { key, locale } }) => {
  const keyRes = await fetch(`http://localhost:3000/api/keys/${key}`);
  const { success, keyData } = await keyRes.json();
  return { Akey: key, isKeyValid: success, keyData: keyData };
};

export default AdminList;
