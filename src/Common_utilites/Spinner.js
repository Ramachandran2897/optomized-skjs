import React, { Component,useState } from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import { connect } from 'react-redux';
import {
    Platform
} from 'react-native';
const Spin = (props)=>{
    return (
        <Spinner
        visible={props.loader}
        textContent={Platform.OS == 'android' && 'Loading...'}
        textStyle={{color: 'white'}}
        animation="fade"
      />
    )
}
const mapStateToProps = (state)=>{
    return {
      loader: state.Loader
    }
  }
  export default connect(mapStateToProps,null)(Spin);