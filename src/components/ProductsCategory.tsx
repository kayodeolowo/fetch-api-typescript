import { useState, useEffect } from "react";
import axios from "axios";
import classNames from "classnames";


type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};


type CategoryButtonProps = {
  category: string;
  onClick: () => void;
  isSelected: boolean;
};


const CategoryButton = ({ category, onClick, isSelected }: CategoryButtonProps) => {
  const buttonClass = classNames("px-4 py-2 rounded-md text-white font-medium", {
    "bg-red-500": isSelected,
    "bg-gray-500": !isSelected,
  });

  return (
    <button onClick={onClick} className={buttonClass}>
      {category.charAt(0).toUpperCase() + category.slice(1)}
    </button>
  );
};


const ProductsCategory = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  useEffect(() => {
    axios.get<Product[]>("https://fakestoreapi.com/products").then((res) => {
      setProducts(res.data);
      setFilteredProducts(res.data);
    });
  }, []);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setFilteredProducts(
      products.filter((product) => product.category === category)
    );
  };

  return (
    <div>
      <div className="flex justify-center">
        <CategoryButton
          category="all"
          onClick={() => setFilteredProducts(products)}
          isSelected={selectedCategory === ""}
        />
        <CategoryButton
          category="electronics"
          onClick={() => handleCategoryClick("electronics")}
          isSelected={selectedCategory === "electronics"}
        />
        <CategoryButton
          category="jewelery"
          onClick={() => handleCategoryClick("jewelery")}
          isSelected={selectedCategory === "jewelery"}
        />
        <CategoryButton
          category="men's clothing"
          onClick={() => handleCategoryClick("men's clothing")}
          isSelected={selectedCategory === "men's clothing"}
        />
        <CategoryButton
          category="women's clothing"
          onClick={() => handleCategoryClick("women's clothing")}
          isSelected={selectedCategory === "women's clothing"}
        />
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        {filteredProducts.map((product) => (
          <div key={product.id}>
            <img className="h-10" src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <p>{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};




export default ProductsCategory;