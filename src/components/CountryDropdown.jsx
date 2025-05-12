import React, { useState } from "react";
import Select from "react-select";
import { getNames } from "country-list";

const CountrySelector = () => {
  const countryOptions = getNames().map((country) => ({
    value: country,
    label: country,
  }));

  // Set India as default
  const defaultCountry = countryOptions.find(
    (country) => country.label === "India"
  );

  const [selectedCountry, setSelectedCountry] = useState(defaultCountry);

  return (
    <div className=" w-full md:w-[85%]  ">
      <label className="block text-[1.8rem] md:text-[1.5rem] font-semibold text-gray-700">
        Country or Region
      </label>
      <Select
        options={countryOptions}
        value={selectedCountry}
        onChange={setSelectedCountry}
        isSearchable
        className="text-[1.8rem] md:text-[1.5rem] p-2 ml-[-5px] "
      />
    </div>
  );
};

export default CountrySelector;
