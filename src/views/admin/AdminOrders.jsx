import { useEffect, useState } from "react";
import { ITEMS_PER_PAGE } from "../../data/utils";
import Paginnation from "../../components/Paginnation";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";
import OrderList from "../../features/admin/OrderList";
import { ACTIONS, SERVER } from "../../data/actions";

const AdminOrders = () => {
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  const [activePage, setActivePage] = useState(1);
  const [pages, setPages] = useState(1);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const handlePage = (page) => {
    setActivePage(page);
  };

  const handleProductCount = (count) => {
    setPages(Math.ceil(count / ITEMS_PER_PAGE));
  };

  const fetchOrders = async () => {
    setLoading(true);
    try {
      let response = await axiosPrivate.post(SERVER.ADMIN_ORDER_GET, {
        roles: auth?.roles,
        action: {
          type: ACTIONS.ADMIN_ORDER_GET,
          payload: { userName: auth?.user },
        },
      });
      if (response?.data) {
        setOrders(response.data);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [activePage]);

  return (
    <div>
      <Paginnation
        pages={pages}
        activePage={activePage}
        handlePage={handlePage}
      />
      <OrderList orders={orders} loading={loading} />
    </div>
  );
};

export default AdminOrders;
