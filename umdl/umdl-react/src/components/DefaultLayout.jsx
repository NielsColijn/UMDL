import {Link, Navigate, Outlet} from "react-router-dom";
import {useStateContext} from "../contexts/ContextProvider.jsx";
import React, {useEffect, useState} from "react";
import axiosClient from "../axios_client.js";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

import {useTranslation} from 'react-i18next';
import {Avatar, Button} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import {showFullName} from "../helpers/FullName.js";

export default function DefaultLayout() {
    const {user, token, setUser, setToken, notification} = useStateContext()
    const [loading, setLoading] = useState(false);

    const { t } = useTranslation();

    const onLogout = (ev) => {
        ev.preventDefault()

        axiosClient.post('/logout')
            .then(() => {
                setUser({})
                setToken(null)
            })
    }

    useEffect(() => {
        setLoading(true);
        axiosClient.get('/user')
            .then(({data}) => {
                setLoading(false)
                setUser(data)
            })
            .catch(() => {
                setLoading(false)
            })
    }, [])

    if (!token) {
        return <Navigate to="/login"/>
    }

    return (
        <div id="defaultLayout">
            <aside>
                <div className="main_logo">
                    <span className="icon">
                        <img src="/images/logo_quizmixer.png" alt={t('default_layout.title')} width="180px" />
                    </span>
                </div>
                <span className="icon"><FontAwesomeIcon icon={['fas', 'tachometer-alt']}/></span><Link to="/dashboard">{t('default_layout.link_dashboard')}</Link>
                <div className="menu_header">Inhoud</div>
                <span className="icon"><FontAwesomeIcon icon={['fas', 'cubes']}/></span><Link to="/categories">{t('default_layout.link_categories')}</Link>
                <span className="icon"><FontAwesomeIcon icon={['fas', 'cube']}/></span><Link to="/blocks">{t('default_layout.link_blocks')}</Link>
                <span className="icon"><FontAwesomeIcon icon={['fas', 'question-circle']}/></span><Link to="/questions">{t('default_layout.link_questions')}</Link>
                <span className="icon"><FontAwesomeIcon icon={['fas', 'list-ol']}/></span><Link to="/quizzes">{t('default_layout.link_quizzes')}</Link>
                <div className="menu_header">Media</div>
                <span className="icon"><FontAwesomeIcon icon={['fas', 'images']}/></span><Link to="/images">{t('default_layout.link_images')}</Link>
                <span className="icon"><FontAwesomeIcon icon={['fas', 'video']}/></span><Link to="/video">{t('default_layout.link_video')}</Link>
                <span className="icon"><FontAwesomeIcon icon={['fas', 'file-audio']}/></span><Link to="/audio">{t('default_layout.link_audio')}</Link>
                <span className="icon"><FontAwesomeIcon icon={['fas', 'list-alt']}/></span><Link to="/config">{t('default_layout.link_config')}</Link>
                <div className="menu_header">Shop</div>
                <span className="icon"><FontAwesomeIcon icon={['fas', 'users']}/></span><Link to="/users">{t('default_layout.link_users')}</Link>
                <span className="icon"><FontAwesomeIcon icon={['fas', 'receipt']}/></span><Link to="/sales">{t('default_layout.link_sales')}</Link>
            </aside>
            <div className="content">
                <header>
                    {!loading && <div>
                        <div className="header_avatar"> <Avatar
                            src={import.meta.env.VITE_API_BASE_URL + '/' + user.image} alt={user.image}
                            sx={{width: 60, height: 60}}/></div>
                        <div className="header_user_info">
                            {showFullName(user.first_name,user.middle_name,user.last_name)}
                        </div>
                        <div className="header_logout">
                            <Button onClick={onLogout} variant="outlined"
                                    startIcon={<LogoutIcon/>}>
                                {t('general.logout')}
                            </Button>
                        </div>
                    </div>}
                </header>
                <main>
                    <Outlet/>
                </main>
            </div>
            {notification &&
                <div className="notification">
                    {notification}
                </div>}
        </div>
    )

}
