export type CategoryId = 'all' | 'coffee' | 'pastries' | 'desserts' | 'savory' | 'beverages';

export interface CustomizationOption {
  id: string;
  name: string;
  price: number;
}

export interface CustomizationGroup {
  id: string;
  name: string;
  nameAr?: string;
  required: boolean;
  options: CustomizationOption[];
}

export interface MenuItem {
  id: string;
  title: string;
  titleAr?: string;
  description: string;
  price: number;
  category: CategoryId;
  image: string;
  calories?: number;
  tags?: string[];
  customizations?: {
    sizes?: CustomizationOption[];
    milkOptions?: CustomizationOption[];
    sweetnessOptions?: CustomizationOption[];
    addOns?: CustomizationOption[];
  };
}

export interface CartItem {
  cartItemId: string;
  item: MenuItem;
  quantity: number;
  selectedSize?: CustomizationOption;
  selectedMilk?: CustomizationOption;
  selectedSweetness?: CustomizationOption;
  selectedAddons: CustomizationOption[];
  specialNotes?: string;
  itemTotalPrice: number;
}

export type OrderTrafficLevel = 'Low' | 'Medium' | 'High';

export interface StoreBranch {
  id: string;
  name: string;
  nameAr: string;
  address: string;
  city: string;
  phone: string;
  hours: string;
  orderTraffic: OrderTrafficLevel;
  illustration?: string;
  isPopular?: boolean;
}

export type OrderStatus = 'Received' | 'Preparing' | 'Ready for Pickup' | 'Completed' | 'Cancelled';

export interface CustomerInfo {
  name: string;
  phone: string;
  email?: string;
  pickupNotes?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  customerInfo: CustomerInfo;
  branch: StoreBranch;
  pickupTime: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: OrderStatus;
  estimatedMinutes: number;
  paymentMethod: 'Pay at Store Counter';
}
