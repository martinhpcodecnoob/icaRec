"use client";

import React, { useState, useEffect } from "react";
import { Controller } from "react-hook-form";
import { fetchCountries } from "../../../utils/apiServices";

const PhoneSection = ({ control, errors, setValue, getValues }) => {
  const [showPhoneInput, setshowPhoneInput] = useState(false);
  const [countries, setCountries] = useState([]);
  const [countryCode, setCountryCode] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [loading, setLoading] = useState(true);

  const countriesOptions = (
    <>
      <option value="default">Selecciona un país</option>
      {countries.map((country, index) => {
        return(
          <option key={`country-${country.code}-${index}`} value={country.code}>
            {country.name}
          </option>
        )
      })}
    </>
  );

  useEffect(() => {
    fetchCountries()
      .then((data) => {
        setCountries(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
        setCountries([{ code: "PE", name: "Perú", callingCodes: ["51"] }]);
        setLoading(false);
      });
  }, []);

  const handleCountryChange = (e) => {
    const selectedCode = e.target.value;
    // console.log('selectedCode: ',selectedCode);
    const selectedCountry = countries.find(
      (country) => {
        return country.name === selectedCode
      }
    );
    if (selectedCountry) {
      setSelectedCountry(selectedCode);
      setCountryCode((prevCountryCode) => {
        const newCountryCode = `+${selectedCountry.callingCodes[0]}`;
        setValue("phoneCode", newCountryCode);
        return newCountryCode;
      });

      setshowPhoneInput(true);
    }
  };

  return (
    <div className="w-full mb-2">
      <div className="grid grid-cols-10">
        {showPhoneInput ? (
          <>
            <div className="col-span-2 px-3 py-1">
              <span className="text-[#100e80] font-semibold">Celular</span>
            </div>
            <div className="col-span-2 col-start-3">
              <button
                className={`border rounded-full px-3 py-1 text-[#100e80] font-semibold bg-[#f3ba1a] ${
                  showPhoneInput ? "" : "hidden"
                }`}
                onClick={() => {
                  setshowPhoneInput(false);
                  setValue("phoneCode", "");
                  setValue("phoneNumber", "");
                }}
              >
                {countryCode}
              </button>
            </div>
            <div className="col-span-6">
              <Controller
                name="phoneNumber"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <input
                    {...field}
                    name="phoneNumber"
                    className="border rounded-full py-1 px-3 placeholder-white text-white bg-[#f3ba1a] w-full"
                    placeholder="Número de celular"
                  />
                )}
              />
            </div>
            {errors.phoneNumber && showPhoneInput && (
              <p className="col-span-10 text-red-500">
                {errors.phoneNumber.message}
              </p>
            )}
          </>
        ) : (
          <>
            <div className="col-span-10">
              <Controller
                name="phoneNumber"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <select
                    {...field}
                    name="phoneNumber"
                    className="border rounded-full py-1 px-3 bg-[#f3ba1a] text-[#100e80] font-semibold w-full"
                    onChange={(e) => {
                      handleCountryChange(e);
                    }}
                    disabled={loading}
                  >
                    {loading ? (
                      <option value="loading">Cargando...</option>
                    ) : (
                      countriesOptions
                    )}
                  </select>
                )}
              />
            </div>
            {errors.selectedCountry && !showPhoneInput && (
              <p className="col-span-10 text-red-500">Selecciona un país</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PhoneSection;
