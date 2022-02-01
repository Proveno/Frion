import React, { useState, useEffect } from "react";

import { useRouter } from "next/router";
import { en } from "../locales/en";
import { ru } from "../locales/ru";
import { ua } from "../locales/ua";
import { de } from "../locales/de";

import Link from "next/link";
import Image from "next/image";
import navBar from "../styles/navBar.module.css";
import feedBack from "../styles/feedButton.module.css";
import cartBlock from "../styles/cartState.module.css";
import infBlock from "../styles/infoBlock.module.css";
import instructBlock from "../styles/instructBlock.module.css";
import formBlock from "../styles/requestForm.module.css";
import shopBlock from "../styles/shopBlock.module.css";
import footer from "../styles/footer.module.css";

import MenuIcon from "../assets/logo.png";
import CatImage from "../assets/InformationCat.jpeg";
import requestImageInfo from "../assets/requestInfo.png";
import shopImage from "../assets/shopImageEx.PNG";
import shopImage2 from "../assets/shopImageEx2.png";
import langSelectIcon from "../assets/Icons/Tilda_Icons_9ta_globe.svg";

import productImage1 from "../assets/Product/1.png";
import productImage2 from "../assets/Product/2.png";
import productImage3 from "../assets/Product/3.png";
import productImage4 from "../assets/Product/4.png";
import productImage5 from "../assets/Product/5.png";
import productImage6 from "../assets/Product/6.png";

import cartIcon from "../assets/Icons/Tilda_Icons_3st_cart.svg";
import mapIcon from "../assets/Icons/Tilda_Icons_3st_map.svg";
import feedbackIcon from "../assets/Icons/Tilda_Icons_3st_woman.svg";
import feedbackClientIcon from "../assets/Icons/Tilda_Icons_3st_man.svg";
import tickIcon from "../assets/Icons/Tilda_Icons_27bu_3.svg";
import crossIcon from "../assets/Icons/Tilda_Icons_27bu_8.svg";

import twitterIcon from "../assets/Icons/Twit.png";
import facebookIcon from "../assets/Icons/face.png";
import instaIcon from "../assets/Icons/inst.png";
import telegramIcon from "../assets/Icons/tel.png";
import watsUpIcon from "../assets/Icons/wats.png";
import youtubeIcon from "../assets/Icons/yout.png";

import CloseIcon from "../assets/window-close-regular.svg";
import { route } from "next/dist/server/router";

export default function Home() {
  function getLang() {
    switch (router.locale) {
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

  const router = useRouter();
  const t = getLang();

  const [ShouldShowChat, setShouldShowChat] = useState(false);
  const [ShouldNavButtons, setShouldNavButtons] = useState(true);
  const [isCartOpened, setIsCartOpened] = useState(false);

  const [form, setForm] = useState({
    name: "",
    surname: "",
    phone: "",
    email: "",
    category: "",
    accepted: false,
    createdAt: new Date(),
    requestLocale: router.locale,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  useEffect(() => {
    if (isSubmitting) {
      if (Object.keys(errors).length === 0) {
        console.log(form);
        createRequest();
      } else {
        setIsSubmitting(false);
      }
    }
  }, [errors]);
  const createRequest = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/${type}/`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      router.reload(`/${router.locale}/`);
    } catch (error) {
      console.log(console.error());
    }
  };
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const validate = () => {
    let err = {};
    if (!form.name) {
      err.name = "Name is required";
    }
    if (!form.surname) {
      err.surname = "Surname is required";
    }
    if (!form.phone) {
      err.phone = "Phone is required";
    } else {
      let regex =
        /^(\+1|\+7|\+44|\+38|\+49|1|7|44|38|49)?[\s\-]?\(?[0-9]{3}[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
      setPhoneError(!regex.test(form.phone));
      if (!regex.test(form.phone)) {
        err.phone = "Incorrect phone";
      }
    }
    if (!form.email) {
      err.email = "Email is required";
    }

    // TODO: length
    return err;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let errs = validate();
    console.log(errs);
    setErrors(errs);
    setIsSubmitting(true);
  };

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
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/cart/`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cartForm),
      });
      router.reload(`/${router.locale}/`);
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
  const handleCartSubmit = (e) => {
    if (order.number > 0) {
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
        orderLocale: router.locale,
      });

      e.preventDefault();
      let errs = cartValidate();
      console.log(errs);
      setCartErrors(errs);
      setIsConfirming(true);
    }
  };

  const [type, setType] = useState();

  const [categories, setCategories] = useState();
  const getCategories = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_HOST}/categories/${router.locale}`,
        {
          method: "GET",
        }
      );
      const { dataCategories } = await res.json();
      form.category = dataCategories[0].category;
      setCategories(dataCategories);
    } catch (error) {
      console.log(console.error());
    }
  };
  if (!categories) {
    getCategories();
  }

  const [products, setProducts] = useState();
  const getProducts = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_HOST}/products/${router.locale}/mainPage`,
        {
          method: "GET",
        }
      );
      const { data } = await res.json();
      setProducts(data);
    } catch (error) {
      console.log(console.error());
    }
  };
  if (!products) {
    getProducts();
  }
  const [phoneError, setPhoneError] = useState();
  const [cart, setCart] = useState([]);
  const [isBuy, setIsBuy] = useState(false);
  return (
    <div>
      {/* NavBar */}
      {ShouldNavButtons && (
        <div
          className={`sticky flex justify-between top-0 py-3 px-10 ${navBar.navBar}`}
        >
          {/* Logo/Home */}
          <Link href={"/"}>
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
          <div className={`flex justify-between w-9/12`}>
            <div className={`self-center`}>{/* Indent from logo */}</div>
            <Link href={"/#About"}>
              <div
                className={`${navBar.navButton} rounded-3xl px-4 py-1 self-center`}
              >
                <button>{t.aboutUs}</button>
              </div>
            </Link>
            <Link href={"/#Registration"}>
              <div
                className={`${navBar.navButton} rounded-3xl px-4 py-1 self-center`}
              >
                <button>{t.registrarion}</button>
              </div>
            </Link>
            <Link href={"/#Shop"}>
              <div
                className={`${navBar.navButton} rounded-3xl px-4 py-1 self-center`}
              >
                <button>{t.shop}</button>
              </div>
            </Link>
            <Link href={"/#Contacts"}>
              <div
                className={`${navBar.navButton} rounded-3xl px-4 py-1 self-center`}
              >
                <button>{t.contacts}</button>
              </div>
            </Link>
            <div className={`flex`}>
              <select
                className={`${navBar.langButton} px-4 text`}
                id="LanguageSelect"
                onChange={() => {
                  setProducts();
                  setCategories();
                  setCart([]);
                  router.push(
                    `/${document.getElementById("LanguageSelect").value}/`
                  );
                }}
                defaultValue={router.locale}
              >
                <option value="en">{t.english}</option>
                <option value="ru">{t.russian}</option>
                <option value="de">{t.deutsch}</option>
                <option value="ua">{t.ukrainian}</option>
              </select>
            </div>
            <div className={`self-center`}>
              {/* Indent from right border */}
            </div>
          </div>
        </div>
      )}

      {isCartOpened && cart.length > 0 && (
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
                          <p className="mt-2 invisible peer-invalid:visible text-pink-600 text-sm">
                            {t.pleaseEnterRightEmail}
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
                        <p className="mt-2 invisible peer-invalid:visible text-pink-600 text-sm">
                          {t.pleaseEnterRightEmail}
                        </p>
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

      {cart.length > 0 && (
        <div
          className={`${feedBack.feedButton} fixed bottom-11 right-12 p-2 rounded-full`}
          onClick={() => {
            setShouldNavButtons(false);
            setIsCartOpened(true);
          }}
        >
          <Image src={cartIcon} alt="FeedBackIcon"></Image>
        </div>
      )}

      {/* About Us */}
      <div className="container mx-auto" id="About">
        <div className="px-7 py-28">
          <p className="text-3xl ml-4">{t.aboutQuestion}</p>
          <div className="flex mt-10">
            <div className="self-center justify-center w-3/4">
              <p
                className={`whitespace-normal break-word indent-8 text-justify font-serif text-lg pr-14`}
              >
                {t.aboutText}
              </p>
            </div>
            <div className="self-center text-right ml-5">
              <div className={`${infBlock.Image}`}>
                <Image
                  className="border-none rounded-3xl"
                  src={CatImage}
                  alt="Picture with cat :>"
                  placeholder="blur"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Reg instruction */}
      <div className={`${instructBlock.container}`} id="Registration">
        <div className="px-7 py-28 container mx-auto">
          <p className="text-3xl ml-4">{t.regInstructionQuestion}</p>
          <div className="flex mt-10">
            <div className="self-center text-right mr-5 static">
              <div className={`${infBlock.Image}`}>
                <Image
                  className={`${infBlock.catImage} border-none rounded-3xl`}
                  src={requestImageInfo}
                  alt="Picture with dog :>"
                  placeholder="blur"
                />
              </div>
            </div>

            <div className="self-center justify-center w-3/4">
              <p
                className={`whitespace-normal break-word indent-8 text-justify font-serif text-lg pl-14`}
              >
                {t.regInstructionText}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Request form */}
      <div className="container mx-auto" id="Form">
        <div className="px-7 py-28">
          <p className="text-3xl text-center">{t.createRequest}</p>
          <div className="flex mt-10 justify-center">
            <div
              className={`${formBlock.form} border-none rounded-3xl self-start w-3/5 px-14`}
            >
              <form className="my-7" onSubmit={handleSubmit}>
                <label className="block my-3">
                  <span className="block text-sm font-medium text-gray-700">
                    {t.firstNameLabel}
                  </span>
                  <input
                    name="name"
                    onChange={handleChange}
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
                    onChange={handleChange}
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
                    onChange={handleChange}
                    type="text"
                    className="mt-1 block w-full px-3 py-2 bg-white rounded-lg text-sm placeholder-gray-400 invalid:border-pink-500 invalid:text-pink-600"
                    placeholder={`${t.phoneNumberLabelPlaceholder}`}
                    required
                  />
                  {phoneError && (
                    <p className="mt-2 text-pink-600 text-sm">
                      {t.pleaseEnterRightPhone}
                    </p>
                  )}
                </label>
                <label className="block my-3">
                  <span className="block text-sm font-medium text-gray-700">
                    {t.emailLabel}
                  </span>
                  <input
                    onChange={handleChange}
                    type="email"
                    name="email"
                    id="email"
                    className="peer px-3 py-2 bg-white placeholder-gray-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-lg invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                    required
                    placeholder={`${t.emailLabelPlaceholder}`}
                  />
                </label>
                <label className="block my-3">
                  <span className="block text-sm font-medium text-gray-700">
                    {t.petType}
                  </span>
                  <select
                    name="category"
                    onChange={handleChange}
                    className="mt-1 block w-full h-9 px-3 py-2 bg-white rounded-lg text-sm placeholder-gray-400 invalid:border-pink-500 invalid:text-pink-600"
                    required
                  >
                    {categories &&
                      categories.map((category) => {
                        return <option key={category.key}>{category.category}</option>;
                      })}
                  </select>
                </label>

                <label className="block my-5 flex justify-center">
                  <div className="w-1/3 block text-sm text-center font-medium text-gray-700">
                    {t.takingPet}
                    <input
                      type="radio"
                      name="feedback"
                      className="default:ring-2 ml-2"
                      required
                      value="taking"
                      onClick={() => {
                        setType("taking");
                      }}
                    />
                  </div>

                  <div className="w-1/3 block text-sm text-center font-medium text-gray-700">
                    {t.givingPet}
                    <input
                      type="radio"
                      name="feedback"
                      className="default:ring-2 ml-2"
                      value="giving"
                      onClick={() => {
                        setType("giving");
                      }}
                    />
                  </div>
                  <div className="w-1/3 block text-sm text-center font-medium text-gray-700">
                    {t.healingPet}
                    <input
                      type="radio"
                      name="feedback"
                      className="default:ring-2 ml-2"
                      value="healing"
                      onClick={() => {
                        setType("healing");
                      }}
                    />
                  </div>
                </label>

                <div className="justify-center flex w-full">
                  <button
                    type="submit"
                    className={`${formBlock.SubmitButton} w-full py-2 rounded-lg`}
                  >
                    {t.submitForm}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/*Shop*/}
      <div className={`${shopBlock.shopContainer}`} id="Shop">
        <div className="px-7 py-28 container mx-auto ">
          <p className="text-3xl ml-4">{t.shopQuestion}</p>
          <div className="grid gap-4 grid-cols-3 justify-between py-12">
            {/* TODO: map first 10 products and shop them. If user wants to see more -> new page with full shop */}
            {/* Fix different height */}

            {products &&
              products.map((product) => {
                return (
                  <div
                  key={product.key}
                    className={`${shopBlock.shopItems} relative text-gray-700 justify-center text-center rounded-3xl my-5 mx-auto pt-3 pb-10`}
                  >
                    <Image
                      width={500}
                      height={500}
                      className={`${shopBlock.shopImages} border-none rounded-3xl`}
                      src={product.photo}
                      alt="Product picture"
                    ></Image>
                    <span className="block text-sm text-lg text-gray-700 my-2">
                      {product.title}
                    </span>
                    <button
                      className={`${shopBlock.shopBuyButton} absolute bottom-0 right-0  w-full rounded-b-xl py-1`}
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
                );
              })}
          </div>
          <div className="w-full flex justify-center">
            <Link href={`/products/${router.locale}`}>
              <button
                className={`${shopBlock.shopViewButton} w-2/5 rounded-3xl py-1 font-bold`}
              >
                {t.viewAllProducts}
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto" id="Contacts">
        <div className="px-7 py-28">
          <p className="text-3xl ml-4">{t.contactQuestion}</p>
          <div className="grid grid-cols-2 mt-10">
            <div className="self-start text-right mx-5">
              <div className="">
                <Image
                  className="border-none rounded-3xl"
                  src={shopImage2}
                  alt="Picture with cat :>"
                />
              </div>
            </div>
            <div className="self-center text-right mx-5">
              <div className="">
                <Image
                  className="border-none rounded-3xl"
                  src={shopImage}
                  alt="Picture with cat :>"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`${shopBlock.shopContainer}`}>
        <div className="px-7 py-7 justify-center container mx-auto ">
          <div className="flex w-full justify-center">
            <Link href={"https://twitter.com/adoptpetshelter"}>
              <div className={`${footer.socNetworkIcon} mx-2 p-1 rounded-full`}>
                <Image src={twitterIcon}></Image>
              </div>
            </Link>
            <Link href={"https://www.facebook.com/TheAnimalShelterSocietyInc/"}>
              <div className={`${footer.socNetworkIcon} mx-2 p-1 rounded-full`}>
                <Image src={facebookIcon}></Image>
              </div>
            </Link>
            <Link href={"https://www.youtube.com/watch?v=_CIC1OXl2u0"}>
              <div className={`${footer.socNetworkIcon} mx-2 p-1 rounded-full`}>
                <Image src={youtubeIcon}></Image>
              </div>
            </Link>
            <Link href={"https://t.me/natgeorus"}>
              <div className={`${footer.socNetworkIcon} mx-2 p-1 rounded-full`}>
                <Image src={telegramIcon}></Image>
              </div>
            </Link>
            <Link href={"/"}>
              <div className={`${footer.socNetworkIcon} mx-2 p-1 rounded-full`}>
                <Image src={watsUpIcon}></Image>
              </div>
            </Link>
            <Link href={"https://www.instagram.com/neanimalshelter/"}>
              <div className={`${footer.socNetworkIcon} mx-3 rounded-full`}>
                <Image src={instaIcon}></Image>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
