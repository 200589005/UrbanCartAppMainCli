import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

const ProfileScreen = () => {
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation(); // Access the navigation object

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    setLoading(true);
    try {
      const currentUser = auth().currentUser;
      if (currentUser) {
        setFullName(currentUser.displayName || '');
        setMobileNumber(currentUser.phoneNumber || '');
        setEmail(currentUser.email || '');
      } else {
        Alert.alert('Error', 'User is not logged in');
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
      Alert.alert('Error', 'Unable to load user details');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!fullName.trim()) {
      Alert.alert('Validation', 'Full name is required');
      return;
    }

    setLoading(true);
    try {
      const currentUser = auth().currentUser;
      if (currentUser) {
        // Update the user's Firebase Auth profile
        await currentUser.updateProfile({
          displayName: fullName,
        });

        // Navigate to the Home screen after successfully updating the profile
        Alert.alert('Success', 'Profile updated successfully');
        navigation.navigate('Home'); // Navigate to Home screen
      } else {
        Alert.alert('Error', 'User is not logged in');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      Alert.alert('Error', 'Unable to save changes');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            placeholderTextColor="#666"
            value={fullName}
            onChangeText={setFullName}
          />
          <TextInput
            style={[styles.input, styles.disabledInput]}
            placeholder="Mobile Number"
            placeholderTextColor="#aaa"
            value={mobileNumber}
            editable={false} // Mobile number is not editable
            keyboardType="phone-pad"
          />
          <TextInput
            style={[styles.input, styles.disabledInput]}
            placeholder="Email"
            placeholderTextColor="#aaa"
            value={email}
            editable={false} // Email is not editable
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave} disabled={loading}>
          <Text style={styles.saveButtonText}>{loading ? 'Saving...' : 'Save Changes'}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollViewContent: {
    padding: 16,
  },
  inputContainer: {
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: '#fff',
    color: '#000', // Default color for editable fields
  },
  disabledInput: {
    backgroundColor: '#e0e0e0', // Light gray for disabled fields
    color: '#666', // Darker gray for text
  },
  saveButton: {
    backgroundColor: '#007bff',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
