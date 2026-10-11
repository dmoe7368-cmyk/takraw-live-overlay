takrawRef.on('value', (snap) => {
  const data = snap.val();
  if (!data) return;

  document.getElementById('board').style.display = 'inline-flex';
  
  // ပွဲအမျိုးအစား နှင့် ကစားဟန်
  document.getElementById('meta-type').textContent = data.matchType || 'ကြေးစား';
  document.getElementById('meta-style').textContent = data.matchStyle || 'အဖိုက် / အနိုက်';
  document.getElementById('current-set').textContent = data.currentSet || 'SET 1';

  // Due Point Marking ပြသမှု
  const dueBadge = document.getElementById('due-badge');
  dueBadge.style.display = data.isDue ? 'inline-block' : 'none';

  // Home အချက်အလက်များ
  document.getElementById('home-name').textContent = data.homeName || 'မြန်မာ';
  document.getElementById('home-sets').textContent = data.homeSets ?? 0;
  document.getElementById('home-pts').textContent = data.homePoints ?? 0;

  // Away အချက်အလက်များ
  document.getElementById('away-name').textContent = data.awayName || 'ထိုင်း';
  document.getElementById('away-sets').textContent = data.awaySets ?? 0;
  document.getElementById('away-pts').textContent = data.awayPoints ?? 0;

  // ဆာဗစ်ဘောလုံး ပြသမှု
  const homeSide = document.querySelector('.home-side');
  const awaySide = document.querySelector('.away-side');
  homeSide.classList.toggle('serving', data.serve === 'home');
  awaySide.classList.toggle('serving', data.serve === 'away');
});
