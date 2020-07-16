import React from 'react';
import PropTypes from 'prop-types';

function pickerList({showListTab,showTabIndex,tempRegionList,tempSelectRegion,onSelectRegion}) {
  const selectRegion = tempSelectRegion[showTabIndex-1];
  return (
    <ul className={'picker-list'+(showListTab===showTabIndex?' show':'')}>
      {tempRegionList.map(item => (
        <li
          className={(selectRegion && selectRegion.id === item.id) ? 'selected':''}
          onClick={() => {
            onSelectRegion(item,showTabIndex);
          }}
          key={item.id}
        >
          {item.name}
        </li>
      ))}
    </ul>
  )
}
pickerList.propTypes = {
  showListTab: PropTypes.number, //当前地区层级
  showTabIndex: PropTypes.number, //当前地区层级（标识）
  tempRegionList: PropTypes.array, //当前地区列表
  tempSelectRegion: PropTypes.array, //已选地区集合
  onSelectRegion: PropTypes.func, //选择后回调
};
export default pickerList;