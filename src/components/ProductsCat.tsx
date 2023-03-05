import { useState, useEffect } from "react";
import axios from "axios";


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
};


const CategoryButton = ({ category, onClick }: CategoryButtonProps) => {
  return (
    <button onClick={onClick}>
      {category.charAt(0).toUpperCase() + category.slice(1)}
    </button>
  );
};


const ProductDisplay = () => {
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
      <div>
        <CategoryButton  category="all" onClick={() => setFilteredProducts(products) } />
        <CategoryButton category="electronics" onClick={() => handleCategoryClick("electronics")} />
        <CategoryButton category="jewelery" onClick={() => handleCategoryClick("jewelery")} />
        <CategoryButton category="men's clothing" onClick={() => handleCategoryClick("men's clothing")} />
        <CategoryButton category="women's clothing" onClick={() => handleCategoryClick("women's clothing")} />
      </div>
      <div>
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


export default ProductDisplay;