//セレクトボタンのIDを列挙します。
const PolygonselectID = [
    "アカデミー施設・その他建物",
    "自力建設",
    "演習林林分",
    "駐車場",
    "試験地",
];

  //セレクトボタンを追加
for (const id of PolygonselectID) {

    if (document.getElementById(id)) {
    continue;
    }

    const option = document.createElement("option");
    option.id = id;
    option.text = id;
    const select = document.getElementById("layer2");
    select.appendChild(option);
}

document.querySelector("#selectcolor2").addEventListener('input',(event)=>{
    //色が変更された場合に色情報を取得する
    var layer = document.getElementById('layer2');
    var colorval = event.target.value;
    map.setPaintProperty(layer.value, 'fill-color', colorval);
});

slider2.addEventListener('input', (e) => {
    const sliderValue = document.getElementById('slider-value2');
    map.setPaintProperty(
        layer2.value,
        'fill-opacity',
        parseInt(e.target.value, 10) / 100
    );
    sliderValue.textContent = e.target.value + '%';
});

function inputChange2(){
    var layer = document.getElementById('layer2');

    var nowcolor = map.getPaintProperty(layer.value, 'fill-color');
    document.getElementById( "selectcolor2" ).value = nowcolor;

    var nowopacity = map.getPaintProperty(layer.value, 'fill-opacity',) * 100;
    const sliderValue2 = document.getElementById('slider-value2');
    document.getElementById( "slider2" ).value = Math.trunc(nowopacity);
    sliderValue2.textContent = Math.trunc(nowopacity) + '%';
}