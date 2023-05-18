import { useEffect, useState } from 'react';
import {
  Keyboard,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

function Body() {
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const keyboardShowListener = Keyboard.addListener('keyboardWillShow', event => {
      setKeyboardHeight(event.endCoordinates.height - 10);
    });

    const keyboardHideListener = Keyboard.addListener('keyboardWillHide', () => {
      setKeyboardHeight(0);
    });

    return () => {
      keyboardShowListener.remove();
      keyboardHideListener.remove();
    }
  }, []);

  return (
    <>
      <ScrollView style={styles.scrollView}>
        {Array.from({ length: 15 }).fill('').map((_, index) => (
          <TextInput
            key={index}
            style={styles.input}
            placeholder="I'm a TextInput"
          />
        ))}
      </ScrollView>

      <TouchableOpacity style={[
        styles.absoluteButton, Platform.OS === 'ios' && { bottom: keyboardHeight }
      ]}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>

      <View style={styles.spacer} />
    </>
  );
}

export default function App() {
  return (
    <View style={styles.container}>
      <Body />
    </View >
  );
}

const BUTTON_HEIGHT = 60;
const BUTTON_MARGIN_BOTTOM = Platform.OS === 'ios' ? 10 : undefined;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 6,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
  },
  button: {
    backgroundColor: 'blue',
    padding: 20,
    borderRadius: 6,
  },
  absoluteButton: {
    height: BUTTON_HEIGHT,
    backgroundColor: 'blue',
    padding: 20,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    marginBottom: BUTTON_MARGIN_BOTTOM,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
  },
  spacer: {
    height: BUTTON_HEIGHT,
  },
});
