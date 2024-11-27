import auth from '@react-native-firebase/auth';
import { clearToken, getToken, saveToken } from './token';


export const signup = async (email: string, password: string) => {
    try {
        console.log(email,password);
        return await new Promise((resolve) => {
            auth()
                .createUserWithEmailAndPassword(email, password)
                .then(() => {
                    console.log('User account created & signed in!');
                    resolve({
                        status: true,
                        message: 'User account created & signed in!',
                    });
                })
                .catch(error => {
                    let errorMessage = '';
                    if (error.code === 'auth/email-already-in-use') {
                        errorMessage = 'That email address is already in use!';
                    }
                    if (error.code === 'auth/invalid-email') {
                        errorMessage = 'That email address is invalid!';
                    }
                    resolve({
                        status: false,
                        message: errorMessage,
                    });
                });
        });



    } catch (error: any) {
      let errorMessage = '';
      return {
        status: false,
        message: errorMessage,
      };
    }
};

export const login = async (email: string, password: string) => {
    try {
        const userCredential = await auth().signInWithEmailAndPassword(email, password);
        const user = userCredential.user;
        console.log('Logged in user:', user);
        const idToken = await user.getIdToken();
        await saveToken(idToken);
        console.log('Token saved:', idToken);
        return {
            status: true,
            message: `'Logged in user:'${email}}`,
        };
        // navigation.navigate('AppDrawer');
    } catch (error: any) {
        let errorMessage = '';
        switch (error.code) {
          case 'auth/invalid-credential':
            errorMessage = 'Invalid credential. Please check your email and password.';
            break;
          case 'auth/invalid-email':
            errorMessage = 'Invalid email format. Please check your email.';
            break;
          case 'auth/user-disabled':
            errorMessage = 'Your account has been disabled. Please contact support.';
            break;
          case 'auth/user-not-found':
            errorMessage = 'No account found with this email. Please sign up.';
            break;
          case 'auth/wrong-password':
            errorMessage = 'Incorrect password. Please try again or reset your password.';
            break;
          default:
            errorMessage = 'An unknown error occurred. Please try again later.';
            break;
        }
        return {
            status: false,
            message: errorMessage,
        };
    }
};
// Forgot password function
export const forgotPassword = async (email: string) => {
    try {
      await auth().sendPasswordResetEmail(email);
      console.log(`Password reset email sent to ${email}`);
      return {
        status: true,
        message: `Password reset email sent to ${email}`,
      };
    } catch (error: any) {
      let errorMessage = '';

      switch (error.code) {
        case 'auth/invalid-email':
          errorMessage = 'The email address is badly formatted.';
          break;
        case 'auth/user-not-found':
          errorMessage = 'There is no user corresponding to this email.';
          break;
        default:
          errorMessage = 'An error occurred. Please try again later.';
          break;
      }

      return {
        status: false,
        message: errorMessage,
      };
    }
};

export const checkUserExit = async () => {
    try {
        const token = await getToken();
        if (token) {
            // Verify token or use Firebase auth state listener
            const unsubscribe = auth().onAuthStateChanged((user) => {
                if (user) {
                    console.log('User is signed in with token:', user);
                    // navigation.navigate('AppDrawer');
                    return {
                        status: true,
                    };
                } else {
                    console.log('No user signed in');
                    return {
                        status: false,
                    };
                    // navigation.navigate('Auth');
                }
            });
            return () => unsubscribe();
        } else {
            // navigation.navigate('Auth');
            return {
                status: false,
            };
        }
    }catch(error){
        return {
            status: false,
        };
    }
};

export const logout = async () => {
    try {
        await auth().signOut(); // Firebase sign-out
        console.log('User signed out successfully');
        // Optionally remove the token from local storage (AsyncStorage)
        await clearToken();
        console.log('Token removed from storage');
        return true;
    } catch(error: any){
        console.log(error);
        return true;
    }
};
