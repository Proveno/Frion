import fetch from 'isomorphic-unfetch';
import Link from "next/link";
import Image from "next/image";

const Index = ({ products }) => {
    return (
        <div>
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

Index.getInitialProps = async () => {
    const res = await fetch('http://localhost:3000/api/products/');
    console.log(res);
    const { data } = await res.json();

    return { products: data };
}

export default Index