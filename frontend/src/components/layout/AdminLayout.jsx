import { Outlet, Navigate } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import './AdminLayout.css';

const AdminLayout = () => {
    const token = localStorage.getItem('token');
    const userJson = localStorage.getItem('user');
    const user = userJson ? JSON.parse(userJson) : null;

    if (!token || !user) {
        return <Navigate to="/login" />;
    }

    if (user.role !== 'admin' && user.email !== 'hadir.ayari@esen.tn') {
        return <Navigate to="/" />;
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/admin/login';
    };

    return (
        <div className="admin-layout">
            <AdminSidebar />
            <main className="admin-main">
                <header className="admin-topbar">
                    <div className="breadcrumb-area">
                        <span>Administration</span>
                    </div>
                    <div className="user-profile">
                        <span className="user-name">{user.nom}</span>
                        <button onClick={handleLogout} className="btn-logout">Déconnexion</button>
                    </div>
                </header>
                <div className="admin-content-container">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
