import { Footer } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { BsFacebook, BsGithub, BsInstagram, BsTwitterX } from 'react-icons/bs';

export default function FooterComponent() {
    return (
        <Footer container className='border border-t-8 border-teal-500'>
            <div className='w-full max-w-7xl mx-auto'>
                <div className='grid w-full justify-between sm:flex md:grid-cols-1'>
                    <div className='mt-5'>
                        <Link 
                            to="/" 
                            className='self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white'>
                            <span 
                                className='px-2 py-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-lg text-white'>WHAT</span>
                                        Blog
                        </Link>
                    </div>
                    <div 
                        className='grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6'>
                        <div>
                            <Footer.Title 
                                title='About' />
                            <Footer.LinkGroup col>
                                <Footer.Link 
                                    href="" 
                                    target='_blank' 
                                    rel='noopener noreferrer'
                                >
                                    My Profile
                                </Footer.Link>
                                <Footer.Link 
                                    href="" 
                                    target='_blank' 
                                    rel='noopener noreferrer'
                                >
                                    Github
                                </Footer.Link>
                            </Footer.LinkGroup>
                        </div>
                        <div>
                            <Footer.Title 
                                title='Follow Us' />
                            <Footer.LinkGroup col>
                                <Footer.Link 
                                    href=""
                                    target='_blank' 
                                    rel='noopener noreferrer'
                                >
                                    My LinkedIn
                                </Footer.Link>
                                <Footer.Link 
                                    href="" 
                                    target='_blank' 
                                    rel='noopener noreferrer'
                                >
                                    Discord
                                </Footer.Link>
                            </Footer.LinkGroup>
                        </div>
                        <div>
                            <Footer.Title 
                                title='Legal' />
                            <Footer.LinkGroup col>
                                <Footer.Link 
                                    href=""
                                    target='_blank' 
                                    rel='noopener noreferrer'
                                >
                                    Privacy Policy
                                </Footer.Link>
                                <Footer.Link 
                                    href=""
                                    target='_blank' 
                                    rel='noopener noreferrer'
                                >
                                    Terms &amp; Conditions
                                </Footer.Link>
                            </Footer.LinkGroup>
                        </div>
                    </div>
                </div>
                <Footer.Divider />
                <div className='w-full sm:flex sm:items-center sm:justify-between'>
                    <Footer.Copyright
                        href='#'
                        by="Himanshu Rawat"
                        year={new Date().getFullYear()} />
                    <div className='flex gap-6 mt-4 sm:mt-0  sm:justify-center'>
                        <Footer.Icon 
                            href="#"
                            icon={BsFacebook}/>
                        <Footer.Icon
                            href="#"
                            icon={BsInstagram}/>
                        <Footer.Icon 
                            href="#"
                            icon={BsGithub}/>
                        <Footer.Icon 
                            href="#" 
                            icon={BsTwitterX}/>
                    </div>
                </div>
            </div>
        </Footer>
    );
}