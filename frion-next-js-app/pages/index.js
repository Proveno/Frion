import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import navBar from "../styles/navBar.module.css";
import infBlock from "../styles/infoBlock.module.css";
import instructBlock from "../styles/instructBlock.module.css";
import formBlock from "../styles/requestForm.module.css";

import MenuIcon from "../assets/logo.png";
import CatImage from "../assets/InformationCat.jpeg";
import requestImageInfo from "../assets/requestInfo.png";

import CloseIcon from "../assets/window-close-regular.svg";

export default function Home() {
  // const [isSideMenuOpen, setisSideMenuOpen] = useState(false)

  // const showSideMenu = () => {
  //   (isSideMenuOpen) ? setisSideMenuOpen(false) : setisSideMenuOpen(true)
  // }

  return (
    <div>
      {/* NavBar */}
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
        <div className={`flex justify-between w-9/12`}>
          <div className={`self-center`}>{/* Indent from logo */}</div>
          <Link href={"/#About"}>
            <div className={`self-center`}>
              <button>ABOUT US</button>
            </div>
          </Link>
          <Link href={"/#About"}>
            <div className={`self-center`}>
              <button>REGISTRATION</button>
            </div>
          </Link>
          <Link href={"/#About"}>
            <div className={`self-center`}>
              <button>SHOP</button>
            </div>
          </Link>
          <Link href={"/#About"}>
            <div className={`self-center`}>
              <button>GALLERY</button>
            </div>
          </Link>
          <Link href={"/#About"}>
            <div className={`self-center`}>
              <button>CONTACTS</button>
            </div>
          </Link>
          <div className={`self-center`}>{/* Indent from right border */}</div>
        </div>
      </div>
      {/* About Us */}
      <div className="container mx-auto" id="About">
        <div className="px-7 py-28">
          <p className="text-2xl ml-4">What is Frion?</p>
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
      <div className={`${instructBlock.container}`}>
        <div className="px-7 py-28 container mx-auto">
          <p className="text-2xl ml-4">How can I create request?</p>
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
          <p className="text-2xl text-center">Create request</p>
          <div className="flex mt-10 justify-center">
            <div
              className={`${formBlock.form} border-none rounded-3xl self-start w-2/3 px-14`}
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
    </div>
    // NavBarEx
    // <div className="fixed w-full h-8 bg-blue-400 text-gray-200 flex flex-row justify-between items-center">
    //         <div className="brand-logo text-sm font-bold px-2">rhombus</div>
    //         <ul className="hidden menu-list lg:flex lg:flex-row text-xs font-bold">
    //             <li className="menu-list-item px-2"><a href="#">Home</a></li>
    //             <li className="menu-list-item px-2"><a href="#">Profile</a></li>
    //             <li className="menu-list-item px-2"><a href="#">Settings</a></li>
    //         </ul>

    //         <button onClick={()=>{showSideMenu()}} className="lg:hidden menu-button">
    //             {(isSideMenuOpen) ? <img src={CloseIcon} className="w-8 h-8 px-2" alt="close"></img> : <img src={MenuIcon} className="w-8 h-8 px-2" alt="menu"></img>}
    //         </button>
    //         {(isSideMenuOpen) ? SideMenu() : ''}
    //   </div>
  );
}

function SideMenu() {
  return (
    <div className="fixed h-screen w-1/2 sm:w-1/4 lg:hidden bg-blue-500 top-8">
      <ul className="menu-list flex flex-col text-xs font-bold">
        <li className="menu-list-item py-2 hover:bg-white hover:text-blue-700">
          <a href="#">Home</a>
        </li>
        <li className="menu-list-item py-2 hover:bg-white hover:text-blue-700">
          <a href="#">Profile</a>
        </li>
        <li className="menu-list-item py-2 hover:bg-white hover:text-blue-700">
          <a href="#">Settings</a>
        </li>
      </ul>
    </div>
  );
}
