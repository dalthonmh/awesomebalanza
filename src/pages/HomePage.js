/**
 * Awesome Balanza
 * https://github.com/D4ITON/awesomebalanza
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect, useContext} from 'react';
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
import {LocalizationContext} from '../LocalizationContext';

function HomePage() {
  const [pricePerKilo, setPricePerKilo] = useState(0);
  const [weitght, setWeitght] = useState(0);
  const [priceValueOf, setPriceValueOf] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [masaSimbol, setMasaSimbol] = useState('');
  const [moneySimbol, setMoneySimbol] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [colorTheme, setColorTheme] = useState('');
  const [radioButtonIndex, setRadioButtonIndex] = useState(0);
  const [actualLanguage, setActualLanguage] = useState('');
  const [actualLanguageLoaded, setActualLanguageLoaded] = useState(false);
  const [configMoneyLoaded, setConfigMoneyLoaded] = useState(false);
  const [configThemeLoaded, setConfigThemeLoaded] = useState(false);
  const [configRadioIndexLoaded, setConfigRadioIndexLoaded] = useState(false);
  const [configWeightSimbol, setConfigWeightSimbol] = useState(false);
  const [calculateMode, setCalculateMode] = useState('weight');

  const {translations, appLanguage, setAppLanguage} = useContext(
    LocalizationContext,
  );

  const SYMBOL_KILO = 'kg';
  const SYMBOL_GRAMO = 'gr';

  useEffect(() => {
    if (
      !configMoneyLoaded ||
      !configThemeLoaded ||
      !configRadioIndexLoaded ||
      !configWeightSimbol ||
      !actualLanguageLoaded
    ) {
      loadMoneySimbolConfiguration();
      loadColorThemeConfiguration();
      loadRadioConfiguration();
      loadConfigWeightSimbol();
      loadActualLanguage();
    }
  });

  // CARGA CUANDO LA APP INICIA
  const loadActualLanguage = async () => {
    try {
      const valueLanguage = await AsyncStorage.getItem('APP_LANGUAGE_UPDATE');
      if (valueLanguage !== null) {
        setActualLanguage(valueLanguage);
        setAppLanguage(valueLanguage);
      } else {
        try {
          await AsyncStorage.setItem('APP_LANGUAGE_UPDATE', appLanguage);
        } catch (e) {
          console.log(e);
        }
      }
    } catch (e) {
      console.log(e);
    }

    setActualLanguageLoaded(true);
  };

  const loadConfigWeightSimbol = async () => {
    try {
      const valueWeight = await AsyncStorage.getItem('WEIGHT_SIMBOL');
      if (valueWeight !== null) {
        setMasaSimbol(valueWeight);
      } else {
        try {
          // await AsyncStorage.setItem('WEIGHT_SIMBOL', translations.SYMBOL_KILO);
          await AsyncStorage.setItem('WEIGHT_SIMBOL', 'Kg');
        } catch (e) {
          console.log(e);
        }
      }
    } catch (e) {
      console.log(e);
    }

    setConfigWeightSimbol(true);
  };

  const loadMoneySimbolConfiguration = async () => {
    try {
      const valueMoney = await AsyncStorage.getItem('MONEY_SIMBOL');
      if (valueMoney !== null) {
        setMoneySimbol(valueMoney);
      } else {
        try {
          await AsyncStorage.setItem('MONEY_SIMBOL', '$');
        } catch (e) {
          console.log(e);
        }
      }
    } catch (e) {
      console.log(e);
    }

    setConfigMoneyLoaded(true);
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

    setConfigThemeLoaded(true);
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
    setConfigRadioIndexLoaded(true);
  };

  // LIMPIA EL ASYNCSTORAGE
  // eslint-disable-next-line no-unused-vars
  const clearAll = async () => {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      console.log(e);
    }

    console.log('Storage cleared');
  };

  // GUARDA EN EL ASYNCSTORAGE
  const storeActualLanguage = async (value) => {
    try {
      await AsyncStorage.setItem('APP_LANGUAGE_UPDATE', value);
    } catch (e) {
      console.log(e);
    }
  };

  const storeMoneySimbol = async (value) => {
    try {
      await AsyncStorage.setItem('MONEY_SIMBOL', value);
    } catch (e) {
      console.log(e);
    }
  };

  const storeMasaSymbol = async (value) => {
    try {
      await AsyncStorage.setItem('WEIGHT_SIMBOL', value);
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

  // FUNCIONES PRINCIPALES
  /**
   * calculateTotalCost
   * operacion: resultado = peso * pesoxkilo
   * @param {Number} weitghtParam
   * @param {Number} pricePerKiloParam
   */
  const calculateTotalCost = (weitghtParam, pricePerKiloParam) => {
    if (masaSimbol === translations.SYMBOL_KILO) {
      let resultFixed = parseFloat(
        (weitghtParam * pricePerKiloParam).toFixed(2),
      );
      setTotalCost(resultFixed);
    } else {
      let resultFixed = parseFloat(
        ((weitghtParam * pricePerKiloParam) / 1000).toFixed(2),
      );
      setTotalCost(resultFixed);
    }
  };

  /**
   * Calcula el peso total de vender
   * operacion: resultado = precioxkilo / precioValor
   * @param {Number} pricePerKiloParam precio por kilo
   * @param {Number} priceValueOf valor a cuanto quiere vender
   */
  const calculateTotalWeight = (pricePerKiloParam, priceValueOfParam) => {
    if (priceValueOfParam !== 0) {
      let result = priceValueOfParam / pricePerKiloParam;
      let resultFixed = parseFloat(result.toFixed(3));
      setTotalCost(resultFixed);
    } else {
      setTotalCost(0);
    }
  };

  // Boton de nuevo
  const cleanInputs = () => {
    setPricePerKilo(0);
    setWeitght(0);
    setTotalCost(0);
    setPriceValueOf(0);
    // clearAll(); // borra el storage
  };

  // Convierte de kilos a gramos y visceversa
  const converKiloToGramsAndViceVersa = () => {
    if (masaSimbol === translations.SYMBOL_KILO) {
      setMasaSimbol(translations.SYMBOL_GRAMO);
      setWeitght(weitght / 1000);
    } else {
      setMasaSimbol(translations.SYMBOL_KILO);
      setWeitght(weitght * 1000);
    }
  };

  // Render..
  return (
    <>
      <View style={styles.body}>
        <KeyboardAvoidingView behavior="padding">
          {/* TEXT - RESULTADO */}
          <View style={styles.formInput}>
            <View style={styles.resultGroup}>
              <View style={styles.resultGroupLeft}>
                <Text style={styles.moneySimbol}>
                  {translations.HOW_MUCH_COST}
                </Text>
              </View>
              <View
                style={{
                  ...styles.resultGroupRight,
                  backgroundColor: colorTheme,
                }}>
                {calculateMode === 'weight' ? (
                  <>
                    <Text style={styles.textNumberResult}>{totalCost}</Text>
                    <Text style={styles.textNumberResult}>{masaSimbol}</Text>
                  </>
                ) : (
                  <>
                    <Text style={styles.textNumberResult}>{moneySimbol}</Text>
                    <Text style={styles.textNumberResult}>{totalCost}</Text>
                  </>
                )}
              </View>
            </View>
          </View>
          {/* INPUT - Cuanto está el kilo */}
          <View style={styles.formInput}>
            <Text style={styles.label}>{translations.HOW_MUCH_IS_KILO}</Text>
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
          {
            // MODO DE CALCULAR: WEIGHT O PRICE
            calculateMode === 'weight' ? (
              <>
                {/* INPUT - Valor de cuanto */}
                <View style={styles.formInput}>
                  <Text style={styles.label}>¿Valor de cuánto?</Text>
                  <View style={styles.inputGroup}>
                    <Text style={styles.moneySimbol}>{moneySimbol}</Text>
                    <TextInput
                      placeholder={'0'}
                      style={styles.inputNumberPrice}
                      keyboardType="numeric"
                      onChangeText={(value) => {
                        calculateTotalWeight(pricePerKilo, value);
                        setPriceValueOf(value);
                      }}
                      value={priceValueOf}
                    />
                  </View>
                </View>
              </>
            ) : (
              <>
                {/* INPUT - Cuanto pesa */}
                <View style={styles.formInput}>
                  <Text style={styles.label}>
                    {translations.HOW_MUCH_WEIGH}
                  </Text>
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
              </>
            )
          }

          {/* BOTON repetir */}
          <View>
            <TouchableOpacity
              style={{...styles.btnRepeat, backgroundColor: colorTheme}}
              onPress={cleanInputs}>
              <Text style={styles.btnText}>{translations.AGAIN}</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
        {/* FOOTER - AwesomeBalanza */}
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
          calculateMode={calculateMode}
          setCalculateMode={setCalculateMode}
          setColorTheme={setColorTheme}
          storeColorTheme={storeColorTheme}
          radioButtonIndex={radioButtonIndex}
          setRadioButtonIndex={setRadioButtonIndex}
          storeRadioButtonIndex={storeRadioButtonIndex}
          actualLanguage={actualLanguage}
          setActualLanguage={setActualLanguage}
          storeActualLanguage={storeActualLanguage}
          setMasaSimbol={setMasaSimbol}
          storeMasaSymbol={storeMasaSymbol}
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
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  textNumberResult: {
    color: '#FFF',
    fontSize: 25,
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

export default HomePage;
