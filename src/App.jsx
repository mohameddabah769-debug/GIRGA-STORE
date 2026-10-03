import React, { useState } from 'react';

const PRODUCTS = [
  { id: 1, name: 'تفاح أحمر', price: 35, category: 'فواكه', image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=300' },
  { id: 2, name: 'موز طازج', price: 20, category: 'فواكه', image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=300' },
  { id: 3, name: 'حليب كامل الدسم 1 لتر', price: 42, category: 'ألبان', image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=300' },
  { id: 4, name: 'جبن أبيض premium', price: 65, category: 'ألبان', image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=300' },
  { id: 5, name: 'خبز بلدي (5 أرغفة)', price: 15, category: 'مخبوزات', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300' },
  { id: 6, name: 'طماطم بلدي 1 كجم', price: 18, category: 'خضروات', image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=300' },
  { id: 7, name: 'خيار طازج 1 كجم', price: 15, category: 'خضروات', image: 'https://images.unsplash.com/photo-1604977042946-1eecc30f269e?w=300' },
  { id: 8, name: 'عصير برتقال طبيعي', price: 25, category: 'مشروبات', image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?w=300' },
  { id: 9, name: 'زيت زيتون 500 مل', price: 120, category: 'زيوت', image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300' },
  { id: 10, name: 'أرز مصري فاخر 1 كجم', price: 32, category: 'بقوليات', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300' },
  { id: 11, name: 'سكر أبيض 1 كجم', price: 35, category: 'بقاليات', image: 'https://images.unsplash.com/photo-1581441363689-1f3c3c414635?w=300' },
  { id: 12, name: 'طبق بيض بلدي 30 حبة', price: 140, category: 'ألبان وبيض', image: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=300' },
  { id: 13, name: 'بطاطس تحمير 1 كجم', price: 18, category: 'خضروات', image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=300' },
  { id: 14, name: 'مانجو زبدية 1 كجم', price: 45, category: 'فواكه', image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=300' },
  { id: 15, name: 'مياه غازية 1 لتر', price: 18, category: 'مشروبات', image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=300' },
  { id: 16, name: 'تونة قطع سهلة الفتح 185 جرام', price: 55, category: 'معلبات', image: 'https://images.unsplash.com/photo-1534483509719-3feaee7c30da?w=300' },
  { id: 17, name: 'تونة مفتتة حارة 140 جرام', price: 35, category: 'معلبات', image: 'https://images.unsplash.com/photo-1534483509719-3feaee7c30da?w=300' },
];

export default function App() {
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('الكل');

  const categories = ['الكل', ...new Set(PRODUCTS.map((p) => p.category))];

  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'الكل' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div dir="rtl" className="min-h-screen bg-gray-50 p-4 sm:p-6 font-sans text-right">
      {/* الهيدر */}
      <header className="max-w-6xl mx-auto mb-6 flex flex-col md:flex-row justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-gray-100 gap-4">
        <h1 className="text-2xl font-black text-green-700">🛒 متجر الخضار والسوبرماركت</h1>
        
        <div className="w-full md:w-80">
          <input
            type="text"
            placeholder="ابحث عن أي منتج..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 text-sm bg-gray-50"
          />
        </div>

        <div className="bg-green-50 text-green-700 px-4 py-2 rounded-xl font-bold text-sm">
          السلة: {cart.reduce((sum, item) => sum + item.quantity, 0)} منتجات
        </div>
      </header>

      {/* أقسام الفلترة */}
      <div className="max-w-6xl mx-auto mb-6 flex flex-wrap gap-2 justify-start">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition shadow-sm ${
              selectedCategory === cat
                ? 'bg-green-600 text-white'
                : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-100'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* قائمة المنتجات */}
        <section className="lg:col-span-2">
          {filteredProducts.length === 0 ? (
            <p className="text-gray-500 text-center py-12 bg-white rounded-2xl border">لا توجد منتجات مطابقة للبحث</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredProducts.map((product) => (
                <div key={product.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition flex flex-col justify-between">
                  <div>
                    <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded-xl mb-3" />
                    <span className="text-xs font-bold text-green-600 bg-green-50 px-2.5 py-1 rounded-lg">
                      {product.category}
                    </span>
                    <h3 className="text-lg font-bold mt-2 text-gray-800">{product.name}</h3>
                  </div>
                  <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-50">
                    <span className="text-lg font-black text-gray-900">{product.price} ج.م</span>
                    <button
                      onClick={() => addToCart(product)}
                      className="bg-green-600 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-green-700 transition shadow-sm"
                    >
                      إضافة للسلة
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* سلة المشتريات */}
        <aside className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit">
          <h2 className="text-xl font-bold mb-4 border-b pb-3 text-gray-800">ملخص الطلب</h2>
          {cart.length === 0 ? (
            <p className="text-gray-400 text-center py-8 text-sm">السلة فارغة حالياً</p>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center border-b border-gray-50 pb-3">
                  <div>
                    <h4 className="font-bold text-gray-800 text-sm">{item.name}</h4>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {item.price} ج.م × {item.quantity}
                    </p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 text-xs font-bold px-2 py-1 bg-red-50 rounded-lg"
                  >
                    إزالة
                  </button>
                </div>
              ))}
              <div className="pt-2 border-t flex justify-between items-center text-lg font-bold">
                <span className="text-gray-700">الإجمالي:</span>
                <span className="text-green-600 font-black">{totalPrice} ج.م</span>
              </div>
              <button
                onClick={() => alert('تم إرسال الطلب بنجاح! شكراً لتسوقك معنا.')}
                className="w-full bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700 transition shadow-sm mt-2"
              >
                تأكيد الطلب
              </button>
            </div>
          )}
        </aside>
    </main>
    </div>
  );
}