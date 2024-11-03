# E-Ticaret Uygulaması

Bu proje, demo niteliğindeki e-ticaret platformu için RESTful API geliştirmeyi hedeflemiştir. Bununla birlikte kullanıcı proje içinde üyelik oluşturabiliyor, alışveriş sepetini oluşturup sipariş verebiliyor, siparişini sorgulayabiliyor. Aynı zamanda verilen sipariş takip ediliyor, durumu güncelleniyor, kısacası sipariş yönetimini yapabiliyor. Yönetim panelinde raporlamaya yönelik en çok satan ürünler listeleniyor, ürün sayfalarında ise birkaç filtrelemeyle ürün arayabiliyor.

## Kullanılan Teknolojiler

- Backend
  - Node.js
- Frontend
  - Next.js
- Database
  - MongoDB

## Gereksinimler

Bu projeyi çalıştırmak için aşağıdaki yazılıma ihtiyacınız var:

- [Node.js](https://nodejs.org/)

## Kurulum

Projeyi yerel makinenize klonlayın:

```bash
git clone https://github.com/dcaltekin/e-commerce-app-w-node.js.git
```

Klonlanan dosyayı açtıktan projemizin server tarafındaki bağımlılıkları yükleyin:

```bash
cd backend
npm install
```

Daha sonra çevre değişkenlerini belirlemek için backend klasöründeki ana dizinde .env dosyası oluşturun ve içini şu şekilde doldurun:

```bash
MONGODB_URL= ---------
SECRET_KEY=b2f53c574c2ba27392697da287afdd9401b703e10acac470828bc86a9d92144e
PORT=3001
```

Ürünleri veritabanına kaydetmek için product.json dosyasını veri tabanına gönderin:

```bash
node scripts/seedProducts.js
```

Ardından serverı ayağa kaldırın:

```bash
npm run dev
```

Ekstra terminal açarak client tarafının bağımlılıklarını yükleyin:

```bash
cd frontend
npm install
```

Daha sonra çevre değişkenlerini belirlemek için frontend klasöründeki ana dizinde .env dosyası oluşturun ve içini şu şekilde doldurun:

```bash
NEXT_PUBLIC_BASE_URL=http://localhost:3001
```

Ardından client'ı başlatın ve terminalde çıkan adrese gidin:

```bash
npm run dev
```

---

Benimle iletişime geçebilirsiniz: [dcaltekin@gmail.com](mailto:dcaltekin@gmail.com)
