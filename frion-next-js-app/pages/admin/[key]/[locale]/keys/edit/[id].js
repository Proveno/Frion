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
const EditProduct = ({ Akey, isKeyValid, locale, Fkey }) => {

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
    key: Fkey.key,
    owner: Fkey.owner,
    addAndUpdateKeys: Fkey.addAndUpdateKeys,
    deleteKeys: Fkey.deleteKeys,
    addAndUpdateProducts: Fkey.addAndUpdateProducts,
    deleteProducts: Fkey.deleteProducts,
    takingReq: Fkey.takingReq,
    acceptedTakingReq: Fkey.acceptedTakingReq,
    givingReq: Fkey.givingReq,
    acceptedGivingReq: Fkey.acceptedGivingReq,
    healingReq: Fkey.healingReq,
    acceptedHealingReq: Fkey.acceptedHealingReq,
    categories: Fkey.categories,
    addCategories: Fkey.addCategories,
    orders: Fkey.orders,
    acceptedOrders: Fkey.acceptedOrders,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [photoUrl, setPhotoUrl] = useState(form.photo);

  const router = useRouter();

  useEffect(() => {
    if (isSubmitting) {
      if (Object.keys(errors).length === 0) {
        updateKey();
      } else {
        setIsSubmitting(false);
      }
    }
  }, [errors]);

  const updateKey = async () => {
    try {
      const res = await fetch(
        `${process.env.API_HOST}/key/${router.query.id}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );
      router.push(`/admin/${Akey}/${locale}/keys`);
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
  const validate = () => {
    let err = {};
    
    // TODO: length
    return err;
  };

  return (
    <div>
        <div className="flex mt-10 justify-center px-10">
          <div
            className={`bg-gray-300 border-none rounded-3xl self-start w-3/5 px-14`}
          >
            <form className="my-7" onSubmit={handleSubmit}>
              <label className="block my-3">
                <span className="block text-sm font-medium text-gray-700">
                  {t.ownerLabel}
                </span>
                <input
                  name="owner"
                  onChange={(e) => {
                    setForm({
                      ...form,
                      owner: e.target.value,
                    });
                  }}
                  type="text"
                  className="mt-1 block w-full px-3 py-2 bg-white rounded-lg text-sm placeholder-gray-400 invalid:border-pink-500 invalid:text-pink-600"
                  placeholder={t.ownerPlaceHolder}
                  defaultValue={form.owner}
                />
              </label>
              <div className="w-full my-3 flex justify-between">
                <span className="block text-sm font-medium text-gray-700">
                  {t.editKeysKeyPermission}
                </span>
                <input
                  name="addAndUpdateKeys"
                  onChange={(e) => {
                    setForm({
                      ...form,
                      addAndUpdateKeys: !form.addAndUpdateKeys,
                    });
                  }}
                  type="checkbox"
                  className="mt-1 block w-1/5 px-3 py-2 bg-white rounded-lg text-sm"
                  checked={form.addAndUpdateKeys}
                />
              </div>
              <div className="w-full my-3 flex justify-between">
                <span className="block text-sm font-medium text-gray-700">
                  {t.deleteKeysKeyPermission}
                </span>
                <input
                  name="deleteKeys"
                  onChange={(e) => {
                    setForm({
                      ...form,
                      deleteKeys: !form.deleteKeys,
                    });
                  }}
                  type="checkbox"
                  className="mt-1 block w-1/5 px-3 py-2 bg-white rounded-lg text-sm"
                  checked={form.deleteKeys}
                />
              </div>
              <div className="w-full my-3 flex justify-between">
                <span className="block text-sm font-medium text-gray-700">
                  {t.editProductsKeyPermission}
                </span>
                <input
                  name="addAndUpdateProducts"
                  onChange={(e) => {
                    setForm({
                      ...form,
                      addAndUpdateProducts: !form.addAndUpdateProducts,
                    });
                  }}
                  type="checkbox"
                  className="mt-1 block w-1/5 px-3 py-2 bg-white rounded-lg text-sm"
                  checked={form.addAndUpdateProducts}
                />
              </div>
              <div className="w-full my-3 flex justify-between">
                <span className="block text-sm font-medium text-gray-700">
                  {t.deleteProductsKeyPermission}
                </span>
                <input
                  name="deleteProducts"
                  onChange={(e) => {
                    setForm({
                      ...form,
                      deleteProducts: !form.deleteProducts,
                    });
                  }}
                  type="checkbox"
                  className="mt-1 block w-1/5 px-3 py-2 bg-white rounded-lg text-sm"
                  checked={form.deleteProducts}
                />
              </div>
              <div className="w-full my-3 flex justify-between">
                <span className="block text-sm font-medium text-gray-700">
                  {t.TakingRequestKeyPermission}
                </span>
                <input
                  name="takingReq"
                  onChange={(e) => {
                    setForm({
                      ...form,
                      takingReq: !form.takingReq,
                    });
                  }}
                  type="checkbox"
                  className="mt-1 block w-1/5 px-3 py-2 bg-white rounded-lg text-sm"
                  checked={form.takingReq}

                />
              </div>
              <div className="w-full my-3 flex justify-between">
                <span className="block text-sm font-medium text-gray-700">
                  {t.AcceptedTakingRequestKeyPermission}
                </span>
                <input
                  name="acceptedTakingReq"
                  onChange={(e) => {
                    setForm({
                      ...form,
                      acceptedTakingReq: !form.acceptedTakingReq,
                    });
                  }}
                  type="checkbox"
                  className="mt-1 block w-1/5 px-3 py-2 bg-white rounded-lg text-sm"
                  checked={form.acceptedTakingReq}
                />
              </div>
              <div className="w-full my-3 flex justify-between">
                <span className="block text-sm font-medium text-gray-700">
                  {t.GivingRequestKeyPermission}
                </span>
                <input
                  name="givingReq"
                  onChange={(e) => {
                    setForm({
                      ...form,
                      givingReq: !form.givingReq,
                    });
                  }}
                  type="checkbox"
                  className="mt-1 block w-1/5 px-3 py-2 bg-white rounded-lg text-sm"
                  checked={form.givingReq}
                />
              </div>
              <div className="w-full my-3 flex justify-between">
                <span className="block text-sm font-medium text-gray-700">
                  {t.AcceptedGivingKeyPermission}
                </span>
                <input
                  name="acceptedGivingReq"
                  onChange={(e) => {
                    setForm({
                      ...form,
                      acceptedGivingReq: !form.acceptedGivingReq,
                    });
                  }}
                  type="checkbox"
                  className="mt-1 block w-1/5 px-3 py-2 bg-white rounded-lg text-sm"
                  checked={form.acceptedGivingReq}
                />
              </div>
              <div className="w-full my-3 flex justify-between">
                <span className="block text-sm font-medium text-gray-700">
                  {t.HealingRequestKeyPermission}
                </span>
                <input
                  name="healingReq"
                  onChange={(e) => {
                    setForm({
                      ...form,
                      healingReq: !form.healingReq,
                    });
                  }}
                  type="checkbox"
                  className="mt-1 block w-1/5 px-3 py-2 bg-white rounded-lg text-sm"
                  checked={form.healingReq}
                />
              </div>
              <div className="w-full my-3 flex justify-between">
                <span className="block text-sm font-medium text-gray-700">
                  {t.AcceptedHealingKeyPermission}
                </span>
                <input
                  name="acceptedHealingReq"
                  onChange={(e) => {
                    setForm({
                      ...form,
                      acceptedHealingReq: !form.acceptedHealingReq,
                    });
                  }}
                  type="checkbox"
                  className="mt-1 block w-1/5 px-3 py-2 bg-white rounded-lg text-sm"
                  checked={form.acceptedHealingReq}
                />
              </div>
              <div className="w-full my-3 flex justify-between">
                <span className="block text-sm font-medium text-gray-700">
                  {t.OrdersKeyPermission}
                </span>
                <input
                  name="orders"
                  onChange={(e) => {
                    setForm({
                      ...form,
                      orders: !form.orders,
                    });
                  }}
                  type="checkbox"
                  className="mt-1 block w-1/5 px-3 py-2 bg-white rounded-lg text-sm"
                  checked={form.orders}
                />
              </div>
              <div className="w-full my-3 flex justify-between">
                <span className="block text-sm font-medium text-gray-700">
                  {t.AcceptedOrdersKeyPermission}
                </span>
                <input
                  name="acceptedOrders"
                  onChange={(e) => {
                    setForm({
                      ...form,
                      acceptedOrders: !form.acceptedOrders,
                    });
                  }}
                  type="checkbox"
                  className="mt-1 block w-1/5 px-3 py-2 bg-white rounded-lg text-sm"
                  checked={form.acceptedOrders}
                />

              </div>
              <div className="w-full my-3 flex justify-between">
                <span className="block text-sm font-medium text-gray-700">
                  {t.editCategoriesKeyPermission}
                </span>
                <input
                  name="categories"
                  onChange={(e) => {
                    setForm({
                      ...form,
                      categories: !form.categories,
                    });
                  }}
                  type="checkbox"
                  className="mt-1 block w-1/5 px-3 py-2 bg-white rounded-lg text-sm"
                  checked={form.categories}
                />

              </div>
              <div className="w-full my-3 flex justify-between">
                <span className="block text-sm font-medium text-gray-700">
                  {t.addCategoriesKeyPermission}
                </span>
                <input
                  name="addCategories"
                  onChange={(e) => {
                    setForm({
                      ...form,
                      addCategories: !form.addCategories,
                    });
                  }}
                  type="checkbox"
                  className="mt-1 block w-1/5 px-3 py-2 bg-white rounded-lg text-sm"
                  checked={form.addCategories}
                />

              </div>

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
        </div>
    </div>
  );
};

EditProduct.getInitialProps = async ({ query: { key, locale , id } }) => {
  const keyRes = await fetch(`${process.env.API_HOST}/keys/findKey/${key}`);
  const res = await fetch(`${process.env.API_HOST}/keys/key/${id}`);

  const { keyData } = await res.json();
  const { success } = await keyRes.json();

  return {
    Akey: key,
    isKeyValid: success,
    locale: locale,
    Fkey: keyData
  };
};

export default EditProduct;
