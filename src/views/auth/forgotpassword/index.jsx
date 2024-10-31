import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  Alert,
} from 'react-native';
import { forgotPassword } from '../../../utils/firbase';

const ForgotPasswordScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleResetPassword = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email address');
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }
    const res = await forgotPassword(email);
    if(res.status){
      Alert.alert(
        'Password Reset',
        'A password reset link has been sent to your email address.',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Login'),
          },
        ]
      );
    } else {
      Alert.alert('Error', res.message);
    }
  };

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../../../assets/appIcon.png')}
            style={styles.logo}
          />
        </View>
        <Text style={styles.title}>Forgot Password</Text>
        <Text style={styles.description}>
          Please enter your email address. We will send you a link to reset your
          password.
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#ccc"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        <TouchableOpacity
          style={styles.resetButton}
          onPress={handleResetPassword}
        >
          <Text style={styles.resetButtonText}>Reset Password</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.backToLoginButton}
          onPress={handleLogin}
        >
          <Text style={styles.backToLoginText}>Back to Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ForgotPasswordScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4c669f',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 15,
    borderRadius: 25,
    fontSize: 16,
    color: '#fff',
  },
  resetButton: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  resetButtonText: {
    color: '#4c669f',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backToLoginButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  backToLoginText: {
    color: '#fff',
    fontSize: 16,
  },
});
