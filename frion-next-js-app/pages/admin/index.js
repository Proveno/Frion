import Link from "next/link";
import { useState, useEffect } from "react";
import fetch from "isomorphic-unfetch";
import { useRouter } from "next/router";
import Image from "next/image";
import formStyle from "../../styles/requestForm.module.css";

const adminLogin = () => {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(false);
  const [key, setKey] = useState("");

  useEffect(() => {
    if (isSubmitting) {
      console.log("Start");
      if (key) {
        setError(false);
        checkKey();
      } else {
          setError(true);
      }
    }
    setIsSubmitting(false);
  });

  const checkKey = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/keys/${key}`, {
        method: "GET",
      });
      const { success } = await res.json();
      if(success){
        router.push(`/admin/${key}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="flex mt-10 justify-center px-10">
        <div
          className={`bg-gray-300 border-none rounded-3xl self-start w-3/5 px-14 py-7`}
        >
          {/* <form className="my-7"> */}
          <label className="block my-3">
            <span className="block text-sm font-medium text-gray-700">
              Admin key:
            </span>
            <input
              onChange={(e) => {
                setKey(e.target.value);
              }}
              type="text"
              className="mt-1 block w-full px-3 py-2 bg-white rounded-lg text-sm placeholder-gray-400 invalid:border-pink-500 invalid:text-pink-600"
              placeholder={`Enter admin key ...`}
            />
                        {error && (
              <span className="block text-xs font-medium text-red-500">
                  Key is required
              </span>
          )}
          </label>
          <div className="justify-center flex w-full">
            <button
              onClick={() => {
                setIsSubmitting(true);
              }}
              className={`${formStyle.SubmitButton} w-full py-2 rounded-lg`}
            >
              Enter
            </button>
          </div>
          {/* </form> */}
        </div>
      </div>
    </div>
  );
};
export default adminLogin;
