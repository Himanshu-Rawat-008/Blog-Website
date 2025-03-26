import { useSelector } from 'react-redux';
import React from 'react';
import { REDUCERS } from '../redux/store';

export default function ThemeProvider({ children }) {
    const {theme} = useSelector(state => state[REDUCERS.theme]);
    return (
        <div className={theme}>
            <div className='bg-white
            text-gray-700
            dark:text-gray-200 
            min-h-screen
            dark:bg-[rgb(16,23,42)] '
            >
                {children}
            </div>
        </div>
    );
}
