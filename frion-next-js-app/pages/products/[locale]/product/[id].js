import fetch from "isomorphic-unfetch";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import navBar from "../../../../styles/navBar.module.css";
import MenuIcon from "../../../../assets/logo.png";
import productStyle from "../../../../styles/product.module.css";

const Product = ({ locale, product }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (isDeleting) {
      deleteProduct();
    }
  }, [isDeleting]);
  const router = useRouter();

  const deleteProduct = async () => {
    const productId = router.query.id;
    try {
      const deleted = await fetch(
        `process.env.API_HOSTucts/${productId}`,
        {
          method: "Delete",
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
  };

  return (
    <div>
      <div
        className={`sticky flex justify-between top-0 py-3 px-10 ${navBar.navBar}`}
      >
        {/* Logo/Home */}
        <Link href={`/products/${locale}`}>
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
      </div>
      <div className="px-28 mt-20 flex">
        <div className="px-5">
          <Image
          width={500}
          height={500}
          className="rounded-xl"
            src={product.photo}
            alt="Product picture"
          ></Image>
        </div>
        <div className="w-1/2 px-2">
            <div className={`${productStyle.globalInfo} rounded-3xl py-4 px-9`}>
                <div className="text-2xl">
                    {product.title}
                </div>
                <div className="text-sm">
                    Category: {product.category}
                </div>

                <div className="text-2xl mt-10">
                {product.price["$numberDecimal"]}$
                </div>
            </div>

            <div className={`${productStyle.globalInfo} rounded-3xl py-4 px-9 mt-7`}>
                <div className="text-2xl">
                    About product
                </div>
                <div className="text-sm mt-2">
                    {product.description}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

Product.getInitialProps = async ({ query: { locale, id } }) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/products/product/${id}`);
  const { data } = await res.json();

  return { locale: locale, product: data };
};

export default Product;
