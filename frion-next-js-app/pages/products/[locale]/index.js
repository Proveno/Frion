import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { en } from "../../../locales/en";
import { ru } from "../../../locales/ru";
import { ua } from "../../../locales/ua";
import { de } from "../../../locales/de";

import fetch from "isomorphic-unfetch";
import Link from "next/link";
import Image from "next/image";

import navBar from "../../../styles/navBar.module.css";
import MenuIcon from "../../../assets/logo.png";
import cartBlock from "../../../styles/cartState.module.css";
import crossIcon from "../../../assets/Icons/Tilda_Icons_27bu_8.svg";
import shopBlock from "../../../styles/products.module.css";
import cartIcon from "../../../assets/Icons/Tilda_Icons_3st_cart.png";

const UserProductList = ({ allProducts, locale }) => {
  const router = useRouter();
  const [products, setProducts] = useState(allProducts);
  const [search, setSearch] = useState({ searchRequest: "" });

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
  const handleChange = (e) => {
    setSearch({
      ...search,
      [e.target.name]: e.target.value,
    });
  };
  const [ShouldNavButtons, setShouldNavButtons] = useState(true);
  const [isCartOpened, setIsCartOpened] = useState(false);
  const [cart, setCart] = useState([]);

  const [cartForm, setCartForm] = useState({
    name: "",
    surname: "",
    phone: "",
    email: "",
    products: [],
    productsQuant: [],
    sum: 0.0,
    orderLocale: "en",
    accepted: false,
    createdAt: new Date(),
  });
  const [isConfirming, setIsConfirming] = useState(false);
  const [cartErrors, setCartErrors] = useState({});
  useEffect(() => {
    if (isConfirming) {
      if (Object.keys(cartErrors).length === 0) {
        console.log(cartForm);
        createOrder();
      } else {
        setIsConfirming(false);
      }
    }
  }, [cartErrors]);
  const createOrder = async () => {
    try {
      const res = await fetch(`${process.env.API_HOST}/cart/`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cartForm),
      });
      router.reload(`/products/${locale}/`);
    } catch (error) {
      console.log(console.error());
    }
  };
  const handleCartChange = (e) => {
    setCartForm({
      ...cartForm,
      [e.target.name]: e.target.value,
    });
  };
  const cartValidate = () => {
    let err = {};
    if (!cartForm.name) {
      err.name = "Name is required";
    }
    if (!cartForm.surname) {
      err.surname = "Surname is required";
    }
    if (!cartForm.phone) {
      err.phone = "Phone is required";
    } else {
      let regex =
        /^(\+1|\+7|\+44|\+38|\+49|1|7|44|38|49)?[\s\-]?\(?[0-9]{3}[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
      setPhoneError(!regex.test(cartForm.phone));
      if (!regex.test(cartForm.phone)) {
        err.phone = "Incorrect phone";
      }
    }
    if (!cartForm.email) {
      err.email = "Email is required";
    }
    return err;
  };
  const [phoneError, setPhoneError] = useState();
  const handleCartSubmit = (e) => {
    let sum = 0;
    cart.map((order) => {
      sum += order.price["$numberDecimal"] * order.number;
    });

    setCartForm({
      ...cartForm,
      products: cart.map((order) => {
        return order._id;
      }),
      productsQuant: cart.map((order) => {
        return order.number;
      }),
      sum: sum,
      orderLocale: locale,
    });

    e.preventDefault();
    let errs = cartValidate();
    console.log(errs);
    setCartErrors(errs);
    setIsConfirming(true);
  };
  const [isBuy, setIsBuy] = useState(false);

  return (
    <div>
      {isCartOpened && (
        <div
          className={`${cartBlock.blurBack} flex justify-center fixed w-screen h-screen`}
        >
          <div className={`${cartBlock.cart} self-center w-2/5 rounded-3xl`}>
            {!isBuy ? (
              <>
                <div className={`${cartBlock.products} px-4 pt-2`}>
                  <div className="flex justify-between">
                    <div className="text-start text-2xl font-bold text-gray-700">
                      {t.myOrder}
                    </div>
                    <div
                      className={`${cartBlock.close} mt-1`}
                      onClick={() => {
                        setShouldNavButtons(true);
                        setIsCartOpened(false);
                      }}
                    >
                      <Image src={crossIcon} alt="Close"></Image>
                    </div>
                  </div>

                  <div
                    className={`${cartBlock.product} mt-4 w-full rounded-lg`}
                  >
                    {/* One product order */}
                    {cart.map((product) => {
                      return (
                        <div key={product.key}>
                          <div className="flex bg-white  justify-between">
                            <div className={`${cartBlock.images}  mt-2`}>
                              <Image
                                className="rounded-lg"
                                src={product.photo}
                                width={130}
                                height={130}
                              ></Image>
                            </div>
                            <div className="w-4/5">
                              <span className="block text-sm text-lg text-gray-700 my-2">
                                {product.title}
                              </span>
                              <div className="w-full pr-5">
                                <div className="block text-sm text-sm text-gray-700 my-3 flex justify-between">
                                  <div>{t.priceCart}</div>
                                  <div>
                                    <span>
                                      {product.price["$numberDecimal"]}
                                    </span>
                                    {t.currency}
                                  </div>
                                </div>
                                <div className="block text-sm text-sm text-gray-700 my-3 flex justify-between">
                                  <div>{t.quantityCart}</div>
                                  <input
                                    className="w-14 border rounded-xl pl-3"
                                    type={"number"}
                                    defaultValue={product.number}
                                    min={1}
                                    onChange={(e) => {
                                      product.number = e.target.value;
                                      console.log(product.number);
                                    }}
                                  ></input>
                                </div>
                              </div>
                            </div>
                            <div className={`w-4 mt-2 mr-2`}>
                              <Image
                                src={crossIcon}
                                alt="Close"
                                onClick={() => {
                                  setCart([
                                    ...cart.slice(0, cart.indexOf(product)),
                                    ...cart.slice(cart.indexOf(product) + 1),
                                  ]);
                                }}
                              ></Image>
                            </div>
                          </div>
                          {cart[cart.length - 1] != product && (
                            <div
                              className={`${cartBlock.line} w-full h-0.5`}
                            ></div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="flex">
                  <div
                    className={`${cartBlock.submit} self-end w-full rounded-b-xl text-center py-4 text-xl`}
                    onClick={() => {
                      setIsBuy(true);
                      cart.map((order) => {
                        if (order.number <= 0) {
                          setIsBuy(false);
                        }
                      });
                    }}
                  >
                    {t.buyButtonCart}
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className={`${cartBlock.products} px-4 pt-2`}>
                  <div className="flex justify-between">
                    <div className="text-start text-2xl font-bold text-gray-700">
                      {t.myOrder}
                    </div>
                    <div
                      className={`${cartBlock.close} mt-1`}
                      onClick={() => {
                        setShouldNavButtons(true);
                        setIsCartOpened(false);
                      }}
                    >
                      <Image src={crossIcon} alt="Close"></Image>
                    </div>
                  </div>
                  <div
                    className={`${cartBlock.product} mt-4 w-full rounded-lg`}
                  >
                    <form className="my-7">
                      <label className="block my-3">
                        <span className="block text-sm font-medium text-gray-700">
                          {t.firstNameLabel}
                        </span>
                        <input
                          name="name"
                          onChange={handleCartChange}
                          type="text"
                          required
                          className="mt-1 block w-full px-3 py-2 bg-white rounded-lg text-sm placeholder-gray-400 invalid:border-pink-500 invalid:text-pink-600"
                          placeholder={`${t.firstNameLabelPlaceholder}`}
                        />
                      </label>
                      <label className="block my-3">
                        <span className="block text-sm font-medium text-gray-700">
                          {t.secondNameLabel}
                        </span>
                        <input
                          name="surname"
                          onChange={handleCartChange}
                          type="text"
                          required
                          className="mt-1 block w-full px-3 py-2 bg-white rounded-lg text-sm placeholder-gray-400 invalid:border-pink-500 invalid:text-pink-600"
                          placeholder={`${t.secondNameLabelPlaceholder}`}
                        />
                      </label>
                      <label className="block my-3">
                        <span className="block text-sm font-medium text-gray-700">
                          {t.phoneNumberLabel}
                        </span>
                        <input
                          name="phone"
                          onChange={handleCartChange}
                          type="text"
                          className="mt-1 block w-full px-3 py-2 bg-white rounded-lg text-sm placeholder-gray-400 invalid:border-pink-500 invalid:text-pink-600"
                          placeholder={`${t.phoneNumberLabelPlaceholder}`}
                          required
                        />
                        {phoneError && (
                          <p className="mt-2 text-pink-600 text-sm">
                            Incorrect phone
                          </p>
                        )}
                      </label>
                      <label className="block my-3">
                        <span className="block text-sm font-medium text-gray-700">
                          {t.emailLabel}
                        </span>
                        <input
                          onChange={handleCartChange}
                          type="email"
                          name="email"
                          id="email"
                          className="peer px-3 py-2 bg-white placeholder-gray-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-lg invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                          required
                          placeholder={`${t.emailLabelPlaceholder}`}
                        />
                      </label>
                      {/* TODO: country, city, place */}
                    </form>
                  </div>
                </div>
                <div className="flex">
                  <div
                    className={`${cartBlock.back} self-end w-1/2 rounded-bl-xl text-center py-4 text-xl`}
                    onClick={() => {
                      setIsBuy(false);
                    }}
                  >
                    {t.cartBackBtn}
                  </div>
                  <div
                    className={`${cartBlock.submit} self-end w-1/2 rounded-br-xl text-center py-4 text-xl`}
                    onClick={handleCartSubmit}
                  >
                    {t.cartConfirmBtn}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
      {ShouldNavButtons && (
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
                  placeholder={t.searchPlaceholder}
                ></input>
                <button
                  className={`${shopBlock.searchButton} font-medium px-8 ml-2 py-1 rounded-lg`}
                  onClick={async () => {
                    if (search.searchRequest) {
                      const newProducts = await fetch(
                        `${process.env.API_HOST}/products/${locale}/${search.searchRequest}`
                      );
                      const { data } = await newProducts.json();
                      setProducts(data);
                    } else {
                      const newProducts = await fetch(
                        `${process.env.API_HOST}/products/${locale}`
                      );
                      const { data } = await newProducts.json();
                      setProducts(data);
                    }
                  }}
                >
                  {t.searchBtn}
                </button>
              </div>
            </div>
            <div className="flex justify-center w-1/6">
              <div className="self-center mx-4">
                <select
                  className={`${navBar.langButton} px-4 text`}
                  id="LanguageSelect"
                  onChange={async () => {
                    setT(
                      getLang(document.getElementById("LanguageSelect").value)
                    );
                    router.push(
                      `/products/${
                        document.getElementById("LanguageSelect").value
                      }/`
                    );
                    setCart([]);
                    if (search.searchRequest) {
                      const newProducts = await fetch(
                        `${process.env.API_HOST}/products/${
                          document.getElementById("LanguageSelect").value
                        }/${search.searchRequest}`
                      );
                      const { data } = await newProducts.json();
                      setProducts(data);
                    } else {
                      const newProducts = await fetch(
                        `${process.env.API_HOST}/products/${
                          document.getElementById("LanguageSelect").value
                        }`
                      );
                      const { data } = await newProducts.json();
                      setProducts(data);
                    }
                  }}
                  defaultValue={locale}
                >
                  <option value="en">{t.english}</option>
                  <option value="ru">{t.russian}</option>
                  <option value="de">{t.deutsch}</option>
                  <option value="ua">{t.ukrainian}</option>
                </select>
              </div>
              <div className={`self-center mx-4`}>
                <Image
                  width={35}
                  height={35}
                  src={cartIcon}
                  layout="fixed"
                  onClick={() => {
                    if (cart.length > 0) {
                      setShouldNavButtons(false);
                      setIsCartOpened(true);
                    }
                  }}
                ></Image>
              </div>
            </div>
          </div>
        </div>
      )}
      <div
        className={`${shopBlock.shopContainer} container mx-auto flex py-12 justify-center`}
      >
        <div className={`grid auto-rows-max grid-cols-4`}>
          {products ? (
            <>
              {products.map((product) => {
                return (
                  <div
                  key={product.key}
                    className={`${shopBlock.shopItems} text-gray-700 relative justify-self-auto text-center px-4 pt-3 pb-16 rounded-lg`}
                  >
                    <Link href={`/products/${locale}/product/${product._id}`}>
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
                        onClick={() => {
                          if (!cart.map((e) => e._id).includes(product._id)) {
                            // console.log(cart.map(e => e._id).includes(product._id));
                            setCart([...cart, { ...product, number: 1 }]);
                          }
                        }}
                      >
                        {t.buyFor}
                        <span>{product.price["$numberDecimal"]}</span>
                        {t.currency}
                      </button>
                    </div>
                  </div>
                );
              })}
            </>
          ) : (
            // TODO: make beautifyll exeption
            <div className="mt-48 text-4xl">{t.nothingFound}</div>
          )}
        </div>
      </div>
    </div>
  );
};

UserProductList.getInitialProps = async ({ query: { locale } }) => {
  const res = await fetch(`${process.env.API_HOST}/products/${locale}`);
  const { data } = await res.json();

  return { allProducts: data, locale: locale };
};

export default UserProductList;
