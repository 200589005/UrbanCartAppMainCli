import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

const AboutUs = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const { title, content } = route.params;

  return (
    <View style={styles.container}>
      {/* Header */}
      {/* <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{title}</Text>
      </View> */}

      {/* Content */}
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.text}>{content}</Text>
      </ScrollView>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4c669f',
    padding: 16,
  },
  backButton: {
    marginRight: 16,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    padding: 20,
  },
  text: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
});


export default AboutUs;
