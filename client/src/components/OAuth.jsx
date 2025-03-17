import React from 'react';
import { Button} from 'flowbite-react';
import { AiFillGoogleCircle } from 'react-icons/ai';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInFailure, signInSuccess } from '../redux/user/userSlice.js';
import { useNavigate } from 'react-router-dom';

export default function OAuth() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const auth = getAuth(app);
    
    const handleClick = async () => {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ prompt: 'select_account' });
        try {
            const resultFromGoogle = await signInWithPopup(auth, provider);
            // eslint-disable-next-line no-undef
            const res = await fetch('api/auth/google', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    name: resultFromGoogle.user.displayName,
                    email: resultFromGoogle.user.email,
                    googlePhotoUrl: resultFromGoogle.user.googlePhotoUrl,
                }),
            });
            const data = await res.json();
            if(res.ok) {
                dispatch(signInSuccess(data));
                navigate('/');
            }
        } catch(err) {
            dispatch(signInFailure(err.message));
        }
    };

    return (
        <Button 
            type='button'
            gradientDuoTone="pinkToOrange"
            outline
            onClick={handleClick}
        >
            <AiFillGoogleCircle 
                className="w-6 h-6 mr-2"
            />
            Continue With Google
        </Button>
    );
};
