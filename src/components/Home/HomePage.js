import { useSelector } from "react-redux";
import videoHomepage from "../../assets/video/video-homepage.mp4"
import { useNavigate } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";

const HomePage = (props) => {
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <div className="homepage-container">
            <video autoPlay loop muted>
                <source src={videoHomepage} type="video/mp4" />
            </video>
            <div className="homepage-content">
                <div className="title-1">
                    {t('homepage.title1')}
                </div>
                <div className="title-2">
                    {t('homepage.title2')}
                </div>
                <div className="title-3">
                    {isAuthenticated ?
                        <button onClick={() => navigate('users')}>{t('homepage.title3.users')}</button>
                        :
                        <button onClick={() => navigate('login')}>{t('homepage.title3.login')}</button>
                    }
                </div>
            </div>
        </div>
    )
}

export default HomePage;