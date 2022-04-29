//セレクトボタンを追加
for (var i = 0; i < Object.keys(rasterselectID).length; i++) {

    const id = Object.keys(rasterselectID)[i];
    const option = document.createElement("option");
    option.value = id;
    option.text = rasterselectID[id];
    const select = document.getElementById("property_raster");
    select.appendChild(option);
}

slider3.addEventListener('input', (e) => {
const sliderValue = document.getElementById('slider-value3');
map.setPaintProperty(
property_raster.value,
'raster-opacity',
parseInt(e.target.value, 10) / 100
);
sliderValue.textContent = e.target.value + '%';
});

slider12.addEventListener('input', (e) => {
const sliderValue = document.getElementById('slider-value12');
map.setPaintProperty(
property_raster.value,
'raster-saturation',
parseInt(e.target.value, 10) / 100
);
sliderValue.textContent = e.target.value;
});

slider4.addEventListener('input', (e) => {
const sliderValue = document.getElementById('slider-value4');
map.setPaintProperty(
property_raster.value,
'raster-brightness-min',
parseInt(e.target.value, 10) / 100
);
sliderValue.textContent = e.target.value;
});

slider5.addEventListener('input', (e) => {
const sliderValue = document.getElementById('slider-value5');
map.setPaintProperty(
property_raster.value,
'raster-brightness-max',
parseInt(e.target.value, 10) / 100
);
sliderValue.textContent = e.target.value;
});

slider6.addEventListener('input', (e) => {
const sliderValue = document.getElementById('slider-value6');
map.setPaintProperty(
property_raster.value,
'raster-contrast',
parseInt(e.target.value, 10) / 100
);
sliderValue.textContent = e.target.value;
});

function inputChange3(){
var layer = document.getElementById('property_raster');
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