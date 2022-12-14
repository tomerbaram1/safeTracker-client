import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Button,
  ScrollView,
  Linking,
} from "react-native";
import axios from "axios";
import * as Clipboard from 'expo-clipboard';
import { FAB, Icon, Tooltip } from "@rneui/base";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";



const api = axios.create({ baseURL: "http://172.20.10.4:4000" });

const ChildList = ({ }) => {
  const [kids, setKids] = useState([]);
  const [openHistory, setOpenHistory] = useState(false);
  const { user, child } = useSelector((state) => state.auth);
  const id = user?._id;
  const getKidsData = () => {
    console.log(id+" user's id")
    api
      .post('/api/addchild',{id:id})
      
      .then((res) => {
        console.log(id,"id after get")
        const data = res.data;
        setKids(data.children);
        console.log(data.children,"kids");

      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    getKidsData();
  }, []);


  return (
    <View style={styles.listView}>
      <ScrollView horizontal={true}>

        {kids?kids.map((data, index) => {
          if (kids.length == 0) {
            return <Text>no kids registerd</Text>;
          }
          return (
            <View key={index} style={styles.kidView}>
              <Text style={styles.kidName}>
                <Icon
                  style={{ marginRight: 15 }}
                  name="child"
                  type="font-awesome"
                  size={30}
                />
                {data.childname || data.childName}
              </Text>
              <Text style={{ fontWeight: "700" }}>
                <Icon
                  style={{ marginRight: 15 }}
                  type="font-awesome"
                  name="phone"
                />
                {data.phone}
              </Text>
              <Text style={{ fontWeight: "700", fontSize:10 }} selectable={true}>
                <Icon
                  style={{ marginRight: 10 }}
                  type="font-awesome"
                  name="key"
                />
                {data.connectionToken}
  
                <Icon
                  style={{ marginLeft: 10 }}
                  type="font-awesome"
                  name="clone"
                  size={20}
                  onPress={()=>Clipboard.setStringAsync(`Your Connection Token Is: ${data.connectionToken}`)&& alert('Token Copied!')}
                  
                />
              </Text>
              <View style={styles.battery}>
                <Text>
                  <Icon
                    style={styles.batteryIcon}
                    name="battery"
                    type="font-awesome"
                    size={15}
                  />
                  {data.batteryLevel}%
                </Text>
              </View>
              <View style={{display:'flex', justifyContent:'center', alignItems:'center'}}>

              <FAB
                icon={{ name: "message", color: "white" }}
                color="#495867"
                style={styles.msg}
                onPress={() => Linking.openURL(`https://wa.me/972${(data.phone).slice(1,10)}`)}
                />
              <FAB
                // title="Location History"
                icon={{ name: "place", color: "white" }}
                color="#495867"
                style={{ marginTop: 15}}
                onPress={() => setOpenHistory(!openHistory)}
                />
                </View>
              {openHistory && (
                <ScrollView horizontal={true}>
                  <View>
                    <Text>
                      {data.events.map((loc, index) => {
                        return (
                          <View style={styles.locationList} key={index}>
                            <Text>
                              {new Date(loc.time * 1000)
                                .toLocaleString()
                                .slice(12, 17)}
                            </Text>
                            <Text style={{ fontWeight: "700" }}>
                              {loc.event}
                            </Text>
                          </View>
                        );
                      })}
                    </Text>
                  </View>
                </ScrollView>
              )}
            </View>
          );
        }):""}
      </ScrollView>
    </View>
  );
};

export default ChildList;

const styles = StyleSheet.create({
  kidView: {
    backgroundColor: "#9fbad6",
    width: Dimensions.get("window").width /2 +10,
    height: "auto",
    minHeight: 210,
    padding: 30,
    borderRadius: 20,
    margin: 5,
    display:'flex',
    // alignItems:'center',
    alignContent:'center'
  },
  kidName: {
    fontSize: 20,
    fontWeight: "900",
  },
  battery: {
    top: 10,
    right: 10,
    position: "absolute",
    display: "flex",
    justifyContent: "center",
  },
  locationList: {
    display: "flex",
    justifyContent: "center",
    margin: 10,
  },
  msg: {
    marginTop:20
  },

});
