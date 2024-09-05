import { useAuth } from '../contexts/AuthContext';
import Avatar from '@mui/material/Avatar';
export default function AdminHeader(props) {
    const { userInfo } = useAuth();
    return (
        <div id="admin-header">
            <div id="admin-header-title">
                <h1>{props.title || 'Page title'}</h1>
            </div>
            <div id="admin-header-actions">
                <img
                    id="admin-header-notification"
                    src="/assets/imgs/admin/icon-message.png"
                    alt="Notification"
                />
                <div id="admin-header-avatar">
                    <Avatar
                        src={userInfo?.avatar}
                        alt="Avatar"
                    />
                </div>
            </div>
        </div>
    );
}
