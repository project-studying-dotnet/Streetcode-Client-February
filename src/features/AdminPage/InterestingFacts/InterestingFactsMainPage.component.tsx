import AdminBar from '../AdminBar.component';
import InterestingFactsAdminBlock from './Block/InterestingFactsAdminBlock.component';
import './InterestingFactsMainPage.styles.scss';

const InterestingFactsMainPage = () => (
    <div className="interesting-facts-page">
        <AdminBar />
        <div className="interesting-facts-container">
            <InterestingFactsAdminBlock />
        </div>
    </div>
);

export default InterestingFactsMainPage; 