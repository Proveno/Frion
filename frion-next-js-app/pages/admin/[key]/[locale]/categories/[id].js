import Link from "next/link";
import { useState, useEffect } from "react";
import fetch from "isomorphic-unfetch";
import { useRouter } from "next/router";
import Image from "next/image";
import formStyle from "../../../../../styles/requestForm.module.css";

const NewProduct = ({Akey, isKeyValid, keyData, category, locale }) => {
  const router = useRouter();
  const [form, setForm] = useState({
    category: category.category,
    categoryLocale: category.categoryLocale,
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
      const res = await fetch(`http://localhost:3000/api/categories/${locale}/${category._id}/`, {
        method: "PUT",
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
                  Category:
                </span>
                <input
                  name="category"
                  onChange={handleChange}
                  type="text"
                  className="mt-1 block w-full px-3 py-2 bg-white rounded-lg text-sm placeholder-gray-400 invalid:border-pink-500 invalid:text-pink-600"
                  placeholder={`Enter category ...`}
                  defaultValue={category.category}
                />
              </label>
              <div className="justify-center flex w-full">
                <button
                  type="submit"
                  className={`${formStyle.SubmitButton} w-full py-2 rounded-lg`}
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="flex justify-center">
          <div className="text-2xl">Admin key is incorrect</div>
        </div>
      )}
    </div>
  );
};

NewProduct.getInitialProps = async ({ query: { key, locale, id } }) => {
  const keyRes = await fetch(`http://localhost:3000/api/keys/findKey/${key}`);
  const categories = await fetch(
    `http://localhost:3000/api/categories/${locale}/${id}`
  );

  const { dataCategories } = await categories.json();
  const { success, keyData } = await keyRes.json();
  return { Akey: key,isKeyValid: success, keyData: keyData, category: dataCategories, locale: locale };
};
export default NewProduct;
