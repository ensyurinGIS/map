//セレクトボタンのIDを列挙します。
const lineselectID = [
    "歩道",
    "川",
    "演習林-小林班境界線",
    "演習林-林班境界線",
    "平面図-アカデミー施設1F",
    "平面図-アカデミー施設2F",
    "平面図-自力建設",
    "古城山国有林-林分境界線",
    "等高線",
    "岐阜県20万分の1表層地質-断層",
    "行政区画",
];

  //セレクトボタンを追加
for (const id of lineselectID) {

    if (document.getElementById(id)) {
    continue;
    }

    const option = document.createElement("option");
    option.id = id;
    option.text = id;
    const select = document.getElementById("property_line");
    select.appendChild(option);
}

document.querySelector("#selectcolor1").addEventListener('input',(event)=>{
    //色が変更された場合に色情報を取得する
    var layer = document.getElementById('property_line');
    var colorval = event.target.value;
    map.setPaintProperty(layer.value, 'line-color', colorval);
});

slider1.addEventListener('input', (e) => {
    const sliderValue = document.getElementById('slider-value1');
    map.setPaintProperty(
        property_line.value,
        'line-opacity',
        parseInt(e.target.value, 10) / 100
    );
    sliderValue.textContent = e.target.value + '%'
});

slider11.addEventListener('input', (e) => {
    const sliderValue = document.getElementById('slider-value11');
    map.setPaintProperty(
        property_line.value,
        'line-width', 
        parseInt(e.target.value, 10) / 100
    );
    sliderValue.textContent = e.target.value / 100
});

function CangeLine(){
    var layer = document.getElementById('property_line');

    var nowcolor = map.getPaintProperty(layer.value, 'line-color');
    document.getElementById( "selectcolor1" ).value = nowcolor;

    var nowopacity = map.getPaintProperty(layer.value, 'line-opacity',) * 100;
    const sliderValue1 = document.getElementById('slider-value1');
    document.getElementById( "slider1" ).value = Math.trunc(nowopacity);
    sliderValue1.textContent = Math.trunc(nowopacity) + '%';

    var nowwidth = map.getPaintProperty(layer.value, 'line-width',) * 100;
    const sliderValue11 = document.getElementById('slider-value11');
    document.getElementById( "slider11" ).value = Math.trunc(nowwidth);
    sliderValue11.textContent = Math.trunc(nowwidth) / 100;

}