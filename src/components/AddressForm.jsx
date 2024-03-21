import React, { useState } from "react";

const AddressForm = () => {
  const [page, setPage] = useState(0);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    let shippingAddress = {
      firstName,
      lastName,
      address,
      country,
      city,
      state,
      zipCode,
    };
  };

  return (
    <form onSubmit={handleSubmit} className="shipping-form">
      <h2>Create New Address</h2>
      <div class="fields fields--2">
        <label className="field">
          <span className="field__label" htmlFor="firstName">
            First Name
          </span>
          <input
            type="text"
            id="firstName"
            name="firstName"
            placeholder="First Name"
            className="field__input"
            required
            autoFocus
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
        <label className="field">
          <span className="field__label" htmlFor="lastName">
            Last Name
          </span>
          <input
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Last Name"
            className="field__input"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
      </div>
      <label className="field">
        <span className="field__label" htmlFor="address">
          Address
        </span>
        <input
          type="text"
          id="address"
          name="address"
          placeholder="Address"
          className="field__input"
          required
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </label>
      <label className="field">
        <span className="field__label" htmlFor="country">
          Country
        </span>
        <select
          className="field__input"
          id="country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        >
          <option value="" selected>
            Select Country
          </option>
          <option value="unitedstates">United States</option>
        </select>
      </label>
      <div className="fields fields--3">
        <label className="field">
          <span className="field__label" htmlFor="zipcode">
            Zip code
          </span>
          <input
            className="field__input"
            type="text"
            id="zipcode"
            name="zipcode"
            placeholder="Zip Code"
            required
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
          />
        </label>
        <label className="field">
          <span className="field__label" htmlFor="city">
            City
          </span>
          <input
            className="field__input"
            type="text"
            id="city"
            name="city"
            placeholder="City"
            required
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </label>
        <label className="field">
          <span className="field__label" htmlFor="state">
            State
          </span>
          <select
            className="field__input"
            id="state"
            value={state}
            onChange={(e) => setState(e.target.value)}
          >
            <option value="">Select State</option>
            <option value="newstate">New State</option>
          </select>
        </label>
        <button className="btn btn-yellow mx-auto">Add Address</button>
      </div>
    </form>
  );
};

export default AddressForm;
