import { useState } from "react";
import ProductList from "../../features/admin/ProductList";
import Paginnation from "../../components/Paginnation";
import { ITEMS_PER_PAGE } from "../../data/utils";

const AdminProducts = () => {
  const [activePage, setActivePage] = useState(1);
  const [pages, setPages] = useState(1);

  const handlePage = (page) => {
    setActivePage(page);
  };

  const handleProductCount = (count) => {
    setPages(Math.ceil(count / ITEMS_PER_PAGE));
  };

  return (
    <div>
      <Paginnation
        pages={pages}
        activePage={activePage}
        handlePage={handlePage}
      />

      <ProductList
        activePage={activePage}
        handleProductCount={handleProductCount}
      />

      <Paginnation
        pages={pages}
        activePage={activePage}
        handlePage={handlePage}
      />
    </div>
  );
};

export default AdminProducts;
