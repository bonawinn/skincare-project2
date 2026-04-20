import { supabase } from './supabase';
import type {
  Product, ProductSize, Kit, CommunityMember, JournalPost,
  EventItem, ShelfTile, CircleTier, Review, MockUser,
  RitualStep, Subscription, Order, CartItem, HeroCollageImage
} from './types';

export async function getProducts(): Promise<Product[]> {
  const { data } = await supabase.from('products').select('*').order('sort_order');
  return (data ?? []) as Product[];
}

export async function getProduct(id: string): Promise<Product | null> {
  const { data } = await supabase.from('products').select('*').eq('id', id).maybeSingle();
  return data as Product | null;
}

export async function getProductSizes(productId: string): Promise<ProductSize[]> {
  const { data } = await supabase.from('product_sizes').select('*').eq('product_id', productId).order('sort_order');
  return (data ?? []) as ProductSize[];
}

export async function getKits(): Promise<Kit[]> {
  const { data } = await supabase.from('kits').select('*').order('sort_order');
  return (data ?? []) as Kit[];
}

export async function getKitProductIds(kitId: string): Promise<string[]> {
  const { data } = await supabase.from('kit_products').select('product_id').eq('kit_id', kitId);
  return (data ?? []).map((r: { product_id: string }) => r.product_id);
}

export async function getCommunity(): Promise<CommunityMember[]> {
  const { data } = await supabase.from('community_members').select('*').order('sort_order');
  return (data ?? []) as CommunityMember[];
}

export async function getJournal(): Promise<JournalPost[]> {
  const { data } = await supabase.from('journal_posts').select('*');
  return (data ?? []) as JournalPost[];
}

export async function getEvents(): Promise<EventItem[]> {
  const { data } = await supabase.from('events').select('*').order('sort_order');
  return (data ?? []) as EventItem[];
}

export async function getShelfTiles(): Promise<ShelfTile[]> {
  const { data } = await supabase.from('ugc_shelf_tiles').select('*').order('sort_order');
  return (data ?? []) as ShelfTile[];
}

export async function getTiers(): Promise<CircleTier[]> {
  const { data } = await supabase.from('circle_tiers').select('*').order('sort_order');
  return (data ?? []) as CircleTier[];
}

export async function getReviews(productId: string): Promise<Review[]> {
  const { data } = await supabase.from('reviews').select('*').eq('product_id', productId).order('created_at', { ascending: false });
  return (data ?? []) as Review[];
}

export async function getMockUser(): Promise<MockUser | null> {
  const { data } = await supabase.from('mock_users').select('*').limit(1).maybeSingle();
  return data as MockUser | null;
}

export async function getRitualSteps(userId: string): Promise<RitualStep[]> {
  const { data } = await supabase.from('user_ritual_steps').select('*').eq('user_id', userId).order('step_number');
  return (data ?? []) as RitualStep[];
}

export async function toggleRitualStep(stepId: string, completed: boolean) {
  await supabase.from('user_ritual_steps').update({ completed_today: completed }).eq('id', stepId);
}

export async function getSubscriptions(userId: string): Promise<Subscription[]> {
  const { data } = await supabase.from('user_subscriptions').select('*').eq('user_id', userId);
  return (data ?? []) as Subscription[];
}

export async function getOrders(userId: string): Promise<Order[]> {
  const { data } = await supabase.from('user_orders').select('*').eq('user_id', userId);
  return (data ?? []) as Order[];
}

export async function getWishlist(userId: string): Promise<string[]> {
  const { data } = await supabase.from('user_wishlist').select('product_id').eq('user_id', userId);
  return (data ?? []).map((r: { product_id: string }) => r.product_id);
}

export async function addToWishlist(userId: string, productId: string) {
  await supabase.from('user_wishlist').insert({ user_id: userId, product_id: productId });
}

export async function removeFromWishlist(userId: string, productId: string) {
  await supabase.from('user_wishlist').delete().eq('user_id', userId).eq('product_id', productId);
}

export async function getCart(userId: string): Promise<CartItem[]> {
  const { data } = await supabase.from('cart_items').select('*').eq('user_id', userId).order('created_at');
  return (data ?? []) as CartItem[];
}

export async function addToCart(userId: string, productId: string, sizeLabel: string, quantity = 1) {
  await supabase.from('cart_items').insert({ user_id: userId, product_id: productId, size_label: sizeLabel, quantity });
}

export async function updateCartQty(id: string, quantity: number) {
  if (quantity <= 0) {
    await supabase.from('cart_items').delete().eq('id', id);
  } else {
    await supabase.from('cart_items').update({ quantity }).eq('id', id);
  }
}

export async function removeFromCart(id: string) {
  await supabase.from('cart_items').delete().eq('id', id);
}

export async function getHeroCollageImages(): Promise<HeroCollageImage[]> {
  const { data } = await supabase.from('hero_collage_images').select('*').order('sort_order');
  return (data ?? []) as HeroCollageImage[];
}
