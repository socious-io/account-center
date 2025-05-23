import { translate } from 'src/core/helpers/utils';
import TopBanner from 'src/modules/General/components/TopBanner';

import { useVerifyTopBanner } from './useVerifyTopBanner';

const VerifyTopBanner = () => {
  const {
    data: { type, verified, hideVerifyBanner, pendingOrgVerification },
    operations: { onDismiss, navigateToVerify },
  } = useVerifyTopBanner();
  const title =
    type === 'users'
      ? translate('layout-verification.title-identity')
      : translate('layout-verification.title-organization');

  if (verified) {
    return (
      !hideVerifyBanner && (
        <TopBanner
          theme="success"
          text={translate('layout-verification.success-text', { title })}
          supportingText={translate('layout-verification.success-support-text', { title })}
          primaryButton={{ children: translate('layout-verification.success-primary-btn'), onClick: onDismiss }}
        />
      )
    );
  } else {
    return pendingOrgVerification ? (
      <TopBanner
        theme="warning"
        text={translate('layout-verification.pending-text')}
        supportingText={translate('layout-verification.pending-support-text')}
      />
    ) : (
      <>
        <TopBanner
          theme="warning"
          text={translate('layout-verification.not-verified-text', { title })}
          supportingText={translate('layout-verification.not-verified-support-text', { title })}
          secondaryButton={{
            children: translate('layout-verification.not-verified-secondary-btn'),
            href: 'https://socious.io/verified-credentials',
          }}
          primaryButton={{
            children: translate('layout-verification.not-verified-primary-btn'),
            onClick: navigateToVerify,
          }}
        />
      </>
    );
  }
};

export default VerifyTopBanner;
