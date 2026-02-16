import { Link, useLocation } from 'react-router-dom';
import './AdminSidebar.css';

const AdminSidebar = () => {
    const location = useLocation();

    const menuItems = [
        { path: '/admin/dashboard', icon: '📊', label: 'Tableau de bord' },
        { path: '/admin/properties', icon: '🏠', label: 'Gestion des biens' },
        { path: '/admin/agents', icon: '👥', label: 'Gestion des agents' },
        { path: '/admin/appointments', icon: '📅', label: 'Rendez-vous' },
        { path: '/admin/calendar', icon: '🗓️', label: 'Vue Calendrier' }
    ];

    return (
        <aside className="admin-sidebar">
            <div className="sidebar-brand">
                <h3>Luxury Admin</h3>
            </div>
            <nav className="sidebar-nav">
                {menuItems.map(item => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
                    >
                        <span className="icon">{item.icon}</span>
                        <span className="label">{item.label}</span>
                    </Link>
                ))}
            </nav>
            <div className="sidebar-footer">
                <Link to="/" className="btn-back">← Retour au site</Link>
            </div>
        </aside>
    );
};

export default AdminSidebar;
