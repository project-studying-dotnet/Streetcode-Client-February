import './Title.styles.scss';
import { useTranslation } from 'react-i18next';

import Logo from '@images/partners/logo_white.png';

const Title = () => {
    const { t } = useTranslation();

    return (
        <div className="titleContainer">
            <div className="titleSmall">{t('partnersBlockMain.partnersHeading')}</div>
            <div className="titleBig">{t('partnersBlockMain.partnersHeading')}</div>
            <div className="content">
                <img className="logo" src={Logo} alt={t('partnersPage.logoAlt')} />
                {t('partnersPage.content')}
            </div>
            <div className="subTitle">{t('partnersPage.subTitle')}</div>
        </div>
    );
};

export default Title;
