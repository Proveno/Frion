import { useRouter } from "next/router";

import { en } from "../../locales/en";
import { ru } from "../../locales/ru";
import { uk } from "../../locales/uk";
import { de } from "../../locales/de";

import fetch from 'isomorphic-unfetch';
import Link from "next/link";
import Image from "next/image";

import navBar from "../../styles/navBar.module.css";
import MenuIcon from "../../assets/logo.png";

const ProductSearch = ({ products }) => {


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

    return (
        <div>

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
                            <button>{t.home}</button>
                        </div>
                    </Link>
                    <div className={`flex`}>
                        <input placeholder="Enter title..."></input>
                    </div>
                    <div className={`flex`}>
                        <select
                            className={`${navBar.langButton} px-4 text`}
                            id="LanguageSelect"
                            onChange={() => {
                                router.push(
                                    `/${document.getElementById("LanguageSelect").value}`
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
                    <div className={`self-center`}>
                        {/* Indent from right border */}
                    </div>
                </div>
            </div>



            <h1>Products</h1>
            <div className='grid gap-4 grid-cols-4 justify-between py-12'>
                {products.map(product => {
                    return (
                        <div
                            key={product._id}
                            className={`text-gray-700 justify-center text-center rounded-3xl my-5 mx-auto pt-3`}
                        >
                            <Link href={`/${product._id}`}>
                                <div>
                                    <Image
                                        width={500}
                                        height={500}
                                        className={`border-none rounded-3xl`}
                                        src={product.photo}
                                        alt="Product picture"
                                    ></Image>
                                    <span className="block text-sm text-lg text-gray-700 my-2">
                                        {product.title}
                                    </span>
                                </div>
                            </Link>
                            <Link href={`/${product._id}/edit`}>
                                <button>
                                    EDIT
                                </button>
                            </Link>
                            <button
                                className={`w-full rounded-b-xl py-1`}
                            >
                                <span>{`${parseFloat(product.price["$numberDecimal"])}`}</span>$
                            </button>
                        </div>

                    )
                })}
            </div>
        </div>
    );
}

ProductSearch.getInitialProps = async ({ query: { search } }) => {
    const res = await fetch(`http://localhost:3000/api/products/search/${search}`);
    const { data } = await res.json();
    console.log(data)
    return { products: data };
}

export default ProductSearch