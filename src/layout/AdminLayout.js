import Header from './AdminHeader';
import Footer from './AdminFooter';
import Sidebar from './AdminSidebar';
import './admin.scss';
export default function AdminLayout(props) {
    return (
        <>
            <Sidebar />
            <div id="admin-page-section">
                <Header title={props.title} />
                <div id="admin-main-content">{props.children}</div>
                <Footer />
            </div>
        </>
    );
}
