import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { en } from "../../../../locales/en";
import { ru } from "../../../../locales/ru";
import { ua } from "../../../../locales/ua";
import { de } from "../../../../locales/de";

import fetch from "isomorphic-unfetch";
import Link from "next/link";
import Image from "next/image";

import navBar from "../../../../styles/navBar.module.css";
import MenuIcon from "../../../../assets/logo.png";

import adminMenu from "../../../../styles/adminMenu.module.css";
import shopBlock from "../../../../styles/products.module.css";
import cartIcon from "../../../../assets/Icons/Tilda_Icons_3st_cart.png";
import magnifierIcon from "../../../../assets/Icons/Tilda_Icons_2web_magnifier.png";
import dataIcon from "../../../../assets/Icons/Tilda_Icons_40_IT_data.svg";

import keysIcon from "../../../../assets/admin panel icons/free-icon-keys-2829932.png";
import productsIcon from "../../../../assets/admin panel icons/premium-icon-products-2552183.png";
import takingIcon from "../../../../assets/admin panel icons/free-icon-delivery-450793.png";
import accTakingIcon from "../../../../assets/admin panel icons/free-icon-order-814987.png";
import givingIcon from "../../../../assets/admin panel icons/premium-icon-pet-cage-1566697.png";
import accGivingIcon from "../../../../assets/admin panel icons/free-icon-pet-house-3047827.png";
import healingIcon from "../../../../assets/admin panel icons/free-icon-clipboard-4827503.png";
import accHealingIcon from "../../../../assets/admin panel icons/free-icon-medical-records-4193448.png";
import categoryIcon from "../../../../assets/admin panel icons/premium-icon-category-3502685.png";
import orderIcon from "../../../../assets/admin panel icons/free-icon-online-order-2558180.png";
import accOrderIcon from "../../../../assets/admin panel icons/premium-icon-order-5334264.png";

const AdminList = ({ Akey, isKeyValid, keyData, locale }) => {
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
          <div className="flex justify-end w-full">
            <div className="self-center mx-4">
              <select
                className={`${navBar.langButton} px-4 text`}
                id="LanguageSelect"
                onChange={(e) => {
                  setT(getLang(e.target.value));
                  router.push(
                    `/admin/${Akey}/${
                      document.getElementById("LanguageSelect").value
                    }`
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
      {isKeyValid ? (
        <div>
          <div
            className={`${shopBlock.shopContainer} container mx-auto py-12 justify-center`}
          >
            <p className="text-3xl ml-8">
              {t.welcomeWorker}
              {keyData[0].owner}
            </p>
            <p className="text-l ml-8 mt-2">{t.haveANiceDayWorker}</p>
            <div
              className={`grid auto-rows-max grid-cols-4 mt-2 justify-between w-full`}
            >
              {(keyData[0].addAndUpdateKeys || keyData[0].deleteKeys) && (
                <Link href={`/admin/${Akey}/${locale}/keys/`}>
                  <div
                    className={`${adminMenu.adminButtons} flex h-20 self-center text-gray-700 relative justify-self-auto text-center px-4 py-4  mx-3 my-3 rounded-lg`}
                  >
                    <div className="w-11">
                      <Image src={keysIcon}></Image>

                    </div>
                    <button className="align-middle text-start text-xl w-10/12 h-full">{t.editKeysPermission}</button>
                  </div>
                </Link>
              )}
              {(keyData[0].addAndUpdateProducts ||
                keyData[0].deleteProducts) && (
                <Link href={`/admin/${Akey}/${locale}/products/`}>
                  <div
                    className={`${adminMenu.adminButtons} flex h-20  self-center text-gray-700 relative justify-self-auto text-center px-4 py-4 mx-3 my-3 rounded-lg`}
                  >
                    <div className="w-11">
                      <Image src={productsIcon}></Image>

                    </div>
                    <button className="align-middle text-start text-xl w-10/12 h-full">{t.editProductsPermission}</button>
                  </div>
                </Link>
              )}

              {keyData[0].takingReq && (
                <Link href={`/admin/${Akey}/${locale}/taking/`}>
                  <div
                    className={`${adminMenu.adminButtons} flex h-20  self-center text-gray-700 relative justify-self-auto text-center px-4 py-4  mx-3 my-3 rounded-lg`}
                  >
                    <div className="w-11">
                      <Image src={takingIcon}></Image>

                    </div>
                    <button className="align-middle text-start text-xl w-10/12 h-full">{t.TakingRequestPermission}</button>
                  </div>
                </Link>
              )}
              {keyData[0].acceptedTakingReq && (
                <Link href={`/admin/${Akey}/${locale}/acceptedTaking/`}>
                  <div
                    className={`${adminMenu.adminButtons} flex h-20  self-center text-gray-700 relative justify-self-auto text-center px-4 py-4  mx-3 my-3 rounded-lg`}
                  >
                    <div className="w-11">
                      <Image src={accTakingIcon}></Image>

                    </div>
                    <button className="align-middle text-start text-xl w-10/12 h-full">
                      {t.AcceptedTakingRequestPermission}
                    </button>
                  </div>
                </Link>
              )}
              {keyData[0].givingReq && (
                <Link href={`/admin/${Akey}/${locale}/giving/`}>
                  <div
                    className={`${adminMenu.adminButtons} flex h-20  self-center text-gray-700 relative justify-self-auto text-center px-4 py-4  mx-3 my-3 rounded-lg`}
                  >
                    <div className="w-11">
                      <Image src={givingIcon}></Image>

                    </div>
                    <button className="align-middle text-start text-xl w-10/12 h-full">{t.GivingRequestPermission}</button>
                  </div>
                </Link>
              )}
              {keyData[0].acceptedGivingReq && (
                <Link href={`/admin/${Akey}/${locale}/acceptedGiving/`}>
                  <div
                    className={`${adminMenu.adminButtons} flex h-20  self-center text-gray-700 relative justify-self-auto text-center px-4 py-4  mx-3 my-3 rounded-lg`}
                  >
                    <div className="w-11">
                      <Image src={accGivingIcon}></Image>

                    </div>
                    <button className="align-middle text-start text-xl w-10/12 h-full">{t.AcceptedGivingPermission}</button>
                  </div>
                </Link>
              )}

              {keyData[0].healingReq && (
                <Link href={`/admin/${Akey}/${locale}/healing/`}>
                  <div
                    className={`${adminMenu.adminButtons} flex h-20  self-center text-gray-700 relative justify-self-auto text-center px-4 py-4  mx-3 my-3 rounded-lg`}
                  >
                    <div className="w-11">
                      <Image src={healingIcon}></Image>

                    </div>
                    <button className="align-middle text-start text-xl w-10/12 h-full">{t.HealingRequestPermission}</button>
                  </div>
                </Link>
              )}
              {keyData[0].acceptedHealingReq && (
                <Link href={`/admin/${Akey}/${locale}/acceptedHealing/`}>
                  <div
                    className={`${adminMenu.adminButtons} flex h-20  self-center text-gray-700 relative justify-self-auto text-center px-4 py-4  mx-3 my-3 rounded-lg`}
                  >
                    <div className="w-11">
                      <Image src={accHealingIcon}></Image>

                    </div>
                    <button className="align-middle text-start text-xl w-10/12 h-full">{t.AcceptedHealingPermission}</button>
                  </div>
                </Link>
              )}

              {(keyData[0].categories || keyData[0].addCategories) && (
                <Link href={`/admin/${Akey}/${locale}/categories/`}>
                  <div
                    className={`${adminMenu.adminButtons} flex h-20  self-center text-gray-700 relative justify-self-auto text-center px-4 py-4  mx-3 my-3 rounded-lg`}
                  >
                    <div className="w-11">
                      <Image src={categoryIcon}></Image>

                    </div>
                    <button className="align-middle text-start text-xl w-10/12 h-full">{t.editCategoriesPermission}</button>
                  </div>
                </Link>
              )}

              {keyData[0].orders && (
                <Link href={`/admin/${Akey}/${locale}/orders/`}>
                  <div
                    className={`${adminMenu.adminButtons} flex h-20  self-center text-gray-700 relative justify-self-auto text-center px-4 py-4  mx-3 my-3 rounded-lg`}
                  >
                    <div className="w-11">
                      <Image src={orderIcon}></Image>

                    </div>
                    <button className="align-middle text-start text-xl w-10/12 h-full">{t.OrdersPermission}</button>
                  </div>
                </Link>
              )}
              {keyData[0].acceptedOrders && (
                <Link href={`/admin/${Akey}/${locale}/acceptedOrders/`}>
                  <div
                    className={`${adminMenu.adminButtons} flex h-20  self-center text-gray-700 relative justify-self-auto text-center px-4 py-4  mx-3 my-3 rounded-lg`}
                  >
                    <div className="w-11">
                      <Image src={accOrderIcon}></Image>

                    </div>
                    <button className="align-middle text-start text-xl w-10/12 h-full">{t.AcceptedOrdersPermission}</button>
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center">
          <div className="mt-48 text-4xl">{t.keyIsIncorrect}</div>
        </div>
      )}
    </div>
  );
};

AdminList.getInitialProps = async ({ query: { key, locale } }) => {
  const keyRes = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/keys/findKey/${key}`);
  const { success, keyData } = await keyRes.json();
  return { Akey: key, isKeyValid: success, keyData: keyData, locale: locale };
};

export default AdminList;
