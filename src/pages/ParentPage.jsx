

import React, { useEffect } from 'react';
import {Text, View, StyleSheet, Linking} from 'react-native';
import { Button } from "@rneui/base";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Settings from './settings/Settings';
import Chat from './Chat';
import { useDispatch, useSelector } from 'react-redux';
import { logout, reset } from '../redux/AuthSlice';
import { sosTrue } from '../redux/SosSlice';

const Tab = createBottomTabNavigator();

const ParentPage = ({ navigate, sos, setSos } ) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("WelcomePage")
  
  };

  return(
  <View>
    <Text>
      Parent
    </Text>
    <Text>
      {user?.fullName}
    </Text>
    <Text>
    {user?.fullName}
    </Text>
    <View>
          <Button 
            styles={styles.logoutBtn}
            title="Log Out"
            onPress={onLogout}

            /> 
        </View>
    {sos && (
      <View style={styles.SosCall}>
       <Text style={styles.SosCall}>
        SOS call from your child!
      </Text>
      <Button color={'black'} onPress={() => Linking.openURL('tel: 0525848456')} title='Call The Police'/>
      <Button color={'black'} onPress={() => setSos(false)} title='Close'/>
      </View>
    )}
  </View>

  )}

export default ParentPage;

const styles = StyleSheet.create({

  text:{
    marginTop:100,
    textAlign:'center'
  },
  SosCall:{
    backgroundColor:'#D51807',
    textAlign:'center',
    padding:5,
    color:'white',
    fontWeight:'700',
    borderRadius:10
  },

  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    marginTop: 50,
    color: '#16213E',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15
  },
  logoutBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#FF1493",
  },
});

