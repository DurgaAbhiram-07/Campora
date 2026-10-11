import matplotlib.pyplot as plt
import matplotlib.patches as patches
import os

os.makedirs('a:/olx/docs/extracted_assets/diagrams', exist_ok=True)

# 1. System Architecture
def make_architecture():
    fig, ax = plt.subplots(figsize=(10, 6.5), dpi=300)
    ax.set_xlim(0, 10)
    ax.set_ylim(0, 7)
    ax.axis('off')
    
    # Title
    ax.text(5, 6.6, 'Figure 4.1: Campora System Architecture', ha='center', va='center', fontsize=14, fontweight='bold', color='#111827')
    
    # Layers
    layers = [
        ('Presentation Layer (React + TypeScript + Vite + Tailwind CSS)', 5.5, '#E0E7FF', '#3730A3', [
            'Marketplace UI', 'Product Catalog', 'Sell / Post Item Form', 'Chat Drawer', 'User Dashboard'
        ]),
        ('Application & API Layer (Spring Boot 3 REST Controllers & WebSocket)', 4.0, '#DCFCE7', '#166534', [
            'AuthController', 'ProductController', 'WishlistController', 'UserController', 'WebSocket Stomp Chat'
        ]),
        ('Intelligence & Service Layer (AI Price Engine & Verification)', 2.5, '#FEF3C7', '#92400E', [
            'Gemini AI Pricing Model', 'Text Cleaning & Auto-Tagging', 'Fraud & Profanity Filter', 'Notification Engine'
        ]),
        ('Data & Infrastructure Layer (MySQL / PostgreSQL + Supabase + Cloudinary)', 1.0, '#FEE2E2', '#991B1B', [
            'User & Auth Tables', 'Products & Categories', 'Realtime Chat Database', 'Cloud Media Storage (S3/Cloudinary)'
        ])
    ]
    
    for title, y, bg_color, border_color, boxes in layers:
        # Layer container
        rect = patches.FancyBboxPatch((0.5, y - 0.55), 9, 1.05, boxstyle="round,pad=0.08", 
                                      ec=border_color, fc=bg_color, lw=1.8)
        ax.add_patch(rect)
        ax.text(0.7, y + 0.32, title, fontsize=10, fontweight='bold', color=border_color)
        
        # Inner components
        n = len(boxes)
        box_w = 8.6 / n
        for i, b_text in enumerate(boxes):
            bx = 0.7 + i * box_w
            b_rect = patches.FancyBboxPatch((bx, y - 0.45), box_w - 0.15, 0.65, boxstyle="round,pad=0.05",
                                           ec=border_color, fc='white', lw=1.2)
            ax.add_patch(b_rect)
            ax.text(bx + (box_w - 0.15)/2, y - 0.12, b_text, ha='center', va='center', fontsize=7.5, fontweight='bold', color='#1F2937')

    # Connecting arrows
    for y_arr in [4.88, 3.38, 1.88]:
        ax.annotate('', xy=(5, y_arr - 0.4), xytext=(5, y_arr),
                    arrowprops=dict(facecolor='#4B5563', edgecolor='#4B5563', arrowstyle='<->', lw=2))

    plt.tight_layout()
    plt.savefig('a:/olx/docs/extracted_assets/diagrams/fig4_1_architecture.png', bbox_inches='tight')
    plt.close()
    print('Generated Architecture')

# 2. Use Case Diagram
def make_usecase():
    fig, ax = plt.subplots(figsize=(9, 6.2), dpi=300)
    ax.set_xlim(0, 10)
    ax.set_ylim(0, 7)
    ax.axis('off')
    
    ax.text(5, 6.7, 'Figure 4.2.1: Campora - Use Case Diagram', ha='center', va='center', fontsize=13, fontweight='bold')
    
    # System boundary box
    sys_box = patches.Rectangle((2.3, 0.4), 5.4, 6.0, ec='#374151', fc='#F9FAFB', lw=2)
    ax.add_patch(sys_box)
    ax.text(5, 6.15, 'Campora Marketplace System', ha='center', va='center', fontsize=11, fontweight='bold', color='#1F2937')

    # Use Cases (Ovals)
    use_cases = [
        ('User Registration & Campus Auth', 5.5),
        ('Browse & Search Items', 4.8),
        ('Post Product Listing', 4.1),
        ('Get AI Smart Valuation', 3.4),
        ('Negotiate & Real-Time Chat', 2.7),
        ('Manage Wishlist & Alerts', 2.0),
        ('Review Campus Requests', 1.3),
        ('Admin Moderation & Safety Checks', 0.65)
    ]
    
    for uc_title, y in use_cases:
        ellipse = patches.Ellipse((5, y), 4.2, 0.48, ec='#2563EB', fc='#EFF6FF', lw=1.5)
        ax.add_patch(ellipse)
        ax.text(5, y, uc_title, ha='center', va='center', fontsize=8.5, fontweight='bold', color='#1E40AF')

    # Actors: Student (Left) & Campus Admin (Right)
    # Student
    ax.plot([1.0], [3.9], 'o', ms=16, color='#1F2937', mfc='none', mew=2)
    ax.plot([1.0, 1.0], [3.65, 3.0], color='#1F2937', lw=2)
    ax.plot([0.5, 1.5], [3.4, 3.4], color='#1F2937', lw=2)
    ax.plot([1.0, 0.6], [3.0, 2.3], color='#1F2937', lw=2)
    ax.plot([1.0, 1.4], [3.0, 2.3], color='#1F2937', lw=2)
    ax.text(1.0, 2.0, 'Student User\n(Buyer/Seller)', ha='center', va='center', fontsize=9, fontweight='bold')

    # Admin
    ax.plot([9.0], [3.9], 'o', ms=16, color='#1F2937', mfc='none', mew=2)
    ax.plot([9.0, 9.0], [3.65, 3.0], color='#1F2937', lw=2)
    ax.plot([8.5, 9.5], [3.4, 3.4], color='#1F2937', lw=2)
    ax.plot([9.0, 8.6], [3.0, 2.3], color='#1F2937', lw=2)
    ax.plot([9.0, 9.4], [3.0, 2.3], color='#1F2937', lw=2)
    ax.text(9.0, 2.0, 'Campus Admin /\nAI Engine', ha='center', va='center', fontsize=9, fontweight='bold')

    # Lines from Student to Use Cases 0..6
    for i in range(7):
        y = use_cases[i][1]
        ax.plot([1.4, 2.9], [3.2, y], color='#4B5563', lw=1.2, ls='-')

    # Lines from Admin to Use Cases 3 & 7
    ax.plot([8.6, 7.1], [3.2, use_cases[3][1]], color='#4B5563', lw=1.2, ls='-')
    ax.plot([8.6, 7.1], [3.2, use_cases[7][1]], color='#4B5563', lw=1.2, ls='-')

    plt.tight_layout()
    plt.savefig('a:/olx/docs/extracted_assets/diagrams/fig4_2_1_usecase.png', bbox_inches='tight')
    plt.close()
    print('Generated Use Case')

# 3. Class Diagram
def make_class_diagram():
    fig, ax = plt.subplots(figsize=(9.5, 7.5), dpi=300)
    ax.set_xlim(0, 10)
    ax.set_ylim(0, 8)
    ax.axis('off')
    
    ax.text(5, 7.7, 'Figure 4.2.2: Campora - Class Diagram', ha='center', va='center', fontsize=13, fontweight='bold')
    
    classes = [
        ('UserInterface', 5, 6.7, 3.2, 1.2, ['+renderFeed()', '+captureProductForm()', '+openChat()', '+triggerAIValuation()']),
        ('AuthController', 1.8, 5.0, 2.8, 1.2, ['-jwtService: JWT', '+registerStudent()', '+loginUser()', '+verifyCampusID()']),
        ('ProductController', 5.0, 5.0, 2.8, 1.2, ['-repo: ProductRepo', '+createListing()', '+getProducts()', '+deleteListing()']),
        ('ChatService', 8.2, 5.0, 2.8, 1.2, ['-simpMessaging: Stomp', '+sendMessage()', '+getChatHistory()', '+notifyRecipient()']),
        ('AiPricingEngine', 2.0, 3.2, 2.8, 1.2, ['-model: GeminiAPI', '+predictFairPrice()', '+cleanText()', '+suggestTags()']),
        ('DatabaseManager', 5.0, 3.2, 2.8, 1.2, ['-dataSource: JPA/MySQL', '+saveRecord()', '+fetchQuery()', '+syncSupabase()']),
        ('WishlistService', 8.0, 3.2, 2.8, 1.2, ['-repo: WishlistRepo', '+addToWishlist()', '+removeWishlist()', '+getUserWishlist()']),
        ('ReportGenerator', 5.0, 1.4, 3.2, 1.2, ['-analyticsEngine: Service', '+generateAnalytics()', '+getTrendingItems()', '+getSellerRating()'])
    ]
    
    for name, cx, cy, w, h, methods in classes:
        rect = patches.FancyBboxPatch((cx - w/2, cy - h/2), w, h, boxstyle="round,pad=0.03", ec='#1E3A8A', fc='#EFF6FF', lw=1.5)
        ax.add_patch(rect)
        # Class Header
        hdr_rect = patches.Rectangle((cx - w/2, cy + h/2 - 0.35), w, 0.35, ec='#1E3A8A', fc='#3B82F6', lw=1.5)
        ax.add_patch(hdr_rect)
        ax.text(cx, cy + h/2 - 0.18, name, ha='center', va='center', fontsize=8.5, fontweight='bold', color='white')
        # Methods
        for m_idx, m_txt in enumerate(methods):
            ax.text(cx - w/2 + 0.1, cy + h/2 - 0.5 - (m_idx * 0.18), m_txt, fontsize=7, color='#1F2937', fontfamily='monospace')

    # Connectors
    # UI -> Controllers
    ax.annotate('', xy=(1.8, 5.6), xytext=(4.0, 6.1), arrowprops=dict(facecolor='#4B5563', arrowstyle='->', lw=1.3))
    ax.annotate('', xy=(5.0, 5.6), xytext=(5.0, 6.1), arrowprops=dict(facecolor='#4B5563', arrowstyle='->', lw=1.3))
    ax.annotate('', xy=(8.2, 5.6), xytext=(6.0, 6.1), arrowprops=dict(facecolor='#4B5563', arrowstyle='->', lw=1.3))
    # Controllers -> Services / DB
    ax.annotate('', xy=(2.0, 3.8), xytext=(4.5, 4.4), arrowprops=dict(facecolor='#4B5563', arrowstyle='->', lw=1.3))
    ax.annotate('', xy=(5.0, 3.8), xytext=(5.0, 4.4), arrowprops=dict(facecolor='#4B5563', arrowstyle='->', lw=1.3))
    ax.annotate('', xy=(8.0, 3.8), xytext=(8.2, 4.4), arrowprops=dict(facecolor='#4B5563', arrowstyle='->', lw=1.3))
    # DB -> ReportGenerator
    ax.annotate('', xy=(5.0, 2.0), xytext=(5.0, 2.6), arrowprops=dict(facecolor='#4B5563', arrowstyle='->', lw=1.3))

    plt.tight_layout()
    plt.savefig('a:/olx/docs/extracted_assets/diagrams/fig4_2_2_class.png', bbox_inches='tight')
    plt.close()
    print('Generated Class Diagram')

# 4. Activity Diagram
def make_activity_diagram():
    fig, ax = plt.subplots(figsize=(6, 8), dpi=300)
    ax.set_xlim(0, 6)
    ax.set_ylim(0, 9)
    ax.axis('off')
    
    ax.text(3, 8.7, 'Figure 4.2.3: Campora - Activity Diagram\n(Product Listing & AI Smart Appraisal)', ha='center', va='center', fontsize=11, fontweight='bold')
    
    # Start Node
    ax.plot([3], [8.1], 'o', ms=14, color='#111827')
    
    steps = [
        ('User initiates "Sell Item" form', 7.4),
        ('Input Title, Category, Condition & Photos', 6.6),
        ('Trigger AI Price Appraisal Service', 5.8),
        ('AI Computes Fair Price Range & Tags', 5.0),
        ('User Reviews & Finalizes Listing Price', 4.2),
        ('Submit Listing to Spring Boot REST API', 3.4),
        ('Validate JWT Auth & Store in Database', 2.6),
        ('Publish Live to Campus Marketplace Feed', 1.8),
        ('Notify Interested Campus Wishlist Users', 1.0)
    ]
    
    curr_y = 8.1
    for title, y in steps:
        # Arrow
        ax.annotate('', xy=(3, y + 0.28), xytext=(3, curr_y - (0.15 if curr_y==8.1 else 0.28)),
                    arrowprops=dict(facecolor='#374151', edgecolor='#374151', arrowstyle='->', lw=1.5))
        # Box
        rect = patches.FancyBboxPatch((0.8, y - 0.26), 4.4, 0.52, boxstyle="round,pad=0.08", ec='#2563EB', fc='#EFF6FF', lw=1.4)
        ax.add_patch(rect)
        ax.text(3, y, title, ha='center', va='center', fontsize=8.5, fontweight='bold', color='#1E40AF')
        curr_y = y

    # End Node
    ax.annotate('', xy=(3, 0.45), xytext=(3, 0.72),
                arrowprops=dict(facecolor='#374151', edgecolor='#374151', arrowstyle='->', lw=1.5))
    ax.plot([3], [0.3], 'o', ms=14, color='#111827', mfc='none', mew=2)
    ax.plot([3], [0.3], 'o', ms=8, color='#111827')

    plt.tight_layout()
    plt.savefig('a:/olx/docs/extracted_assets/diagrams/fig4_2_3_activity.png', bbox_inches='tight')
    plt.close()
    print('Generated Activity Diagram')

# 5. Sequence Diagram
def make_sequence_diagram():
    fig, ax = plt.subplots(figsize=(8.5, 6.5), dpi=300)
    ax.set_xlim(0, 10)
    ax.set_ylim(0, 7.5)
    ax.axis('off')
    
    ax.text(5, 7.2, 'Figure 4.2.4: Campora - Sequence Diagram (Product Listing & Negotiation Flow)', ha='center', va='center', fontsize=12, fontweight='bold')
    
    lifelines = [
        ('Student Buyer', 1.2),
        ('Frontend UI', 3.4),
        ('ProductController', 5.6),
        ('AI Engine', 7.6),
        ('DatabaseManager', 9.2)
    ]
    
    for name, x in lifelines:
        # Box
        rect = patches.Rectangle((x - 0.9, 6.4), 1.8, 0.5, ec='#1E3A8A', fc='#DBEAFE', lw=1.5)
        ax.add_patch(rect)
        ax.text(x, 6.65, name, ha='center', va='center', fontsize=8, fontweight='bold', color='#1E40AF')
        # Dashed line
        ax.plot([x, x], [6.4, 0.6], color='#9CA3AF', ls='--', lw=1.2)

    messages = [
        (1.2, 3.4, 5.8, '1. Browse marketplace & select item'),
        (3.4, 5.6, 5.1, '2. GET /api/products/{id}'),
        (5.6, 9.2, 4.4, '3. Query product & seller profile'),
        (9.2, 5.6, 3.7, '4. Return product details'),
        (5.6, 7.6, 3.0, '5. Request price benchmark check'),
        (7.6, 5.6, 2.3, '6. Return fair market estimate'),
        (5.6, 3.4, 1.6, '7. Render verified item & price badge'),
        (3.4, 1.2, 0.9, '8. Display item & direct chat drawer')
    ]
    
    for x1, x2, y, text in messages:
        ax.annotate('', xy=(x2, y), xytext=(x1, y),
                    arrowprops=dict(facecolor='#2563EB', edgecolor='#2563EB', arrowstyle='->', lw=1.3))
        ax.text((x1 + x2)/2, y + 0.15, text, ha='center', va='center', fontsize=7.5, color='#1F2937')

    plt.tight_layout()
    plt.savefig('a:/olx/docs/extracted_assets/diagrams/fig4_2_4_sequence.png', bbox_inches='tight')
    plt.close()
    print('Generated Sequence Diagram')

# 6. Data Flow Overview (DFD)
def make_dfd():
    fig, ax = plt.subplots(figsize=(6.5, 7.5), dpi=300)
    ax.set_xlim(0, 6)
    ax.set_ylim(0, 8)
    ax.axis('off')
    
    ax.text(3, 7.6, 'Figure 4.3: Campora - Data Flow Overview', ha='center', va='center', fontsize=12, fontweight='bold')
    
    blocks = [
        ('Student Input\n(Listing Form / Search / Message)', 6.7, '#EFF6FF', '#2563EB'),
        ('Input Sanitizer & Token Validation\n(AuthGuard / Filter Preprocessor)', 5.3, '#F0FDF4', '#16A34A'),
        ('AI Intelligence Pipeline\n(Price Appraisal, Category NLP, Moderation)', 3.9, '#FEF3C7', '#D97706'),
        ('Spring Boot Service Bus\n(Business Logic, WebSocket Dispatcher)', 2.5, '#F5F3FF', '#7C3AED'),
        ('Relational Database & Cloud Storage\n(MySQL Persistence, Supabase Media)', 1.1, '#FEE2E2', '#DC2626')
    ]
    
    curr_y = 7.2
    for title, y, fc, ec in blocks:
        if curr_y != 7.2:
            ax.annotate('', xy=(3, y + 0.45), xytext=(3, curr_y - 0.45),
                        arrowprops=dict(facecolor='#4B5563', edgecolor='#4B5563', arrowstyle='->', lw=1.8))
        rect = patches.FancyBboxPatch((0.8, y - 0.42), 4.4, 0.84, boxstyle="round,pad=0.08", ec=ec, fc=fc, lw=1.6)
        ax.add_patch(rect)
        ax.text(3, y, title, ha='center', va='center', fontsize=8.5, fontweight='bold', color='#1F2937')
        curr_y = y

    plt.tight_layout()
    plt.savefig('a:/olx/docs/extracted_assets/diagrams/fig4_3_dfd.png', bbox_inches='tight')
    plt.close()
    print('Generated DFD')

if __name__ == '__main__':
    make_architecture()
    make_usecase()
    make_class_diagram()
    make_activity_diagram()
    make_sequence_diagram()
    make_dfd()
    print('All diagrams created successfully!')
