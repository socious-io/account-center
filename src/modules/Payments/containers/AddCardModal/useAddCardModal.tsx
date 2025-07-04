import { loadStripe, Stripe, StripeCardElement } from '@stripe/stripe-js';
import { useState, useEffect } from 'react';
import { config } from 'src/config';
import { addCardAdaptor, Card } from 'src/core/adaptors';
import { translate } from 'src/core/helpers/utils';

export const useAddCardModal = (open: boolean, handleClose: () => void, onAddCard: (newCard: Card) => void) => {
  const [stripe, setStripe] = useState<Stripe | null>();
  const [card, setCard] = useState<StripeCardElement | null>();
  const [completedInfoCard, setCompletedInfoCard] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const style = {
    base: {
      color: '#32325D',
      fontWeight: 500,
      fontFamily: 'Source Code Pro, Consolas, Menlo, monospace',
      fontSize: '16px',
      fontSmoothing: 'antialiased',

      '::placeholder': {
        color: '#CFD7DF',
      },
      ':-webkit-autofill': {
        color: '#e39f48',
      },
    },
    invalid: {
      color: '#E25950',

      '::placeholder': {
        color: '#FFCCA5',
      },
    },
  };

  useEffect(() => {
    const initStripe = async () => {
      const currentStripe = await loadStripe(config.stripePublicKey);
      setStripe(currentStripe);
    };
    initStripe();
  }, []);

  useEffect(() => {
    if (stripe && open) {
      const elements = stripe.elements();
      const card = elements.create('card', { style, hidePostalCode: true });
      card?.mount('#card-element');
      card?.on('change', event => {
        setCompletedInfoCard(event.complete);
      });
      setCard(card);
    }
  }, [stripe, open]);

  const onSubmit = async () => {
    if (!card || !stripe) return;

    const { error: createTokenError, token: createdToken } = await stripe.createToken(card);
    if (createTokenError) {
      setErrorMessage(createTokenError.message || translate('payment-cards.failed'));
    }
    if (!createdToken) return;

    const { error, data } = await addCardAdaptor(createdToken.id);
    if (error) {
      setErrorMessage(error);
      return;
    }
    if (data) {
      onAddCard(data);
      handleClose();
    }
  };

  return {
    data: { completedInfoCard, errorMessage },
    operations: {
      setErrorMessage,
      onSubmit,
    },
  };
};
