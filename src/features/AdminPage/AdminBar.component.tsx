import FRONTEND_ROUTES from '@/app/common/constants/frontend-routes.constants';
import './AdminBar.styles.scss';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const AdminBar = () => {
    const { t } = useTranslation();

    return (
        <div className="adminBar">
            <Link className="Link" to={FRONTEND_ROUTES.ADMIN.FOR_FANS}>{t('adminBar.forFans')}</Link>
            <Link className="Link" to={FRONTEND_ROUTES.ADMIN.PARTNERS}>{t('adminBar.partners')}</Link>
            <Link className="Link" to={FRONTEND_ROUTES.ADMIN.TEAM}>{t('adminBar.team')}</Link>
            <Link className="Link" to={FRONTEND_ROUTES.ADMIN.WOW_FACTS}>{t('adminBar.wowFacts')}</Link>
        </div>
    );
};

export default AdminBar;
