"use client"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const session = useSession();
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (session?.status === "unauthenticated") {
      router.push("/login");
    }
  }, [session, router]);

  const fetchData = async () => {
    try {
      const response = await fetch("https://dummyjson.com/products");
      const data = await response.json();
      setProducts(data.products);
      setIsLoading(false);
    } catch (error) {
      console.error("Error loading data:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (productId) => {
    try {
      await fetch(`https://dummyjson.com/products/${productId}`, {
        method: "DELETE",
      });
      // Remove the deleted product from the products array
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== productId)
      );
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const toggleEditing = (productId) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId
          ? { ...product, isEditing: !product.isEditing }
          : product
      )
    );
  };

  const handleTitleChange = (e, productId) => {
    const newTitle = e.target.value;
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId
          ? { ...product, title: newTitle }
          : product
      )
    );
  };

  const handleUpdate = async (productId) => {
    try {
      const productToUpdate = products.find(product => product.id === productId);
      if(productToUpdate.title.trim() == '') return 
      const response = await fetch(`https://dummyjson.com/products/${productId}`, {
        method: 'PUT', // or PATCH
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: productToUpdate.title
        })
      });

      if (response.ok) {
        const updatedProduct = await response.json();
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.id === productId ? { ...product, ...updatedProduct, isEditing: false } : product
          )
        );
      } else {
        console.error('Failed to update product:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center mt-2 text-white">Loading...</div>
    );
  }

  if (session.status == "authenticated") {
    return (
      <div className="mx-20 mt-2 bg-transparent">
        <h1 className="text-2xl font-semibold mb-4 w-[300px] mx-auto">
          Product List
        </h1>
        <ul className="space-y-4">
          {products.length
            ? products.map((product) => (
                <li key={product.id} className="bg-pink-50 p-4 rounded shadow">
                  <p className="text-gray-500">
                    Title: {product.isEditing ? (
                      <input
                        type="text"
                        value={product.title}
                        onChange={(e) => handleTitleChange(e, product.id)}
                      />
                    ) : (
                      product.title
                    )}
                    {product.isEditing && (
                      <button onClick={() => handleUpdate(product.id)} className="ml-2">Save</button>
                    )}
                  </p>
                  <p className="text-gray-500">Description: {product.description}</p>
                  <div className="mt-2">
                    <button
                      className="text-blue-500 mr-2"
                      onClick={() => toggleEditing(product.id)}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="text-red-500"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))
            : "No data found"}
        </ul>
      </div>
    );
  }
};

export default Dashboard;
