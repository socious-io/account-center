import { useState } from 'react';
import { getStripeLinkAdaptor, OptionType } from 'src/core/adaptors';

export const useAddPayoutAccountModal = () => {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [stripeLink, setStripeLink] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const onSelectCountry = (option: OptionType) => {
    if (option.value === selectedCountry) return;
    else {
      setSelectedCountry(option.value);
      generateStripeLink(selectedCountry);
    }
  };

  const generateStripeLink = async (country: string) => {
    const { error, data } = await getStripeLinkAdaptor(country, window.location.href);
    if (error) {
      setErrorMessage(error);
      return;
    }
    if (data) setStripeLink(data);
  };

  return {
    data: {
      stripeLink,
      errorMessage,
    },
    operations: { onSelectCountry, setErrorMessage },
  };
};
