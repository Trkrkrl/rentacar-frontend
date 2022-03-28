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
4.adim-
sira rental tablosunda
bu da iç içe verilerden olustugundan bir  backennderental dto lazim olacak
                                        frontendde bir rentaldetails model lazim ol
                                        service de bu renladetailsi get edecek method olmali
                                        rental.componen.tts de datayi cekip-eslemek gerekli (array olarak rentals kısmı va roraya dikkat et adi ayni olsun html ile)
                                        
backendde ef..dal dosyalairnda joinler dogru yapildi ise duzgun calisiyor artik

---- 4. adim sonu----------------17.gun odevi sonu------------------------------------------------

18.gun

APP.component.html' gel --> car rental ve customer kısımlarını kaldır, bunlar değişken olacağından routeri at oraya
Route lar app.routing module da array olarak hazır olarak geliiyor
            app.component html'deki route olan yere nelerin gelmesi gerekiyorsa onların path'lerini eklemeliyiz
            bunları ihtiyaç oldukça ödeev boyunca da ekleyeceğiz
            öncelikli olarak car componentler eklenecek :çünkü car göstermemiz isteniyor: detayları orada yazayim
            path'leri eklerken görmeyebilir, yukariya manuel olarak import girmen gerekbilir:yinede büyük küçük harfi doğru yaptığına didkkat et
            ilk asama için 5 tane yaptik.

brand ve color comp html'lere gel:
            setCurrent brand veya color islemlerri yapacaz
            routerlinkini unutma az onceki pathlerine uygun olsun
            unutmadan set ettik -delete veya clear current de yapalim

set methodlarini brand ve color comp.tss e girecez
            currentBrand:Brand dedğimizde kızdı:newlenmek istiyor fakat gerek yok
            tsconfig.json'a gel-8.satirdaki strict'in altina yazdigim seyi yaz
            brand.comp.ts e gel-setcurrentbrand e yazdigim seyi yaz ve currentimiz artik hazir
            color'a da ayni seyi yap
            sonra hem brand hem color comp ts e asagiya clear methodlarini yaz
            this.currentColor=undefined; burada undefined is not assignable diyecek: ts de yukaride curenti tanimladigin yere ? koy

sectigimizi mavi göstersin    
            comp.ts'e gel
            getcurrentbrandclass yazacagiz
            if else ile secili ise istenilen css tipini verecek
            bunlari html tarafini uygulayalim [class] ile

            bir de clear'a yapalım bunu:getallbrandclass ve getallcolorclass
            html tarafını da yapalım
brand ve color seçimleri için htmlde router link vereli -verdiysen np

simdi bu datayi backendden nasil cekecegiz: ipucu brand ve color ile ugrassan da cektigin car datası
intensional programming teknigi ile once apiden baslarsin getlerini yazarsin gerekli yerlere(service manaager ve dal) 

YANİ GİT BACKEND NOTLAİRMA BAK 
--
daha  onceden yazmisim get methodlarini apiye-
car.service'de getleri karsilayan methodlari ben yazmisitm onceki odevde-sen yazmadiysan yaz
carcomp.ts de ctor içerisine  activatedRoute yaz yazmadiysan

----error-ekran calisiyor ama secime gore vermiyor 
                potansiyel hata sebepleri:
                    app-routingde eksik path? degistirildi
                color id leri sifir oalrak cekiyor api

--- backendde biraz Duzeltme gerekliydi- ıcardal,efcardal duzeltildi, 
color ve brand gibi değerlere gore filtereleme yapabilmesi için efcardala expressions fun yazıldı detay backendde

18 odev 1. adim sonu: color ve brand e gore listeliyor----------

2. adim
 once bi jquerry yukleyelim kalmasın arada: npm install jquerry  terminalde calistir bunu
 -------------------------------

 3.adim: Hadi biraz guzel birsey yapmayi deneyelim

 ana ekranda araba isimlerini ul -li yapisiyla gosteriyoruz bunu card yapilari icerisinde listeleyelim
                                    card yapisindan kasit : kucuk bir araba resmi altinda birkac ozellik ve  incele butonu
                                    butona basinca o arabaya ait guzel bir detay sayfasına gitsin, orada buyuk gorseller olsun, ilerde eklenecek sepete ekle olsun
                                    
                                    card yapsini normal car.comp.html'de yapabilriiz sanirim
                                    detay sayfasini da Cardetails olustururuz

                                    getboostrap sitesinden kitchen sink adli cardi sectim sablon oalrak
                                    gereksiz yerleri temizledim
                                    .container 
                                    bununnicerisine .row 
                                    bunun icerisine bir div classı col-md-4 olsun-containeri 3 e bolsun diye
                                    img yi suzeltelim ve srscyibir fonksiyona bağlayalım:detayını sonra yaparız htmli yapak şimsi
                                    card body var altta:ilk olan- burda bir tane title icerisine marka ve modeli iliştirelim
                                    ul li yapisiyla ozellikleri yazalim
                                    
                                    altina da  boostrapten sececeğiniz bir button: bu bizi ilerde detay sayfasina goturecek
                                    buna ve resime routing verelim-approuting modelue de ekleyelim

                                    cardda resimlerim gozukmesi için car comp ts deki cars:cardetail[] i değiştim
                                                                     car comp htmle *ngfor cardetails of cardetails olara degistim ,
                                                                     sonucta cardetailsten  alacaz herseyi
                                                                     html deki uzantilarin duzenledin  car-->cardetaisl
                                                                     img 'nin src fonksiyonunu yazdim: şik olsuk diye  if yapili yapitm ?:?

                                                !!!!!!!!!!!!!!!!!!    imageUrl yi doğru yazdığına emin ol

                                     card kısmı çalışıyor: görsel detaylar sonraya

                
--CARDETAILS: yani araç detayına tıklayınca açılan sayfa
            cardetails.comp.html e gidelim
            boostrapten aldigimiz bir carouseli yapsitiralim sablon olarak (carousel: sağa ve sola doğru akyan resim kutusu)7

            tabi calisitirabilmek için cardetails.ts e gel

            burada secilmis olan arabanin bilgilieri yani car details olacak
            car detailsin cekilmesi lazim
                                     activated route lazim -ctor
                                     getcardetailsbycarid methodu lazim
                                     carDetail:CarDetail; tanimla detail için
                                     carservice ve cardetailserviceyi cagir
                                     private lerini unutmma
            carimages in cekilmesi lazim 
                                    getImagesByCarId lazim
                                    bu carimageservices e bagli onu cagiralim ctorda
                                    private lerini unutmma
                                    carimagepathleri getirecek bu
                                    
                                    ts de yukarida :
                                    cars: CarDetails[] = [];
                                            carImagePaths:string[] = [];
                                            carDetail: CarDetails;
                                    ; tanimla- bize imagepaths lazim - resmin konumlarını string listesi olarak verecek
                                    imageUrl: buraya da eklenecek
            carimages htmle gel 
                            caorusel e *ngFor="let imagePath of carImagePaths" ekle-
                            asagida src --> <img [src]="imageUrl+imagePath"  seklinde ekle
                            --arada iki tane şey yükeldim appmodule ve package json a - ngx bootstrap hariç önemseme  deneme yaptim--

                    

                            ng add ngx-bootstrap  --component carousel yukledim

                            ANGULAR NORMAL CAROUSEL İLE CALİSMADI ANGULAR CAROUSEL YAZDIK VE BİR ÜST SATIRDAKİ KODU YUKLEDİK
                            BUNUN SAYFASINDAKİ BİR CAROUSELİ ALDIM VE DUZENLEDİM CALİSİYOR ARTİK
                            kaynak:  https://valor-software.com/ngx-bootstrap/#/components/carousel?tab=overview
                            görselin boytu sabit kalması için birakç ufak düzenleme yaptım
-----------------------18.gun odev sonu--------------------------------------------------- 
18.gun duzeltmesi: jquery i yanlis yuklemisim jquerry değil jquery
------------------------------
19. gun
Bizden filtreleme yapabilmemizi istiyor,
            pipe olusturacagiz :marka ve renge göre demiş ,brand color ve car için yapalım
                                önce pipe açalim pipes klasoruac-dogru yerte actigindan emin ol
                                sag tik terminale ng g pipe carFilter
                                sag tik terminale ng g pipe colorFilter
                                sag tik terminale ng g pipe brandFilter
                                herbir pipe içerisinde ..fiilter mevcut
                                bu ...filterler  ilgili comp ts ve htmllerde kullanılıyor

                                bu filterler ngmodel (banana) ile kullanılacak
                                ngmodel için app.module.ts e FORMSMODULE implementasyonu gerekiyor
                                import et  ve asagida mports icerisine yaz


                colorPipe a gidelim;
                           1- veri tipimiz Color[] olacak
                           2- args kismi colorfilter:string 
                           3- bunları car ts deyazalim -colorid ts de number dedik neden?

                           4- color html e gel

                           5-bootstrapten bişeyler bulalım text aramalı bişey olsun
                           6-gerekli yerler idüzelt id ,labelfor vs
                           7-ngmodel'e colorfilteri yaz

                           8-pipe kodunu yaz
                                            (pipe kodu tamamı anlatımı:
                                            value: değer tipii  burada Color[]
                                            arama stringimiz  colorFilter:string deserteki örnekteki filtertext gibi 
                                            dönüşmtipimiz de Color[]
                                            sonra süslü parantez içerisine colorFilter i tanımlıyoruz,
                                                 eğer içerisinde birşey varsa bunları locallwercase ile tarayıcıya uygun şekilde küçük harfe çevir
                                                 içi boşsa da "" şeklinde boş
                                            sonra 
                                                return eğer colorFilter var ise javascripte özgü filter fonksiyonunu kullan
                                                     ((c:Color)=>c.colorName.toLocaleLowerCase().indexOf(colorFilter)!==1):value;)
                                                    c#taki lambda ve foreach gibi içini dolaşıyor colorname leri 
                                                    bir string fonksiyonu olan indexof ile tarıyor bu colorFilter ieçriğine sahip bir string var ise onun  indexini veriyor
                                                    var mı diye kontrol ediyor yani -1 den farklı mı diye kontrol sağlıyoz
                          
                           9-color html de | colorpipe|colorfilter iyaz 
                                    filterelem aracında color filterleri ve ngmodeli yazmıştık
                                    aşağıdaki renkelrin listelendiği ksımda
                                    *ngFor="let color of colors|colorPipe:colorFilter" yazdik

                          
                brand pipe ; 
                            color pipe daki ilk 9 adimin aynisi  brande de uygula

//-------------------19.gün -adim 1 sonu-brand ve color: sol ekranndaki kısımımın araması çalışıyor

                    ekranın yukarısında bir aramatext kutusu ve hemen altında ise barnd ve color seçme kutuları olsun

                    car html e gel-
                            seçmeli kutular için bootstrapten forms select kodunu al yapıştır
                            bundan 2 tane olacak ve yan yana olmalı ve bir tane de filtrele butonu olsa 
                            3 element olacak 12/3 =4 col-md-4 yapalım herbirine (sonradan farkettim buton az daha küçük olsun)
                            .row içerisine al select elemanını ve bir tane de kapyala yapıştır yap diğer column a
                            bir tane buton ekle son columna

                            Brand selector ü yapalım:
                                            1 yazan yani optionlarımızın listeleneciğioptional 
                                            önce *ngFor="let brand of brands" yazalım
                                            bunun çalışması için car.comp.ts de yutakrda  brands=Brand[] yazmiistik
                                            oradaki brands e ise 
                                            brande ve renkleri cekip atamamız lazim-carcomp.ts de get allbrand methodunu göreiblirisn
                                            this.getAllBrands();
                                            this.getAllColors(); bunları ngonitiçerisinde çağırmayı sakın unutma


                                            bunun value si atık bir fonskiyon=> [value]="brand.brandId"
                                            getSelectedBrand() lazim 

                                                getSelectedBrand ve get getSelectedColor methodlarini car.comp.ts de tanimlayalim
                                             getSelectedBrandiçeirisine brand.brandıd
                                             yaznın gözükeceği yere de {{brand.brandName}} yazalim
                                            şimdi select elemanımızın ng modelini ayarlayalım [(ngModel)]="brandFilter"

                                            tamamdır , brand çalışıyor aynısını color için de yapalım

                                            şimdi butona gelelim

                            DİKKAT APPROUTİNG MODULEN DE  / ekksikiliği yanlışıkla boşluk vs olmasın uğraştırır
                            car comp ts , app routing ,weabpi ve htmldeki btuon yerinde color ve brandin sıasına dikkat et

19. gün 2. adim tamamlandi(ödevdeki ilk 4 madde)
//------------------------------------------------------
Ekstra : üst arama çubuğu
carfilter pipe ılusturalim
caar ts de carDetailFilter:string=''
html de arama çubuğu:ng modeli yap,[ngModelOptions]="{ standalone: true } bu önemli bu olmazsa çalışmaz
altla arabaları listeleyen yere  | ile pipe ekleyelim

19. gün ekstra(3.adim)
//-----------------------------------

rental comp yapalım
    bunun için rental service lazım 
        rental service customer bilgisi isteyecek customer serviceye gdelim
                        get customers by user id methodunu yapalim-burada respnse model yerine 21.derste nalatilan single response model koyalim
                                                bunun için model klsaöründe simgleresponsemodel oluşturalim
                        getcustomerbyuserid yi tamamlayalim
        rental comp daki getcustomerdetails ve get rentandetailsi yazdık
        add rental methodu yapalım:
                        payment service gerekli payment serviceyi yapalım
        rent comp da tamam, üstteki nesnelerde skıntı çıkabilir

        rental html i yaptık-burada en altta payment a yönlendirmesini yapıcaz
        paymentta da input şeklinde kullaıcı bilgilerini vs çekecek burdan

payment html i yaptık
payment com ts i ayarlayalım-input,

-
cardetails te  button ve modal ı çağıran ksımınları yaptım düzelltim
        rental html i  çağırıyor ok
        tarih seçebiliyom ok
        tarih seçince total i hesaplıyor ok
        Giriş işlemni yapmadığımdan şimdilik user bilgisi almıyor
rentalda geçici bir customer id ile işlem yapalı sonra düzelt unutma
    hata verdi borıwseranimatonmodule
    appmodule de ekledim
   !!! şimdi de bu customere ait card ile ilgili hata verdi

    fake custmoreId si olmasına rağmen hem paymenti açarken hem pay e basinca customer ıd hatası veriyor
    auth service yi  ayarlayalim-  onceden sadece user nsensei eklemiştik boş duruyordu

                 21.gün ders notlarına göre y
                 bize token lazim olacak-  bir token model oluşturalim

                 auth servicede apiurl ekle, ctor a ttp client ekle

                        Login method oluştur:ama öncesinde login model LAZIM
                                //login methodu çalışınca login modelde tanımlı bilgileri içerisindeki
                                apiıurl ye gönderecek ve dönüş olarak token model tipinde bir dönüş alacak
                 
                 login comp ts e gel:auth service inject et
                 önce addloginform-gerekli form importlarını yap
                 auth service inject e et
                 add form methodu tamam

                 login methodu yapalım-şimdilik northwinddeki basit versiyonu koydum
                 Login modal halindeydi zaten iki adet buton açılan sayfa yapmıştık
                 form ekledik oraya
                 
                 -bunun çalışması için local storage ,token , ve interceptorların yapılamsı lazım
                 src app klasöründe interceptors klasörü oluştur,
                 sağ tık integrated terminal ng g interceptor auth
                 interceptor ts e ders dosyasındaki kodu gir
                 tabi bunun çalışması için app module a git-altta providerstaki htttp li şeyi gir ve gerekli ksıkımları çöz: bu interceporto tüm serviceler için yapmış oluyoz
                 loginde dönüş alamıyoz?- console log deyince token geldi-tokeni alabiliyoruz yani
                 dursun şimdilik

                 payment a geçelim


                 



     Payment ta ki hataya geri gelelim- 
     payment compts de geçici oalrak kullanıcı custoemrıd vemiştim
     geri alldım onları
     bakalım ne ahta verecek
     kullanıcı bilgileirine ulaşamıypr
     auth service de user bilgilerini get edecek bir method gerekl,



     Cannot read properties of undefined (reading 'customerId')
      formGroup expects a FormGroup instance. Please pass one in.
      Cannot read properties of undefined (reading 'get') formla alakalı bu 3 hatayı veriyor
      ilkine ben de anlamadım

      paymentadd methodda customer id yi getiremiyorr-bu auth service e bağlı-bu da getcustomer by id ye bağlı-bu method da customer seviceye bağlı
       methodu getby user id olarak düzeltelim -backendde bununn karşılığını yazalım-orada getbyuser id yoktu -custoemr controlelrde
    backend çalışıyor
    customer service tarafında url yi de düzelttim

    auth service ye custımer id gelimyor- muhtemelen user id gönderemiyor
    user idyi kimin göndermesi gerekiyordu

    auth servicede user bilgilierini token aracılığı ile çekecek bir method gerekiyor
    bunu kübra hocadaki koddan direkt almalı mıyım
    evet bir deneyelim

                            token çözmek için decodedToken adinda bir method yazicaz
                            bu method  jwthelper sayesinde tokeni çözecek
                            bunun için npm install @auth0/angular-jwt-zaten var olabilir önce alttaki adımı yap
                            sonra auth service deyiz tekrar ctora jwthelper:jwthelperservice ekleyelim ve çözelim-import yani
                            tabi appmmodule de jwt helper eklemek gerekiyor yoksa çalışmaz

                            Local storage service ye ihtiyacimiz var-service terminal-ng g service LocalStorage ile 
                            local storage service de bir takım methodlar gerekecek: get - save and  remove

                            şimdi auth servicedeki işlemlere devamedebliriz
                            getuser i yaptık-açılaması oarada var

                            tabiki bu get user i login de de kullanalım ki giriş yapınca kayıt olsun bu bilgiler

yine customer id çekemedik
login methodunu tam yapalım, buradaki token ve get user işlmeleri hallounca çalışabilir
login com ts te     
        localstorageservice yi import et ctora,
        login methodunu yap

        Isloggedin i cardetails teki is authentacted e bağladım, araç detay sayfasında  , giriş yapılı ise rent,değilse login butonu oalaacak
        bunu yaptığım içi rent e basınca gelen customerid ve form hataları gitti

        şimdi get CARDS by id hatası var https://localhost:44396/api/Cards/getcardsbycustomerid?customerId=3006 500
        Bunun sebebi  backenndde card managerede bişeey yapmamış olmamız
        onu yaptık

    cardetailde takvimde seçip rent deyince hata variyor yine(login yaptıtan bir süre sonra okuyo)
    locallsotragedaki tokeni silip tekrar giriş  ypaınca sıkıntı yok
    kartlar listelendi ve geldi--------
    sıra pay e basınca çalışmasındsa

    backendde payment add patlıyor : ya frontenddden gönderilen şey uymuyor,-
    breakpointten bakınca  
    cardnumber ve customer id geliyor
    ama tutar  yok

    -sıfırdan login yapıp fiyat da ekranda gözükürken ödeyince :yine hata veriyor ama price ı breakpoinnte gösteriyor
    sqldeki tutar türünü decimal yaptım eşledim yain entitiesdekiyle
    paymentmanagerde paymentdal ctor lamamisim ondam oldu

    payment yaptik-payment tablosuna eklendi ama rent degismedi
                    paymeenti ekleyip rent eklememe problemi backend kaynakli idi cozuldu simdi
    
                            
19.Gun odevi sonu :
-----------------------------
Backend Custom Error Middleware ekleyip fluent validation için refactoring yapınız. diyor
hocanın repodan core exceptions middlewareexceptipn
tamamdir

sirada
Reactive Forms kullanarak Brand, Color, Car Ekleme sayfalarını oluşturunuz.
components içerisinde bir admin klasörü  yapalim
                        add işlemleri için de bir klasör yapalim
                                    add içersinde terminal ile brandAdd carAdd ve colorAdd comp ekleyelim
                        bu ekle sil işlemlerinin htmllerini çağıracağı  vs işler ypıalcak bir cardetailemanage comp yapalim
                        buranin html inin esra hocadan aldim- duzenleyelim kendimize gore
                        burada car,brand ve color ekleme  ve bunlarin modallari mevcut

                        bunlarin ekle sil islemleri için get yapmak gerekiyor
                                    methodlari eklerken color ve brand servicede eksik olan add delete update aaraçlarini yazdik
                                    car için de yapalim

                                    cardetail man comp ts deki getcarupdate remove car i düzenledim-nesnesi yanlis idi ve html hata veriyordu

                                    cardetails modele findex girilecek-sadece modele girdim backendde islem yapmadim

                                    Acaba bu admin panelini nasıl açacaz
                                            direkt rotuing e mi ekleyecez
                                            herhangibiryerden basılıp admine gidilemeyecekmi
                                            bir deneyelim
                                                    cardetailmanage, carr add, color add ve brandadd i routinge ekleyelim
                                                    tamaaaam: admin/cardetails deytince o sayfa geliyor
                                                                bu sayyfadaki car,colorvebranda add basınca o html i açıyor , bu da çalışıyor
                                                    
                                    admin paneli adres çubuğundan erişiliyor ve şu an guardı yok
                                    daha sonra admin panelinde neden veri gelmiyor ona bakalım:ng oninit ile alakalıymış


                                    car-color ve brandin html lerini yapalım
                                    tamamdır-ekrana elementler geldi
                                    ekleme işlevi çalışıyor mu-hayır -şuan işlevsellik yok
20.gün 1. adım sonu
//-----------------
                                    car color ve brand add için ngOninit içerisindeki kodlari unutmuşuz
                                    şimdi araç ekleme deneyelim-yetki reddedildi -ok frontend çalışıyor ozaman
                                    renk ekleniyor
                                    Marka Ekleniyor
                                    toastr olmnuyor çünkü modal çalışıyor

20.gün son
//-----------------

                                    


                                        



















  
