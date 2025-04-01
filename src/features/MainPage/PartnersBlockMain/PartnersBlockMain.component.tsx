import './PartnersBlockMain.styles.scss';

import { useTranslation } from 'react-i18next';

import PartnersBlock from '@/features/AdditionalPages/PartnersPage/PartnersBlock/PartnersBlock.component';

import Heading from '../Heading/Heading.component';

const PartnersBlockComponent = () => {
    const { t } = useTranslation();

    return (
        <div className="partnersBlockMainContainer">
            <Heading blockName={t('partnersBlockMain.partnersHeading')} buttonName={undefined} setActionOnClick={undefined} />
            <PartnersBlock />
        </div>
    );
};

export default PartnersBlockComponent;
