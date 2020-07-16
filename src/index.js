import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Toast from 'rc-toaster';

import PickerList from './pickerList';
import PickerHeader from './pickerHeader';

import './style.less';

function CityPicker({
  data = [],
  regionList = [],
  maskCanClose = true,
  isShowPicker = false,
  placeholder = '请选择城市',
  onFinish,
  onCancel,
}) {
  let [isShow, setIsShow] = useState(isShowPicker); //显示城市与否
  let [tempRegionProvince, setTempRegionProvince] = useState([]); //展示省列表数据
  let [tempRegionCity, setTempRegionCity] = useState([]); //展示市列表数据
  let [tempRegionDistrict, setTempRegionDistrict] = useState([]); //展示区列表数据

  let [region, setRegion] = useState([]); //选择临时数据
  let [regionComplete, setRegionComplete] = useState([]); //选择完成数据
  let [selectTab,setSelectTab] = useState(data.length); //选中tab层级
  let [isComplete, setIsComplete] = useState(false); //是否选择完成

  let [showListTab,setShowListTab] = useState(data.length||1); //显示省市区其一列表
  
  useEffect(() => {
    const provinceList = findRegion(1);
    setTempRegionProvince(provinceList);
    if (data.length === 3) {
      const cityList = findRegion(2,data);
      const districtList = findRegion(3,data);
      const province = provinceList.find(item=>item.id === data[0]);
      const city = cityList.find(item=>item.id === data[1]);
      const district = districtList.find(item=>item.id === data[2]);

      const regionRes = [province,city,district].reduce((res,current,index)=>{
        res.push({
          selected:index === 2?true:false,
          id:current.id,
          parentId:current.parentId,
          name:current.name
        })
        return res
      },[]);

      setTempRegionCity(cityList);
      setTempRegionDistrict(districtList);
      setIsComplete(true);
      setRegion(regionRes);
      setRegionComplete(regionRes)
    }
  }, [data]);

  const _isArray = (arg) => {
    return Object.prototype.toString.call(arg) === '[object Array]'
  };
  const findRegion=(level,region)=>{
    //默认查询省
    if(level === 1){
      return _delChildRegionList(regionList);
    } else if(level === 2){
      const provinceId = _isArray(region)?region[0]:region.id;
      return regionList.find((item) => provinceId === item.id).childRegionList||[];
    } else if(level === 3){
      const provinceId = _isArray(region)?region[0]:region.parentId;
      const districtId = _isArray(region)?region[1]:region.id;
      return regionList.find((item) => provinceId == item.id).childRegionList.find((item) => districtId === item.id).childRegionList||[]||[];
    }
  }
  const _delChildRegionList=(arr)=>{
    let newArr = JSON.parse(JSON.stringify(arr));
    console.log(newArr)
    return newArr.map(item=>{
      delete item.childRegionList;
      return item;
    });
  }
  const handleRegion = (regionData,index) => {
    //返回市信息
      setIsComplete(false);
    if (index === 1) {
      setTempRegionDistrict([]);
      setTempRegionCity(findRegion(2,regionData));
    } else if(index === 2) {
      //返回区信息
      setTempRegionDistrict(findRegion(3,regionData));
    } else{
      setSelectTab(3);
    }
    setRegion(()=>{
      let newArr=region;
      newArr=newArr.map(item=>{
        item.selected = false;
        return item;
      })
      newArr=newArr.slice(0,index-1)
      newArr = [...newArr,{
        selected:index === 3?true:false,
        id:regionData.id,
        parentId:regionData.parentId,
        name:regionData.name
      }]
      return newArr;
    });
    if(index<3){setShowListTab(index+1);}
  };

  const changeTab=(item,index)=>{
    let oldSelectTab = selectTab;
    let newArr = region;
    if(oldSelectTab!==0){
      newArr[oldSelectTab-1].selected = false;
    }
    newArr[index].selected = true;
    setRegion(newArr);
    setSelectTab(index+1);
    setShowListTab(index+1);
  }
  const hideMask=()=>{
    resetRegion();
    if(maskCanClose){
      handleMask();
    }
  }
  const showPicker=()=>{
    setRegion(regionComplete);
    handleMask();
  }
  const handleMask=()=>{
    setIsShow(!isShow);
    if(typeof onCancel === 'function'){
      onCancel.call(this,region)
    }
  }
  const resetRegion=()=>{
    setRegion([]);
    setIsComplete(false);
  }
  const submitPicker=()=>{
    if(region.length!==3){
      return Toast.text('请完善城市信息');
    }
    setRegionComplete(region);
    setIsComplete(true);
    setRegion([]); //清空缓存选项
    setIsShow(!isShow);
    if(typeof onCancel === 'function'){
      onFinish.call(this,region);
    }
  }
  let ShowCity = (<span className="placeholder">{placeholder}</span>);
  if(regionComplete.length===3){
    ShowCity= (<span>{regionComplete.reduce((regionRes,current)=>{regionRes.push(current.name);return regionRes},[]).join(',')}</span>)
  }
  return (
    <div className="w-picker-container">
      <div onClick={showPicker} className="picker-region">
        {ShowCity}
      </div>
      <div className={"w-picker-popup"+(isShow?' show':' hide')}>
        <div onClick={hideMask} className="w-picker-mask"></div>
        <div className="w-picker-body">
          <PickerHeader tempSelectRegion={region} onSubmitPicker={submitPicker} onChangeTab={changeTab}/>
          <div className="w-picker">
              <PickerList showListTab={showListTab} showTabIndex={1} tempRegionList={tempRegionProvince} tempSelectRegion={region} onSelectRegion={handleRegion} />
              <PickerList showListTab={showListTab} showTabIndex={2} tempRegionList={tempRegionCity} tempSelectRegion={region} onSelectRegion={handleRegion} />
              <PickerList showListTab={showListTab} showTabIndex={3} tempRegionList={tempRegionDistrict} tempSelectRegion={region} onSelectRegion={handleRegion} />
          </div>
        </div>
      </div>
    </div>
  );
}

CityPicker.propTypes = {
  data: PropTypes.array, //选中值
  regionList: PropTypes.array.isRequired, //所有城市
  maskCanClose: PropTypes.bool, //点击遮罩是否可以关闭 true
  isShowPicker:PropTypes.bool, //默认是否显示 false
  placeholder:PropTypes.string, //默认显示文案
  onFinish: PropTypes.func, //城市选择完成回调
  onCancel: PropTypes.func, //取消城市选择回调
};

export default CityPicker;
