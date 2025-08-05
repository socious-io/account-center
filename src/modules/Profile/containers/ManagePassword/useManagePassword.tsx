import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { changePasswordAdaptor, PasswordReq } from 'src/core/adaptors';
import { passwordPattern } from 'src/core/helpers/regexs';
import { translate } from 'src/core/helpers/utils';
import * as yup from 'yup';

const schema = yup
  .object()
  .shape({
    currentPass: yup.string().required(translate('password-fields.current-error')),
    newPass: yup
      .string()
      .required(translate('password-fields.create-error'))
      .notOneOf([yup.ref('currentPass'), null], translate('password-fields.create-same-current-error'))
      .min(8, translate('password-fields.create-min-character-error'))
      .matches(passwordPattern, translate('password-fields.create-complexity-error')),
    confirmPass: yup
      .string()
      .required(translate('password-fields.confirm-error'))
      .oneOf([yup.ref('newPass')], translate('password-fields.confirm-match-error')),
  })
  .required();

export const useManagePassword = () => {
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState<{ open: boolean; type: 'error' | 'success'; message: string }>({
    open: false,
    type: 'success',
    message: '',
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordReq>({
    mode: 'all',
    resolver: yupResolver(schema),
  });

  const onSubmit = async (formData: PasswordReq) => {
    setLoading(true);
    const { error, data } = await changePasswordAdaptor(formData);
    if (error) setOpenSnackbar({ open: true, type: 'error', message: translate('password-fields.error-message') });
    if (data) setOpenSnackbar({ open: true, type: 'success', message: translate('password-fields.success-message') });
    setLoading(false);
  };

  return {
    data: { translate, register, errors, loading, openSnackbar },
    operations: { handleSubmit, onSubmit, setOpenSnackbar },
  };
};
