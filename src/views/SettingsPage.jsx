// Imported Components

// Imported Data
import { Link } from "react-router-dom";
import { countries, currencies, languages } from "../data/settingsData";

const SettingsPage = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <header className="md:w-[80%]">
        <h1>Settings</h1>
      </header>
      <section className="md:w-[80%] px-5 py-5 mx-auto my-3 border-b-[1px] border-slate-400">
        <h2 className="text-xl font-semibold my-2">Language Settings</h2>
        <p className="my-1">
          Select the language you prefer for browsing, shopping, and
          communications.
        </p>
        <select
          name="language"
          id=""
          className="border-[1px] border-slate-400 outline-none my-2 px-2 py-1"
        >
          {languages.map((language, index) => {
            return (
              <option value={language} key={index}>
                {language}
              </option>
            );
          })}
        </select>
      </section>
      <section className="w-[80%] px-5 py-5 mx-auto my-3 border-b-[1px] border-slate-400">
        <h2 className="text-xl font-semibold my-2">Country / Region</h2>
        <p className="my-1">Select location you want to ship to.</p>
        <select
          name="location"
          id=""
          className="border-[1px] border-slate-400 outline-none my-2 px-2 py-1"
        >
          {countries.map((country, index) => {
            return (
              <option value={country.name} key={index}>
                {country.name}
              </option>
            );
          })}
        </select>
        <h2>Shipping Address</h2>
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
        <Link to="/shippingAddress" className="btn btn-blue">
          Add Delivery Address
        </Link>
      </section>
      <section className="w-[80%] px-5 py-5 mx-auto my-3 border-b-[1px] border-slate-400">
        <h2 className="text-xl font-semibold my-2">Currency</h2>
        <p className="my-1">Select the currency you want to shop with.</p>
        <select
          name="currencies"
          id=""
          className="border-[1px] border-slate-400 outline-none my-2 px-2 py-1"
        >
          {currencies.map((currency, index) => {
            return (
              <option value={currency} key={index}>
                {currency}
              </option>
            );
          })}
        </select>
      </section>
      <section className="w-[80%] px-5 py-5 mx-auto my-3 border-b-[1px] border-slate-400">
        <h2 className="text-xl font-semibold my-2">Account Settings</h2>
        <Link to="/userAccount" className="btn btn-slate">
          View Account Details
        </Link>
      </section>
      <section className="w-[80%] px-5 py-5 mx-auto my-3">
        <button className="bg-slate-300 rounded-md px-4 py-2 mx-2">
          Cancel
        </button>
        <button className="bg-yellow-500 rounded-md px-4 py-2 mx-2">
          Save Changes
        </button>
      </section>
    </div>
  );
};

export default SettingsPage;
