import './Partners.styles.scss';
import { useTranslation } from 'react-i18next';

import { useEffect } from 'react';
import Footer from '@layout/footer/Footer.component';

import DonateBtnRectangle from './ModalButtons/DonateBtn/DonateBtnRectangle.component';
import PartnersBtn from './ModalButtons/PartnersBtn/PartnersBtn.component';
import PartnersBtnCircle from './ModalButtons/PartnersBtnCircle/PartnersBtnCircle.component';
import PartnersBlock from './PartnersBlock/PartnersBlock.component';
import Title from './Title/Title.component';

const PartnersPage = () => {
    const { t, i18n } = useTranslation();

    const switchLanguage = () => {
        const newLang = i18n.language === 'en' ? 'uk' : 'en';
        i18n.changeLanguage(newLang);
    };

    return (
        <>
            <div className="partnersContainer">
                <div className="wrapper">
                    <button onClick={switchLanguage} className="language-switcher">
                        {t('switchLanguage')}
                    </button>
                    <Title />
                    <PartnersBlock />
                    <div className="subTitle titleBottom">
                        {t('partnersPage.subtitle')}
                    </div>
                    <div className="buttonsContainer">
                        <div className="buttonsBlock">
                            <PartnersBtn />
                            <DonateBtnRectangle />
                        </div>
                    </div>
                </div>
            </div>
            <div className="partnersSticky">
                <div className="sticky">
                    <div className="sticky-content">
                        <PartnersBtnCircle />
                    </div>
                </div>
            </div>
        </>
    );
};

export default PartnersPage;
