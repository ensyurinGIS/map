# 「演習林GIS」

岐阜県立森林文化アカデミーの演習林と学内のマップです。

## マップURL

https://ensyuringis.github.io/forest.ac/

## 目指した課題解決

森林文化アカデミーの演習林（33ha）は校舎のすぐ近くにあり、アクセスしやすい場所にあります。学校関係者以外にも林業従事者の研修で使われたり、教育施設の子供たちの遊び場や研究員の試験地としても利用される森のフィールドです。しかし、その地図情報はGISソフトが使える人しか見れなかったため、利用者への共有ができていませんでした。また、紙媒体の地図などが別にあったりして地図情報がばらけていました。これらの演習林の地図情報を、誰もが手に届きやすいWebアプリにして一つにまとめました。

## PC画面

![スクリーンショット 2022-01-23 072429](https://user-images.githubusercontent.com/84182110/159419378-daaa9b90-feca-42ff-b6f0-4c6b9666eea2.png)

## スマホ画面

<img src="https://user-images.githubusercontent.com/84182110/159421161-d7d2a2b3-b3dc-4a6d-8a09-8f282d0bb428.jpg" width="300px">

# 利用しているライブラリ、API
 - Mapbox GL JS　v2.6.0
 - Pannellum 2.5.6
 - jQuery 3.4.1
 - Mapbox Geocoding API 
 - Mapbox Static Images API
 - LINE Developers Messaging API


# 機能一覧
- 地図情報の閲覧
- 背景地図の切り替え
- ラスターレイヤー、ベクターレイヤーの重ね合わせ
- 各レイヤの地物の色、不透明度、サイズ等の変更
- クリックした地物の詳細表示
- 現在地表示
- 3D地形の表示
- 360度写真の閲覧
- 位置情報の記録とLINE通知による情報共有(Google Apps Script)
- 学内施設の場所の検索

## 位置情報記録後のLINEのトーク画面

<img src="https://user-images.githubusercontent.com/84182110/159421897-2632861b-166f-4f21-8d9d-78f753e6dcb0.jpg" width="300px">

## Google Apps Scriptのコード
- https://github.com/satoshi7190/ensyuringis-gas-geojsonAPI.git
- https://github.com/satoshi7190/ensyuringis-gas-record.git

## 連携しているGoogleスプレッドシートURL
https://docs.google.com/spreadsheets/d/1_sWTOPlUJc2vHUYhtgouy5_DfzHU-yayC_X0MGFyvgU/edit?usp=sharing

# 360度写真について
本マップの360度写真は製作者と森林文化アカデミーの19期生の学生がRICOH社の「THETA」を使用して撮影したものです。

## 2021年度撮影分（製作者）
- https://github.com/satoshi7190/image360A.git
- https://github.com/satoshi7190/image360B.git
- https://github.com/satoshi7190/image360C.git
- https://github.com/satoshi7190/image360D.git
- https://github.com/satoshi7190/image360E.git
- https://github.com/satoshi7190/image360F.git
- https://github.com/satoshi7190/image360G.git
- https://github.com/satoshi7190/image360H.git
- https://github.com/satoshi7190/image360I.git
- https://github.com/satoshi7190/image360J.git
- https://github.com/satoshi7190/image360K.git
- https://github.com/satoshi7190/image360.git

## 2020年度撮影分（19期学生）
- https://github.com/satoshi7190/image360sugimotoA.git
- https://github.com/satoshi7190/image360sugimotoB.git
- https://github.com/satoshi7190/image360sugimotoC.git
- https://github.com/satoshi7190/image360sugimotoD.git

# 出典データ
本マップは以下のデータを利用しています。これら以外にも、現地で位置情報を取得して作成したGISデータもあります。
## 岐阜県立森林文化アカデミーが所有するデータ
- 演習林林班図
- 演習林歩道図
- 岐阜県森林研究所試験地
- サインポール
- 危険木調査結果(平成25年)
- 森林環境教育専攻「フェノロジー調査2020」
- 木造建築専攻「自力建設」平面図CADデータ
- アカデミー施設の平面図CADデータ
- 森林3次元計測システム「OWL」の立木計測データ

## オープンデータ
- 国有林野(岐阜県・古城山)
- 等高線
- 標高点
- 鳥獣保護区等(岐阜県・平成30年)
- 土砂災害警戒区域イエローゾーン(美濃市)
- 土砂災害警戒区域レッドーゾーン(美濃市)
- 浸水想定区域(美濃市)
- 美濃市指定避難所
- 美濃市指定緊急避難所
- 岐阜県20万分の1表層地質図
- 岐阜県20万分の1土壌分類図
- 基本図(美濃市)

## 地図タイル
- 全国最新写真(シームレス)
- 電子国土基本図(オルソ画像)
- 空中写真(1979年頃)
- 国土地理院地図
- 国土地理院地図炎色
- 色別標高図
- 陰影起伏図
- 傾斜量図
- CS立体図(岐阜県森林研究所)
- 傾斜区分図(岐阜県森林研究所)
- 植生図(エコリス)
- シームレス地質図(産総研)
- 活断層図
- 赤色立体図(10mメッシュ)
- 白地図
- 地すべり地形分布図
- 全国傾斜量区分図(雪崩関連)
- 磁気図(偏角)/偏角一覧図
- Google Maps
- Google Satellite
- Google Satellite Hybrid
- OpenStreetMap
- Esri World Imagery
- MIERUNE Color
- MIERUNE MONO
- Stamen Toner
- Stamen Terrain
- Stamen Watercolor
# アイコン画像
本マップのアイコン画像は以下のサイトで提供されている素材を利用しています。
 - 「MAKI ICONS」
https://labs.mapbox.com/maki-icons/editor/
 - 「ICOOON MONO」
https://icooon-mono.com/
 - 「ICONS8」
https://icons8.jp/
