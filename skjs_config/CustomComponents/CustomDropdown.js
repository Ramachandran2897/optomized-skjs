import React, { useState, memo } from 'react';
import {
    Dimensions,
    View,
    ScrollView,
    TextInput,
    SafeAreaView,
    TouchableHighlight,
    TouchableOpacity,
    Text,
    Image,
    StyleSheet,
  } from "react-native";
  import { colors } from "../colors";
  import { fontSize } from "../fontSize";
  import { Picker } from "@react-native-picker/picker";
  import SearchableDropdown from 'react-native-searchable-dropdown';
  export const pickerStyles = StyleSheet.create({
    selectCustomerContainer: {
      backgroundColor: colors.placholderTextColor,
      marginVertical: 10,
      borderRadius: 10,
    },
  });
function CustomDropdown(props) {
    const [value, setSelectedValue] = useState()
    const {items, setDropDownSelectedValue} = props
    return (
        <View style={pickerStyles.selectCustomerContainer}>
            <Picker
            selectedValue={value}
            onValueChange={(itemValue, itemIndex) =>{
                setSelectedValue(itemValue)
                setDropDownSelectedValue(itemValue)
            }
            }
          >
              {items.map((item)=>{
                  return(
                    <Picker.Item label={item.label} value={item.value} />
                  )
              })}
          </Picker>
        </View>
    );
}

export default memo(CustomDropdown);

export const CustomDropDownSecondary = (props)=>{
  const {setSelectedItems, selectedItems, items, placeholder, fieldName, setFieldValue} = props
  return(
    <SearchableDropdown
            onItemSelect={(item) => {
              console.log('items', item)
              setFieldValue(fieldName, item)
            }}
            onChangeText={(value)=>console.log(value)}
            selectedItems={selectedItems}
            containerStyle={{ padding: 5 }}
            itemStyle={{
              padding: 10,
              marginTop: 2,
              backgroundColor: '#ddd',
              borderColor: '#bbb',
              borderWidth: 1,
              borderRadius: 5,
            }}
            itemTextStyle={{ color: '#222' }}
            itemsContainerStyle={{ maxHeight: 140 }}
            items={items}
            // defaultIndex={2}
            resetValue={false}
            textInputProps={
              {
                placeholder: placeholder,
                underlineColorAndroid: "transparent",
                style: {
                    padding: 12,
                    borderWidth: 1,
                    borderColor: '#ccc',
                    borderRadius: 5,
                },
                // onTextChange: text => alert(text)
              }
            }
            listProps={
              {
                nestedScrollEnabled: true,
              }
            }
        />
  )
}