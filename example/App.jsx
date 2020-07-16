import { hot } from 'react-hot-loader/root';
import React, { Component } from 'react';
import CityPicker from '../src/index';
// import CityPicker from 'react-region-picker';
import styled from 'styled-components';
// import CityData from 'react-region-picker/lib/city.json';
import CityData from '../src/city.json';
// import 'react-region-picker/lib/style.css'
import '../src/style.less';

const Box = styled.div`
  display:flex;
  padding:10px 20px;
`;

const CityRight = styled.div`
  flex:1;
  position:relative;
  padding-left:20px;
  ::after{
    content: " ";
    display: inline-block;
    height: 6px;
    width: 6px;
    border-color: #999;
    border-style: solid;
    border-width: 1px 1px 0 0;
    transform: matrix(.71,.71,-.71,.71,0,0);
    position: absolute;
    top: 50%;
    margin-top: -5px;
    right: 0;
  }
`;


class App extends Component {
  render() {
    return (
    <Box>
      <div>城市</div>
      <CityRight>
        <CityPicker regionList={CityData} data={[]} />
      </CityRight>
    </Box>
    );
  }
}
export default hot(App);