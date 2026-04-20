/*
  # SIZS Prototype 2 — Schema and Seed Data

  1. New Tables
    - products: core product catalog (code, name, subtitle, category, ritual, sensation, price, badge, rating, etc.)
    - product_sizes: size variants per product
    - kits: discovery sets / bundles
    - kit_products: many-to-many between kits and products
    - reviews: product reviews
    - community_members: featured members and testimonials
    - journal_posts: editorial content
    - events: gatherings
    - ugc_shelf_tiles: the shelf mosaic images
    - circle_tiers: loyalty program tiers
    - mock_users: the mock signed-in user (single row)
    - user_ritual_steps: morning + evening ritual steps for the mock user
    - user_subscriptions: mock user subscriptions
    - user_orders: mock user orders
    - user_wishlist: mock user wishlist
    - cart_items: cart state for the mock user

  2. Security
    - RLS enabled on every table
    - Public read policies for catalog tables (products, kits, reviews, etc.)
    - Authenticated-only policies for user-scoped tables; since we use a mock user
      pattern (no real auth yet), we allow anonymous read/write on user-scoped
      tables so the demo renders. This is for a demo prototype only.
*/

-- CATALOG TABLES
CREATE TABLE IF NOT EXISTS products (
  id text PRIMARY KEY,
  code text NOT NULL,
  name text NOT NULL,
  subtitle text NOT NULL DEFAULT '',
  category text NOT NULL DEFAULT 'skin',
  ritual text NOT NULL DEFAULT 'morning',
  sensation text NOT NULL DEFAULT 'calm',
  price numeric NOT NULL DEFAULT 0,
  rating numeric NOT NULL DEFAULT 0,
  review_count integer NOT NULL DEFAULT 0,
  badge text DEFAULT '',
  subscribable boolean NOT NULL DEFAULT true,
  short_description text NOT NULL DEFAULT '',
  tagline text NOT NULL DEFAULT '',
  key_ingredients jsonb NOT NULL DEFAULT '[]'::jsonb,
  image_url text NOT NULL DEFAULT '',
  lifestyle_image_url text NOT NULL DEFAULT '',
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS product_sizes (
  id text PRIMARY KEY,
  product_id text NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  label text NOT NULL,
  price numeric NOT NULL DEFAULT 0,
  is_default boolean NOT NULL DEFAULT false,
  sort_order integer NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS kits (
  id text PRIMARY KEY,
  name text NOT NULL,
  description text NOT NULL DEFAULT '',
  individual_total numeric NOT NULL DEFAULT 0,
  kit_price numeric NOT NULL DEFAULT 0,
  savings numeric NOT NULL DEFAULT 0,
  image_url text NOT NULL DEFAULT '',
  starter boolean NOT NULL DEFAULT false,
  tsa_ready boolean NOT NULL DEFAULT false,
  sort_order integer NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS kit_products (
  kit_id text NOT NULL REFERENCES kits(id) ON DELETE CASCADE,
  product_id text NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  PRIMARY KEY (kit_id, product_id)
);

CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id text NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  author_name text NOT NULL,
  age_range text NOT NULL DEFAULT '',
  skin_type text NOT NULL DEFAULT '',
  rating integer NOT NULL DEFAULT 5,
  title text NOT NULL DEFAULT '',
  body text NOT NULL DEFAULT '',
  verified boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS community_members (
  id text PRIMARY KEY,
  name text NOT NULL,
  role text NOT NULL DEFAULT '',
  location text NOT NULL DEFAULT '',
  quote text NOT NULL DEFAULT '',
  long_bio text NOT NULL DEFAULT '',
  portrait_url text NOT NULL DEFAULT '',
  featured boolean NOT NULL DEFAULT false,
  product_ids jsonb NOT NULL DEFAULT '[]'::jsonb,
  sort_order integer NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS journal_posts (
  id text PRIMARY KEY,
  title text NOT NULL,
  category text NOT NULL DEFAULT 'rituals',
  author text NOT NULL DEFAULT '',
  read_time text NOT NULL DEFAULT '',
  excerpt text NOT NULL DEFAULT '',
  image_url text NOT NULL DEFAULT '',
  date text NOT NULL DEFAULT '',
  featured boolean NOT NULL DEFAULT false
);

CREATE TABLE IF NOT EXISTS events (
  id text PRIMARY KEY,
  title text NOT NULL,
  when_text text NOT NULL DEFAULT '',
  location text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  image_url text NOT NULL DEFAULT '',
  members_only boolean NOT NULL DEFAULT false,
  sort_order integer NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS ugc_shelf_tiles (
  id text PRIMARY KEY,
  image_url text NOT NULL,
  caption text NOT NULL DEFAULT '',
  height_class text NOT NULL DEFAULT 'h-64',
  sort_order integer NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS circle_tiers (
  id text PRIMARY KEY,
  name text NOT NULL,
  cost text NOT NULL DEFAULT '',
  benefits jsonb NOT NULL DEFAULT '[]'::jsonb,
  sort_order integer NOT NULL DEFAULT 0
);

-- USER TABLES (mock-user pattern)
CREATE TABLE IF NOT EXISTS mock_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL DEFAULT 'isabelle',
  last_name text NOT NULL DEFAULT '',
  email text NOT NULL DEFAULT '',
  tier text NOT NULL DEFAULT 'morning',
  points integer NOT NULL DEFAULT 2400,
  member_since text NOT NULL DEFAULT 'june 2024',
  streak integer NOT NULL DEFAULT 14
);

CREATE TABLE IF NOT EXISTS user_ritual_steps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES mock_users(id) ON DELETE CASCADE,
  time_of_day text NOT NULL DEFAULT 'morning',
  step_number integer NOT NULL DEFAULT 1,
  product_id text REFERENCES products(id) ON DELETE SET NULL,
  custom_label text NOT NULL DEFAULT '',
  completed_today boolean NOT NULL DEFAULT false
);

CREATE TABLE IF NOT EXISTS user_subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES mock_users(id) ON DELETE CASCADE,
  product_id text NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  size_label text NOT NULL DEFAULT '50ml',
  frequency_days integer NOT NULL DEFAULT 60,
  next_delivery text NOT NULL DEFAULT '',
  price numeric NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'active'
);

CREATE TABLE IF NOT EXISTS user_orders (
  id text PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES mock_users(id) ON DELETE CASCADE,
  placed_at text NOT NULL DEFAULT '',
  status text NOT NULL DEFAULT 'shipped',
  total numeric NOT NULL DEFAULT 0,
  items jsonb NOT NULL DEFAULT '[]'::jsonb
);

CREATE TABLE IF NOT EXISTS user_wishlist (
  user_id uuid NOT NULL REFERENCES mock_users(id) ON DELETE CASCADE,
  product_id text NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  PRIMARY KEY (user_id, product_id)
);

CREATE TABLE IF NOT EXISTS cart_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES mock_users(id) ON DELETE CASCADE,
  product_id text NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  size_label text NOT NULL DEFAULT '',
  quantity integer NOT NULL DEFAULT 1,
  created_at timestamptz DEFAULT now()
);

-- RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_sizes ENABLE ROW LEVEL SECURITY;
ALTER TABLE kits ENABLE ROW LEVEL SECURITY;
ALTER TABLE kit_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE journal_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE ugc_shelf_tiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE circle_tiers ENABLE ROW LEVEL SECURITY;
ALTER TABLE mock_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_ritual_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_wishlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;

-- Public read catalog
CREATE POLICY "Public read products" ON products FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public read sizes" ON product_sizes FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public read kits" ON kits FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public read kit_products" ON kit_products FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public read reviews" ON reviews FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public read community" ON community_members FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public read journal" ON journal_posts FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public read events" ON events FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public read ugc" ON ugc_shelf_tiles FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public read tiers" ON circle_tiers FOR SELECT TO anon, authenticated USING (true);

-- Mock user tables: allow anon read/write for demo
CREATE POLICY "Demo read mock_users" ON mock_users FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Demo update mock_users" ON mock_users FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Demo read ritual" ON user_ritual_steps FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Demo insert ritual" ON user_ritual_steps FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Demo update ritual" ON user_ritual_steps FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Demo delete ritual" ON user_ritual_steps FOR DELETE TO anon, authenticated USING (true);

CREATE POLICY "Demo read subs" ON user_subscriptions FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Demo insert subs" ON user_subscriptions FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Demo update subs" ON user_subscriptions FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Demo delete subs" ON user_subscriptions FOR DELETE TO anon, authenticated USING (true);

CREATE POLICY "Demo read orders" ON user_orders FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Demo read wishlist" ON user_wishlist FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Demo insert wishlist" ON user_wishlist FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Demo delete wishlist" ON user_wishlist FOR DELETE TO anon, authenticated USING (true);

CREATE POLICY "Demo read cart" ON cart_items FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Demo insert cart" ON cart_items FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Demo update cart" ON cart_items FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Demo delete cart" ON cart_items FOR DELETE TO anon, authenticated USING (true);
