import { useEffect, useState } from 'react';

export const useAddPayoutAccountModal = () => {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [stripeLink, setStripeLink] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (selectedCountry) generateStripeLink(selectedCountry);
  }, [selectedCountry]);

  const onSelectCountry = option => {
    if (option.value !== selectedCountry) setStripeLink('');
    setSelectedCountry(option.value);
  };

  const generateStripeLink = async (country: string) => {
    //FIXME: ask BE about country
    console.log(country);
    // try {
    //   const result = await getStripeLink({
    //     country: country,
    //     is_jp: currency === 'JPY',
    //     redirect_url: window.location.href,
    //   });
    //   const {
    //     link: { url },
    //   } = result;
    //   setStripeLink(url);
    // } catch (err: any) {
    //   setErrorMsg(err?.response?.data.error || err?.message);
    //   setOpenErrorModal(true);
    // }
  };

  return {
    data: {
      stripeLink,
      errorMessage,
    },
    operations: { onSelectCountry, setErrorMessage },
  };
};
