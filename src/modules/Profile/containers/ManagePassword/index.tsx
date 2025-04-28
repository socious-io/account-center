import { CircularProgress } from '@mui/material';
import Button from 'src/modules/General/components/Button';
import Icon from 'src/modules/General/components/Icon';
import Input from 'src/modules/General/components/Input';
import CustomSnackbar from 'src/modules/General/components/Snackbar';
import variables from 'src/styles/constants/_exports.module.scss';

import styles from './index.module.scss';
import { useManagePassword } from './useManagePassword';

const ManagePassword = () => {
  const {
    data: { translate, register, errors, loading, openSnackbar },
    operations: { handleSubmit, onSubmit, setOpenSnackbar },
  } = useManagePassword();

  return (
    <>
      <form className={styles['container']} onSubmit={handleSubmit(onSubmit)}>
        <Input
          register={register}
          id="currentPass"
          name="currentPass"
          type="password"
          label={translate('password-fields.current')}
          placeholder={translate('password-fields.current-placeholder')}
          errors={errors['currentPass']?.message ? [errors['currentPass'].message.toString()] : undefined}
        />
        <Input
          register={register}
          id="newPass"
          name="newPass"
          autoComplete="new-password"
          type="password"
          label={translate('password-fields.create')}
          placeholder={translate('password-fields.create-placeholder')}
          hints={[
            {
              hide: false,
              hint: translate('password-fields.create-hint'),
            },
          ]}
          errors={errors['newPass']?.message ? [errors['newPass'].message.toString()] : undefined}
        />
        <Input
          register={register}
          id="confirmPass"
          name="confirmPass"
          type="password"
          label={translate('password-fields.confirm')}
          placeholder={translate('password-fields.confirm')}
          errors={errors['confirmPass']?.message ? [errors['confirmPass'].message.toString()] : undefined}
        />
        <Button color="primary" type="submit" customStyle="self-end" disabled={loading}>
          {loading && <CircularProgress size="16px" sx={{ color: variables.color_white }} />}
          {translate('password-fields.save-btn')}
        </Button>
      </form>
      <CustomSnackbar
        open={openSnackbar.open}
        onClose={() => setOpenSnackbar({ ...openSnackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        theme={openSnackbar.type}
        autoHideDuration={5000}
      >
        <>
          <Icon
            name={openSnackbar.type === 'error' ? 'alert-circle' : 'tick'}
            fontSize={18}
            color={variables[`color_${openSnackbar.type}_700`]}
          />
          {openSnackbar.message}
        </>
      </CustomSnackbar>
    </>
  );
};

export default ManagePassword;
