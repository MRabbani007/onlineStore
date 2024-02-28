// Imported Components
// Imported Data
import { countries, currencies, languages } from "../data/settingsData";

const SettingsPage = () => {
  return (
    <div className="w-full min-h-screen justify-center items-center pt-[60px]">
      <section className="w-[80%] px-5 py-5 mx-auto my-3 border-b-[1px] border-slate-400">
        <h2 className="text-xl font-semibold my-1">Language Settings</h2>
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
        <h2 className="text-xl font-semibold">Country / Region</h2>
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
      </section>
      <section className="w-[80%] px-5 py-5 mx-auto my-3 border-b-[1px] border-slate-400">
        <h2 className="text-xl font-semibold">Currency Settings</h2>
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
