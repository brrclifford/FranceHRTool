-- Seed job specialisations
INSERT INTO job_specialisations (code, title) VALUES
  ('BA001', 'Beauty Advisor'),
  ('BA002', 'Senior Beauty Advisor'),
  ('SM001', 'Store Manager'),
  ('SM002', 'Assistant Store Manager'),
  ('MK001', 'Makeup Artist'),
  ('SK001', 'Skincare Specialist'),
  ('FR001', 'Fragrance Consultant'),
  ('TR001', 'Training Manager'),
  ('VM001', 'Visual Merchandiser'),
  ('CS001', 'Customer Service Representative');

-- Seed employee group names
INSERT INTO employee_group_names (name) VALUES
  ('Retail - Full Time'),
  ('Retail - Part Time'),
  ('Retail - Seasonal'),
  ('Retail - Management'),
  ('Retail - Intern');

-- Seed 10 unenriched workers with French names
INSERT INTO workers (oapass_id, first_name, last_name, email, start_date, store_name, sys_id) VALUES
  ('OAP-2024-001', 'Marie', 'Dupont', 'marie.dupont@loreal.com', '2024-03-15', 'L''Oréal Paris - Champs-Élysées', 'SYS-FR-001'),
  ('OAP-2024-002', 'Pierre', 'Martin', 'pierre.martin@loreal.com', '2024-03-18', 'L''Oréal Paris - Le Marais', 'SYS-FR-002'),
  ('OAP-2024-003', 'Sophie', 'Bernard', 'sophie.bernard@loreal.com', '2024-04-01', 'L''Oréal Lyon - Part-Dieu', 'SYS-FR-003'),
  ('OAP-2024-004', 'Jean', 'Petit', 'jean.petit@loreal.com', '2024-04-05', 'L''Oréal Marseille - Vieux Port', 'SYS-FR-004'),
  ('OAP-2024-005', 'Camille', 'Dubois', 'camille.dubois@loreal.com', '2024-04-10', 'L''Oréal Nice - Promenade', 'SYS-FR-005'),
  ('OAP-2024-006', 'Lucas', 'Moreau', 'lucas.moreau@loreal.com', '2024-04-15', 'L''Oréal Toulouse - Capitole', 'SYS-FR-006'),
  ('OAP-2024-007', 'Léa', 'Laurent', 'lea.laurent@loreal.com', '2024-05-01', 'L''Oréal Bordeaux - Sainte-Catherine', 'SYS-FR-007'),
  ('OAP-2024-008', 'Hugo', 'Simon', 'hugo.simon@loreal.com', '2024-05-10', 'L''Oréal Strasbourg - Kléber', 'SYS-FR-008'),
  ('OAP-2024-009', 'Chloé', 'Michel', 'chloe.michel@loreal.com', '2024-05-15', 'L''Oréal Lille - Grand Place', 'SYS-FR-009'),
  ('OAP-2024-010', 'Antoine', 'Lefebvre', 'antoine.lefebvre@loreal.com', '2024-06-01', 'L''Oréal Nantes - Pommeraye', 'SYS-FR-010');
