import React, { memo, forwardRef } from "react";
import SearchableDropdown from "react-native-searchable-dropdown";
const CustomSearchableDropDown = forwardRef((props, ref) => {
  const {
    placeholder,
    ...rest
  } = props;
  return (
      <>
    <SearchableDropdown
      ref={ref}
      {...rest}
      keyboardType={"numeric"}
      containerStyle={{ padding: 5 }}
      itemStyle={{
        padding: 10,
        marginTop: 2,
        backgroundColor: "#ddd",
        borderColor: "#bbb",
        borderWidth: 1,
        borderRadius: 5,
      }}
      itemTextStyle={{ color: "#222" }}
      itemsContainerStyle={{ maxHeight: 140 }}
      resetValue={false}
      textInputProps={{
        placeholder: placeholder,
        underlineColorAndroid: "transparent",
        style: {
          padding: 12,
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 5,
        },
      }}
      listProps={{
        nestedScrollEnabled: true,
      }}
    />
    </>
  )
});
export default memo(CustomSearchableDropDown);
