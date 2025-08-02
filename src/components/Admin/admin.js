import SideBar from "./SideBar";
import './Admin.scss';
import { FaBars } from 'react-icons/fa';
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import PerfectScrollBar from 'react-perfect-scrollbar';
import { NavDropdown } from "react-bootstrap";
import Language from "../Header/Language";
import { logout } from "../../services/apiService";
import { doLogout } from "../../redux/action/userAction";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const Admin = (props) => {
    const [collapsed, setCollapsed] = useState(false);
    const account = useSelector(state => state.user.account);
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const handleCollapsed = () => {
        setCollapsed(!collapsed);
    }

    const handleLogout = async () => {
        let res = await logout(account.email, account.refresh_token);
        if (res && res.EC === 0) {
            // clear data redux
            dispatch(doLogout());
            navigate('/login');
        } else {
            toast.error(res.EM);
        }
    }

    return (
        <div className="admin-container">
            <div className="admin-sidebar">
                <SideBar
                    collapsed={collapsed}
                />
            </div>
            <div className="admin-content">
                <div className="admin-header">
                    <span onClick={() => handleCollapsed()}>
                        <FaBars className="leftside" />
                    </span>
                    <div className="rightside">
                        <Language />
                        <NavDropdown title="Settings" id='basic-nav-dropdown'>
                            <NavDropdown.Item>Profile</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => handleLogout()}>Log out</NavDropdown.Item>
                        </NavDropdown>
                    </div>
                </div>
                <div className="admin-main">
                    <PerfectScrollBar>
                        <Outlet />
                    </PerfectScrollBar>
                </div>
            </div>

        </div >
    )
}

export default Admin;