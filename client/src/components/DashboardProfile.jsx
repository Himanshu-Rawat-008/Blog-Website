import { useSelector } from 'react-redux';
import { REDUCERS } from '../redux/store';
import { Alert, Button, TextInput } from 'flowbite-react';
import { useEffect, useRef, useState } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import { DashboardProfileStrings } from '../AppStrings.js';
import { updateStart, updateSuccess, updateFailure } from '../redux/user/userSlice.js';
import { useDispatch } from 'react-redux';

export default function DashboardProfile() {
    const { currentUser } = useSelector(state => state[REDUCERS.user]);
    
    const [imageFile, setImageFile ] = useState(null);
    const [imageFileUrl, setImageFileUrl] = useState(null);
    const [imageFileUploadingProgress, setImageFileUploadingProgress] = useState(null);
    const [imageFileUploadError, setImageFileUploadError] = useState(null);
    const [imageFileUploading, setImageFileUploading] = useState(false);
    const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
    const [updateUserError, setUpdateUserError] = useState(null);
    
    const filePickerRef = useRef();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({});

    const handleImageChange = (e) => {
        const file =e.target.files[0];
        if(file) {
            setImageFile(file);
            // eslint-disable-next-line no-undef
            setImageFileUrl(URL.createObjectURL(file));
        }
    };

    const uploadImage = async () => {
        setImageFileUploadError(null);
        setImageFileUploading(true);
        const storage = getStorage(app);
        const fileName = new Date().getTime() + imageFile.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, imageFile);
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes ) * 100;
                setImageFileUploadingProgress(progress.toFixed(0));
            },
            () => {
                //error
                setImageFileUploadError(DashboardProfileStrings.ImageFileUploadError);
                setImageFileUploadingProgress(null);
                setImageFile(null);
                setImageFileUrl(null);
                setImageFileUploading(false);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    setImageFileUrl(url);
                    setFormData({ ...formData, profilePicture: url });
                    setImageFileUploading(false);
                });
            }
        );
    };

    const handleChange = (e) =>{
        setFormData({ ...formData, [e.target.id]: e.target.value});
    };

    const handleSubmit = async (e) =>  {
        e.preventDefault();
        setUpdateUserError(null);
        setUpdateUserSuccess(null);
        
        if(Object.keys(formData).length === 0) {
            setUpdateUserError('No Changes made');
            return;};
        if(imageFileUploading) {
            setUpdateUserError('Please wait for image to upload');
            return;
        }
        try {
            dispatch(updateStart());
            // eslint-disable-next-line no-undef
            const res = await fetch(`/api/user/update/${ currentUser._id }`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application-json',
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if(!res.ok) {
                dispatch(updateFailure(data.message));
                setUpdateUserError(data.message);
            } else {
                dispatch(updateSuccess(data));
                setUpdateUserSuccess('User\'s profile updated successfully');
            }
        } catch (err) {
            dispatch(updateFailure(err.message));
            setUpdateUserError(err.message);
        }
    };
    useEffect(() => {
        if(imageFile) {
            uploadImage();
        }
    }, [imageFile]);

    return (
        <div className='max-w-lg mx-auto p-3 w-full'>
            <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
            <form
                onSubmit={handleSubmit}
                className='flex flex-col gap-4'
            >
                <input 
                    type="file" 
                    accept='image/*' 
                    onChange={handleImageChange}
                    ref={filePickerRef}
                    hidden
                />
                <div 
                    className='relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full'
                    onClick={() => filePickerRef.current.click()}
                >
                    {imageFileUploadingProgress && (
                        <CircularProgressbar 
                            value={imageFileUploadingProgress || 0}
                            text={`${imageFileUploadingProgress}%`}
                            strokeWidth={5}
                            styles={{
                                root: {
                                    width: '100%',
                                    height: '100%',
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                },
                                path: {
                                    stroke: `rgba(62, 152, 199, ${imageFileUploadingProgress/100})`
                                }
                            }}
                        />
                    ) }
                    <img 
                        className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${ imageFileUploadingProgress && imageFileUploadingProgress < 100 && 'opacity-60'}`}
                        src={imageFileUrl || currentUser.profilePicture} 
                        alt="user"
                    />
                </div>

                {
                    imageFileUploadError 
                    && 
                    <Alert color='failure'>
                        {imageFileUploadError}
                    </Alert>
                }
                <TextInput
                    type='text'
                    id='username'
                    placeholder='username'
                    defaultValue={currentUser.username}
                    onChange={handleChange}
                />
                <TextInput
                    type='email'
                    id='email'
                    placeholder='email'
                    defaultValue={currentUser.email}
                    onChange={handleChange}
                />
                <TextInput
                    type='password'
                    id='password'
                    placeholder='*********'
                    onChange={handleChange}
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
            {
                updateUserSuccess && (
                    <Alert color='success' className='mt-5'>
                        {updateUserSuccess}
                    </Alert>
                )
            }
            {
                updateUserError && (
                    <Alert color='error' className='mt-5'>
                        {updateUserError}
                    </Alert>
                )
            }
        </div>
    );
}
