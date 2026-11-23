/* =====================================================================
 * site.js — 초대받은 사용자용 간단 접속 코드 게이트
 *
 * ⚠️ 보안 경고: 이것은 정적 사이트를 위한 "간단한 접근 제한"일 뿐이며,
 *    민감정보를 보호하기 위한 수단이 아닙니다. 접속 코드의 SHA-256 해시가
 *    브라우저(클라이언트)에 그대로 노출되므로, 진짜 보안 경계로 사용하면
 *    안 됩니다. 정말로 보호가 필요한 데이터는 올바른 서버측 인증을 쓰세요.
 *
 * 동작:
 *   1) 페이지는 기본적으로 잠긴(게이트) 상태로 표시됩니다.
 *   2) 사용자가 입력한 코드를 브라우저에서 SHA-256으로 해시합니다.
 *   3) config/access.json 의 digest 목록과 비교해 일치하면 통과시키고,
 *      허용 상태를 sessionStorage 에 기록합니다(탭을 닫으면 사라짐).
 *   4) access.json 의 version 을 올리면 기존 세션 허용이 무효화됩니다.
 * ===================================================================== */
(function (global) {
  'use strict';

  var GRANT_KEY  = 'siteAccessGranted';
  var CONFIG_URL = 'config/access.json';
  var config = null;

  /* 문자열을 SHA-256 16진수 해시로 변환 (Web Crypto, 브라우저 내장) */
  async function sha256Hex(text) {
    var data = new TextEncoder().encode(text);
    var buf = await crypto.subtle.digest('SHA-256', data);
    var bytes = new Uint8Array(buf), hex = '';
    for (var i = 0; i < bytes.length; i++) {
      hex += bytes[i].toString(16).padStart(2, '0');
    }
    return hex;
  }

  function digests() {
    if (!config || !Array.isArray(config.codes)) return [];
    return config.codes.map(function (c) {
      return String((c && c.digest) || '').toLowerCase();
    });
  }

  /* 허용 토큰은 설정 version 에 묶어둔다 → version 을 올리면 모두 재잠금 */
  function grantToken() {
    return 'v' + (config ? config.version : '?');
  }
  function isGranted() {
    try { return sessionStorage.getItem(GRANT_KEY) === grantToken(); }
    catch (e) { return false; }
  }
  function remember() {
    try { sessionStorage.setItem(GRANT_KEY, grantToken()); } catch (e) {}
  }

  function showGate(locked) {
    var gate = document.getElementById('siteGate');
    if (gate) gate.hidden = !locked;
    try { document.body.classList.toggle('gate-locked', locked); } catch (e) {}
    if (locked) {
      var input = document.getElementById('gateInput');
      if (input) setTimeout(function () { try { input.focus(); } catch (e) {} }, 60);
    }
  }

  function setError(msg) {
    var el = document.getElementById('gateError');
    if (!el) return;
    if (msg) { el.textContent = msg; el.hidden = false; }
    else { el.textContent = ''; el.hidden = true; }
  }

  async function loadConfig() {
    if (config) return config;
    var res = await fetch(CONFIG_URL + '?t=' + Date.now(), { cache: 'no-store' });
    if (!res.ok) throw new Error('access config HTTP ' + res.status);
    config = await res.json();
    return config;
  }

  /* 입력한 코드를 검증해 통과 처리 (form submit 핸들러) */
  async function unlock(ev) {
    if (ev && ev.preventDefault) ev.preventDefault();
    var input = document.getElementById('gateInput');
    var code = input ? input.value.trim() : '';
    if (!code) { setError('접속 코드를 입력해 주세요.'); return false; }

    var btn = document.querySelector('#gateForm .gate-btn');
    if (btn) btn.disabled = true;
    try {
      await loadConfig();
      var hash = await sha256Hex(code);
      if (digests().indexOf(hash) !== -1) {
        remember();
        setError('');
        if (input) input.value = '';
        showGate(false);
      } else {
        setError('접속 코드가 올바르지 않습니다.');
        if (input) { input.value = ''; try { input.focus(); } catch (e) {} }
      }
    } catch (e) {
      setError('접속 설정을 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.');
    } finally {
      if (btn) btn.disabled = false;
    }
    return false;
  }

  /* 페이지 로드 시 호출 — 기본 잠금, 유효한 세션 허용이 있으면 해제 */
  async function initAuth() {
    var form = document.getElementById('gateForm');
    if (form && !form._wired) {
      form._wired = true;
      form.addEventListener('submit', unlock);
    }
    showGate(true);                 // 기본은 잠금(콘텐츠 가림)
    try {
      await loadConfig();
      showGate(!isGranted());       // 이미 허용된 세션이면 해제
    } catch (e) {
      showGate(true);               // 설정 로드 실패 시 fail-closed (잠금 유지)
      setError('접속 설정을 불러오지 못했습니다. 새로고침 해주세요.');
    }
  }

  global.initAuth = initAuth;
  global.unlock = unlock;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAuth);
  } else {
    initAuth();
  }
})(window);
