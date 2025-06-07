import { useSelector } from "react-redux";
import videoHomepage from "../../assets/video/video-homepage.mp4"
import { useNavigate } from "react-router-dom";

const HomePage = (props) => {
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);
    const navigate = useNavigate();

    return (
        <div className="homepage-container">
            <video autoPlay loop muted>
                <source src={videoHomepage} type="video/mp4" />
            </video>
            <div className="homepage-content">
                <div className="title-1">
                    Get to know your customers with forms worth filling out
                </div>
                <div className="title-2">
                    Collect all the data you need to understand customers with forms designed to be refreshingly different.
                </div>
                <div className="title-3">
                    {isAuthenticated ?
                        <button onClick={() => navigate('users')}>Doing Quiz Now</button>
                        :
                        <button onClick={() => navigate('login')}>Get's started. It's free.</button>
                    }
                </div>
            </div>
        </div>
    )
}

export default HomePage;