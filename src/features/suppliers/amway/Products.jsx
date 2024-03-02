import { useEffect, useState } from "react";
import Card from "../../../components/Card";
import { ACTIONS, SERVER } from "../../../data/actions";
import useAuth from "../../../hooks/useAuth";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

const Products = ({ supplier }) => {
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const [products, setProducts] = useState([]);

  const fetchProduct = async () => {
    let activePage = 1;
    let response = await axiosPrivate.post(SERVER.PRODUCTS_SUPPLIER, {
      roles: auth?.roles,
      action: {
        type: ACTIONS.PRODUCTS_SEARCH,
        payload: { userName: auth?.user, supplier, activePage },
      },
    });
    if (response?.data) {
      setProducts(response.data.products);
    }
  };

  useEffect(() => {
    if (!!supplier && supplier !== "") {
      fetchProduct();
    }
  }, [supplier]);

  return (
    <div className="flex flex-wrap items-center justify-center">
      {products.map((prod, index) => {
        return <Card product={prod} key={crypto.randomUUID()} />;
      })}
    </div>
  );
};

export default Products;
