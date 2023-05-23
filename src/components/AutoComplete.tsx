import React, { memo, useCallback, useRef, useState, useEffect } from 'react';
import { Dimensions, Platform, Text } from 'react-native';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import Feather from 'react-native-vector-icons/Feather';
import { useIsFocused } from '@react-navigation/native';
import { useStores } from '../store/Store';
Feather.loadFont()

const AutocompleteSearch = memo((props: any) => {

  const isFocused = useIsFocused();
  const authStore = useStores();
  const [loading, setLoading] = useState(true);
  const [suggestionsList, setSuggestionsList] = useState([]);
  const [dataSet, setDataSet] = useState<any>([]);
  const [fetchComplete, setFetchComplete] = useState(false); // Add new state variable
  const dropdownController = useRef(null);


  const fetchData = async () => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${authStore.authToken}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    try {
      const response = await fetch('http://20.172.135.207/api/api/v1/brand', requestOptions);
      const result = await response.json();
      setDataSet(result?.data);
    } catch (error) {
      console.log('error', error);
    } finally {
      setLoading(false);
      setFetchComplete(true); // Set fetch completion flag
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  const handleSearch = (value: any) => {
    if (value === '' || value === undefined) {
      props.setManual(false);
      setDataSet(dataSet);
      props.setSelected(null);
    } else {
      const results = dataSet?.filter((item: any) => item?.title?.toLowerCase().includes(value.toLowerCase()));
      if (results.length <= 0) {
        props.setManual(true);
      }
      setDataSet(results);
    }
  };

  const onClearPress = useCallback(() => {
    props.setManual(false);
    fetchData();
    props.setSelected(null);
  }, []);

  const onOpenSuggestionsList = useCallback((isOpened: any) => { }, []);


  // Wait for fetch to complete before rendering the AutocompleteDropdown
  if (!fetchComplete) {
    return null; // or render a loading indicator
  }

  return (
    <>
      <AutocompleteDropdown
        controller={(controller: any) => {
          dropdownController.current = controller
        }}
        direction={Platform.select({ ios: 'down' })}
        dataSet={dataSet}
        onSelectItem={(item: any) => {
          console.log("🚀 ~ file: AutoComplete.tsx:142 ~ AutocompleteSearch ~ item:", item)
          props.setSelected(item)
        }}
        onChangeText={(value: any) => handleSearch(value)}
        debounce={600}
        suggestionsListMaxHeight={Dimensions.get('window').height * 0.4}
        onClear={onClearPress}
        //  onSubmit={(e) => onSubmitSearch(e.nativeEvent.text)}
        onOpenSuggestionsList={onOpenSuggestionsList}
        loading={loading}
        useFilter={false} // set false to prevent rerender twice
        textInputProps={{
          placeholder: 'Søki butikker, kort...',
          autoCorrect: false,
          autoCapitalize: 'none',
          style: {
            borderRadius: hp(1),
            paddingLeft: hp(2),
            fontFamily: 'OpenSans-Regular',
            color: '#6080A0',
            zIndex: 1,
            fontSize: hp(2)
          },
        }}
        rightButtonsContainerStyle={{
          right: 8,
          height: hp(4),
          zIndex: 1,
          alignSelf: 'center',
        }}
        inputContainerStyle={{
          borderRadius: hp(1.5),
          zIndex: 1,
        }}
        suggestionsListContainerStyle={{
          backgroundColor: '#6080A0',
          zIndex: 1,
        }}
        containerStyle={{
          width: wp(80),
          height: hp(6.5),
          borderRadius: hp(1.5),
          zIndex: 1,
          backgroundColor: 'red'
        }}
        renderItem={(item, text) => <Text style={{ color: '#fff', padding: 15 }}>{item.title}</Text>}
        ChevronIconComponent={<Feather name="chevron-down" size={hp(3)} color="#000" />}
        ClearIconComponent={<Feather name="x-circle" size={hp(2.5)} color="#000" />}
        inputHeight={hp(6.5)}
        showChevron={true}
        closeOnBlur={false}
      //  showClear={false}
      />
      {/* <Button style={{ flexGrow: 0 }} title="Toggle" onPress={() => dropdownController?.current?.toggle()} /> */}
    </>
  )
})

export default AutocompleteSearch;
