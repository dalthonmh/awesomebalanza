/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

function App() {
  const [pricePerKilo, setPricePerKilo] = useState(0);
  const [weitght, setWeitght] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [masaSimbol, setMasaSimbol] = useState('Kg');

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
    <View style={styles.body}>
      <View>
        <View>
          <TouchableOpacity style={styles.btnRepeat} onPress={cleanInputs}>
            <Text style={styles.btnText}>De nuevo</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.formInput}>
          <Text style={styles.label}>¿Cúanto está el Kilo?</Text>
          <View style={styles.inputGroup}>
            <Text style={styles.moneySimbol}>S/</Text>
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
            <View style={styles.resultGroupRight}>
              <Text style={styles.textNumberResult}>S/</Text>
              <Text style={styles.textNumberResult}>{totalCost}</Text>
            </View>
          </View>
        </View>
      </View>
      <View>
        <Text style={styles.about}>awesomebalanza</Text>
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
  btnRepeat: {
    width: '100%',
    height: 49,
    borderRadius: 25,
    backgroundColor: 'rgba(29,185,84,0.9)',
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
    backgroundColor: 'rgba(29,185,84,0.9)',
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
});

export default App;
