# Loya Trivia — Store & Landing Yapılandırması

Bu klasör **saf HTML/CSS/JS**'tir (framework yok). Tüm mağaza, iletişim ve
yasal değerler **tek bir dosyada** toplanmıştır:

```
assets/js/site-config.js
```

HTML dosyalarına dokunmadan, yalnızca bu dosyadaki değerleri değiştirerek tüm
siteyi (mağaza butonları, iletişim e-postası, paket adları, oyun istatistikleri,
yasal tarih, sosyal medya) güncelleyebilirsin.

---

## 1. Mevcut uygulama kimlikleri

| Alan | Değer |
| --- | --- |
| Android paket adı | `com.loyaonline.trivia.android` |
| iOS bundle ID | `com.loyaonline.trivia.apple` |
| AdMob publisher ID | `pub-7538001189924503` |
| Destek e-postası | `destek@loyaonline.com` |
| Site URL | `https://loyaonline.com` |

> Bu değerler `loya-app` Flutter projesindeki paket adı ve bundle ID ile
> eşleşmelidir.

---

## 2. Yayın öncesi kontrol listesi

1. **Domain'i doğrula.** `https://loyaonline.com` değilse şu dosyaları güncelle:
   - `assets/js/site-config.js` → `siteUrl` + `storeLinks`
   - `robots.txt`
   - `sitemap.xml`
   - tüm HTML dosyalarındaki `<link rel="canonical">` ve `og:url`
2. **Veri sorumlusu bilgilerini doldur.** Yasal sayfalar (`privacy.html`,
   `terms.html`, `kvkk.html`) gerçek uygulama davranışına göre yazılmıştır; ancak
   veri sorumlusu kimliği `site-config.js → legal` içinde **placeholder**'dır:
   ```js
   legal: {
     controllerName: "[[Ad Soyad — veri sorumlusu]]",   // gerçek ad/ünvan
     controllerAddress: "[[Açık adres — il/ilçe dahil]]", // KVKK başvuru adresi
     minAge: 13,
   }
   ```
   Bu değerleri doldurunca tüm yasal sayfalara otomatik yazılır. Ardından
   metinleri bir hukuk danışmanına kontrol ettir ve sayfaların üstündeki sarı
   "taslak/placeholder" notunu (`legal-note`) yayın öncesi kaldır.

   > Uygulama; Firebase (Auth/Firestore/Analytics/Crashlytics/Messaging),
   > Google AdMob, in-app purchase ve Apple ATT kullanır. Coin yalnızca
   > oyun içi sanal paradır (gerçek para çekimi yoktur). Asgari yaş 13. Bu
   > gerçekler metinlere işlenmiştir — uygulama davranışı değişirse metinleri de
   > güncelle.
3. **`app-ads.txt` dosyasını** AdMob'da kullanılan domain'in kök dizininde
   yayınla: `https://loyaonline.com/app-ads.txt`
4. Şu URL'lerin herkese açık olduğunu doğrula:
   - `https://loyaonline.com/privacy.html`
   - `https://loyaonline.com/terms.html`
   - `https://loyaonline.com/kvkk.html`
   - `https://loyaonline.com/app-ads.txt`

---

## 3. Google Play yayınlandıktan sonra

1. Şu URL'in açıldığını doğrula:
   `https://play.google.com/store/apps/details?id=com.loyaonline.trivia.android`
2. `assets/js/site-config.js` içinde:
   ```js
   storeAvailability: { googlePlay: true, ... },
   storeLinks: { googlePlay: "https://play.google.com/store/apps/details?id=com.loyaonline.trivia.android", ... }
   ```
   > İki mağazayı aynı anda açmak için `published: true` da yapabilirsin; ama tek
   > tek kontrol için `storeAvailability` daha güvenlidir.
3. **Google Play Console → Store listing** alanına ekle:
   - Website: `https://loyaonline.com`
   - Privacy policy: `https://loyaonline.com/privacy.html`

---

## 4. App Store yayınlandıktan sonra

1. App Store Connect'te sayısal **Apple App ID**'yi bul (Örn: `1234567890`).
2. `assets/js/site-config.js` içinde:
   ```js
   appStoreAppId: "1234567890",
   storeAvailability: { appStore: true, ... },
   storeLinks: { appStore: "https://apps.apple.com/app/id1234567890", ... }
   ```
   > `appStoreAppId` ayarlandığında ana sayfaya otomatik olarak Apple "Smart App
   > Banner" meta etiketi eklenir (Safari'de iOS kullanıcılarına indirme önerisi).
3. **App Store Connect → App Information** alanına ekle:
   - Marketing URL: `https://loyaonline.com`
   - Privacy Policy URL: `https://loyaonline.com/privacy.html`
   - Support URL: `https://loyaonline.com`

---

## 5. Mağaza rozetleri (App Store / Google Play)

Resmî **App Store** ve **Google Play** rozetleri kullanılır:
`assets/img/badge-app-store.svg` ve `assets/img/badge-google-play.svg`. Rozetler
her zaman **aktif görünür** (gri/pasif duruma geçmez). Yalnızca tıklanınca nereye
gidecekleri config'e bağlıdır:

| Config | Rozetin yönlendirmesi |
| --- | --- |
| `published: false` ve ilgili `storeAvailability` `false` | Rozet aktif görünür; tıklayınca sayfa içi indirme bölümüne (`#indir`) kayar. |
| `storeAvailability.googlePlay: true` (URL dolu) | Google Play rozeti mağaza linkine gider (yeni sekme). |
| `storeAvailability.appStore: true` (URL dolu) | App Store rozeti mağaza linkine gider (yeni sekme). |
| `published: true` (URL'ler dolu) | Her iki rozet de mağaza linklerine gider. |

> Yani yayında: `site-config.js` içinde ilgili `storeAvailability` bayrağını
> `true` yap ve `storeLinks` URL'sini doldur — başka bir şey gerekmez.
>
> Rozet boyutlarını değiştirmen gerekirse `assets/css/styles.css` içindeki
> `--badge-apple-h` ve `--badge-google-h` değişkenlerini kullan.

---

## 6. Sık güncellenen değerler nerede?

| Ne | Nerede (`site-config.js`) |
| --- | --- |
| Uygulama adı / tagline | `appName`, `tagline` |
| Destek e-postası | `supportEmail` |
| Paket adı / bundle ID | `androidPackageName`, `iosBundleId` |
| Oyun puanları / joker bedeli | `stats.*` |
| Yasal son güncelleme tarihi | `legal.lastUpdated` |
| Sosyal medya linkleri | `social.*` (boş bırakılırsa footer'da görünmez) |

Bu değerler HTML'de `data-*` öznitelikleriyle işaretli alanlara
`assets/js/main.js` tarafından otomatik yazılır.
