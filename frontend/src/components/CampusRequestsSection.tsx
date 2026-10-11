import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  HelpCircle, 
  Plus, 
  MessageSquare, 
  AlertCircle, 
  CheckCircle2, 
  X,
  Sparkles,
  MapPin,
  Trash2,
  User as UserIcon,
  Phone
} from 'lucide-react';
import { CampusRequest } from '../types/product';
import { useCampus, CAMPUS_HUBS } from '../context/CampusContext';
import { useChat } from '../context/ChatContext';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

// Seed active requests for Vizag engineering campuses so the board is immediately functional
const DEFAULT_CAMPUS_REQUESTS: CampusRequest[] = [
  {
    id: 'req_bs_grewal',
    title: 'Higher Engineering Mathematics (B.S. Grewal 44th Edition)',
    description: 'Looking for B.S. Grewal textbook for 2nd Year semester exams. Need clean pages with minimal markings.',
    category: 'Books',
    urgency: 'Urgent',
    requesterId: 'student_kavya_ece',
    requesterName: 'Kavya S. (ECE 2nd Yr)',
    requesterAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    campusHub: 'Chaitanya Engineering College',
    location: 'Central Library / CSE Quadrangle',
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
  },
  {
    id: 'req_casio_calc',
    title: 'Casio FX-991EX ClassWiz Scientific Calculator',
    description: 'Urgent: Lost mine during lab session. Need an authentic fx-991EX or 991CW before upcoming internal assessments.',
    category: 'Electronics',
    urgency: 'Urgent',
    requesterId: 'student_rahul_mech',
    requesterName: 'Rahul V. (Mechanical)',
    requesterAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    campusHub: 'Chaitanya Engineering College',
    location: 'Mechanical Workshop Block',
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
  },
  {
    id: 'req_mini_drafter',
    title: 'Engineering Mini Drafter & Sheet Container Tube',
    description: '1st year drawing classes starting this week. Looking to buy a mini drafter in good calibrated condition.',
    category: 'Lab Equipment',
    urgency: 'Medium',
    requesterId: 'student_ananya_civil',
    requesterName: 'Ananya P. (Civil Engg)',
    requesterAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200',
    campusHub: 'All Campuses',
    location: 'College Main Gate (Kommadi)',
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
  },
  {
    id: 'req_campus_cycle',
    title: 'Single-Speed Bicycle for Campus & Hostel Commute',
    description: 'Looking for a sturdy Hero or Hercules cycle to travel daily from Kommadi hostel to department classes.',
    category: 'Cycles',
    urgency: 'Medium',
    requesterId: 'student_vikram_cs',
    requesterName: 'Vikram N. (CSE Hosteller)',
    requesterAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    campusHub: 'Chaitanya Engineering College',
    location: 'Boys Hostel Gate 2',
    createdAt: new Date(Date.now() - 3600000 * 36).toISOString(),
  }
];

export const CampusRequestsSection: React.FC = () => {
  const { selectedCampusHub } = useCampus();
  const { startOrGetChat } = useChat();
  const { user: currentUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [requests, setRequests] = useState<CampusRequest[]>(() => {
    try {
      const saved = localStorage.getItem('campora_campus_requests');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed reading campus requests:', e);
    }
    return DEFAULT_CAMPUS_REQUESTS;
  });

  const [modalOpen, setModalOpen] = useState(false);

  // New Request Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Books');
  const [urgency, setUrgency] = useState<'Low' | 'Medium' | 'Urgent'>('Urgent');
  const [campusHub, setCampusHub] = useState<string>(() => {
    if (selectedCampusHub && selectedCampusHub !== 'All Campuses') return selectedCampusHub;
    return currentUser?.collegeName || 'Chaitanya Engineering College';
  });
  const [location, setLocation] = useState('Central Library');
  const [guestName, setGuestName] = useState('');
  const [guestContact, setGuestContact] = useState('');

  // Filter requests matching selected campus or broad "All Campuses"
  const filteredRequests = requests.filter(r => {
    if (selectedCampusHub === 'All Campuses') return true;
    if (r.campusHub === 'All Campuses') return true;
    return r.campusHub?.toLowerCase().trim() === selectedCampusHub?.toLowerCase().trim();
  });

  const handleOpenModal = () => {
    setCampusHub(selectedCampusHub !== 'All Campuses' ? selectedCampusHub : (currentUser?.collegeName || 'Chaitanya Engineering College'));
    setModalOpen(true);
  };

  const handlePostRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error('Please enter the item name you are looking for.');
      return;
    }
    if (!description.trim()) {
      toast.error('Please provide a brief description.');
      return;
    }

    const requesterName = currentUser?.name || guestName.trim() || 'Campus Student';
    const requesterId = currentUser?.id || `guest_${Date.now()}`;

    const newReq: CampusRequest = {
      id: `req_${Date.now()}`,
      title: title.trim(),
      description: description.trim(),
      category,
      urgency,
      requesterId,
      requesterName,
      requesterAvatar: currentUser?.profilePhoto || undefined,
      campusHub: campusHub || 'Chaitanya Engineering College',
      location: location.trim() || 'College Main Gate',
      createdAt: new Date().toISOString(),
    };

    const updated = [newReq, ...requests];
    setRequests(updated);
    try {
      localStorage.setItem('campora_campus_requests', JSON.stringify(updated));
    } catch (err) {
      console.error('Failed to save to localStorage:', err);
    }

    toast.success('Your Wanted Request has been posted on the campus board!');
    setModalOpen(false);
    setTitle('');
    setDescription('');
    setGuestName('');
    setGuestContact('');
  };

  const handleDeleteRequest = (reqId: string) => {
    const updated = requests.filter(r => r.id !== reqId);
    setRequests(updated);
    try {
      localStorage.setItem('campora_campus_requests', JSON.stringify(updated));
    } catch (e) {}
    toast.success('Request marked as fulfilled and removed.');
  };

  const handleOfferItemToRequester = (req: CampusRequest) => {
    if (!isAuthenticated || !currentUser) {
      toast.error('Please log in with your college account to message this student.');
      navigate('/login');
      return;
    }

    if (currentUser.id === req.requesterId) {
      toast('This is your own wanted request!', { icon: 'ℹ️' });
      return;
    }

    // Generate a clean target product item for chat session
    const tempProduct: any = {
      id: `req_item_${req.id}`,
      title: `Wanted ISO: ${req.title}`,
      price: 0,
      sellerId: req.requesterId,
      sellerName: req.requesterName,
      sellerAvatar: req.requesterAvatar,
      sellerDepartment: req.campusHub,
      images: ['https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=400'],
    };

    const chatId = startOrGetChat(tempProduct);
    navigate(`/messages?chatId=${chatId}`);
    toast.success(`Opening conversation with ${req.requesterName}...`);
  };

  return (
    <div className="bg-[#F5EFE6] dark:bg-stone-900 rounded-2xl p-6 sm:p-8 border border-[#CFC4B3] dark:border-stone-800 shadow-sm space-y-6 transition-colors">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-widest mb-1">
            <HelpCircle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span>Campus ISO (In Search Of) Board</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-white">
            Students are looking for these items right now
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 mt-1">
            Can you help a peer on campus? Message them directly to offer your item.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenModal}
          className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 text-xs sm:text-sm font-bold transition-all shadow-sm active:scale-95 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Post Wanted Request</span>
        </button>
      </div>

      {/* Grid of Requests */}
      {filteredRequests.length === 0 ? (
        <div className="py-12 text-center rounded-xl border border-dashed border-[#CFC4B3] dark:border-stone-800 p-8 space-y-3 bg-[#E8E1D5]/40 dark:bg-stone-950/30">
          <HelpCircle className="w-10 h-10 text-stone-400 mx-auto" />
          <h3 className="text-base font-bold text-stone-800 dark:text-stone-200">
            No active student requests in {selectedCampusHub}
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 max-w-md mx-auto">
            Need an engineering textbook, scientific calculator, drafter set, or cycle? Tap below to notify peers across campus!
          </p>
          <button
            type="button"
            onClick={handleOpenModal}
            className="mt-2 inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold text-xs shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Post Wanted Request Here</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredRequests.map((req) => {
            const isMyRequest = currentUser && currentUser.id === req.requesterId;
            const isAdmin = currentUser?.role === 'ADMIN';

            return (
              <div
                key={req.id}
                className="p-5 rounded-xl bg-[#E8E1D5] dark:bg-stone-800/60 border border-[#CFC4B3] dark:border-stone-700/70 space-y-3 flex flex-col justify-between shadow-2xs hover:shadow-xs transition-shadow"
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      {req.requesterAvatar ? (
                        <img
                          src={req.requesterAvatar}
                          alt={req.requesterName}
                          className="w-9 h-9 rounded-lg object-cover ring-1 ring-stone-300 dark:ring-stone-600"
                        />
                      ) : (
                        <div className="w-9 h-9 rounded-lg bg-rose-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                          {req.requesterName.charAt(0)}
                        </div>
                      )}
                      <div>
                        <span className="font-bold text-xs sm:text-sm text-stone-900 dark:text-white block leading-tight">
                          {req.requesterName}
                        </span>
                        <span className="text-[11px] text-stone-500 dark:text-stone-400 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3 text-rose-600 dark:text-rose-400 shrink-0" />
                          <span>{req.location} • {req.campusHub}</span>
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                        req.urgency === 'Urgent'
                          ? 'bg-rose-500/15 text-rose-700 dark:text-rose-400 border border-rose-500/30'
                          : 'bg-amber-500/15 text-amber-800 dark:text-amber-400 border border-amber-500/30'
                      }`}>
                        {req.urgency}
                      </span>

                      {(isMyRequest || isAdmin) && (
                        <button
                          type="button"
                          onClick={() => handleDeleteRequest(req.id)}
                          title="Mark Fulfilled / Remove"
                          className="p-1 text-stone-400 hover:text-rose-600 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  <h3 className="font-extrabold text-stone-900 dark:text-white text-sm sm:text-base mt-3 leading-snug">
                    {req.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 mt-1.5 leading-relaxed">
                    "{req.description}"
                  </p>
                </div>

                <div className="pt-3 border-t border-[#CFC4B3] dark:border-stone-700/60 flex items-center justify-between gap-2">
                  <span className="text-[11px] font-semibold text-stone-500 dark:text-stone-400">
                    Category: <strong className="text-stone-800 dark:text-stone-200">{req.category}</strong>
                  </span>

                  <button
                    type="button"
                    onClick={() => handleOfferItemToRequester(req)}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 dark:bg-white dark:hover:bg-stone-100 text-white dark:text-stone-900 text-xs font-bold transition-all shadow-xs active:scale-95"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>{isMyRequest ? 'View In Messages' : 'Offer Item to Peer'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal for Posting Request */}
      {modalOpen && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#F5EFE6] dark:bg-stone-900 rounded-2xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-[#CFC4B3] dark:border-stone-800 space-y-5 animate-in fade-in zoom-in-95 my-8">
            
            <div className="flex items-center justify-between pb-3 border-b border-[#CFC4B3] dark:border-stone-800">
              <h3 className="text-lg font-black text-stone-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <span>Post Campus Wanted Request (ISO)</span>
              </h3>
              <button 
                type="button"
                onClick={() => setModalOpen(false)} 
                className="p-1 rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Requester Identity Info */}
            {currentUser ? (
              <div className="p-3 rounded-xl bg-[#DDD4C3] dark:bg-stone-800/80 border border-[#C5BBAA] dark:border-stone-700 flex items-center gap-3 text-xs">
                {currentUser.profilePhoto ? (
                  <img src={currentUser.profilePhoto} alt={currentUser.name} className="w-8 h-8 rounded-full object-cover" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-rose-600 text-white font-bold flex items-center justify-center">
                    {currentUser.name.charAt(0)}
                  </div>
                )}
                <div>
                  <span className="font-bold text-stone-900 dark:text-white block">Posting as {currentUser.name}</span>
                  <span className="text-stone-500 dark:text-stone-400 text-[11px]">{currentUser.collegeName || 'Verified Student'}</span>
                </div>
              </div>
            ) : (
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-300 text-xs flex items-center justify-between gap-2">
                <span>You are posting as a campus guest.</span>
                <button
                  type="button"
                  onClick={() => { setModalOpen(false); navigate('/login'); }}
                  className="font-bold underline hover:text-amber-600"
                >
                  Log In First
                </button>
              </div>
            )}

            <form onSubmit={handlePostRequest} className="space-y-4 text-xs font-semibold">
              
              {!currentUser && (
                <div>
                  <label className="block mb-1 text-stone-700 dark:text-stone-300">Your Full Name / Roll Number *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh (2024CS102)"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full p-3 rounded-lg bg-[#E8E1D5] dark:bg-stone-800 border border-[#CFC4B3] dark:border-stone-700 text-xs font-semibold text-stone-900 dark:text-white focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              )}

              <div>
                <label className="block mb-1 text-stone-700 dark:text-stone-300">What item do you need? *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. B.S. Grewal 44th Ed / Casio 991EX / Mini Drafter"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-3 rounded-lg bg-[#E8E1D5] dark:bg-stone-800 border border-[#CFC4B3] dark:border-stone-700 text-xs font-semibold text-stone-900 dark:text-white focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block mb-1 text-stone-700 dark:text-stone-300">Description & Purpose *</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Describe author, edition, model specifications, lab deadline, or target condition..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-3 rounded-lg bg-[#E8E1D5] dark:bg-stone-800 border border-[#CFC4B3] dark:border-stone-700 text-xs font-semibold text-stone-900 dark:text-white focus:ring-2 focus:ring-amber-500 resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block mb-1 text-stone-700 dark:text-stone-300">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full p-3 rounded-lg bg-[#E8E1D5] dark:bg-stone-800 border border-[#CFC4B3] dark:border-stone-700 text-xs font-semibold text-stone-900 dark:text-white focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="Books">Academic Books</option>
                    <option value="Electronics">Electronics & Gadgets</option>
                    <option value="Lab Equipment">Lab & Drawing Equipment</option>
                    <option value="Cycles">Cycles</option>
                    <option value="Campus Essentials">Hostel & Campus Essentials</option>
                    <option value="Notes">Notes & PYQs</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-1 text-stone-700 dark:text-stone-300">Urgency Level</label>
                  <select
                    value={urgency}
                    onChange={(e) => setUrgency(e.target.value as any)}
                    className="w-full p-3 rounded-lg bg-[#E8E1D5] dark:bg-stone-800 border border-[#CFC4B3] dark:border-stone-700 text-xs font-semibold text-stone-900 dark:text-white focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="Urgent">Urgent (Needed This Week)</option>
                    <option value="Medium">Medium Priority</option>
                    <option value="Low">Flexible Timeline</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block mb-1 text-stone-700 dark:text-stone-300">Campus Hub Target</label>
                  <select
                    value={campusHub}
                    onChange={(e) => setCampusHub(e.target.value)}
                    className="w-full p-3 rounded-lg bg-[#E8E1D5] dark:bg-stone-800 border border-[#CFC4B3] dark:border-stone-700 text-xs font-semibold text-stone-900 dark:text-white focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="All Campuses">All Vizag Campuses</option>
                    {CAMPUS_HUBS.filter(h => h !== 'All Campuses').map(hub => (
                      <option key={hub} value={hub}>{hub}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block mb-1 text-stone-700 dark:text-stone-300">Preferred Handover Spot</label>
                  <input
                    type="text"
                    placeholder="e.g. Central Library / Main Gate"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full p-3 rounded-lg bg-[#E8E1D5] dark:bg-stone-800 border border-[#CFC4B3] dark:border-stone-700 text-xs font-semibold text-stone-900 dark:text-white focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold text-xs sm:text-sm shadow-md transition-all mt-3 active:scale-98"
              >
                Post Request to Campus Board
              </button>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
