import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { checkUserExit } from '../../../utils/firbase';

const Splash =  () => {
  // const router = useRouter();
  const navigation = useNavigation();
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await checkUserExit();
        if(res.status){
          navigation.navigate('AppDrawer');
        } else {
          navigation.navigate('Auth');
        }
      } catch (error) {
        navigation.navigate('Auth');
        console.error('Error checking auth state:', error);
      }
    };
    checkAuth();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../../../assets/appIcon.png')}
            style={styles.logo}
          />
        </View>
      </View>
    </View>
  );
};

export default Splash;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4c669f',
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logoContainer: {
    marginBottom: 50,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  inputContainer: {
    width: '100%',
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 15,
    borderRadius: 25,
    fontSize: 16,
    color: '#fff',
    marginBottom: 15,
  },
  loginButton: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 25,
    width: '100%',
    alignItems: 'center',
    marginTop: 15,
  },
  loginButtonText: {
    color: '#4c669f',
    fontSize: 18,
    fontWeight: 'bold',
  },
  forgotPasswordContainer: {
    marginTop: 15,
  },
  forgotPasswordText: {
    color: '#fff',
    fontSize: 14,
  },
  signUpContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  signUpText: {
    color: '#fff',
    fontSize: 14,
  },
  signUpButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
