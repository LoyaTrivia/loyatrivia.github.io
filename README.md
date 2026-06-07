# Loya Trivia — Landing Web Sitesi

**Loya Trivia** mobil bilgi yarışması uygulamasının tanıtım (landing) sitesi.
Saf **HTML + CSS + JS** ile yazılmıştır — framework, build adımı veya bağımlılık
yoktur. Herhangi bir statik hosting (Netlify, Vercel, GitHub Pages, Apache,
Nginx, S3...) üzerinde olduğu gibi çalışır.

## Hızlı başlangıç

Yerelde önizlemek için klasörü statik bir sunucuyla aç:

```bash
cd loya-web
python3 -m http.server 8080
# tarayıcıda: http://localhost:8080
```

Dağıtım: bu klasörün **içeriğini** domain kök dizinine yükle. Build gerekmez.

## Dosya yapısı

```
loya-web/
├── index.html              Ana landing sayfası
├── privacy.html            Gizlilik Politikası
├── terms.html              Şartlar ve Koşullar
├── kvkk.html               KVKK Aydınlatma Metni
├── site.webmanifest        PWA manifest
├── robots.txt              Arama motoru yönergeleri
├── sitemap.xml             Site haritası
├── app-ads.txt             AdMob doğrulama (domain kökünde olmalı)
├── STORE_SETUP.md          App Store / Google Play yapılandırma rehberi
├── README.md               Bu dosya
└── assets/
    ├── css/styles.css      Tüm stiller (tek dosya, bölümlere ayrılmış)
    ├── js/
    │   ├── site-config.js  ⭐ TEK AYAR DOSYASI (mağaza, iletişim, yasal)
    │   └── main.js          Davranış: config enjeksiyonu, nav, FAQ, animasyon
    └── img/
        ├── app-icon.png    Uygulama ikonu (1024×1024)
        ├── app-logo.svg    Logo
        ├── icons/          Oyun modu ve joker ikonları (SVG)
        ├── avatars/        Örnek avatarlar
        └── screens/        (boş) Gerçek ekran görüntüleri buraya
```

## Nasıl güncellenir?

Neredeyse her şey **`assets/js/site-config.js`** üzerinden ayarlanır — HTML'e
dokunmana gerek yok. Mağaza yayını, paket adları, iletişim, oyun puanları ve
yasal tarih hep burada. Ayrıntılar için **`STORE_SETUP.md`**'ye bak.

### Gerçek ekran görüntülerini eklemek

Ekran görüntüleri **tamamen config ile** yönetilir — HTML'e dokunmana gerek yok.

1. Dikey (portrait) ekran görüntülerini `assets/img/screens/` klasörüne koy.
   - **Önerilen:** PNG veya JPG, ~`1080×2160` px (en-boy ~`9:18`–`9:19.5`).
   - **Dosya adı küçük harf** olsun (`1.png`, `hero.png`). Sunucular büyük/küçük
     harfe duyarlıdır; `0.PNG` ile `0.png` aynı değildir.
   - Görselleri sıkıştır (TinyPNG vb.) — sayfa hızlı açılsın.
2. `assets/js/site-config.js` → `media` bölümünü doldur:
   ```js
   media: {
     // Hero'daki cihazın ekranı (boşsa galerideki ilk görsel kullanılır):
     heroScreenshot: "assets/img/screens/hero.png",
     // "Ekran görüntüleri" galerisi (boş [] ise bölüm gizlenir):
     screenshots: [
       { src: "assets/img/screens/1.png", alt: "Quiz ekranı" },
       { src: "assets/img/screens/2.png", alt: "Liderlik tablosu" },
       { src: "assets/img/screens/3.png", alt: "Profil" },
     ],
   }
   ```
3. Kaydet ve sayfayı yenile. `main.js` hero'yu doldurur, galeriyi oluşturur ve
   `#ekranlar` bölümünü otomatik görünür yapar. İdeal görsel sayısı 3–5'tir.

Tüm ekran görüntüleri gerçek bir **iPhone çerçevesi** (`assets/img/iphone.png`)
içinde gösterilir. Çerçeve şeffaf ekran kesitine sahiptir; görsel çerçevenin
arkasına yerleştirilir ve `.device` bileşeni (CSS) tarafından doğru konuma
oturtulur. Başka bir cihaz çerçevesi kullanmak istersen `assets/img/iphone.png`
dosyasını aynı en-boy oranıyla değiştirip `styles.css` içindeki `.device`
inset'lerini güncellemen yeterli.

### Tasarım / renkler

Tüm renkler `assets/css/styles.css` başındaki `:root` CSS değişkenlerinde.
Ana marka rengi `--orange: #ff8c00` (uygulamayla aynı). Tek yerden değiştirince
tüm site güncellenir.

## Tasarım notları

- **Font:** Nunito (uygulamayla aynı, Google Fonts üzerinden).
- **Renk:** Turuncu (`#ff8c00`) ana marka; yeşil/kırmızı doğru-yanlış vurguları
  uygulama temasından alınmıştır.
- **Erişilebilirlik:** `prefers-reduced-motion` desteklenir, odak halkaları,
  ARIA etiketleri ve anlamsal HTML kullanılmıştır.
- **Performans:** Harici bağımlılık yok; yalnızca Google Fonts + yerel SVG/PNG.

## İlgili klasörler

- `../loya-app` — Flutter mobil uygulaması (paket adları buradan gelir).
- `../loya` — Backend ve admin panel.
- `../loya-landing` — **Eski** landing (kullanılmıyor, bu site onun yerini alır).
