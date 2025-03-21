import { useEffect, useState } from 'react';
import { useLocation} from 'react-router-dom';
import DashboardSidebar from '../components/DashboardSidebar';
import DashboardProfile from '../components/DashboardProfile';
import { DASHBOARD_TABS } from './Constants';

export default function Dashboard() {
    const location = useLocation();
    const [tab, setTab] = useState('');

    useEffect(() => {
        // eslint-disable-next-line no-undef
        const urlParams = new URLSearchParams(location.search);
        const tabFromUrl = urlParams.get('tab');
        if(tabFromUrl)
            setTab(tabFromUrl);
    }, [location.search]);
    
    return (
        <div className='min-h-screen flex flex-col md:flex-row'>
            <div className='md:w-56'>
                {/* {Sidebar} */}
                <DashboardSidebar />
            </div>
            {/* {Profile} */}
            { tab === DASHBOARD_TABS.profile && <DashboardProfile />}
        </div>
    );
};
