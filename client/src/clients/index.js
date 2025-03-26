// eslint-disable-next-line no-undef
export const authGoogleClient = async (resultFromGoogle) => await fetch('api/auth/google', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
        name: resultFromGoogle.user.displayName,
        email: resultFromGoogle.user.email,
        googlePhotoUrl: resultFromGoogle.user.googlePhotoUrl,
    }),
});

// eslint-disable-next-line no-undef
export const authInternalSignIn = async (formData) => await fetch('/api/auth/signin', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
});


// eslint-disable-next-line no-undef
export const authInternalSignUp = async (formData) => await fetch('/api/auth/signup', {
    method: 'Post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
});