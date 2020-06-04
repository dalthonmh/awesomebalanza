/**
 * Awesome Balanza
 * https://github.com/D4ITON/awesomebalanza
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import ModalConfiguration from './ModalConfiguration';
import AsyncStorage from '@react-native-community/async-storage';

function App() {
  const [pricePerKilo, setPricePerKilo] = useState(0);
  const [weitght, setWeitght] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [masaSimbol, setMasaSimbol] = useState('Kg');
  const [moneySimbol, setMoneySimbol] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [colorTheme, setColorTheme] = useState('');
  const [radioButtonIndex, setRadioButtonIndex] = useState(0);

  const [configurationMoneyLoaded, setConfigurationMoneyLoaded] = useState(
    false,
  );
  const [configurationThemeLoaded, setConfigurationThemeLoaded] = useState(
    false,
  );
  const [
    configurationRadioIndexLoaded,
    setConfigurationRadioIndexLoaded,
  ] = useState(false);

  useEffect(() => {
    if (
      !configurationMoneyLoaded ||
      !configurationThemeLoaded ||
      !configurationRadioIndexLoaded
    ) {
      loadMoneySimbolConfiguration();
      loadColorThemeConfiguration();
      loadRadioConfiguration();
    }
  });

  const loadMoneySimbolConfiguration = async () => {
    try {
      const valueMoney = await AsyncStorage.getItem('MONEY_SIMBOL');
      if (valueMoney !== null) {
        setMoneySimbol(valueMoney);
      } else {
        try {
          await AsyncStorage.setItem('MONEY_SIMBOL', 'S/');
        } catch (e) {
          console.log(e);
        }
      }
    } catch (e) {
      console.log(e);
    }

    setConfigurationMoneyLoaded(true);
  };

  // eslint-disable-next-line no-unused-vars
  const clearAll = async () => {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      console.log(e);
    }

    console.log('Done.');
  };

  const loadColorThemeConfiguration = async () => {
    try {
      const valueTheme = await AsyncStorage.getItem('COLOR_THEME');
      if (valueTheme !== null) {
        setColorTheme(valueTheme);
      } else {
        try {
          await AsyncStorage.setItem('COLOR_THEME', '#1db954');
        } catch (e) {
          console.log(e);
        }
      }
    } catch (e) {
      console.log(e);
    }

    setConfigurationThemeLoaded(true);
  };

  const loadRadioConfiguration = async () => {
    try {
      const valueRadioIndex = await AsyncStorage.getItem('RADIOBUTTON_INDEX');
      if (valueRadioIndex !== null) {
        let valueRadioIndexInt = parseInt(valueRadioIndex, 10);
        setRadioButtonIndex(valueRadioIndexInt);
      } else {
        try {
          await AsyncStorage.setItem('RADIOBUTTON_INDEX', '0');
        } catch (e) {
          console.log(e);
        }
      }
    } catch (e) {
      console.log(e);
    }
    setConfigurationRadioIndexLoaded(true);
  };

  const storeMoneySimbol = async (value) => {
    try {
      await AsyncStorage.setItem('MONEY_SIMBOL', value);
    } catch (e) {
      console.log(e);
    }
  };

  const storeColorTheme = async (value) => {
    try {
      await AsyncStorage.setItem('COLOR_THEME', value);
    } catch (e) {
      console.log(e);
    }
  };

  const storeRadioButtonIndex = async (value) => {
    try {
      let valueString = value.toString();
      await AsyncStorage.setItem('RADIOBUTTON_INDEX', valueString);
    } catch (e) {
      console.log(e);
    }
  };

  const calculateTotalCost = (weitghtParam, pricePerKiloParam) => {
    if (masaSimbol === 'Kg') {
      let resultFixed = (weitghtParam * pricePerKiloParam).toFixed(2);
      setTotalCost(resultFixed);
    } else {
      let resultFixed = ((weitghtParam * pricePerKiloParam) / 1000).toFixed(2);
      setTotalCost(resultFixed);
    }
  };

  const cleanInputs = () => {
    setPricePerKilo(0);
    setWeitght(0);
    setTotalCost(0);
    //clearAll(); // borra el storage
  };

  const converKiloToGramsAndViceVersa = () => {
    if (masaSimbol === 'Kg') {
      setMasaSimbol('gr');
      setWeitght(weitght / 1000);
    } else {
      setMasaSimbol('Kg');
      setWeitght(weitght * 1000);
    }
  };

  return (
    <>
      <View style={styles.body}>
        <KeyboardAvoidingView behavior="padding">
          <View>
            <TouchableOpacity
              style={{...styles.btnRepeat, backgroundColor: colorTheme}}
              onPress={cleanInputs}>
              <Text style={styles.btnText}>De nuevo</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.formInput}>
            <Text style={styles.label}>¿Cúanto está el Kilo?</Text>
            <View style={styles.inputGroup}>
              <Text style={styles.moneySimbol}>{moneySimbol}</Text>
              <TextInput
                placeholder={'0'}
                style={styles.inputNumberPrice}
                keyboardType="numeric"
                onChangeText={(value) => {
                  calculateTotalCost(weitght, value);
                  setPricePerKilo(value);
                }}
                value={pricePerKilo}
              />
            </View>
          </View>
          <View style={styles.formInput}>
            <Text style={styles.label}>¿Cúanto pesa?</Text>
            <View style={styles.inputGroup}>
              <TextInput
                placeholder={'0'}
                style={styles.inputNumberWeight}
                keyboardType="numeric"
                onChangeText={(value) => {
                  calculateTotalCost(value, pricePerKilo);
                  setWeitght(value);
                }}
                value={weitght}
              />
              <TouchableOpacity onPress={converKiloToGramsAndViceVersa}>
                <Text style={styles.moneySimbol}>{masaSimbol}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.formInput}>
            <View style={styles.resultGroup}>
              <View style={styles.resultGroupLeft}>
                <Text style={styles.moneySimbol}>Sale:</Text>
              </View>
              <View
                style={{
                  ...styles.resultGroupRight,
                  backgroundColor: colorTheme,
                }}>
                <Text style={styles.textNumberResult}>{moneySimbol}</Text>
                <Text style={styles.textNumberResult}>{totalCost}</Text>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
        <View style={styles.footer}>
          <Text style={styles.about}>awesomebalanza</Text>
          <Icon
            style={styles.iconChevronUp}
            name="chevron-up"
            size={20}
            color="#FFF"
            onPress={() => setShowModal(true)}
          />
        </View>
      </View>
      <Modal visible={showModal} animationType="slide">
        <ModalConfiguration
          setShowModal={setShowModal}
          moneySimbol={moneySimbol}
          setMoneySimbol={setMoneySimbol}
          storeMoneySimbol={storeMoneySimbol}
          setColorTheme={setColorTheme}
          storeColorTheme={storeColorTheme}
          radioButtonIndex={radioButtonIndex}
          setRadioButtonIndex={setRadioButtonIndex}
          storeRadioButtonIndex={storeRadioButtonIndex}
        />
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  body: {
    height: '100%',
    backgroundColor: '#000',
    paddingHorizontal: '9.6%',
    justifyContent: 'space-between',
  },
  btnRepeat: {
    width: '100%',
    height: 49,
    borderRadius: 25,
    // backgroundColor: 'rgba(29,185,84,0.9)',
    // backgroundColor: colorTheme,
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 20,
  },
  btnText: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'PoetsenOne-Regular',
  },
  formInput: {
    marginTop: 25,
  },
  label: {
    color: '#BFBFBF',
    textAlign: 'left',
    fontSize: 20,
    fontFamily: 'PoetsenOne-Regular',
  },
  inputGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#707070',
  },
  moneySimbol: {
    color: '#BFBFBF',
    fontSize: 20,
    fontFamily: 'PoetsenOne-Regular',
    marginTop: 0,
  },
  inputNumberPrice: {
    color: '#FFF',
    fontSize: 20,
    fontFamily: 'PoetsenOne-Regular',
    marginTop: 0,
    textAlign: 'right',
    width: '90%',
  },
  inputNumberWeight: {
    color: '#FFF',
    fontSize: 20,
    fontFamily: 'PoetsenOne-Regular',
    marginTop: 0,
    textAlign: 'left',
    width: '90%',
  },
  resultGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  resultGroupLeft: {
    width: '50%',
  },
  resultGroupRight: {
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor: 'rgba(29,185,84,0.9)',
    // backgroundColor: colorTheme,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  textNumberResult: {
    color: '#FFF',
    fontSize: 20,
    fontFamily: 'PoetsenOne-Regular',
  },
  about: {
    color: '#343434',
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'PoetsenOne-Regular',
    marginBottom: 28,
  },
  iconChevronUp: {
    position: 'absolute',
    right: 0,
    bottom: 28,
  },
});

export default App;
