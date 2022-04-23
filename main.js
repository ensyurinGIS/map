//ロード画面長さ
$("#splash").delay(3000).fadeOut(1000);
$("#splash_logo").delay(5000).fadeOut(1000);

//スプラッシュメッセージset
function splash(msg, custom_set) {
  //Default
  var set = {
    message_class: "splashmsg default",
    fadein_sec: 0.1,
    wait_sec: 0.5,
    fadeout_sec: 1.5,
    opacity: 0.9,
    trans_in: "ease-in",
    trans_out: "ease-out",
    outer_style:
      "top: 0px;left: 0px;position: fixed;z-index: 1000;width: 100%;height: 100%;",
    message_style:
      "padding:0.5em;font-size:4em;color:white;background-color:gray; position: absolute;top: 50%; left: 50%;transform: translateY(-50%) translateX(-50%);-webkit-transform: translateY(-50%) translateX(-50%);",
    style_id: "append_splash_msg_style",
    outer_id: "append_splash_msg",
    message_id: "append_splash_msg_inner",
    on_splash_vanished: null, //callback function
  };
  //Override custom_set
  for (var key in custom_set) {
    if (custom_set.hasOwnProperty(key)) {
      set[key] = custom_set[key];
    }
  }

  //Style
  if (!document.getElementById(set.style_id)) {
    var style = document.createElement("style");
    style.id = set.style_id;
    style.innerHTML =
      "#" +
      set.outer_id +
      " { " +
      set.outer_style +
      " } " +
      "#" +
      set.outer_id +
      " > #" +
      set.message_id +
      " {opacity: 0;transition: opacity " +
      set.fadeout_sec +
      "s " +
      set.trans_out +
      ";-webkit-transition: opacity " +
      set.fadeout_sec +
      "s " +
      set.trans_out +
      ";} " +
      "#" +
      set.outer_id +
      ".show > #" +
      set.message_id +
      " {opacity: " +
      set.opacity +
      ";transition: opacity " +
      set.fadein_sec +
      "s " +
      set.trans_in +
      ";-webkit-transition: opacity " +
      set.fadein_sec +
      "s " +
      set.trans_in +
      ";}" +
      "#" +
      set.message_id +
      " { " +
      set.message_style +
      " } ";
    document.body.appendChild(style);
  }

  //Element (Outer, Inner)
  if ((e = document.getElementById(set.outer_id))) {
    e.parentNode.removeChild(e);
    if (set.on_splash_vanished) set.on_splash_vanished();
  }
  var splash = document.createElement("div");
  splash.id = set.outer_id;
  splash.onclick = function () {
    if ((e = document.getElementById(set.outer_id)))
      e.parentNode.removeChild(e);
    if (set.on_splash_vanished) set.on_splash_vanished();
  };
  splash.innerHTML =
    '<div id="' +
    set.message_id +
    '" class="' +
    set.message_class +
    '">' +
    msg +
    "</div>";
  document.body.appendChild(splash);

  //Timer
  setTimeout(function () {
    if (splash) splash.classList.add("show");
  }, 0);
  setTimeout(function () {
    if (splash) splash.classList.remove("show");
  }, set.wait_sec * 1000);
  setTimeout(function () {
    if (splash && splash.parentNode) splash.parentNode.removeChild(splash);
    if (set.on_splash_vanished) set.on_splash_vanished();
  }, (set.fadeout_sec + set.wait_sec) * 1000);
}

//★★★アクセストークン★★★
mapboxgl.accessToken =
  "pk.eyJ1IjoiZW5zeXVyaW5naXMiLCJhIjoiY2t6cHBhdHp2MDFlMTJ3bmRsNzY4dTlkbiJ9.BtuWDU9uyDaR5Var2Y6-4A";

//マップの表示範囲制限
const bounds = [
  [124.12999909678109, 25.35253652689525],
  [149.0132986021867, 48.24960402824195],
];

//回転用変数
var i = 0;

//マップの表示
const map = new mapboxgl.Map({
  container: "map", // container ID
  style: "mapbox://styles/ensyuringis/ckzt6ulkx003214qu9cfzwp3f",
  center: [136.92300400916308, 35.5509525769706], // 初期中心の座標
  zoom: 14.5, // 初期ズームレベル
  maxBounds: bounds,
  attributionControl: false,
  bearing: i,
});

// マップの読み込み完了後にロード
map.on("load", () => {
  //DEMデータ読み込み
  map.addSource("mapbox-dem", {
    type: "raster-dem",
    url: "mapbox://mapbox.mapbox-terrain-dem-v1",
  });

  //スカイレイヤー(空)読み込み
  map.addLayer({
    id: "sky",
    type: "sky",
    paint: {
      "sky-type": "atmosphere",
      "sky-atmosphere-sun": [0.0, 0.0],
      "sky-atmosphere-sun-intensity": 15,
    },
  });

  //★ベースマップ読み込み

  //全国最新写真(シームレス)
  map.addSource("saisinsyasin", {
    type: "raster",
    tiles: [
      "https://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/{z}/{x}/{y}.jpg",
    ],
    tileSize: 256,
    attribution:
      "地図の出典：<a href='https://www.gsi.go.jp/' target='_blank'>国土地理院</a>",
  });

  map.addLayer({
    id: "saisinsyasin",
    type: "raster",
    source: "saisinsyasin",
    minzoom: 0,
    maxzoom: 24,
    paint: {
      "raster-opacity": 1,
      "raster-brightness-min": 0,
      "raster-brightness-max": 1,
      "raster-contrast": 0,
      "raster-saturation": 0,
    },
  });

  //電子国土基本図（オルソ画像）
  map.addSource("oruso", {
    type: "raster",
    tiles: ["https://cyberjapandata.gsi.go.jp/xyz/ort/{z}/{x}/{y}.jpg"],
    tileSize: 256,
    attribution:
      "地図の出典：<a href='https://www.gsi.go.jp/' target='_blank'>国土地理院</a>",
  });

  //空中写真(1979年頃)
  map.addSource("kutyu", {
    type: "raster",
    tiles: ["https://cyberjapandata.gsi.go.jp/xyz/gazo2/{z}/{x}/{y}.jpg"],
    tileSize: 256,
    attribution:
      "地図の出典：<a href='https://www.gsi.go.jp/' target='_blank'>国土地理院</a>",
  });

  //基本図(マップボックスアカウントのマップデータから)
  map.addSource("kihonzu", {
    type: "raster",
    tiles: [
      "https://api.mapbox.com/styles/v1/ensyuringis/ckzppbbaf001k14ldljs4a65x/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZW5zeXVyaW5naXMiLCJhIjoiY2t6cHBhdHp2MDFlMTJ3bmRsNzY4dTlkbiJ9.BtuWDU9uyDaR5Var2Y6-4A",
    ],
    tileSize: 256,
  });

  //地理院タイル標準
  map.addSource("hyouzyun", {
    type: "raster",
    tiles: ["https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png"],
    tileSize: 256,
    attribution:
      "地図の出典：<a href='https://www.gsi.go.jp/' target='_blank'>国土地理院</a>",
  });

  //地理院タイル炎色
  map.addSource("tansyoku", {
    type: "raster",
    tiles: ["https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png"],
    tileSize: 256,
    attribution:
      "地図の出典：<a href='https://www.gsi.go.jp/' target='_blank'>国土地理院</a>",
  });

  //色別標高図
  map.addSource("sikibetu", {
    type: "raster",
    tiles: ["https://cyberjapandata.gsi.go.jp/xyz/relief/{z}/{x}/{y}.png"],
    tileSize: 256,
    attribution:
      "地図の出典：<a href='https://www.gsi.go.jp/' target='_blank'>国土地理院</a>",
  });

  // 陰影起伏図
  map.addSource("ineikizyou", {
    type: "raster",
    tiles: [
      "https://cyberjapandata.gsi.go.jp/xyz/hillshademap/{z}/{x}/{y}.png",
    ],
    tileSize: 256,
    attribution:
      "地図の出典：<a href='https://www.gsi.go.jp/bousaichiri/hillshademap.html' target='_blank'>国土地理院</a>",
  });

  // 傾斜量図白黒
  map.addSource("keisyasirokuro", {
    type: "raster",
    tiles: ["https://cyberjapandata.gsi.go.jp/xyz/slopemap/{z}/{x}/{y}.png"],
    tileSize: 256,
    attribution:
      "地図の出典：<a href='https://www.gsi.go.jp/' target='_blank'>国土地理院</a>",
  });

  //傾斜区分図(岐阜県森林研究所)
  map.addSource("keiyakubun", {
    type: "raster",
    tiles: [
      "https://tiles.arcgis.com/tiles/jJQWqgqiNhLLjkin/arcgis/rest/services/Gifu_Slpoe/MapServer/tile/{z}/{y}/{x}",
    ],
    tileSize: 256,
    attribution:
      "地図の出典：<a href='https://www.forest.rd.pref.gifu.lg.jp/shiyou/CSrittaizu.html' target='_blank'>岐阜県森林研究所</a>",
  });

  // 植生図
  map.addSource("syokusei", {
    type: "raster",
    tiles: ["https://map.ecoris.info/tiles/vege67hill/{z}/{x}/{y}.png"],
    tileSize: 256,
    attribution:
      "地図の出典：<a href='https://map.ecoris.info/#contents' target='_blank'>エコリス地図タイル</a>",
  });

  // シームレス地質図
  map.addSource("tisitus", {
    type: "raster",
    tiles: ["https://gbank.gsj.jp/seamless/v2/api/1.2.1/tiles/{z}/{y}/{x}.png"],
    tileSize: 256,
    attribution:
      "地図の出典：<a href='https://gbank.gsj.jp/seamless/index.html?lang=ja&' target='_blank'>産総研地質調査総合センター</a>",
  });

  // 活断層図
  map.addSource("katudansou", {
    type: "raster",
    tiles: ["https://cyberjapandata.gsi.go.jp/xyz/afm/{z}/{x}/{y}.png"],
    tileSize: 256,
    attribution:
      "地図の出典：<a href='https://www.gsi.go.jp/bousaichiri/active_fault.html' target='_blank'>国土地理院</a>",
  });

  // CS立体図(岐阜県森林研究所)
  map.addSource("csrittai", {
    type: "raster",
    tiles: [
      "https://tiles.arcgis.com/tiles/jJQWqgqiNhLLjkin/arcgis/rest/services/Gifu2021CS_Mosic/MapServer/tile/{z}/{y}/{x}",
    ],
    tileSize: 256,
    attribution:
      "地図の出典：<a href='https://www.forest.rd.pref.gifu.lg.jp/shiyou/CSrittaizu.html' target='_blank'>岐阜県森林研究所</a>",
  });

  //赤色立体図10mメッシュ
  map.addSource("sekisyoku", {
    type: "raster",
    tiles: ["https://cyberjapandata.gsi.go.jp/xyz/sekishoku/{z}/{x}/{y}.png"],
    tileSize: 256,
    attribution:
      "地図の出典：<a href='https://www.rrim.jp/' target='_blank'>アジア航測株式会社</a>",
  });

  //Google Maps
  map.addSource("google", {
    type: "raster",
    tiles: ["https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"],
    tileSize: 256,
    attribution:
      "地図の出典：<a href='https://www.google.co.jp/maps/?hl=ja' target='_blank'>googlemap</a>",
  });

  //Google s
  map.addSource("GoogleS", {
    type: "raster",
    tiles: ["https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"],
    tileSize: 256,
    attribution:
      "地図の出典：<a href='https://www.google.co.jp/maps/?hl=ja' target='_blank'>googlemap</a>",
  });

  //Google sh
  map.addSource("GoogleSH", {
    type: "raster",
    tiles: ["https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}"],
    tileSize: 256,
    attribution:
      "地図の出典：<a href='https://www.google.co.jp/maps/?hl=ja' target='_blank'>googlemap</a>",
  });

  //OpenStreetMap
  map.addSource("osm", {
    type: "raster",
    tiles: ["http://tile.thunderforest.com/cycle/{z}/{x}/{y}.png"],
    tileSize: 256,
    attribution:
      "地図の出典：<a href='https://openstreetmap.jp/' target='_blank'>OpenStreetMap</a>",
  });

  //白地図
  map.addSource("hakutizu", {
    type: "raster",
    tiles: ["https://cyberjapandata.gsi.go.jp/xyz/blank/{z}/{x}/{y}.png"],
    tileSize: 256,
    attribution:
      "地図の出典：<a href='https://www.gsi.go.jp/' target='_blank'>国土地理院</a>",
  });

  //Esri World Imagery
  map.addSource("esriW", {
    type: "raster",
    tiles: [
      "https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    ],
    tileSize: 256,
    attribution:
      "地図の出典：<a href='https://www.arcgis.com/home/item.html?id=10df2279f9684e4a9f6a7f08febac2a9' target='_blank'>Esri</a>",
  });

  //MIERUNE Color
  map.addSource("mieruneC", {
    type: "raster",
    tiles: ["https://tile.mierune.co.jp/mierune/{z}/{x}/{y}.png"],
    tileSize: 256,
    attribution:
      "地図の出典：<a href='https://www.mierune.co.jp/' target='_blank'>MIERUNE</a>",
  });

  //MIERUNE MONO
  map.addSource("mieruneM", {
    type: "raster",
    tiles: ["https://tile.mierune.co.jp/mierune_mono/{z}/{x}/{y}.png"],
    tileSize: 256,
    attribution:
      "地図の出典：<a href='https://www.mierune.co.jp/' target='_blank'>MIERUNE</a>",
  });

  //Stamen_t
  map.addSource("Stamento", {
    type: "raster",
    tiles: ["https://stamen-tiles.a.ssl.fastly.net/toner/{z}/{x}/{y}.png"],
    tileSize: 256,
    attribution:
      "地図の出典：<a href='http://maps.stamen.com/#toner' target='_blank'>stamen</a>",
  });

  //Stamen_Terrain
  map.addSource("StamenT", {
    type: "raster",
    tiles: ["https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}.png"],
    tileSize: 256,
    attribution:
      "地図の出典：<a href='http://maps.stamen.com/#terrain' target='_blank'>stamen</a>",
  });

  //Stamen_w
  map.addSource("StamenW", {
    type: "raster",
    tiles: ["https://stamen-tiles.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg"],
    tileSize: 256,
    attribution:
      "地図の出典：<a href='http://maps.stamen.com/#watercolor' target='_blank'>stamen</a>",
  });


// kasaneteigi
map.addSource("saisinsyasin2", {
  type: "raster",
  tiles: [
    "https://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/{z}/{x}/{y}.jpg",
  ],
  tileSize: 256,
  attribution:
    "地図の出典：<a href='https://www.gsi.go.jp/' target='_blank'>国土地理院</a>",
});

//電子国土基本図（オルソ画像）
map.addSource("oruso2", {
  type: "raster",
  tiles: ["https://cyberjapandata.gsi.go.jp/xyz/ort/{z}/{x}/{y}.jpg"],
  tileSize: 256,
  attribution:
    "地図の出典：<a href='https://www.gsi.go.jp/' target='_blank'>国土地理院</a>",
});

//空中写真(1979年頃)
map.addSource("kutyu2", {
  type: "raster",
  tiles: ["https://cyberjapandata.gsi.go.jp/xyz/gazo2/{z}/{x}/{y}.jpg"],
  tileSize: 256,
  attribution:
    "地図の出典：<a href='https://www.gsi.go.jp/' target='_blank'>国土地理院</a>",
});

//基本図(マップボックスアカウントのマップデータから)
map.addSource("kihonzu2", {
  type: "raster",
  tiles: [
    "https://api.mapbox.com/styles/v1/ensyuringis/ckzppbbaf001k14ldljs4a65x/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZW5zeXVyaW5naXMiLCJhIjoiY2t6cHBhdHp2MDFlMTJ3bmRsNzY4dTlkbiJ9.BtuWDU9uyDaR5Var2Y6-4A",
  ],
  tileSize: 256,
});

//地理院タイル標準
map.addSource("hyouzyun2", {
  type: "raster",
  tiles: ["https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png"],
  tileSize: 256,
  attribution:
    "地図の出典：<a href='https://www.gsi.go.jp/' target='_blank'>国土地理院</a>",
});

//地理院タイル炎色
map.addSource("tansyoku2", {
  type: "raster",
  tiles: ["https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png"],
  tileSize: 256,
  attribution:
    "地図の出典：<a href='https://www.gsi.go.jp/' target='_blank'>国土地理院</a>",
});

//色別標高図
map.addSource("sikibetu2", {
  type: "raster",
  tiles: ["https://cyberjapandata.gsi.go.jp/xyz/relief/{z}/{x}/{y}.png"],
  tileSize: 256,
  attribution:
    "地図の出典：<a href='https://www.gsi.go.jp/' target='_blank'>国土地理院</a>",
});

// 陰影起伏図
map.addSource("ineikizyou2", {
  type: "raster",
  tiles: [
    "https://cyberjapandata.gsi.go.jp/xyz/hillshademap/{z}/{x}/{y}.png",
  ],
  tileSize: 256,
  attribution:
    "地図の出典：<a href='https://www.gsi.go.jp/bousaichiri/hillshademap.html' target='_blank'>国土地理院</a>",
});

// 傾斜量図白黒
map.addSource("keisyasirokuro2", {
  type: "raster",
  tiles: ["https://cyberjapandata.gsi.go.jp/xyz/slopemap/{z}/{x}/{y}.png"],
  tileSize: 256,
  attribution:
    "地図の出典：<a href='https://www.gsi.go.jp/' target='_blank'>国土地理院</a>",
});

//傾斜区分図(岐阜県森林研究所)
map.addSource("keiyakubun2", {
  type: "raster",
  tiles: [
    "https://tiles.arcgis.com/tiles/jJQWqgqiNhLLjkin/arcgis/rest/services/Gifu_Slpoe/MapServer/tile/{z}/{y}/{x}",
  ],
  tileSize: 256,
  attribution:
    "地図の出典：<a href='https://www.forest.rd.pref.gifu.lg.jp/shiyou/CSrittaizu.html' target='_blank'>岐阜県森林研究所</a>",
});

// 植生図
map.addSource("syokusei2", {
  type: "raster",
  tiles: ["https://map.ecoris.info/tiles/vege67hill/{z}/{x}/{y}.png"],
  tileSize: 256,
  attribution:
    "地図の出典：<a href='https://map.ecoris.info/#contents' target='_blank'>エコリス地図タイル</a>",
});

// シームレス地質図
map.addSource("tisitus2", {
  type: "raster",
  tiles: ["https://gbank.gsj.jp/seamless/v2/api/1.2.1/tiles/{z}/{y}/{x}.png"],
  tileSize: 256,
  attribution:
    "地図の出典：<a href='https://gbank.gsj.jp/seamless/index.html?lang=ja&' target='_blank'>産総研地質調査総合センター</a>",
});

// 活断層図
map.addSource("katudansou2", {
  type: "raster",
  tiles: ["https://cyberjapandata.gsi.go.jp/xyz/afm/{z}/{x}/{y}.png"],
  tileSize: 256,
  attribution:
    "地図の出典：<a href='https://www.gsi.go.jp/bousaichiri/active_fault.html' target='_blank'>国土地理院</a>",
});

// CS立体図(岐阜県森林研究所)
map.addSource("csrittai2", {
  type: "raster",
  tiles: [
    "https://tiles.arcgis.com/tiles/jJQWqgqiNhLLjkin/arcgis/rest/services/Gifu2021CS_Mosic/MapServer/tile/{z}/{y}/{x}",
  ],
  tileSize: 256,
  attribution:
    "地図の出典：<a href='https://www.forest.rd.pref.gifu.lg.jp/shiyou/CSrittaizu.html' target='_blank'>岐阜県森林研究所</a>",
});

//赤色立体図10mメッシュ
map.addSource("sekisyoku2", {
  type: "raster",
  tiles: ["https://cyberjapandata.gsi.go.jp/xyz/sekishoku/{z}/{x}/{y}.png"],
  tileSize: 256,
  attribution:
    "地図の出典：<a href='https://www.rrim.jp/' target='_blank'>アジア航測株式会社</a>",
});

//Google Maps
map.addSource("google2", {
  type: "raster",
  tiles: ["https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"],
  tileSize: 256,
  attribution:
    "地図の出典：<a href='https://www.google.co.jp/maps/?hl=ja' target='_blank'>googlemap</a>",
});

//Google s
map.addSource("GoogleS2", {
  type: "raster",
  tiles: ["https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"],
  tileSize: 256,
  attribution:
    "地図の出典：<a href='https://www.google.co.jp/maps/?hl=ja' target='_blank'>googlemap</a>",
});

//Google sh
map.addSource("GoogleSH2", {
  type: "raster",
  tiles: ["https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}"],
  tileSize: 256,
  attribution:
    "地図の出典：<a href='https://www.google.co.jp/maps/?hl=ja' target='_blank'>googlemap</a>",
});

//OpenStreetMap
map.addSource("osm2", {
  type: "raster",
  tiles: ["http://tile.thunderforest.com/cycle/{z}/{x}/{y}.png"],
  tileSize: 256,
  attribution:
    "地図の出典：<a href='https://openstreetmap.jp/' target='_blank'>OpenStreetMap</a>",
});

//白地図
map.addSource("hakutizu2", {
  type: "raster",
  tiles: ["https://cyberjapandata.gsi.go.jp/xyz/blank/{z}/{x}/{y}.png"],
  tileSize: 256,
  attribution:
    "地図の出典：<a href='https://www.gsi.go.jp/' target='_blank'>国土地理院</a>",
});

//Esri World Imagery
map.addSource("esriW2", {
  type: "raster",
  tiles: [
    "https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
  ],
  tileSize: 256,
  attribution:
    "地図の出典：<a href='https://www.arcgis.com/home/item.html?id=10df2279f9684e4a9f6a7f08febac2a9' target='_blank'>Esri</a>",
});

//MIERUNE Color
map.addSource("mieruneC2", {
  type: "raster",
  tiles: ["https://tile.mierune.co.jp/mierune/{z}/{x}/{y}.png"],
  tileSize: 256,
  attribution:
    "地図の出典：<a href='https://www.mierune.co.jp/' target='_blank'>MIERUNE</a>",
});

//MIERUNE MONO
map.addSource("mieruneM2", {
  type: "raster",
  tiles: ["https://tile.mierune.co.jp/mierune_mono/{z}/{x}/{y}.png"],
  tileSize: 256,
  attribution:
    "地図の出典：<a href='https://www.mierune.co.jp/' target='_blank'>MIERUNE</a>",
});

//Stamen_t
map.addSource("Stamento2", {
  type: "raster",
  tiles: ["https://stamen-tiles.a.ssl.fastly.net/toner/{z}/{x}/{y}.png"],
  tileSize: 256,
  attribution:
    "地図の出典：<a href='http://maps.stamen.com/#toner' target='_blank'>stamen</a>",
});

//Stamen_Terrain
map.addSource("StamenT2", {
  type: "raster",
  tiles: ["https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}.png"],
  tileSize: 256,
  attribution:
    "地図の出典：<a href='http://maps.stamen.com/#terrain' target='_blank'>stamen</a>",
});

//Stamen_w
map.addSource("StamenW2", {
  type: "raster",
  tiles: ["https://stamen-tiles.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg"],
  tileSize: 256,
  attribution:
    "地図の出典：<a href='http://maps.stamen.com/#watercolor' target='_blank'>stamen</a>",
});

  // レイヤ設定
  var Map_BaseLayer = {
    saisinsyasin: "全国最新写真(シームレス)",
    oruso: "電子国土基本図(オルソ画像)",
    kutyu: "空中写真(1979年頃)",
    kihonzu: "基本図",
    hyouzyun: "国土地理院地図標準",
    tansyoku: "国土地理院地図淡色",
    sikibetu: "色別標高図",
    ineikizyou: "陰影起伏図",
    keisyasirokuro: "傾斜量図",
    csrittai: "CS立体図(岐阜県森林研究所)",
    keiyakubun: "傾斜区分図(岐阜県森林研究所)",
    syokusei: "植生図(エコリス)",
    tisitus: "シームレス地質図(産総研)",
    katudansou: "活断層図",
    sekisyoku: "赤色立体図(10mメッシュ)",
    hakutizu: "白地図",
    google: "Google Maps",
    GoogleS: "Google Satellite",
    GoogleSH: "Google Satellite Hybrid",
    osm: "OpenStreetMap",
    esriW: "Esri World Imagery",
    mieruneC: "MIERUNE Color",
    mieruneM: "MIERUNE MONO",
    Stamento: "Stamen Toner",
    StamenT: "Stamen Terrain",
    StamenW: "Stamen Watercolor",
  };

  // レイヤメニュー作成
  for (var i = 0; i < Object.keys(Map_BaseLayer).length; i++) {
    // レイヤID取得
    var id = Object.keys(Map_BaseLayer)[i];
    // aタグ作成
    var link = document.createElement("a");
    link.href = "#";
    // id追加
    link.id = id;
    // 名称追加
    link.textContent = Map_BaseLayer[id];

    // 初期表示m_mono以外非表示
    if (id === "saisinsyasin") {
      link.className = "active";
    } else {
      map.setLayoutProperty(id, "visibility", "none");
      link.className = "";
    }

    //aタグクリック処理
    link.onclick = function (e) {
      // id取得
      var clickedLayer = this.id;
      e.preventDefault();
      e.stopPropagation();

      // ON/OFF状態取得
      var visibility = map.getLayoutProperty(clickedLayer, "visibility");

      // ON/OFF判断
      if (visibility === "visible") {
      } else {
        for (var j = 0; j < Object.keys(Map_BaseLayer).length; j++) {
          // レイヤID取得
          var ch_id = Object.keys(Map_BaseLayer)[j];

          // レイヤの表示・非表示
          if (ch_id === clickedLayer) {
            // クリックしたレイヤを表示
            this.className = "active";
            map.addLayer({
              id: clickedLayer,
              type: "raster",
              source: clickedLayer,
              minzoom: 0,
              maxzoom: 24,
              paint: {
                "raster-opacity": 1,
                "raster-brightness-min": 0,
                "raster-brightness-max": 1,
                "raster-contrast": 0,
                "raster-saturation": 0,
              },
              });
               // 空レイヤーの下に挿入
              map.moveLayer(clickedLayer, 'mapbase');
          } else {
            // クリックしたレイヤ以外を非表示
            var ch_obj = document.getElementById(ch_id);
            ch_obj.className = "";
            map.removeLayer(ch_id);
          }
        }
      }

      //カラープロパティセット
      document.getElementById("layer5").value = clickedLayer;
      inputChange5();
      //凡例表示
      //         img = document.getElementById("hanrei");
      // img.src = "https://raw.githubusercontent.com/satoshi7190/ensyuringis/main/hanrei/" + clickedLayer + ".png";
    };

    // レイヤメニューにレイヤ追加
    var layers = document.getElementById("menu2");
    layers.appendChild(link);
  }

  //ラスターレイヤー

  //地図なし
  map.addSource("nasi", {
    type: "raster",
    tiles: [
      "https://api.mapbox.com/styles/v1/ensyuringis/ckzt6ulkx003214qu9cfzwp3f/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZW5zeXVyaW5naXMiLCJhIjoiY2t6cHBhdHp2MDFlMTJ3bmRsNzY4dTlkbiJ9.BtuWDU9uyDaR5Var2Y6-4A",
    ],
    tileSize: 256,
  });
  map.addLayer({
    id: "nasi",
    type: "raster",
    source: "nasi",
    minzoom: 0,
    maxzoom: 24,
    paint: {
      "raster-opacity": 0,
      "raster-brightness-min": 0,
      "raster-brightness-max": 1,
      "raster-contrast": 0,
      "raster-saturation": 0,
    },
  });

  // 傾斜量図なだれ
  map.addSource("keisyanadare", {
    type: "raster",
    tiles: [
      "https://cyberjapandata.gsi.go.jp/xyz/slopezone1map/{z}/{x}/{y}.png",
    ],
    tileSize: 256,
  });

  // 地すべり地形分布図日本全国版（防災科学技術研究所）
  map.addSource("zisuberi", {
    type: "raster",
    tiles: ["https://jmapweb3v.bosai.go.jp/map/xyz/landslide/{z}/{x}/{y}.png"],
    tileSize: 256,
    attribution:
      "地図の出典：<a href='https://www.j-shis.bosai.go.jp/landslidemap' target='_blank'>防災科学技術研究所</a>",
  });

  //磁気図(偏角)/偏角一覧図
  map.addSource("zikizu", {
    type: "raster",
    tiles: [
      "https://cyberjapandata.gsi.go.jp/xyz/jikizu2015_chijiki_d/{z}/{x}/{y}.png",
    ],
    tileSize: 256,
  });

  // ラスターレイヤ設定
  var Map_BaseLayer2 = {
    nasi: "(重ねて表示しない)",
    saisinsyasin2: "全国最新写真(シームレス)",
    oruso2: "電子国土基本図(オルソ画像)",
    kutyu2: "空中写真(1979年頃)",
    kihonzu2: "基本図",
    hyouzyun2: "国土地理院地図標準",
    tansyoku2: "国土地理院地図淡色",
    sikibetu2: "色別標高図",
    ineikizyou2: "陰影起伏図",
    keisyasirokuro2: "傾斜量図",
    csrittai2: "CS立体図(岐阜県森林研究所)",
    keiyakubun2: "傾斜区分図(岐阜県森林研究所)",
    syokusei2: "植生図(エコリス)",
    tisitus2: "シームレス地質図(産総研)",
    katudansou2: "活断層図",
    sekisyoku2: "赤色立体図(10mメッシュ)",
    hakutizu2: "白地図",
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

  // レイヤメニュー作成
  for (var i = 0; i < Object.keys(Map_BaseLayer2).length; i++) {
    // レイヤID取得
    var id = Object.keys(Map_BaseLayer2)[i];
    // aタグ作成
    var link = document.createElement("a");
    link.href = "#";
    // id追加
    link.id = id;
    // 名称追加
    link.textContent = Map_BaseLayer2[id];

    // 初期表示m_mono以外非表示
    if (id === "nasi") {
      link.className = "active";
    } else {
      map.setLayoutProperty(id, "visibility", "none");
      link.className = "";
    }

    //aタグクリック処理
    link.onclick = function (e) {
      // id取得
      var clickedLayer2 = this.id;
      e.preventDefault();
      e.stopPropagation();

      // ON/OFF状態取得
      var visibility = map.getLayoutProperty(clickedLayer2, "visibility");

      // ON/OFF判断
      if (visibility === "visible") {
      } else {
        for (var j = 0; j < Object.keys(Map_BaseLayer2).length; j++) {
          // レイヤID取得
          var ch_id2 = Object.keys(Map_BaseLayer2)[j];

          // レイヤの表示・非表示
          if (ch_id2 === clickedLayer2) {
            // クリックしたレイヤを表示
            this.className = "active";
            map.addLayer({
              id: clickedLayer2,
              type: "raster",
              source: clickedLayer2,
              minzoom: 0,
              maxzoom: 24,
              paint: {
                "raster-opacity": 0.5,
                "raster-brightness-min": 0,
                "raster-brightness-max": 1,
                "raster-contrast": 0,
                "raster-saturation": 0,
              },
              });
               // 空レイヤーの下に挿入
              map.moveLayer(clickedLayer2, 'rasterbase');
          } else {
            // クリックしたレイヤ以外を非表示
            var ch_obj = document.getElementById(ch_id2);
            ch_obj.className = "";
            map.removeLayer(ch_id2);
          }
        }
      }

      //カラープロパティセット
      document.getElementById("layer3").value = clickedLayer2;
      inputChange3();

      //凡例表示
      //     img = document.getElementById("hanrei2");
      // img.src = "https://raw.githubusercontent.com/satoshi7190/ensyuringis/main/hanrei/" + clickedLayer2 + ".png";
    };

    // レイヤメニューにレイヤ追加
    var layers = document.getElementById("menu3");
    layers.appendChild(link);
  }

  map.addSource("zumenkiso", {
    type: "geojson",
    data: "https://raw.githubusercontent.com/satoshi7190/ensyuringis/main/geojson/zumenkiso.geojson",
  });

  //その他ポイント
  map.addSource("rinnaipointosin", {
    type: "vector",
    url: "mapbox://satoshi7190.ckussat723mwp27p851kqvruk-18by7",
  });

  //歩道
  map.addSource("rinnai-miti", {
    type: "vector",
    url: "mapbox://satoshi7190.ckurzsc4m8kv428nzjzjf7h8v-68z30",
  });

  //川
  map.addSource("rinnai-kawa", {
    type: "vector",
    url: "mapbox://satoshi7190.ckustg4nd4dgc26n3r1dckg5p-6n6ji",
  });

  //林内ポイント
  map.addSource("rinnai-point", {
    type: "vector",
    url: "mapbox://satoshi7190.ckussat723mwp27p851kqvruk-5hy2g",
  });

  //サインポール
  map.addSource("ensyurin-sainpole", {
    type: "vector",
    url: "mapbox://satoshi7190.ckuujq1130ig328oismcdsozv-8t3y9",
  });

  //国有林
  map.addSource("kokuyurin", {
    type: "vector",
    url: "mapbox://satoshi7190.cku9slodv0wgc27rs708mp6b1-8me7t",
  });

  //林班合体
  map.addSource("ensyurin-rinpan-sin", {
    type: "vector",
    url: "mapbox://satoshi7190.ckurz9v5s0whl21ofo9hahewh-2v3na",
  });

  //林班別
  map.addSource("ensyuri-rihanbetu", {
    type: "vector",
    url: "mapbox://satoshi7190.ckuvh9ykh0lbn27msodljzdvl-9jrxx",
  });

  //林班範囲
  map.addSource("ensyurinhani", {
    type: "vector",
    url: "mapbox://satoshi7190.cku9v9gln078620p3nm2lfq97-2bjuv",
  });

  //試験地
  map.addSource("ensyurinsikenti", {
    type: "vector",
    url: "mapbox://satoshi7190.ckukunmh91thv28nup0rfmyrq-4dsu3",
  });

  //危険木
  map.addSource("kikenboku", {
    type: "vector",
    url: "mapbox://satoshi7190.ckup1h8z101sf20mjml3wn8jd-8jwaz",
  });

  //イエローゾーン
  map.addSource("dosyakeikaiY", {
    type: "vector",
    url: "mapbox://satoshi7190.ckukv2m3i0sjg23mm847auwif-75gyi",
  });

  //レッドゾーン
  map.addSource("dosyakeikaiR", {
    type: "vector",
    url: "mapbox://satoshi7190.ckukvgg451pby2bphqgrjs87b-9e8np",
  });

  //美濃市指定避難所
  map.addSource("minosi-siteihinanbasyo", {
    type: "vector",
    url: "mapbox://satoshi7190.ckutua08i04cs20li4oayvdhq-4pv9p",
  });

  //美濃市指定緊急避難所
  map.addSource("minosi-siteikinkyuhinanbasyo", {
    type: "vector",
    url: "mapbox://satoshi7190.ckutuh81z04f728pf0qmmr3zj-1ag9m",
  });

  //フェノロジー2020
  map.addSource("fenorozi-2020", {
    type: "vector",
    url: "mapbox://satoshi7190.ckusnxu2b0afg27ms6om2lgny-3ntui",
  });

  //フェノロジー2020昆虫
  map.addSource("fenorozi-2020-kontyu", {
    type: "vector",
    url: "mapbox://satoshi7190.ckuuwa1gw4y5826n3hlmdybao-1qlog",
  });

  //フェノロジー2020哺乳類
  map.addSource("fenorozi-2020-honyurui", {
    type: "vector",
    url: "mapbox://satoshi7190.ckuuwctvy0l9w22oirx1a1wtu-2gk1b",
  });

  //フェノロジー2020鳥類
  map.addSource("fenorozi-2020-tyourui", {
    type: "vector",
    url: "mapbox://satoshi7190.ckuuwhmpe479t2dp8xss83hc7-55f2h",
  });

  //フェノロジー2020菌類
  map.addSource("fenorozi-2020-kinrui", {
    type: "vector",
    url: "mapbox://satoshi7190.ckuuwfzsm52pj28n361zhrbuu-6vfh0",
  });
  //フェノロジー2020植物
  map.addSource("fenorozi-2020-syokubutu", {
    type: "vector",
    url: "mapbox://satoshi7190.ckuuyecm40g8n20mcpbgmlla2-1uqaj",
  });

  //  演習林プロットデータ
  map.addSource("ensyurin-purotto2", {
    type: "vector",
    url: "mapbox://satoshi7190.ckuugw6az0c2620mcvb0msal2-2n8w3",
  });

  //鳥獣保護区等(H30)
  map.addSource("H30-gifu-tyouzyuhogokutou", {
    type: "vector",
    url: "mapbox://satoshi7190.ckutttnh20wc922pr3ezhlc56-8ko5q",
  });

  //等高線
  map.addSource("japan-gsi-contour-mts", {
    type: "vector",
    url: "mapbox://mapbox-japan.japan-gsi-contour-v1",
  });

  //標高点
  map.addSource("japan-gsi-elevpt-mts", {
    type: "vector",
    url: "mapbox://mapbox-japan.japan-gsi-elevpt-v1",
  });

  //OWL-立木データ
  map.addSource("owl", {
    type: "vector",
    url: "mapbox://satoshi7190.ckw7b0rib2f1320ms8kze9suu-1ayf2",
  });

  //360度写真
  map.addSource("image360", {
    type: "vector",
    url: "mapbox://satoshi7190.ckwbhr68s00ec28plbt8krg2o-92zcd",
  });

  //みんなの記録
  map.addSource("kiroku", {
    type: "geojson",
    data: "https://script.google.com/macros/s/AKfycbyN0LAXAFn9sfY_hplzrQWwbjEkQ4K2c1L489VT_C9YSHt4dIUVzx4qyJ712Ha1uFMs/exec",
  });

  //国土
  map.addSource("mapbox", {
    type: "vector",
    url: "mapbox://mapbox.mapbox-streets-v8",
  });

  //岐阜県表層地質
  map.addSource("GIFU-hyousoutisitu", {
    type: "vector",
    url: "mapbox://satoshi7190.ckyium27n1rdd28n1fq48uswf-7yy1u",
  });

  //マップベース
  map.addLayer({
    id: "mapbase",
    type: "raster",
    source: "saisinsyasin",
    minzoom: 0,
    maxzoom: 0,
    paint: {
      "raster-opacity": 0,
    },
  });

    //ラスターベース
  map.addLayer({
    id: "rasterbase",
    type: "raster",
    source: "saisinsyasin",
    minzoom: 0,
    maxzoom: 0,
    paint: {
      "raster-opacity": 0,
    },
  });

  map.addLayer({
    id: "岐阜県20万分の1表層地質",
    type: "fill",
    source: "GIFU-hyousoutisitu",
    "source-layer": "GIFU-hyousoutisitu",
    filter: ["all", ["match", ["geometry-type"], ["Polygon"], true, false]],
    layout: {
      visibility: "none",
    },
    paint: {
      "fill-opacity": 0.58,
      "fill-color": [
        "match",
        ["get", "属性2"],
        ["凝灰質岩石"],
        "hsl(255, 81%, 41%)",
        ["砂"],
        "hsl(36, 77%, 47%)",
        ["輝緑凝灰岩"],
        "hsl(0, 36%, 63%)",
        ["泥岩"],
        "hsl(141, 52%, 38%)",
        ["泥"],
        "hsl(85, 59%, 31%)",
        ["砂岩"],
        "hsl(0, 40%, 58%)",
        ["火山砕屑物"],
        "hsl(154, 30%, 17%)",
        ["片麻岩類"],
        "hsl(304, 82%, 40%)",
        ["礫"],
        "hsl(111, 32%, 53%)",
        ["石灰岩"],
        "hsl(0, 8%, 78%)",
        ["玄武岩質岩石"],
        "hsl(291, 78%, 81%)",
        ["チャート"],
        "hsl(0, 0%, 66%)",
        ["蛇紋岩質岩石"],
        "hsl(52, 34%, 28%)",
        ["砂岩・貢岩・礫岩互層"],
        "hsl(317, 82%, 34%)",
        ["礫・砂・粘土"],
        "hsl(160, 31%, 44%)",
        ["花崗岩質岩石"],
        "hsl(213, 11%, 52%)",
        ["安山岩質岩石"],
        "hsl(232, 56%, 60%)",
        ["斑レイ岩質岩石"],
        "hsl(121, 49%, 29%)",
        ["流紋岩質岩石"],
        "hsl(13, 35%, 68%)",
        ["結晶片岩類"],
        "hsl(167, 66%, 67%)",
        ["斑岩"],
        "hsl(134, 25%, 30%)",
        ["礫岩"],
        "hsl(344, 77%, 71%)",
        ["砂岩・貢岩互層（非変成）"],
        "hsl(0, 11%, 59%)",
        "hsl(0, 76%, 100%)",
      ],
      "fill-outline-color": "#000000",
    },
  });
  map.addLayer({
    id: "岐阜県20万分の1表層地質-断層",
    type: "line",
    source: "GIFU-hyousoutisitu",
    "source-layer": "GIFU-hyousoutisitu",
    filter: ["all", ["match", ["geometry-type"], ["LineString"], true, false]],
    layout: {
      visibility: "none",
    },
    paint: {
      "line-width": 3,
      "line-opacity": 1,
      "line-color": "#000000",
    },
  });

  map.addSource("gifu-201dozyo", {
    type: "geojson",
    data: "https://raw.githubusercontent.com/satoshi7190/ensyuringis/main/geojson/gifu-201dozyo.geojson",
  });
  map.addLayer({
    id: "岐阜県20万分の1土壌分類",
    type: "fill",
    source: "gifu-201dozyo",
    layout: {
      visibility: "none",
    },
    paint: {
      "fill-opacity": 0.58,
      "fill-color": [
        "match",
        ["get", "属性1"],
        ["グライ土"],
        "#4455c4",
        ["ポドゾル"],
        "#4390fe",
        ["灰色低地土"],
        "#1fc9dd",
        ["褐色森林土"],
        "#2aefa1",
        ["褐色低地土"],
        "#7eff55",
        ["岩屑土"],
        "#c2f234",
        ["岩石地"],
        "#f2c93a",
        ["黒ボク土"],
        "#fe8f29",
        ["赤黄色土"],
        "#e94d0d",
        ["泥炭土"],
        "#bd2002",
        ["未熟土"],
        "#7a0403",
        "#30123b",
      ],
      "fill-outline-color": "#000000",
    },
  });

  map.addSource("kousuisoutei", {
    type: "raster",
    tiles: ["https://disaportaldata.gsi.go.jp/raster/01_flood_l2_shinsuishin_pref_data/21/{z}/{x}/{y}.png"],
    tileSize: 256,
    attribution:
      "<a href='https://disaportal.gsi.go.jp/index.html' target='_blank'>ハザードマップポータルサイト</a>",
  });
  map.addLayer({
    id: "洪水浸水想定区域",
    type: "raster",
    source: "kousuisoutei",
    minzoom: 0,
    maxzoom: 24,
    layout: {
        visibility: "none",
      },
      paint: {
        "raster-opacity": 0.6,
      },
  });

  map.addSource("dosyadoseki", {
    type: "raster",
    tiles: ["https://disaportaldata.gsi.go.jp/raster/05_dosekiryukeikaikuiki_data/21/{z}/{x}/{y}.png"],
    tileSize: 256,
    attribution:
      "<a href='https://disaportal.gsi.go.jp/index.html' target='_blank'>ハザードマップポータルサイト</a>",
  });
  map.addLayer({
    id: "土砂災害警戒区域（土石流）",
    type: "raster",
    source: "dosyadoseki",
    minzoom: 0,
    maxzoom: 24,
    layout: {
        visibility: "none",
      },
      paint: {
        "raster-opacity": 0.6,
      },
  });

  map.addSource("dosyakyusyati", {
    type: "raster",
    tiles: ["https://disaportaldata.gsi.go.jp/raster/05_kyukeishakeikaikuiki_data/21/{z}/{x}/{y}.png"],
    tileSize: 256,
    attribution:
      "<a href='https://disaportal.gsi.go.jp/index.html' target='_blank'>ハザードマップポータルサイト</a>",
  });
  map.addLayer({
    id: "土砂災害警戒区域（急傾斜地の崩壊）",
    type: "raster",
    source: "dosyakyusyati",
    minzoom: 0,
    maxzoom: 24,
    layout: {
        visibility: "none",
      },
      paint: {
        "raster-opacity": 0.6,
      },
  });

  map.addSource("dosyazisuberi", {
    type: "raster",
    tiles: ["https://disaportaldata.gsi.go.jp/raster/05_jisuberikeikaikuiki_data/21/{z}/{x}/{y}.png"],
    tileSize: 256,
    attribution:
      "<a href='https://disaportal.gsi.go.jp/index.html' target='_blank'>ハザードマップポータルサイト</a>",
  });
  map.addLayer({
    id: "土砂災害警戒区域（地すべり）",
    type: "raster",
    source: "dosyazisuberi",
    minzoom: 0,
    maxzoom: 24,
    layout: {
        visibility: "none",
      },
      paint: {
        "raster-opacity": 0.6,
      },
  });

  map.addSource("dosekiryu", {
    type: "raster",
    tiles: ["https://disaportaldata.gsi.go.jp/raster/05_dosekiryukikenkeiryu_data/21/{z}/{x}/{y}.png"],
    tileSize: 256,
    attribution:
      "<a href='https://disaportal.gsi.go.jp/index.html' target='_blank'>ハザードマップポータルサイト</a>",
  });
  map.addLayer({
    id: "土石流危険渓流",
    type: "raster",
    source: "dosekiryu",
    minzoom: 0,
    maxzoom: 24,
    layout: {
        visibility: "none",
      },
      paint: {
        "raster-opacity": 0.6,
      },
  });

  map.addSource("kyusyati", {
    type: "raster",
    tiles: ["https://disaportaldata.gsi.go.jp/raster/05_kyukeisyachihoukai_data/21/{z}/{x}/{y}.png"],
    tileSize: 256,
    attribution:
      "<a href='https://disaportal.gsi.go.jp/index.html' target='_blank'>ハザードマップポータルサイト</a>",
  });
  map.addLayer({
    id: "急傾斜地崩壊危険箇所",
    type: "raster",
    source: "kyusyati",
    minzoom: 0,
    maxzoom: 24,
    layout: {
        visibility: "none",
      },
      paint: {
        "raster-opacity": 0.6,
      },
  });

  map.addLayer({
    id: "岐阜県鳥獣保護区等(H30)",
    type: "fill",
    source: "H30-gifu-tyouzyuhogokutou",
    "source-layer": "H30-gifu-tyouzyuhogokutou",
    layout: {
      visibility: "none",
    },
    paint: {
      "fill-opacity": 0.58,
      "fill-color": [
        "match",
        ["get", "種類"],
        ["鳥獣保護区"],
        "hsl(193, 63%, 58%)",
        ["特定猟具禁止区域（銃）"],
        "hsl(0, 84%, 52%)",
        ["特別鳥獣保護区"],
        "hsl(118, 57%, 39%)",
        ["休猟区"],
        "hsl(98, 83%, 56%)",
        ["指定猟法禁止区域（鉛）"],
        "hsl(49, 79%, 50%)",
        ["猟区"],
        "hsl(29, 86%, 58%)",
        "#000000",
      ],
    },
  });

  map.addLayer({
    id: "行政区画",
    type: "line",
    source: "mapbox",
    "source-layer": "admin",
    layout: {
      visibility: "none",
    },
    paint: {
      "line-opacity": 1,
      "line-width": ["interpolate", ["linear"], ["zoom"], 2, 0.1, 22, 9],
      "line-color": "#02b6a1",
      "line-opacity": 1,
    },
  });

  map.addLayer({
    id: "古城山国有林-林分",
    type: "fill",
    source: "kokuyurin",
    "source-layer": "kokuyurin",
    layout: {
      visibility: "none",
    },
    paint: {
      "fill-opacity": 0.5,
      "fill-color": [
        "match",
        ["get", "国有林_樹種１"],
        ["スギ"],
        "#3a9310",
        ["ヒノキ"],
        "#4adea5",
        ["アカマツ"],
        "#DD2B2B",
        ["他Ｌ"],
        "#ecbd22",
        ["天ヒノキ"],
        "#34eac2",
        "#000000",
      ],
      "fill-outline-color": "#000000",
    },
  });

  map.addLayer({
    id: "古城山国有林-林分境界線",
    type: "line",
    source: "kokuyurin",
    "source-layer": "kokuyurin",
    layout: {
      visibility: "none",
    },
    paint: {
      "line-width": 1.5,
      "line-opacity": 1,
      "line-color": "#000000",
    },
  });

  map.addLayer({
    id: "演習林-スギ林",
    type: "fill",
    source: "ensyurin-rinpan-sin",
    "source-layer": "ensyurin-rinpan-sin",
    filter: ["all", ["match", ["get", "樹種"], ["スギ"], true, false]],
    layout: {
      visibility: "visible",
    },
    paint: {
      "fill-opacity": 0.5,
      "fill-color": "#399210",
      "fill-outline-color": "#000000",
    },
  });

  map.addLayer({
    id: "演習林-ヒノキ林",
    type: "fill",
    source: "ensyurin-rinpan-sin",
    "source-layer": "ensyurin-rinpan-sin",
    filter: ["all", ["match", ["get", "樹種"], ["ヒノキ"], true, false]],
    layout: {
      visibility: "visible",
    },
    paint: {
      "fill-opacity": 0.5,
      "fill-color": "#4ADDA5",
      "fill-outline-color": "#000000",
    },
  });

  map.addLayer({
    id: "演習林-アカマツ林",
    type: "fill",
    source: "ensyurin-rinpan-sin",
    "source-layer": "ensyurin-rinpan-sin",
    filter: ["all", ["match", ["get", "樹種"], ["アカマツ"], true, false]],
    layout: {
      visibility: "visible",
    },
    paint: {
      "fill-opacity": 0.5,
      "fill-color": "#DD2B2B",
      "fill-outline-color": "#000000",
    },
  });

  map.addLayer({
    id: "演習林-スラッシュマツ林",
    type: "fill",
    source: "ensyurin-rinpan-sin",
    "source-layer": "ensyurin-rinpan-sin",
    filter: ["all", ["match", ["get", "樹種"], ["スラッシュマ"], true, false]],
    layout: {
      visibility: "visible",
    },
    paint: {
      "fill-opacity": 0.5,
      "fill-color": "#B720BF",
      "fill-outline-color": "#000000",
    },
  });

  map.addLayer({
    id: "演習林-広葉樹林",
    type: "fill",
    source: "ensyurin-rinpan-sin",
    "source-layer": "ensyurin-rinpan-sin",
    filter: ["all", ["match", ["get", "樹種"], ["広葉樹"], true, false]],
    layout: {
      visibility: "visible",
    },
    paint: {
      "fill-opacity": 0.5,
      "fill-color": "#EBBC22",
      "fill-outline-color": "#000000",
    },
  });

  map.addLayer({
    id: "演習林-草地",
    type: "fill",
    source: "ensyurin-rinpan-sin",
    "source-layer": "ensyurin-rinpan-sin",
    filter: ["all", ["match", ["get", "樹種"], ["草地"], true, false]],
    layout: {
      visibility: "visible",
    },
    paint: {
      "fill-opacity": 0.5,
      "fill-color": "#2351E5",
      "fill-outline-color": "#000000",
    },
  });

  map.addLayer({
    id: "演習林-その他岩石",
    type: "fill",
    source: "ensyurin-rinpan-sin",
    "source-layer": "ensyurin-rinpan-sin",
    filter: ["all", ["match", ["get", "樹種"], ["その他岩石"], true, false]],
    layout: {
      visibility: "visible",
    },
    paint: {
      "fill-opacity": 0.5,
      "fill-color": "#D98F34",
      "fill-outline-color": "#000000",
    },
  });

  map.addLayer({
    id: "演習林-小林班境界線",
    type: "line",
    source: "ensyurin-rinpan-sin",
    "source-layer": "ensyurin-rinpan-sin",
    filter: [
      "match",
      ["get", "樹種"],
      [
        "スギ",
        "ヒノキ",
        "草地",
        "広葉樹",
        "スラッシュマ",
        "その他岩石",
        "アカマツ",
      ],
      true,
      false,
    ],
    layout: {
      visibility: "visible",
    },
    paint: {
      "line-color": "#000000",
      "line-width": 1.5,
      "line-opacity": 1,
    },
  });

  map.addLayer({
    id: "演習林-林班境界線",
    type: "line",
    source: "ensyuri-rihanbetu",
    "source-layer": "ensyuri-rihanbetu",
    layout: {
      visibility: "visible",
    },
    paint: {
      "line-color": "#000000",
      "line-opacity": 1,
      "line-width": 2,
    },
  });

  map.addLayer({
    id: "演習林-山林境界線",
    type: "line",
    source: "ensyurinhani",
    "source-layer": "ensyurinhani",
    filter: ["match", ["get", "Name"], ["演習林範囲"], true, false],
    layout: {
      visibility: "visible",
    },
    paint: {
      "line-color": "#000000",
      "line-opacity": 1,
      "line-width": 4,
    },
  });

  map.addLayer({
    id: "未来の森づくり予定地",
    type: "line",
    source: "ensyurinhani",
    "source-layer": "ensyurinhani",
    filter: ["match", ["get", "Name"], ["未来の森づくり施業区域"], true, false],
    layout: {
      visibility: "visible",
    },
    paint: {
      "line-width": 6,
      "line-color": "#a3a815",
      "line-opacity": 1,
    },
  });

  map.addLayer({
    id: "アカデミー施設・その他建物",
    source: "zumenkiso",
    type: "fill",
    filter: ["all", ["match", ["get", "カテゴリ"], ["建物"], true, false]],
    layout: {
      visibility: "visible",
    },
    paint: {
      "fill-color": "#47504F",
      "fill-opacity": 1,
      "fill-outline-color": "#000000",
    },
  });

  map.addLayer({
    id: "川",
    type: "line",
    source: "rinnai-kawa",
    "source-layer": "rinnai-kawa",
    layout: {
      visibility: "visible",
    },
    paint: {
      "line-opacity": 0.8,
      "line-width": 5,
      "line-color": "#0f7acc",
    },
  });

  map.addLayer({
    id: "歩道",
    type: "line",
    source: "rinnai-miti",
    "source-layer": "rinnai-miti",
    layout: {
      visibility: "visible",
      "line-join": "bevel",
    },
    paint: {
      "line-opacity": 0.8,
      "line-color": "#8e8e7b",
      "line-width": 5,
    },
  });

  map.addLayer({
    id: "演習林-林分ラベル",
    source: "ensyurin-rinpan-sin",
    "source-layer": "ensyurin-rinpan-sin",
    type: "symbol",
    filter: [
      "match",
      ["get", "樹種"],
      [
        "スギ",
        "ヒノキ",
        "草地",
        "広葉樹",
        "スラッシュマ",
        "その他岩石",
        "アカマツ",
      ],
      true,
      false,
    ],
    layout: {
      visibility: "visible",
      "text-field": [
        "match",
        ["get", "樹種"],
        ["広葉樹"],
        ["to-string", ["concat", ["get", "小林班ID"], "\n", ["get", "樹種"]]],
        ["草地"],
        ["to-string", ["concat", ["get", "小林班ID"], "\n", ["get", "樹種"]]],
        ["その他岩石"],
        ["to-string", ["concat", ["get", "小林班ID"], "\n", ["get", "樹種"]]],
        [
          "to-string",
          [
            "concat",
            ["get", "小林班ID"],
            "\n",
            ["get", "樹種"],
            " ",
            ["+", ["get", "林齢"], 2],
            "年生",
          ],
        ],
      ],
      "text-max-width": 12,
      "text-size": 12,
      "text-variable-anchor": ["top", "bottom", "left", "right"],
      "text-radial-offset": 0.5,
      "text-justify": "auto",
    },
    paint: {
      "text-color": "#000000",
      "text-halo-color": "#e0e0e0",
      "text-halo-width": 2,
      "text-opacity": 1,
    },
  });

  map.addLayer({
    id: "古城山国有林-林分ラベル",
    source: "kokuyurin",
    "source-layer": "kokuyurin",
    type: "symbol",
    layout: {
      visibility: "none",
      "text-field": [
        "case",
        ["match", ["get", "国有林_樹種１"], ["他Ｌ"], true, false],
        ["to-string", ["concat", ["get", "国有林_名前"], "\n", "広葉樹"]],
        [
          "match",
          ["get", "国有林_林小班名称"],
          ["3142_林班_イ", "3147_林班_イ", "3147_林班_ロ", "3149_林班_イ"],
          true,
          false,
        ],
        ["to-string", ["get", "国有林_名前"]],
        [
          "to-string",
          [
            "concat",
            ["get", "国有林_名前"],
            "\n",
            ["get", "国有林_樹種１"],
            " ",
            ["+", ["get", "国有林_最新林齢１"], 3],
            "年生",
          ],
        ],
      ],
      "text-max-width": 12,
      "text-size": 12,
      "text-variable-anchor": ["top", "bottom", "left", "right"],
      "text-radial-offset": 0.5,
      "text-justify": "auto",
    },
    paint: {
      "text-color": "#000000",
      "text-halo-color": "#FFFFFF",
      "text-halo-width": 1,
      "text-opacity": 1,
    },
  });

  map.addSource("tyusyazyo", {
    type: "geojson",
    data: "https://raw.githubusercontent.com/satoshi7190/ensyuringis/main/geojson/tyusyazyo.geojson",
  });
  map.addLayer({
    id: "駐車場",
    type: "fill",
    source: "tyusyazyo",

    layout: {
      visibility: "none",
    },
    paint: {
      "fill-color": "#4a8fe3",
      "fill-opacity": 0.6,
      "fill-outline-color": "#000000",
    },
  });

  map.addLayer({
    id: "試験地",
    type: "fill",
    source: "ensyurinsikenti",
    "source-layer": "ensyurinsikenti",
    layout: {
      visibility: "none",
    },
    paint: {
      "fill-opacity": 0.8,
      "fill-color": "#26BBF2",
      "fill-outline-color": "#000000",
    },
  });

  map.addLayer({
    id: "試験地-文字",
    source: "ensyurinsikenti",
    "source-layer": "ensyurinsikenti",
    type: "symbol",
    layout: {
      visibility: "none",
      "text-field": [
        "match",
        ["get", "活用期間"],
        ["不明～"],
        ["to-string", ["concat", "？年～", "\n", ["get", "活用内容"]]],
        [
          "to-string",
          ["concat", ["get", "活用期間"], "\n", ["get", "活用内容"]],
        ],
      ],
      "text-variable-anchor": ["top", "bottom", "left", "right"],
      "text-radial-offset": 0.5,
      "text-justify": "auto",
      "text-size": 14,
    },
    paint: {
      "text-color": "#000000",
      "text-halo-color": "#ffffff",
      "text-opacity": 1,
      "text-halo-width": 1,
    },
  });

  map.addLayer({
    id: "プロット調査",
    type: "fill",
    source: "ensyurin-purotto2",
    "source-layer": "ensyurin-purotto2",
    layout: {
      visibility: "none",
    },
    paint: {
      "fill-opacity": 0.8,
      "fill-color": "#1760e8",
      "fill-outline-color": "#000000",
    },
  });

  map.addLayer({
    id: "自力建設",
    type: "fill",
    source: "zumenkiso",
    filter: ["all", ["match", ["get", "カテゴリ"], ["自力建設"], true, false]],
    layout: {
      visibility: "visible",
    },
    paint: {
      "fill-color": "#AE5424",
      "fill-opacity": 1,
      "fill-outline-color": "#000000",
    },
  });

  map.addLayer({
    id: "アカデミー施設・その他建物-文字",
    source: "zumenkiso",
    type: "symbol",
    filter: ["all", ["match", ["get", "カテゴリ"], ["建物"], true, false]],
    layout: {
      visibility: "visible",
      "text-field": ["to-string", ["get", "name"]],
      "text-size": 14,
      "text-variable-anchor": ["top", "bottom", "left", "right"],
      "text-radial-offset": 0.5,
      "text-justify": "auto",
      "icon-image": [
        "case",
        [
          "match",
          ["get", "name"],
          ["森林総合教育センター(morinos)"],
          true,
          false,
        ],
        "morinos",
        "dot-11",
      ],
      "icon-size": [
        "case",
        [
          "match",
          ["get", "name"],
          ["森林総合教育センター(morinos)"],
          true,
          false,
        ],
        0.2,
        1,
      ],
    },
    paint: {
      "text-halo-color": "#000000",
      "text-halo-width": 2,
      "text-opacity": 1,
      "text-color": "#ffffff",
    },
  });

  map.addLayer({
    id: "岐阜県20万分の1表層地質-文字",
    source: "GIFU-hyousoutisitu",
    "source-layer": "GIFU-hyousoutisitu",
    filter: ["all", ["match", ["geometry-type"], ["Polygon"], true, false]],
    type: "symbol",
    layout: {
      visibility: "none",
      "text-field": ["to-string", ["get", "属性2"]],
      "text-variable-anchor": ["top", "bottom", "left", "right"],
      "text-radial-offset": 0.5,
      "text-justify": "auto",
    },
    paint: {
      "text-color": "#000000",
      "text-halo-color": "#ffffff",
      "text-opacity": 1,
      "text-halo-width": 1,
    },
  });

  map.addLayer({
    id: "岐阜県20万分の1土壌分類-文字",
    source: "gifu-201dozyo",
    type: "symbol",
    layout: {
      visibility: "none",
      "text-field": ["to-string", ["get", "属性2"]],
      "text-variable-anchor": ["top", "bottom", "left", "right"],
      "text-radial-offset": 0.5,
      "text-justify": "auto",
    },
    paint: {
      "text-color": "#000000",
      "text-halo-color": "#ffffff",
      "text-opacity": 1,
      "text-halo-width": 1,
    },
  });

  map.addLayer({
    id: "岐阜県鳥獣保護区等(H30)-文字",
    source: "H30-gifu-tyouzyuhogokutou",
    "source-layer": "H30-gifu-tyouzyuhogokutou",
    type: "symbol",
    layout: {
      visibility: "none",
      "text-field": ["to-string", ["get", "種類"]],
      "text-variable-anchor": ["top", "bottom", "left", "right"],
      "text-radial-offset": 0.5,
      "text-justify": "auto",
    },
    paint: {
      "text-color": "#000000",
      "text-halo-color": "#ffffff",
      "text-opacity": 1,
      "text-halo-width": 1,
    },
  });

  map.addLayer({
    id: "自力建設-文字",
    source: "zumenkiso",
    type: "symbol",
    filter: ["all", ["match", ["get", "カテゴリ"], ["自力建設"], true, false]],
    layout: {
      visibility: "visible",
      "text-field": ["to-string", ["get", "name"]],
      "text-size": 14,
      "text-variable-anchor": ["top", "bottom", "left", "right"],
      "text-radial-offset": 0.5,
      "text-justify": "auto",
    },
    paint: {
      "text-halo-color": "#000000",
      "text-halo-width": 2,
      "text-opacity": 1,
      "text-color": "#ef9271",
    },
  });

  map.addLayer({
    id: "等高線",
    type: "line",
    source: "japan-gsi-contour-mts",
    "source-layer": "japan-gsi-contour-mts",
    layout: {
      visibility: "none",
      "line-join": "round",
      "line-cap": "round",
    },
    paint: {
      "line-color": "#05CB63",
      "line-width": 1,
      "line-opacity": 1,
    },
  });

  map.addLayer({
    id: "等高線-標高ラベル",
    source: "japan-gsi-contour-mts",
    "source-layer": "japan-gsi-contour-mts",
    type: "symbol",
    layout: {
      visibility: "none",
      "text-field": ["to-string", ["get", "ele"]],
      "text-size": 12,
      "symbol-placement": "line",
      "symbol-spacing": 200,
    },
    paint: {
      "text-color": "#000000",
      "text-halo-color": "#FFFFFF",
      "text-opacity": 1,
      "text-halo-width": 1,
    },
  });

  map.addLayer({
    id: "標高点",
    source: "japan-gsi-elevpt-mts",
    "source-layer": "japan-gsi-elevpt-mts",
    type: "symbol",
    layout: {
      visibility: "none",
      "text-field": ["concat", ["to-string", ["get", "ele"]], "m"],
      "text-offset": [0, -1],
      "text-variable-anchor": ["top", "bottom", "left", "right"],
      "text-radial-offset": 0.5,
      "text-justify": "auto",
      "icon-image": "mountain",
    },
    paint: {
      "text-halo-color": "#000000",
      "text-halo-width": 1,
      "text-opacity": 1,
      "text-color": "#FFFFFF",
    },
  });

  map.addLayer({
    id: "その他地点",
    source: "rinnaipointosin",
    "source-layer": "rinnaipointosin",
    type: "symbol",
    layout: {
      visibility: "visible",
      "text-field": ["to-string", ["get", "名前"]],
      "text-size": 14,
      "text-offset": [0, -1],
      "text-variable-anchor": ["top", "bottom", "left", "right"],
      "text-radial-offset": 0.5,
      "text-justify": "auto",
      "icon-image": [
        "case",
        ["match", ["get", "名前"], ["山の神"], true, false],
        "monument-JP",
        ["match", ["get", "名前"], ["青樹滝", "蛇尾滝"], true, false],
        "waterfall",
        ["match", ["get", "種類"], ["岩"], true, false],
        "triangle",
        ["match", ["get", "名前"], ["トイレ"], true, false],
        "toilet",
        ["match", ["get", "名前"], ["古城山山頂"], true, false],
        "mountain",
        [
          "match",
          ["get", "名前"],
          ["車止めゲート", "国有林ゲート", "チェーンゲート"],
          true,
          false,
        ],
        "marker",
        ["match", ["get", "名前"], ["大杉"], true, false],
        "park",
        ["match", ["get", "種類"], ["駅"], true, false],
        "rail",
        ["match", ["get", "種類"], ["東屋"], true, false],
        "home",
        ["match", ["get", "名前"], ["炭焼き小屋"], true, false],
        "home",
        ["match", ["get", "種類"], ["橋"], true, false],
        "bridge",
        ["match", ["get", "種類"], ["鉄塔"], true, false],
        "鉄塔",
        "dot-11",
      ],
      "icon-size": [
        "case",
        ["match", ["get", "種類"], ["鉄塔"], true, false],
        0.05,
        1,
      ],
    },
    paint: {
      "text-halo-color": "#000000",
      "text-halo-width": 2,
      "text-opacity": 1,
      "text-color": "#99B8FF",
    },
  });

  map.addLayer({
    id: "サインポール",
    source: "ensyurin-sainpole",
    "source-layer": "ensyurin-sainpole",
    type: "symbol",
    layout: {
      visibility: "none",
      "text-field": ["to-string", ["get", "名前"]],
      "text-offset": [0, -1],
      "text-variable-anchor": ["top", "bottom", "left", "right"],
      "text-radial-offset": 0.5,
      "text-justify": "auto",
      "icon-image": "circle",
    },
    paint: {
      "text-halo-color": "#000000",
      "text-halo-width": 1,
      "text-opacity": 1,
      "text-color": "#FA4B4B",
    },
  });

  map.addLayer({
    id: "フェノロジー調査2020(統計記録密度)",
    type: "heatmap",
    source: "fenorozi-2020",
    "source-layer": "fenorozi-2020",
    layout: {
      visibility: "none",
    },
    paint: {},
  });

  map.addLayer({
    id: "フェノロジー調査2020-植物",
    type: "symbol",
    source: "fenorozi-2020-syokubutu",
    "source-layer": "fenorozi-2020-syokubutu",
    layout: {
      visibility: "none",
      "text-variable-anchor": ["top", "bottom", "left", "right"],
      "text-radial-offset": 0.5,
      "text-justify": "auto",
      "text-size": 12,
      "text-radial-offset": 1,
      "icon-image": "syokubutu",
      "icon-size": 0.05,
      "text-justify": "left",
      "text-anchor": "bottom-left",
      "text-field": [
        "to-string",
        ["concat", ["get", "日付"], "\n", ["get", "種名"], ["get", "状態"]],
      ],
    },
    paint: {
      "text-halo-color": "#FFFFFF",
      "text-halo-width": 1,
      "text-opacity": 1,
      "text-color": "#000000",
    },
  });

  map.addLayer({
    id: "フェノロジー調査2020-昆虫",
    type: "symbol",
    source: "fenorozi-2020-kontyu",
    "source-layer": "fenorozi-2020-kontyu",
    layout: {
      visibility: "none",
      "text-variable-anchor": ["top", "bottom", "left", "right"],
      "text-radial-offset": 0.5,
      "text-justify": "auto",
      "text-size": 12,
      "text-radial-offset": 1,
      "icon-image": "musi",
      "icon-size": 0.05,
      "text-justify": "left",
      "text-anchor": "bottom-left",
      "text-field": [
        "to-string",
        ["concat", ["get", "日付"], "\n", ["get", "種名"], ["get", "状態"]],
      ],
    },
    paint: {
      "text-halo-color": "#FFFFFF",
      "text-halo-width": 1,
      "text-opacity": 1,
      "text-color": "#000000",
    },
  });

  map.addLayer({
    id: "フェノロジー調査2020-菌類",
    type: "symbol",
    source: "fenorozi-2020-kinrui",
    "source-layer": "fenorozi-2020-kinrui",
    layout: {
      visibility: "none",
      "text-variable-anchor": ["top", "bottom", "left", "right"],
      "text-radial-offset": 0.5,
      "text-justify": "auto",
      "text-size": 12,
      "text-radial-offset": 1,
      "icon-image": "kinoko",
      "icon-size": 0.05,
      "text-justify": "left",
      "text-anchor": "bottom-left",
      "text-field": [
        "to-string",
        ["concat", ["get", "日付"], "\n", ["get", "種名"], ["get", "状態"]],
      ],
    },
    paint: {
      "text-halo-color": "#FFFFFF",
      "text-halo-width": 1,
      "text-opacity": 1,
      "text-color": "#000000",
    },
  });

  map.addLayer({
    id: "フェノロジー調査2020-鳥類",
    type: "symbol",
    source: "fenorozi-2020-tyourui",
    "source-layer": "fenorozi-2020-tyourui",
    layout: {
      visibility: "none",
      "text-variable-anchor": ["top", "bottom", "left", "right"],
      "text-radial-offset": 0.5,
      "text-justify": "auto",
      "text-size": 12,
      "text-radial-offset": 1,
      "icon-image": "tori",
      "icon-size": 0.05,
      "text-justify": "left",
      "text-anchor": "bottom-left",
      "text-field": [
        "to-string",
        ["concat", ["get", "日付"], "\n", ["get", "種名"], ["get", "状態"]],
      ],
    },
    paint: {
      "text-halo-color": "#FFFFFF",
      "text-halo-width": 1,
      "text-opacity": 1,
      "text-color": "#000000",
    },
  });

  map.addLayer({
    id: "フェノロジー調査2020-哺乳類",
    type: "symbol",
    source: "fenorozi-2020-honyurui",
    "source-layer": "fenorozi-2020-honyurui",
    layout: {
      visibility: "none",
      "text-variable-anchor": ["top", "bottom", "left", "right"],
      "text-radial-offset": 0.5,
      "text-justify": "auto",
      "text-size": 12,
      "text-radial-offset": 1,
      "icon-image": "honyuurui",
      "icon-size": 0.05,
      "text-justify": "left",
      "text-anchor": "bottom-left",
      "text-field": [
        "to-string",
        ["concat", ["get", "日付"], "\n", ["get", "種名"], ["get", "状態"]],
      ],
    },
    paint: {
      "text-halo-color": "#FFFFFF",
      "text-halo-width": 1,
      "text-opacity": 1,
      "text-color": "#000000",
    },
  });

  map.addLayer({
    id: "OWL-立木データ",
    type: "circle",
    source: "owl",
    "source-layer": "owl",
    layout: {
      visibility: "none",
    },
    paint: {
      "circle-stroke-width": 2,
      "circle-stroke-color": "#FFFFFF",
      "circle-color": [
        "interpolate",
        ["linear"],
        ["get", "樹高m"],
        4.1,
        "hsl(52, 93%, 85%)",
        18.7,
        "hsl(0, 79%, 57%)",
      ],
      "circle-radius": [
        "interpolate",
        ["linear"],
        ["get", "胸高直径cm"],
        7,
        5,
        42.5,
        10,
      ],
      // "circle-opacity" :0
    },
  });

  map.addLayer({
    id: "OWL-立木データ-文字",
    type: "symbol",
    source: "owl",
    "source-layer": "owl",
    layout: {
      visibility: "none",
      "text-variable-anchor": ["top", "bottom", "left", "right"],
      "text-radial-offset": 0.5,
      "text-justify": "auto",
      "text-size": 12,
      "text-radial-offset": 1,
      "text-justify": "left",
      "text-anchor": "bottom-left",
      "text-field": [
        "to-string",
        ["concat", ["get", "樹種"], "\nDBH：", ["get", "胸高直径cm"], "cm"],
      ],
    },
    paint: {
      "text-halo-color": "#FFFFFF",
      "text-halo-width": 1,
      "text-opacity": 1,
      "text-color": "#000000",
    },
  });

  map.addLayer({
    id: "アカデミー危険木調査結果(H25)",
    type: "symbol",
    source: "kikenboku",
    "source-layer": "kikenboku",
    layout: {
      visibility: "none",
      "text-variable-anchor": ["top", "bottom", "left", "right"],
      "text-radial-offset": 0.5,
      "text-justify": "auto",
      "text-size": 12,
      "text-radial-offset": 1,
      "icon-image": "caution",
      "text-justify": "left",
      "text-anchor": "bottom-left",
      "text-field": [
        "to-string",
        ["concat", ["get", "樹種"], "\n", ["get", "状態"]],
      ],
    },
    paint: {
      "text-halo-color": "#FFFFFF",
      "text-halo-width": 1,
      "text-opacity": 1,
      "text-color": "#610404",
    },
  });

  map.addLayer({
    id: "美濃市指定避難場所",
    source: "minosi-siteihinanbasyo",
    "source-layer": "minosi-siteihinanbasyo",
    type: "symbol",
    layout: {
      visibility: "none",
      "text-field": ["to-string", ["get", "名称"]],
      "text-offset": [0, -1],
      "text-variable-anchor": ["top", "bottom", "left", "right"],
      "text-radial-offset": 0.5,
      "text-justify": "auto",
      "icon-image": "siteihinanzyo",
      "icon-size": 1.5,
    },
    paint: {
      "text-halo-color": "#000000",
      "text-halo-width": 1,
      "text-opacity": 1,
      "text-color": "#FFFFFF",
    },
  });

  map.addLayer({
    id: "美濃市指定緊急避難場所",
    source: "minosi-siteikinkyuhinanbasyo",
    "source-layer": "minosi-siteikinkyuhinanbasyo",
    type: "symbol",
    layout: {
      visibility: "none",
      "text-field": ["to-string", ["get", "名称"]],
      "text-offset": [0, -1],
      "text-variable-anchor": ["top", "bottom", "left", "right"],
      "text-radial-offset": 0.5,
      "text-justify": "auto",
      "icon-image": "siteikinkyuhinanzyo",
      "icon-size": 1.5,
    },
    paint: {
      "text-halo-color": "#000000",
      "text-halo-width": 1,
      "text-opacity": 1,
      "text-color": "#FFFFFF",
    },
  });

  map.addLayer({
    id: "みんなの記録-統計密度",
    type: "heatmap",
    source: "kiroku",
    layout: {
      visibility: "none",
    },
    paint: {},
  });

  //★geojson

  map.addSource("AC1F-CAD", {
    type: "geojson",
    data: "https://raw.githubusercontent.com/satoshi7190/ensyuringis/main/geojson/AC1F-CAD.geojson",
  });
  map.addLayer({
    id: "平面図-アカデミー施設1F",
    type: "line",
    source: "AC1F-CAD",

    layout: {
      visibility: "none",
    },
    paint: {
      "line-color": "#FF8800",
      "line-width": 1,
      "line-opacity": 1,
    },
  });

  map.addSource("AC2F-CAD", {
    type: "geojson",
    data: "https://raw.githubusercontent.com/satoshi7190/ensyuringis/main/geojson/AC2F-CAD.geojson",
  });
  map.addLayer({
    id: "平面図-アカデミー施設2F",
    type: "line",
    source: "AC2F-CAD",

    layout: {
      visibility: "none",
    },
    paint: {
      "line-color": "#FFF700",
      "line-opacity": 1,
      "line-width": 1,
    },
  });

  map.addSource("ZIRIKI-CAD", {
    type: "geojson",
    data: "https://raw.githubusercontent.com/satoshi7190/ensyuringis/main/geojson/ZIRIKI-CAD.geojson",
  });
  map.addLayer({
    id: "平面図-自力建設",
    type: "line",
    source: "ZIRIKI-CAD",

    layout: {
      visibility: "none",
    },
    paint: {
      "line-color": "#00FBFF",
      "line-opacity": 1,
      "line-width": 1,
    },
  });

  map.addSource("sisetuannaitou", {
    type: "geojson",
    data: "https://raw.githubusercontent.com/satoshi7190/ensyuringis/main/geojson/sisetuannaitou.geojson",
  });
  map.addLayer({
    id: "施設案内塔",
    source: "sisetuannaitou",
    type: "symbol",
    layout: {
      visibility: "none",
      "text-field": ["to-string", ["get", "name"]],
      "text-size": 14,
      "text-variable-anchor": ["top", "bottom", "left", "right"],
      "text-radial-offset": 0.5,
      "text-justify": "auto",
      "icon-image": "monument",
      "icon-size": 1,
    },
    paint: {
      "text-halo-color": "#ffffff",
      "text-halo-width": 1,
      "text-opacity": 1,
      "text-color": "#000000",
    },
  });

  map.addSource("AC1F-CAD-TEXT", {
    type: "geojson",
    data: "https://raw.githubusercontent.com/satoshi7190/ensyuringis/main/geojson/AC1F-CAD-TEXT.geojson",
  });
  map.addLayer({
    id: "平面図-アカデミー施設1F-文字",
    source: "AC1F-CAD-TEXT",
    type: "symbol",
    layout: {
      visibility: "none",
      "text-field": ["to-string", ["get", "name"]],
      "text-size": 12,
    },
    paint: {
      "text-halo-color": "#ffffff",
      "text-halo-width": 1,
      "text-opacity": 1,
      "text-color": "#000000",
    },
  });

  map.addSource("AC2F-CAD-TEXT", {
    type: "geojson",
    data: "https://raw.githubusercontent.com/satoshi7190/ensyuringis/main/geojson/AC2F-CAD-TEXT.geojson",
  });
  map.addLayer({
    id: "平面図-アカデミー施設2F-文字",
    source: "AC2F-CAD-TEXT",
    type: "symbol",
    layout: {
      visibility: "none",
      "text-field": ["to-string", ["get", "name"]],
      "text-size": 12,
    },
    paint: {
      "text-halo-color": "#ffffff",
      "text-halo-width": 1,
      "text-opacity": 1,
      "text-color": "#000000",
    },
  });

  map.addSource("ZIRIKI-CAD-TEXT", {
    type: "geojson",
    data: "https://raw.githubusercontent.com/satoshi7190/ensyuringis/main/geojson/ZIRIKI-CAD-TEXT.geojson",
  });
  map.addLayer({
    id: "平面図-自力建設-文字",
    source: "ZIRIKI-CAD-TEXT",
    type: "symbol",
    layout: {
      visibility: "none",
      "text-field": ["to-string", ["get", "name"]],
      "text-size": 12,
    },
    paint: {
      "text-halo-color": "#ffffff",
      "text-halo-width": 1,
      "text-opacity": 1,
      "text-color": "#000000",
    },
  });

  map.addSource("SYOUKA1F-TEXT", {
    type: "geojson",
    data: "https://raw.githubusercontent.com/satoshi7190/ensyuringis/main/geojson/SYOUKA1F-TEXT.geojson",
  });
  map.addLayer({
    id: "消火器・避難器具等1F",
    source: "SYOUKA1F-TEXT",
    type: "symbol",
    layout: {
      visibility: "none",
      "text-field": ["to-string", ["get", "name"]],
      "text-size": 12,
      "text-variable-anchor": ["top", "bottom", "left", "right"],
      "text-radial-offset": 0.5,
      "text-justify": "auto",
      "icon-image": [
        "case",
        ["match", ["get", "name"], ["消火器"], true, false],
        "消火器のアイコン4",
        ["match", ["get", "名前"], ["パッケージ型消火器"], true, false],
        "消火器のアイコン4",
        "dot-11",
      ],
      "icon-size": [
        "case",
        ["match", ["get", "name"], ["消火器"], true, false],
        0.05,
        ["match", ["get", "name"], ["パッケージ型消火器"], true, false],
        0.05,
        1,
      ],
    },
    paint: {
      "text-halo-color": "#ffffff",
      "text-halo-width": 1,
      "text-opacity": 1,
      "text-color": "#000000",
    },
  });

  map.addSource("SYOUKA2F-TEXT", {
    type: "geojson",
    data: "https://raw.githubusercontent.com/satoshi7190/ensyuringis/main/geojson/SYOUKA2F-TEXT.geojson",
  });
  map.addLayer({
    id: "消火器・避難器具等2F",
    source: "SYOUKA2F-TEXT",
    type: "symbol",
    layout: {
      visibility: "none",
      "text-field": ["to-string", ["get", "name"]],
      "text-size": 12,
      "text-variable-anchor": ["top", "bottom", "left", "right"],
      "text-radial-offset": 0.5,
      "text-justify": "auto",
      "icon-image": [
        "case",
        ["match", ["get", "name"], ["消火器"], true, false],
        "消火器のアイコン4",
        ["match", ["get", "名前"], ["パッケージ型消火器"], true, false],
        "消火器のアイコン4",
        ["match", ["get", "name"], ["避難梯子"], true, false],
        "非常口のあの人のアイコン",
        "dot-11",
      ],
      "icon-size": [
        "case",
        ["match", ["get", "name"], ["消火器"], true, false],
        0.05,
        ["match", ["get", "name"], ["パッケージ型消火器"], true, false],
        0.05,
        ["match", ["get", "name"], ["避難梯子"], true, false],
        0.05,
        1,
      ],
    },
    paint: {
      "text-halo-color": "#ffffff",
      "text-halo-width": 1,
      "text-opacity": 1,
      "text-color": "#000000",
    },
  });

  map.addSource("syohusai", {
    type: "geojson",
    data: "https://raw.githubusercontent.com/satoshi7190/ensyuringis/main/geojson/syohusai.geojson",
  });
  map.addLayer({
    id: "翔楓祭2021企画",
    source: "syohusai",
    type: "symbol",
    layout: {
      visibility: "none",
      "text-field": ["to-string", ["get", "name"]],
      "text-size": 14,
      "text-variable-anchor": ["top", "bottom", "left", "right"],
      "text-radial-offset": 0.5,
      "text-justify": "auto",
      "icon-image": "翔楓祭",
      "icon-size": 0.05,
    },
    paint: {
      "text-halo-color": "#ffffff",
      "text-halo-width": 1,
      "text-opacity": 1,
      "text-color": "#000000",
    },
  });

  //GeoJSONEND

  map.addLayer({
    id: "みんなの記録(表示期限切れ)",
    source: "kiroku",
    type: "symbol",
    layout: {
      visibility: "none",
      "text-field": ["to-string", ["get", "タイトル"]],
      "text-offset": [0, -1],
      "text-variable-anchor": ["top", "bottom", "left", "right"],
      "text-radial-offset": 0.5,
      "text-justify": "auto",
      "text-size": 12,
      "icon-image": "marker-stroked",
    },
    paint: {
      "text-halo-color": "#ffffff",
      "text-halo-width": 1,
      "text-color": "#000000",
    },
  });

  map.addLayer({
    id: "みんなの記録",
    source: "kiroku",
    type: "circle",
    filter: ["match", ["get", "表示"], ["on"], true, false],
    layout: {
      visibility: "visible",
    },
    paint: {
      "circle-stroke-width": 7,
      "circle-stroke-color": "#FFFFFF",
      "circle-stroke-opacity": 0.3,
      "circle-color": [
        "match",
        ["get", "マーカーの色"],
        ["赤"],
        "#f12222",
        ["オレンジ"],
        "#f16722",
        ["青"],
        "#225df1",
        ["黄"],
        "#f1ed22",
        ["黄緑"],
        "#6ef122",
        ["緑"],
        "#00bd23",
        ["水色"],
        "#22f1e7",
        ["紫"],
        "#8322f1",
        ["ピンク"],
        "#e93598",
        "#000000",
      ],
      "circle-radius": [
        "interpolate",
        ["linear"],
        ["zoom"],
        13,
        1,
        15,
        4,
        17,
        10,
      ],
      // "circle-opacity" :0
    },
  });

  map.addLayer({
    id: "360度写真",
    type: "circle",
    source: "image360",
    "source-layer": "image360",
    layout: {
      visibility: "none",
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

  map.addLayer({
    id: "みんなの記録-文字",
    source: "kiroku",
    type: "symbol",
    filter: ["match", ["get", "表示"], ["on"], true, false],
    layout: {
      visibility: "visible",
      "text-field": ["concat", ["get", "タイトル"], "\n", ["get", "記録者"]],
      "text-size": 13,
      "text-variable-anchor": ["top", "bottom", "left", "right"],
      "text-radial-offset": 0.5,
      "text-justify": "auto",
      "text-max-width": 18,
    },
    paint: {
      "text-halo-color": "#ffffff",
      "text-halo-width": 3,
      "text-color": "#000000",
    },
  });
});

//マップが「アイドル」状態になる前にレンダリングされた最後のフレームの後。
// map.on('idle', () => {
//     //これらの2つのレイヤーがマップに追加されていない場合は、中止します
//     if (!map.getLayer('歩道') || !map.getLayer('自力建設')) {
//         return;
//     }

//ベクターレイヤー表示
//レイヤーのIDを列挙します。
const toggleableLayerIds = [
  "みんなの記録",
  "みんなの記録-文字",
  "その他地点",
  "歩道",
  "川",
  "アカデミー施設・その他建物",
  "アカデミー施設・その他建物-文字",
  "自力建設",
  "自力建設-文字",
  "未来の森づくり予定地",
  "演習林-スギ林",
  "演習林-ヒノキ林",
  "演習林-アカマツ林",
  "演習林-スラッシュマツ林",
  "演習林-広葉樹林",
  "演習林-草地",
  "演習林-その他岩石",
  "演習林-小林班境界線",
  "演習林-林班境界線",
  "演習林-山林境界線",
  "演習林-林分ラベル",
];

//各レイヤーに対応するトグルボタンを設定します。
for (const id of toggleableLayerIds) {
  //ボタンがすでに設定されているレイヤーをスキップします。
  if (document.getElementById(id)) {
    continue;
  }

  //リンクを作成します。
  const link = document.createElement("a");
  link.id = id;
  link.href = "#";
  link.textContent = id;
  link.className = "active";

  //トグルがクリックされたときにレイヤーを表示または非表示にします。
  link.onclick = function (e) {
    const clickedLayer = this.textContent;
    e.preventDefault();
    e.stopPropagation();

    const visibility = map.getLayoutProperty(clickedLayer, "visibility");

    //レイアウトオブジェクトのvisibilityプロパティを変更して、レイヤーの可視性を切り替えます。
    if (visibility === "visible") {
      map.setLayoutProperty(clickedLayer, "visibility", "visible");
      this.className = "";
    } else {
      this.className = "noactive";
      map.setLayoutProperty(clickedLayer, "visibility", "none");
    }

    if (visibility === "visible") {
      map.setLayoutProperty(clickedLayer, "visibility", "none");
      this.className = "";
    } else {
      this.className = "active";
      map.setLayoutProperty(clickedLayer, "visibility", "visible");
    }
  };

  const layers = document.getElementById("menu");
  layers.appendChild(link);
}
//ベクターレイヤー非表示
const toggleableLayerIds2 = [
  // '演習林-林班樹種別色分け',
  "みんなの記録(表示期限切れ)",
  "みんなの記録-統計密度",
  "平面図-アカデミー施設1F",
  "平面図-アカデミー施設1F-文字",
  "平面図-アカデミー施設2F",
  "平面図-アカデミー施設2F-文字",
  "平面図-自力建設",
  "平面図-自力建設-文字",
  "消火器・避難器具等1F",
  "消火器・避難器具等2F",
  "施設案内塔",
  "駐車場",
  "サインポール",
  "試験地",
  "試験地-文字",
  "アカデミー危険木調査結果(H25)",
  "プロット調査",
  "OWL-立木データ",
  "OWL-立木データ-文字",
  "フェノロジー調査2020-植物",
  "フェノロジー調査2020-昆虫",
  "フェノロジー調査2020-哺乳類",
  "フェノロジー調査2020-鳥類",
  "フェノロジー調査2020-菌類",
  "フェノロジー調査2020(統計記録密度)",
  "翔楓祭2021企画",
  "古城山国有林-林分",
  "古城山国有林-林分境界線",
  "古城山国有林-林分ラベル",
  "等高線",
  "等高線-標高ラベル",
  "標高点",
  "洪水浸水想定区域",
  "土砂災害警戒区域（土石流）",
  "土砂災害警戒区域（急傾斜地の崩壊）",
  "土砂災害警戒区域（地すべり）",
  "土石流危険渓流",
  "急傾斜地崩壊危険箇所",
  "美濃市指定避難場所",
  "美濃市指定緊急避難場所",
  "岐阜県鳥獣保護区等(H30)",
  "岐阜県鳥獣保護区等(H30)-文字",
  "岐阜県20万分の1表層地質",
  "岐阜県20万分の1表層地質-断層",
  "岐阜県20万分の1表層地質-文字",
  "岐阜県20万分の1土壌分類",
  "岐阜県20万分の1土壌分類-文字",
  "行政区画",
  // '360度写真',
];

//各レイヤーに対応するトグルボタンを設定します。
for (const id of toggleableLayerIds2) {
  //ボタンがすでに設定されているレイヤーをスキップします。
  if (document.getElementById(id)) {
    continue;
  }

  //リンクを作成します。
  const link = document.createElement("a");
  link.id = id;
  link.href = "#";
  link.textContent = id;
  link.className = "noactive";

  //トグルがクリックされたときにレイヤーを表示または非表示にします。
  link.onclick = function (e) {
    const clickedLayer = this.textContent;
    e.preventDefault();
    e.stopPropagation();

    const visibility = map.getLayoutProperty(clickedLayer, "visibility");

    //レイアウトオブジェクトのvisibilityプロパティを変更して、レイヤーの可視性を切り替えます。
    if (visibility === "visible") {
      map.setLayoutProperty(clickedLayer, "visibility", "visible");
      this.className = "";
    } else {
      this.className = "noactive";
      map.setLayoutProperty(clickedLayer, "visibility", "none");
    }

    if (visibility === "visible") {
      map.setLayoutProperty(clickedLayer, "visibility", "none");
      this.className = "";
    } else {
      this.className = "active";
      map.setLayoutProperty(clickedLayer, "visibility", "visible");
    }
  };

  const layers = document.getElementById("menu");
  layers.appendChild(link);
}
// });

//クリックイベントのプロパティからのHTML。
map.on("click", "360度写真", (e) => {
  new mapboxgl.Popup()
    .setLngLat(e.features[0].geometry.coordinates)
    .setHTML(
      "<h3><img src='https://img.icons8.com/ios-glyphs/25/ffffff/360-view.png'/> " +
        e.features[0].properties.Name +
        "</h3><iframe width='100%' height='auto' allowfullscreen style='border-style:none;' src='https://cdn.pannellum.org/2.5/pannellum.htm#panorama=" +
        e.features[0].properties.image360 +
        "&autoLoad=true&autoRotate=-8'></iframe><br>撮影日：" +
        e.features[0].properties.Timestamp
    )
    .addTo(map);
  map.flyTo({ center: e.features[0].geometry.coordinates, zoom: 18 });
  e.stopPropagation();
});

map.on("mouseenter", "360度写真", () => {
  map.getCanvas().style.cursor = "pointer";
});
map.on("mouseleave", "360度写真", () => {
  map.getCanvas().style.cursor = "";
});

map.on("click", "みんなの記録", (e) => {
  new mapboxgl.Popup()
    .setLngLat(e.features[0].geometry.coordinates)
    .setHTML(
      "<h3>" +
        e.features[0].properties.タイトル +
        "</h3>" +
        e.features[0].properties.説明 +
        "<hr>期限　：残り" +
        e.features[0].properties.残り日数 +
        "日<br>緯度　：" +
        e.features[0].properties.緯度 +
        "<br>経度　：" +
        e.features[0].properties.経度 +
        "<br>記録者：" +
        e.features[0].properties.記録者 +
        "<br>" +
        e.features[0].properties.年 +
        "年" +
        e.features[0].properties.月 +
        "月" +
        e.features[0].properties.日 +
        "日(" +
        e.features[0].properties.曜日 +
        ")" +
        e.features[0].properties.時 +
        "時" +
        e.features[0].properties.分 +
        "分に記録"
    )
    .addTo(map);
  map.flyTo({ center: e.features[0].geometry.coordinates });
  e.stopPropagation();
});
map.on("mouseenter", "みんなの記録", () => {
  map.getCanvas().style.cursor = "pointer";
});
map.on("mouseleave", "みんなの記録", () => {
  map.getCanvas().style.cursor = "";
});

map.on("click", "みんなの記録(表示期限切れ)", (e) => {
  new mapboxgl.Popup()
    .setLngLat(e.features[0].geometry.coordinates)
    .setHTML(
      "<h3>" +
        e.features[0].properties.タイトル +
        "</h3>" +
        e.features[0].properties.説明 +
        "<hr>期限　：残り" +
        e.features[0].properties.残り日数 +
        "日<br>緯度　：" +
        e.features[0].properties.緯度 +
        "<br>経度　：" +
        e.features[0].properties.経度 +
        "<br>記録者：" +
        e.features[0].properties.記録者 +
        "<br>" +
        e.features[0].properties.年 +
        "年" +
        e.features[0].properties.月 +
        "月" +
        e.features[0].properties.日 +
        "日(" +
        e.features[0].properties.曜日 +
        ")" +
        e.features[0].properties.時 +
        "時" +
        e.features[0].properties.分 +
        "分に記録"
    )
    .addTo(map);
  map.flyTo({ center: e.features[0].geometry.coordinates });
  e.stopPropagation();
});
map.on("mouseenter", "みんなの記録(表示期限切れ)", () => {
  map.getCanvas().style.cursor = "pointer";
});
map.on("mouseleave", "みんなの記録(表示期限切れ)", () => {
  map.getCanvas().style.cursor = "";
});

map.on("click", "翔楓祭2021企画", (e) => {
  new mapboxgl.Popup()
    .setLngLat(e.features[0].geometry.coordinates)
    .setHTML(
      "<div id='scroll-inner'><div id='scroll-top'><h3>" +
        e.features[0].properties.name +
        e.features[0].properties.kai +
        "</h3>" +
        e.features[0].properties.項目 +
        "<hr>" +
        e.features[0].properties.説明 +
        e.features[0].properties.写真 +
        "</div></div>"
    )
    .addTo(map);
  map.flyTo({ center: e.features[0].geometry.coordinates });
  // const script = document.createElement('script');
  //   script.src = "https://platform.twitter.com/widgets.js";
  //   document.body.appendChild(script);

  let target = document.getElementById("scroll-top");
  target.scrollIntoView(true);
  e.stopPropagation();
});
map.on("mouseenter", "翔楓祭2021企画", () => {
  map.getCanvas().style.cursor = "pointer";
});
map.on("mouseleave", "翔楓祭2021企画", () => {
  map.getCanvas().style.cursor = "";
});

map.on("click", "OWL-立木データ", (e) => {
  new mapboxgl.Popup()
    .setLngLat(e.features[0].geometry.coordinates)
    .setHTML(
      "<h3>OWL-立木データ</h3><hr>樹種：" +
        e.features[0].properties.樹種 +
        "<br>DBH：" +
        e.features[0].properties.胸高直径cm +
        "cm<br>樹高：" +
        e.features[0].properties.樹高m +
        "m<br>材積：" +
        e.features[0].properties.材積m3 +
        "m3<br>幹週：" +
        e.features[0].properties.幹周cm +
        "cm<br>樹幹半径：" +
        e.features[0].properties.樹冠半径m +
        "m<br>矢高：" +
        e.features[0].properties.矢高cm +
        "cm"
    )
    .addTo(map);
  map.flyTo({ center: e.features[0].geometry.coordinates });
  e.stopPropagation();
});
map.on("mouseenter", "OWL-立木データ", () => {
  map.getCanvas().style.cursor = "pointer";
});
map.on("mouseleave", "OWL-立木データ", () => {
  map.getCanvas().style.cursor = "";
});

map.on("click", "サインポール", (e) => {
  new mapboxgl.Popup()
    .setLngLat(e.features[0].geometry.coordinates)
    .setHTML(
      "<h3>" +
        e.features[0].properties.名前 +
        "</h3><div style='text-align: center'><a href='" +
        e.features[0].properties.image +
        "' target='_blank'rel='noopener noreferrer'><img src='" +
        e.features[0].properties.image +
        "' width='100%' height='190px'></div><style>img { object-fit: cover;}</style>"
    )
    .addTo(map);
  map.flyTo({ center: e.features[0].geometry.coordinates });
  e.stopPropagation();
});
map.on("mouseenter", "サインポール", () => {
  map.getCanvas().style.cursor = "pointer";
});
map.on("mouseleave", "サインポール", () => {
  map.getCanvas().style.cursor = "";
});

map.on("click", "その他地点", (e) => {
  new mapboxgl.Popup()
    .setLngLat(e.features[0].geometry.coordinates)
    .setHTML(
      "<h3>" +
        e.features[0].properties.名前 +
        "</h3><div style='text-align: center'><a href='" +
        e.features[0].properties.image +
        "' target='_blank'rel='noopener noreferrer'><img src='" +
        e.features[0].properties.image +
        "' width='100%' height='190px'></div><style>img { object-fit: cover;}</style>"
    )
    .addTo(map);
  map.flyTo({ center: e.features[0].geometry.coordinates });
  e.stopPropagation();
});
map.on("mouseenter", "その他地点", () => {
  map.getCanvas().style.cursor = "pointer";
});
map.on("mouseleave", "その他地点", () => {
  map.getCanvas().style.cursor = "";
});

map.on("click", "自力建設", (e) => {
  const coordinates = e.lngLat;
  new mapboxgl.Popup()
    .setLngLat(e.lngLat)
    .setHTML(
      "<div id='scroll-inner'><div id='scroll-top'><h3>" +
        e.features[0].properties.name +
        "</h3>" +
        e.features[0].properties.年度 +
        "年度自力建設<hr>建物用途：" +
        e.features[0].properties.建物用途 +
        "<br>構造規模：" +
        e.features[0].properties.構造規模 +
        "<br>建築面積：" +
        e.features[0].properties.建築面積 +
        "m2<br>床面積　：" +
        e.features[0].properties.床面積 +
        "m2<br>建物高さ：" +
        e.features[0].properties.建物高さ +
        "m<br>地盤高　：" +
        e.features[0].properties.地盤高 +
        "m<hr>" +
        e.features[0].properties.説明 +
        "<br><div style='text-align: center'><a href='" +
        e.features[0].properties.image +
        "' target='_blank'rel='noopener noreferrer'><img src='" +
        e.features[0].properties.image +
        "' width='100%' height='190px'></div></div></div><style>img { object-fit: cover;}</style>"
    )
    .addTo(map);
  let target = document.getElementById("scroll-top");
  target.scrollIntoView(true);
  // map.flyTo({ 'center': coordinates });
  e.stopPropagation();
});

map.on("mouseenter", "自力建設", () => {
  map.getCanvas().style.cursor = "pointer";
});
map.on("mouseleave", "自力建設", () => {
  map.getCanvas().style.cursor = "";
});
map.on("click", "アカデミー施設・その他建物", (e) => {
  new mapboxgl.Popup()
    .setLngLat(e.lngLat)
    .setHTML(
      "<div id='scroll-inner'><div id='scroll-top'><h3>" +
        e.features[0].properties.name +
        "</h3><hr>建物用途：" +
        e.features[0].properties.建物用途 +
        "<br>構造規模：" +
        e.features[0].properties.構造規模 +
        "<br>建築面積：" +
        e.features[0].properties.建築面積 +
        "m2<br>床面積　：" +
        e.features[0].properties.床面積 +
        "m2<br>建物高さ：" +
        e.features[0].properties.建物高さ +
        "m<br>地盤高　：" +
        e.features[0].properties.地盤高 +
        "m<hr>" +
        e.features[0].properties.説明 +
        "<br><div style='text-align: center'><a href='" +
        e.features[0].properties.image +
        "' target='_blank'rel='noopener noreferrer'><img src='" +
        e.features[0].properties.image +
        "' width='100%' height='190px'></div></div></div><style>img { object-fit: cover;}</style>"
    )
    .addTo(map);
  let target = document.getElementById("scroll-top");
  target.scrollIntoView(true);
  e.stopPropagation();
});
map.on("mouseenter", "アカデミー施設・その他建物", () => {
  map.getCanvas().style.cursor = "pointer";
});
map.on("mouseleave", "アカデミー施設・その他建物", () => {
  map.getCanvas().style.cursor = "";
});

map.on("click", "プロット調査", (e) => {
  const coordinates = e.lngLat;
  new mapboxgl.Popup()
    .setLngLat(e.lngLat)
    .setHTML(
      "<h3>プロット調査(" +
        e.features[0].properties.Name +
        ")</h3>調査日：" +
        e.features[0].properties.day +
        "<hr>" +
        e.features[0].properties.内容
    )
    .addTo(map);
  map.flyTo({ center: coordinates });
  e.stopPropagation();
});
//カーソルをポインタに変更する//マウスは演習林-林班の上にあります。
map.on("mouseenter", "プロット調査", () => {
  map.getCanvas().style.cursor = "pointer";
});
//カーソルをポインタに戻します 状態レイヤーを離れるとき。
map.on("mouseleave", "プロット調査", () => {
  map.getCanvas().style.cursor = "";
});

map.on("click", "試験地", (e) => {
  const coordinates = e.lngLat;
  new mapboxgl.Popup()
    .setLngLat(e.lngLat)
    .setHTML(
      "<h3>" +
        e.features[0].properties.活用内容 +
        "</h3><hr>活用期間：" +
        e.features[0].properties.活用期間 +
        "<br>番号：" +
        e.features[0].properties.番号
    )
    .addTo(map);
  map.flyTo({ center: coordinates });
  e.stopPropagation();
});
//カーソルをポインタに変更する//マウスは演習林-林班の上にあります。
map.on("mouseenter", "試験地", () => {
  map.getCanvas().style.cursor = "pointer";
});
//カーソルをポインタに戻します 状態レイヤーを離れるとき。
map.on("mouseleave", "試験地", () => {
  map.getCanvas().style.cursor = "";
});

map.on("click", "未来の森づくり予定地", (e) => {
  const coordinates = e.lngLat;
  new mapboxgl.Popup()
    .setLngLat(e.lngLat)
    .setHTML(
      "<h3>未来の森づくり予定地</h3><hr>面積：0.85ha<br><br><a href='https://www.forest.ac.jp/about/20th_anniversary/forest-future/' target='_blank' rel='noopener noreferrer'>詳細Webページ</a>"
    )
    .addTo(map);
  map.flyTo({ center: coordinates });
  e.stopPropagation();
});
//カーソルをポインタに変更する//マウスは演習林-林班の上にあります。
map.on("mouseenter", "未来の森づくり予定地", () => {
  map.getCanvas().style.cursor = "pointer";
});
//カーソルをポインタに戻します 状態レイヤーを離れるとき。
map.on("mouseleave", "未来の森づくり予定地", () => {
  map.getCanvas().style.cursor = "";
});

map.on("click", "演習林-スギ林", (e) => {
  new mapboxgl.Popup()
    .setLngLat(e.lngLat)
    .setHTML(
      "<h3>" +
        e.features[0].properties.樹種 +
        "林　" +
        e.features[0].properties.小林班ID +
        "</h3><hr>樹種：" +
        e.features[0].properties.樹種 +
        "<br>林齢：" +
        e.features[0].properties.林齢 +
        "年(R1年度)<br>面積：" +
        e.features[0].properties.面積 +
        "ha<br>林班：" +
        e.features[0].properties.林班 +
        "<br>小班：" +
        e.features[0].properties.小班 +
        "<br>通称：" +
        e.features[0].properties.通称
    )
    .addTo(map);
  e.stopPropagation();
});
map.on("mouseenter", "演習林-スギ林", () => {
  map.getCanvas().style.cursor = "pointer";
});
map.on("mouseleave", "演習林-スギ林", () => {
  map.getCanvas().style.cursor = "";
});

map.on("click", "演習林-ヒノキ林", (e) => {
  new mapboxgl.Popup()
    .setLngLat(e.lngLat)
    .setHTML(
      "<h3>" +
        e.features[0].properties.樹種 +
        "林　" +
        e.features[0].properties.小林班ID +
        "</h3><hr>樹種：" +
        e.features[0].properties.樹種 +
        "<br>林齢：" +
        e.features[0].properties.林齢 +
        "年(R1年度)<br>面積：" +
        e.features[0].properties.面積 +
        "ha<br>林班：" +
        e.features[0].properties.林班 +
        "<br>小班：" +
        e.features[0].properties.小班 +
        "<br>通称：" +
        e.features[0].properties.通称
    )
    .addTo(map);
  e.stopPropagation();
});
map.on("mouseenter", "演習林-ヒノキ林", () => {
  map.getCanvas().style.cursor = "pointer";
});
map.on("mouseleave", "演習林-ヒノキ林", () => {
  map.getCanvas().style.cursor = "";
});

map.on("click", "演習林-アカマツ林", (e) => {
  new mapboxgl.Popup()
    .setLngLat(e.lngLat)
    .setHTML(
      "<h3>" +
        e.features[0].properties.樹種 +
        "林　" +
        e.features[0].properties.小林班ID +
        "</h3><hr>樹種：" +
        e.features[0].properties.樹種 +
        "<br>林齢：" +
        e.features[0].properties.林齢 +
        "年(R1年度)<br>面積：" +
        e.features[0].properties.面積 +
        "ha<br>林班：" +
        e.features[0].properties.林班 +
        "<br>小班：" +
        e.features[0].properties.小班 +
        "<br>通称：" +
        e.features[0].properties.通称
    )
    .addTo(map);
  e.stopPropagation();
});
map.on("mouseenter", "演習林-アカマツ林", () => {
  map.getCanvas().style.cursor = "pointer";
});
map.on("mouseleave", "演習林-アカマツ林", () => {
  map.getCanvas().style.cursor = "";
});

map.on("click", "演習林-スラッシュマツ林", (e) => {
  new mapboxgl.Popup()
    .setLngLat(e.lngLat)
    .setHTML(
      "<h3>" +
        e.features[0].properties.樹種 +
        "林　" +
        e.features[0].properties.小林班ID +
        "</h3><hr>樹種：" +
        e.features[0].properties.樹種 +
        "<br>林齢：" +
        e.features[0].properties.林齢 +
        "年(R1年度)<br>面積：" +
        e.features[0].properties.面積 +
        "ha<br>林班：" +
        e.features[0].properties.林班 +
        "<br>小班：" +
        e.features[0].properties.小班 +
        "<br>通称：" +
        e.features[0].properties.通称
    )
    .addTo(map);
  e.stopPropagation();
});
map.on("mouseenter", "演習林-スラッシュマツ林", () => {
  map.getCanvas().style.cursor = "pointer";
});
map.on("mouseleave", "演習林-スラッシュマツ林", () => {
  map.getCanvas().style.cursor = "";
});

map.on("click", "演習林-広葉樹林", (e) => {
  new mapboxgl.Popup()
    .setLngLat(e.lngLat)
    .setHTML(
      "<h3>" +
        e.features[0].properties.樹種 +
        "林　" +
        e.features[0].properties.小林班ID +
        "</h2><hr>樹種：" +
        e.features[0].properties.樹種 +
        "<br>面積：" +
        e.features[0].properties.面積 +
        "ha<br>林班：" +
        e.features[0].properties.林班 +
        "<br>小班：" +
        e.features[0].properties.小班 +
        "<br>通称：" +
        e.features[0].properties.通称
    )
    .addTo(map);
  e.stopPropagation();
});
map.on("mouseenter", "演習林-広葉樹林", () => {
  map.getCanvas().style.cursor = "pointer";
});
map.on("mouseleave", "演習林-広葉樹林", () => {
  map.getCanvas().style.cursor = "";
});

map.on("click", "演習林-草地", (e) => {
  new mapboxgl.Popup()
    .setLngLat(e.lngLat)
    .setHTML(
      "<h3>" +
        e.features[0].properties.樹種 +
        "　" +
        e.features[0].properties.小林班ID +
        "</h3><hr>樹種：" +
        e.features[0].properties.樹種 +
        "<br>面積：" +
        e.features[0].properties.面積 +
        "ha<br>林班：" +
        e.features[0].properties.林班 +
        "<br>小班：" +
        e.features[0].properties.小班 +
        "<br>通称：" +
        e.features[0].properties.通称
    )
    .addTo(map);
  e.stopPropagation();
});
map.on("mouseenter", "演習林-草地", () => {
  map.getCanvas().style.cursor = "pointer";
});
map.on("mouseleave", "演習林-草地", () => {
  map.getCanvas().style.cursor = "";
});

map.on("click", "演習林-その他岩石", (e) => {
  new mapboxgl.Popup()
    .setLngLat(e.lngLat)
    .setHTML(
      "<h3>" +
        e.features[0].properties.樹種 +
        "　" +
        e.features[0].properties.小林班ID +
        "</h3><hr>樹種：" +
        e.features[0].properties.樹種 +
        "<br>面積：" +
        e.features[0].properties.面積 +
        "ha<br>林班：" +
        e.features[0].properties.林班 +
        "<br>小班：" +
        e.features[0].properties.小班 +
        "<br>通称：" +
        e.features[0].properties.通称
    )
    .addTo(map);
  e.stopPropagation();
});
map.on("mouseenter", "演習林-その他岩石", () => {
  map.getCanvas().style.cursor = "pointer";
});
map.on("mouseleave", "演習林-その他岩石", () => {
  map.getCanvas().style.cursor = "";
});

map.on("click", "古城山国有林-林分", (e) => {
  new mapboxgl.Popup()
    .setLngLat(e.lngLat)
    .setHTML(
      "<h3>" +
        e.features[0].properties.国有林_樹種１ +
        "林(" +
        e.features[0].properties.国有林_名前 +
        ")</h3><hr>樹種：" +
        e.features[0].properties.国有林_樹種１ +
        "<br>林齢：" +
        e.features[0].properties.国有林_最新林齢１ +
        "年(H30年度)<br>面積：" +
        e.features[0].properties.国有林_面積 +
        "ha<br>材積：" +
        e.features[0].properties.国有林_材積 +
        "m3<br>林種の細分：" +
        e.features[0].properties.国有林_林種の細分 +
        "<br>保安林：" +
        e.features[0].properties.国有林_保安林１ +
        "<br>機能類型：" +
        e.features[0].properties.国有林_機能類型
    )
    .addTo(map);
  e.stopPropagation();
});
map.on("mouseenter", "古城山国有林-林分", () => {
  map.getCanvas().style.cursor = "pointer";
});
map.on("mouseleave", "古城山国有林-林分", () => {
  map.getCanvas().style.cursor = "";
});

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
      const visibility = map.getLayoutProperty(clickedLayer, "visibility");

      // Toggle layer visibility by changing the layout object's visibility property.
      if (visibility === "none") {
        map.setLayoutProperty(clickedLayer, "visibility", "visible");

        splash("360°パノラマビュー", {
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
        homeButton.innerHTML = setoff;
        map.setLayoutProperty(clickedLayer, "visibility", "none");
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

//ローカル検索
const customData = {
  features: [
    {
      type: "Feature",
      properties: {
        title:
          "ウッドラボ<br><font size='2' color='blue'>#アカデミー施設<div hidden>#校内#うっどらぼ#",
      },
      geometry: {
        type: "Point",
        coordinates: [136.91755682229996, 35.55567864710063],
      },
    },
    {
      type: "Feature",
      properties: {
        title:
          "ウッドデッキ<br><font size='2' color='blue'>#アカデミー施設<div hidden>#校内#うっどでっき",
      },
      geometry: {
        type: "Point",
        coordinates: [136.917654722929, 35.55554335595902],
      },
    },
    {
      type: "Feature",
      properties: {
        title:
          "アカデミーセンター<br><font size='2' color='blue'>#アカデミー施設<div hidden>#校内#あかでみーせんたー",
      },
      geometry: {
        type: "Point",
        coordinates: [136.9177075267183, 35.55530914578574],
      },
    },
    {
      type: "Feature",
      properties: {
        title:
          "事務局<br><font size='2' color='blue'>#アカデミー施設<div hidden>#校内#じむきょく",
      },
      geometry: {
        type: "Point",
        coordinates: [136.91757, 35.555231],
      },
    },
    {
      type: "Feature",
      properties: {
        title:
          "学生ホール<br><font size='2' color='blue'>#アカデミー施設<div hidden>#校内#がくせいほーる",
      },
      geometry: {
        type: "Point",
        coordinates: [136.918063, 35.555473],
      },
    },
    {
      type: "Feature",
      properties: {
        title:
          "メディアラボ<br><font size='2' color='blue'>#アカデミー施設<div hidden>#校内#めでぃあらぼ",
      },
      geometry: {
        type: "Point",
        coordinates: [136.91819787025452, 35.55567210076034],
      },
    },
    {
      type: "Feature",
      properties: {
        title:
          "フォレストラボ<br><font size='2' color='blue'>#アカデミー施設<div hidden>#校内#ふぉれすとらぼ",
      },
      geometry: {
        type: "Point",
        coordinates: [136.91877052187917, 35.55581393801393],
      },
    },
    {
      type: "Feature",
      properties: {
        title:
          "車庫<br><font size='2' color='blue'>#アカデミー施設<div hidden>#校内#かまぼこ#しゃこ",
      },
      geometry: {
        type: "Point",
        coordinates: [136.9193123281002, 35.555662281248864],
      },
    },
    {
      type: "Feature",
      properties: {
        title:
          "森のコテージ<br><font size='2' color='blue'>#アカデミー施設<div hidden>#校内#もりのこてーじ",
      },
      geometry: {
        type: "Point",
        coordinates: [136.9189877808094, 35.554906175254146],
      },
    },
    {
      type: "Feature",
      properties: {
        title:
          "テクニカルセンターB<br><font size='2' color='blue'>#アカデミー施設<div hidden>#校内#テクB#てくにかるせんたーびー#てくびー",
      },
      geometry: {
        type: "Point",
        coordinates: [136.91891804337502, 35.554471929337595],
      },
    },
    {
      type: "Feature",
      properties: {
        title:
          "テクニカルセンターA<br><font size='2' color='blue'>#アカデミー施設<div hidden>#校内#テクA#てくにかるせんたーえー#てくえー",
      },
      geometry: {
        type: "Point",
        coordinates: [136.91885367035866, 35.55425589657323],
      },
    },
    {
      type: "Feature",
      properties: {
        title:
          "テクニカルグラウンド<br><font size='2' color='blue'>#アカデミー施設<div hidden>#校内#テクグラウンド#てくにかるぐらうんど#てくぐらうんど",
      },
      geometry: {
        type: "Point",
        coordinates: [136.91827699542046, 35.55452102761194],
      },
    },
    {
      type: "Feature",
      properties: {
        title:
          "林業機械学習棟<br><font size='2' color='blue'>#アカデミー施設<div hidden>#校内#りんぎょうがくしゅうとう",
      },
      geometry: {
        type: "Point",
        coordinates: [136.91788136959076, 35.55396130550181],
      },
    },
    {
      type: "Feature",
      properties: {
        title:
          "研修棟<br><font size='2' color='blue'>#アカデミー施設<div hidden>#校内#けんしゅうとう",
      },
      geometry: {
        type: "Point",
        coordinates: [136.9188804924488, 35.55376163760454],
      },
    },
    {
      type: "Feature",
      properties: {
        title:
          "加工棟<br><font size='2' color='blue'>#アカデミー施設<div hidden>#校内#かこうとう",
      },
      geometry: {
        type: "Point",
        coordinates: [136.91928952932358, 35.55364598274805],
      },
    },
    {
      type: "Feature",
      properties: {
        title:
          "製材棟<br><font size='2' color='blue'>#アカデミー施設<div hidden>#校内#せいざいとう",
      },
      geometry: {
        type: "Point",
        coordinates: [136.91912323236465, 35.55338739534273],
      },
    },
    {
      type: "Feature",
      properties: {
        title:
          "オープンラボ<br><font size='2' color='blue'>#アカデミー施設<div hidden>#校内#おーぷんらぼ",
      },
      geometry: {
        type: "Point",
        coordinates: [136.91942766308784, 35.55335520824446],
      },
    },
    {
      type: "Feature",
      properties: {
        title:
          "森の情報センター<br><font size='2' color='blue'>#アカデミー施設<div hidden>#校内#もりのじょうほうせんたー",
      },
      geometry: {
        type: "Point",
        coordinates: [136.9195148348808, 35.55415879074707],
      },
    },
    {
      type: "Feature",
      properties: {
        title:
          "森の工房<br><font size='2' color='blue'>#アカデミー施設<div hidden>#校内#もりのこうぼう",
      },
      geometry: {
        type: "Point",
        coordinates: [136.91985815763474, 35.55409659931346],
      },
    },
    {
      type: "Feature",
      properties: {
        title:
          "morinos(森林総合教育センター)<br><font size='2' color='blue'><div hidden>#校内#モリノス#もりのす",
      },
      geometry: {
        type: "Point",
        coordinates: [136.91945046186447, 35.5539918557373],
      },
    },
    {
      type: "Feature",
      properties: {
        title:
          "岐阜県森林研究所<br><font size='2' color='blue'><div hidden>#校内#もりけん#モリケン#ぎふけんしんりんけんきゅうじょ",
      },
      geometry: {
        type: "Point",
        coordinates: [136.92013710737228, 35.55341467253454],
      },
    },
    {
      type: "Feature",
      properties: {
        title:
          "木漏れ日の塔<br><font size='2' color='blue'>#自力建設 #2012年度<div hidden>#こもれびのとう#じりきけんせつ",
      },
      geometry: {
        type: "Point",
        coordinates: [136.91667571663854, 35.55547789242141],
      },
    },
    {
      type: "Feature",
      properties: {
        title:
          "Switch(スイッチ)<br><font size='2' color='blue'>#自力建設 #2005年度<div hidden>#すいっち#じりきけんせつ",
      },
      geometry: {
        type: "Point",
        coordinates: [136.9173127412796, 35.555732654387775],
      },
    },
    {
      type: "Feature",
      properties: {
        title:
          "おうらいの間<br><font size='2' color='blue'>#自力建設 #2013年度<div hidden>#おうらいのま#じりきけんせつ",
      },
      geometry: {
        type: "Point",
        coordinates: [136.91813164580242, 35.55557872942164],
      },
    },
    {
      type: "Feature",
      properties: {
        title:
          "桂の湯殿<br><font size='2' color='blue'>#自力建設 #2006年度<div hidden>#かつらのゆどの#じりきけんせつ",
      },
      geometry: {
        type: "Point",
        coordinates: [136.91808218023198, 35.55583540465632],
      },
    },
    {
      type: "Feature",
      properties: {
        title:
          "森のいちだんらく<br><font size='2' color='blue'>#自力建設 #2018年度<div hidden>#もりのいちだんらく#じりきけんせつ",
      },
      geometry: {
        type: "Point",
        coordinates: [136.91816982892152, 35.55585466405262],
      },
    },
    {
      type: "Feature",
      properties: {
        title:
          "里山獣肉学舎<br><font size='2' color='blue'>#自力建設 #2017年度<div hidden>#さとやまじゅうにくがくしゃ#じりきけんせつ",
      },
      geometry: {
        type: "Point",
        coordinates: [136.91900588572025, 35.55610088492107],
      },
    },
    {
      type: "Feature",
      properties: {
        title:
          "森湊灯台<br><font size='2' color='blue'>#自力建設 #2014年度<div hidden>#もりみなととうだい#じりきけんせつ",
      },
      geometry: {
        type: "Point",
        coordinates: [136.91816970705986, 35.55474906142526],
      },
    },
    {
      type: "Feature",
      properties: {
        title:
          "地空楼<br><font size='2' color='blue'>#自力建設 #2007年度<div hidden>#じくうろう#じりきけんせつ",
      },
      geometry: {
        type: "Point",
        coordinates: [136.91757962107658, 35.5540322256735],
      },
    },
    {
      type: "Feature",
      properties: {
        title:
          "Oasis(オアシス)<br><font size='2' color='blue'>#自力建設 #2016年度<div hidden>#おあしす#じりきけんせつ",
      },
      geometry: {
        type: "Point",
        coordinates: [136.9197817146778, 35.55395585010137],
      },
    },
    {
      type: "Feature",
      properties: {
        title:
          "活木処<br><font size='2' color='blue'>#自力建設 #2012年度<div hidden>#かっき#じりきけんせつ",
      },
      geometry: {
        type: "Point",
        coordinates: [136.91959396004677, 35.55376982072485],
      },
    },
    {
      type: "Feature",
      properties: {
        title:
          "森のインターチェンジ<br><font size='2' color='blue'>#自力建設 #2011年度<div hidden>#もりのいんたーちぇんじ#じりきけんせつ",
      },
      geometry: {
        type: "Point",
        coordinates: [136.9190702587366, 35.55432790755938],
      },
    },
    {
      type: "Feature",
      properties: {
        title:
          "こならのみち<br><font size='2' color='blue'>#自力建設 #2009年度<div hidden>#こならのみち#じりきけんせつ",
      },
      geometry: {
        type: "Point",
        coordinates: [136.91924929618835, 35.5545199365395],
      },
    },
    {
      type: "Feature",
      properties: {
        title:
          "風の円居<br><font size='2' color='blue'>#自力建設 #2014年度<div hidden>#かぜのまとい#じりきけんせつ",
      },
      geometry: {
        type: "Point",
        coordinates: [136.91916675321278, 35.55408244507302],
      },
    },
    {
      type: "Feature",
      properties: {
        title:
          "アラカシのだんだん<br><font size='2' color='blue'>#自力建設 #2010年度<div hidden>#あらかしのだんだん#じりきけんせつ",
      },
      geometry: {
        type: "Point",
        coordinates: [136.91838160157204, 35.554976003523706],
      },
    },
    {
      type: "Feature",
      properties: {
        title:
          "みさきのちゃや<br><font size='2' color='blue'>#自力建設 #2002年度<div hidden>#みさきのちゃや#じりきけんせつ",
      },
      geometry: {
        type: "Point",
        coordinates: [136.918468773365, 35.55493563406279],
      },
    },
    {
      type: "Feature",
      properties: {
        title:
          "Cobiki(こびき)<br><font size='2' color='blue'>#自力建設 #2019年度<div hidden>#こびき#じりきけんせつ",
      },
      geometry: {
        type: "Point",
        coordinates: [136.91841781139374, 35.554286446696466],
      },
    },
    {
      type: "Feature",
      properties: {
        title:
          "森の中の四寸傘<br><font size='2' color='blue'>#自力建設 #2001年度<div hidden>#もりのよんすんがさ#じりきけんせつ",
      },
      geometry: {
        type: "Point",
        coordinates: [136.92125022411344, 35.55215554768691],
      },
    },
    {
      type: "Feature",
      properties: {
        title:
          "SOMA’s Hut(ソマズハット)<br><font size='2' color='blue'>#自力建設 #2015年度<div hidden>#そまずはっと#じりきけんせつ",
      },
      geometry: {
        type: "Point",
        coordinates: [136.92328199744222, 35.55281893655326],
      },
    },
    {
      type: "Feature",
      properties: {
        title:
          "みどりのアトリエ<br><font size='2' color='blue'>#自力建設 #2020年度<div hidden>#みどりのあとりえ#じりきけんせつ",
      },
      geometry: {
        type: "Point",
        coordinates: [136.91869181260358, 35.55548240312335],
      },
    },

    {
      type: "Feature",
      properties: {
        title:
          "多目的室<br><font size='2' color='blue'><div hidden>#メディアラボ#たもくてきしつ",
      },
      geometry: {
        type: "Point",
        coordinates: [136.918321, 35.555636],
      },
    },

    {
      type: "Feature",
      properties: {
        title: "トイレ1<br><font size='2' color='blue'><div hidden>#といれ",
      },
      geometry: {
        type: "Point",
        coordinates: [136.917746, 35.555425],
      },
    },
    {
      type: "Feature",
      properties: {
        title: "トイレ2<br><font size='2' color='blue'><div hidden>#といれ",
      },
      geometry: {
        type: "Point",
        coordinates: [136.918373, 35.555828],
      },
    },
    {
      type: "Feature",
      properties: {
        title: "トイレ3<br><font size='2' color='blue'><div hidden>#といれ",
      },
      geometry: {
        type: "Point",
        coordinates: [136.919447, 35.554114],
      },
    },
    {
      type: "Feature",
      properties: {
        title: "自販機1<br><div hidden>#自動販売機#じはんき#じどうはんばいき",
      },
      geometry: {
        type: "Point",
        coordinates: [136.917768, 35.555294],
      },
    },
    {
      type: "Feature",
      properties: {
        title: "自販機2<br><div hidden>#自動販売機#じはんき#じどうはんばいき",
      },
      geometry: {
        type: "Point",
        coordinates: [136.918047, 35.555537],
      },
    },

    {
      type: "Feature",
      properties: {
        title: "ポールA<br><font size='2' color='blue'>#サインポール",
      },
      geometry: {
        type: "Point",
        coordinates: [136.919331905, 35.549763022],
      },
    },
    {
      type: "Feature",
      properties: {
        title: "ポール1<br><font size='2' color='blue'>#サインポール",
      },
      geometry: {
        type: "Point",
        coordinates: [136.9199626, 35.55146179],
      },
    },
    {
      type: "Feature",
      properties: {
        title: "ポール2<br><font size='2' color='blue'>#サインポール",
      },
      geometry: {
        type: "Point",
        coordinates: [136.921018152, 35.550305689],
      },
    },
    {
      type: "Feature",
      properties: {
        title: "ポール3<br><font size='2' color='blue'>#サインポール",
      },
      geometry: {
        type: "Point",
        coordinates: [136.92080812, 35.55288584],
      },
    },
    {
      type: "Feature",
      properties: {
        title: "ポール4<br><font size='2' color='blue'>#サインポール",
      },
      geometry: {
        type: "Point",
        coordinates: [136.92286577, 35.552951232],
      },
    },
    {
      type: "Feature",
      properties: {
        title: "ポール5<br><font size='2' color='blue'>#サインポール",
      },
      geometry: {
        type: "Point",
        coordinates: [136.9252506, 35.5547908],
      },
    },
    {
      type: "Feature",
      properties: {
        title: "ポール6<br><font size='2' color='blue'>#サインポール",
      },
      geometry: {
        type: "Point",
        coordinates: [136.92676582, 35.55783508],
      },
    },
    {
      type: "Feature",
      properties: {
        title: "蛇尾滝<br><font size='2' color='blue'>#滝#へびおたき#たき",
      },
      geometry: {
        type: "Point",
        coordinates: [136.923946, 35.552341],
      },
    },
    {
      type: "Feature",
      properties: {
        title: "青樹滝<br><font size='2' color='blue'>#滝#せいじゅたき#たき",
      },
      geometry: {
        type: "Point",
        coordinates: [136.923228, 35.549236],
      },
    },
    {
      type: "Feature",
      properties: {
        title:
          "国有林ゲート<br><font size='2' color='blue'>#ゲート#こくゆうりん#げーと",
      },
      geometry: {
        type: "Point",
        coordinates: [136.92401064646162, 35.55462075457095],
      },
    },
    {
      type: "Feature",
      properties: {
        title: "チェーンゲート<font size='2' color='blue'><br>#げーと",
      },
      geometry: {
        type: "Point",
        coordinates: [136.9200100829134, 35.551472140347826],
      },
    },
    {
      type: "Feature",
      properties: {
        title: "車止めゲート<br><font size='2' color='blue'>#げーと#くるまどめ",
      },
      geometry: {
        type: "Point",
        coordinates: [136.91950678825378, 35.55072073226808],
      },
    },
    {
      type: "Feature",
      properties: {
        title: "大杉<br><font size='2' color='blue'>#おおすぎ",
      },
      geometry: {
        type: "Point",
        coordinates: [136.92288, 35.552971],
      },
    },
    {
      type: "Feature",
      properties: {
        title: "山の神<br><font size='2' color='blue'>#やまのかみ#やまがみさま",
      },
      geometry: {
        type: "Point",
        coordinates: [136.923685, 35.55234],
      },
    },
    {
      type: "Feature",
      properties: {
        title: "馬の背岩<br><font size='2' color='blue'>#うまのせいわ#いわ",
      },
      geometry: {
        type: "Point",
        coordinates: [136.923477, 35.551817],
      },
    },
    {
      type: "Feature",
      properties: {
        title: "眺の岩<br><font size='2' color='blue'>#ながめのいわ#いわ",
      },
      geometry: {
        type: "Point",
        coordinates: [136.922616, 35.548532],
      },
    },
    {
      type: "Feature",
      properties: {
        title: "屏風岩<br><font size='2' color='blue'>#びょうぶいわ#いわ",
      },
      geometry: {
        type: "Point",
        coordinates: [136.925213, 35.548385],
      },
    },
    {
      type: "Feature",
      properties: {
        title:
          "昼飯岩<br><font size='2' color='blue'>#いるいいわ#ひるめしいわ#いわ",
      },
      geometry: {
        type: "Point",
        coordinates: [136.92308217287064, 35.55375181785905],
      },
    },
    {
      type: "Feature",
      properties: {
        title: "見晴らし岩<br><font size='2' color='blue'>#みはらしいわ#いわ",
      },
      geometry: {
        type: "Point",
        coordinates: [136.920721, 35.548931],
      },
    },
    {
      type: "Feature",
      properties: {
        title: "毛鹿洞池<br><font size='2' color='blue'>#いけ#けじかぼら",
      },
      geometry: {
        type: "Point",
        coordinates: [136.922681, 35.555474],
      },
    },
    {
      type: "Feature",
      properties: {
        title: "古城山山頂<br><font size='2' color='blue'>",
      },
      geometry: {
        type: "Point",
        coordinates: [136.931792, 35.558439],
      },
    },
    {
      type: "Feature",
      properties: {
        title: "古城山ふれあいの森管理等<br><font size='2' color='blue'>",
      },
      geometry: {
        type: "Point",
        coordinates: [136.919027, 35.548864],
      },
    },
  ],
  type: "FeatureCollection",
};

function forwardGeocoder(query) {
  const matchingFeatures = [];
  for (const feature of customData.features) {
    //大文字と小文字が異なるクエリを処理します
    // toLowerCase（）を呼び出して、ソースデータよりも。
    if (feature.properties.title.toLowerCase().includes(query.toLowerCase())) {
      // Add a tree emoji as a prefix for custom
      // data results using carmen geojson format:
      // https://github.com/mapbox/carmen/blob/master/carmen-geojson.md
      feature["place_name"] = `${feature.properties.title} `;
      feature["center"] = feature.geometry.coordinates;
      feature["place_type"] = ["park"];
      matchingFeatures.push(feature);
    }
  }
  return matchingFeatures;
}

// Add the control to the map.
const geocoder = new MapboxGeocoder({
  accessToken: mapboxgl.accessToken,
  localGeocoder: forwardGeocoder,
  // localGeocoder: coordinatesGeocoder,
  zoom: 17,
  placeholder: "アカデミー内検索",
  collapsed: true,
  limit: 30,
  mapboxgl: mapboxgl,
  bbox: [
    136.91859770217587, 35.55452735278091, 136.91862256754007, 35.5541050315276,
  ],
});
document.getElementById("geocoder").appendChild(geocoder.onAdd(map));

function massage1() {
  splash("ベースマップ", {
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

function massage2() {
  splash("ベクターレイヤー", {
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

function massage3() {
  splash("レイヤープロパティ", {
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

function massage4() {
  splash("アプリの詳細情報", {
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

function massage5() {
  splash("ラスターレイヤー", {
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

//自動リロード(みんなの記録)
function autoreload() {
  map
    .getSource("kiroku")
    .setData(
      "https://script.google.com/macros/s/AKfycbyN0LAXAFn9sfY_hplzrQWwbjEkQ4K2c1L489VT_C9YSHt4dIUVzx4qyJ712Ha1uFMs/exec"
    );
}
setInterval(autoreload, 3000);
