import Link from 'next/link';
import { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import { useRouter } from 'next/router';

const NewProduct = () => {
    const [form, setForm] = useState({ title: '', description: '', price: 0.0, category: '', photo: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});

    const router = useRouter();

    useEffect(() => {
        if (isSubmitting) {
            if (Object.keys(errors).length === 0) {
                createProduct();
                console.log("F");
            }
            else {
                setIsSubmitting(false);
            }
        }
    }, [errors])

    const createProduct = async () => {
        try {
            const res = await fetch('http://localhost:3000/api/products/', {
                method: 'POST',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)});
            router.push("/");
        }catch(error){
            console.log(console.error());

        }
}

const handleSubmit = (e) => {
    console.log("FFF");
    e.preventDefault();
    let errs = validate();
    console.log(errs);
    setErrors(errs);
    setIsSubmitting(true);
};
const handleChange = (e) => {
    setForm({
        ...form,
        [e.target.name]: e.target.value
    })
};
const validate = () => {
    let err = {};
    if (!form.description) {
        err.description = "Description is required"
    }
    if (parseFloat(form.price)<0.0) {
        err.price = "Price is required"
    }
    console.log(form.category)
    if (!form.category) {
        err.price = "Category is required"
    }
    if (!form.photo) {
        err.photo = "Photo url is required"
    }
    // TODO: length
    return err;
}

return (
    <div className="flex mt-10 justify-center">
        <div
            className={`bg-gray-300 border-none rounded-3xl self-start w-3/5 px-14`}
        >
            <form className="my-7" onSubmit={handleSubmit}>
                <label className="block my-3">
                    <span className="block text-sm font-medium text-gray-700">
                        Title:
                    </span>
                    <input
                        name='title'
                        onChange={handleChange}
                        type="text"

                        className="mt-1 block w-full px-3 py-2 bg-white rounded-lg text-sm placeholder-gray-400 invalid:border-pink-500 invalid:text-pink-600"
                        placeholder={`Enter title ...`}
                    />
                </label>
                <label className="block my-3">
                    <span className="block text-sm font-medium text-gray-700">
                        Description:
                    </span>
                    <input
                        name='description'
                        onChange={handleChange}
                        type="text"
                        required
                        className="mt-1 block w-full px-3 py-2 bg-white rounded-lg text-sm placeholder-gray-400 invalid:border-pink-500 invalid:text-pink-600"
                        placeholder={`Enter description...`}
                    />
                </label>
                <label className="block my-3">
                    <span className="block text-sm font-medium text-gray-700">
                        Price:
                    </span>
                    <input
                        name='price'
                        onChange={handleChange}
                        type="text"
                        className="mt-1 block w-full px-3 py-2 bg-white rounded-lg text-sm placeholder-gray-400 invalid:border-pink-500 invalid:text-pink-600"
                        placeholder={`Enter price...`}
                        required
                    />
                </label>
                <label className="block my-3">
                    <span className="block text-sm font-medium text-gray-700">
                        Category:
                    </span>
                    <select
                        name='category'
                        onChange={handleChange}
                        className="mt-1 block w-full h-9 px-3 py-2 bg-white rounded-lg text-sm placeholder-gray-400 invalid:border-pink-500 invalid:text-pink-600"
                        required
                    >
                        {/* TODO: chooseType (get request) */}
                        <option>Cats</option>
                        <option>Dogs</option>
                        <option>Birds</option>
                        <option>Hamsters</option>
                    </select>
                </label>
                <label className="block my-3">
                    <span className="block text-sm font-medium text-gray-700">
                        Photo URL:
                    </span>
                    <input
                        name='photo'
                        onChange={handleChange}
                        type="text"
                        className="mt-1 block w-full px-3 py-2 bg-white rounded-lg text-sm placeholder-gray-400 invalid:border-pink-500 invalid:text-pink-600"
                        placeholder={`Enter photo url...`}
                        required
                    />
                </label>
                <div className="justify-center flex w-full">
                    <button
                        type="submit"
                        className={`w-full py-2 rounded-lg`}
                    >Create
                    </button>
                </div>
            </form>
        </div>
    </div >
)
}
export default NewProduct;