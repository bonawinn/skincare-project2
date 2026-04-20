export type Product = {
  id: string;
  code: string;
  name: string;
  subtitle: string;
  category: string;
  ritual: string;
  sensation: string;
  price: number;
  rating: number;
  review_count: number;
  badge: string | null;
  subscribable: boolean;
  short_description: string;
  tagline: string;
  key_ingredients: string[];
  image_url: string;
  lifestyle_image_url: string;
  sort_order: number;
};

export type ProductSize = {
  id: string;
  product_id: string;
  label: string;
  price: number;
  is_default: boolean;
  sort_order: number;
};

export type Kit = {
  id: string;
  name: string;
  description: string;
  individual_total: number;
  kit_price: number;
  savings: number;
  image_url: string;
  starter: boolean;
  tsa_ready: boolean;
  sort_order: number;
};

export type CommunityMember = {
  id: string;
  name: string;
  role: string;
  location: string;
  quote: string;
  long_bio: string;
  portrait_url: string;
  featured: boolean;
  product_ids: string[];
  sort_order: number;
};

export type JournalPost = {
  id: string;
  title: string;
  category: string;
  author: string;
  read_time: string;
  excerpt: string;
  image_url: string;
  date: string;
  featured: boolean;
};

export type EventItem = {
  id: string;
  title: string;
  when_text: string;
  location: string;
  description: string;
  image_url: string;
  members_only: boolean;
};

export type ShelfTile = {
  id: string;
  image_url: string;
  caption: string;
  height_class: string;
};

export type CircleTier = {
  id: string;
  name: string;
  cost: string;
  benefits: string[];
};

export type Review = {
  id: string;
  product_id: string;
  author_name: string;
  age_range: string;
  skin_type: string;
  rating: number;
  title: string;
  body: string;
  verified: boolean;
  created_at: string;
};

export type MockUser = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  tier: string;
  points: number;
  member_since: string;
  streak: number;
};

export type RitualStep = {
  id: string;
  user_id: string;
  time_of_day: 'morning' | 'evening';
  step_number: number;
  product_id: string | null;
  custom_label: string;
  completed_today: boolean;
};

export type Subscription = {
  id: string;
  product_id: string;
  size_label: string;
  frequency_days: number;
  next_delivery: string;
  price: number;
  status: string;
};

export type Order = {
  id: string;
  placed_at: string;
  status: string;
  total: number;
  items: { name: string; size: string; price: number }[];
};

export type CartItem = {
  id: string;
  product_id: string;
  size_label: string;
  quantity: number;
};

export type HeroCollageImage = {
  id: string;
  image_url: string;
  alt_text: string;
  width_class: string;
  rotation_deg: number;
  z_index: number;
  sort_order: number;
  product_id: string | null;
};
