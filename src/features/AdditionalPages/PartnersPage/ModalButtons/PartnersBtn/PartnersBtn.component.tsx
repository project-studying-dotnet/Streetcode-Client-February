import { useModalContext } from '@/app/stores/root-store';
import './PartnersBtn.styles.scss';
import { useTranslation } from 'react-i18next';

import { becomePartnerEvent } from '@/app/common/utils/googleAnalytics.unility';

const PartnersBtn = () => {
    const { t } = useTranslation();
    const { modalStore: { setModal } } = useModalContext();
    const onBtnClick = () => {
        setModal('partners');
        becomePartnerEvent('partners_page');
    };


    return (
        <button className='button-sized partner-button' onClick={onBtnClick}>
            {t('headerLoginModal.becomePartner')}
        </button>
    );
};

export default PartnersBtn;
