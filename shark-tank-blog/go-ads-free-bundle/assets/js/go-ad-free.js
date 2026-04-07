(function(){
"use strict";

// ========== CONFIG ==========
var SITE_NAME = "Shark Tank Blog";
var SITE_CAUSE = "Shark Tank coverage";
var SITE_URL = "https://nagarmohnish.github.io/STB_UI/";
var BASE_PRICE = 14.99;
var TIP_PRESETS = [1, 2, 5];
var ANNUAL_DISCOUNT = 0.17;
var ACCENT = "#6366f1";
var ACCENT_DARK = "#4f46e5";
var ACCENT_LIGHT = "#eef2ff";

// Demo Google accounts
var DEMO_ACCOUNTS = [
  {name:"Mohnish Nagar", email:"mohnish.nagar@gmail.com", color:"#4285F4", initial:"M"},
  {name:"Mohnish", email:"mohnish@getmega.com", color:"#EA4335", initial:"M"}
];

// ========== SCRIPT TAG CONFIG ==========
var scriptTag = document.currentScript || document.querySelector('script[src*="go-ad-free"]');
var CFG = {
  delay: parseInt((scriptTag&&scriptTag.getAttribute('data-delay'))||'1500'),
  poll: parseInt((scriptTag&&scriptTag.getAttribute('data-poll'))||'3000'),
  extra: (scriptTag&&scriptTag.getAttribute('data-selectors'))||''
};

// ========== AD SELECTORS ==========
var AD_SELECTORS = [
  'ins.adsbygoogle','[id^="google_ads"]','[id^="div-gpt-ad"]','.gpt-ad','[data-google-query-id]',
  '[id^="amzn-assoc"]','iframe[src*="amazon-adsystem"]',
  '[id*="freestar"]','[class*="freestar"]',
  '[id^="mediavine"]','[class*="mediavine"]','[data-mediavine]',
  '[class*="adthrive"]',
  '[class*="ad-slot"]','[class*="ad-container"]','[class*="ad-wrapper"]','[class*="ad-banner"]',
  '[class*="advertisement"]','[class*="sponsored"]',
  '[id*="ad-slot"]','[id*="ad-container"]','[id*="ad-banner"]','[id*="advertisement"]',
  '[data-ad]','[data-ad-slot]','[data-ad-unit]','[data-adunit]','[data-dfp]',
  'iframe[src*="doubleclick"]','iframe[src*="googlesyndication"]'
];

// ========== STATE ==========
var S = {
  screen: 1,      // 1=amount, 2=google signin, 3=payment, 4=success
  tip: 0,
  method: "",
  name: "John Doe",
  email: "",
  selectedAccount: null
};

// ========== INJECT CSS ==========
var styleEl = document.createElement('style');
styleEl.textContent = `
@keyframes gaf-fadeIn{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:translateY(0)}}
@keyframes gaf-popIn{from{opacity:0;transform:scale(.96) translateY(8px)}to{opacity:1;transform:scale(1) translateY(0)}}
@keyframes gaf-spin{to{transform:rotate(360deg)}}
.gaf-bar{display:flex;align-items:center;justify-content:flex-end;height:28px;padding:0;background:none;cursor:pointer;animation:gaf-fadeIn .3s ease-out;box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;margin:0 0 4px}
.gaf-bar-cta{display:inline-flex;align-items:center;gap:4px;padding:4px 14px;background:#c0392b;color:#fff;font-size:10.5px;font-weight:800;border-radius:14px;white-space:nowrap;letter-spacing:.4px;text-transform:uppercase;transition:transform .15s,box-shadow .15s}
.gaf-bar:hover .gaf-bar-cta{transform:scale(1.03);box-shadow:0 2px 8px rgba(192,57,43,.3)}
.gaf-bar-cta svg{width:10px;height:10px;transition:transform .15s}
.gaf-bar:hover .gaf-bar-cta svg{transform:translateX(2px)}
.gaf-overlay{position:fixed;inset:0;z-index:9999999;background:rgba(0,0,0,0);display:flex;align-items:center;justify-content:center;transition:background .25s ease;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif}
.gaf-overlay.active{background:rgba(0,0,0,.5)}
.gaf-popup{width:520px;max-width:calc(100% - 32px);max-height:92vh;overflow-y:auto;border-radius:18px;background:#fff;box-shadow:0 24px 80px rgba(0,0,0,.25);position:relative;box-sizing:border-box;opacity:0;transform:scale(.96) translateY(8px);transition:opacity .25s ease,transform .25s ease}
.gaf-overlay.active .gaf-popup{opacity:1;transform:scale(1) translateY(0)}
.gaf-popup *{box-sizing:border-box}
.gaf-close{position:absolute;top:16px;right:18px;width:32px;height:32px;border:none;background:none;cursor:pointer;font-size:22px;color:#bbb;display:flex;align-items:center;justify-content:center;transition:color .15s;z-index:2;line-height:1}
.gaf-close:hover{color:#666}
.gaf-body{padding:40px 40px 32px}

/* ---- Screen 1: Amount ---- */
.gaf-s1-title{font-family:'Playfair Display',Georgia,serif;font-size:26px;font-weight:700;color:#1a1a1a;text-align:center;margin-bottom:6px;font-style:italic}
.gaf-s1-sub{font-size:14px;color:#999;text-align:center;margin-bottom:28px}
.gaf-amount-box{border:1.5px solid #e4e4e4;border-radius:14px;padding:22px 24px;display:flex;align-items:baseline;justify-content:space-between;margin-bottom:20px;transition:border-color .15s}
.gaf-amount-box:focus-within{border-color:${ACCENT}}
.gaf-amt-left{display:flex;align-items:baseline;gap:2px}
.gaf-amt-dollar{font-size:20px;color:#bbb;font-weight:600}
.gaf-amt-input{font-size:44px;font-weight:900;border:none;outline:none;width:80px;color:#1a1a1a;background:transparent;font-family:inherit;line-height:1}
.gaf-amt-period{font-size:16px;color:#999;margin-left:2px}
.gaf-amt-daily{font-size:13px;color:#bbb}
.gaf-presets{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:28px}
.gaf-preset{padding:14px 8px;border:1.5px solid #e8e8e8;border-radius:12px;background:#fff;cursor:pointer;font-size:17px;font-weight:700;color:#444;transition:all .15s;position:relative;text-align:center;font-family:inherit}
.gaf-preset:hover{border-color:${ACCENT};background:#fafafe}
.gaf-preset.active{border-color:${ACCENT};background:${ACCENT_LIGHT};color:${ACCENT_DARK}}
.gaf-preset .pop-tag{position:absolute;top:-9px;left:50%;transform:translateX(-50%);font-size:9px;font-weight:700;color:#fff;background:${ACCENT};padding:2px 10px;border-radius:8px;white-space:nowrap}
.gaf-main-cta{width:100%;padding:17px 20px;border:none;border-radius:14px;background:${ACCENT};color:#fff;font-size:16px;font-weight:700;cursor:pointer;font-family:inherit;transition:background .15s,transform .1s;margin-bottom:18px}
.gaf-main-cta:hover{background:${ACCENT_DARK};transform:translateY(-1px)}
.gaf-main-cta:active{transform:translateY(0)}
.gaf-main-cta.processing{opacity:.7;cursor:not-allowed}
.gaf-perk-row{display:flex;align-items:center;justify-content:space-between;margin-bottom:10px}
.gaf-perk-text{font-size:13px;color:${ACCENT};font-weight:600}
.gaf-perk-text i{margin-right:4px}
.gaf-perk-text em{font-style:italic}
.gaf-billing-badge{display:inline-flex;align-items:center;gap:4px;padding:5px 12px;border:1px solid #e0e0e0;border-radius:16px;font-size:11.5px;color:#999;cursor:default}
.gaf-billing-badge i{font-size:8px}
.gaf-trust-row{display:flex;align-items:center;justify-content:center;gap:10px;font-size:12px;color:#ccc;margin-top:4px}
.gaf-trust-row img{height:14px;opacity:.4}
.gaf-tip-section{margin-bottom:24px}
.gaf-tip-label{font-size:13px;color:#999;text-align:center;margin-bottom:10px;font-style:italic}
.gaf-amt-input{font-size:44px;font-weight:900;color:#1a1a1a;line-height:1;font-family:inherit}

/* ---- Screen 2: Google Sign In ---- */
.gaf-s2-glogo{display:flex;justify-content:center;margin-bottom:20px}
.gaf-s2-glogo svg{width:40px;height:40px;padding:8px;background:#f8f8f8;border-radius:50%}
.gaf-s2-title{font-size:20px;font-weight:700;color:#1a1a1a;text-align:center;margin-bottom:4px}
.gaf-s2-sub{font-size:13px;color:#aaa;text-align:center;margin-bottom:24px}
.gaf-account{display:flex;align-items:center;gap:14px;padding:16px 18px;border:1.5px solid #eee;border-radius:12px;margin-bottom:10px;cursor:pointer;transition:border-color .15s,background .15s}
.gaf-account:hover{border-color:#ddd;background:#fafafa}
.gaf-account-avatar{width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-size:16px;font-weight:700;flex-shrink:0}
.gaf-account-info{flex:1}
.gaf-account-name{font-size:14px;font-weight:600;color:#333}
.gaf-account-email{font-size:12px;color:#999}
.gaf-account-arrow{color:#ccc;font-size:14px}
.gaf-s2-divider{display:flex;align-items:center;gap:12px;margin:20px 0}
.gaf-s2-divider::before,.gaf-s2-divider::after{content:'';flex:1;height:1px;background:#eee}
.gaf-s2-divider span{font-size:12px;color:#bbb}
.gaf-s2-email-btn{display:block;width:100%;padding:12px;border:none;background:none;color:#999;font-size:13px;font-weight:600;cursor:pointer;font-family:inherit;text-align:center;transition:color .15s}
.gaf-s2-email-btn:hover{color:${ACCENT}}

/* ---- Screen 3: Payment ---- */
.gaf-s3-label{font-size:13px;color:#999;margin-bottom:4px}
.gaf-s3-amount{font-size:32px;font-weight:900;color:#1a1a1a;margin-bottom:28px;line-height:1}
.gaf-s3-heading{display:flex;align-items:center;justify-content:space-between;margin-bottom:16px}
.gaf-s3-heading-text{font-size:15px;font-weight:700;color:#333}
.gaf-s3-heading-right{font-size:12px;color:#999}
.gaf-method-card{border:1.5px solid #eee;border-radius:12px;padding:18px 20px;margin-bottom:12px;cursor:pointer;transition:border-color .15s}
.gaf-method-card:hover{border-color:#ddd}
.gaf-method-card.active{border-color:${ACCENT}}
.gaf-method-top{display:flex;align-items:center;justify-content:space-between}
.gaf-method-left{display:flex;align-items:center;gap:12px}
.gaf-method-icon{font-size:18px;color:#888}
.gaf-method-name{font-size:14px;font-weight:600;color:#333}
.gaf-method-sub{font-size:11px;color:${ACCENT};font-weight:600;margin-top:1px}
.gaf-method-chevron{color:#ccc;font-size:12px}
.gaf-method-form{margin-top:14px;display:none}
.gaf-method-card.active .gaf-method-form{display:block}
.gaf-method-card.active .gaf-method-chevron{transform:rotate(180deg)}
.gaf-field{margin-bottom:12px}
.gaf-field label{display:block;font-size:11px;font-weight:600;color:#888;margin-bottom:4px;text-transform:uppercase;letter-spacing:.3px}
.gaf-field input{width:100%;padding:11px 14px;border:1.5px solid #e4e4e4;border-radius:8px;font-size:14px;outline:none;font-family:inherit;transition:border-color .15s}
.gaf-field input:focus{border-color:${ACCENT}}
.gaf-field-row{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.gaf-express-label{font-size:12px;font-weight:600;color:#999;text-align:center;margin:20px 0 12px;text-transform:uppercase;letter-spacing:.5px}
.gaf-express-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:16px}
.gaf-express-btn{padding:12px 8px;border:1.5px solid #eee;border-radius:10px;text-align:center;cursor:pointer;font-size:12px;font-weight:600;color:#444;background:#fff;transition:border-color .15s;font-family:inherit}
.gaf-express-btn:hover{border-color:${ACCENT}}
.gaf-s3-trust{text-align:center;font-size:12px;color:#bbb;margin-bottom:20px}
.gaf-s3-cta{width:100%;padding:17px 20px;border:none;border-radius:14px;background:${ACCENT};color:#fff;font-size:16px;font-weight:700;cursor:pointer;font-family:inherit;transition:background .15s,transform .1s;position:sticky;bottom:0}
.gaf-s3-cta:hover{background:${ACCENT_DARK}}
.gaf-s3-cta.processing{opacity:.7;cursor:not-allowed}

/* ---- Screen 4: Success ---- */
.gaf-s4-back{display:inline-flex;align-items:center;gap:4px;font-size:13px;color:#bbb;cursor:pointer;border:none;background:none;margin-bottom:20px;font-family:inherit;transition:color .15s}
.gaf-s4-back:hover{color:#888}
.gaf-s4-confirm{text-align:center;font-size:14px;color:#777;line-height:1.6;margin-bottom:20px}
.gaf-s4-confirm strong{color:#1a1a1a}
.gaf-s4-badge{display:inline-flex;align-items:center;gap:6px;padding:8px 20px;border:1.5px solid ${ACCENT};border-radius:20px;color:${ACCENT};font-size:12px;font-weight:700;margin-bottom:28px}
.gaf-cert{background:#fff;border:1px solid #e8e8e8;border-radius:14px;padding:28px;margin-bottom:22px;box-shadow:0 2px 12px rgba(0,0,0,.04);text-align:center;position:relative}
.gaf-cert-bar{height:4px;background:linear-gradient(90deg,${ACCENT},#818cf8);border-radius:14px 14px 0 0;position:absolute;top:0;left:0;right:0}
.gaf-cert-icons{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;font-size:16px;color:${ACCENT}}
.gaf-cert-icons .share-icon{cursor:pointer;color:#ccc;transition:color .15s}
.gaf-cert-icons .share-icon:hover{color:#888}
.gaf-cert-label{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:#bbb;margin-bottom:14px}
.gaf-cert hr{border:none;border-top:1px solid #f0f0f0;margin:12px 0}
.gaf-cert-small{font-size:12px;color:#bbb}
.gaf-cert-name{font-size:24px;font-weight:800;color:#1a1a1a;margin:6px 0}
.gaf-cert-site{display:flex;align-items:center;justify-content:center;gap:8px;margin:12px 0}
.gaf-cert-site-icon{width:28px;height:28px;border-radius:50%;background:${ACCENT};display:flex;align-items:center;justify-content:center;color:#fff;font-size:12px;font-weight:700}
.gaf-cert-cause{font-style:italic;color:#999;font-size:13px;margin:10px 0}
.gaf-cert-amount{font-weight:800;font-size:16px;color:#1a1a1a}
.gaf-cert-date{font-size:12px;color:#bbb;margin-top:4px}
.gaf-cert-perk{background:${ACCENT_LIGHT};border-radius:0 0 14px 14px;padding:14px;margin:-28px -28px 0;margin-top:18px;font-size:13px;color:${ACCENT_DARK};font-weight:600}
.gaf-hide-toggle{display:flex;align-items:center;justify-content:center;gap:6px;font-size:12px;color:#bbb;margin-bottom:20px;cursor:pointer}
.gaf-hide-toggle .circle{width:16px;height:16px;border:1.5px solid #ddd;border-radius:50%}
.gaf-share-label{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#bbb;text-align:center;margin-bottom:10px}
.gaf-share-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:18px}
.gaf-share-btn{padding:12px;border:1.5px solid #eee;border-radius:10px;color:#555;font-size:13px;font-weight:600;cursor:pointer;text-decoration:none;text-align:center;display:flex;align-items:center;justify-content:center;gap:6px;background:#fff;transition:border-color .15s;font-family:inherit}
.gaf-share-btn:hover{border-color:${ACCENT}}
.gaf-share-btn i{font-size:14px}
.gaf-footer-text{text-align:center;font-size:12px;color:#bbb}
.gaf-footer-text i{margin-right:4px}

/* ---- Spinner ---- */
.gaf-spinner{display:inline-block;width:16px;height:16px;border:2.5px solid rgba(255,255,255,.3);border-top-color:#fff;border-radius:50%;animation:gaf-spin .6s linear infinite;vertical-align:middle;margin-right:6px}

/* ---- Responsive ---- */
@media(max-width:520px){
.gaf-popup{max-width:100%;border-radius:16px 16px 0 0;align-self:flex-end;max-height:95vh}
.gaf-body{padding:32px 24px 24px}
.gaf-amt-input{font-size:36px;width:65px}
.gaf-presets{grid-template-columns:repeat(2,1fr)}
}
`;
document.head.appendChild(styleEl);

// ========== AD SCANNER ==========
var MARKER = 'data-gaf-processed';

function getAllSelectors(){
  var s = AD_SELECTORS.slice();
  if(CFG.extra){CFG.extra.split(',').forEach(function(x){x=x.trim();if(x)s.push(x)})}
  return s;
}

function scanAds(){
  var sels = getAllSelectors();
  var selector = sels.join(',');
  var ads;
  try{ads = document.querySelectorAll(selector)}catch(e){return}
  ads.forEach(function(ad){
    if(ad.getAttribute(MARKER))return;
    var rect = ad.getBoundingClientRect();
    if(rect.width<40||rect.height<20)return;
    ad.setAttribute(MARKER,'1');
    injectBar(ad);
  });
}

function injectBar(ad){
  var bar = document.createElement('div');
  bar.className = 'gaf-bar';
  bar.innerHTML = '<span class="gaf-bar-cta">Go Ads-Free <svg viewBox="0 0 12 12"><path d="M4.5 2L8.5 6L4.5 10" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg></span>';
  bar.addEventListener('click', function(e){e.stopPropagation();openPopup()});
  ad.parentNode.insertBefore(bar, ad);
}

// ========== HELPERS ==========
function getTotal(){ return +(BASE_PRICE + S.tip).toFixed(2); }
function getAnnual(){ return +(getTotal() * 12).toFixed(2); }
function getAnnualSaved(){ return +((getTotal() * 12) - (getTotal() * 12 * (1 - ANNUAL_DISCOUNT))).toFixed(0); }
function getDaily(){ return (getTotal() / 30).toFixed(2); }

// ========== POPUP ==========
function openPopup(){
  S.screen=1; S.tip=0; S.method=''; S.selectedAccount=null;
  document.body.style.overflow='hidden';
  var overlay = document.createElement('div');
  overlay.className='gaf-overlay';
  overlay.id='gaf-overlay';
  overlay.innerHTML='<div class="gaf-popup" id="gaf-popup"><button class="gaf-close" id="gaf-close">&times;</button><div class="gaf-body" id="gaf-body"></div></div>';
  document.body.appendChild(overlay);
  requestAnimationFrame(function(){ requestAnimationFrame(function(){ overlay.classList.add('active'); }); });
  overlay.addEventListener('click',function(e){if(e.target===overlay)closePopup()});
  document.getElementById('gaf-close').addEventListener('click',closePopup);
  document.addEventListener('keydown',escHandler);
  renderScreen();
}

function closePopup(){
  var o=document.getElementById('gaf-overlay');
  if(!o)return;
  o.classList.remove('active');
  setTimeout(function(){ o.remove(); document.body.style.overflow=''; },250);
  document.removeEventListener('keydown',escHandler);
}

function escHandler(e){if(e.key==='Escape')closePopup()}

function renderScreen(){
  var body=document.getElementById('gaf-body');
  if(!body)return;
  if(S.screen===1) body.innerHTML=screen1();
  else if(S.screen===2) body.innerHTML=screen2();
  else if(S.screen===3) body.innerHTML=screen3();
  else body.innerHTML=screen4();
  bindEvents();
}

// ========== SCREEN 1: Amount Selection ==========
function screen1(){
  var total = getTotal();
  var h='';
  h+='<div class="gaf-s1-title">Keep Shark Tank Blog Alive (and Ad-Free)</div>';
  h+='<div class="gaf-s1-sub">$'+BASE_PRICE+'/month. Less than a bad pitch on the show.</div>';

  // Fixed price display
  h+='<div class="gaf-amount-box">';
  h+='<div class="gaf-amt-left"><span class="gaf-amt-dollar">$</span><span class="gaf-amt-input">'+total+'</span><span class="gaf-amt-period">/ month</span></div>';
  h+='<span class="gaf-amt-daily" id="gaf-daily">$'+getDaily()+'/day</span>';
  h+='</div>';

  // Tip section
  h+='<div class="gaf-tip-section">';
  h+='<div class="gaf-tip-label">Want to give a little extra? Add a tip</div>';
  h+='<div class="gaf-presets" id="gaf-presets">';
  h+='<div class="gaf-preset '+(S.tip===0?'active':'')+'" data-tip="0">No tip</div>';
  TIP_PRESETS.forEach(function(t){
    h+='<div class="gaf-preset '+(S.tip===t?'active':'')+'" data-tip="'+t+'">+$'+t+'</div>';
  });
  h+='</div>';
  h+='</div>';

  // CTA
  h+='<button class="gaf-main-cta" id="gaf-cta1">I\'m In. Take My Money. \u2014 $'+total+'/mo</button>';

  // Perk + billing
  h+='<div class="gaf-perk-row">';
  h+='<span class="gaf-perk-text"><i class="fas fa-globe"></i> Includes <em>ad-free</em> experience</span>';
  h+='<span class="gaf-billing-badge" id="gaf-billing"><i class="fas fa-chevron-down" style="font-size:8px"></i> $'+getAnnual()+'/yr &mdash; Save ~17%</span>';
  h+='</div>';

  // Trust
  h+='<div class="gaf-trust-row"><span><i class="fas fa-lock" style="margin-right:3px"></i> Cancel anytime</span><span>&bull;</span><span>No sharks. No gimmicks.</span></div>';
  return h;
}

// ========== SCREEN 2: Google Sign In ==========
function screen2(){
  var h='';
  // Google logo
  h+='<div class="gaf-s2-glogo"><svg viewBox="0 0 48 48" width="24" height="24"><path fill="#4285F4" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#34A853" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#EA4335" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg></div>';
  h+='<div class="gaf-s2-title">Sign in to continue</div>';
  h+='<div class="gaf-s2-sub">Choose your Google account</div>';

  // Account rows
  DEMO_ACCOUNTS.forEach(function(acc, i){
    h+='<div class="gaf-account" data-idx="'+i+'">';
    h+='<div class="gaf-account-avatar" style="background:'+acc.color+'">'+acc.initial+'</div>';
    h+='<div class="gaf-account-info"><div class="gaf-account-name">'+acc.name+'</div><div class="gaf-account-email">'+acc.email+'</div></div>';
    h+='<span class="gaf-account-arrow"><i class="fas fa-chevron-right"></i></span>';
    h+='</div>';
  });

  // Divider
  h+='<div class="gaf-s2-divider"><span>Use email instead</span></div>';
  h+='<button class="gaf-s2-email-btn" id="gaf-use-email">Continue with email</button>';
  return h;
}

// ========== SCREEN 3: Payment ==========
function screen3(){
  var annual = getAnnual();
  var h='';
  h+='<div class="gaf-s3-label">You\'re supporting '+SITE_NAME+'</div>';
  h+='<div class="gaf-s3-amount">$'+getTotal()+' / month <span style="font-size:14px;color:#999;font-weight:400">($'+annual+'/yr)</span></div>';

  // Heading
  h+='<div class="gaf-s3-heading"><span class="gaf-s3-heading-text">Select payment method</span><span class="gaf-s3-heading-right"><small>us</small> United States <i class="fas fa-chevron-down" style="font-size:9px"></i></span></div>';

  // Bank transfer
  h+='<div class="gaf-method-card'+(S.method==='bank'?' active':'')+'" data-method="bank"><div class="gaf-method-top"><div class="gaf-method-left"><span class="gaf-method-icon"><i class="fas fa-building-columns"></i></span><div><div class="gaf-method-name">Direct Bank Transfer (ACH)</div><div class="gaf-method-sub">Best for long-term support</div></div></div><span class="gaf-method-chevron"><i class="fas fa-chevron-down"></i></span></div></div>';

  // Express checkout
  h+='<div class="gaf-express-label">Express checkout</div>';
  h+='<div class="gaf-express-grid">';
  h+='<div class="gaf-express-btn">Apple Pay</div>';
  h+='<div class="gaf-express-btn" style="border-color:'+ACCENT+'">Google Pay</div>';
  h+='<div class="gaf-express-btn">PayPal</div>';
  h+='<div class="gaf-express-btn">Venmo</div>';
  h+='</div>';

  // Card payment
  h+='<div class="gaf-method-card'+(S.method==='card'?' active':'')+'" data-method="card"><div class="gaf-method-top"><div class="gaf-method-left"><span class="gaf-method-icon"><i class="fas fa-credit-card"></i></span><div><div class="gaf-method-name">Card payment</div></div></div><span class="gaf-method-chevron"><i class="fas fa-chevron-down"></i></span></div>';
  h+='<div class="gaf-method-form"><div class="gaf-field"><label>Name on card</label><input type="text" id="gaf-cardname" placeholder="John Doe" value="'+S.name+'"></div><div class="gaf-field"><label>Card number</label><input type="text" placeholder="1234 5678 9012 3456" maxlength="19"></div><div class="gaf-field-row"><div class="gaf-field"><label>Expiry</label><input type="text" placeholder="MM/YY" maxlength="5"></div><div class="gaf-field"><label>CVC</label><input type="text" placeholder="123" maxlength="4"></div></div></div>';
  h+='</div>';

  // Trust
  h+='<div class="gaf-s3-trust"><i class="fas fa-lock"></i> Secure payment &bull; Powered by Stripe</div>';

  // CTA
  h+='<button class="gaf-s3-cta" id="gaf-cta3">Complete Payment &mdash; $'+annual+' / year</button>';
  return h;
}

// ========== SCREEN 4: Success ==========
function screen4(){
  var annual = getAnnual();
  var name = S.name || (S.selectedAccount ? DEMO_ACCOUNTS[S.selectedAccount].name : 'Supporter');
  var date = new Date().toLocaleDateString('en-US',{year:'numeric',month:'long',day:'numeric'});
  var shareText = encodeURIComponent("I just became an official supporter of "+SITE_NAME+"! Supporting free "+SITE_CAUSE+" for everyone. "+SITE_URL);

  var h='';
  h+='<div style="text-align:center">';
  h+='<div class="gaf-s4-confirm">Your <strong>$'+annual+' every year</strong> support is confirmed.<br>You\'re now one of us &mdash; helping keep '+SITE_CAUSE+' free for millions worldwide.</div>';
  h+='<div class="gaf-s4-badge"><i class="far fa-heart"></i> Official Supporter of '+SITE_NAME+'</div>';
  h+='</div>';

  // Certificate
  h+='<div class="gaf-cert">';
  h+='<div class="gaf-cert-bar"></div>';
  h+='<div class="gaf-cert-icons"><span style="color:'+ACCENT+'"><i class="fas fa-heart"></i></span><span class="share-icon"><i class="fas fa-share-from-square"></i></span></div>';
  h+='<div class="gaf-cert-label">Certificate of Support</div>';
  h+='<hr>';
  h+='<div class="gaf-cert-small">This certifies that</div>';
  h+='<div class="gaf-cert-name">'+name+'</div>';
  h+='<div class="gaf-cert-small">is a proud supporter of</div>';
  h+='<div class="gaf-cert-site"><div class="gaf-cert-site-icon">ST</div><span style="font-weight:700;font-size:15px">'+SITE_NAME+'</span></div>';
  h+='<hr>';
  h+='<div class="gaf-cert-cause">For keeping '+SITE_CAUSE+' free & accessible for everyone</div>';
  h+='<div class="gaf-cert-amount">$'+annual+' every year</div>';
  h+='<div class="gaf-cert-date">'+date+'</div>';
  h+='<div class="gaf-cert-perk"><i class="fas fa-check" style="margin-right:4px"></i> Your '+SITE_NAME+' experience will be <strong>ads-free</strong> while your support is active.</div>';
  h+='</div>';

  // Hide toggle
  h+='<div class="gaf-hide-toggle"><span class="circle"></span> Hide amount from certificate</div>';

  // Share
  h+='<div class="gaf-share-label">Share Your Support</div>';
  h+='<div class="gaf-share-grid">';
  h+='<a class="gaf-share-btn" href="https://twitter.com/intent/tweet?text='+shareText+'" target="_blank"><i class="fab fa-x-twitter"></i> X</a>';
  h+='<a class="gaf-share-btn" href="https://www.linkedin.com/sharing/share-offsite/?url='+encodeURIComponent(SITE_URL)+'" target="_blank"><i class="fab fa-linkedin-in"></i> LinkedIn</a>';
  h+='<a class="gaf-share-btn" href="https://wa.me/?text='+shareText+'" target="_blank"><i class="fab fa-whatsapp"></i> WhatsApp</a>';
  h+='</div>';

  h+='<div class="gaf-footer-text"><i class="far fa-envelope"></i> Certificate and invoice sent to your email</div>';
  return h;
}

// ========== EVENT BINDING ==========
function bindEvents(){
  // Screen 1 — tip presets
  var presets = document.querySelectorAll('.gaf-preset');
  presets.forEach(function(p){
    p.addEventListener('click', function(){
      var tipVal = parseInt(this.getAttribute('data-tip'));
      S.tip = isNaN(tipVal) ? 0 : tipVal;
      presets.forEach(function(x){ x.classList.remove('active'); });
      this.classList.add('active');
      updateCta1();
    });
  });

  var cta1 = document.getElementById('gaf-cta1');
  if(cta1) cta1.addEventListener('click', function(){ S.screen=2; renderScreen(); });

  // Screen 2
  var accounts = document.querySelectorAll('.gaf-account');
  accounts.forEach(function(a){
    a.addEventListener('click', function(){
      S.selectedAccount = parseInt(this.getAttribute('data-idx'));
      var acc = DEMO_ACCOUNTS[S.selectedAccount];
      S.name = acc.name;
      S.email = acc.email;
      S.screen = 3;
      renderScreen();
    });
  });

  var useEmail = document.getElementById('gaf-use-email');
  if(useEmail) useEmail.addEventListener('click', function(){ S.screen=3; renderScreen(); });

  // Screen 3
  var methods = document.querySelectorAll('.gaf-method-card');
  methods.forEach(function(m){
    m.addEventListener('click', function(){
      var mt = this.getAttribute('data-method');
      S.method = (S.method===mt) ? '' : mt;
      methods.forEach(function(x){ x.classList.remove('active'); });
      if(S.method) this.classList.add('active');
    });
  });

  var cardname = document.getElementById('gaf-cardname');
  if(cardname) cardname.addEventListener('input', function(){ S.name = this.value; });

  var cta3 = document.getElementById('gaf-cta3');
  if(cta3) cta3.addEventListener('click', function(){
    this.innerHTML = '<span class="gaf-spinner"></span> Processing...';
    this.classList.add('processing');
    var self = this;
    setTimeout(function(){ self.classList.remove('processing'); S.screen=4; renderScreen(); }, 1800);
  });
}

function updateScreen1(){
  updateCta1();
}

function updateCta1(){
  var total = getTotal();
  var cta = document.getElementById('gaf-cta1');
  if(cta) cta.textContent = "I'm In. Take My Money. \u2014 $"+total+"/mo";
  var daily = document.getElementById('gaf-daily');
  if(daily) daily.textContent = '$'+getDaily()+'/day';
  var amtDisplay = document.querySelector('.gaf-amt-input');
  if(amtDisplay) amtDisplay.textContent = total;
  var billing = document.getElementById('gaf-billing');
  if(billing) billing.innerHTML = '<i class="fas fa-chevron-down" style="font-size:8px"></i> $'+getAnnual()+'/yr \u2014 Save ~17%';
}

// ========== INIT ==========
setTimeout(function(){
  scanAds();
  if(CFG.poll>0) setInterval(scanAds, CFG.poll);
  if(typeof MutationObserver!=='undefined'){
    var obs = new MutationObserver(function(muts){
      var shouldScan = false;
      muts.forEach(function(m){ if(m.addedNodes.length) shouldScan=true; });
      if(shouldScan) setTimeout(scanAds, 500);
    });
    obs.observe(document.body, {childList:true, subtree:true});
  }
}, CFG.delay);

// Expose globally
window.gafOpenPopup = openPopup;
window.gafOpenDonate = function(){
  S.tip = 0;
  openPopup();
};
// Open directly at Google Sign-In (Screen 2) with plan pre-selected
window.gafOpenWithPlan = function(){
  S.screen = 2;
  S.tip = 0;
  S.method = '';
  S.selectedAccount = null;
  document.body.style.overflow = 'hidden';
  var overlay = document.createElement('div');
  overlay.className = 'gaf-overlay';
  overlay.id = 'gaf-overlay';
  overlay.innerHTML = '<div class="gaf-popup" id="gaf-popup"><button class="gaf-close" id="gaf-close">&times;</button><div class="gaf-body" id="gaf-body"></div></div>';
  document.body.appendChild(overlay);
  requestAnimationFrame(function(){ requestAnimationFrame(function(){ overlay.classList.add('active'); }); });
  overlay.addEventListener('click', function(e){ if(e.target===overlay) closePopup(); });
  document.getElementById('gaf-close').addEventListener('click', closePopup);
  document.addEventListener('keydown', escHandler);
  renderScreen();
};

})();
