import React, { useState } from 'react'
import Image from 'next/image'
import navBar from '../styles/navBar.module.css'
import infBlock from '../styles/infoBlock.module.css'

import MenuIcon from '../assets/logo.png'
import CatImage from '../assets/InformationCat.jpeg'
import CloseIcon from '../assets/window-close-regular.svg'

export default function Home() {
  // const [isSideMenuOpen, setisSideMenuOpen] = useState(false)

  // const showSideMenu = () => {
  //   (isSideMenuOpen) ? setisSideMenuOpen(false) : setisSideMenuOpen(true)
  // }


  return (
    <div>
      {/* NavBar */}
      <div className={`sticky flex justify-between top-0 py-3 px-10 ${navBar.navBar}`} >
        {/* Logo/Home */}
        <div className={`flex`}>
          <div className={`${navBar.imageLogo}`}>
            <Image src={MenuIcon} alt="Logo picture :>"/>
          </div>
          <div className={`ml-2 ${navBar.textLogo}`}>
            <a>
              Frion
            </a>
          </div>
        </div>

        {/* NavButtons */}
        <div className={`flex justify-between w-9/12`}>
          <div className={`self-center`}>
            {/* Indent from logo */}
          </div>
          <div className={`self-center`}>
            <button>ABOUT US</button>
          </div>
          <div className={`self-center`}>
            <button>REGISTRATION</button>
          </div>
          <div className={`self-center`}>
            <button>SHOP</button>
          </div>
          <div className={`self-center`}>
            <button>GALLERY</button>
          </div>
          <div className={`self-center`}>
            <button>CONTACTS</button>
          </div>
          <div className={`self-center`}>
            {/* Indent from right border */}
          </div>
        </div>


      </div>
      {/* About Us */}
      <div>
        <h3>What is Frion?</h3>
        <div className='flex'>
          <div className='self-start justify-center w-1/2'>
            Lorem fshjdfkshdfkhksjdhfksdhkfjhsdjfhsdhfkjdshkjfhsdkfjshdkfhsdkjfhskdjhfsdjkhfsjkdhfkjsdhfjsdhfjksdhjkfshdfk
          </div>
          <div className='self-center justify-center w-1/2'>
            <div className={`${infBlock.catImage}`}>
            <Image className='border-none rounded-3xl' src={CatImage} alt="Picture with cat :>"/>
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
  )
}

function SideMenu() {
  return (
    <div className="fixed h-screen w-1/2 sm:w-1/4 lg:hidden bg-blue-500 top-8">
      <ul className="menu-list flex flex-col text-xs font-bold">
        <li className="menu-list-item py-2 hover:bg-white hover:text-blue-700"><a href="#">Home</a></li>
        <li className="menu-list-item py-2 hover:bg-white hover:text-blue-700"><a href="#">Profile</a></li>
        <li className="menu-list-item py-2 hover:bg-white hover:text-blue-700"><a href="#">Settings</a></li>
      </ul>
    </div>
  )
}