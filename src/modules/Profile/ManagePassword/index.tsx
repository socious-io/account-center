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
          label="Your current password"
          placeholder="Your current password"
          errors={errors['currentPass']?.message ? [errors['currentPass'].message.toString()] : undefined}
        />
        <Input
          register={register}
          id="newPass"
          name="newPass"
          autoComplete="new-password"
          type="password"
          label="Create password"
          placeholder="New password"
          hints={[
            {
              hide: false,
              hint: 'Your password must be at least 8 characters with lowercase, uppercase, and a special character.',
            },
          ]}
          errors={errors['newPass']?.message ? [errors['newPass'].message.toString()] : undefined}
        />
        <Input
          register={register}
          id="confirmPass"
          name="confirmPass"
          type="password"
          label="Confirm password"
          placeholder="Confirm password"
          errors={errors['confirmPass']?.message ? [errors['confirmPass'].message.toString()] : undefined}
        />
        <Button color="primary" type="submit" customStyle="self-end" disabled={loading}>
          {loading && <CircularProgress size="16px" sx={{ color: variables.color_white }} />}
          Save password
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
