const plans = {
  strength: { title: 'Strong foundations', description: 'A balanced week to build confidence and capacity.', sessions: { 2: [['01', 'Full body A', 'Squat · push · pull', '45 MIN'], ['02', 'Full body B', 'Hinge · press · carry', '45 MIN']], 3: [['01', 'Lower body strength', 'Squat · hinge · core', '45 MIN'], ['02', 'Upper body strength', 'Push · pull · carry', '45 MIN'], ['03', 'Full body power', 'Lift · move · brace', '40 MIN']], 4: [['01', 'Lower body A', 'Squat · hinge · core', '45 MIN'], ['02', 'Upper body A', 'Push · pull · carry', '45 MIN'], ['03', 'Lower body B', 'Lunge · bridge · brace', '45 MIN'], ['04', 'Upper body B', 'Press · row · hold', '45 MIN']], 5: [['01', 'Lower body', 'Squat · hinge · core', '40 MIN'], ['02', 'Upper body', 'Push · pull · carry', '40 MIN'], ['03', 'Full body', 'Lift · move · brace', '40 MIN'], ['04', 'Lower body', 'Lunge · bridge · brace', '40 MIN'], ['05', 'Upper body', 'Press · row · hold', '40 MIN']] } },
  fitness: { title: 'Move with purpose', description: 'A varied week to build stamina without burning out.', sessions: { 2: [['01', 'Full body circuit', 'Strength · sweat · reset', '35 MIN'], ['02', 'Engine builder', 'Intervals · core · flow', '35 MIN']], 3: [['01', 'Strength + sweat', 'Lift · move · breathe', '40 MIN'], ['02', 'Steady state', 'Cardio · core · flow', '35 MIN'], ['03', 'Power circuit', 'Push · pull · jump', '40 MIN']], 4: [['01', 'Strength circuit', 'Lift · move · breathe', '40 MIN'], ['02', 'Intervals', 'Run · row · recover', '30 MIN'], ['03', 'Full body flow', 'Push · pull · brace', '40 MIN'], ['04', 'Long easy effort', 'Cardio · core · flow', '35 MIN']], 5: [['01', 'Strength circuit', 'Lift · move · breathe', '40 MIN'], ['02', 'Intervals', 'Run · row · recover', '30 MIN'], ['03', 'Full body flow', 'Push · pull · brace', '40 MIN'], ['04', 'Easy effort', 'Cardio · core · flow', '30 MIN'], ['05', 'Power circuit', 'Push · pull · jump', '35 MIN']] } },
  muscle: { title: 'Build your base', description: 'Purposeful volume to help you grow, recover, repeat.', sessions: { 2: [['01', 'Full body volume', 'Press · pull · legs', '50 MIN'], ['02', 'Full body volume', 'Hinge · shoulders · core', '50 MIN']], 3: [['01', 'Push + legs', 'Chest · quads · triceps', '50 MIN'], ['02', 'Pull + hinge', 'Back · hamstrings · biceps', '50 MIN'], ['03', 'Full body volume', 'Press · pull · legs', '50 MIN']], 4: [['01', 'Push', 'Chest · shoulders · triceps', '45 MIN'], ['02', 'Pull', 'Back · rear delts · biceps', '45 MIN'], ['03', 'Legs', 'Quads · glutes · calves', '50 MIN'], ['04', 'Full body', 'Press · pull · core', '45 MIN']], 5: [['01', 'Push', 'Chest · shoulders · triceps', '45 MIN'], ['02', 'Pull', 'Back · rear delts · biceps', '45 MIN'], ['03', 'Legs', 'Quads · glutes · calves', '50 MIN'], ['04', 'Upper volume', 'Press · pull · arms', '45 MIN'], ['05', 'Lower volume', 'Hinge · squat · core', '50 MIN']] } },
  energy: { title: 'A better daily rhythm', description: 'A feel-good mix of strength, mobility, and light conditioning.', sessions: { 2: [['01', 'Wake-up strength', 'Move · lift · open', '30 MIN'], ['02', 'Reset flow', 'Walk · stretch · breathe', '30 MIN']], 3: [['01', 'Wake-up strength', 'Move · lift · open', '35 MIN'], ['02', 'Cardio reset', 'Walk · jog · breathe', '30 MIN'], ['03', 'Mobility + core', 'Flow · brace · restore', '30 MIN']], 4: [['01', 'Wake-up strength', 'Move · lift · open', '35 MIN'], ['02', 'Cardio reset', 'Walk · jog · breathe', '30 MIN'], ['03', 'Mobility + core', 'Flow · brace · restore', '30 MIN'], ['04', 'Full body lift', 'Squat · press · carry', '35 MIN']], 5: [['01', 'Wake-up strength', 'Move · lift · open', '35 MIN'], ['02', 'Cardio reset', 'Walk · jog · breathe', '30 MIN'], ['03', 'Mobility + core', 'Flow · brace · restore', '30 MIN'], ['04', 'Full body lift', 'Squat · press · carry', '35 MIN'], ['05', 'Feel-good flow', 'Stretch · walk · breathe', '25 MIN']] } }
};

const form = document.querySelector('#planner-form');
const guideEmpty = document.querySelector('#guide-empty');
const guideContent = document.querySelector('#guide-content');
const weekList = document.querySelector('#week-list');
const guideTitle = document.querySelector('#guide-title');
const guideDescription = document.querySelector('#guide-description');
const guideMeta = document.querySelector('#guide-meta');

document.querySelectorAll('.goal-option input').forEach((input) => input.addEventListener('change', () => {
  document.querySelectorAll('.goal-option').forEach((option) => option.classList.toggle('selected', option.querySelector('input').checked));
}));

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const goal = form.querySelector('input[name="goal"]:checked').value;
  const days = Number(document.querySelector('#days').value);
  const experience = document.querySelector('#experience').value;
  const focus = document.querySelector('#focus').value.trim();
  const plan = plans[goal];
  const sessions = plan.sessions[days];
  const levelLabel = experience === 'beginner' ? 'starter' : experience === 'advanced' ? 'challenge' : 'steady';
  guideTitle.textContent = focus ? `${plan.title} · ${focus}` : plan.title;
  guideDescription.textContent = `${plan.description} A ${levelLabel} pace for your first week.`;
  guideMeta.textContent = `${days} sessions · ${sessions[0][3].replace(' MIN', '')} min`;
  weekList.innerHTML = sessions.map(([number, name, detail, duration]) => `<article class="day-card"><span class="day-number">SESSION ${number}</span><div><h3>${name}</h3><p>${detail}</p></div><b>${duration}</b></article>`).join('');
  guideEmpty.classList.add('hidden');
  guideContent.classList.remove('hidden');
  document.querySelector('#guide-panel').scrollIntoView({ behavior: 'smooth', block: 'start' });
});

document.querySelector('#reset-button').addEventListener('click', () => { guideContent.classList.add('hidden'); guideEmpty.classList.remove('hidden'); });