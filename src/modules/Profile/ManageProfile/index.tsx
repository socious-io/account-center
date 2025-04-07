import { CircularProgress, Divider } from '@mui/material';
import Avatar from 'src/modules/General/components/Avatar';
import Button from 'src/modules/General/components/Button';
import FileUploader from 'src/modules/General/components/FileUploader';
import Icon from 'src/modules/General/components/Icon';
import Input from 'src/modules/General/components/Input';
import CustomSnackbar from 'src/modules/General/components/Snackbar';
import variables from 'src/styles/constants/_exports.module.scss';

import styles from './index.module.scss';
import { useManageProfile } from './useManageProfile';

const ManageProfile = () => {
  const {
    data: { translate, type, register, errors, attachments, avatarImg, uploadError, loading, openSnackbar },
    operations: { handleSubmit, onSubmit, onDropFiles, setOpenSnackbar },
  } = useManageProfile();

  return (
    <>
      <form className={styles['container']} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles['upload']}>
          <Avatar img={avatarImg} type="organizations" size="4rem" />
          <FileUploader
            files={attachments}
            onDropFiles={onDropFiles}
            fileTypes={['PNG', 'JPG', 'GIF']}
            maxSize={2}
            showFileName={false}
            error={uploadError}
          />
        </div>
        {type === 'users' ? (
          <div>
            <div className={styles['inputs']}>
              <Input
                register={register}
                id="firstName"
                name="firstName"
                label={translate('profile-fields.first-name')}
                placeholder={translate('profile-fields.first-name')}
                containerClassName="flex-1"
              />
              <Input
                register={register}
                id="lastName"
                name="lastName"
                label={translate('profile-fields.last-name')}
                placeholder={translate('profile-fields.last-name')}
                containerClassName="flex-1"
              />
            </div>
            {(errors['firstName']?.message || errors['lastName']?.message) && (
              <p className={styles['inputs__error']}>
                {errors['firstName']?.message?.toString() || errors['lastName']?.message?.toString()}
              </p>
            )}
          </div>
        ) : (
          <Input
            register={register}
            id="name"
            name="name"
            label={translate('profile-fields.organization-name')}
            placeholder={translate('profile-fields.organization-name')}
            errors={errors['name']?.message ? [errors['name'].message.toString()] : undefined}
          />
        )}
        <Input
          register={register}
          id="username"
          name="username"
          label={translate('profile-fields.username')}
          placeholder={translate('profile-fields.username')}
          errors={errors['username']?.message ? [errors['username'].message.toString()] : undefined}
        />
        <Input
          register={register}
          id="email"
          name="email"
          label={translate('profile-fields.email')}
          placeholder={translate('profile-fields.email')}
          startIcon={<Icon name="mail-01" fontSize={20} color={variables.color_grey_500} />}
          errors={errors['email']?.message ? [errors['email'].message.toString()] : undefined}
        />
        <Divider className="mx-[-1.5rem] hidden md:block" />
        <Button color="primary" type="submit" customStyle="self-end" disabled={loading}>
          {loading && <CircularProgress size="16px" sx={{ color: variables.color_white }} />}
          {translate('profile-fields.save-btn')}
        </Button>
      </form>
      <CustomSnackbar
        open={!!openSnackbar.type}
        onClose={() => setOpenSnackbar({ type: '', message: '' })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        containerClassName={`${styles['snackbar']} ${openSnackbar.type === 'error' ? styles['snackbar--error'] : styles['snackbar--success']}`}
        contentClassName={`${styles['snackbar__content']} ${openSnackbar.type === 'error' ? styles['snackbar__content--error'] : styles['snackbar__content--success']}`}
        autoHideDuration={5000}
      >
        <>
          <Icon
            name={openSnackbar.type === 'error' ? 'alert-circle' : 'tick'}
            color={openSnackbar.type === 'error' ? variables.color_error_700 : variables.color_primary_700}
          />
          {openSnackbar.message}
        </>
      </CustomSnackbar>
    </>
  );
};

export default ManageProfile;
