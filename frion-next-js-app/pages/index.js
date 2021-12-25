import React, { useState } from "react";
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

export default function Home() {
  const [ShouldShowChat, setShouldShowChat] = useState(false);
  const [ShouldNavButtons, setShouldNavButtons] = useState(true);
  const [isCartOpened, setIsCartOpened] = useState(false);

  const [ShouldShowCart, setShouldShowCart] = useState(0);
  function addQuant(number) {
    setShouldShowCart(ShouldShowCart + number);
  }
  return (
    <div>
      {/* NavBar */}
      {ShouldNavButtons && (
        <div
          className={`sticky flex justify-between top-0 py-3 px-10 ${navBar.navBar}`}
        >
          {/* Logo/Home */}
          <div className={`flex`}>
            <div className={`${navBar.imageLogo}`}>
              <Image src={MenuIcon} alt="Logo picture :>" />
            </div>
            <div className={`ml-2 ${navBar.textLogo}`}>
              <a>Frion</a>
            </div>
          </div>

          {/* NavButtons */}
          {/* TODO: replace links to scroll */}
          <div className={`flex justify-between w-9/12`}>
            <div className={`self-center`}>{/* Indent from logo */}</div>
            <Link href={"/#About"}>
              <div
                className={`${navBar.navButton} rounded-3xl px-4 py-1 self-center`}
              >
                <button>ABOUT US</button>
              </div>
            </Link>
            <Link href={"/#Registration"}>
              <div
                className={`${navBar.navButton} rounded-3xl px-4 py-1 self-center`}
              >
                <button>REGISTRATION</button>
              </div>
            </Link>
            <Link href={"/#Shop"}>
              <div
                className={`${navBar.navButton} rounded-3xl px-4 py-1 self-center`}
              >
                <button>SHOP</button>
              </div>
            </Link>
            <Link href={"/#Contacts"}>
              <div
                className={`${navBar.navButton} rounded-3xl px-4 py-1 self-center`}
              >
                <button>CONTACTS</button>
              </div>
            </Link>
            <div className={`self-center`}>
              {/* Indent from right border */}
            </div>
          </div>
        </div>
      )}
      {/* feedBack chat */}
      {ShouldShowChat && (
        <div
          className={`${feedBack.textPlace} fixed bottom-36 w-64 h-96 right-12 rounded-t-3xl rounded-b-lg`}
        >
          <div className={`${feedBack.messagesPlace} pt-1 px-1`}>
            <div className="text-center text-sm font-bold text-gray-700">
              Feedback
            </div>

            <div className="flex justify-start my-2">
              <div className={`${feedBack.icon} rounded-full p-1`}>
                <Image src={feedbackIcon}></Image>
              </div>
              <div className="w-full px-2 bg-white mx-2 rounded-lg text-sm">
                it is a long established fact that a reader will be distracted
                by the readable content.
              </div>
            </div>
            <div className="flex justify-end my-2">
              <div className="w-full px-2 bg-white mx-2 rounded-lg text-sm">
                Many desktop publishing packages and web page editors
              </div>
              <div className={`${feedBack.icon} rounded-full p-1`}>
                <Image src={feedbackClientIcon}></Image>
              </div>
            </div>

            <div className="flex justify-start my-2">
              <div className={`${feedBack.icon} rounded-full p-1`}>
                <Image src={feedbackIcon}></Image>
              </div>
              <div className="w-full px-2 bg-white mx-2 rounded-lg text-sm">
                is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever
                since the 1500s
              </div>
            </div>
          </div>
          <div className="flex self-end">
            <input
              type="text"
              required
              className="my-auto ml-1 block w-5/6 px-3 py-2 bg-white rounded-l-lg text-sm placeholder-gray-400 invalid:border-pink-500 invalid:text-pink-600"
              placeholder="Enter your message here..."
            />
            <div className={`${feedBack.sendMessage} my-auto p-1 rounded-r-lg`}>
              <Image src={telegramIcon}></Image>
            </div>
          </div>
        </div>
      )}
      <div
        className={`${feedBack.feedButton} fixed bottom-12 mb-12 right-12 ${
          ShouldShowChat ? `p-3` : `p-2`
        } rounded-full`}
        onClick={() => {
          setShouldShowChat(!ShouldShowChat);
        }}
      >
        <Image
          src={ShouldShowChat ? crossIcon : feedbackIcon}
          alt="FeedBackIcon"
        ></Image>
      </div>

      {isCartOpened &&(<div
        className={`${cartBlock.blurBack} flex justify-center fixed w-screen h-screen`}
      >
        <div className={`${cartBlock.cart} self-center w-2/5 rounded-3xl`}>
          <div className={`${cartBlock.products} px-4 pt-2`}>
            <div className="flex justify-between">
            <div className="text-start text-2xl font-bold text-gray-700">
              My order:
            </div>
            <div className={`${cartBlock.close} mt-1`}
            onClick={()=>{
              setShouldNavButtons(true);
              setIsCartOpened(false);
            }}>
              <Image src={crossIcon} alt="Close"></Image>
            </div>
            </div>
            
            <div
              className={`${cartBlock.product} bg-white mt-4 w-full py-2 rounded-lg`}
            >
              {/* One product order */}
              <div className="flex justify-between">
                <div className={`${cartBlock.images}  mt-2`}>
                  <Image className="rounded-lg" src={productImage1}></Image>
                </div>
                <div className="w-4/5">
                  <span className="block text-sm text-lg text-gray-700 my-2">
                    Purina One Sterilcat
                  </span>
                  <div className="w-full pr-5">
                    <div className="block text-sm text-sm text-gray-700 my-3 flex justify-between">
                      <div>Price</div>
                      <div>-</div>
                      <div>
                        <span>13,5</span>$
                      </div>
                    </div>
                    <div className="block text-sm text-sm text-gray-700 my-3 flex justify-between">
                      <div>Quantity</div>
                      <div>-</div>
                      <input
                        className="w-14 border rounded-xl"
                        type={"number"}
                      ></input>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`${cartBlock.line} w-full h-0.5`}></div>

              {/* One product order */}
              <div className="flex justify-between">
                <div className={`${cartBlock.images}  mt-2`}>
                  <Image className="rounded-lg" src={productImage3}></Image>
                </div>
                <div className="w-4/5">
                  <span className="block text-sm text-lg text-gray-700 my-2">
                  EVOLUTOR, collar for dogs
                  </span>
                  <div className="w-full pr-5">
                    <div className="block text-sm text-sm text-gray-700 my-3 flex justify-between">
                      <div>Price</div>
                      <div>-</div>
                      <div>
                        <span>20,00</span>$
                      </div>
                    </div>
                    <div className="block text-sm text-sm text-gray-700 my-3 flex justify-between">
                      <div>Quantity</div>
                      <div>-</div>
                      <input
                        className="w-14 border rounded-xl"
                        type={"number"}
                      ></input>
                    </div>
                  </div>
                </div>
              </div>



              <div className={`${cartBlock.line} w-full h-0.5`}></div>

              {/* One product order */}
              <div className="flex justify-between">
                <div className={`${cartBlock.images} mt-2`}>
                  <Image className="rounded-lg" src={productImage2}></Image>
                </div>
                <div className="w-4/5">
                  <span className="block text-sm text-lg text-gray-700 my-2">
                  EuroDog, beef flavor
                  </span>
                  <div className="w-full pr-5">
                    <div className="block text-sm text-sm text-gray-700 my-3 flex justify-between">
                      <div>Price</div>
                      <div>-</div>
                      <div>
                        <span>9.50</span>$
                      </div>
                    </div>
                    <div className="block text-sm text-sm text-gray-700 my-3 flex justify-between">
                      <div>Quantity</div>
                      <div>-</div>
                      <input
                        className="w-14 border rounded-xl"
                        type={"number"}
                      ></input>
                    </div>
                  </div>
                </div>
              </div>




            </div>
          </div>
          <div className="flex">
            <div
              className={`${cartBlock.submit} self-end w-full rounded-b-xl text-center py-4 text-xl`}
            >
              Buy
            </div>
          </div>
        </div>
      </div>)}
      

      {ShouldShowCart > 0 && (
        <div
          className={`${feedBack.feedButton} fixed bottom-11 right-12 p-2 rounded-full`}
          onClick={() => {
            setShouldNavButtons(false)
            setIsCartOpened(true)
          }}
        >
          <Image src={cartIcon} alt="FeedBackIcon"></Image>
        </div>
      )}

      {/* About Us */}
      <div className="container mx-auto" id="About">
        <div className="px-7 py-28">
          <p className="text-3xl ml-4">What is Frion?</p>
          <div className="flex mt-10">
            <div className="self-start justify-center w-3/4">
              <p
                className={`whitespace-normal break-word indent-8 text-justify font-serif text-lg pr-14`}
              >
                {/* TODO: Rewrite text!!! */}
                There are many variations of passages of Lorem Ipsum available,
                but the majority have suffered alteration in some form, by
                injected humour, or randomised words which don't look even
                slightly believable. If you are going to use a passage of Lorem
                Ipsum, you need to be sure there isn't anything embarrassing
                hidden in the middle of text. All the Lorem Ipsum generators on
                the Internet tend to repeat predefined chunks as necessary,
                making this the first true generator on the Internet. It uses a
                dictionary of over 200 Latin words, combined with a handful of
                model sentence structures, to generate Lorem Ipsum which looks
                reasonable. The generated Lorem Ipsum is therefore always free
                from repetition, injected humour, or non-characteristic words
                etc.
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
          <p className="text-3xl ml-4">How can I create request?</p>
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

            <div className="self-start justify-center w-3/4">
              <p
                className={`whitespace-normal break-word indent-8 text-justify font-serif text-lg pl-14`}
              >
                {/* TODO: Rewrite text!!! */}
                There are many variations of passages of Lorem Ipsum available,
                but the majority have suffered alteration in some form, by
                injected humour, or randomised words which don't look even
                slightly believable. If you are going to use a passage of Lorem
                Ipsum, you need to be sure there isn't anything embarrassing
                hidden in the middle of text. All the Lorem Ipsum generators on
                the Internet tend to repeat predefined chunks as necessary,
                making this the first true generator on the Internet. It uses a
                dictionary of over 200 Latin words, combined with a handful of
                model sentence structures, to generate Lorem Ipsum which looks
                reasonable. The generated Lorem Ipsum is therefore always free
                from repetition, injected humour, or non-characteristic words
                etc.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Request form */}
      <div className="container mx-auto" id="Form">
        <div className="px-7 py-28">
          <p className="text-3xl text-center">Create request</p>
          <div className="flex mt-10 justify-center">
            <div
              className={`${formBlock.form} border-none rounded-3xl self-start w-3/5 px-14`}
            >
              <form className="my-7">
                <label className="block my-3">
                  <span className="block text-sm font-medium text-gray-700">
                    First name
                  </span>
                  <input
                    type="text"
                    required
                    className="mt-1 block w-full px-3 py-2 bg-white rounded-lg text-sm placeholder-gray-400 invalid:border-pink-500 invalid:text-pink-600"
                    placeholder="Enter your name here..."
                  />
                </label>
                <label className="block my-3">
                  <span className="block text-sm font-medium text-gray-700">
                    Second name
                  </span>
                  <input
                    type="text"
                    required
                    className="mt-1 block w-full px-3 py-2 bg-white rounded-lg text-sm placeholder-gray-400 invalid:border-pink-500 invalid:text-pink-600"
                    placeholder="Enter your surname here..."
                  />
                </label>
                <label className="block my-3">
                  <span className="block text-sm font-medium text-gray-700">
                    Phone number
                  </span>
                  <input
                    type="text"
                    className="mt-1 block w-full px-3 py-2 bg-white rounded-lg text-sm placeholder-gray-400 invalid:border-pink-500 invalid:text-pink-600"
                    placeholder="Enter your phone number here..."
                    required
                  />
                </label>
                <label className="block my-3">
                  <span class="block text-sm font-medium text-gray-700">
                    Email
                  </span>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    class="peer px-3 py-2 bg-white placeholder-gray-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-lg invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                    required
                    placeholder="you@example.com"
                  />
                  <p class="mt-2 invisible peer-invalid:visible text-pink-600 text-sm">
                    Please provide a valid email address.
                  </p>
                </label>
                <label className="block my-3">
                  <span className="block text-sm font-medium text-gray-700">
                    Pet
                  </span>
                  <select
                    className="mt-1 block w-full h-9 px-3 py-2 bg-white rounded-lg text-sm placeholder-gray-400 invalid:border-pink-500 invalid:text-pink-600"
                    required
                  >
                    <option>Cat</option>
                    <option>Dog</option>
                    <option>Fish</option>
                  </select>
                </label>

                <label className="block my-5 flex justify-center">
                  <div className="w-1/3 block text-sm text-center font-medium text-gray-700">
                    Taking
                    <input
                      type="radio"
                      name="feedback"
                      className="default:ring-2 ml-2"
                      required
                    />
                  </div>

                  <div className="w-1/3 block text-sm text-center font-medium text-gray-700">
                    Giving
                    <input
                      type="radio"
                      name="feedback"
                      className="default:ring-2 ml-2"
                    />
                  </div>
                  <div className="w-1/3 block text-sm text-center font-medium text-gray-700">
                    Healing
                    <input
                      type="radio"
                      name="feedback"
                      className="default:ring-2 ml-2"
                    />
                  </div>
                </label>

                <div className="justify-center flex w-full">
                  <button
                    type="submit"
                    className={`${formBlock.SubmitButton} w-full py-2 rounded-lg`}
                  >
                    Submit
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
          <p className="text-3xl ml-4">Do you need something for your pet?</p>
          <div className="grid gap-4 grid-cols-3 justify-between py-12">
            {/* TODO: map first 10 products and shop them. If user wants to see more -> new page with full shop */}
            {/* Fix different height */}
            {/* 1-st Product */}
            <div
              className={`${shopBlock.shopItems} text-gray-700 justify-center text-center rounded-3xl my-5 mx-auto pt-3`}
            >
              <Image
                width={500}
                height={500}
                className={`${shopBlock.shopImages} border-none rounded-3xl`}
                src={productImage1}
                alt="Product picture"
              ></Image>
              <span className="block text-sm text-lg text-gray-700 my-2">
                Purina One Sterilcat
              </span>
              <button
                className={`${shopBlock.shopBuyButton} w-full rounded-b-xl py-1`}
                onClick={() => {
                  addQuant(1);
                }}
              >
                Buy for <span> 13,50$</span>
              </button>
            </div>
            {/* 2-nd Product */}
            <div
              className={`${shopBlock.shopItems} text-gray-700 justify-center text-center rounded-3xl my-5 mx-auto pt-3`}
            >
              <Image
                width={500}
                height={500}
                className={`${shopBlock.shopImages} border-none rounded-3xl`}
                src={productImage2}
                alt="Product picture"
              ></Image>
              <span className="block text-sm text-lg text-gray-700 my-2">
                EuroDog, beef flavor
              </span>
              <button
                className={`${shopBlock.shopBuyButton} w-full rounded-b-xl py-1`}
                onClick={() => {
                  addQuant(1);
                }}
              >
                Buy for <span>9,50$</span>
              </button>
            </div>
            {/* 3-rd Product */}
            <div
              className={`${shopBlock.shopItems} text-gray-700 justify-center text-center rounded-3xl my-5 mx-auto pt-3`}
            >
              <Image
                width={500}
                height={500}
                className={`${shopBlock.shopImages} border-none rounded-3xl`}
                src={productImage3}
                alt="Product picture"
              ></Image>
              <span className="block text-sm text-lg text-gray-700 my-2">
                EVOLUTOR, collar for dogs
              </span>
              <button
                className={`${shopBlock.shopBuyButton} w-full rounded-b-xl py-1`}
                onClick={() => {
                  addQuant(1);
                }}
              >
                Buy for <span>20,00$</span>
              </button>
            </div>
            {/* 4-th Product */}
            <div
              className={`${shopBlock.shopItems} text-gray-700 justify-center text-center rounded-3xl my-3 mx-auto pt-3`}
            >
              <Image
                width={500}
                height={500}
                className={`${shopBlock.shopImages} border-none rounded-3xl`}
                src={productImage4}
                alt="Product picture"
              ></Image>
              <span className="block text-sm text-lg text-gray-700 my-2">
                Parrot cage
              </span>
              <button
                className={`${shopBlock.shopBuyButton} w-full rounded-b-xl py-1`}
                onClick={() => {
                  addQuant(1);
                }}
              >
                Buy for <span>20,99$</span>
              </button>
            </div>
            {/* 5-th Product */}
            <div
              className={`${shopBlock.shopItems} text-gray-700 justify-center text-center rounded-3xl my-3 mx-auto pt-3`}
            >
              <Image
                width={500}
                height={500}
                className={`${shopBlock.shopImages} border-none rounded-3xl`}
                src={productImage5}
                alt="Product picture"
              ></Image>
              <span className="block text-sm text-lg text-gray-700 my-2">
                Sani Pet, cat litter
              </span>
              <button
                className={`${shopBlock.shopBuyButton} w-full rounded-b-xl py-1`}
                onClick={() => {
                  addQuant(1);
                }}
              >
                Buy for <span>8,00$</span>
              </button>
            </div>
            {/* 6-th Product */}
            <div
              className={`${shopBlock.shopItems} text-gray-700 justify-center text-center rounded-3xl my-3 mx-auto pt-3`}
            >
              <Image
                width={500}
                height={500}
                className={`${shopBlock.shopImages} border-none rounded-3xl`}
                src={productImage6}
                alt="Product picture"
              ></Image>
              <span className="block text-sm text-lg text-gray-700 my-2">
                Georplast Mini Twisterball
              </span>
              <button
                className={`${shopBlock.shopBuyButton} w-full rounded-b-xl py-1`}
                onClick={() => {
                  addQuant(1);
                }}
              >
                Buy for <span>9,40$</span>
              </button>
            </div>
          </div>
          <div className="w-full flex justify-center">
            <button
              className={`${shopBlock.shopViewButton} w-2/5 rounded-3xl py-1 font-bold`}
            >
              View all products
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto" id="Contacts">
        <div className="px-7 py-28">
          <p className="text-3xl ml-4">Do you want to visit us?</p>
          <div className="grid grid-cols-2 mt-10">
            <div className="self-start justify-center">
              <div
                className={`${formBlock.form} border-none rounded-3xl self-start px-14 py-1 mx-5`}
              >
                <form className="my-7">
                  <label className="block my-3">
                    <span className="block text-sm font-medium text-gray-700">
                      Country
                    </span>
                    <select
                      className="mt-1 block w-full h-9 px-3 py-2 bg-white rounded-lg text-sm placeholder-gray-400 invalid:border-pink-500 invalid:text-pink-600"
                      required
                    >
                      <option>Ukraine</option>
                      <option>England</option>
                      <option>Germany</option>
                    </select>
                  </label>

                  <label className="block my-3">
                    <span className="block text-sm font-medium text-gray-700">
                      City
                    </span>
                    <select
                      className="mt-1 block w-full h-9 px-3 py-2 bg-white rounded-lg text-sm placeholder-gray-400 invalid:border-pink-500 invalid:text-pink-600"
                      required
                    >
                      <option>Kiev</option>
                      <option>Zaporizhzhya</option>
                      <option>London</option>
                      <option>Berlin</option>
                    </select>
                  </label>

                  <label className="block my-3">
                    <span className="block text-sm font-medium text-gray-700">
                      Department
                    </span>
                    <select
                      className="mt-1 block w-full h-9 px-3 py-2 bg-white rounded-lg text-sm placeholder-gray-400 invalid:border-pink-500 invalid:text-pink-600"
                      required
                    >
                      <option>London SW1A 0AA</option>
                      <option>Gendarmenmarkt, 10117 Berlin</option>
                      <option>Vulytsia Solom'ianska, 24, Kiev</option>
                      <option>
                        Street Leonida Zhabotinsky, 19, Zaporizhzhia
                      </option>
                    </select>
                  </label>
                </form>
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
            <div className={`${footer.socNetworkIcon} mx-2 p-1 rounded-full`}>
              <Image src={twitterIcon}></Image>
            </div>
            <div className={`${footer.socNetworkIcon} mx-2 p-1 rounded-full`}>
              <Image src={facebookIcon}></Image>
            </div>
            <div className={`${footer.socNetworkIcon} mx-2 p-1 rounded-full`}>
              <Image src={youtubeIcon}></Image>
            </div>
            <div className={`${footer.socNetworkIcon} mx-2 p-1 rounded-full`}>
              <Image src={telegramIcon}></Image>
            </div>
            <div className={`${footer.socNetworkIcon} mx-2 p-1 rounded-full`}>
              <Image src={watsUpIcon}></Image>
            </div>
            <div className={`${footer.socNetworkIcon} mx-3 rounded-full`}>
              <Image src={instaIcon}></Image>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
