import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Heart, Share2, ShieldCheck, MapPin, Phone, MessageSquare, 
  Tag, AlertTriangle, Eye, Sparkles, Check, ArrowLeft, Trash2, PackageX 
} from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useProducts } from '../context/ProductContext';
import { useChat } from '../context/ChatContext';
import { useAuth } from '../context/AuthContext';
import { VerificationBadge } from '../components/VerificationBadge';
import { ProductCard } from '../components/ProductCard';
import toast from 'react-hot-toast';

export const ProductDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { products, deleteProduct } = useProducts();
  const { startOrGetChat } = useChat();

  const product = products.find(p => p.id === id);
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [offerModalOpen, setOfferModalOpen] = useState(false);
  const [offerAmount, setOfferAmount] = useState(product ? product.price : 0);
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  useEffect(() => {
    setActiveImgIndex(0);
    if (product) {
      setOfferAmount(product.price);
    }
  }, [id, product]);

  if (!product) {
    return (
      <div className="min-h-screen py-20 bg-[#E8E1D5] dark:bg-black flex items-center justify-center px-4">
        <div className="text-center space-y-4 max-w-md glass-card p-10 rounded-3xl border border-[#CFC4B3] dark:border-stone-800 shadow-xl">
          <div className="w-16 h-16 rounded-3xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center mx-auto">
            <PackageX className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-stone-900 dark:text-white">Listing Not Found</h2>
          <p className="text-xs text-stone-500 leading-relaxed">
            The item listing you are looking for does not exist or may have been removed by the campus owner.
          </p>
          <Link
            to="/marketplace"
            className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Marketplace
          </Link>
        </div>
      </div>
    );
  }

  const isOwner = Boolean(user && product.sellerId === user.id);
  const wishlisted = isInWishlist(product.id);

  const handleChatNow = () => {
    const chatId = startOrGetChat(product);
    navigate(`/messages?chatId=${chatId}`);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Listing link copied to clipboard!');
  };

  const handleSendOffer = () => {
    toast.success(`Offer of ₹${offerAmount.toLocaleString()} sent to ${product.sellerName}!`);
    setOfferModalOpen(false);
  };

  const handleReport = (reason: string) => {
    toast.success(`Report submitted for review by Campus Admin.`);
    setReportModalOpen(false);
  };

  return (
    <div className="min-h-screen py-10 bg-[#E8E1D5] dark:bg-black transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Back Link */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-xs font-semibold text-stone-500 hover:text-rose-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Marketplace
        </button>

        {/* Product Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Gallery Section */}
          <div className="lg:col-span-7 space-y-4">
            {/* Main Featured Image */}
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden glass-card border border-stone-200 dark:border-stone-800 bg-stone-900 shadow-xl">
              <img
                src={product.images[activeImgIndex] || product.images[0]}
                alt={product.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-stone-900/80 backdrop-blur-md text-white">
                  {product.condition}
                </span>
                {product.negotiable && (
                  <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-amber-500 backdrop-blur-md text-stone-950 flex items-center gap-1">
                    <Tag className="w-3 h-3" /> Negotiable
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnail Row */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImgIndex(idx)}
                    className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                      activeImgIndex === idx ? 'border-rose-600 scale-105 shadow-md' : 'border-transparent opacity-70'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Product Summary & Seller Card */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="glass-card rounded-xl p-6 border border-stone-200/80 dark:border-stone-800 space-y-6">
              
              <div>
                <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
                  <span className="font-bold text-rose-600 uppercase tracking-wider">{product.category}</span>
                  <div className="flex items-center gap-3">
                    <button onClick={handleShare} className="hover:text-rose-600" title="Share">
                      <Share2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => toggleWishlist(product.id)} className="hover:text-rose-500">
                      <Heart className={`w-4 h-4 ${wishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
                    </button>
                  </div>
                </div>

                <h1 className="text-2xl font-black text-stone-900 dark:text-white leading-snug">{product.title}</h1>
                
                <div className="flex items-baseline justify-between mt-4">
                  <div className="text-3xl font-black text-rose-600 dark:text-rose-400">
                    ₹{product.price.toLocaleString('en-IN')}
                  </div>
                  <div className="text-xs text-stone-400 flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5" />
                    <span>{product.views} views</span>
                  </div>
                </div>
              </div>

              {/* Location & Tags */}
              <div className="p-4 rounded-lg bg-stone-100 dark:bg-stone-800/60 space-y-2 text-xs">
                <div className="flex items-center gap-2 text-stone-700 dark:text-stone-300 font-medium">
                  <MapPin className="w-4 h-4 text-rose-500 shrink-0" />
                  <span>Handover Location: <strong>{product.location}</strong></span>
                </div>
                <div className="flex items-center gap-2 text-stone-500">
                  <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Campus Department: <strong>{product.department}</strong></span>
                </div>
              </div>

              {/* Seller Profile Box */}
              <div className="p-4 rounded-lg border border-stone-200 dark:border-stone-700 space-y-3">
                <div className="flex items-center justify-between">
                  <Link 
                    to={`/profile/${product.sellerId}`}
                    className="flex items-center gap-3 group hover:opacity-90 transition-opacity"
                  >
                    {product.sellerAvatar ? (
                      <img
                        src={product.sellerAvatar}
                        alt={product.sellerName}
                        className="w-12 h-12 rounded-full object-cover ring-2 ring-transparent group-hover:ring-emerald-500 transition-all"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white font-bold text-base shadow-sm shrink-0">
                        {product.sellerName ? product.sellerName.charAt(0).toUpperCase() : 'S'}
                      </div>
                    )}
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-bold text-sm text-stone-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                          {product.sellerName}
                        </h4>
                        <VerificationBadge />
                      </div>
                      <p className="text-xs text-stone-500">{product.sellerDepartment} • {product.sellerYear || 'Student'}</p>
                    </div>
                  </Link>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button
                    onClick={handleChatNow}
                    className="py-3 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-sm transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" /> Chat Now
                  </button>

                  {product.sellerPhone ? (
                    <a
                      href={`tel:${product.sellerPhone}`}
                      className="py-3 rounded-lg border border-stone-300 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200 font-semibold text-xs flex items-center justify-center gap-2 transition-all"
                    >
                      <Phone className="w-4 h-4 text-emerald-500" /> Call Seller
                    </a>
                  ) : (
                    <button
                      onClick={handleChatNow}
                      className="py-3 rounded-lg border border-stone-300 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200 font-semibold text-xs flex items-center justify-center gap-2 transition-all"
                    >
                      <MessageSquare className="w-4 h-4 text-emerald-500" /> Message
                    </button>
                  )}
                </div>

                {product.negotiable && (
                  <button
                    onClick={() => setOfferModalOpen(true)}
                    className="w-full py-2.5 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 font-semibold text-xs hover:bg-amber-500/20 transition-colors"
                  >
                    Make an Offer
                  </button>
                )}

                {isOwner && (
                  <button
                    onClick={() => setDeleteModalOpen(true)}
                    className="w-full py-3 rounded-lg bg-rose-600/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 font-bold text-xs hover:bg-rose-600 hover:text-white transition-all flex items-center justify-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" /> Delete My Listing
                  </button>
                )}
              </div>

              {/* Report Button */}
              <button
                onClick={() => setReportModalOpen(true)}
                className="w-full text-center text-xs text-stone-400 hover:text-rose-500 flex items-center justify-center gap-1"
              >
                <AlertTriangle className="w-3.5 h-3.5" /> Report listing to Campus Safety
              </button>

            </div>

          </div>

        </div>

        {/* Description & Specifications */}
        <div className="glass-card rounded-xl p-8 border border-stone-200/80 dark:border-stone-800 space-y-4">
          <h3 className="font-bold text-lg text-stone-900 dark:text-white">Product Description</h3>
          <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed whitespace-pre-line">
            {product.description}
          </p>
        </div>

        {/* Similar Items */}
        {products.filter(p => p.id !== product.id).length > 0 && (
          <div className="space-y-6">
            <h3 className="font-bold text-xl text-stone-900 dark:text-white">Similar Campus Listings</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.filter(p => p.id !== product.id).slice(0, 3).map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Offer Modal */}
      {offerModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-md">
          <div className="w-full max-w-md glass-modal rounded-xl p-6 space-y-4 border border-stone-200 dark:border-stone-800">
            <h3 className="font-bold text-base">Make an Offer to {product.sellerName}</h3>
            <div>
              <label className="text-xs text-stone-500 font-medium">Your Offer Price (₹)</label>
              <input
                type="number"
                value={offerAmount}
                onChange={(e) => setOfferAmount(Number(e.target.value))}
                className="w-full mt-1 p-3 rounded-lg bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-sm font-bold"
              />
            </div>
            <div className="flex gap-3 pt-2">
              <button onClick={() => setOfferModalOpen(false)} className="flex-1 py-2.5 rounded-lg border text-xs">Cancel</button>
              <button onClick={handleSendOffer} className="flex-1 py-2.5 rounded-lg bg-rose-600 text-white text-xs font-semibold">Send Offer</button>
            </div>
          </div>
        </div>
      )}

      {/* Report Modal */}
      {reportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-md">
          <div className="w-full max-w-md glass-modal rounded-xl p-6 space-y-4 border border-stone-200 dark:border-stone-800">
            <h3 className="font-bold text-base">Report Listing</h3>
            <p className="text-xs text-stone-500">Why are you reporting this product?</p>
            <div className="space-y-2 text-xs">
              {['Prohibited Item / Code Violation', 'Incorrect Information / Scam', 'Spam or Offensive Content'].map(r => (
                <button
                  key={r}
                  onClick={() => handleReport(r)}
                  className="w-full p-3 rounded-lg bg-stone-100 dark:bg-stone-800 text-left hover:bg-rose-500/10 hover:text-rose-500 font-medium transition-colors"
                >
                  {r}
                </button>
              ))}
            </div>
            <button onClick={() => setReportModalOpen(false)} className="w-full py-2.5 rounded-lg border text-xs">Cancel</button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-md">
          <div className="w-full max-w-md glass-modal rounded-xl p-6 space-y-4 border border-stone-200 dark:border-stone-800 shadow-2xl">
            <div className="w-12 h-12 rounded-lg bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <div className="text-center space-y-2">
              <h3 className="font-bold text-lg text-stone-900 dark:text-white">Delete Campus Listing?</h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                Are you sure you want to permanently delete <strong className="text-stone-800 dark:text-stone-200">"{product.title}"</strong>? This action cannot be undone.
              </p>
            </div>
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setDeleteModalOpen(false)}
                className="flex-1 py-3 rounded-lg border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 font-semibold text-xs hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  deleteProduct(product.id);
                  setDeleteModalOpen(false);
                  navigate('/dashboard?tab=listings');
                }}
                className="flex-1 py-3 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md transition-colors"
              >
                Delete Listing
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
