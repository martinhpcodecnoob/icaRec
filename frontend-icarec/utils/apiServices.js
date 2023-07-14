export const fetchCountries = () => {
    return fetch("https://restcountries.com/v2/all?fields=name,callingCodes")
      .then((response) => response.json())
      .then((data) => data);
  }