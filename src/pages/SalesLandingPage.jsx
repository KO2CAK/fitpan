import React, { useState } from "react";
import {
  ShoppingCart,
  Zap,
  ShieldCheck,
  MessageCircle,
  ArrowRight,
  Star,
  Apple,
  HeartPulse,
  Smile,
  Leaf,
  X,
} from "lucide-react";

// Full Product Catalog Data
const PRODUCT_CATALOG = {
  "FRUIT CHIPS": {
    products: [
      { name: "Apel", price100: 27000, price200: 51000 },
      { name: "Buah Naga", price100: 56000, price200: 108000 },
      { name: "Durian Montong", price100: 110000, price200: 217000 },
      { name: "Buah Kelapa", price100: 28000, price200: 52000 },
      { name: "Nanas", price100: 32000, price200: 60000 },
      { name: "Nangka", price100: 30000, price200: 56000 },
      { name: "Pisang", price100: 21000, price200: 38000 },
      { name: "Pisang Kepok", price100: 22000, price200: 41000 },
      { name: "Salak", price100: 25000, price200: 47000 },
    ],
  },
  "VEGETABLE CHIPS": {
    products: [
      { name: "Bawang Merah Bulat", price100: 54000, price200: 104000 },
      { name: "Bawang Putih", price100: 51000, price200: 98000 },
      { name: "Beetroot", price100: 50000, price200: 96000 },
      { name: "Buncis", price100: 33000, price200: 62000 },
      { name: "Edamame", price100: 32000, price200: 59000 },
      { name: "Jagung Manis", price100: 23000, price200: 42000 },
      { name: "Jagung Ungu", price100: 22000, price200: 54000 },
      { name: "Kentang Granola/Wedges", price100: 29000, price200: 55000 },
      { name: "Labu Madu", price100: 28000, price200: 52000 },
      { name: "Okra", price100: 41000, price200: 77000 },
      { name: "Singkong", price100: 18000, price200: 33000 },
      { name: "Tape Singkong Panjang/Dadu", price100: 19000, price200: 35000 },
      { name: "Ubi Cilembu/Madu", price100: 19000, price200: 35000 },
      { name: "Wortel", price100: 30000, price200: 58000 },
    ],
  },
  "MIX PRE-ORDER": {
    products: [
      { name: "Mix Buah", price100: 27000, price200: 50000 },
      { name: "Mix Sayur", price100: 30000, price200: 55000 },
      { name: "Mix Bertepung", price100: 29000, price200: 52000 },
      { name: "Mix Total", price100: 32000, price200: 55000 },
    ],
  },
};

const SalesLandingPage = () => {
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [category, setCategory] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [weight, setWeight] = useState("100g");
  const [quantity, setQuantity] = useState(1);
  const [address, setAddress] = useState("");

  const categories = Object.keys(PRODUCT_CATALOG);
  const products = category ? PRODUCT_CATALOG[category].products : [];

  const currentProduct = products.find((p) => p.name === selectedProduct);
  const unitPrice = currentProduct
    ? weight === "100g"
      ? currentProduct.price100
      : currentProduct.price200
    : 0;
  const totalPrice = unitPrice * quantity;

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleOrder = () => {
    if (!category || !selectedProduct || !address) {
      alert("Mohon lengkapi semua data pesanan!");
      return;
    }
    const phoneNumber = "628983487706";
    const message = `Halo FitPan, saya mau pesan:%0A- Produk: ${selectedProduct} (${category})%0A- Berat: ${weight}%0A- Jumlah: ${quantity} bungkus%0A- Total: Rp ${formatPrice(totalPrice)}%0A- Alamat: ${address}%0A%0AApakah ready stock?`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, "_blank");
    setShowOrderModal(false);
    // Reset form
    setCategory("");
    setSelectedProduct("");
    setWeight("100g");
    setQuantity(1);
    setAddress("");
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      {/* Centered Modal Overlay */}
      {showOrderModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          {/* Modal Container */}
          <div className="bg-white rounded-2xl w-full max-w-sm max-h-[90vh] overflow-hidden shadow-2xl relative animate-scale-in">
            {/* Close Button */}
            <button
              onClick={() => setShowOrderModal(false)}
              className="absolute top-3 right-3 z-10 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>

            {/* Modal Header */}
            <div className="bg-emerald-600 px-5 py-4">
              <h3 className="text-lg font-bold text-white">Pesan FitPan</h3>
              <p className="text-emerald-100 text-xs mt-0.5">
                Pilih produk favoritmu
              </p>
            </div>

            {/* Modal Content */}
            <div className="p-5 space-y-4 overflow-y-auto max-h-[calc(90vh-180px)]">
              {/* Category Dropdown */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
                  Kategori
                </label>
                <select
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                    setSelectedProduct("");
                  }}
                  className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white"
                >
                  <option value="">Pilih Kategori</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Product Dropdown */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
                  Produk
                </label>
                <select
                  value={selectedProduct}
                  onChange={(e) => setSelectedProduct(e.target.value)}
                  disabled={!category}
                  className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white disabled:bg-gray-100 disabled:text-gray-400"
                >
                  <option value="">Pilih Produk</option>
                  {products.map((product) => (
                    <option key={product.name} value={product.name}>
                      {product.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Weight Selection */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
                  Ukuran
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setWeight("100g")}
                    className={`flex-1 py-2.5 rounded-xl font-medium text-sm transition-all ${
                      weight === "100g"
                        ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/30"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    100 Gr
                  </button>
                  <button
                    onClick={() => setWeight("200g")}
                    className={`flex-1 py-2.5 rounded-xl font-medium text-sm transition-all ${
                      weight === "200g"
                        ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/30"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    200 Gr
                  </button>
                </div>
              </div>

              {/* Quantity */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
                  Jumlah
                </label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 font-bold text-lg hover:bg-emerald-200 transition-colors"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                    }
                    className="flex-1 text-center border border-gray-200 rounded-xl py-2 font-semibold text-base focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 font-bold text-lg hover:bg-emerald-200 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
                  Alamat Pengiriman
                </label>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Masukkan alamat lengkap..."
                  className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  rows="2"
                />
              </div>

              {/* Price Summary */}
              {selectedProduct && (
                <div className="bg-emerald-50 rounded-xl p-4 space-y-2">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Harga/unit:</span>
                    <span className="font-medium">
                      {formatPrice(unitPrice)}
                    </span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-emerald-700 pt-2 border-t border-emerald-100">
                    <span>Total:</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-5 py-4 border-t border-gray-100 bg-white">
              <button
                onClick={handleOrder}
                className="w-full bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-600/30"
              >
                <MessageCircle className="w-5 h-5" />
                Kirim via WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Minimalist Header - Sticky */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
          {/* Brand Logo */}
          <div className="flex items-center gap-2">
            <img
              src="/img/logo-fitpan.jpeg"
              alt="FitPan Logo"
              className="h-8 w-auto object-contain"
            />
          </div>

          {/* Sticky CTA Button */}
          <button
            onClick={() => setShowOrderModal(true)}
            className="bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200 shadow-lg shadow-emerald-600/30"
          >
            Pesan Sekarang
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-8 px-4">
        <div className="max-w-md mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-semibold mb-4">
            <Leaf className="w-3 h-3" />
            <span>Cemilan Sehat Setiap Hari</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">
            Ngemil Enak Gak Harus{" "}
            <span className="text-emerald-600">Takut Dosa</span>
          </h1>

          {/* Sub-headline */}
          <p className="text-gray-600 text-base mb-6 leading-relaxed">
            Lupakan keripik oleh-oleh yang penuh minyak. Nikmati nutrisi buah
            dan sayur asli dalam setiap kriukan. FitPan hadir sebagai teman
            ngemil harianmu yang praktis, sehat, dan tanpa pengawet.
          </p>

          {/* Product Image */}
          <div className="relative mb-6">
            <div className="bg-gradient-to-br from-emerald-100 to-sky-100 rounded-2xl p-4 shadow-xl shadow-emerald-600/10 overflow-hidden">
              <img
                src="/img/fitpan1.jpeg"
                alt="FitPan - Produk Premium"
                className="w-full h-auto rounded-xl object-cover"
              />
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-3 -right-2 bg-white px-4 py-2 rounded-xl shadow-lg border border-gray-100">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-6 h-6 bg-emerald-600 rounded-full border-2 border-white"
                    />
                  ))}
                </div>
                <span className="text-xs font-semibold text-gray-700">
                  100+ Terjual
                </span>
              </div>
            </div>
          </div>

          {/* Primary CTA */}
          <button
            onClick={() => setShowOrderModal(true)}
            className="w-full bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white py-4 rounded-xl font-bold text-lg transition-all duration-200 shadow-xl shadow-emerald-600/30 flex items-center justify-center gap-2"
          >
            <span>Ambil Stok Camilan Sehatmu</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          {/* Trust badges */}
          <div className="flex items-center justify-center gap-6 mt-4 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Garansi 100%</span>
            </div>
            <div className="flex items-center gap-1">
              <Zap className="w-4 h-4 text-amber-500" />
              <span>Cepat & Tepat</span>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof / Trust Section */}
      <section className="py-8 px-4 bg-gray-50">
        <div className="max-w-md mx-auto">
          <p className="text-center text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
            Testimoni Pelanggan
          </p>

          {/* Testimonial */}
          <div className="mt-8 bg-white rounded-xl p-5 shadow-sm">
            <div className="flex gap-1 mb-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className="w-4 h-4 fill-amber-400 text-amber-400"
                />
              ))}
            </div>
            <p className="text-gray-700 text-sm italic leading-relaxed mb-3">
              "Produk ini benar-benar mengubah pandangan saya tentang camilan
              sehat. Rasanya enak, praktis, dan saya merasa lebih baik setelah
              ngemil FitPan!"
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold">
                A
              </div>
              <div>
                <p className="font-semibold text-sm text-gray-900">
                  Andi Pratama
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features/Benefits Grid */}
      <section className="py-10 px-4">
        <div className="max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Mengapa Memilih FitPan?
          </h2>

          <div className="space-y-4">
            {/* Card 1 - 100% Buah & Sayur */}
            <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-lg shadow-gray-900/5 hover:shadow-xl hover:shadow-gray-900/10 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Apple className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">
                    100% Buah & Sayur Asli
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Bukan perasa buatan, nutrisi tetap terjaga dalam setiap
                    kriukan.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2 - Camilan Harian Sehat */}
            <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-lg shadow-gray-900/5 hover:shadow-xl hover:shadow-gray-900/10 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-rose-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <HeartPulse className="w-6 h-6 text-rose-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">
                    Camilan Harian Sehat
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Rendah kalori, cocok untuk menemani produktivitasmu setiap
                    hari.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 3 - Rasa Nagih */}
            <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-lg shadow-gray-900/5 hover:shadow-xl hover:shadow-gray-900/10 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Smile className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">
                    Rasa Nagih, Perut Nyaman
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Tanpa pewarna tambahan dan bebas kolesterol.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA - The Closer */}
      <section className="py-10 px-4 bg-gradient-to-br from-emerald-600 to-emerald-700">
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Yuk, Ubah Kebiasaan Ngemilmu!
          </h2>
          <p className="text-emerald-100 text-base mb-6 leading-relaxed">
            Jangan lewatkan kesempatan untuk mencicipi camilan sehat yang lezat.
            Chat sekarang dan kami akan kirimi kamu gratis!
          </p>

          {/* WhatsApp CTA */}
          <button
            onClick={() => setShowOrderModal(true)}
            className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 active:scale-[0.98] text-emerald-700 py-4 px-8 rounded-xl font-bold text-lg transition-all duration-200 shadow-xl"
          >
            <MessageCircle className="w-6 h-6" />
            <span>Pesan FitPan Sekarang</span>
          </button>

          <p className="text-emerald-200 text-xs mt-4">
            ✨ Gratis Ongkir • Proses Cepat • Tanpa Pengawet
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 px-4 bg-gray-900">
        <div className="max-w-md mx-auto text-center">
          <p className="text-gray-500 text-sm">
            © 2026 FitPan. All rights reserved.
          </p>
          <p className="text-gray-600 text-xs mt-1">
            Made with ❤️ for your healthy snack
          </p>
        </div>
      </footer>
    </div>
  );
};

export default SalesLandingPage;
