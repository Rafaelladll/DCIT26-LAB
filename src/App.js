import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Modal } from 'react-native';

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);  // State to control modal visibility

  // Predefined account credentials
  const validAccounts = [
    { email: "user@example.com", password: "password123" },
    { email: "admin@example.com", password: "admin123" }
  ];

  const handleLogin = () => {
    setErrorMessage('');
    const account = validAccounts.find(acc => acc.email === email && acc.password === password);

    if (account) {
      setModalVisible(true);  // Show the modal on successful login
      setErrorMessage('');
    } else {
      const emailMatch = validAccounts.some(acc => acc.email === email);
      const passwordMatch = validAccounts.some(acc => acc.password === password);

      if (!emailMatch && !passwordMatch) {
        setErrorMessage("Both email and password are incorrect.");
      } else if (!emailMatch) {
        setErrorMessage("Email is incorrect.");
      } else if (!passwordMatch) {
        setErrorMessage("Password is incorrect.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button title="Login" onPress={handleLogin} />

      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

      {/* Modal for successful login */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>Login Successful</Text>
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  error: {
    marginTop: 10,
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
