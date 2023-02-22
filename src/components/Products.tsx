import axios from 'axios';
import React, { useState, useEffect } from 'react';


interface ApiData {
   
  id: number;
  name: string;
  email: string;
  price: number;
  
}

async function fetchData(): Promise<ApiData> {
  const response = await axios.get('https://fakestoreapi.com/products');
  return response.data;
}


function Products() {
  const [data, setData] = useState<ApiData | null>(null);

  useEffect(() => {
    async function getData() {
      const apiData = await fetchData();
      setData(apiData);
      console.log(apiData)
    }

    getData();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
     {data.map(item=>(
          <div key={item.id}> 
              <h1> {item.price} </h1>
            </div>
          
        ))}
    </div>
  );

}


export default Products;







