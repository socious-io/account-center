import { getAllISOCodes } from 'iso-country-currency';

export const COUNTRIES = getAllISOCodes().map(country => {
  return {
    id: country.iso,
    value: country.iso,
    label: country.countryName,
  };
});
