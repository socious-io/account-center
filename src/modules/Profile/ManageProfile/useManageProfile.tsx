import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {
  CurrentIdentity,
  Attachment,
  uploadMediaAdaptor,
  changeUserProfileAdaptor,
  changeOrgProfileAdaptor,
  getCurrentIdentityAdaptor,
} from 'src/core/adaptors';
import { UserType } from 'src/core/api';
import { emailPattern } from 'src/core/helpers/regexs';
import { translate } from 'src/core/helpers/utils';
import { RootState } from 'src/store';
import { setIdentityList } from 'src/store/reducers/identity.reducer';
import * as yup from 'yup';

import { Form, OrganizationSchema, UserSchema } from './index.types';

const getSchema = (type: UserType) => {
  const commonFields = {
    username: yup.string().required(translate('profile-fields.required-error')),
    email: yup
      .string()
      .email(translate('profile-fields.valid-email-error'))
      .matches(emailPattern, translate('profile-fields.valid-email-error'))
      .required(translate('profile-fields.required-error')),
  };

  return yup.object().shape(
    type === 'users'
      ? {
          ...commonFields,
          firstName: yup.string().required(translate('profile-fields.required-error')),
          lastName: yup.string().required(translate('profile-fields.required-error')),
        }
      : {
          ...commonFields,
          name: yup.string().required(translate('profile-fields.required-error')),
        },
  );
};

export const useManageProfile = () => {
  const dispatch = useDispatch();
  const identities = useSelector<RootState, CurrentIdentity[]>(state => {
    return state.identity.entities;
  });
  const currentIdentity = identities.find(identity => identity.current);
  const type = currentIdentity?.type || 'users';
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [uploadError, setUploadError] = useState('');
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState<{ type: 'error' | 'success' | ''; message: string }>({
    type: '',
    message: '',
  });
  const schema = getSchema(type);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Form>({
    mode: 'all',
    resolver: yupResolver(schema),
  });

  const initializeValues = () => {
    if (!currentIdentity) return;
    const initialVal = {
      firstName: currentIdentity?.firstName || '',
      lastName: currentIdentity?.lastName || '',
      name: currentIdentity.name,
      username: currentIdentity.username,
      email: currentIdentity?.email || '',
    };
    setAttachments([{ id: currentIdentity?.imgId || '', url: currentIdentity?.img || '' }]);
    reset(initialVal);
  };

  useEffect(() => initializeValues(), []);

  const onDropFiles = async (newFiles: File[]) => {
    newFiles.forEach(async (file: File) => {
      const { error, data } = await uploadMediaAdaptor(file);
      if (error) {
        setUploadError(error);
        return;
      }
      if (data) setAttachments([{ id: data.id, url: data.url }]);
    });
  };

  const onSubmit = async (formData: Form) => {
    if (!currentIdentity) return;
    setLoading(true);
    const { error, data } =
      type === 'users'
        ? await changeUserProfileAdaptor({ ...(formData as UserSchema), avatarId: attachments[0]?.id || '' })
        : await changeOrgProfileAdaptor(currentIdentity.id, {
            ...(formData as OrganizationSchema),
            logoId: attachments[0]?.id || '',
          });
    if (error) {
      setOpenSnackbar({ type: 'error', message: translate('profile-fields.error-message') });
      return;
    }
    if (data) {
      const filteredIdentities = identities.map(identity => {
        const mappedCurrentIdentity = getCurrentIdentityAdaptor(data);
        return identity.id === currentIdentity.id ? { ...mappedCurrentIdentity, current: true } : identity;
      });
      dispatch(setIdentityList(filteredIdentities));
      setOpenSnackbar({ type: 'success', message: translate('profile-fields.success-message') });
    }
    setLoading(false);
  };

  return {
    data: {
      translate,
      type,
      register,
      errors,
      attachments,
      avatarImg: attachments[0]?.url || '',
      uploadError,
      loading,
      openSnackbar,
    },
    operations: {
      handleSubmit,
      onSubmit,
      onDropFiles,
      setOpenSnackbar,
    },
  };
};
