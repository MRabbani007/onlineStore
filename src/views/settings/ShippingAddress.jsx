import AddressForm from "../../components/AddressForm";
import { Link } from "react-router-dom";

const ShippingAddress = () => {
  return (
    <div className="max-w-[1000px] mx-auto">
      <h1>Shipping Addresses</h1>
      <div className="flex flex-wrap gap-3 my-3">
        <div className="py-2 px-4 border-[1px] border-slate-300 hover:border-yellow-500 duration-200 rounded-md cursor-pointer">
          <p>Apt. 10, River Park Bld., 10th flr.</p>
          <p>Street 100, Atyrau, 10000</p>
        </div>
        <div className="py-2 px-4 border-[1px] border-slate-300 hover:border-yellow-500 duration-200 rounded-md">
          <p>Apt. 10, River Park Bld., 10th flr.</p>
          <p>Street 100, Atyrau, 10000</p>
        </div>
      </div>
      <AddressForm />
      <Link to="/settings" className="btn btn-slate mx-auto">
        Back to Settings
      </Link>
    </div>
  );
};

export default ShippingAddress;
