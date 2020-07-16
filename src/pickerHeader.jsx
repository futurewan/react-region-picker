import React from 'react';
import PropTypes from 'prop-types';

const emptyArray = ['城市', '区县'];

function pickerHeader({
  tempSelectRegion,
  onSubmitPicker,
  onChangeTab
}) {
  
  return (
    <div className="w-picker-header">
      <div className="picker-header_tab">
        {/* <div className="empty-text">请选择</div> */}

        {tempSelectRegion.length ? (
          tempSelectRegion.map((item, index) => (
            <div key={item.id} className={'choose-item' + (item.selected ? ' selected' : '')} onClick={
              () => { 
                onChangeTab(item, index) 
                }
              }>
              <span>{item.name}</span>
            </div>
          ))
        ) : (
            <div className="no-data">请选择</div>
          )}
        {
          tempSelectRegion.length > 0 && tempSelectRegion.length < 3 && (<div className="choose-item selected">{emptyArray[tempSelectRegion.length - 1]}</div>)
        }
      </div>
      <div onClick={onSubmitPicker} className="picker-header_right">确定</div>
    </div>
  )
}

pickerHeader.propTypes = {
  tempSelectRegion: PropTypes.array, //已选地区集合
  onSubmitPicker: PropTypes.func, //提交回调
  onChangeTab: PropTypes.func, //切换省市区回调
};

export default pickerHeader;
