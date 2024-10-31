import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Ensure you have installed react-native-vector-icons

const SettingsScreen = ({ navigation }) => {
  const handleNavigation = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <TouchableOpacity style={styles.option} onPress={() => handleNavigation('AboutUs')}>
          <Icon name="info" size={24} color="#4c669f" style={styles.icon} />
          <Text style={styles.optionText}>About Us</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={() => handleNavigation('TermsAndConditions')}>
          <Icon name="book" size={24} color="#4c669f" style={styles.icon} />
          <Text style={styles.optionText}>Terms & Conditions</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={() => handleNavigation('PrivacyPolicy')}>
          <Icon name="lock" size={24} color="#4c669f" style={styles.icon} />
          <Text style={styles.optionText}>Privacy Policy</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  scrollViewContent: {
    padding: 20,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
  },
  icon: {
    marginRight: 15,
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
});

export default SettingsScreen;
