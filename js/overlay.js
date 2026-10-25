// ========================================================
// နာမည်ရှည်ပါက ဘောင်မကျော်စေရန် Font Size Auto ညှိပေးသည့် Helper
// ========================================================
function autoFitText(element, maxFont = 20, minFont = 11) {
  if (!element || !element.parentElement) return;

  // စတင်ချိန်တွင် မူလအကြီးဆုံး Font Size သတ်မှတ်ခြင်း
  element.style.fontSize = maxFont + 'px';

  const containerWidth = element.parentElement.clientWidth;

  // စာသားအကျယ်သည် Box အကျယ်ထက် ကြီးနေပါက Font Size ကို 0.5px စီ အလိုအလျောက် လျှော့ချမည်
  while (element.scrollWidth > containerWidth && parseFloat(element.style.fontSize) > minFont) {
    const currentSize = parseFloat(element.style.fontSize);
    element.style.fontSize = (currentSize - 0.5) + 'px';
  }
}

// ========================================================
// Firebase Real-time Database Listener
// ========================================================
TakrawRef.on('value', (snap) => {
  const data = snap.val();
  if (!data) return;

  // Board ကို စတင်ပြသခြင်း
  const boardEl = document.getElementById('board');
  if (boardEl) boardEl.style.display = 'flex';

  // ၁။ ပွဲအမျိုးအစား၊ ကစားဟန်နှင့် လက်ရှိ Set
  const typeEl = document.getElementById('meta-type');
  if (typeEl) typeEl.textContent = data.matchType || 'ကြေးစား';

  const styleEl = document.getElementById('meta-style');
  if (styleEl) styleEl.textContent = data.matchStyle || 'အဖိုက် / အနိုက်';

  const currentSetEl = document.getElementById('current-set');
  if (currentSetEl) currentSetEl.textContent = data.currentSet || 'SET 1';

  // ၂။ ပြိုင်ပွဲအဆင့် (Tournament Stage)
  const stageEl = document.getElementById('meta-stage');
  if (stageEl) {
    if (data.matchStage && data.matchStage.trim() !== '') {
      stageEl.textContent = data.matchStage;
      stageEl.style.display = 'inline-block';
    } else {
      stageEl.style.display = 'none';
    }
  }

  // ၃။ ပိုက်အမြင့် (Net Height)
  const heightEl = document.getElementById('meta-height');
  if (heightEl) {
    if (data.netHeight && data.netHeight.trim() !== '') {
      heightEl.textContent = `ပိုက်: ${data.netHeight}`;
      heightEl.style.display = 'inline-block';
    } else {
      heightEl.style.display = 'none';
    }
  }

  // ၄။ Due Point Marking
  const dueBadge = document.getElementById('due-badge');
  if (dueBadge) {
    dueBadge.style.display = data.isDue ? 'inline-block' : 'none';
  }

  // ၅။ အပေါ်သင်း (Home Team) Data & Auto Font Fit
  const homeNameEl = document.getElementById('home-name');
  if (homeNameEl) {
    homeNameEl.textContent = data.homeName || 'မြန်မာ';
    autoFitText(homeNameEl, 20, 11);
  }
  
  const homeSetsEl = document.getElementById('home-sets');
  if (homeSetsEl) homeSetsEl.textContent = data.homeSets ?? 0;

  const homePtsEl = document.getElementById('home-pts');
  if (homePtsEl) homePtsEl.textContent = data.homePoints ?? 0;

  // ၆။ အောက်သင်း (Away Team) Data & Auto Font Fit
  const awayNameEl = document.getElementById('away-name');
  if (awayNameEl) {
    awayNameEl.textContent = data.awayName || 'ထိုင်း';
    autoFitText(awayNameEl, 20, 11);
  }

  const awaySetsEl = document.getElementById('away-sets');
  if (awaySetsEl) awaySetsEl.textContent = data.awaySets ?? 0;

  const awayPtsEl = document.getElementById('away-pts');
  if (awayPtsEl) awayPtsEl.textContent = data.awayPoints ?? 0;

  // ၇။ ဆာဗစ်ဘောလုံး ပြသမှု (🟡 Glow Dot)
  const homeRow = document.getElementById('home-row');
  const awayRow = document.getElementById('away-row');
  if (homeRow) homeRow.classList.toggle('serving', data.serve === 'home');
  if (awayRow) awayRow.classList.toggle('serving', data.serve === 'away');
});
