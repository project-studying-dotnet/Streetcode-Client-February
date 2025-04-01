import './HeaderLoginModal.styles.scss';

import CancelBtn from '@images/utils/Cancel_btn.svg';

import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import FRONTEND_ROUTES from '@constants/frontend-routes.constants';
import { useModalContext } from '@stores/root-store';

import { Button, Modal } from 'antd';

import {
    becomePartnerEvent,
    donateEvent,
    joinToStreetcodeClickEvent,
} from '@/app/common/utils/googleAnalytics.unility';

import { useTranslation } from 'react-i18next';

const HeaderLoginModal = () => {
    const { t } = useTranslation();
    const { modalStore: { setModal, modalsState: { login } } } = useModalContext();
    const navigate = useNavigate();

    const becomePartnerHandler = () => {
        login.isOpen = false;
        setModal('partners');
        becomePartnerEvent('modal');
    };

    return (
        <Modal
            className="loginModal"
            open={login.isOpen}
            maskClosable
            centered
            footer={null}
            onCancel={() => setModal('login')}
            closeIcon={<CancelBtn />}
        >
            <div className="loginModalContent">
                <Button onClick={becomePartnerHandler}>
                    {t('headerLoginModal.becomePartner')}
                </Button>
                <Button onClick={() => {
                    joinToStreetcodeClickEvent();
                    navigate(`${FRONTEND_ROUTES.OTHER_PAGES.ERROR404}`);
                    login.isOpen = false;
                }}
                >
                    {t('headerLoginModal.joinTeam')}
                </Button>
                <Button onClick={() => {
                    setModal('donates');
                    setModal('login');
                    donateEvent('header_modal');
                }}
                >
                    {t('headerLoginModal.donate')}
                </Button>
            </div>
        </Modal>
    );
};

export default observer(HeaderLoginModal);
