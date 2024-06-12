import React from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const ChatApp = () => {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.chatContainer}>
        <View style={styles.messageWrapper}>
          <View style={styles.messageRow}>
            <Image 
              style={styles.avatar} 
              source={{ uri: 'https://picsum.photos/50/50' }} 
              onError={(e) => console.log('Error loading image:', e.nativeEvent.error)}
            />
            <Text style={styles.username}>John Doe</Text>
          </View>
          <View style={styles.messageBox}>
            <Text>Hi, how can I help you?</Text>
          </View>
          <View style={styles.responseRow}>
            <View style={styles.responseBox}>
              <Text style={styles.responseText}>Sure, I can help with that.</Text>
            </View>
            <Image 
              style={styles.avatar} 
              source={{ uri: 'https://picsum.photos/50/50' }} 
              onError={(e) => console.log('Error loading image:', e.nativeEvent.error)}
            />
          </View>
        </View>
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder="Type your message..." />
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chatContainer: {
    flex: 1,
    backgroundColor: '#E5E7EB',
  },
  messageWrapper: {
    padding: 8,
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  username: {
    fontWeight: '500',
  },
  messageBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 8,
    maxWidth: '75%',
  },
  responseRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  responseBox: {
    backgroundColor: '#3B82F6',
    borderRadius: 8,
    padding: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginRight: 8,
    maxWidth: '75%',
  },
  responseText: {
    color: '#FFFFFF',
  },
  inputContainer: {
    backgroundColor: '#F3F4F6',
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 25,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
  },
  button: {
    backgroundColor: '#3B82F6',
    borderRadius: 25,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
});

export default ChatApp;
