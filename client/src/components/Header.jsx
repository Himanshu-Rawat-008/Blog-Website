import { Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice.js';
import { DASHBOARD_TABS, THEMES } from '../AppStrings.js';
import { REDUCERS } from '../redux/store.js';
import { signOutSuccess } from '../redux/user/userSlice.js';
export default function Header() {
    const path = useLocation().pathname;
    const { currentUser } = useSelector(state => state[REDUCERS.user]);
    const  dispatch  = useDispatch();
    const { theme } = useSelector(state => state[REDUCERS.theme]);

    const onClickSignOut = async () => {
        try {
            // eslint-disable-next-line no-undef
            const res = await fetch('/api/user/signout', {
                method: 'POST',
            });
            const data = await res.json();
            if(!res.ok) {
                console.log(data.message);
            } else {
                dispatch(signOutSuccess());
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Navbar className='border-b-2'>
            <Link to="/" className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
                <span className='px-2 py-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-lg text-white'>WHAT</span>
                Blog
            </Link>
            <form>
                <TextInput
                    type='text'
                    placeholder='Search...'
                    rightIcon={AiOutlineSearch}
                    className='hidden lg:inline'
                />
            </form>
            <Button className='w-12 h-10 lg:hidden' color='gray' pill>
                <AiOutlineSearch />
            </Button>

            <div className='flex gap-2 md:order-2'>
                <Button className='w-12 h-10 hidden sm:inline' color='gray' pill onClick={() => dispatch(toggleTheme())}>
                    {
                        theme === THEMES.Light ? <FaSun/> : <FaMoon />
                    }
                </Button>
                { currentUser ? (
                    <Dropdown
                        arrowIcon={false}
                        inline
                        label={
                            <Avatar 
                                alt='user'
                                img={currentUser.profilePicture}
                                rounded
                            />
                        }
                    >
                        <Dropdown.Header>
                            <span className='block text-sm'>@{currentUser.username}</span>
                            <span className='block text-sm font-medium truncate'>{currentUser.email}</span>
                        </Dropdown.Header>
                        <Link to={`/dashboard?tab=${DASHBOARD_TABS.profile}`}>
                            <Dropdown.Item>Profile</Dropdown.Item>
                        </Link>
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={() => onClickSignOut}>Sign out</Dropdown.Item>
                    </Dropdown>
                ) : 
                    ( <Link to='/sign-in'>
                        <Button className='' gradientDuoTone='purpleToBlue' outline>Sign In</Button>
                    </Link> ) }
                <Navbar.Toggle />
            </div>

            <Navbar.Collapse>
                <Navbar.Link active={path === '/'} as={'div'}>
                    <Link to='/'> Home </Link>
                </Navbar.Link>
                <Navbar.Link active={path === '/about'} as={'div'}>
                    <Link to='/about'> About </Link>
                </Navbar.Link>
                <Navbar.Link active={path === '/projects'} as={'div'}>
                    <Link to='/projects'> Projects </Link>
                </Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
    );
};
