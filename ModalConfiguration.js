/**
 * Awesome Balanza
 * https://github.com/D4ITON/awesomebalanza
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  ToastAndroid,
} from 'react-native';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';

import Icon from 'react-native-vector-icons/Feather';

function App(props) {
  const {
    moneySimbol,
    storeMoneySimbol,
    storeColorTheme,
    setColorTheme,
    radioButtonIndex,
    setRadioButtonIndex,
    setMoneySimbol,
    storeRadioButtonIndex,
  } = props;

  var radio_props = [
    {label: 'Verde', value: 0, color: '#1db954'},
    {label: 'Azul', value: 1, color: '#207EBC'},
    {label: 'Rosa', value: 2, color: '#EE6565'},
    {label: 'Naranja', value: 3, color: '#EFB517'},
    {label: 'Violeta', value: 4, color: '#C31FEB'},
  ];

  return (
    <View style={styles.body}>
      <KeyboardAvoidingView behavior="height">
        <View>
          <Text style={styles.title}>awesomebalanza</Text>
        </View>
        <View style={styles.formInput}>
          <Text style={styles.label}>Tema</Text>
          <View style={styles.radioFormContainer}>
            <RadioForm
              formHorizontal={true}
              styles={styles.radioForm}
              animation={true}>
              {radio_props.map((obj, i) => (
                <View style={styles.radioButtonContainer}>
                  <RadioButton
                    labelHorizontal={false}
                    style={styles.radioButton}
                    key={i}>
                    <RadioButtonInput
                      obj={obj}
                      index={i}
                      isSelected={radioButtonIndex === i}
                      onPress={(value) => {
                        setRadioButtonIndex(value);
                        storeRadioButtonIndex(value);
                        ToastAndroid.show(
                          `${obj.label} aplicado`,
                          ToastAndroid.SHORT,
                        );
                        storeColorTheme(obj.color);
                        setColorTheme(obj.color);
                      }}
                      borderWidth={3}
                      buttonInnerColor={obj.color}
                      buttonOuterColor={obj.color}
                      buttonSize={15}
                      buttonOuterSize={25}
                      buttonStyle={styles.radioButtonInput}
                      buttonWrapStyle={styles.buttonWrapStyle}
                    />
                    <RadioButtonLabel
                      obj={obj}
                      index={i}
                      labelHorizontal={false}
                      onPress={(value) => {
                        storeRadioButtonIndex(value);
                        setRadioButtonIndex(value);
                        ToastAndroid.show(
                          `${obj.label} aplicado`,
                          ToastAndroid.SHORT,
                        );
                        storeColorTheme(obj.color);
                        setColorTheme(obj.color);
                      }}
                      labelStyle={styles.radioButtonLabelStyle}
                      labelWrapStyle={{}}
                    />
                  </RadioButton>
                </View>
              ))}
            </RadioForm>
          </View>
        </View>
        <View style={{...styles.formInput, ...styles.inputGroup}}>
          <Text style={styles.label}>Símbolo</Text>
          <TextInput
            placeholder={'0'}
            style={styles.inputSimbol}
            onChangeText={(value) => {
              storeMoneySimbol(value);
              setMoneySimbol(value);
            }}
            defaultValue={moneySimbol}
            value={moneySimbol}
          />
        </View>
      </KeyboardAvoidingView>
      <View>
        <Icon
          style={styles.iconChevronDown}
          name="chevron-down"
          size={20}
          color="#FFF"
          onPress={() => props.setShowModal(false)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    height: '100%',
    backgroundColor: '#000',
    paddingHorizontal: '9.6%',
    justifyContent: 'space-between',
  },
  title: {
    color: '#FFF',
    fontSize: 20,
    fontFamily: 'PoetsenOne-Regular',
    textAlign: 'center',
    marginTop: 20,
  },
  //   formInput: {
  //     marginTop: 25,
  //   },
  label: {
    color: '#BFBFBF',
    textAlign: 'left',
    fontSize: 20,
    fontFamily: 'PoetsenOne-Regular',
    width: '25%',
  },
  inputSimbol: {
    color: '#FFF',
    fontSize: 20,
    fontFamily: 'PoetsenOne-Regular',
    width: '75%',
    textAlign: 'right',
  },
  radioFormContainer: {
    marginBottom: 10,
    marginTop: 25,
  },
  radioButtonContainer: {
    marginVertical: 10,
    marginHorizontal: 5,
  },
  radioButtonLabelStyle: {
    fontSize: 16,
    color: '#BFBFBF',
    fontFamily: 'PoetsenOne-Regular',
  },
  inputGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#707070',
  },
  iconChevronDown: {
    position: 'absolute',
    right: 0,
    bottom: 28,
  },
});

export default App;
