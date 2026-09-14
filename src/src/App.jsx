import React, { useState } from 'react';
import { 
  Users, MessageSquare, Calendar, Mic, 
  Bell, Image as ImageIcon, Plus, Send, Gift, Compass
} from 'lucide-react';

export default function WaslApp() {
  const [activeTab, setActiveTab] = useState('home');
  const [generationMode, setGenerationMode] = useState('standard');
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [majlisMessages, setMajlisMessages] = useState([
    { id: 1, sender: 'Grandfather Hamad', text: 'السلام عليكم يا عيال. لا تنسون جمعة العيد يوم الجمعة القادم في المجلس.', time: '04:30 PM', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80' },
    { id: 2, sender: 'Khalid (Father)', text: 'وعليكم السلام والرحمة يا الوالد. كلنا حاضرين إن شاء الله.', time: '04:35 PM', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80' }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [vaultItems] = useState([
    { id: 1, title: 'Grandfather’s Pearling Stories', type: 'audio', date: 'Sept 2026', author: 'Hamad Al Mansoori', image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80' },
    { id: 2, title: 'Family Recipe: Grandmother’s Harees', type: 'recipe', date: 'Aug 2026', author: 'Aisha Grandmother', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80' }
  ]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    setMajlisMessages([
      ...majlisMessages,
      { id: Date.now(), sender: 'You', text: newMessage, time: 'Just now', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80' }
    ]);
    setNewMessage('');
  };

  return (
    <div className="min-h-screen bg-stone-100 text-stone-900 font-['Cairo',sans-serif] flex flex-col">
      <header className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 text-white shadow-xl">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap justify-between items-center border-b border-emerald-700/50">
          <div className="flex items-center space-x-3 space-x-reverse">
            <div className="w-10 h-10 rounded-xl bg-amber-400 flex items-center justify-center text-emerald-950 font-black text-xl shadow-lg">وصل</div>
            <div>
              <h1 className="text-lg font-bold tracking-wide">WASL وصل | Smart Mobile Application Contest</h1>
              <p className="text-xs text-emerald-200">Khalifa University & UAE University • UAE Year of Family National Project</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 space-x-reverse mt-2 sm:mt-0">
            <div className="bg-emerald-950/60 p-1.5 rounded-xl flex items-center space-x-2 space-x-reverse border border-emerald-700">
              <span className="text-xs text-emerald-300 font-medium px-2 hidden md:inline">وضع الأجيال:</span>
              <button onClick={() => setGenerationMode('standard')} className={`px-3 py-1 rounded-lg text-xs font-bold ${generationMode === 'standard' ? 'bg-amber-400 text-emerald-950' : 'text-white'}`}>الكل</button>
              <button onClick={() => setGenerationMode('elders')} className={`px-3 py-1 rounded-lg text-xs font-bold ${generationMode === 'elders' ? 'bg-amber-400 text-emerald-950' : 'text-white'}`}>الأجداد 👴</button>
            </div>
            <button onClick={() => setShowNotificationModal(!showNotificationModal)} className="relative p-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-amber-300 shadow">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-amber-400 text-emerald-950 text-xs font-black rounded-full flex items-center justify-center">3</span>
            </button>
          </div>
        </div>
      </header>

      {showNotificationModal && (
        <div className="absolute top-20 left-4 md:left-20 w-96 bg-white rounded-2xl shadow-2xl border border-stone-200 z-50 overflow-hidden">
          <div className="bg-emerald-900 text-white p-4 flex justify-between items-center">
            <div className="flex items-center gap-2"><Gift className="w-5 h-5 text-amber-400" /><h3 className="font-bold text-sm">Smart Family Reminders & Alerts</h3></div>
            <button onClick={() => setShowNotificationModal(false)} className="text-emerald-200 font-bold text-lg">×</button>
          </div>
          <div className="divide-y divide-stone-100 max-h-80 overflow-y-auto">
            <div className="p-4"><p className="text-xs font-semibold">🎂 Grandfather Hamad’s 82nd Birthday in 2 days!</p></div>
            <div className="p-4"><p className="text-xs font-semibold">📅 Friday Al Fitr Gathering at 7:00 PM.</p></div>
          </div>
        </div>
      )}

      <nav className="bg-white border-b border-stone-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 flex justify-center md:justify-start space-x-1 space-x-reverse overflow-x-auto py-2">
          {[
            { id: 'home', label: 'الرئيسية (Home)', icon: Compass },
            { id: 'majlis', label: 'المجلس (Majlis)', icon: MessageSquare },
            { id: 'tree', label: 'شجرة العائلة (Nasab)', icon: Users },
            { id: 'vault', label: 'خزينة الذكريات (Vault)', icon: ImageIcon },
            { id: 'events', label: 'المناسبات (Events)', icon: Calendar },
            { id: 'legacy', label: 'وضع الرواية (Legacy Mode)', icon: Mic },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center space-x-2 space-x-reverse px-4 py-2.5 rounded-xl font-bold text-sm whitespace-nowrap ${isActive ? 'bg-emerald-700 text-white shadow-md' : 'text-stone-600 hover:bg-stone-100'}`}>
                <Icon className={`w-4 h-4 ${isActive ? 'text-amber-300' : 'text-emerald-700'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6">
        {activeTab === 'home' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-emerald-800 to-teal-900 rounded-3xl p-6 md:p-8 text-white shadow-xl">
              <span className="px-3 py-1 bg-amber-400 text-emerald-950 font-bold text-xs rounded-full inline-block mb-3">عائلة آل منصوري</span>
              <h3 className="font-black text-amber-300 text-2xl">مساء الخير، يا هلا فيك</h3>
              <p className="text-emerald-100 text-sm mt-1">Families are the compass that guides us. Different generations, one home.</p>
            </div>
          </div>
        )}
        {activeTab === 'majlis' && (
          <div className="bg-white rounded-3xl shadow-xl border border-stone-200 overflow-hidden flex flex-col h-[550px]">
            <div className="bg-emerald-900 text-white p-4 px-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-400 text-emerald-950 flex items-center justify-center font-bold">مجلس</div>
              <div><h3 className="font-bold text-base">مجلس عائلة آل منصوري</h3><span className="text-xs text-emerald-300">14 family members active</span></div>
            </div>
            <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-stone-50">
              {majlisMessages.map((msg) => (
                <div key={msg.id} className="flex items-start space-x-3 space-x-reverse">
                  <img src={msg.avatar} alt={msg.sender} className="w-10 h-10 rounded-full object-cover border-2 border-emerald-600" />
                  <div className="bg-white p-4 rounded-2xl shadow-sm border border-stone-200">
                    <span className="font-bold text-xs text-emerald-900">{msg.sender}</span>
                    <p className="text-stone-800 text-sm mt-1">{msg.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-stone-200 flex items-center gap-3">
              <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="اكتب رسالتك إلى المجلس..." className="flex-1 bg-stone-100 border border-stone-200 rounded-2xl px-4 py-3 text-sm focus:outline-none" />
              <button type="submit" className="bg-emerald-700 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2"><span>إرسال</span><Send className="w-4 h-4 rotate-180" /></button>
            </form>
          </div>
        )}
        {activeTab === 'tree' && <div className="bg-white p-6 rounded-3xl shadow-xl text-center"><h3 className="text-2xl font-black text-emerald-900">شجرة العائلة - نسب</h3><p className="text-stone-600 text-sm mt-2">Visual lineage connecting four generations.</p></div>}
        {activeTab === 'vault' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center bg-white p-6 rounded-3xl shadow-xl"><h3 className="text-2xl font-black text-emerald-900">خزينة الذكريات</h3><button className="bg-emerald-700 text-white px-6 py-3 rounded-2xl text-sm font-bold flex items-center gap-2"><Plus className="w-4 h-4" /><span>إضافة ذكرى</span></button></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {vaultItems.map((item) => (
                <div key={item.id} className="bg-white rounded-3xl overflow-hidden shadow-xl border"><img src={item.image} alt={item.title} className="w-full h-48 object-cover" /><div className="p-6"><h4 className="font-bold text-lg">{item.title}</h4><p className="text-xs text-stone-500 mt-1">By {item.author}</p></div></div>
              ))}
            </div>
          </div>
        )}
        {activeTab === 'events' && <div className="bg-white p-6 rounded-3xl shadow-xl"><h3 className="text-2xl font-black text-emerald-900">الفعاليات والمناسبات</h3><p className="text-stone-600 text-sm mt-2">Automated birthday & gathering reminders active.</p></div>}
        {activeTab === 'legacy' && <div className="bg-white p-8 rounded-3xl shadow-xl text-center max-w-xl mx-auto"><Mic className="w-12 h-12 mx-auto text-amber-700 mb-4" /><h3 className="text-2xl font-black text-emerald-900">وضع الرواية (Legacy Mode)</h3><p className="text-stone-600 text-sm mt-2">Simplified voice recording interface for grandparents.</p></div>}
      </main>

      <footer className="bg-emerald-950 text-white py-6 mt-12 text-center text-xs text-emerald-300">
        © 2026 Wasl (وصل) • Developed for Khalifa University & UAE University National Competition.
      </footer>
    </div>
  );
}
