
import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure} from '../redux/user/userSlice.js';
import OAuth from '../components/OAuth.jsx';
import { authInternalSignIn } from '../clients/index.js';
import { AUTH_STRINGS } from '../AppStrings.js';

export default function SignIn() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, error: errorMessage } = useSelector(state => state.user); 

    const [formData, setFormData] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.email || !formData.password) {
            dispatch(signInFailure(AUTH_STRINGS.Empty_Field_Error));
        }
        try {
            dispatch(signInStart());
            // eslint-disable-next-line no-undef
            const result = await authInternalSignIn(formData);
            const data = await result.json();

            if (data?.success === false ) {
                dispatch(signInFailure(data.message));
            }
            if (result.ok) {
                dispatch(signInSuccess(data));
                navigate('/');
            }
        } catch (err) {
            dispatch(signInFailure(err.message));
        }
    };
    return (
        <div className="min-h-screen mt-20">
            <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
                {/* Left Side */}
                <div className="flex-1">
                    <Link to="/" className='font-bold dark:text-white text-4xl'>
                        <span className='px-2 py-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-lg text-white'>WHAT</span>
                        Blog
                    </Link>
                    <p className='text-sm mt-5'>
                        This is demo project. You can sign in with your email and password or with Google.
                    </p>
                </div>
                {/* Right Side */}
                <div className="flex-1">
                    <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                        <div className=''>
                            <Label value='Your Email' />
                            <TextInput
                                type='email'
                                placeholder='name@example.com'
                                id='email'
                                onChange={handleChange}
                            />
                        </div>
                        <div className=''>
                            <Label value='Your Password' />
                            <TextInput
                                type='password'
                                placeholder='********'
                                id='password'
                                onChange={handleChange}
                            />
                        </div>
                        <Button
                            gradientDuoTone='purpleToPink'
                            type='submit'
                        >
                            {loading ? (
                                <>
                                    <Spinner size='sm' />
                                    <span className='pl-3'>Loading...</span>
                                </>
                            ) :
                                ('Sign In')
                            } 
                        </Button>
                        <OAuth />
                    </form>
                    <div className='flex gap-2 text-sm mt-5'>
                        <span>
                            Don't have an account?
                        </span>
                        <Link to='/sign-up' className='text-blue-500'>Sign Up</Link>
                    </div>
                    {
                        errorMessage && (
                            <Alert className='mt-5' color='failure'>
                                {errorMessage}
                            </Alert>
                        )
                    }
                </div>
            </div>
        </div>
    );
};
