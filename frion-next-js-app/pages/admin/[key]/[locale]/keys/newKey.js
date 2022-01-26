import Link from "next/link";
import { useState, useEffect } from "react";
import fetch from "isomorphic-unfetch";
import { useRouter } from "next/router";
import Image from "next/image";
import formStyle from "../../../../../styles/requestForm.module.css";
import cartBlock from "../../../../../styles/cartState.module.css";

const NewKey = ({ Akey, isKeyValid, keyData, locale }) => {
  const router = useRouter();
  const [form, setForm] = useState({
    key: "",
    owner: "",
    addAndUpdateKeys: false,
    deleteKeys: false,
    addAndUpdateProducts: false,
    deleteProducts: false,
    takingReq: false,
    acceptedTakingReq: false,
    givingReq: false,
    acceptedGivingReq: false,
    healingReq: false,
    acceptedHealingReq: false,
    orders: false,
    acceptedOrders: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [generatedKey, setGeneratedKey] = useState("");

  useEffect(() => {
    if (isSubmitting) {
      if (Object.keys(errors).length === 0) {
        createKey();
      } else {
        setIsSubmitting(false);
      }
    }
  }, [errors]);

  const createKey = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/keys/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const { data } = await res.json();
      setGeneratedKey(data);
      //router.push(`/admin/${Akey}/${locale}/keys/`);
    } catch (error) {}
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let errs = validate();
    console.log(errs);
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
      {isKeyValid &&
      (keyData[0].addAndUpdateProducts) ? (
        <div className="flex mt-10 justify-center px-10">
          <div
            className={`bg-gray-300 border-none rounded-3xl self-start w-3/5 px-14`}
          >
            <form className="my-7" onSubmit={handleSubmit}>
              <label className="block my-3">
                <span className="block text-sm font-medium text-gray-700">
                  Owner:
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
                  placeholder={`Enter title ...`}
                />
              </label>
              <div className="w-full my-3 flex justify-between">
                <span className="block text-sm font-medium text-gray-700">
                  Can add and update keys:
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
                />
              </div>
              <div className="w-full my-3 flex justify-between">
                <span className="block text-sm font-medium text-gray-700">
                  Can delete keys:
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
                />
              </div>
              <div className="w-full my-3 flex justify-between">
                <span className="block text-sm font-medium text-gray-700">
                  Can add and update products:
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
                />
              </div>
              <div className="w-full my-3 flex justify-between">
                <span className="block text-sm font-medium text-gray-700">
                  Can delete products:
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
                />
              </div>
              <div className="w-full my-3 flex justify-between">
                <span className="block text-sm font-medium text-gray-700">
                Can work with unaccepted taking requests:
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
                />
              </div>
              <div className="w-full my-3 flex justify-between">
                <span className="block text-sm font-medium text-gray-700">
                Can work with accepted taking requests:
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
                />
              </div>
              <div className="w-full my-3 flex justify-between">
                <span className="block text-sm font-medium text-gray-700">
                Can work with unaccepted giving requests:
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
                />
              </div>
              <div className="w-full my-3 flex justify-between">
                <span className="block text-sm font-medium text-gray-700">
                Can work with accepted giving requests:
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
                />
              </div>
              <div className="w-full my-3 flex justify-between">
                <span className="block text-sm font-medium text-gray-700">
                Can work with unaccepted healing requests:
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
                />
              </div>
              <div className="w-full my-3 flex justify-between">
                <span className="block text-sm font-medium text-gray-700">
                Can work with accepted healing requests:
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
                />
              </div>
              <div className="w-full my-3 flex justify-between">
                <span className="block text-sm font-medium text-gray-700">
                Can work with unaccepted orders:
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
                />
              </div>
              <div className="w-full my-3 flex justify-between">
                <span className="block text-sm font-medium text-gray-700">
                Can work with accepted orders:
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
                />
              </div>

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
          {generatedKey && (
            <div
              className={`${cartBlock.blurBack} flex justify-center fixed w-screen h-screen`}
            >
              <div
                className={`bg-gray-300 border-none rounded-3xl self-start w-3/5 px-14 py-7`}
              >
                {/* <form className="my-7"> */}
                <label className="block my-3">
                  <span className="block text-sm font-medium text-gray-700">
                      Generated admin key:
                  </span>
                  <div>
                  {generatedKey}
                  </div>
                </label>
                <div className="justify-center flex w-full">
                    <Link href={`/admin/${Akey}/${locale}/keys/`}>
                    <button
                  className={`${formStyle.SubmitButton} w-full py-2 rounded-lg`}>OK</button>
                    </Link>
                </div>
                {/* </form> */}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex justify-center">
<div className="mt-48 text-4xl">
            Admin key is incorrect
          </div>
        </div>
      )}
    </div>
  );
};

NewKey.getInitialProps = async ({ query: { key, locale } }) => {
  const keyRes = await fetch(`http://localhost:3000/api/keys/findKey/${key}`);

  const { success, keyData } = await keyRes.json();
  return { Akey: key, isKeyValid: success, keyData: keyData, locale: locale };
};
export default NewKey;
