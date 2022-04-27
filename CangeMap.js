var mapselectID = {
    saisinsyasin: "全国最新写真(シームレス)",
    kihonzu: "森林基本図",
    csrittai: "CS立体図(岐阜県森林研究所)",
    keiyakubun: "傾斜区分図(岐阜県森林研究所)",
    hyouzyun: "国土地理院地図（標準）",
    tansyoku: "国土地理院地図（淡色）",
    hakutizu: "国土地理院地図（白）",
    sikibetu: "色別標高図",
    ineikizyou: "陰影起伏図",
    keisyasirokuro: "傾斜量図",
    oruso: "電子国土基本図(オルソ画像)",
    kutyu: "空中写真(1979年頃)",
    gifukyouyu: "岐阜県共有空間データ（Q地図タイル）",
    syokusei: "植生図(エコリス)",
    tisitus: "シームレス地質図(産総研)",
    katudansou: "活断層図",
    sekisyoku: "赤色立体図(10mメッシュ)",
    mieStreets: "MIERUNE Streets",
    mieGray: "MIERUNE Gray",
    mieDark: "MIERUNE Dark",
    mieruneC: "MIERUNE Color",
    mieruneM: "MIERUNE MONO",
    google: "Google Maps",
    GoogleS: "Google Satellite",
    GoogleSH: "Google Satellite Hybrid",
    mapboxS: "Mapbox Streets",
    mapboxD: "Mapbox Dark",
    mapboxSL: "Mapbox Satelite",
    osm: "OpenStreetMap",
    esriWS: "Esri World Street",
    esriWI: "Esri World Imagery",
    Stamento: "Stamen Toner",
    StamenT: "Stamen Terrain",
    StamenW: "Stamen Watercolor",
    };

  //セレクトボタンを追加
for (var i = 0; i < Object.keys(mapselectID).length; i++) {

    const id = Object.keys(mapselectID)[i];
    const option = document.createElement("option");
    option.value = id;
    option.text = mapselectID[id];
    const select = document.getElementById("layer5");
    select.appendChild(option);
}

//スライダー設定
slider13.addEventListener('input', (e) => {
    const sliderValue = document.getElementById('slider-value13');
    map.setPaintProperty(
        layer5.value,
        'raster-opacity',
        parseInt(e.target.value, 10) / 100
    );
    sliderValue.textContent = e.target.value + '%';
});

slider14.addEventListener('input', (e) => {
    const sliderValue = document.getElementById('slider-value14');
    map.setPaintProperty(
        layer5.value,
        'raster-saturation',
        parseInt(e.target.value, 10) / 100
    );
    sliderValue.textContent = e.target.value;
});

slider15.addEventListener('input', (e) => {
    const sliderValue = document.getElementById('slider-value15');
    map.setPaintProperty(
        layer5.value,
        'raster-contrast',
        parseInt(e.target.value, 10) / 100
    );
    sliderValue.textContent = e.target.value;
});

slider16.addEventListener('input', (e) => {
    const sliderValue = document.getElementById('slider-value16');
    map.setPaintProperty(
        layer5.value,
        'raster-brightness-min',
        parseInt(e.target.value, 10) / 100
    );
    sliderValue.textContent = e.target.value;
});

slider17.addEventListener('input', (e) => {
    const sliderValue = document.getElementById('slider-value17');
    map.setPaintProperty(
        layer5.value,
        'raster-brightness-max',
        parseInt(e.target.value, 10) / 100
    );
    sliderValue.textContent = e.target.value;
});

function inputChange5(){
    var layer = document.getElementById('layer5');

    const sliderValue13 = document.getElementById('slider-value13');
    var nowopacity = map.getPaintProperty(layer.value, 'raster-opacity',) * 100;
    document.getElementById( "slider13" ).value = Math.trunc(nowopacity);
    sliderValue13.textContent = Math.trunc(nowopacity) + '%';

    var nowsikiso = map.getPaintProperty(layer.value, 'raster-saturation',) * 100;
    const sliderValue14 = document.getElementById('slider-value14');
    document.getElementById( "slider14" ).value = Math.trunc(nowsikiso);
    sliderValue14.textContent = Math.trunc(nowsikiso);

    var nowcontrast = map.getPaintProperty(layer.value, 'raster-contrast',) * 100;
    const sliderValue15 = document.getElementById('slider-value15');
    document.getElementById( "slider15" ).value = Math.trunc(nowcontrast);
    sliderValue15.textContent = Math.trunc(nowcontrast);

    var nowbmin = map.getPaintProperty(layer.value, 'raster-brightness-min',) * 100;
    const sliderValue16 = document.getElementById('slider-value16');
    document.getElementById( "slider16" ).value = Math.trunc(nowbmin);
    sliderValue16.textContent = Math.trunc(nowbmin);

    var nowbmix = map.getPaintProperty(layer.value, 'raster-brightness-max',) * 100;
    const sliderValue17 = document.getElementById('slider-value17');
    document.getElementById( "slider17" ).value = Math.trunc(nowbmix);
    sliderValue17.textContent = Math.trunc(nowbmix);

}