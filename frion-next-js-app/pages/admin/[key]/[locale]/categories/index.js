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
import requestStyle from "../../../../../styles/requests.module.css";

const AdminTakingList = ({ Akey, isKeyValid, keyData, categories, locale }) => {
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
  const [t, setT] = useState(getLang(locale));

  const [deletingCategory, setDeletingCategory] = useState();
  useEffect(async () => {
    if (deletingCategory) {
      const deleted = await fetch(
        `http://localhost:3000/api/categories/${locale}/${deletingCategory}`,
        {
          method: "Delete",
        }
      );
      router.push(`/admin/${Akey}/${locale}/categories/`);
    }
  }, [deletingCategory]);


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
                    }/categories/`
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
      {isKeyValid && (keyData[0].categories || keyData[0].addCategories) ? (
        <div>
          <div className={`container mx-auto flex py-12 justify-center`}>
            <div className={`grid auto-rows-max grid-cols-4`}>
              {keyData[0].addCategories && (
                <div
                  className={`${shopBlock.shopItems} w-full text-gray-700 relative justify-self-auto text-center px-4 pt-3 pb-16 rounded-lg`}
                >
                  <span className="block text-sm text-lg text-gray-700 my-2">
                    Add new category
                  </span>
                  <div className="absolute bottom-0 right-0 w-full px-4 pb-4">
                    <Link
                      href={`/admin/${Akey}/${locale}/categories/newCategory`}
                    >
                      <button
                        className={`${shopBlock.shopBuyButton} w-full rounded-lg py-1`}
                      >
                        ADD
                      </button>
                    </Link>
                  </div>
                </div>
              )}

              {categories ? (
                <>
                  {categories.map((category) => {
                    return (
                      <div
                        className={`${requestStyle.requestItems} w-full text-gray-700 relative justify-self-auto text-center px-4 pt-3 pb-16 rounded-lg`}
                      >
                        <span className="break-words block text-sm text-lg text-gray-700 my-2">
                          {category.category}
                        </span>

                        <div className="absolute bottom-0 right-0 w-full px-4 pb-4">
                          <div className="w-full py-1 flex">
                            {keyData[0].addCategories && (
                              <Link
                                href={`/admin/${Akey}/${locale}/categories/${category._id}`}
                              >
                                <button
                                  className={`${shopBlock.shopBuyButton} ${
                                    keyData[0].categories
                                      ? `w-1/2 rounded-l-lg`
                                      : `w-full rounded-lg`
                                  }`}
                                >
                                  EDIT
                                </button>
                              </Link>
                            )}
                            {keyData[0].categories && (
                              <button
                                className={`${shopBlock.deleteButton} ${
                                  keyData[0].addCategories
                                    ? `w-1/2 rounded-r-lg`
                                    : `w-full rounded-lg`
                                }`}
                                onClick={() => {
                                  setDeletingCategory(category.category);
                                }}
                              >
                                DELETE
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </>
              ) : (
                // TODO: make beautifyll exeption
                <div>Nothing here</div>
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

AdminTakingList.getInitialProps = async ({ query: { key, locale } }) => {
  const keyRes = await fetch(`http://localhost:3000/api/keys/findKey/${key}`);
  const res = await fetch(`http://localhost:3000/api/categories/${locale}`);
  const { dataCategories } = await res.json();
  const { success, keyData } = await keyRes.json();
  return {
    Akey: key,
    isKeyValid: success,
    keyData: keyData,
    categories: dataCategories,
    locale: locale,
  };
};

export default AdminTakingList;
