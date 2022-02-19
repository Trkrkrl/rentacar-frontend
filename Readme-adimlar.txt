17 Gün ödevi

(eger bu repoyu indireceksen  indirdikten sonra npm install yapmayi unutma cunku node_moudeles repoda sakalanamaz)
(sık sık ctrl + s ile kaydettiğine emin ol, yukarda sekmelerde beyaz yanan dosya olmasin)


İlk olarak dosya olusturuldu
app icerisine new folder- directives
app-icerisinde  new folder components
app icerisindeki appcomponent.html deki kodlari sildik enalttaki root haric
Component'i terminalde ac ve terminal vasitasiyla componentleri ekle
ng g component ....componentadineyse  sekline ekle
componentler:brand,car,color,customer,rental ve navi
---17.gun-1. adim sonu--
gorecegin uzere app.module icerisine ekledigin componentler otomatik import edilmis

app.component.html de <app-brand></app-brand> <app-color></app-color> bunlari yapistir, gerci cok onemli degil simdilik

componentsin terminalinde npm install bootstrap

get bootstrap sitesinden gidip navbar kodu al -->app-compponents-navi html'e at

normal htmllerde style.css dosyası link ile verilir fakt burda farkli
angular.json dosyasini bul ve 30. satirda styles'a şu konumu ekle:
"./node_modules/bootstrap/dist/css/bootstrap.min.css", üstte yazdıysan virgülü unutma

simdi bir deneyelim terminale git node varsa oraya ng serve --open yaz(proje iceriisnde oldugunua dikakt et)

css aktiflesmediyse tekrardan calistir (sık sık ctrl + s ile kaydettiğine emin ol, yukarda sekmelerde beyaz yanan dosya olmasin)


---17.gun-2.adim sonu---------------------------------------------------------------

  