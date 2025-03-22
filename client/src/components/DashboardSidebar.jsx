import { Sidebar } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { HiArrowSmRight, HiUser } from 'react-icons/hi';
import { Link, useLocation } from 'react-router-dom';
import { DASHBOARD_TABS } from '../pages/Constants';

export default function DashboardSidebar() {
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
        <Sidebar className='w-full md:w-56'>
            <Sidebar.Items>
                <Sidebar.ItemGroup >
                    <Link
                        to={`?tab=${DASHBOARD_TABS.profile}`}
                    >
                        <Sidebar.Item 
                            active={tab === DASHBOARD_TABS.profile}
                            icon={HiUser}
                            label={'User'}
                            labelColor='dark'
                        >
                            Profile
                        </Sidebar.Item>
                    </Link>
                    <Sidebar.Item 
                        icon={HiArrowSmRight}
                        className='cursor-pointer'
                    >
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    );
}
