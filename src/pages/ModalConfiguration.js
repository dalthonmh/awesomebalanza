/**
 * Awesome Balanza
 * https://github.com/D4ITON/awesomebalanza
 *
 * @format
 * @flow strict-local
 */

import React, {useContext} from 'react';
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
import {Picker} from '@react-native-community/picker';
import Icon from 'react-native-vector-icons/Feather';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import {AvailableLanguages} from '../translations';
import {LocalizationContext} from '../LocalizationContext';

function ModalConfiguration(props) {
  const {
    moneySimbol,
    storeMoneySimbol,
    storeColorTheme,
    setColorTheme,
    radioButtonIndex,
    setRadioButtonIndex,
    setMoneySimbol,
    storeRadioButtonIndex,
    actualLanguage,
    setActualLanguage,
    storeActualLanguage,
    storeMasaSymbol,
    setMasaSimbol,
  } = props;

  const {translations, setAppLanguage} = useContext(LocalizationContext);

  var radio_props = [
    {label: translations.GREEN, value: 0, color: '#1db954'},
    {label: translations.BLUE, value: 1, color: '#207EBC'},
    {label: translations.PINK, value: 2, color: '#EE6565'},
    {label: translations.ORANGE, value: 3, color: '#EFB517'},
    {label: translations.VIOLET, value: 4, color: '#C31FEB'},
  ];

  return (
    <View style={styles.body}>
      <KeyboardAvoidingView behavior="height">
        <View>
          <Text style={styles.title}>awesomebalanza</Text>
        </View>
        <View>
          <Text style={styles.label}>{translations.THEME}</Text>
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
                          `${obj.label} ${translations.APPLIED}`,
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
                          `${obj.label} ${translations.APPLIED}`,
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
        <View style={styles.inputGroup}>
          <Text style={{...styles.label, ...styles.labelMoney}}>
            {translations.MONEY_SIMBOL}
          </Text>
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
        <View style={styles.formInput}>
          <Text style={styles.label}>{translations.LANGUAGE}</Text>
          <View style={styles.pickerWrapper}>
            <IconAntDesign name="caretdown" style={styles.pickerIcon} />
            <Picker
              selectedValue={actualLanguage}
              style={styles.pikerStyles}
              prompt="Available languages"
              onValueChange={(itemValue) => {
                setActualLanguage(itemValue);
                setAppLanguage(itemValue);
                storeActualLanguage(itemValue);

                storeMasaSymbol(translations.SYMBOL_KILO);
                setMasaSimbol(translations.SYMBOL_KILO);
              }}>
              {AvailableLanguages.map((language, index) => (
                <Picker.Item
                  index={index}
                  label={language.label}
                  value={language.value}
                />
              ))}
            </Picker>
          </View>
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
    marginBottom: 20,
  },
  formInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 25,
  },
  label: {
    color: '#BFBFBF',
    textAlign: 'left',
    fontSize: 20,
    fontFamily: 'PoetsenOne-Regular',
    width: '45%',
  },
  labelMoney: {
    width: '65%',
  },
  inputSimbol: {
    color: '#FFF',
    fontSize: 20,
    fontFamily: 'PoetsenOne-Regular',
    width: '35%',
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
  pikerStyles: {
    height: 45,
    width: 160,
    color: '#FFF',
  },
  pickerWrapper: {
    borderColor: '#707070',
    borderWidth: 1,
    backgroundColor: '#191919',
    borderRadius: 4,
    paddingLeft: 15,
  },
  pickerIcon: {
    color: '#FFF',
    position: 'absolute',
    zIndex: 10,
    bottom: 15,
    right: 10,
    fontSize: 20,
  },

  pickerContent: {
    color: 'green',
    backgroundColor: 'transparent',
  },
  iconChevronDown: {
    position: 'absolute',
    right: 0,
    bottom: 28,
  },
});

export default ModalConfiguration;
