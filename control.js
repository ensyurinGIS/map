//★コントロールボタン(画面右側のボタン)

//3d2dボタン設定
class PitchToggle {
constructor({ pitch = 60, minpitchzoom = 0 }) {
this._pitch = pitch;
this._minpitchzoom = minpitchzoom;
}

onAdd(map) {
this._map = map;
let _this = this;

this._btn = document.createElement("button");
this._btn.className = "mapboxgl-ctrl-icon mapboxgl-ctrl-pitchtoggle-3d";
this._btn.type = "button";
this._btn["aria-label"] = "Toggle Pitch";
this._btn.onclick = function () {
    if (map.getPitch() === 0) {
    let options = { pitch: _this._pitch };
    if (_this._minpitchzoom && map.getZoom() > _this._minpitchzoom) {
        options.zoom = _this._minpitchzoom;
    }
    map.easeTo(options);
    map.setTerrain({ source: "mapbox-dem", exaggeration: 1 });
    _this._btn.className =
        "mapboxgl-ctrl-icon mapboxgl-ctrl-pitchtoggle-2d";

    splash("3Dモード", {
        message_class: "splashmsg default", //メッセージエリアに設定するクラス
        fadein_sec: 0.1, //コマンド実行からメッセージがフェードインする時間（秒）
        wait_sec: 0.5, //コマンド実行からメッセージのフェードアウトを開始する時間（秒）
        fadeout_sec: 0.3, //フェードアウトする時間（秒）
        opacity: 0.9, //メッセージの透過率
        trans_in: "ease-in", //フェードインの加速度設定（CSSのtransition参照）
        trans_out: "ease-out", //フェードアウトの加速度設定（CSSのtransition参照）
        outer_style:
        "top: 0px;left: 0px;position: fixed;z-index: 1000;width: 100%;height: 100%;", //外側のスタイル
        message_style:
        "padding:0.5em;font-size:4em;color:white;background-color:gray; position: absolute;top: 50%; left: 50%;transform: translateY(-50%) translateX(-50%);-webkit-transform: translateY(-50%) translateX(-50%);", //メッセージエリアのスタイル
        style_id: "append_splash_msg_style", //追加する制御用スタイルタグのID
        outer_id: "append_splash_msg", //追加するスタイルタグのID
        message_id: "append_splash_msg_inner",
        on_splash_vanished: null, //コールバック関数（ function() ）
    });
    } else {
    map.easeTo({ pitch: 0 });
    map.setTerrain({ source: "mapbox-dem", exaggeration: 0 });
    _this._btn.className =
        "mapboxgl-ctrl-icon mapboxgl-ctrl-pitchtoggle-3d";

    splash("2Dモード", {
        message_class: "splashmsg default", //メッセージエリアに設定するクラス
        fadein_sec: 0.1, //コマンド実行からメッセージがフェードインする時間（秒）
        wait_sec: 0.5, //コマンド実行からメッセージのフェードアウトを開始する時間（秒）
        fadeout_sec: 0.3, //フェードアウトする時間（秒）
        opacity: 0.9, //メッセージの透過率
        trans_in: "ease-in", //フェードインの加速度設定（CSSのtransition参照）
        trans_out: "ease-out", //フェードアウトの加速度設定（CSSのtransition参照）
        outer_style:
        "top: 0px;left: 0px;position: fixed;z-index: 1000;width: 100%;height: 100%;", //外側のスタイル
        message_style:
        "padding:0.5em;font-size:4em;color:white;background-color:gray; position: absolute;top: 50%; left: 50%;transform: translateY(-50%) translateX(-50%);-webkit-transform: translateY(-50%) translateX(-50%);", //メッセージエリアのスタイル
        style_id: "append_splash_msg_style", //追加する制御用スタイルタグのID
        outer_id: "append_splash_msg", //追加するスタイルタグのID
        message_id: "append_splash_msg_inner",
        on_splash_vanished: null, //コールバック関数（ function() ）
    });
    }
};

this._container = document.createElement("div");
this._container.className = "mapboxgl-ctrl-group mapboxgl-ctrl";
this._container.appendChild(this._btn);

return this._container;
}

onRemove() {
this._container.parentNode.removeChild(this._container);
this._map = undefined;
}
}
//2d3d

map.addControl({
accessToken: mapboxgl.accessToken,
mapboxgl: mapboxgl,
});

//スケール
map.addControl(
new mapboxgl.ScaleControl({
maxWidth: 200,
unit: "metric",
}),
"bottom-right"
);
//地図情報
map.addControl(new mapboxgl.AttributionControl(), "top-right");
//フルスクリーン
map.addControl(new mapboxgl.FullscreenControl());
//コンパス
map.addControl(new mapboxgl.NavigationControl());

//右回転ボタンset
class HelloWorldControl2 {
onAdd(map) {
this.map = map;

const homeButton = document.createElement("button");
homeButton.innerHTML =
    '<img src="https://img.icons8.com/material-rounded/26/000000/rotate-right.png"/>';
homeButton.addEventListener("click", (e) => {
    // map.setBearing(i -= 15);

    const bearingright = Math.round(map.getBearing()) - 15;

    map.rotateTo(bearingright, { duration: 300 });
});

this.container = document.createElement("div");
this.container.className = "mapboxgl-ctrl mapboxgl-ctrl-group";
this.container.appendChild(homeButton);

return this.container;
}

onRemove() {
this.container.parentNode.removeChild(this.container);
this.map = undefined;
}
}

//右回転ボタン
map.addControl(new HelloWorldControl2(), "top-right");

//左回転ボタンset
class HelloWorldControl3 {
onAdd(map) {
this.map = map;

const homeButton = document.createElement("button");
homeButton.innerHTML =
    '<img src="https://img.icons8.com/material-sharp/26/000000/rotate-left.png"/>';
homeButton.addEventListener("click", (e) => {
    const bearingleft = Math.round(map.getBearing()) + 15;
    map.rotateTo(bearingleft, { duration: 300 });

});

this.container = document.createElement("div");
this.container.className = "mapboxgl-ctrl mapboxgl-ctrl-group";
this.container.appendChild(homeButton);

return this.container;
}

onRemove() {
this.container.parentNode.removeChild(this.container);
this.map = undefined;
}
}

//左回転ボタン
map.addControl(new HelloWorldControl3(), "top-right");

//2d3dボタン
map.addControl(new PitchToggle({ minpitchzoom: 0 }));

//360°ボタンset
class HelloWorldControl5 {
onAdd(map) {
const seton =
    '<img src="https://img.icons8.com/ios-glyphs/25/05CB63/360-view.png"/>';
const setoff =
    '<img src="https://img.icons8.com/ios-glyphs/25/000000/360-view.png"/>';

this.map = map;
const homeButton = document.createElement("button");
homeButton.innerHTML = setoff;
homeButton.addEventListener("click", (e) => {
    const clickedLayer = "360度写真";
    e.preventDefault();
    e.stopPropagation();
    homeButton.innerHTML = seton;

    // Toggle layer visibility by changing the layout object's visibility property.
    if (map.getLayer("360度写真")) {
    homeButton.innerHTML = setoff;
    map.removeLayer("background");
    map.removeLayer("360度写真");
    map.flyTo({ center: [136.92300400916308, 35.5509525769706],
        zoom: 14.5,
        bearing: 0,
        pitch: 0,
    });

    
    } else {

    map.flyTo({ center: [136.92300400916308, 35.5509525769706],
                zoom: 15,
                bearing: 90,
                pitch: 40,
                duration: 3000,
                });

                // map.rotateTo(180, { duration: 10000 });
    // map.easeTo({ bearing: 40 })
    map.addLayer({
        id: "background",
        type: "background",
        layout: {
        visibility: "visible",
        },
        paint: {
        "background-color": "#000000",
        "background-opacity": 0.4,
        },
    });

    map.addLayer({
        id: "360度写真",
        type: "circle",
        source: "THETA360",
        "source-layer": "THETA360",
        layout: {
        },
        paint: {
        "circle-color": "#05CB63",
        "circle-radius": [
            "interpolate",
            ["linear"],
            ["zoom"],
            13,
            1,
            15,
            8,
            20.014,
            30,
        ],
        "circle-opacity": 0.7,
        },
    });

    massage8();

    }
});

this.container = document.createElement("div");
this.container.className = "mapboxgl-ctrl mapboxgl-ctrl-group";
this.container.appendChild(homeButton);

return this.container;
}

onRemove() {
this.container.parentNode.removeChild(this.container);
this.map = undefined;
}
}

map.addControl(new HelloWorldControl5(), "top-right");

// 現在地
map.addControl(
new mapboxgl.GeolocateControl({
positionOptions: {
    enableHighAccuracy: true,
},
trackUserLocation: true,
showUserHeading: true,
})
);

//  記録
class HelloWorldControl4 {
onAdd(map) {
this.map = map;

const homeButton = document.createElement("button");
homeButton.innerHTML =
    '<img src="https://img.icons8.com/ios-glyphs/30/e2041e/plus.png"/>';
homeButton.addEventListener("click", (e) => {
    window.open(
    "https://script.google.com/macros/s/AKfycbwe-uhVihdq3mTFKdR9lmgGurv06pKNlhXKEBiHL1hwu9PUTUtNsB4U87pqt9660VG6yA/exec",
    "window_name",
    "width=600,height=800,scrollbars=yes"
    );
});

this.container = document.createElement("div");
this.container.className = "mapboxgl-ctrl mapboxgl-ctrl-group";
this.container.appendChild(homeButton);

return this.container;
}

onRemove() {
this.container.parentNode.removeChild(this.container);
this.map = undefined;
}
}

map.addControl(new HelloWorldControl4(), "top-right");
