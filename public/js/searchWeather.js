
// var map = new AMap.Map("container", {
//  center: [116.397428, 39.90923],
//  zoom: 13
// });

//获取用户所在城市信息
function showCityInfo() {
 //实例化城市查询类
 var citysearch = new AMap.CitySearch();
 //自动获取用户IP，返回当前城市
 citysearch.getLocalCity(function (status, result) {
  console.log(status,result);
    
  if (status === 'complete' && result.info === 'OK') {
   if (result && result.city && result.bounds) {
    console.log(result);
    
    // var cityinfo = result.city;
    // var citybounds = result.bounds;
    // document.getElementById('info').innerHTML = '您当前所在城市：' + cityinfo;
    //地图显示当前城市
    // map.setBounds(citybounds);
   }
  } else {
   console.log(result.info);
  }
 });
}
showCityInfo();