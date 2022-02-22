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
3. adim
brand ve colorlarin listelenmesi lazim 
appcomponent.html'de .container yaz 
sonra icerisine .col-md-3 ve .col-md-9 yaz -->brand ve color u 3 icerisine ,  router i 9  icerisine al


---
brand comp-html-markalari listeleyecek
ul>li(ul class listgroup olacak) id ve marka gosterecek
ayni sekilde color a yap
fakat {{burada}} yazan nesneyi okuyamaz
--
app icerisinde models klasoru acalim
ierisine brand.ts ve color.ts
brand.ts--> icerisindeki kodlari yaz
color.ts--> icerisindeki kodlari yaz

  
components brancomponent.ts --> gerekli yere brands:Brand[] = [];
color a da aynisi
------------
Rota degistirildi-once tum nesnelerin(componentlerimizin) component html ve ts lerini ayarlayalim
        NOT:....component.html- ts deki koda bağli --  ts deki getler  servislere bağlı- services olusturalim
                app icesrisine new folder services-sağ tik open integrated terminal 
                terminale- ng g service brand sirayla car color customer rental 
                her bir service icerisine :-->private httpclient ve üstte de importu, apiurl
                get mothudlarini yaz( burada aciklayamam gidip bak)
                get methodlari observable ister: yani subscribe olunabilir bir response model dönnmeli
                ama tek tek şu veya bu response model yazilmaz- generic bir yapi olsun bir üst seviye
                diğer  öğrenciler listresponsemodel<T> seklinde bir sey yapmis bakalim      
                app/models icerisine listRespnseModel.ts-bu da normal responsemodel istiyor
                response mpdeli yaptik
                listresponsemodeli yaptik
                servicelerin kodlarini yaz -get methodlarini yaz
                    methodali yazabilmek için modellerin tam olmalı: car brand customer rental color
                servicelerdeki getler tamamlandi
                bunlari ...compent.ts de  yerlestir
                ..component.ts lerdeki getleri icerisini doldur(subscribe response vs)-tamam
                ..component.htmle'geri döndük-->ng for ve ng if leri unutma
                htmller de tamam
    
    app.module.ts e import { HttpClientModule } from '@angular/common/http'; ve imports icerisine HttpClientModule ekle
    simdi geldik cors -->backennde ilgili yerlere
    services.AddCors();
    app.UseCors(builder=>builder.WithOrigins("http://localhost:4200").AllowAnyHeader().AllowAnyMethod());
    --
    backendde  carid gibi property isimlendirmeleri düzeltildi ve sql de dahil olmak üzere camel case yapildi----
    frontend karsiliklari modelde, component html de duzeltildi
    --
    frontendde carname ve brand name istiyor- BU SUREC DTO ile yapilacak
    ---> Backendde cardetailsdto vardı-oraya gerekli prop'leri ekle k
    ---> EfCarDal da bunlari joinle(backend kodlarima bak)
    ---> frontendde dtodaki ozelliklerin oldugu bir CarDetails model oluştur
    ---> Service(carService)'te bazi methodlar olusturacagiz:
                                -get cars , getcarsbybrandid, get cars by color id , getcardetailsbyCarid
                                -get carcardetailbycolorandbrandid , 
                                - bu methodlarda apiden gelecek datayi karsilayacak model cardetail
                                -(bu methodalirin backendde api karsiliklari var -  backend dosymaa bak)
    ---> servicedeki kodlari  car.components.ts de cagiracaz, sadece getdetailsbycarid 'yi cardetail.components.ts 'de cagiracaz, 
    ---> components icerisinde 
                                ng on init icerisinde:
                                - if else yapisiyla gelen veriye gore methodu sec ve calistiri diyeccez
                    sonra da methodlair asagi yazacaz ney neye esitlenecek vericez
                    car components. ts de car:car[] olan kismi degistir->car:cardetails[]
    --------------car tablosu tamamlandi 3. adim sonu-----------------------------------------------

    











  