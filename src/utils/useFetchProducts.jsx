import { useEffect, useState } from "react";

const useFetchData = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;

    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8081/api/products");
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        const data = await response.json();
        //console.log("first data received:", data);
        // console.log("In object data:", data.products);
        const products = data.products;
        //console.log("Products in object:", products);
        if (!ignore) {
          setData(products);
        }
        console.log(data);
      } catch (error) {
        if (!ignore) {
          setError(error);
        }
        // console.error("Fetch error:", error);
      }
    };

    fetchData();

    return () => {
      ignore = true;
    };
  }, []);

  return { data, error };
};

export default useFetchData;
