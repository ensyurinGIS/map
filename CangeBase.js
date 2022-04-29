  //セレクトボタンを追加
for (var i = 0; i < Object.keys(mapselectID).length; i++) {

    const id = Object.keys(mapselectID)[i];
    const option = document.createElement("option");
    option.value = id;
    option.text = mapselectID[id];
    const select = document.getElementById("property_base");
    select.appendChild(option);
}

//スライダー設定
slider13.addEventListener('input', (e) => {
    const sliderValue = document.getElementById('slider-value13');
    map.setPaintProperty(
        property_base.value,
        'raster-opacity',
        parseInt(e.target.value, 10) / 100
    );
    sliderValue.textContent = e.target.value + '%';
});

slider14.addEventListener('input', (e) => {
    const sliderValue = document.getElementById('slider-value14');
    map.setPaintProperty(
        property_base.value,
        'raster-saturation',
        parseInt(e.target.value, 10) / 100
    );
    sliderValue.textContent = e.target.value;
});

slider15.addEventListener('input', (e) => {
    const sliderValue = document.getElementById('slider-value15');
    map.setPaintProperty(
        property_base.value,
        'raster-contrast',
        parseInt(e.target.value, 10) / 100
    );
    sliderValue.textContent = e.target.value;
});

slider16.addEventListener('input', (e) => {
    const sliderValue = document.getElementById('slider-value16');
    map.setPaintProperty(
        property_base.value,
        'raster-brightness-min',
        parseInt(e.target.value, 10) / 100
    );
    sliderValue.textContent = e.target.value;
});

slider17.addEventListener('input', (e) => {
    const sliderValue = document.getElementById('slider-value17');
    map.setPaintProperty(
        property_base.value,
        'raster-brightness-max',
        parseInt(e.target.value, 10) / 100
    );
    sliderValue.textContent = e.target.value;
});

function inputChange5(){
    var layer = document.getElementById('property_base');

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