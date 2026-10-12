takrawRef.on('value', (snap) => {
  const data = snap.val();
  if (!data) return;

  document.getElementById('board').style.display = 'flex';
  
  // ပွဲအမျိုးအစား & ကစားဟန်
  document.getElementById('meta-type').textContent = data.matchType || 'ပြိုင်ပွဲ';
  document.getElementById('meta-style').textContent = data.matchStyle || 'အဖိုက် / အနိုက်';
  document.getElementById('current-set').textContent = data.currentSet || 'SET 1';

  // ပြိုင်ပွဲအဆင့် (Tournament Stage) ပြသခြင်း
  const stageEl = document.getElementById('meta-stage');
  if (data.matchStage && data.matchStage.trim() !== '') {
    stageEl.textContent = data.matchStage;
    stageEl.style.display = 'inline-block';
  } else {
    stageEl.style.display = 'none';
  }

  // Due Point Marking
  const dueBadge = document.getElementById('due-badge');
  dueBadge.style.display = data.isDue ? 'inline-block' : 'none';

  // အပေါ်သင်း (Home Team) Data
  document.getElementById('home-name').textContent = data.homeName || 'မြန်မာ';
  document.getElementById('home-sets').textContent = data.homeSets ?? 0;
  document.getElementById('home-pts').textContent = data.homePoints ?? 0;

  // အောက်သင်း (Away Team) Data
  document.getElementById('away-name').textContent = data.awayName || 'ထိုင်း';
  document.getElementById('away-sets').textContent = data.awaySets ?? 0;
  document.getElementById('away-pts').textContent = data.awayPoints ?? 0;

  // ဆာဗစ်ဘောလုံး ပြသမှု
  const homeRow = document.getElementById('home-row');
  const awayRow = document.getElementById('away-row');
  homeRow.classList.toggle('serving', data.serve === 'home');
  awayRow.classList.toggle('serving', data.serve === 'away');
});
