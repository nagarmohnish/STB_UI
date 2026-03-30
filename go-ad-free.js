(function(){
"use strict";

// ========== BRAND CONFIG ==========
var P = "#f5c518";     // Primary (yellow)
var PD = "#d4a80e";    // Primary dark (darker yellow)
var PL = "#fef9e7";    // Primary light (cream)
var PT = "rgba(245,197,24,0.25)"; // Primary transparent

var SITE_NAME = "Shark Tank Blog";
var SITE_CAUSE = "Shark Tank coverage";
var SITE_AUDIENCE = "entrepreneurs and fans worldwide";
var SITE_TITLE = "Support Shark Tank Blog";
var SITE_URL = "https://nagarmohnish.github.io/STB_UI/";

var BASE_PRICE = 14.99;
var TIP_OPTIONS = [0, 5, 10, 25];
var TIP_LABELS = ["Just the plan","+ $5","+ $10","+ $25"];
var TIP_TAGLINES = [
  "All good \u2014 you're already awesome.",
  "Buys our writer an extra coffee.",
  "Keeps the servers warm at night.",
  "Basically a Shark Tank investor now."
];

// ========== SCRIPT TAG CONFIG ==========
var scriptTag = document.currentScript || document.querySelector('script[src*="go-ad-free"]');
var CFG = {
  delay: parseInt((scriptTag&&scriptTag.getAttribute('data-delay'))||'1500'),
  poll: parseInt((scriptTag&&scriptTag.getAttribute('data-poll'))||'3000'),
  extra: (scriptTag&&scriptTag.getAttribute('data-selectors'))||'',
  utm: (scriptTag&&scriptTag.getAttribute('data-utm-param'))||'utm_source=go-ad-free-widget'
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
var S = {screen:1, tip:0, customTip:0, isCustomTip:false, method:"", name:"", email:""};

// ========== INJECT CSS ==========
var styleEl = document.createElement('style');
styleEl.textContent = `
@keyframes gaf-fadeIn{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:translateY(0)}}
@keyframes gaf-popIn{from{opacity:0;transform:scale(.94) translateY(10px)}to{opacity:1;transform:scale(1) translateY(0)}}
.gaf-bar{display:flex;align-items:center;justify-content:flex-end;height:30px;padding:0 10px;background:#1e1e1e;border-radius:4px 4px 0 0;cursor:pointer;animation:gaf-fadeIn .3s ease-out;box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;margin:0}
.gaf-bar-cta{display:inline-flex;align-items:center;gap:4px;padding:4px 14px;background:#f5d442;color:#1e1e1e;font-size:10.5px;font-weight:800;border-radius:14px;white-space:nowrap;letter-spacing:.4px;text-transform:uppercase;transition:transform .15s,box-shadow .15s}
.gaf-bar:hover .gaf-bar-cta{transform:scale(1.03);box-shadow:0 2px 8px rgba(245,212,66,.3)}
.gaf-bar-cta svg{width:10px;height:10px;transition:transform .15s}
.gaf-bar:hover .gaf-bar-cta svg{transform:translateX(2px)}
.gaf-overlay{position:fixed;inset:0;z-index:9999999;background:rgba(0,0,0,.45);backdrop-filter:blur(6px);display:flex;align-items:center;justify-content:center;animation:gaf-fadeIn .25s ease-out}
.gaf-popup{width:440px;max-width:calc(100% - 32px);max-height:90vh;overflow-y:auto;border-radius:20px;background:#fff;box-shadow:0 24px 80px rgba(0,0,0,.2);animation:gaf-popIn .3s ease-out;position:relative;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;box-sizing:border-box}
.gaf-popup *{box-sizing:border-box}
.gaf-close{position:absolute;top:14px;right:16px;width:30px;height:30px;border:none;background:rgba(0,0,0,.06);border-radius:50%;cursor:pointer;font-size:18px;color:#666;display:flex;align-items:center;justify-content:center;transition:background .15s;z-index:2}
.gaf-close:hover{background:rgba(0,0,0,.12)}
.gaf-body{padding:28px 28px 22px}
.gaf-title{font-size:1.35em;font-weight:800;text-align:center;margin-bottom:18px;color:#1a1a1a}
.gaf-freq-wrap{display:flex;justify-content:center;margin-bottom:16px}
.gaf-freq{padding:8px 18px;border:1.5px solid #ddd;border-radius:25px;font-size:13px;font-weight:600;background:#fff;color:#333;cursor:pointer;-webkit-appearance:none;appearance:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23666' stroke-width='1.5' fill='none'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 12px center;padding-right:36px}
.gaf-amount-box{border:1.5px solid #e0e0e0;border-radius:12px;padding:14px 18px;display:flex;align-items:center;justify-content:space-between;margin-bottom:16px}
.gaf-amount-input{font-size:2em;font-weight:800;border:none;outline:none;width:120px;color:#1a1a1a;background:transparent;font-family:inherit}
.gaf-perday{font-size:12px;color:#888;text-align:right}
.gaf-presets{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:14px}
.gaf-preset{padding:10px;border:1.5px solid #e0e0e0;border-radius:10px;text-align:center;cursor:pointer;font-weight:700;font-size:15px;color:#333;background:#fff;transition:all .15s;position:relative}
.gaf-preset:hover{border-color:${P}}
.gaf-preset.active{border-color:${P};background:${PL};color:${PD}}
.gaf-preset .pop-label{position:absolute;top:-8px;left:50%;transform:translateX(-50%);font-size:9px;font-weight:700;color:${P};background:#fff;padding:0 6px;border:1px solid ${P};border-radius:8px;white-space:nowrap}
.gaf-perk{text-align:center;font-size:13px;color:${P};font-weight:600;margin-bottom:16px}
.gaf-main-cta{width:100%;padding:15px;border:none;border-radius:12px;background:${P};color:#111;font-size:15px;font-weight:700;cursor:pointer;box-shadow:0 4px 16px ${PT};transition:background .15s,transform .15s;font-family:inherit}
.gaf-main-cta:hover{background:${PD};transform:translateY(-1px)}
.gaf-main-cta:active{transform:translateY(0)}
.gaf-main-cta.processing{background:${PD};opacity:.7;cursor:not-allowed}
.gaf-trust{text-align:center;margin-top:14px;font-size:11px;color:#aaa}
.gaf-bottom-line{text-align:center;margin-top:8px;font-size:10.5px;color:#bbb}
.gaf-summary{text-align:center;margin-bottom:18px}
.gaf-summary-label{font-size:12px;color:#888;margin-bottom:4px}
.gaf-summary-amount{font-size:2em;font-weight:800;color:#1a1a1a}
.gaf-summary-cause{font-size:13px;color:${P};font-weight:600}
.gaf-field{margin-bottom:14px}
.gaf-field label{display:block;font-size:12px;font-weight:600;color:#555;margin-bottom:5px}
.gaf-field input{width:100%;padding:11px 14px;border:1.5px solid #ddd;border-radius:8px;font-size:14px;outline:none;font-family:inherit;transition:border-color .15s}
.gaf-field input:focus{border-color:${P}}
.gaf-method-heading{font-size:13px;font-weight:700;color:#888;text-align:center;margin:16px 0 10px;text-transform:uppercase;letter-spacing:.5px}
.gaf-method-card{border:1.5px solid #e0e0e0;border-radius:12px;padding:14px 16px;margin-bottom:10px;cursor:pointer;transition:border-color .15s,background .15s}
.gaf-method-card:hover{border-color:${P}}
.gaf-method-card.active{border-color:${P};background:${PL}}
.gaf-method-top{display:flex;align-items:center;gap:10px}
.gaf-method-icon{font-size:20px}
.gaf-method-info{flex:1}
.gaf-method-name{font-weight:700;font-size:14px;color:#333}
.gaf-method-sub{font-size:11px;color:${P};font-weight:600}
.gaf-method-form{margin-top:12px;display:none}
.gaf-method-card.active .gaf-method-form{display:block}
.gaf-method-form .gaf-row{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.gaf-express-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:14px}
.gaf-express-btn{padding:10px;border:1.5px solid #e0e0e0;border-radius:10px;text-align:center;cursor:pointer;font-size:12px;font-weight:700;color:#333;background:#fff;transition:border-color .15s}
.gaf-express-btn:hover{border-color:${P}}
.gaf-check-circle{width:48px;height:48px;border-radius:50%;border:2.5px solid ${P};background:#1a1a1a;display:flex;align-items:center;justify-content:center;margin:0 auto 14px;font-size:24px;color:${P}}
.gaf-confirm-text{text-align:center;font-size:14px;color:#555;line-height:1.5;margin-bottom:14px}
.gaf-confirm-text strong{color:#1a1a1a}
.gaf-badge{display:inline-block;padding:6px 16px;border:1.5px solid ${P};border-radius:20px;background:#1a1a1a;color:${P};font-size:12px;font-weight:700;margin-bottom:20px}
.gaf-cert{background:#fff;border:1px solid #e8e8e8;border-radius:14px;padding:24px;margin-bottom:18px;box-shadow:0 2px 12px rgba(0,0,0,.04);text-align:center}
.gaf-cert-top{display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;font-size:16px}
.gaf-cert-label{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:#aaa;margin-bottom:12px}
.gaf-cert hr{border:none;border-top:1px solid #eee;margin:10px 0}
.gaf-cert-name{font-size:1.4em;font-weight:800;color:#1a1a1a;margin:6px 0}
.gaf-cert-site{display:flex;align-items:center;justify-content:center;gap:8px;margin:10px 0}
.gaf-cert-site-icon{width:28px;height:28px;border-radius:50%;background:${P};display:flex;align-items:center;justify-content:center;color:#fff;font-size:13px;font-weight:700}
.gaf-cert-cause{font-style:italic;color:#777;font-size:13px;margin:8px 0}
.gaf-cert-amount{font-weight:800;font-size:15px;color:#1a1a1a}
.gaf-cert-date{font-size:12px;color:#aaa;margin-top:4px}
.gaf-cert-perk{background:#1a1a1a;border-radius:0 0 14px 14px;padding:14px;margin:-24px -24px 0;margin-top:16px;font-size:13px;color:${P};font-weight:600}
.gaf-share-label{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#aaa;text-align:center;margin-bottom:10px}
.gaf-share-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:16px}
.gaf-share-btn{padding:10px;border:none;border-radius:10px;color:#fff;font-size:13px;font-weight:700;cursor:pointer;text-decoration:none;text-align:center;display:block}
.gaf-share-x{background:#000}
.gaf-share-li{background:#0077b5}
.gaf-share-wa{background:#25d366}
.gaf-footer-links{text-align:center;font-size:12px;color:#aaa}
.gaf-footer-links a{color:${P};cursor:pointer;text-decoration:underline}
.gaf-price-hero{text-align:center;margin-bottom:20px}
.gaf-price-amount{font-size:2.8em;font-weight:900;color:#1a1a1a;letter-spacing:-1px;line-height:1}
.gaf-price-amount span{font-size:.35em;font-weight:600;color:#999;letter-spacing:0;vertical-align:top;position:relative;top:8px}
.gaf-price-period{font-size:13px;color:#888;margin-top:4px}
.gaf-price-slash{font-size:.5em;color:#bbb;font-weight:400;margin:0 1px}
.gaf-tip-section{margin:18px 0 16px;padding:16px;background:#fafafa;border-radius:12px;border:1px solid #f0f0f0}
.gaf-tip-label{font-size:13px;font-weight:700;color:#333;margin-bottom:4px;display:flex;align-items:center;gap:6px}
.gaf-tip-sub{font-size:11.5px;color:#999;margin-bottom:12px}
.gaf-tip-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin-bottom:8px}
.gaf-tip-btn{padding:9px 4px;border:1.5px solid #e4e4e4;border-radius:8px;text-align:center;cursor:pointer;font-weight:700;font-size:12.5px;color:#555;background:#fff;transition:all .15s;position:relative}
.gaf-tip-btn:hover{border-color:${P};color:#333}
.gaf-tip-btn.active{border-color:${P};background:#1e1e1e;color:${P}}
.gaf-tip-tagline{text-align:center;font-size:11.5px;color:${PD};font-weight:600;min-height:16px;margin-top:6px;transition:opacity .2s}
.gaf-tip-custom-row{display:flex;align-items:center;gap:8px;margin-top:10px}
.gaf-tip-custom-row label{font-size:11px;color:#888;white-space:nowrap;font-weight:600}
.gaf-tip-custom-row input{flex:1;padding:7px 10px;border:1.5px solid #e0e0e0;border-radius:6px;font-size:13px;outline:none;font-family:inherit;width:80px;transition:border-color .15s}
.gaf-tip-custom-row input:focus{border-color:${P}}
.gaf-total-row{display:flex;align-items:center;justify-content:space-between;padding:12px 16px;background:#1e1e1e;border-radius:10px;margin-bottom:16px}
.gaf-total-label{font-size:12px;color:rgba(255,255,255,.6);font-weight:600}
.gaf-total-amount{font-size:20px;font-weight:800;color:${P}}
.gaf-what-you-get{margin-bottom:16px}
.gaf-what-you-get-title{font-size:11px;text-transform:uppercase;letter-spacing:.8px;color:#aaa;font-weight:700;margin-bottom:8px}
.gaf-perk-item{display:flex;align-items:center;gap:8px;font-size:13px;color:#555;padding:4px 0}
.gaf-perk-item .perk-check{color:${P};font-weight:700;font-size:14px}
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
  bar.innerHTML = '<span class="gaf-bar-cta">Go Ads-Free <svg viewBox="0 0 12 12"><path d="M4.5 2L8.5 6L4.5 10" stroke="#1e1e1e" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg></span>';
  bar.addEventListener('click', function(e){e.stopPropagation();openPopup()});
  ad.parentNode.insertBefore(bar, ad);
}

// ========== POPUP ==========
function getTip(){return S.isCustomTip ? S.customTip : S.tip}
function getTotal(){return +(BASE_PRICE + getTip()).toFixed(2)}
function getCtaText(verb){return verb + ' $' + getTotal().toFixed(2) + ' / year'}

function openPopup(){
  S.screen=1; S.method=''; S.name=''; S.email='';
  document.body.style.overflow='hidden';
  var overlay = document.createElement('div');
  overlay.className='gaf-overlay';
  overlay.id='gaf-overlay';
  overlay.innerHTML='<div class="gaf-popup" id="gaf-popup"><button class="gaf-close" id="gaf-close">\u00d7</button><div class="gaf-body" id="gaf-body"></div></div>';
  document.body.appendChild(overlay);
  overlay.addEventListener('click',function(e){if(e.target===overlay)closePopup()});
  document.getElementById('gaf-close').addEventListener('click',closePopup);
  document.addEventListener('keydown',escHandler);
  renderScreen();
}

function closePopup(){
  var o=document.getElementById('gaf-overlay');
  if(o)o.remove();
  document.body.style.overflow='';
  document.removeEventListener('keydown',escHandler);
}

function escHandler(e){if(e.key==='Escape')closePopup()}

function renderScreen(){
  var body=document.getElementById('gaf-body');
  if(!body)return;
  if(S.screen===1)body.innerHTML=screen1();
  else if(S.screen===2)body.innerHTML=screen2();
  else body.innerHTML=screen3();
  bindEvents();
}

// ========== SCREEN 1 ==========
function screen1(){
  var tipVal = getTip();
  var tipIdx = S.isCustomTip ? -1 : TIP_OPTIONS.indexOf(S.tip);
  var tagline = (tipIdx >= 0) ? TIP_TAGLINES[tipIdx] : (tipVal > 0 ? 'You\'re a legend. Seriously.' : '');

  var h='<div class="gaf-title">Go Ads-Free</div>';

  // Price hero
  h+='<div class="gaf-price-hero">';
  h+='<div class="gaf-price-amount">$'+BASE_PRICE.toFixed(2)+'<span> / year</span></div>';
  h+='<div class="gaf-price-period">One plan. No ads. All content.</div>';
  h+='</div>';

  // What you get
  h+='<div class="gaf-what-you-get">';
  h+='<div class="gaf-what-you-get-title">What you get</div>';
  h+='<div class="gaf-perk-item"><span class="perk-check">\u2713</span> 100% ads-free reading experience</div>';
  h+='<div class="gaf-perk-item"><span class="perk-check">\u2713</span> Full access to all Shark Tank content</div>';
  h+='<div class="gaf-perk-item"><span class="perk-check">\u2713</span> Support independent Shark Tank journalism</div>';
  h+='</div>';

  // Tip section
  h+='<div class="gaf-tip-section">';
  h+='<div class="gaf-tip-label">\ud83e\udd88 Want to throw in a little extra?</div>';
  h+='<div class="gaf-tip-sub">Every dollar goes toward better coverage, faster updates, and keeping this blog alive.</div>';
  h+='<div class="gaf-tip-grid" id="gaf-tips">';
  TIP_OPTIONS.forEach(function(t, i){
    var act = (!S.isCustomTip && S.tip === t) ? 'active' : '';
    h+='<div class="gaf-tip-btn '+act+'" data-tip="'+t+'">'+TIP_LABELS[i]+'</div>';
  });
  h+='</div>';
  h+='<div class="gaf-tip-tagline" id="gaf-tagline">'+tagline+'</div>';
  h+='<div class="gaf-tip-custom-row"><label>Custom tip:</label><input type="text" id="gaf-custom-tip" placeholder="$0" value="'+(S.isCustomTip && S.customTip > 0 ? '$'+S.customTip : '')+'"></div>';
  h+='</div>';

  // Total
  h+='<div class="gaf-total-row"><span class="gaf-total-label">Total per year</span><span class="gaf-total-amount" id="gaf-total">$'+getTotal().toFixed(2)+'</span></div>';

  h+='<button class="gaf-main-cta" id="gaf-cta1">'+getCtaText('Continue \u2014')+'</button>';
  h+='<div class="gaf-trust">\ud83d\udd12 Secure \u00b7 Cancel anytime \u00b7 Takes 10 seconds</div>';
  return h;
}

// ========== SCREEN 2 ==========
function screen2(){
  var a=getTotal();
  var h='<div class="gaf-summary"><div class="gaf-summary-label">You\'re supporting</div><div class="gaf-summary-amount">$'+a.toFixed(2)+' / year</div><div class="gaf-summary-cause">Helping '+SITE_CAUSE+' every day</div></div>';
  h+='<div class="gaf-field"><label>Email</label><input type="email" id="gaf-email" placeholder="you@example.com" value="'+S.email+'"></div>';
  h+='<div class="gaf-method-heading">Select payment method</div>';
  h+='<div class="gaf-method-card'+(S.method==='bank'?' active':'')+'" data-method="bank"><div class="gaf-method-top"><span class="gaf-method-icon">\ud83c\udfe6</span><div class="gaf-method-info"><div class="gaf-method-name">Direct Bank Transfer (ACH)</div><div class="gaf-method-sub">Best for long-term support</div></div></div></div>';
  h+='<div class="gaf-method-heading">Express checkout</div>';
  h+='<div class="gaf-express-grid"><div class="gaf-express-btn">\uf8ff Pay</div><div class="gaf-express-btn">G Pay</div><div class="gaf-express-btn">PayPal</div><div class="gaf-express-btn">Venmo</div></div>';
  h+='<div class="gaf-method-card'+(S.method==='card'?' active':'')+'" data-method="card"><div class="gaf-method-top"><span class="gaf-method-icon">\ud83d\udcb3</span><div class="gaf-method-info"><div class="gaf-method-name">Card Payment</div><div class="gaf-method-sub">Visa, Mastercard, AmEx</div></div></div><div class="gaf-method-form"><div class="gaf-field"><label>Name on card</label><input type="text" id="gaf-cardname" placeholder="John Doe" value="'+S.name+'"></div><div class="gaf-field"><label>Card number</label><input type="text" placeholder="1234 5678 9012 3456" maxlength="19"></div><div class="gaf-row"><div class="gaf-field"><label>Expiry</label><input type="text" placeholder="MM/YY" maxlength="5"></div><div class="gaf-field"><label>CVC</label><input type="text" placeholder="123" maxlength="4"></div></div></div></div>';
  h+='<div class="gaf-trust">\ud83d\udd12 Secure payment \u2022 Powered by Stripe</div>';
  h+='<button class="gaf-main-cta" id="gaf-cta2">'+getCtaText('Pay')+'</button>';
  return h;
}

// ========== SCREEN 3 ==========
function screen3(){
  var a=getTotal();
  var name=S.name||S.email||'Supporter';
  var date=new Date().toLocaleDateString('en-US',{year:'numeric',month:'long',day:'numeric'});
  var freqLabel='yearly';
  var shareText=encodeURIComponent("I just became an official supporter of "+SITE_NAME+"! \ud83e\udd88 Supporting free "+SITE_CAUSE+" for everyone. "+SITE_URL);

  var h='<div style="text-align:center">';
  h+='<div class="gaf-check-circle">\u2713</div>';
  h+='<div class="gaf-confirm-text"><strong>Your $'+a.toFixed(2)+'/year support is confirmed.</strong><br>You\'re now one of us \u2014 helping keep '+SITE_CAUSE+' free for '+SITE_AUDIENCE+'.</div>';
  h+='<div class="gaf-badge">\ud83d\udc99 Official Supporter of '+SITE_NAME+'</div>';
  h+='</div>';

  h+='<div class="gaf-cert">';
  h+='<div class="gaf-cert-top"><span>\u2764\ufe0f</span><span style="cursor:pointer">\ud83d\udcE4</span></div>';
  h+='<div class="gaf-cert-label">Certificate of Support</div>';
  h+='<hr>';
  h+='<div style="font-size:12px;color:#aaa">This certifies that</div>';
  h+='<div class="gaf-cert-name">'+name+'</div>';
  h+='<div style="font-size:12px;color:#aaa">is a proud supporter of</div>';
  h+='<div class="gaf-cert-site"><div class="gaf-cert-site-icon">ST</div><span style="font-weight:700;font-size:15px">'+SITE_NAME+'</span></div>';
  h+='<hr>';
  h+='<div class="gaf-cert-cause">For keeping '+SITE_CAUSE+' free & accessible for everyone</div>';
  h+='<div class="gaf-cert-amount">$'+a.toFixed(2)+' / year</div>';
  h+='<div class="gaf-cert-date">'+date+'</div>';
  h+='<div class="gaf-cert-perk">\u2714 Your '+SITE_NAME+' experience will be <strong>ads-free</strong> while your support is active.</div>';
  h+='</div>';

  h+='<div class="gaf-share-label">Show others you support '+SITE_CAUSE.toUpperCase()+'</div>';
  h+='<div class="gaf-share-grid">';
  h+='<a class="gaf-share-btn gaf-share-x" href="https://twitter.com/intent/tweet?text='+shareText+'" target="_blank">X</a>';
  h+='<a class="gaf-share-btn gaf-share-li" href="https://www.linkedin.com/sharing/share-offsite/?url='+encodeURIComponent(SITE_URL)+'" target="_blank">LinkedIn</a>';
  h+='<a class="gaf-share-btn gaf-share-wa" href="https://wa.me/?text='+shareText+'" target="_blank">WhatsApp</a>';
  h+='</div>';

  h+='<div class="gaf-footer-links"><a onclick="closePopup()">Manage your support</a><br>\u2709 Certificate and invoice sent to your email</div>';
  return h;
}

// ========== EVENT BINDING ==========
function bindEvents(){
  // Screen 1 - Tip buttons
  var tipBtns=document.querySelectorAll('.gaf-tip-btn');
  tipBtns.forEach(function(b){
    b.addEventListener('click',function(){
      S.tip=parseInt(this.getAttribute('data-tip'));
      S.isCustomTip=false;
      S.customTip=0;
      var ci=document.getElementById('gaf-custom-tip');
      if(ci)ci.value='';
      tipBtns.forEach(function(x){x.classList.remove('active')});
      this.classList.add('active');
      var idx=TIP_OPTIONS.indexOf(S.tip);
      var tl=document.getElementById('gaf-tagline');
      if(tl)tl.textContent=(idx>=0)?TIP_TAGLINES[idx]:'';
      updateTotal();
    });
  });

  // Custom tip input
  var customTip=document.getElementById('gaf-custom-tip');
  if(customTip){
    customTip.addEventListener('focus',function(){
      var v=S.isCustomTip?S.customTip:0;
      this.value=v>0?v:'';
    });
    customTip.addEventListener('input',function(){
      var v=parseInt(this.value.replace(/[^0-9]/g,''))||0;
      S.customTip=v;S.isCustomTip=v>0;
      if(S.isCustomTip){
        S.tip=0;
        tipBtns.forEach(function(x){x.classList.remove('active')});
        var tl=document.getElementById('gaf-tagline');
        if(tl)tl.textContent=v>0?'You\'re a legend. Seriously.':'';
      }
      updateTotal();
    });
    customTip.addEventListener('blur',function(){
      if(S.isCustomTip&&S.customTip>0)this.value='$'+S.customTip;
      else this.value='';
    });
  }

  var cta1=document.getElementById('gaf-cta1');
  if(cta1)cta1.addEventListener('click',function(){S.screen=2;renderScreen()});

  // Screen 2
  var methods=document.querySelectorAll('.gaf-method-card');
  methods.forEach(function(m){
    m.addEventListener('click',function(){
      var mt=this.getAttribute('data-method');
      S.method=(S.method===mt)?'':mt;
      methods.forEach(function(x){x.classList.remove('active')});
      if(S.method)this.classList.add('active');
    });
  });

  var emailInput=document.getElementById('gaf-email');
  if(emailInput)emailInput.addEventListener('input',function(){S.email=this.value});

  var cardname=document.getElementById('gaf-cardname');
  if(cardname)cardname.addEventListener('input',function(){S.name=this.value});

  var cta2=document.getElementById('gaf-cta2');
  if(cta2)cta2.addEventListener('click',function(){
    if(!S.email){var ei=document.getElementById('gaf-email');if(ei){ei.style.borderColor='#e74c3c';ei.focus()}return}
    this.textContent='Processing...';
    this.classList.add('processing');
    var self=this;
    setTimeout(function(){self.classList.remove('processing');S.screen=3;renderScreen()},1800);
  });
}

function updateTotal(){
  var tot=document.getElementById('gaf-total');
  if(tot)tot.textContent='$'+getTotal().toFixed(2);
  var cta=document.getElementById('gaf-cta1');
  if(cta)cta.textContent=getCtaText('Continue \u2014');
}

// ========== INIT ==========
setTimeout(function(){
  scanAds();
  if(CFG.poll>0)setInterval(scanAds, CFG.poll);

  // MutationObserver for dynamic ads
  if(typeof MutationObserver!=='undefined'){
    var obs=new MutationObserver(function(muts){
      var shouldScan=false;
      muts.forEach(function(m){if(m.addedNodes.length)shouldScan=true});
      if(shouldScan)setTimeout(scanAds,500);
    });
    obs.observe(document.body,{childList:true,subtree:true});
  }
}, CFG.delay);

})();
