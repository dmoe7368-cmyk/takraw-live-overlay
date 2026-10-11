takrawRef.on('value', (snap) => {
  const data = snap.val();
  if (!data) return;

  document.getElementById('board').style.display = 'inline-flex';
  
  // ပွဲအမျိုးအစား နှင့် ကစားဟန် အချက်အလက်များ
  document.getElementById('meta-type').textContent = data.matchType || 'ကြေးစား';
  document.getElementById('meta-style').textContent = data.matchStyle || 'အဖိုက် / အနိုက်';
  document.getElementById('current-set').textContent = data.currentSet || 'SET 1';

  // ရမှတ်နှင့် အသင်းအချက်အလက်များ
  document.getElementById('home-name').textContent = data.homeName || 'MYA';
  document.getElementById('home-sets').textContent = data.homeSets ?? 0;
  document.getElementById('home-pts').textContent = data.homePoints ?? 0;

  document.getElementById('away-name').textContent = data.awayName || 'THA';
  document.getElementById('away-sets').textContent = data.awaySets ?? 0;
  document.getElementById('away-pts').textContent = data.awayPoints ?? 0;

  const homeBox = document.getElementById('home-box');
  const awayBox = document.getElementById('away-box');
  homeBox.classList.toggle('serving', data.serve === 'home');
  awayBox.classList.toggle('serving', data.serve === 'away');
});
