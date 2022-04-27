//セレクトボタンのIDを列挙します。
const textselectID = [
    "その他地点",
    "アカデミー施設・その他建物-文字",
    "自力建設-文字",
    "演習林-林分ラベル",
    "平面図-アカデミー施設1F-文字",
    "平面図-アカデミー施設2F-文字",
    "平面図-自力建設-文字",
    "消火器・避難器具等1F",
    "消火器・避難器具等2F",
    "施設案内塔",
    "サインポール",
    "試験地-文字",
    "アカデミー危険木調査結果(H25)",
    "OWL-立木データ-文字",
    "フェノロジー調査2020-植物",
    "フェノロジー調査2020-昆虫",
    "フェノロジー調査2020-哺乳類",
    "フェノロジー調査2020-鳥類",
    "フェノロジー調査2020-菌類",
    "翔楓祭2021企画",
    "古城山国有林-林分ラベル",
    "美濃市指定避難場所",
    "美濃市指定緊急避難場所",
    "等高線-標高ラベル",
    "標高点",
    "岐阜県鳥獣保護区等(H30)-文字",
    "岐阜県20万分の1表層地質-文字",
    "岐阜県20万分の1土壌分類-文字",
];

  //セレクトボタンを追加
for (const id of textselectID) {

    if (document.getElementById(id)) {
    continue;
    }

    const option = document.createElement("option");
    option.id = id;
    option.text = id;
    const select = document.getElementById("layer4");
    select.appendChild(option);
}

slider7.addEventListener('input', (e) => {
    const sliderValue = document.getElementById('slider-value7');
    map.setPaintProperty(
        layer4.value,
        'text-opacity',
        parseInt(e.target.value, 10) / 100
    );
    sliderValue.textContent = e.target.value + '%'
});

slider8.addEventListener('input', (e) => {
    const sliderValue = document.getElementById('slider-value8');
    map.setLayoutProperty(
        layer4.value,
        'text-size',
        parseInt(e.target.value, 10) / 100
    );
    sliderValue.textContent = e.target.value / 100
});

slider9.addEventListener('input', (e) => {
    const sliderValue = document.getElementById('slider-value9');
    map.setPaintProperty(
        layer4.value,
        'text-halo-width',
        parseInt(e.target.value, 10) / 100
    );
    sliderValue.textContent = e.target.value / 100
});

document.querySelector("#selectcolor3").addEventListener('input',(event)=>{
    //色が変更された場合に色情報を取得する
    var layer = document.getElementById('layer4');
    var colorval = event.target.value;
    map.setPaintProperty(layer.value, 'text-color', colorval);
});

document.querySelector("#selectcolor4").addEventListener('input',(event)=>{
    //色が変更された場合に色情報を取得する
    var layer = document.getElementById('layer4');
    var colorval = event.target.value;
    map.setPaintProperty(layer.value, 'text-halo-color', colorval);
});

function inputChange4(){
    var layer = document.getElementById('layer4');
    
    const sliderValue7 = document.getElementById('slider-value7');
    var nowopacity = map.getPaintProperty(layer.value, 'text-opacity',) * 100;
    document.getElementById( "slider7" ).value = Math.trunc(nowopacity);
    sliderValue7.textContent = Math.trunc(nowopacity) + '%';

    var nowsize = map.getLayoutProperty(layer.value, 'text-size',) * 100;
    const sliderValue8 = document.getElementById('slider-value8');
    document.getElementById( "slider8" ).value = Math.trunc(nowsize);
    sliderValue8.textContent = Math.trunc(nowsize) / 100;

    var nowb = map.getPaintProperty(layer.value, 'text-halo-width',) * 100;
    const sliderValue9 = document.getElementById('slider-value9');
    document.getElementById( "slider9" ).value = Math.trunc(nowb);
    sliderValue9.textContent = Math.trunc(nowb) / 100;

    var nowtcolor = map.getPaintProperty(layer.value, 'text-color',);
    document.getElementById( "selectcolor3" ).value = nowtcolor;

    var nowthcolor = map.getPaintProperty(layer.value, 'text-halo-color',);
    document.getElementById( "selectcolor4" ).value = nowthcolor;
    }