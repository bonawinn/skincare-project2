/*
  # Seed hero collage images

  Inserts 7 default collage images using Pexels skincare/beauty photography.
  Each image has a unique rotation, size, and z-index to create a
  magazine-style scattered collage effect.
*/

INSERT INTO hero_collage_images (image_url, alt_text, width_class, rotation_deg, z_index, sort_order) VALUES
  ('https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg?auto=compress&cs=tinysrgb&w=800', 'woman with glowing skin and natural makeup', 'w-56', -4, 3, 1),
  ('https://images.pexels.com/photos/3785147/pexels-photo-3785147.jpeg?auto=compress&cs=tinysrgb&w=800', 'skincare routine flatlay with botanical ingredients', 'w-44', 3, 2, 2),
  ('https://images.pexels.com/photos/5069432/pexels-photo-5069432.jpeg?auto=compress&cs=tinysrgb&w=800', 'woman applying face cream in soft light', 'w-52', -2, 5, 3),
  ('https://images.pexels.com/photos/3997379/pexels-photo-3997379.jpeg?auto=compress&cs=tinysrgb&w=800', 'luxurious cream jar with botanical elements', 'w-40', 5, 1, 4),
  ('https://images.pexels.com/photos/3762466/pexels-photo-3762466.jpeg?auto=compress&cs=tinysrgb&w=800', 'woman with radiant dewy skin closeup', 'w-48', -6, 4, 5),
  ('https://images.pexels.com/photos/6621462/pexels-photo-6621462.jpeg?auto=compress&cs=tinysrgb&w=800', 'minimalist skincare bottles on marble surface', 'w-36', 2, 2, 6),
  ('https://images.pexels.com/photos/3738355/pexels-photo-3738355.jpeg?auto=compress&cs=tinysrgb&w=800', 'serene portrait with natural lighting', 'w-44', -3, 6, 7);
