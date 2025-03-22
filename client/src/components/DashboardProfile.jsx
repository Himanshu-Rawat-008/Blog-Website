import { useSelector } from 'react-redux';
import { REDUCERS } from '../redux/store';
import { Button, TextInput } from 'flowbite-react';

export default function DashboardProfile() {
    const { currentUser } = useSelector(state => state[REDUCERS.user]);
    return (
        <div className='max-w-lg mx-auto p-3 w-full'>
            <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
            <form
                className='flex flex-col gap-4'
            >
                <div className='w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full'>
                    <img 
                        className='rounded-full w-full h-full object-cover border-8'
                        src={currentUser.profilePicture} 
                        alt="user"
                    />
                </div>

                <TextInput
                    type='text'
                    id='username'
                    placeholder='username'
                    defaultValue={currentUser.username}
                />
                <TextInput
                    type='email'
                    id='email'
                    placeholder='email'
                    defaultValue={currentUser.email}
                />
                <TextInput
                    type='password'
                    id='password'
                    placeholder='*********'
                />

                <Button 
                    type='submit'
                    gradientDuoTone='purpleToBlue'
                    outline
                >
                    Update
                </Button>
            </form>
            <div className='text-red-500 flex justify-between mt-5'>
                <span  className='cursor-pointer'>Delete Account</span>
                <span  className='cursor-pointer'>Sign Out</span>
            </div>
        </div>
    );
}
