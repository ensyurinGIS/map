# 「演習林 GIS」

岐阜県立森林文化アカデミーの演習林と学内のマップです。

## 一般公開用マップ URL

https://ensyuringis.github.io/forest.ac/

## 目指した課題解決

森林文化アカデミーの演習林（33ha）は校舎のすぐ近くにあり、アクセスしやすい場所にあります。学校関係者以外にも林業従事者の研修で使われたり、教育施設の子供たちの遊び場や研究員の試験地としても利用される森のフィールドです。しかし、その地図情報は GIS ソフトが使える人しか見れなかったため、利用者への共有ができていませんでした。また、紙媒体の地図などが別にあったりして地図情報がばらけていました。これらの演習林の地図情報を、誰もが手に届きやすい Web アプリにして一つにまとめました。

![OGP画像](https://user-images.githubusercontent.com/84182110/166143648-f5fd94d5-51ed-4e56-9d4e-92eafc9c0220.jpg)

# 利用しているライブラリ、API

-   Mapbox GL JS 　 v2.6.0
-   Pannellum 2.5.6
-   jQuery 3.4.1
-   Mapbox Geocoding API

# 機能一覧

-   地図情報の閲覧
-   背景地図の切り替え
-   ラスターレイヤー、ベクターレイヤーの重ね合わせ
-   各レイヤの地物の色、不透明度、サイズ等の変更
-   クリックした地物の詳細表示
-   現在地表示
-   3D 地形の表示
-   360 度写真の閲覧
-   学内施設の場所の検索

# 360 度写真について

本マップの 360 度写真は製作者と森林文化アカデミーの 19 期生の学生が RICOH 社の「THETA」を使用して撮影したものです。

## 2021 年度撮影分（製作者）

-   https://github.com/ensyurinGIS/image360A.git
-   https://github.com/ensyurinGIS/image360B.git
-   https://github.com/ensyurinGIS/image360C.git
-   https://github.com/ensyurinGIS/image360D.git
-   https://github.com/ensyurinGIS/image360E.git
-   https://github.com/ensyurinGIS/image360F.git
-   https://github.com/ensyurinGIS/image360G.git
-   https://github.com/ensyurinGIS/image360H.git
-   https://github.com/ensyurinGIS/image360I.git
-   https://github.com/ensyurinGIS/image360J.git
-   https://github.com/ensyurinGIS/image360K.git
-   https://github.com/ensyurinGIS/image360.git

## 2020 年度撮影分（19 期学生）

-   https://github.com/ensyurinGIS/image360sugimotoA.git
-   https://github.com/ensyurinGIS/image360sugimotoB.git
-   https://github.com/ensyurinGIS/image360sugimotoC.git
-   https://github.com/ensyurinGIS/image360sugimotoD.git

# 出典データ

本マップは以下のデータを利用しています。これら以外にも、現地で位置情報を取得して作成した GIS データもあります。

## 岐阜県立森林文化アカデミーが所有するデータ

-   演習林林班図
-   演習林歩道図
-   岐阜県森林研究所試験地
-   サインポール
-   危険木調査結果(平成 25 年)
-   森林環境教育専攻「フェノロジー調査 2020」
-   木造建築専攻「自力建設」平面図 CAD データ
-   森林 3 次元計測システム「OWL」の立木計測データ

## オープンデータ

-   国有林野(岐阜県・古城山)
-   等高線
-   標高点
-   鳥獣保護区等(岐阜県・平成 30 年)
-   美濃市指定避難所
-   美濃市指定緊急避難所
-   岐阜県 20 万分の 1 表層地質図
-   岐阜県 20 万分の 1 土壌分類図
-   森林基本図(美濃市)

## 地図タイル

-   全国最新写真(シームレス)
-   電子国土基本図(オルソ画像)
-   空中写真(1979 年頃)
-   国土地理院標準地図
-   国土地理院淡色地図
-   国土地理院白地図
-   色別標高図
-   陰影起伏図
-   傾斜量図
-   CS 立体図(岐阜県森林研究所)
-   傾斜区分図(岐阜県森林研究所)
-   植生図(エコリス)
-   シームレス地質図(産総研)
-   活断層図
-   赤色立体図(10m メッシュ)
-   地すべり地形分布図
-   全国傾斜量区分図(雪崩関連)
-   岐阜県共有空間データ（Q 地図タイル）
-   Mapbox Streets
-   Mapbox Dark
-   Mapbox Satelite
-   OpenStreetMap
-   Esri World Street
-   Esri World Imagery
-   Stamen Toner
-   Stamen Terrain
-   Stamen Watercolor

## ハザードマップポータルサイト

-   洪水浸水想定区域
-   土砂災害警戒区域（土石流）
-   土砂災害警戒区域（急傾斜地の崩壊）
-   土石流危険渓流
-   急傾斜地崩壊危険箇所

# アイコン画像

本マップのアイコン画像は以下のサイトで提供されている素材を利用しています。

-   「MAKI ICONS」
    https://labs.mapbox.com/maki-icons/editor/
-   「ICOOON MONO」
    https://icooon-mono.com/
-   「ICONS8」
    https://icons8.jp/
