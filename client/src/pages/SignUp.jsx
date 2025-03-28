
import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';
import { authInternalSignUp } from '../clients';
import { AUTH_STRINGS } from '../AppStrings';

export default function SignUp() {
    const [formData, setFormData] = useState({});
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setErrorMessage(null);
        setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.username || !formData.email || !formData.password) {
            return setErrorMessage(AUTH_STRINGS.Empty_Field_Error);
        }
        try {
            setLoading(true);
            // eslint-disable-next-line no-undef
            const res = await authInternalSignUp(formData);
            const data =  await res.json();

            if (data.statusCode == 500 && data.message.includes('duplicate key')) {
                if (data.message.includes('username')) {
                    setErrorMessage(AUTH_STRINGS.User_Exists_Error);
                }
                if (data.message.includes('email')) {
                    setErrorMessage(AUTH_STRINGS.Email_Error);
                }
            }
            if (res.success) {
                navigate('./sign-in');
            }
        } catch (err) {
            return setErrorMessage(err.message);
        } finally {
            setLoading(false);
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
                        This is demo project. You can sign up with your email and password or with Google.
                    </p>
                </div>
                {/* Right Side */}
                <div className="flex-1">
                    <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                        <div className=''>
                            <Label value='Your Username' />
                            <TextInput
                                type='text'
                                placeholder='Username'
                                id='username'
                                onChange={handleChange}
                            />
                        </div>
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
                                placeholder='Password'
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
                                ('Sign Up')
                            }
                        </Button>
                        <OAuth />
                    </form>
                    <div className='flex gap-2 text-sm mt-5'>
                        <span>
                            Have an account?
                        </span>
                        <Link to='/sign-in' className='text-blue-500'>Sign In</Link>
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
