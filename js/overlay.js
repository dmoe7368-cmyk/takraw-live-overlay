// ========================================================
// နာမည်ရှည်ပါက Font Size လျှော့ချပြီး မဆန့်သေးပါက Auto Scale ညှစ်ပေးမည့် Function
// ========================================================
function autoFitText(element, maxFont = 19, minFont = 11) {
  if (!element || !element.parentElement) return;

  const parent = element.parentElement;
  
  // အသစ်ပြန်လည် တွက်ချက်ရန် မူလအတိုင်း Reset အရင်ချမည်
  element.style.transform = "none";
  element.style.fontSize = maxFont + "px";
  element.style.display = "inline-block";
  element.style.whiteSpace = "nowrap";
  element.style.transformOrigin = "left center";

  const availableWidth = parent.clientWidth;

  if (availableWidth > 0) {
    // ၁။ Font Size ကို အသေးဆုံး (minFont) ရောက်သည်အထိ အရင်လျှော့ချမည်
    while (element.scrollWidth > availableWidth && parseFloat(element.style.fontSize) > minFont) {
      let currentSize = parseFloat(element.style.fontSize);
      element.style.fontSize = (currentSize - 0.5) + "px";
    }

    // ၂။ အသေးဆုံးရောက်သွားသော်လည်း နာမည်က ရှည်လွန်း၍ မဆန့်သေးပါက ဘောင်ထဲဝင်အောင် Scale ဖြင့်ညှစ်မည်
    if (element.scrollWidth > availableWidth) {
      const scaleX = availableWidth / element.scrollWidth;
      element.style.transform = `scaleX(${scaleX})`;
    }
  }
}

// ========================================================
// Firebase Ref ကို Safe ရှာဖွေခြင်း (စာလုံးအကြီးအသေး မရွေး အလုပ်လုပ်စေရန်)
// ========================================================
const targetRef = (typeof TakrawRef !== 'undefined') ? TakrawRef :
                  (typeof takrawRef !== 'undefined') ? takrawRef :
                  (typeof matchRef !== 'undefined') ? matchRef : null;

if (targetRef) {
  targetRef.on('value', (snap) => {
    try {
      const data = snap.val();
      if (!data) return;

      // Board ပြသခြင်း
      const boardEl = document.getElementById('board');
      if (boardEl) boardEl.style.display = 'flex';

      // ပွဲအမျိုးအစား & SET
      const typeEl = document.getElementById('meta-type');
      if (typeEl) typeEl.textContent = data.matchType || 'ကြေးစား';

      const styleEl = document.getElementById('meta-style');
      if (styleEl) styleEl.textContent = data.matchStyle || 'ဝါးစား / အောက်ခံ';

      const currentSetEl = document.getElementById('current-set');
      if (currentSetEl) currentSetEl.textContent = data.currentSet || 'SET 1';

      // ပြိုင်ပွဲအဆင့် (Tournament Stage)
      const stageEl = document.getElementById('meta-stage');
      if (stageEl) {
        if (data.matchStage && data.matchStage.trim() !== '') {
          stageEl.textContent = data.matchStage;
          stageEl.style.display = 'inline-block';
        } else {
          stageEl.style.display = 'none';
        }
      }

      // ပိုက်အမြင့် (Net Height)
      const heightEl = document.getElementById('meta-height');
      if (heightEl) {
        if (data.netHeight && data.netHeight.trim() !== '') {
          heightEl.textContent = `ပိုက်: ${data.netHeight}`;
          heightEl.style.display = 'inline-block';
        } else {
          heightEl.style.display = 'none';
        }
      }

      // Due Badge
      const dueBadge = document.getElementById('due-badge');
      if (dueBadge) {
        dueBadge.style.display = data.isDue ? 'inline-block' : 'none';
      }

      // Home Team Data & Auto Font Fit
      const homeNameEl = document.getElementById('home-name');
      if (homeNameEl) {
        homeNameEl.textContent = data.homeName || 'မြန်မာ';
        // ထည့်သွင်းပြီးတိုင်း Auto Fit စနစ်ကို ခေါ်သုံးမည်
        setTimeout(() => autoFitText(homeNameEl, 19, 11), 50); 
      }
      const homeSetsEl = document.getElementById('home-sets');
      if (homeSetsEl) homeSetsEl.textContent = data.homeSets ?? 0;
      const homePtsEl = document.getElementById('home-pts');
      if (homePtsEl) homePtsEl.textContent = data.homePoints ?? 0;

      // Away Team Data & Auto Font Fit
      const awayNameEl = document.getElementById('away-name');
      if (awayNameEl) {
        awayNameEl.textContent = data.awayName || 'ထိုင်း';
        // ထည့်သွင်းပြီးတိုင်း Auto Fit စနစ်ကို ခေါ်သုံးမည်
        setTimeout(() => autoFitText(awayNameEl, 19, 11), 50);
      }
      const awaySetsEl = document.getElementById('away-sets');
      if (awaySetsEl) awaySetsEl.textContent = data.awaySets ?? 0;
      const awayPtsEl = document.getElementById('away-pts');
      if (awayPtsEl) awayPtsEl.textContent = data.awayPoints ?? 0;

      // Serve Ball Display
      const homeRow = document.getElementById('home-row');
      const awayRow = document.getElementById('away-row');
      if (homeRow) homeRow.classList.toggle('serving', data.serve === 'home');
      if (awayRow) awayRow.classList.toggle('serving', data.serve === 'away');

    } catch (err) {
      console.error("Takraw Overlay Render Error:", err);
    }
  });
} else {
  console.warn("Firebase Takraw Reference ရှာမတွေ့ပါ။ firebase-config.js ကို စစ်ဆေးပါ");
}
