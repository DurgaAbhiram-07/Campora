export interface AnalyticsStats {
  totalUsers: number;
  totalProducts: number;
  totalSales: number;
  activeListings: number;
  pendingVerifications: number;
  reportedProducts: number;
  categoryDistribution: { category: string; count: number }[];
  weeklyActivity: { day: string; visitors: number; sales: number }[];
}

export interface VerificationRequest {
  id: string;
  userId: string;
  userName: string;
  collegeId: string;
  department: string;
  year: string;
  idCardUrl: string;
  submittedAt: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
}

export interface ProductReport {
  id: string;
  productId: string;
  productTitle: string;
  reporterId: string;
  reporterName: string;
  reason: string;
  status: 'PENDING' | 'RESOLVED' | 'DISMISSED';
  createdAt: string;
}
