var rasterselectID = {
    nasi: "(重ねて表示しない)",
    saisinsyasin2: "全国最新写真(シームレス)",
    oruso2: "電子国土基本図(オルソ画像)",
    kutyu2: "空中写真(1979年頃)",
    kihonzu2: "基本図",
    hyouzyun2: "国土地理院地図（標準）",
    tansyoku2: "国土地理院地図（淡色）",
    hakutizu2: "国土地理院地図（白）",
    sikibetu2: "色別標高図",
    ineikizyou2: "陰影起伏図",
    keisyasirokuro2: "傾斜量図",
    csrittai2: "CS立体図(岐阜県森林研究所)",
    keiyakubun2: "傾斜区分図(岐阜県森林研究所)",
    gihukyouyu2: "岐阜県共有空間データ（Q地図タイル）",
    syokusei2: "植生図(エコリス)",
    tisitus2: "シームレス地質図(産総研)",
    katudansou2: "活断層図",
    sekisyoku2: "赤色立体図(10mメッシュ)",
    zisuberi: "地すべり地形分布図",
    keisyanadare: "全国傾斜量区分図(雪崩関連)",
    zikizu: "磁気図(偏角)/偏角一覧図",
    google2: "Google Maps",
    GoogleS2: "Google Satellite",
    GoogleSH2: "Google Satellite Hybrid",
    osm2: "OpenStreetMap",
    esriW2: "Esri World Imagery",
    mieruneC2: "MIERUNE Color",
    mieruneM2: "MIERUNE MONO",
    Stamento2: "Stamen Toner",
    StamenT2: "Stamen Terrain",
    StamenW2: "Stamen Watercolor",
    };

  //セレクトボタンを追加
for (var i = 0; i < Object.keys(rasterselectID).length; i++) {

    const id = Object.keys(rasterselectID)[i];
    const option = document.createElement("option");
    option.value = id;
    option.text = rasterselectID[id];
    const select = document.getElementById("layer3");
    select.appendChild(option);
}

slider3.addEventListener('input', (e) => {
const sliderValue = document.getElementById('slider-value3');
map.setPaintProperty(
layer3.value,
'raster-opacity',
parseInt(e.target.value, 10) / 100
);
sliderValue.textContent = e.target.value + '%';
});

slider12.addEventListener('input', (e) => {
const sliderValue = document.getElementById('slider-value12');
map.setPaintProperty(
layer3.value,
'raster-saturation',
parseInt(e.target.value, 10) / 100
);
sliderValue.textContent = e.target.value;
});

slider4.addEventListener('input', (e) => {
const sliderValue = document.getElementById('slider-value4');
map.setPaintProperty(
layer3.value,
'raster-brightness-min',
parseInt(e.target.value, 10) / 100
);
sliderValue.textContent = e.target.value;
});

slider5.addEventListener('input', (e) => {
const sliderValue = document.getElementById('slider-value5');
map.setPaintProperty(
layer3.value,
'raster-brightness-max',
parseInt(e.target.value, 10) / 100
);
sliderValue.textContent = e.target.value;
});

slider6.addEventListener('input', (e) => {
const sliderValue = document.getElementById('slider-value6');
map.setPaintProperty(
layer3.value,
'raster-contrast',
parseInt(e.target.value, 10) / 100
);
sliderValue.textContent = e.target.value;
});

function inputChange3(){
var layer = document.getElementById('layer3');
const sliderValue3 = document.getElementById('slider-value3');
var nowopacity = map.getPaintProperty(layer.value, 'raster-opacity',) * 100;
document.getElementById( "slider3" ).value = Math.trunc(nowopacity);
sliderValue3.textContent = Math.trunc(nowopacity) + '%';

var nowsikiso = map.getPaintProperty(layer.value, 'raster-saturation',) * 100;
const sliderValue12 = document.getElementById('slider-value12');
document.getElementById( "slider12" ).value = Math.trunc(nowsikiso);
sliderValue12.textContent = Math.trunc(nowsikiso);

var nowbmin = map.getPaintProperty(layer.value, 'raster-brightness-min',) * 100;
const sliderValue4 = document.getElementById('slider-value4');
document.getElementById( "slider4" ).value = Math.trunc(nowbmin);
sliderValue4.textContent = Math.trunc(nowbmin);

var nowbmix = map.getPaintProperty(layer.value, 'raster-brightness-max',) * 100;
const sliderValue5 = document.getElementById('slider-value5');
document.getElementById( "slider5" ).value = Math.trunc(nowbmix);
sliderValue5.textContent = Math.trunc(nowbmix);

var nowcontrast = map.getPaintProperty(layer.value, 'raster-contrast',) * 100;
const sliderValue6 = document.getElementById('slider-value6');
document.getElementById( "slider6" ).value = Math.trunc(nowcontrast);
sliderValue6.textContent = Math.trunc(nowcontrast);
}