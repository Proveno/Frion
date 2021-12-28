import fetch from 'isomorphic-unfetch';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from "next/image";

const Product = ({ product }) => {
    const [confirm, setConfirm] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(()=>{
        if(isDeleting){
            deleteProduct();
        }
    }, [isDeleting])
    const router = useRouter();


    const deleteProduct = async () => {
        const productId = router.query.id;
        try{
            const deleted = await fetch(`http://localhost:3000/api/products/${productId}`,{
                method: "Delete"
            })
            router.push("/");
        }catch(error){
            console.log(error);
        }
    }


    const handleDelete = async ()=>{
        setIsDeleting(true);

    }


    return (
        <div>
            <div>
                <span>Title: {product.title}</span>
                <p>Description: {product.description}</p>
                <span>Price: {`${parseFloat(product.price["$numberDecimal"])}`}</span>
                <Image src={product.photo} width={500} height={500}></Image>
                <button onClick={handleDelete}>DELETE</button>
            </div>
        </div>
    )
}

Product.getInitialProps = async ({ query: { id } }) => {
    const res = await fetch(`http://localhost:3000/api/products/${id}`);
    const { data } = await res.json();

    return { product: data}
}

export default Product;