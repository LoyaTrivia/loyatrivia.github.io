/* ============================================================================
 * Loya Trivia — Merkezi Site Yapılandırması
 * ----------------------------------------------------------------------------
 * Bu dosya sitenin TEK ayar noktasıdır. Mağaza linkleri, iletişim, yasal
 * tarihler ve uygulama kimlikleri burada tutulur. HTML dosyalarına
 * dokunmadan, sadece buradaki değerleri değiştirerek siteyi güncelleyebilirsin.
 *
 * Yayın adımları için bkz: STORE_SETUP.md
 * ==========================================================================*/

window.LoyaSiteConfig = {
  /* --- Marka --- */
  appName: "Loya Trivia",
  tagline: "Bilgini konuştur, rakiplerini geç.",
  siteUrl: "https://trivia.loyaonline.com",
  supportEmail: "destek@loyaonline.com",
  publisherName: "Ulaş Sancak",

  /* --- Uygulama kimlikleri --- */
  androidPackageName: "com.loyaonline.trivia.android",
  iosBundleId: "com.loyaonline.trivia.apple",
  appStoreAppId: "6498963420", // App Store'da yayınlandıktan sonra sayısal Apple App ID
  admobPublisherId: "pub-7538001189924503",

  /* --- Yayın durumu ---
   * published: false  -> İndirme butonları görünür ama "Çok yakında" olarak pasif.
   * published: true   -> Aşağıdaki storeLinks aktif edilir.
   * Her mağazayı ayrı kontrol etmek için storeAvailability'yi kullan.            */
  published: true,
  storeAvailability: {
    googlePlay: true, // Google Play yayınlandığında true yap
    appStore: true, // App Store yayınlandığında true yap
  },
  storeLinks: {
    googlePlay:
      "https://play.google.com/store/apps/details?id=com.loyaonline.trivia.android",
    appStore: "https://apps.apple.com/app/id6498963420", // Örn: https://apps.apple.com/app/idYOUR_APP_ID
  },

  /* --- Oyun içeriği (landing'de gösterilen sayılar) --- */
  stats: {
    correctPoints: 5, // Her doğru cevap için kazanılan puan
    wrongPoints: -2, // Her yanlış cevap için kaybedilen puan
    jokerCost: 4, // Joker kullanım bedeli (coin)
    jokerCount: 4, // Joker tipi sayısı
    modeCount: 4, // Oyun modu sayısı
  },

  /* --- Yasal / Veri Sorumlusu ---
   * Loya Trivia bireysel bir geliştirici (şahıs işletmesi) tarafından sunulur.
   * Aşağıdaki [[...]] alanlarını yayın öncesi gerçek bilgilerle DOLDUR. Bu
   * değerler gizlilik / şartlar / KVKK sayfalarına otomatik yazılır.                 */
  legal: {
    lastUpdated: "6 Haziran 2026",
    controllerName: "Ulaş Sancak", // ör: "Ahmet Yılmaz"
    controllerAddress: "Bakırköy - İstanbul", // KVKK başvuru adresi
    minAge: 13, // Uygulamanın asgari kullanım yaşı
    privacyPath: "privacy.html",
    termsPath: "terms.html",
    kvkkPath: "kvkk.html",
  },

  /* --- Sosyal medya (boş bırakılırsa footer'da gösterilmez) --- */
  social: {
    instagram: "",
    twitter: "",
    youtube: "",
  },

  /* --- Ekran görüntüleri (assets/img/screens/, dikey ~1080×2160) ---
   * heroScreenshot boşsa galerideki ilk görsel hero'da kullanılır.
   * screenshots boşsa "Ekran görüntüleri" bölümü gizlenir.                     */
  media: {
    heroScreenshot: "assets/img/screens/0.png",
    screenshots: [
      { src: "assets/img/screens/0.png", alt: "Quiz ekranı" },
      { src: "assets/img/screens/1.png", alt: "Ana Sayfa" },
      { src: "assets/img/screens/2.png", alt: "Kategoriler" },
      { src: "assets/img/screens/3.png", alt: "Mücadele Ekranı" },
    ],
  },
};
