import './DonateBtnRectangle.styles.scss';
import { useTranslation } from 'react-i18next';

import { donateEvent } from '@/app/common/utils/googleAnalytics.unility';
import { useModalContext } from '@/app/stores/root-store';

const DonateBtnRectangle = () => {
    const { t } = useTranslation();
    const { modalStore: { setModal } } = useModalContext();
    const onBtnClick = () => {
        setModal('donates');
        donateEvent('partners_page_donate');
    };

    return (
        <button className="button-sized donate-button" onClick={onBtnClick}>
            {t('donate')}
        </button>
    );
};

export default DonateBtnRectangle;
