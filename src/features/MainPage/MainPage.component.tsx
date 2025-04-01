import './MainPage.styles.scss';
import { useTranslation } from 'react-i18next';

import ScrollToTopBtn from '../../app/common/components/ScrollToTopBtn/ScrollToTopBtn.component';
import InstagramBlock from './InstagramBlock/InstagramBlock.component';
import PartnersBlockComponent from './PartnersBlockMain/PartnersBlockMain.component';
import StaticBanner from './StaticBanners/StaticBanner.component';
import StreetcodeSliderComponent from './StreetcodeSlider/StreetcodeSlider.component';
import TeamComponent from './TeamSlider/TeamComponent.component';
import TopCarouselComponent from './TopCarousel/TopCarousel.component';
import NewsSliderComponent from './NewsSlider/NewsSlider.component';

const mainPageContent = () => {
    const { t } = useTranslation();

    return (
        <>
        <TopCarouselComponent/>
        <div className="mainPageContainer">
                <StreetcodeSliderComponent/>
                <StaticBanner
                    id="catalog"
                    blockName={t('mainPage.catalogBlockName')}
                    blockContent={t('mainPage.catalogBlockContent')}
                    buttonName={t('mainPage.catalogButtonName')}
                    setActionOnClick={() => {
                        window.location.href = '../catalog';
                    }}
                />
                <NewsSliderComponent/>
                <TeamComponent/>
                <PartnersBlockComponent/>
                <StaticBanner
                    id="support"
                    blockName={t('mainPage.supportBlockName')}
                    blockContent={t('mainPage.supportBlockContent')}
                    buttonName={t('mainPage.supportButtonName')}
                    setActionOnClick={() => {
                        window.location.href = '../support-us';
                    }}
                />
            <div className="sticky">
                <div className="sticky-content">
                    <ScrollToTopBtn/>
                </div>
            </div>
        </div>
        </>
    );
};

export default mainPageContent;