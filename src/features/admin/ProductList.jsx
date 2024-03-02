import { useEffect, useState } from "react";
import { ACTIONS, SERVER } from "../../data/actions";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import CardProductList from "./CardProductList";

const ProductList = ({ activePage, handleProductCount }) => {
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [expandInfo, setExpandInfo] = useState(true);
  const [expandImages, setExpandImages] = useState(true);
  const [expandProperties, setExpandProperties] = useState(true);
  const [expandDetails, setExpandDetails] = useState(true);

  const [colsInfo, setColsInfo] = useState(6);
  const [colsImages, setColsImages] = useState(3);
  const [colsProperties, setColsProperties] = useState(2);
  const [colsDetails, setColsDetails] = useState(0);

  const handleExpand = (section) => {
    switch (section) {
      case "info": {
        setExpandInfo(!expandInfo);
        setColsInfo((prev) => {
          if (prev === 1) return 6;
          if (prev === 6) return 1;
        });
        break;
      }
      case "images": {
        setExpandImages(!expandImages);
        setColsImages((prev) => {
          if (prev === 1) return 3;
          if (prev === 3) return 1;
        });
        break;
      }
      case "properties": {
        setExpandProperties(!expandProperties);
        setColsProperties((prev) => {
          if (prev === 1) return 2;
          if (prev === 2) return 1;
        });
        break;
      }
      case "details": {
      }
      default: {
      }
    }
  };

  const fetchProduct = async () => {
    let searchCat = "";
    let searchQuery = "";

    setLoading(true);
    try {
      let response = await axiosPrivate.post(SERVER.PRODUCTS_SEARCH, {
        roles: auth?.roles,
        action: {
          type: ACTIONS.PRODUCTS_SEARCH,
          payload: { userName: auth?.user, searchCat, searchQuery, activePage },
        },
      });
      if (response?.data) {
        const { products, count } = response.data;
        setProducts(products);
        handleProductCount(count);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [activePage]);

  return (
    <div>
      <table className="w-full">
        <thead>
          <tr>
            <th>SN</th>
            <th
              colSpan={colsInfo}
              onClick={() => handleExpand("info")}
              className="bg-red-300"
            >
              Info
            </th>
            <th
              colSpan={colsImages}
              onClick={() => handleExpand("images")}
              className="bg-blue-300"
            >
              Images
            </th>
            <th
              colSpan={colsProperties}
              onClick={() => handleExpand("properties")}
              className="bg-yellow-300"
            >
              Properties
            </th>
          </tr>
          <tr>
            {/* SN */}
            <th></th>
            {/* Product Information */}
            {expandInfo ? (
              <>
                <th>Name</th>
                <th>Supplier</th>
                <th>Price</th>
                <th>Stars</th>
                <th>Ratings</th>
                <th>Reviews</th>
              </>
            ) : (
              <th></th>
            )}
            {/* Product Images */}
            {expandImages ? (
              <>
                <th>Image Ref</th>
                <th>Image Names</th>
                <th>Image Values</th>
              </>
            ) : (
              <th></th>
            )}
            {/* Product Properties */}
            {expandProperties ? (
              <>
                <th>Properties</th>
                <th>Values</th>
              </>
            ) : (
              <th></th>
            )}
            {/* Product Details */}
          </tr>
        </thead>
        <tbody>
          {!loading &&
            Array.isArray(products) &&
            products.map((product, index) => {
              return (
                <CardProductList
                  product={product}
                  idx={index}
                  key={product.id}
                  expand={{
                    expandInfo,
                    expandImages,
                    expandProperties,
                    expandDetails,
                  }}
                />
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
