import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { en } from "../../locales/en";
import { ru } from "../../locales/ru";
import { uk } from "../../locales/uk";
import { de } from "../../locales/de";

import fetch from "isomorphic-unfetch";
import Link from "next/link";
import Image from "next/image";

import navBar from "../../styles/navBar.module.css";
import MenuIcon from "../../assets/logo.png";

import shopBlock from "../../styles/products.module.css";
import cartIcon from "../../assets/Icons/Tilda_Icons_3st_cart.png";

const UserProductList = ({ products }) => {
  function getLang() {
    switch (router.locale) {
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
  const router = useRouter();
  const t = getLang();

  const [search, setSearch] = useState({ searchRequest: "" });
  const handleChange = (e) => {
    setSearch({
      ...search,
      [e.target.name]: e.target.value,
    });
  };
  const [deletingProductId, setDeletingProductId] = useState();
  useEffect(async () => {
    if (deletingProductId) {
      const deleted = await fetch(
        `http://localhost:3000/api/products/${deletingProductId}`,
        {
          method: "Delete",
        }
      );
      router.push("/products");
    }
  }, [deletingProductId]);

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
          <div className={`w-full self-center flex justify-end`}>
            <div className="flex w-1/2 mx-4">
              <input
                onChange={handleChange}
                name="searchRequest"
                className={`${shopBlock.searchInput} w-full rounded px-2 mr-2 placeholder-gray-400`}
                placeholder="Enter title..."
              ></input>
              <Link href={`/products/${search.searchRequest}`}>
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
                  router.push(
                    `/${
                      document.getElementById("LanguageSelect").value
                    }/products`
                  );
                }}
                defaultValue={router.locale}
              >
                <option value="en">{t.english}</option>
                <option value="ru">{t.russian}</option>
                <option value="de">{t.deutsch}</option>
                <option value="uk">{t.ukrainian}</option>
              </select>
            </div>
            <div className={`self-center mx-4`}>
              <Image
                width={35}
                height={35}
                src={cartIcon}
                layout="fixed"
              ></Image>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`${shopBlock.shopContainer} container mx-auto flex py-12 justify-center`}
      >
        <div className={`grid auto-rows-max grid-cols-4`}>
          {products.map((product) => {
            return (
              <div
                className={`${shopBlock.shopItems} text-gray-700 relative justify-self-auto text-center px-4 pt-3 pb-16 rounded-lg`}
              >
                <Link href={`/products/product/${product._id}`}>
                  <Image
                    width={500}
                    height={500}
                    className={`${shopBlock.shopImages} border-none rounded-3xl`}
                    src={product.photo}
                    alt="Product picture"
                  ></Image>
                </Link>
                <span className="block text-sm text-lg text-gray-700 my-2">
                  {product.title}
                </span>
                <div className="absolute bottom-0 right-0 w-full px-4 pb-4">
                  <button
                    className={`${shopBlock.shopBuyButton} w-full rounded-lg py-1`}
                  >
                    {t.buyFor}
                    <span>{product.price["$numberDecimal"]}</span>$
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

UserProductList.getInitialProps = async () => {
  const res = await fetch(`http://localhost:3000/api/products`);
  const { data } = await res.json();

  return { products: data };
};

export default UserProductList;
