/* Local interactions. No analytics, cookies or saved visitor data. */
(()=>{'use strict';
// Preserve the language anchors of the original privacy page.
if(['#fr','#en','#es','#de'].includes(location.hash)){location.replace(document.querySelector('a[href*="privacy.html"]').href.split('#')[0]+location.hash);return;}
const copy=JSON.parse(document.getElementById('page-copy').textContent);
const menu=document.querySelector('.menu-toggle'),nav=document.getElementById('navigation');
function closeMenu(){nav.dataset.open='false';menu.setAttribute('aria-expanded','false');}
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.dataset.open=String(open);});
nav.addEventListener('click',e=>{if(e.target.closest('a'))closeMenu();});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu.getAttribute('aria-expanded')==='true'){closeMenu();menu.focus();}});
const tabs=[...document.querySelectorAll('[role=tab]')];
function tab(i,focus=false){tabs.forEach((t,n)=>{t.setAttribute('aria-selected',String(i===n));t.tabIndex=i===n?0:-1;document.getElementById(t.getAttribute('aria-controls')).hidden=i!==n;});if(focus)tabs[i].focus();}
tabs.forEach((t,i)=>{t.addEventListener('click',()=>tab(i));t.addEventListener('keydown',e=>{let next;if(e.key==='ArrowRight')next=(i+1)%tabs.length;if(e.key==='ArrowLeft')next=(i+tabs.length-1)%tabs.length;if(e.key==='Home')next=0;if(e.key==='End')next=tabs.length-1;if(next!==undefined){e.preventDefault();tab(next,true);}});});
function hash(){if(location.hash==='#atelier')tab(1);}
addEventListener('hashchange',hash);hash();document.querySelectorAll('a[href="#atelier"]').forEach(a=>a.addEventListener('click',()=>tab(1)));
const dialog=document.getElementById('lightbox');let opener;
document.querySelectorAll('[data-lightbox]').forEach(b=>b.addEventListener('click',()=>{opener=b;dialog.querySelector('img').src=b.dataset.lightbox;dialog.querySelector('img').alt=b.dataset.caption;dialog.querySelector('figcaption').textContent=b.dataset.caption;dialog.showModal();}));
dialog.querySelector('button').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});dialog.addEventListener('close',()=>opener?.focus());
const bits={a:0,b:0};document.querySelectorAll('[data-bit]').forEach(b=>b.addEventListener('click',()=>{const key=b.dataset.bit;bits[key]=1-bits[key];b.setAttribute('aria-pressed',String(Boolean(bits[key])));b.querySelector('strong').textContent=bits[key];document.getElementById('bit-'+key).textContent=key.toUpperCase()+' = '+bits[key];const y=bits.a&bits.b;document.getElementById('bit-y').textContent='Y = '+y;document.querySelector('.logic-demo').dataset.on=String(Boolean(y));document.querySelector('.logic-feedback').textContent=copy.miniResult[y];}));
const video=document.getElementById('gameplay'),cover=document.querySelector('.film-play'),chapters=[...document.querySelectorAll('[data-seek]')];
cover.hidden=false;let pending=null;
video.addEventListener('loadedmetadata',()=>{if(pending!==null){video.currentTime=pending;pending=null;}});
function play(t){cover.hidden=true;if(Number.isFinite(t)){if(video.readyState>=1)video.currentTime=t;else pending=t;}video.play().catch(()=>{video.controls=true;video.focus();});}
cover.addEventListener('click',()=>play());chapters.forEach(b=>b.addEventListener('click',()=>play(Number(b.dataset.seek))));
video.addEventListener('play',()=>cover.hidden=true);video.addEventListener('timeupdate',()=>{let current;for(const b of chapters)if(video.currentTime>=Number(b.dataset.seek))current=b;chapters.forEach(b=>b===current?b.setAttribute('aria-current','true'):b.removeAttribute('aria-current'));});
})();
