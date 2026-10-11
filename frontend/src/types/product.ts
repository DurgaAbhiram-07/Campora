export type ProductCategory = 
  | 'Books' 
  | 'Electronics' 
  | 'Furniture' 
  | 'Campus Essentials' 
  | 'Vehicles' 
  | 'Notes' 
  | 'Lab Equipment' 
  | 'Sports' 
  | 'Fashion' 
  | 'Services' 
  | 'Projects' 
  | 'Others';

export type ProductCondition = 'Like New' | 'Good' | 'Fair' | 'Refurbished';

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  listingType?: 'SELL' | 'RENT' | 'EXCHANGE';
  rentPricePerDay?: number;
  category: ProductCategory;
  condition: ProductCondition;
  images: string[];
  sellerId: string;
  sellerName: string;
  sellerAvatar?: string;
  sellerDepartment: string;
  sellerYear?: string;
  sellerCollege: string;
  sellerVerified: boolean;
  sellerPhone?: string;
  college: string;
  campusHub?: string;
  department: string;
  location: string; // e.g. "Main Campus Center" or "Library Lawn"
  latitude?: number;
  longitude?: number;
  negotiable: boolean;
  deliveryAvailable: boolean;
  wishlistCount: number;
  views: number;
  status: 'ACTIVE' | 'SOLD' | 'RESERVED' | 'REJECTED';
  tags: string[];
  createdAt: string;
}

export interface CampusRequest {
  id: string;
  title: string;
  description: string;
  category: string;
  urgency: 'Low' | 'Medium' | 'Urgent';
  requesterId: string;
  requesterName: string;
  requesterAvatar?: string;
  campusHub: string;
  location: string;
  createdAt: string;
  fulfilled?: boolean;
}

export interface FilterState {
  searchQuery: string;
  category: ProductCategory | 'All';
  minPrice: number;
  maxPrice: number;
  condition: string;
  department: string;
  negotiableOnly: boolean;
  verifiedOnly: boolean;
  sortBy: 'newest' | 'price-low' | 'price-high' | 'popular';
}
