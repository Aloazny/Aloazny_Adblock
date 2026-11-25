// ==UserScript==
// @name  智能滚动
// @name:en  Smart Scroll
// @namespace  https://viayoo.com/05hmsa
// @version  1.2
// @description  自动预测该去顶部还是底部，单击悬浮图标前往预测端，长按前往相反端，空闲或长时间手动滚动时自动淡出，位置自适应浏览器底栏，更接近App体验。
// @description:en  Predicts top or bottom, click to go, long-press for the opposite, hides when idle or during long manual scroll, auto-avoids browser bottom bar.
// @author  Aloazny
// @match  *://*/*
// @run-at  document-end
// @icon   data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAMAAABiM0N1AAAAb1BMVEVHcEwkPnEdMVgUIj4GCxQ4X6xAbsw/dNxWiew9cdpFeeBYi+1Uh+pBdt47b9lShOnM2vhPgudJfePD1PazyPHe6Pvn7/y6zvTV4flMgOVajO6rwu52jLgfOm6kve2TqdZwmemApe5wh7UsRnhieKJOqZwAAAAAB3RSTlMAgGJEFMHo20+SLgAAA+9JREFUeNrlmOly2yAQgJdDMnYdK0mTTt//6TptmjSODyxzFBACJIN8TH61oNFICH3aXXYXEIVPKvQ/AlGtQZ95CQFCYhqEyfOFEvySagRPMfTpCmVehMqDCK6bd3/dTBHe+x6/lMyAyLd14FxWGtiv5QmIVASuLhKOcgSiz2/Xc4BIpfzw9WKQww0c0ORxpwYS4ZpIuKmQfUfCnWIUbuRAQ2kiEV6IW2NFQKuiROT2mKPezE4iencsfvC766LhR/FT1YfoQWReGJRvrZReeajJYZ3vtpfghx9X2Q7PuFXaD6vW4gjNLjdsWmjw0a9yTv34th21qC19eM2RorFzw7qtTxvrbS6aJ0GM59MbZ4UXCiBq0iSyqXJQ3YleA6JYBxJSqzvdXduTJqzgTxncHTdqIe1OoJoWXKJyDdYizceFEt3vdW9CI4LhQNtoCDbT+/sLQWlmqi3Hk7IdJkD3lXFTVwnUzHBms45E+lplRHKOi9IHRxqsKTvOBpYm7dU8Zhou0lj4Ezwb2MATo16eAxtDalkkMXY4r1qMF9JzDMlqx2IkqfM24iHEhedw0+hJYZ5e87wfJWW+6/s8Ws6LixZz8Cej3SrE7Fyfk6hm4Kt0HGbDy6DgZWbnsf5hnR+1h9iw2oZsuULDmbfR62jtJMm96ZxqiATQOCG+jwU459kkOuSgpjfnRy1xYMSGJEYjR5+XiEc7oGX6YIkYO+lUAnFoSeIZMiEtZWJR0hZA3FfGue1uK9hQMaTujlqOafJ3wHl4Jx3+OK8x/rTtvyuNJrU0Pc18br0KeC+t+PLConYufXmJei80H8AhNO0809rMajm1XcQkivD4TlYi43ZJQFLUyWQ4LehkRYxTn0olSt1uIUwodPWgoTZJgBErj+hbpVi8FxLbcO6/S9ZKC9VFVYuT6ZoMs39BomFk73B7wtHzy3I2/FwmISAtaSjP8ifARaoBPBxm/eVhRlQykrZhPIk41TrQcvRILmBm3rA1vO5uzAl245DdlEEgHwqLSkHfTkJ/UzK2tcPa5mcX5/3hqmDrwgYBB0ONyutcHMzKnoTDinOYvxbt7Ghfsh/5uiHGWMERTAL4ne23VT2I5O1RV6wyk6LZExCQhB3/FBb1QvYgWql8l7qt9cq6drtGbd0WrHMMy2OoiktJz5t6qo7Rs6c2IthuE3B51eqdtXuOy/tqrOxhvlsiSRyHznSfFQXHMIUxPt/Z17uXRqWeCBRSyJ4nhgyiZ2s5YSQMpRCopIYhSIgKbilSBMlDeBF2NYbLOFOERo2uFmqvcz8QrJ70GqF46ZeGQ5X2gKfSTP1kcXGntT5LQae/fRB8UvmH/7H9BXa8lqtoPItdAAAAAElFTkSuQmCC
// @grant  none
// @license  MIT
// @noframes
// ==/UserScript==

(function () {
	'use strict';

	const CFG = {
		idleHideDelay       : 1500,  // 空闲多久后自动淡出（毫秒）
		longPressDelay      : 420,   // 长按判定阈值（毫秒）
		longScrollHideDelay : 800,   // 连续手动滚动超过此毫秒数则隐藏图标
		scrollEndDelay      : 500,   // 停止滚动后多久复位滚动会话（毫秒）
		minDuration         : 420,   // 滚动动画最短时长（毫秒）
		maxDuration         : 1300,  // 滚动动画最长时长（毫秒）
		durationPerPx       : 0.5,   // 每像素追加的动画时长（毫秒/像素）
		bottomZone          : 0.82,  // 滚动进度 ≥ 此值视为接近底部 → 预测去顶部
		topZone             : 0.03,  // 滚动进度 ≤ 此值视为接近顶部 → 预测去底部
		orbBottomOffset     : 64,    // 悬浮球距底部基准距离（像素），避开常见 App 底栏/浮窗
		orbOcclusionCap     : 72     // 检测到浏览器底栏/键盘遮挡时的最大上抬补偿（像素）
	};

	const docEl = document.documentElement;
	const readTop = () => window.pageYOffset || docEl.scrollTop || (document.body && document.body.scrollTop) || 0;
	const readMax = () => Math.max(0, Math.max(docEl.scrollHeight, document.body ? document.body.scrollHeight : 0) - window.innerHeight);
	const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

	let rafId = 0, gliding = false, savedBehavior = null, trend = 'down';

	const lockBehavior = () => { if (savedBehavior !== null) return; savedBehavior = docEl.style.scrollBehavior; docEl.style.scrollBehavior = 'auto'; };
	const unlockBehavior = () => { if (savedBehavior === null) return; docEl.style.scrollBehavior = savedBehavior; savedBehavior = null; };
	const haltGlide = () => { if (rafId) cancelAnimationFrame(rafId); rafId = 0; gliding = false; unlockBehavior(); };

	const glideTo = (target) => {
		haltGlide(); const from = readTop(), to = Math.max(0, Math.min(target, readMax())), dist = to - from; if (Math.abs(dist) < 1) return;
		const dur = Math.min(CFG.maxDuration, Math.max(CFG.minDuration, Math.abs(dist) * CFG.durationPerPx)), t0 = performance.now(); lockBehavior(); gliding = true;
		const step = (now) => { const p = Math.min(1, (now - t0) / dur); window.scrollTo(0, from + dist * easeInOutCubic(p)); p < 1 ? (rafId = requestAnimationFrame(step)) : (rafId = 0, gliding = false, unlockBehavior()); };
		rafId = requestAnimationFrame(step);
	};

	const predictTarget = () => {
		const max = readMax(); if (max <= 0) return null;
		const p = readTop() / max;
		return p >= CFG.bottomZone ? 'top' : p <= CFG.topZone ? 'bottom' : (trend === 'up' ? 'top' : 'bottom');
	};

	const host = document.createElement('div');
	host.setAttribute('data-scroll-orb', '');
	const shadow = host.attachShadow({ mode: 'closed' });

	const style = document.createElement('style');
	style.textContent = `
		:host { all: initial; }
		.orb { position: fixed; left: 50%; bottom: calc(64px + env(safe-area-inset-bottom, 0px)); z-index: 2147483000; transform: translate(-50%, 26px) scale(0.9); opacity: 0; pointer-events: none; transition: transform 0.32s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.22s ease, bottom 0.2s ease; will-change: transform, opacity, bottom; }
		.orb[data-visible="true"] { transform: translate(-50%, 0) scale(1); opacity: 1; pointer-events: auto; transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.28s ease, bottom 0.2s ease; }
		.orb-btn { display: flex; align-items: center; justify-content: center; width: 42px; height: 42px; margin: 0; padding: 0; border: 1px solid rgba(255, 255, 255, 0.75); border-radius: 50%; background: rgba(255, 255, 255, 0.72); color: #1a1a1c; cursor: pointer; outline: none; -webkit-tap-highlight-color: transparent; -webkit-backdrop-filter: blur(20px) saturate(180%); backdrop-filter: blur(20px) saturate(180%); box-shadow: 0 8px 22px -6px rgba(0, 0, 0, 0.35), 0 2px 5px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.9); transform: scale(1); transition: transform 0.22s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.22s ease; touch-action: manipulation; user-select: none; -webkit-user-select: none; }
		.orb-btn:hover { background: rgba(255, 255, 255, 0.88); }
		.orb-btn.is-pressed { transform: scale(0.86); transition-duration: 0.12s; }
		.orb-btn.is-pulse { animation: orb-pulse 0.36s cubic-bezier(0.34, 1.56, 0.64, 1); }
		@keyframes orb-pulse { 0% { transform: scale(0.86); } 55% { transform: scale(1.1); } 100% { transform: scale(1); } }
		.orb-icon { display: block; width: 20px; height: 20px; transform: rotate(0deg); transition: transform 0.48s cubic-bezier(0.34, 1.4, 0.5, 1); will-change: transform; }
		.orb-btn[data-dir="bottom"] .orb-icon { transform: rotate(180deg); }
		@media (prefers-color-scheme: dark) {
			.orb-btn { background: rgba(40, 40, 44, 0.75); border-color: rgba(255, 255, 255, 0.18); color: #f5f5f7; box-shadow: 0 8px 22px -6px rgba(0, 0, 0, 0.75), 0 2px 5px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.12); }
			.orb-btn:hover { background: rgba(60, 60, 66, 0.85); }
		}
	`;
	shadow.appendChild(style);

	const wrap = document.createElement('div');
	wrap.className = 'orb';
	wrap.dataset.visible = 'false';

	const btn = document.createElement('button');
	btn.className = 'orb-btn';
	btn.type = 'button';
	btn.dataset.dir = 'bottom';
	btn.setAttribute('aria-label', '滚动');
	btn.innerHTML = '<svg class="orb-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5.6 14.6 12 8.2l6.4 6.4" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';

	wrap.appendChild(btn);
	shadow.appendChild(wrap);

	let idleTimer = 0, pressTimer = 0, scrollEndTimer = 0, scrollSessionStart = 0, rpRaf = 0, lastTop = readTop();
	let hovering = false, pressed = false, longFired = false, userHidden = false;

	const reveal = () => { wrap.dataset.visible = 'true'; };
	const conceal = () => { wrap.dataset.visible = 'false'; };
	const scheduleConceal = () => { clearTimeout(idleTimer); idleTimer = setTimeout(() => (hovering || pressed) ? scheduleConceal() : conceal(), CFG.idleHideDelay); };
	const runScroll = (target) => { if (target) glideTo(target === 'top' ? 0 : readMax()); };
	const resetScrollSession = () => { scrollSessionStart = 0; userHidden = false; };

	const repositionOrb = () => {
		const vv = window.visualViewport;
		const occluded = vv ? Math.min(CFG.orbOcclusionCap, Math.max(0, window.innerHeight - vv.height)) : 0;
		wrap.style.bottom = `calc(${CFG.orbBottomOffset + occluded}px + env(safe-area-inset-bottom, 0px))`;
	};
	const scheduleReposition = () => { if (rpRaf) return; rpRaf = requestAnimationFrame(() => { rpRaf = 0; repositionOrb(); }); };

	const handleScroll = () => {
		const now = performance.now(), top = readTop();
		if (!gliding && Math.abs(top - lastTop) > 1) trend = top > lastTop ? 'down' : 'up';
		lastTop = top;
		if (!gliding) { if (!scrollSessionStart) scrollSessionStart = now; if (now - scrollSessionStart > CFG.longScrollHideDelay) userHidden = true; }
		clearTimeout(scrollEndTimer); scrollEndTimer = setTimeout(resetScrollSession, CFG.scrollEndDelay);
		if (userHidden) return conceal();
		const target = predictTarget(); if (!target) return conceal();
		btn.dataset.dir = target; reveal(); scheduleConceal();
	};

	const fireLongPress = () => {
		longFired = true; btn.classList.remove('is-pressed'); btn.classList.add('is-pulse');
		setTimeout(() => btn.classList.remove('is-pulse'), 340); navigator.vibrate && navigator.vibrate(12);
		const p = predictTarget(); if (p) runScroll(p === 'top' ? 'bottom' : 'top');
	};

	const releasePointer = (cancelled) => {
		clearTimeout(pressTimer); btn.classList.remove('is-pressed');
		if (!pressed) return; pressed = false;
		if (!cancelled && !longFired) runScroll(predictTarget());
	};

	btn.addEventListener('pointerdown', (e) => {
		if (e.pointerType === 'mouse' && e.button !== 0) return;
		pressed = true; longFired = false; btn.classList.add('is-pressed'); clearTimeout(pressTimer);
		pressTimer = setTimeout(fireLongPress, CFG.longPressDelay);
	});
	btn.addEventListener('pointerup', () => releasePointer(false));
	btn.addEventListener('pointercancel', () => releasePointer(true));
	btn.addEventListener('contextmenu', (e) => e.preventDefault());
	btn.addEventListener('pointerenter', () => { hovering = true; clearTimeout(idleTimer); });
	btn.addEventListener('pointerleave', () => { releasePointer(true); hovering = false; scheduleConceal(); });

	const mount = () => {
		(document.body || docEl).appendChild(host); repositionOrb(); handleScroll();
		window.addEventListener('scroll', handleScroll, { passive: true });
		window.addEventListener('resize', () => { scheduleReposition(); handleScroll(); }, { passive: true });
		window.visualViewport?.addEventListener('resize', scheduleReposition, { passive: true });
		window.visualViewport?.addEventListener('scroll', scheduleReposition, { passive: true });
		window.addEventListener('wheel', haltGlide, { passive: true, capture: true });
		window.addEventListener('touchstart', haltGlide, { passive: true, capture: true });
		window.addEventListener('keydown', (e) => ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(e.key) && haltGlide(), { passive: true });
	};

	document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', mount, { once: true }) : mount();
})();