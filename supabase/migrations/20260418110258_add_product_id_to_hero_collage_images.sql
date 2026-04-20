/*
  # Add product link to hero collage images

  1. Modified Tables
    - `hero_collage_images`
      - Added `product_id` (text, nullable) - optional link to a product page

  2. Important Notes
    - Column is nullable so images without a product link remain valid
    - Foreign key references products table for data integrity
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'hero_collage_images' AND column_name = 'product_id'
  ) THEN
    ALTER TABLE hero_collage_images ADD COLUMN product_id text REFERENCES products(id);
  END IF;
END $$;

UPDATE hero_collage_images SET product_id = 'sz-tc-50' WHERE sort_order = 1;
UPDATE hero_collage_images SET product_id = 'sz-ts-30' WHERE sort_order = 2;
UPDATE hero_collage_images SET product_id = 'sz-td-100' WHERE sort_order = 3;
UPDATE hero_collage_images SET product_id = 'sz-tm-75' WHERE sort_order = 4;
UPDATE hero_collage_images SET product_id = 'sz-te-150' WHERE sort_order = 5;
UPDATE hero_collage_images SET product_id = 'sz-bo-100' WHERE sort_order = 6;
UPDATE hero_collage_images SET product_id = 'sz-ty-15' WHERE sort_order = 7;
