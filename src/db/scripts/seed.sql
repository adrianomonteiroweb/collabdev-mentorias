-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Roles
INSERT INTO collabdevmentoring.roles (name, created_at, updated_at) VALUES ('mentor', now(), now());
INSERT INTO collabdevmentoring.roles (name, created_at, updated_at) VALUES ('mentee', now(), now());

-- Mentor
INSERT INTO collabdevmentoring.users (email, name, password, role_id,created_at, updated_at) VALUES ('adrianomonteiroweb@gmail.com', 'Adriano Monteiro', '7c4a8d09ca3762af61e59520943dc26494f8941b', 1, now(), now());

-- Mentorship
INSERT INTO collabdevmentoring.mentorships (
  title,
  description,
  full_description,
  mentor_id,
  tags,
  date,
  time,
  duration,
  current_participants,
  min_participants,
  max_participants,
  status,
  meet_link,
  created_at,
  updated_at
) VALUES (
  'Introdução ao React e Hooks',
  'Aprenda os conceitos fundamentais do React, incluindo componentes funcionais, hooks useState e useEffect. Nesta mentoria, vamos abordar desde os conceitos básicos até exemplos práticos de como construir aplicações modernas com React.',
  'Nesta mentoria completa sobre React, você aprenderá:\n\n• Conceitos fundamentais do React\n• Componentes funcionais vs componentes de classe\n• Hooks: useState, useEffect, useContext\n• Gerenciamento de estado local\n• Ciclo de vida dos componentes\n• Boas práticas e padrões de desenvolvimento\n• Exemplos práticos e exercícios\n\nPré-requisitos:\n• Conhecimento básico de JavaScript (ES6+)\n• HTML e CSS\n• Familiaridade com conceitos de programação\n\nO que você vai levar:\n• Conhecimento sólido dos fundamentos do React\n• Exemplos de código para consulta\n• Lista de recursos para continuar estudando\n• Networking com outros desenvolvedores',
  1, -- Supondo que o mentor_id seja 1 (usuário Adriano criado no seed)
  '["React", "JavaScript", "Frontend", "Hooks"]'::jsonb,
  '2024-01-15',
  '19:00',
  '60 min',
  8,
  5,
  15,
  'confirmed',
  'https://meet.google.com/abc-defg-hij',
  now(),
  now()
),
(
  'Automatize rotinas de trabalho de qualquer área',
  'Aprenda os conceitos fundamentais da automação RPA.',
  'Um diferencial, mais uma opção e muito código na prática.',
  1, -- Supondo que o mentor_id seja 1 (usuário Adriano criado no seed)
  '["Node", "JavaScript", "Beckend", "RPA"]'::jsonb,
  '2025-06-15',
  '10:00',
  '60',
  0,
  1,
  5,
  'pending',
  'https://meet.google.com/abc-defg-hij',
  now(),
  now()
);


INSERT INTO collabdevmentoring.user_mentorships (user_id, mentorship_id, status)
VALUES
  (1, 1, 'pending'), (1, 2, 'pending');

  SELECT * FROM mentorships