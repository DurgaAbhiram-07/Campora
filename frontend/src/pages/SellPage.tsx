import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, X, FileText, Tag, MapPin, CheckCircle, Plus } from 'lucide-react';
import { CATEGORIES_LIST } from '../components/CategoriesSection';
import { useProducts } from '../context/ProductContext';
import { useAuth } from '../context/AuthContext';
import { useCampus } from '../context/CampusContext';
import { ProductCategory, ProductCondition } from '../types/product';
import toast from 'react-hot-toast';

export const SellPage: React.FC = () => {
  const navigate = useNavigate();
  const { addProduct } = useProducts();
  const { user } = useAuth();
  const { selectedCampusHub } = useCampus();

  const [images, setImages] = useState<string[]>([]);
  const [imageUrlInput, setImageUrlInput] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ProductCategory>('Electronics');
  const [listingType, setListingType] = useState<'SELL' | 'RENT' | 'EXCHANGE'>('SELL');
  const [price, setPrice] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [rentPricePerDay, setRentPricePerDay] = useState('');
  const [condition, setCondition] = useState<ProductCondition>('Like New');
  const [location, setLocation] = useState('Central Library Grounds');
  const [department, setDepartment] = useState(user?.department || 'Computer Science');
  const [negotiable, setNegotiable] = useState(true);
  const [deliveryAvailable, setDeliveryAvailable] = useState(true);
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');

  const collegeName = user?.collegeName || (selectedCampusHub !== 'All Campuses' ? selectedCampusHub : 'Chaitanya Engineering College');

  const handleInsertTemplate = () => {
    const template = `• Branch / Semester: ${department} • ${user?.year || 'Current'}\n• Item Condition: ${condition} (tested & functional)\n• Included Components: Original unit & accessories\n• Reason for selling: Completed course / exam\n• Handover Location: ${location || 'College Main Gate or Central Library'}`;
    setDescription(prev => prev ? prev + '\n\n' + template : template);
    toast.success('Inserted structured item template');
  };

  const handleImageAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const url = URL.createObjectURL(files[0]);
      if (images.length < 10) {
        setImages(prev => [...prev, url]);
      } else {
        toast.error('Maximum 10 photos allowed!');
      }
    }
  };

  const handleAddImageUrl = () => {
    if (!imageUrlInput.trim()) return;
    if (images.length >= 10) {
      toast.error('Maximum 10 photos allowed!');
      return;
    }
    setImages(prev => [...prev, imageUrlInput.trim()]);
    setImageUrlInput('');
    toast.success('Photo URL added!');
  };

  const handleRemoveImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !price || !category) {
      toast.error('Please fill in title, price, and category!');
      return;
    }

    const parsedPrice = parseFloat(price);
    const parsedOriginal = parseFloat(originalPrice);
    const parsedRent = parseFloat(rentPricePerDay);

    addProduct({
      title,
      description: description || 'Clean campus item in verified condition.',
      price: isNaN(parsedPrice) ? 0 : parsedPrice,
      originalPrice: isNaN(parsedOriginal) ? undefined : parsedOriginal,
      listingType,
      rentPricePerDay: isNaN(parsedRent) ? undefined : parsedRent,
      category,
      condition,
      images: images.length > 0 ? images : ['https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&q=80&w=800'],
      sellerId: user?.id || `user_${Date.now()}`,
      sellerName: user?.name || 'Campus Student',
      sellerAvatar: user?.profilePhoto,
      sellerDepartment: user?.department || 'Computer Science',
      sellerYear: user?.year || '1st Year',
      sellerCollege: collegeName,
      sellerVerified: true,
      sellerPhone: user?.phone || '',
      college: collegeName,
      department: department || user?.department || 'Computer Science',
      location: location || 'Campus Main Block',
      negotiable,
      deliveryAvailable,
      tags: tags ? tags.split(',').map(t => t.trim()) : [category],
    });

    navigate('/dashboard?tab=listings');
  };

  return (
    <div className="min-h-screen py-12 bg-[#E8E1D5] dark:bg-black transition-colors">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-8 space-y-2">
          <h1 className="text-3xl font-black text-stone-900 dark:text-white">Post a Campus Listing</h1>
          <p className="text-xs text-stone-500">Sell books, gadgets, campus gear, or cycles directly to campus peers.</p>
        </div>

        <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-6 sm:p-10 border border-[#CFC4B3] dark:border-stone-800 space-y-8">
          
          {/* Multi Image Drag Drop Uploader */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-stone-900 dark:text-white block">
              Product Photos (Max 10 Images)
            </label>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {images.map((img, idx) => (
                <div key={idx} className="relative aspect-square rounded-lg overflow-hidden group border border-stone-200 dark:border-stone-700 bg-stone-900">
                  <img src={img} alt="" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(idx)}
                    className="absolute top-2 right-2 p-1.5 rounded-md bg-stone-900/80 text-white hover:bg-rose-600 transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}

              {images.length < 10 && (
                <label className="aspect-square rounded-lg border-2 border-dashed border-stone-300 dark:border-stone-700 hover:border-rose-500 flex flex-col items-center justify-center cursor-pointer transition-colors p-4 text-center">
                  <Upload className="w-6 h-6 text-rose-500 mb-1" />
                  <span className="text-[11px] font-semibold text-stone-500">Upload File</span>
                  <input type="file" accept="image/*" onChange={handleImageAdd} className="hidden" />
                </label>
              )}
            </div>

            <div className="flex gap-2 pt-1">
              <input
                type="url"
                placeholder="Or paste image URL (e.g. https://...)"
                value={imageUrlInput}
                onChange={(e) => setImageUrlInput(e.target.value)}
                className="flex-1 p-2.5 rounded-lg bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-medium"
              />
              <button
                type="button"
                onClick={handleAddImageUrl}
                className="px-4 py-2.5 rounded-lg bg-stone-900 dark:bg-white text-white dark:text-stone-900 text-xs font-bold hover:opacity-90 transition-opacity shrink-0"
              >
                + Add Link
              </button>
            </div>
          </div>

          {/* Title & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="text-xs font-bold text-stone-700 dark:text-stone-300 block mb-1.5">Item Title</label>
              <input
                type="text"
                placeholder="e.g. MacBook Air M2 or CLRS 4th Ed"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full p-3 rounded-lg bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-semibold focus:ring-2 focus:ring-rose-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-stone-700 dark:text-stone-300 block mb-1.5">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ProductCategory)}
                className="w-full p-3 rounded-lg bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-semibold"
              >
                {CATEGORIES_LIST.map(c => (
                  <option key={c.name} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Price, Condition, Location */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <label className="text-xs font-bold text-stone-700 dark:text-stone-300 block mb-1.5">Price (₹)</label>
              <input
                type="number"
                placeholder="e.g. 4500"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                className="w-full p-3 rounded-lg bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-semibold"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-stone-700 dark:text-stone-300 block mb-1.5">Condition</label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value as ProductCondition)}
                className="w-full p-3 rounded-lg bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-semibold"
              >
                <option value="Like New">Like New</option>
                <option value="Good">Good</option>
                <option value="Fair">Fair</option>
                <option value="Refurbished">Refurbished</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-stone-700 dark:text-stone-300 block mb-1.5">Handover Location</label>
              <input
                type="text"
                placeholder="e.g. Central Library Grounds"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full p-3 rounded-lg bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-semibold"
              />
            </div>
          </div>

          {/* Description with Structured Template Helper */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-stone-700 dark:text-stone-300">Detailed Description</label>
              <button
                type="button"
                onClick={handleInsertTemplate}
                className="px-3 py-1.5 rounded-lg border border-stone-300 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 font-semibold text-xs flex items-center gap-1.5 transition-colors"
              >
                <FileText className="w-3.5 h-3.5 text-stone-500" /> Insert Details Template
              </button>
            </div>
            <textarea
              rows={6}
              placeholder="Describe condition, syllabus edition, included accessories, or reasons for selling..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-4 rounded-lg bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-medium focus:ring-2 focus:ring-rose-500"
            />
          </div>

          {/* Checkboxes */}
          <div className="flex flex-wrap gap-6 pt-2 text-xs font-semibold">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={negotiable}
                onChange={(e) => setNegotiable(e.target.checked)}
                className="w-4 h-4 accent-rose-600 rounded"
              />
              <span>Price Negotiable</span>
            </label>
          </div>

          {/* Submit CTA */}
          <button
            type="submit"
            className="w-full py-3.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm shadow-md transition-colors"
          >
            Publish Listing Immediately
          </button>

        </form>

      </div>
    </div>
  );
};

