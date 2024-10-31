import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';

const ProfileScreen = () => {
  const [fullName, setFullName] = useState('John Doe');
  const [mobileNumber, setMobileNumber] = useState('123-456-7890');
  const [email, setEmail] = useState('john.doe@example.com');

  const handleSave = () => {
    // Implement save logic here
    console.log('Profile saved');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* <View style={styles.logoContainer}>
          <Image
            source={require("../assets/appIcon.png")}
            style={styles.logo}
          />
        </View> */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            placeholderTextColor="#666"
            value={fullName}
            onChangeText={setFullName}
          />
          <TextInput
            style={styles.input}
            placeholder="Mobile Number"
            placeholderTextColor="#666"
            value={mobileNumber}
            onChangeText={setMobileNumber}
            keyboardType="phone-pad"
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#666"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  logoContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  scrollViewContent: {
    padding: 20,
  },
  inputContainer: {
    width: '100%',
  },
  input: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    color: '#333',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  saveButton: {
    backgroundColor: '#4c669f',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginTop: 15,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
