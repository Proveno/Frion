import Link from "next/link";
import { useState, useEffect } from "react";
import fetch from "isomorphic-unfetch";
import { useRouter } from "next/router";
import Image from "next/image";
import formStyle from "../../../../../../styles/requestForm.module.css";
import { en } from "../../../../../../locales/en";
import { ru } from "../../../../../../locales/ru";
import { ua } from "../../../../../../locales/ua";
import { de } from "../../../../../../locales/de";
const EditProduct = ({ Akey, isKeyValid, product, allCategories, locale }) => {
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
  const [form, setForm] = useState({
    title: product.title,
    description: product.description,
    price: product.price["$numberDecimal"],
    category: product.category,
    photo: product.photo,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [photoUrl, setPhotoUrl] = useState(form.photo);

  const router = useRouter();

  useEffect(() => {
    if (isSubmitting) {
      if (Object.keys(errors).length === 0) {
        updateProduct();
      } else {
        setIsSubmitting(false);
      }
    }
  }, [errors]);

  const updateProduct = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_HOST}/products/product/${router.query.id}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );
      router.push(`/admin/${Akey}/${locale}/products`);
    } catch (error) {
      console.log(console.error());
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let errs = validate();
    setErrors(errs);
    setIsSubmitting(true);
  };
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const validate = () => {
    let err = {};
    if (!form.description) {
      err.description = "Description is required";
    }
    if (!form.price) {
      err.price = "Price is required";
    }
    if (!form.category) {
      err.price = "Price is required";
    }
    if (!form.photo) {
      err.photo = "Photo url is required";
    }
    // TODO: length
    return err;
  };

  return (
    <>
      {isKeyValid ? (
        <div className="flex mt-10 justify-center px-10">
          <div
            className={`bg-gray-300 border-none rounded-3xl self-start w-3/5 px-14`}
          >
            <form className="my-7" onSubmit={handleSubmit}>
              <label className="block my-3">
                <span className="block text-sm font-medium text-gray-700">
                  {t.titleProduct}
                </span>
                <textarea
                  name="title"
                  onChange={handleChange}
                  type="text"
                  required
                  value={form.title}
                  className="mt-1 block w-full px-3 py-2 bg-white rounded-lg text-sm placeholder-gray-400 invalid:border-pink-500 invalid:text-pink-600"
                  placeholder={t.titleProductPlaceholder}
                />
              </label>
              <label className="block my-3">
                <span className="block text-sm font-medium text-gray-700">
                {t.descriptionProduct}
                </span>
                <textarea
                  name="description"
                  onChange={handleChange}
                  type="text"
                  rows="5"
                  required
                  value={form.description}
                  className="mt-1 block w-full px-3 py-2 bg-white rounded-lg text-sm placeholder-gray-400 invalid:border-pink-500 invalid:text-pink-600"
                  placeholder={t.descriptionProductPlaceholder}
                />
              </label>
              <label className="block my-3">
                <span className="block text-sm font-medium text-gray-700">
                {t.priceProduct}
                </span>
                <input
                  name="price"
                  onChange={handleChange}
                  type="text"
                  value={form.price}
                  className="mt-1 block w-full px-3 py-2 bg-white rounded-lg text-sm placeholder-gray-400 invalid:border-pink-500 invalid:text-pink-600"
                  placeholder={t.priceProductPlaceholder}
                  required
                />
              </label>
              <label className="block my-3">
                <span className="block text-sm font-medium text-gray-700">
                {t.categoryProduct}
                </span>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="mt-1 block w-full h-9 px-3 py-2 bg-white rounded-lg text-sm placeholder-gray-400 invalid:border-pink-500 invalid:text-pink-600"
                  required
                >
                  {allCategories.map((category) => {
                    if (category.categoryLocale == router.locale) {
                      return <option key={category.key}>{category.category}</option>;
                    }
                  })}
                </select>
              </label>
              <label className="block my-3">
                <span className="block text-sm font-medium text-gray-700">
                {t.photoProduct}
                </span>
                <div className="flex">
                  <input
                    name="photo"
                    onChange={handleChange}
                    type="text"
                    value={form.photo}
                    className="mt-1 block w-full px-3 py-2 bg-white rounded-lg text-sm placeholder-gray-400 invalid:border-pink-500 invalid:text-pink-600"
                    placeholder={t.photoProductPlaceholder}
                    required
                  />
                  <button
                    className={`${formStyle.SubmitButton} rounded-lg mt-1 ml-2 px-2`}
                    onClick={() => {
                      setPhotoUrl(form.photo);
                    }}
                  >
                    {t.checkBtn}
                  </button>
                </div>
              </label>
              <div className="justify-center flex w-full">
                <button
                  type="submit"
                  className={`${formStyle.SubmitButton} w-full py-2 rounded-lg`}
                >
                  {t.editBtn}
                </button>
              </div>
            </form>
          </div>
          <div className="w-1/3">
            <div>
              <Image width={500} height={500} src={`${photoUrl}`}></Image>
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
    </>
  );
};

EditProduct.getInitialProps = async ({ query: { key, locale, id } }) => {
  const keyRes = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/keys/findKey/${key}`);
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/products/product/${id}`);

  const allCategories = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/categories/`);

  const { dataCategories } = await allCategories.json();
  const { data } = await res.json();
  const { success } = await keyRes.json();

  return {
    Akey: key,
    isKeyValid: success,
    product: data,
    allCategories: dataCategories,
    locale: locale
  };
};

export default EditProduct;
