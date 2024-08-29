# API Dokümantasyonu

## Giriş

Bu RESTful API, demo e-ticaret platformu uygulaması için verileri yönetmenizi sağlar. API, ürünler, kullanıcılar ve siparişler gibi temel işlemleri destekler.

## Yetkilendirme ve Kimlik Doğrulama

API için, bazı kritik isteklerde kimlik doğrulaması yapılması gerekir. API'ye erişmek için bir `Bearer` token kullanmanız gerekir. Token'ınızı her istekte `Authorization` başlığında iletmelisiniz.

## Temel Bilgiler

- **Base URL**: `http://localhost:3001`
- **İçerik Türü**: `application/json`
- **Sürümleme kullanılmamıştır.**

## Uç Noktalar

### 1. Kayıt İsteği

**Yöntem**: POST  
**Uç Nokta**: `/api/register`  
**Açıklama**: Kayıt isteğinde bulunur.

**Başarı Durumu**:

- **Kod**: 200 OK
- **Yanıt**:

```json
{
  "message": "Kullanıcı başarıyla oluşturuldu."
}
```

**Hata Yanıtları**:

**Kod: 409:** "Kullanıcı zaten kayıtlı!"

### 2. Giriş İsteği

**Yöntem**: POST  
**Uç Nokta**: `/api/login`  
**Açıklama**: Giriş isteğinde bulunur.

**Başarı Durumu**:

- **Kod**: 200 OK
- **Yanıt**:

```json
{
  "token": "..."
}
```

**Hata Yanıtları**:

**Kod: 401:** "Kullanıcı adı veya şifre yanlış."

### 3. Ürünleri Listele

**Yöntem**: GET  
**Uç Nokta**: `/api/products`  
**Açıklama**: Bütün ürünleri listeler.

**Başarı Durumu**:

- **Kod**: 200 OK
- **Yanıt**:

```json
{
  "_id": "66d0f46ac68c1c9737b99fb9",
  "id": 1,
  "name": "Akıllı Telefon X",
  "price": 4999.99,
  "stock": 50,
  "description": "Son teknoloji özelliklere sahip akıllı telefon"
  ...
}
```

### 4. ID'sine Göre Listele

**Yöntem**: GET  
**Uç Nokta**: `/api/products/[id]`  
**Açıklama**: ID'sine göre ürünü listeler.

**Başarı Durumu**:

- **Kod**: 200 OK
- **Yanıt**:

```json
{
  "_id": "66d0f46ac68c1c9737b99fb9",
  "id": 1,
  "name": "Akıllı Telefon X",
  "price": 4999.99,
  "stock": 50,
  "description": "Son teknoloji özelliklere sahip akıllı telefon"
}
```

**Hata Yanıtları**:

**Kod: 404:** "Ürün bulunamadı."

### 5. ID'sine Göre Ürün Sil

**Yöntem**: DELETE  
**Uç Nokta**: `/api/products/[id]`  
**Açıklama**: ID'sine göre ürünü siler.

**Başarı Durumu**:

- **Kod**: 200 OK
- **Yanıt**:

```json
{
  "message": "Ürün başarıyla silindi."
}
```

**Hata Yanıtları**:

**Kod: 404:** "Ürün bulunamadı."

### 6. ID'sine Göre Ürün Güncelle

**Yöntem**: PUT  
**Uç Nokta**: `/api/products/[id]`  
**Açıklama**: ID'sine göre ürünü günceller.

**Başarı Durumu**:

- **Kod**: 200 OK
- **Yanıt**:

```json
{
  "_id": "66d0f46ac68c1c9737b99fb9",
  "id": 1,
  "name": "Akıllı Telefon X",
  "price": 4999.99,
  "stock": 50,
  "description": "Son teknoloji özelliklere sahip akıllı telefon"
}
```

**Hata Yanıtları**:

**Kod: 404:** "Ürün bulunamadı."

### 7. Çok Satan Ürünler

**Yöntem**: GET  
**Uç Nokta**: `/api/top-selling`  
**Açıklama**: En çok satan 10 ürünü listeler.

**Başarı Durumu**:

- **Kod**: 200 OK
- **Yanıt**:

```json
{
        "_id": "66ced66ebea6affe3be8ce17",
        "name": "Laptop Pro",
        "price": 7999.99,
        "totalQuantity": 3,
        "stock": 0
},

```

**Hata Yanıtları**:

**Kod: 401:** "Unauthorized"

### 8. Sipariş Oluştur

**Yöntem**: POST  
**Uç Nokta**: `/api/orders`  
**Açıklama**: Yeni bir sipariş oluşturur.

**Başarı Durumu**:

- **Kod**: 200 OK
- **Yanıt**:

```json
{
    "message": "Sipariş oluşturuldu",
    "orderCode": "5598556d-7287-4b9c-9ed1-a0e29673209c"
},

```

### 9. Sipariş Sorgula

**Yöntem**: GET  
**Uç Nokta**: `/api/orders/[order_code]`  
**Açıklama**: Oluşturulan siparişi sorgula.

**Başarı Durumu**:

- **Kod**: 200 OK
- **Yanıt**:

```json
{
    "_id": "66d02d9d9984ce661658994c",
    "cartItems": [
        {
            "_id": "66ced66ebea6affe3be8ce18",
            "id": 3,
            "name": "Kablosuz Kulaklık",
            "price": 599.99,
            "stock": 99,
            "description": "Gürültü önleyici özellikli kablosuz kulaklık",
            "quantity": 1
        },
        {
            "_id": "66ced66ebea6affe3be8ce17",
            "id": 2,
            "name": "Laptop Pro",
            "price": 7999.99,
            "stock": 28,
            "description": "Yüksek performanslı iş laptopu",
            "quantity": 1
        }
    ],
    "totalPrice": "8599.98",
    "status": "Kargoya verildi.",
    "orderCode": "f56bcc61-3f29-4903-87e8-c6074802f1f1"
},

```

**Hata Yanıtları**:

**Kod: 404:** "Sipariş bulunamadı."

### 10. Bütün Siparişler

**Yöntem**: GET  
**Uç Nokta**: `/api/orders`  
**Açıklama**: Bütün siparişleri listele

**Başarı Durumu**:

- **Kod**: 200 OK
- **Yanıt**:

```json
{

0:{_id: "66d02d9d9984ce661658994c",…}
1:{_id: "66d02da79984ce661658994d",…}
2:{_id: "66d02db89984ce661658994e",…}
3:{_id: "66d0f9eccbc440bb097ac5e9",…}
4:{_id: "66d105c12e5cb7c0feabb54f",…}

}

```

**Hata Yanıtları**:

**Kod: 401:** "Unauthorized"

### 11. Sipariş Durumunu Güncelle

**Yöntem**: PUT  
**Uç Nokta**: `/api/orders/status`  
**Açıklama**: Sipariş durumunu güncelle

**Başarı Durumu**:

- **Kod**: 200 OK
- **Yanıt**:

```json
{
  "message": "Sipariş statüsü güncellendi"
}
```

**Hata Yanıtları**:

**Kod: 401:** "Unauthorized"

**Kod: 404:** "Sipariş bulunamadı."
