import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { changePasswordAdaptor, PasswordReq } from 'src/core/adaptors';
import { passwordPattern } from 'src/core/helpers/regexs';
import * as yup from 'yup';

const schema = yup
  .object()
  .shape({
    currentPass: yup.string().required('Current password is required'),
    newPass: yup
      .string()
      .required('Password is required')
      .notOneOf([yup.ref('currentPass'), null], 'Your password cannot be the same as the current password')
      .min(8, 'Minimum 8 characters')
      .matches(passwordPattern, 'Password complexity is week'),
    confirmPass: yup
      .string()
      .required('Confirm password is required')
      .oneOf([yup.ref('newPass')], 'Passwords must match'),
  })
  .required();

export const useManagePassword = () => {
  const { t: translate } = useTranslation();
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
    if (error)
      setOpenSnackbar({ open: true, type: 'error', message: 'Failed to change your password. Please try again' });
    if (data) setOpenSnackbar({ open: true, type: 'success', message: 'Your password was changed successfully!' });
    setLoading(false);
  };

  return {
    data: { translate, register, errors, loading, openSnackbar },
    operations: { handleSubmit, onSubmit, setOpenSnackbar },
  };
};
