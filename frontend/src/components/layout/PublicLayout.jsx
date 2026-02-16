import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const PublicLayout = () => {
    return (
        <div className="app-public">
            <Header />
            <main className="main-content">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default PublicLayout;
