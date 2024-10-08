import { useState, useEffect } from "react";

const useFetchCategories = (url) => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;

    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://ecommerce-api-k4pz.onrender.com/api/categories"
        );
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        const data = await response.json();
        const categoryList = data.categories;
        if (!ignore) {
          setCategories(categoryList);
        }
        //console.log(categories);
      } catch (error) {
        if (!ignore) {
          setError(error);
        }
        console.error("Fetch error:", error);
      }
    };

    fetchData();

    return () => {
      ignore = true;
    };
  }, [url]);

  return { categories };
};

export default useFetchCategories;
