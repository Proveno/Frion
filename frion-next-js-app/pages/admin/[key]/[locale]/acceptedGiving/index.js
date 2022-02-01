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
import manIcon from "../../../../../assets/Icons/Tilda_Icons_3st_man.svg";
import requestStyle from "../../../../../styles/requests.module.css";

const AdminGivingList = ({ Akey, isKeyValid, keyData, requests, locale }) => {
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
  const [archivingGivingId, setArchivingGivingId] = useState();
  useEffect(async () => {
    if (archivingGivingId) {
      const archived = await fetch(
        `${process.env.API_HOST}/giving/request/${archivingGivingId}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({archivedAt: new Date()}),
        }
      );
      router.push(`/admin/${Akey}/${locale}/acceptedGiving/`);
    }
  }, [archivingGivingId]);
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
                className={`${requestStyle.searchInput} w-full rounded px-2 mr-2 placeholder-gray-400`}
                placeholder={t.searchPlaceholder}
              ></input>
              <Link
                href={`/admin/${Akey}/${locale}/acceptedGiving/${search.searchRequest}`}
              >
                <button
                  className={`${requestStyle.searchButton} font-medium px-8 ml-2 py-1 rounded-lg`}
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
                    }/acceptedGiving/`
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
      {isKeyValid &&
      (keyData[0].acceptedGivingReq) ? (
        <div>
          <div
            className={`container mx-auto flex py-12 justify-center`}
          >
            <div className={`grid auto-rows-max grid-cols-4`}>
              {requests ? (
                <>
                  {requests.map((request) => {
                      if(request.accepted && request.archivedAt == undefined){
                        return (
                            <div
                            key={request.key}
                              className={`${requestStyle.requestItems} w-full text-gray-700 relative justify-self-auto text-start px-4 pt-3 pb-16 rounded-lg`}
                              // onClick={()=>{
                              //     router.push(`/admin/${Akey}/${
                              //       document.getElementById("LanguageSelect").value
                              //     }/acceptedGiving/request/${request._id}`)
                              // }}
                            > 
                              <Image
                            width={500}
                            height={500}
                            className={`border-none rounded-3xl`}
                            src={manIcon}
                            alt="Product picture"
                          ></Image>
                          <div className="flex mt-3">
                            <div className="w-1/2 px-3">
                              <span className="block text-sm font-medium text-gray-700">
                                {t.NameReq}
                              </span>
                              <span className="break-words block text-base text-gray-700 px-2">
                                {request.name}
                              </span>
                            </div>

                            <div className="w-1/2 px-3">
                              <span className="block text-sm font-medium text-gray-700">
                                {t.SnameReq}
                              </span>
                              <span className="break-words block text-base text-gray-700 px-2">
                                {request.surname}
                              </span>
                            </div>
                          </div>

                          <span className="block text-sm font-medium text-gray-700 mx-3">
                            {t.PhoneReq}
                          </span>
                          <span className="break-words block text-base text-gray-700 mx-5">
                            {request.phone}
                          </span>

                          <span className="block text-sm font-medium text-gray-700 mx-3">
                            {t.EmailReq}
                          </span>
                          <span className="break-words block text-base text-gray-700 mx-5">
                            {request.email}
                          </span>
                          <span className="block text-sm font-medium text-gray-700 mx-3">
                            {t.PetReq}
                          </span>
                          <span className="break-words block text-base text-gray-700 mx-5 mb-3">
                            {request.category}
                          </span>
                              <div className="absolute bottom-0 right-0 w-full px-4 pb-4">
                                <div className="w-full py-1 flex">
                                  <button
                                      className={`${requestStyle.deleteButton} ${`w-full rounded-lg`}`}
                                      onClick={() => {
                                        setArchivingGivingId(request._id);
                                      }}
                                    >
                                      {t.archiveBtn}
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

AdminGivingList.getInitialProps = async ({ query: { key, locale } }) => {
  const keyRes = await fetch(`${process.env.API_HOST}/keys/findKey/${key}`);
  const res = await fetch(`${process.env.API_HOST}/giving/${locale}`);
  const { givingRequestData } = await res.json();
  const { success, keyData } = await keyRes.json();
  return {
    Akey: key,
    isKeyValid: success,
    keyData: keyData,
    requests: givingRequestData,
    locale: locale,
  };
};

export default AdminGivingList;
