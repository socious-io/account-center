import { Divider } from '@mui/material';
import { LANGUAGES } from 'src/constants/LANGUAGES';
import { translate } from 'src/core/helpers/utils';
import Button from 'src/modules/General/components/Button';
import LanguageSwitcher from 'src/modules/General/components/LanguageSwitcher';

import styles from './index.module.scss';
import { useManageSettings } from './useManageSettings';

const ManageSettings = () => {
  const {
    data: { unsavedValue },
    operations: { setUnsavedValue, onSave },
  } = useManageSettings();

  return (
    <div className={styles['container']}>
      <div className={styles['setting']}>
        <div className={styles['setting__title']}>
          {translate('settings-fields.language-title')}
          <span className={styles['setting__subtitle']}>{translate('settings-fields.language-desc')}</span>
        </div>
        <LanguageSwitcher
          containerClassName="w-full md:w-80"
          value={LANGUAGES.find(option => option.value === unsavedValue.value)}
          onChange={value => setUnsavedValue(value as { label: string; value: string })}
        />
      </div>
      <Divider />
      <Button color="primary" onClick={onSave} customStyle="self-end">
        {translate('settings-save-btn')}
      </Button>
    </div>
  );
};

export default ManageSettings;
