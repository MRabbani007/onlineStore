import React from "react";
import useGlobal from "../../hooks/useGlobal";

const CardProductList = ({ product, idx, expand }) => {
  const { handleOpenEditProduct } = useGlobal();

  return (
    <tr
      onClick={() => {
        handleOpenEditProduct(product?.id);
      }}
    >
      <td>{idx + 1}</td>
      {expand.expandInfo ? (
        <>
          <td className="flex-1">{product.name}</td>
          <td>{product.supplier}</td>
          <td>{product.priceCents}</td>
          <td>{product.rating.stars}</td>
          <td>{product.rating.count}</td>
          <td>{product.reviews}</td>
        </>
      ) : (
        <>
          <td></td>
        </>
      )}
      {expand.expandImages ? (
        <>
          <td>{product.imagesBasedOn}</td>
          <td>{product.imagesNames[0]}</td>
          <td>{product.images[0][0]}</td>
        </>
      ) : (
        <td></td>
      )}
      {expand.expandProperties ? (
        <>
          <td>{product.properties[0]}</td>
          <td>{product.values[0]}</td>
        </>
      ) : (
        <td></td>
      )}
    </tr>
  );
};

export default CardProductList;
