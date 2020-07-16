# react-region-picker
react hooks版本 城市地区联动

## install
```
npm install --save react-region-picker
```
## usage
```
import CityPicker from 'react-region-picker';
import CityData from 'react-region-picker/lib/city.json';
import 'react-region-picker/lib/style.css';

<CityPicker regionList={CityData} data={[]} />
```

## API
| 属性 | 说明 | 类型 | 默认值 |
| :---------- | :--- | :--- | :--- |
| regionList | 数据源 | Array<id,name,shortName,parentId,childRegionList> | - |
| data | 选中值 | Array<number,number,number> | - |
| maskCanClose | 点击遮罩是否可以关闭 | Boolean | true |
| isShowPicker | 主动显示 | Boolean | false |
| placeholder | 默认显示文案 | String | '请选择城市' |
| onFinish | 城市选择完成回调 | Function | - |
| onCancel | 取消城市选择回调 | Function | - |