/*
  # SIZS Seed Data

  Populates all catalog and mock-user tables with realistic demo content.
*/

-- PRODUCTS
INSERT INTO products (id, code, name, subtitle, category, ritual, sensation, price, rating, review_count, badge, subscribable, short_description, tagline, key_ingredients, image_url, lifestyle_image_url, sort_order) VALUES
('sz-tc-50','SZ-TC-50','the cream','ceramide barrier moisturizer','skin','morning','calm',185,4.9,427,'bestseller',true,'the daily cream built on fourteen years of peptide research. ceramides. CT-24™. nothing more.','the one piece, if you asked us which.','["CT-24™ peptide complex","ceramide NP","squalane","niacinamide"]','https://images.unsplash.com/photo-1631730486572-226d1f595b68?w=1200&q=80&auto=format&fit=crop','https://images.unsplash.com/photo-1556228720-195a672e8a03?w=1200&q=80&auto=format&fit=crop',1),
('sz-ts-30','SZ-TS-30','the serum','overnight retinal concentrate','skin','evening','firmness',245,4.8,312,'new',true,'a twice-weekly retinal concentrate for the decade when skin shouldn''t yet show what it knows.','retinal without the reckoning.','["retinal 0.1%","CT-24™ peptide complex","bisabolol","hyaluronic acid"]','https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=1200&q=80&auto=format&fit=crop','https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=1200&q=80&auto=format&fit=crop',2),
('sz-td-100','SZ-TD-100','the dew','hydrating essence mist','skin','refresh','glow',65,4.7,234,'new',true,'an ultra-fine hydrating mist for layovers, layered makeup, and 4pm light.','the third hand on every flight.','["polyglutamic acid","rose water","niacinamide","trace minerals"]','https://images.unsplash.com/photo-1612817288484-6f916006741a?w=1200&q=80&auto=format&fit=crop','https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=1200&q=80&auto=format&fit=crop',3),
('sz-tl-150','SZ-TL-150','the cleanser','gentle cream cleanser','skin','morning','calm',68,4.9,541,'bestseller',true,'a cream-to-milk cleanser that removes the day without removing your skin.','the one step most brands get wrong.','["oat amino acids","squalane","glycerin","bisabolol"]','https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=1200&q=80&auto=format&fit=crop','https://images.unsplash.com/photo-1570554886111-e80fcca6a029?w=1200&q=80&auto=format&fit=crop',4),
('sz-te-150','SZ-TE-150','the essence','hydrating treatment lotion','skin','morning','glow',125,4.7,189,'',true,'the layer between cleansing and serum. weightless, layerable, essential.','the layer that makes the rest work harder.','["polyglutamic acid","panthenol","centella asiatica"]','https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=1200&q=80&auto=format&fit=crop','https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=1200&q=80&auto=format&fit=crop',5),
('sz-ty-15','SZ-TY-15','the eye','concentrate for the 360°','skin','evening','firmness',165,4.8,98,'',true,'a firming treatment for the orbital region — thinner skin, slower recovery.','the first place your career will show.','["caffeine","CT-24™ peptide complex","ceramide NP","vitamin K"]','https://images.unsplash.com/photo-1620916297893-7e70ea1fa27e?w=1200&q=80&auto=format&fit=crop','https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=1200&q=80&auto=format&fit=crop',6),
('sz-tm-75','SZ-TM-75','the mask','weekly resurfacing treatment','skin','refresh','clarity',95,4.6,156,'',false,'a 10-minute weekly ritual. AHA/PHA complex. no downtime.','ten minutes, once a week.','["lactic acid","gluconolactone","bisabolol","kaolin"]','https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=1200&q=80&auto=format&fit=crop','https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1200&q=80&auto=format&fit=crop',7),
('sz-bm-200','SZ-BM-200','the body milk','ceramide body lotion','body','morning','calm',48,4.8,312,'bestseller',true,'the light body cream you actually finish the bottle of.','barrier care, head to toe.','["ceramide complex","shea butter","squalane","niacinamide"]','https://images.unsplash.com/photo-1608248544351-9fd0d6f7f6b6?w=1200&q=80&auto=format&fit=crop','https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=1200&q=80&auto=format&fit=crop',8),
('sz-bo-100','SZ-BO-100','the oil','body & hair treatment','body','evening','glow',98,4.8,167,'',false,'a multi-use dry-touch oil. body, hair ends, cuticles, feet.','the one oil for everything south of your jaw.','["squalane","rosehip seed oil","jojoba oil","tocopherol"]','https://images.unsplash.com/photo-1617897903246-719242758050?w=1200&q=80&auto=format&fit=crop','https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=1200&q=80&auto=format&fit=crop',9)
ON CONFLICT (id) DO NOTHING;

-- PRODUCT SIZES
INSERT INTO product_sizes (id, product_id, label, price, is_default, sort_order) VALUES
('sz-tc-30','sz-tc-50','30ml',125,false,1),
('sz-tc-50-default','sz-tc-50','50ml',185,true,2),
('sz-tc-100r','sz-tc-50','100ml refill',280,false,3),
('sz-ts-15','sz-ts-30','15ml',165,false,1),
('sz-ts-30-default','sz-ts-30','30ml',245,true,2),
('sz-td-100-default','sz-td-100','100ml',65,true,1),
('sz-tl-150-default','sz-tl-150','150ml',68,true,1),
('sz-tl-300','sz-tl-150','300ml',118,false,2),
('sz-te-150-default','sz-te-150','150ml',125,true,1),
('sz-ty-15-default','sz-ty-15','15ml',165,true,1),
('sz-tm-75-default','sz-tm-75','75ml',95,true,1),
('sz-bm-200-default','sz-bm-200','200ml',48,true,1),
('sz-bo-30','sz-bo-100','30ml',48,false,1),
('sz-bo-100-default','sz-bo-100','100ml',98,true,2)
ON CONFLICT (id) DO NOTHING;

-- KITS
INSERT INTO kits (id, name, description, individual_total, kit_price, savings, image_url, starter, tsa_ready, sort_order) VALUES
('kit-morning','the morning ritual','cleanser, essence, cream — the three pieces that make the rest of your routine optional.',378,320,58,'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=1200&q=80&auto=format&fit=crop',false,false,1),
('kit-evening','the evening ritual','the four-piece ceremony for the hour before sleep.',663,565,98,'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=1200&q=80&auto=format&fit=crop',false,false,2),
('kit-discovery','the discovery','five travel sizes. seven days. find your three.',145,95,50,'https://images.unsplash.com/photo-1608248511-f5c0a2b0cf8b?w=1200&q=80&auto=format&fit=crop',true,false,3),
('kit-travel','the travel ritual','TSA-ready. three pieces. one quart bag.',75,48,27,'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1200&q=80&auto=format&fit=crop',false,true,4)
ON CONFLICT (id) DO NOTHING;

INSERT INTO kit_products (kit_id, product_id) VALUES
('kit-morning','sz-tl-150'),('kit-morning','sz-te-150'),('kit-morning','sz-tc-50'),
('kit-evening','sz-tl-150'),('kit-evening','sz-ts-30'),('kit-evening','sz-tc-50'),('kit-evening','sz-ty-15'),
('kit-discovery','sz-tl-150'),('kit-discovery','sz-te-150'),('kit-discovery','sz-ts-30'),('kit-discovery','sz-tc-50'),('kit-discovery','sz-bo-100'),
('kit-travel','sz-tl-150'),('kit-travel','sz-tc-50'),('kit-travel','sz-bo-100')
ON CONFLICT DO NOTHING;

-- REVIEWS
INSERT INTO reviews (product_id, author_name, age_range, skin_type, rating, title, body) VALUES
('sz-tc-50','Anya K.','35–40','combination',5,'finally. a cream that behaves.','three weeks in and my barrier is visibly calmer. no more afternoon redness.'),
('sz-tc-50','Maren L.','28–32','dry',5,'the bottle I keep at the office','travels well, smells like nothing, does everything.'),
('sz-tc-50','Priya S.','40–45','normal',4,'elegant','feels expensive because it is. worth it.'),
('sz-tc-50','Jules R.','30–35','sensitive',5,'quiet luxury for your face','I replaced three products with this one.'),
('sz-ts-30','Talia W.','33–38','combination',5,'retinal without the redness','my dermatologist was impressed.'),
('sz-ts-30','Noor A.','29–33','normal',5,'the only serum I finish','visible results by week four.'),
('sz-td-100','Elena F.','27–32','all',5,'my third hand on every flight','instant resurrection between meetings.'),
('sz-tl-150','Camille D.','34–39','dry',5,'the cleanser I judge others by','nothing stripping, nothing heavy.'),
('sz-bm-200','Sophia P.','31–36','normal',5,'finally a body cream I finish','I buy this in threes now.');

-- COMMUNITY MEMBERS
INSERT INTO community_members (id, name, role, location, quote, long_bio, portrait_url, featured, product_ids, sort_order) VALUES
('cm-lena','Dr. Lena Kaur','cardiac surgeon','new york','the cream I keep by my operating room locker.','fifteen-hour days under surgical lights taught me that recovery isn''t a product category — it''s a discipline. the cream fits my life because it asks nothing of me. two fingers of it, pressed in, and my skin doesn''t remember the day.','https://images.unsplash.com/photo-1580489944761-15a19d654956?w=900&q=80&auto=format&fit=crop',true,'["sz-tc-50","sz-tl-150","sz-ts-30","sz-td-100"]',1),
('cm-mira','Mira Oduya','creative director','london','the serum that replaced three others on my shelf.','I travel eleven months a year. I need skincare that works in every climate and asks for nothing I don''t have at 4am in a hotel bathroom.','https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&q=80&auto=format&fit=crop',false,'["sz-ts-30","sz-tc-50","sz-bm-200"]',2),
('cm-jules','Jules Moreau','film producer','paris','the dew is the only reason my foundation survives a set day.','on set from 5am to 9pm. the dew is the one thing that never leaves my jacket pocket.','https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=600&q=80&auto=format&fit=crop',false,'["sz-td-100","sz-tc-50"]',3),
('cm-ines','Ines Varga','architect','milan','skincare I don''t have to think about.','I designed a house in silence for three years. this is the skincare equivalent of that.','https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&q=80&auto=format&fit=crop',false,'["sz-tl-150","sz-te-150","sz-tc-50"]',4),
('cm-ruby','Ruby Chen','founder, fintech','nyc','it''s the bottle I put on my desk, not in a drawer.','the packaging is as considered as the formula. both are why I buy it.','https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80&auto=format&fit=crop',false,'["sz-tc-50","sz-ts-30"]',5)
ON CONFLICT (id) DO NOTHING;

-- JOURNAL
INSERT INTO journal_posts (id, title, category, author, read_time, excerpt, image_url, date, featured) VALUES
('post-001','the four pieces most career women overbuy','rituals','Dr. Mara Eldin','6 min','editing a shelf is the most underrated skincare skill. here are the four we keep recommending our members remove.','https://images.unsplash.com/photo-1629198735660-e39ea93f5c18?w=1200&q=80&auto=format&fit=crop','april 8, 2026',true),
('post-002','fourteen years inside one peptide','the lab','SIZS lab','9 min','CT-24™ wasn''t a breakthrough. it was an argument we kept refining.','https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=1200&q=80&auto=format&fit=crop','march 21, 2026',false),
('post-003','the case for retinal in your thirties','the lab','Dr. Mara Eldin','5 min','retinol is an entry point. retinal is the graduate course.','https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=1200&q=80&auto=format&fit=crop','march 14, 2026',false),
('post-004','morning ritual in four minutes','rituals','SIZS editorial','3 min','the schedule, the order, the reasons. nothing more.','https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80&auto=format&fit=crop','march 2, 2026',false)
ON CONFLICT (id) DO NOTHING;

-- EVENTS
INSERT INTO events (id, title, when_text, location, description, image_url, members_only, sort_order) VALUES
('evt-001','stillness as practice','thu 12 jun · 7pm','the studio, nyc','a conversation with Dr. Mara Eldin on why pause matters as much as formula.','https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80&auto=format&fit=crop',true,1),
('evt-002','morning rituals with three SIZS members','sat 22 jun · 10am','online · livestream','three members walk through their real-life morning rituals, unposed.','https://images.unsplash.com/photo-1515688594390-b649af70d282?w=800&q=80&auto=format&fit=crop',false,2)
ON CONFLICT (id) DO NOTHING;

-- UGC SHELF TILES
INSERT INTO ugc_shelf_tiles (id, image_url, caption, height_class, sort_order) VALUES
('tile-01','https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80&auto=format&fit=crop','@ayeshak · brooklyn','h-72',1),
('tile-02','https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&q=80&auto=format&fit=crop','@lina.mn · toronto','h-56',2),
('tile-03','https://images.unsplash.com/photo-1519415943484-9fa1873496d4?w=600&q=80&auto=format&fit=crop','@mirapaul · london','h-80',3),
('tile-04','https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=600&q=80&auto=format&fit=crop','@julesm · paris','h-60',4),
('tile-05','https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&q=80&auto=format&fit=crop','@talia.w · nyc','h-72',5),
('tile-06','https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=600&q=80&auto=format&fit=crop','@rubyc · sf','h-56',6),
('tile-07','https://images.unsplash.com/photo-1612817288484-6f916006741a?w=600&q=80&auto=format&fit=crop','@ines.v · milan','h-72',7),
('tile-08','https://images.unsplash.com/photo-1631730486572-226d1f595b68?w=600&q=80&auto=format&fit=crop','@noor.a · dubai','h-80',8),
('tile-09','https://images.unsplash.com/photo-1620916297893-7e70ea1fa27e?w=600&q=80&auto=format&fit=crop','@camille.d · montreal','h-60',9),
('tile-10','https://images.unsplash.com/photo-1617897903246-719242758050?w=600&q=80&auto=format&fit=crop','@sophiap · lisbon','h-64',10),
('tile-11','https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&q=80&auto=format&fit=crop','@elena.f · stockholm','h-72',11),
('tile-12','https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=600&q=80&auto=format&fit=crop','@marenl · copenhagen','h-56',12)
ON CONFLICT (id) DO NOTHING;

-- TIERS
INSERT INTO circle_tiers (id, name, cost, benefits, sort_order) VALUES
('tier-quiet','quiet','free with account','["free shipping on $95+","access to journal","birthday gift"]',1),
('tier-morning','morning','$500/year','["early access to new launches","private events in nyc/london/milan","+15% off everything","birthday gift","free shipping always"]',2),
('tier-studio','studio','$2,000/year','["complimentary studio treatment, twice yearly","priority access to new launches","private dinners","dedicated concierge","+20% off everything","birthday gift","free shipping always"]',3)
ON CONFLICT (id) DO NOTHING;

-- MOCK USER
DO $$
DECLARE uid uuid;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM mock_users) THEN
    INSERT INTO mock_users (first_name, last_name, email, tier, points, member_since, streak)
    VALUES ('isabelle','chen','isabelle@example.com','morning',2400,'june 2024',14)
    RETURNING id INTO uid;

    INSERT INTO user_ritual_steps (user_id, time_of_day, step_number, product_id) VALUES
      (uid,'morning',1,'sz-tl-150'),
      (uid,'morning',2,'sz-te-150'),
      (uid,'morning',3,'sz-tc-50'),
      (uid,'evening',1,'sz-tl-150'),
      (uid,'evening',2,'sz-ts-30'),
      (uid,'evening',3,'sz-tc-50'),
      (uid,'evening',4,'sz-ty-15');

    INSERT INTO user_subscriptions (user_id, product_id, size_label, frequency_days, next_delivery, price, status) VALUES
      (uid,'sz-tc-50','50ml',60,'jun 14',185,'active'),
      (uid,'sz-tl-150','150ml',60,'jun 20',68,'active');

    INSERT INTO user_orders (id, user_id, placed_at, status, total, items) VALUES
      ('SZ-3918',uid,'jun 2, 2026','shipped',430,'[{"name":"the cream","size":"50ml","price":185},{"name":"the serum","size":"30ml","price":245}]'),
      ('SZ-3872',uid,'may 14, 2026','delivered',133,'[{"name":"the cleanser","size":"150ml","price":68},{"name":"the body milk","size":"200ml","price":48},{"name":"the dew","size":"100ml travel","price":17}]');

    INSERT INTO user_wishlist (user_id, product_id) VALUES
      (uid,'sz-td-100'),(uid,'sz-bm-200'),(uid,'sz-bo-100');
  END IF;
END $$;
