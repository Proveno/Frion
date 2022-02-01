import Link from "next/link";
import { useState, useEffect } from "react";
import fetch from "isomorphic-unfetch";
import { useRouter } from "next/router";
import Image from "next/image";
import formStyle from "../../../../../styles/requestForm.module.css";
import { en } from "../../../../../locales/en";
import { ru } from "../../../../../locales/ru";
import { ua } from "../../../../../locales/ua";
import { de } from "../../../../../locales/de";
const NewProduct = ({Akey, isKeyValid, keyData,locale }) => {
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
  const router = useRouter();
  const [form, setForm] = useState({
    category: "",
    categoryLocale: locale,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  useEffect(() => {
    if (isSubmitting) {
      if (Object.keys(errors).length === 0) {
        createCategory();
      } else {
        setIsSubmitting(false);
      }
    }
  }, [errors]);

  const createCategory = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/categories/`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      router.push(`/admin/${Akey}/${locale}/categories/`);
    } catch (error) {
      console.log(console.error());
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let errs = validate();
    console.log(errs);
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
    if (!form.category) {
      err.category = "Category is required";
    }
    // TODO: length
    return err;
  };

  return (
    <div>
      {isKeyValid &&
      (keyData[0].addCategories) ? (
        <div className="flex mt-10 justify-center px-10">
          <div
            className={`bg-gray-300 border-none rounded-3xl self-start w-3/5 px-14`}
          >
            <form className="my-7" onSubmit={handleSubmit}>
              <label className="block my-3">
                <span className="block text-sm font-medium text-gray-700">
                  {t.category}
                </span>
                <input
                  name="category"
                  onChange={handleChange}
                  type="text"
                  className="mt-1 block w-full px-3 py-2 bg-white rounded-lg text-sm placeholder-gray-400 invalid:border-pink-500 invalid:text-pink-600"
                  placeholder={t.categoryPlaceHolder}
                />
              </label>
              <div className="justify-center flex w-full">
                <button
                  type="submit"
                  className={`${formStyle.SubmitButton} w-full py-2 rounded-lg`}
                >
                  {t.addBtn}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="flex justify-center">
<div className="mt-48 text-4xl">{t.keyIsIncorrect}Admin key is incorrect
          </div>
        </div>
      )}
    </div>
  );
};

NewProduct.getInitialProps = async ({ query: { key, locale } }) => {
  const keyRes = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/keys/findKey/${key}`);
  const { success, keyData } = await keyRes.json();
  return { Akey: key,isKeyValid: success, keyData: keyData, locale: locale };
};
export default NewProduct;
