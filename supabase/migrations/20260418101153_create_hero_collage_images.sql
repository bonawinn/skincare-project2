/*
  # Create hero collage images table

  1. New Tables
    - `hero_collage_images`
      - `id` (uuid, primary key)
      - `image_url` (text) - URL of the collage image
      - `alt_text` (text) - accessibility description
      - `width_class` (text) - tailwind width class for layout sizing
      - `rotation_deg` (integer) - rotation angle in degrees for scatter effect
      - `z_index` (integer) - stacking order
      - `sort_order` (integer) - display ordering
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on `hero_collage_images` table
    - Add policy for public read access (these are display images)
*/

CREATE TABLE IF NOT EXISTS hero_collage_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url text NOT NULL DEFAULT '',
  alt_text text NOT NULL DEFAULT '',
  width_class text NOT NULL DEFAULT 'w-48',
  rotation_deg integer NOT NULL DEFAULT 0,
  z_index integer NOT NULL DEFAULT 1,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE hero_collage_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view hero collage images"
  ON hero_collage_images
  FOR SELECT
  TO anon, authenticated
  USING (sort_order >= 0);
