(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))g(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const b of i.addedNodes)b.tagName==="LINK"&&b.rel==="modulepreload"&&g(b)}).observe(document,{childList:!0,subtree:!0});function h(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function g(o){if(o.ep)return;o.ep=!0;const i=h(o);fetch(o.href,i)}})();const Y=E=>typeof E!="string"?E:E.replace(/[&'`"<>]/g,e=>({"&":"&amp;","'":"&#x27;","`":"&#x60;",'"':"&quot;","<":"&lt;",">":"&gt;"})[e]);document.addEventListener("DOMContentLoaded",()=>{const E=document.querySelector("header"),e=document.forms["jk-load"];e.channelPicker=e.elements["channel-picker"],e.datetimeField=e.querySelector(".datetime-field"),e._date=e.elements.date,e.timeStart=e.elements["time-start"],e.timeEnd=e.elements["time-end"],e.dateTimeButtons=e.querySelector(".datetime-buttons"),e.dateButtons=e.querySelector(".date-buttons"),e.dateMinus1D=e.elements["date--1d"],e.dateMinus2D=e.elements["date--2d"],e.dateMinus5D=e.elements["date--5d"],e.dateMinus7D=e.elements["date--7d"],e.dateMinus14D=e.elements["date--14d"],e.dateMinus1M=e.elements["date--1m"],e.dateMinus3M=e.elements["date--3m"],e.dateMinus6M=e.elements["date--6m"],e.dateMinus1Y=e.elements["date--1y"],e.dateMinus5Y=e.elements["date--5y"],e.timeButtons=e.querySelector(".time-buttons"),e.timePlus1H=e.elements["time-+1h"],e.timePlus2H=e.elements["time-+2h"],e.timePlus6H=e.elements["time-+6h"],e.timePlus12H=e.elements["time-+12h"],e.timePlus1M=e.elements["time-+1m"],e.timePlus2M=e.elements["time-+2m"],e.timePlus5M=e.elements["time-+5m"],e.timePlus10M=e.elements["time-+10m"],e.timePlus30M=e.elements["time-+30m"],e.resetButton=e.elements["reset-button"],e.submitButton=e.elements["submit-button"];const h=document.getElementById("comments-list"),g=document.querySelector(".detail-pc"),o=()=>window.innerWidth<1024,i=new Date,b=new Date(i);b.setMinutes(i.getMinutes()-1);const U=("0"+i.getDate()).slice(-2),O=("0"+(i.getMonth()+1)).slice(-2),w=i.getFullYear()+"-"+O+"-"+U,k=i.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),C=b.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),j=document.title;e._date.value=w,e._date.max=w,e.timeStart.max=C,e.timeEnd.max=k;const F=()=>{if(location.search){const t=new URLSearchParams(location.search),n=a=>{if(!t.has(a))return!1;const r=t.get(a);switch(a){case"ch":return[...e.channelPicker.options].some(l=>l.value===r);case"date":const s=e._date;return r>=s.min&&r<=s.max;case"timestart":case"timeend":return r>="00:00"&&r<="23:59";default:return!1}};["ch","date","timestart","timeend"].every(a=>n(a))?(e.channelPicker.value=t.get("ch"),e._date.value=t.get("date"),e.timeStart.value=t.get("timestart"),e.timeEnd.disabled=!1,e.timeEnd.value=t.get("timeend"),e.resetButton.hidden=!1,e.submitButton.disabled=!1,$(),e.requestSubmit()):alert("過去ログの指定が不正でした。")}},_=()=>e.submitButton.disabled=!e.checkValidity();e.datetimeField.addEventListener("change",_),e.datetimeField.addEventListener("click",_);let x=!1;const q=()=>{e._date.value!==""&&e.timeStart.value!==""&&(e.timeEnd.disabled=!1,x||(e.timeEnd.value=e.timeStart.value)),e.resetButton.hidden=!1};[e._date,e.timeStart].forEach(t=>{t.addEventListener("input",q)});const $=()=>{if(e.timeStart.value===""||e.timeEnd.value==="")return;const t=e.timeStart.valueAsDate;t.setMinutes(t.getMinutes()+1);const n=t.toLocaleTimeString([],{timeZone:"UTC",hour:"2-digit",minute:"2-digit"}),a=e._date.valueAsDate.getDate()===i.getDate()-1,r=e.timeStart.value>=k,M=e.timeStart.value>=e.timeEnd.value,s=(l,u,c)=>{l[u]!==c&&(l[u]=c)};e._date.value===w?(s(e.timeStart,"max",C),s(e.timeEnd,"min",n),s(e.timeEnd,"max",k)):a&&r&&M?(s(e.timeStart,"max",""),s(e.timeEnd,"min",""),s(e.timeEnd,"max",k)):(s(e.timeStart,"max",""),s(e.timeEnd,"min",""),s(e.timeEnd,"max",""))};let f=null;[e._date,e.timeStart,e.timeEnd].forEach(t=>{t.addEventListener("focus",n=>{switch(f=n.target,f.value===""&&(f.value="00:00",f.dispatchEvent(new Event("input",{bubbles:!0})),f.dispatchEvent(new Event("change",{bubbles:!0}))),e.dateTimeButtons.hidden=!1,f){case e._date:e.dateButtons.hidden=!1,e.timeButtons.hidden=!0;break;case e.timeStart:case e.timeEnd:e.dateButtons.hidden=!0,e.timeButtons.hidden=!1;break}}),t.addEventListener("click",n=>n.preventDefault(),{once:!0}),t.addEventListener("input",$),t.addEventListener("blur",()=>{t.addEventListener("click",n=>n.preventDefault(),{once:!0})})}),e.timeEnd.addEventListener("input",()=>x=!0),document.addEventListener("click",t=>{t.target.closest(".jk-load-form")||(e.dateTimeButtons.hidden=!0,e.dateButtons.hidden=!0,e.timeButtons.hidden=!0)});const S=(t,n)=>t.setDate(t.getDate()+n),T=(t,n)=>t.setMonth(t.getMonth()+n),A=(t,n)=>t.setFullYear(t.getFullYear()+n),P=(t,n)=>t.setHours(t.getHours()+n),D=(t,n)=>t.setMinutes(t.getMinutes()+n);[{elem:e.dateMinus1D,action:t=>S(t,-1)},{elem:e.dateMinus2D,action:t=>S(t,-2)},{elem:e.dateMinus5D,action:t=>S(t,-5)},{elem:e.dateMinus7D,action:t=>S(t,-7)},{elem:e.dateMinus14D,action:t=>S(t,-14)},{elem:e.dateMinus1M,action:t=>T(t,-1)},{elem:e.dateMinus3M,action:t=>T(t,-3)},{elem:e.dateMinus6M,action:t=>T(t,-6)},{elem:e.dateMinus1Y,action:t=>A(t,-1)},{elem:e.dateMinus5Y,action:t=>A(t,-5)},{elem:e.timePlus1H,action:t=>P(t,1)},{elem:e.timePlus2H,action:t=>P(t,2)},{elem:e.timePlus6H,action:t=>P(t,6)},{elem:e.timePlus12H,action:t=>P(t,12)},{elem:e.timePlus1M,action:t=>D(t,1)},{elem:e.timePlus2M,action:t=>D(t,2)},{elem:e.timePlus5M,action:t=>D(t,5)},{elem:e.timePlus10M,action:t=>D(t,10)},{elem:e.timePlus30M,action:t=>D(t,30)}].forEach(({elem:t,action:n})=>{t.addEventListener("click",()=>{const a=f.valueAsDate;n(a),f.valueAsDate=a,f.dispatchEvent(new Event("input",{bubbles:!0})),f.dispatchEvent(new Event("change",{bubbles:!0}))})});const I=t=>{t=t.chat;const n={text:Y(t.content).replace(/\n/g,"<br>"),time:new Date(Number(t.date)*1e3).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit",second:"2-digit"})};return`<li data-thread="${t.thread}" data-no="${t.no}" data-user-id="${t.user_id}" tabindex="0">
      <span class="text">${n.text}</span><span class="time">${n.time}</span>
      <script type="application/json" class="raw-data">${JSON.stringify(t)}<\/script>
    </li>
    `},N=t=>{let n="";for(;t.length;)n+=I(t.shift());h.insertAdjacentHTML("beforeend",n)};e.addEventListener("submit",async t=>{t.preventDefault(),e.submitButton.disabled=!0,e.submitButton.textContent="読み込み中...",h.textContent="";const n=new URL(`https://jikkyo.tsukumijima.net/api/kakolog/${e.channelPicker.value}`),a=n.searchParams,r=c=>Math.floor(new Date(c).getTime()/1e3),M=r(`${e._date.value}T${e.timeStart.value}`);a.append("starttime",M);const s=new Date(`${e._date.value}T${e.timeEnd.value}`),l=e.timeStart.valueAsDate<e.timeEnd.valueAsDate?r(s):(()=>{const c=s.setDate(s.getDate()+1);return r(c)})();a.append("endtime",l),a.append("format","json"),await fetch(n).then(async c=>{const v=await c.json();c.status===200?v.error?(console.error("Error:",v.error),alert("エラー:"+v.error)):v.packet.length?N(v.packet):(console.log("not comments found"),alert("指定の期間にコメントがありませんでした。")):console.log("error or no content",c.status)}).catch(c=>{console.error("Failed to load",c)}),document.title=`${j} - ${e.channelPicker.selectedOptions[0].label} ${e._date.value.replaceAll("-","/")} ${e.timeStart.value} - ${e.timeEnd.value}`;const u=new URLSearchParams(location.search);u.set("ch",e.channelPicker.value),u.set("date",e._date.value),u.set("timestart",e.timeStart.value),u.set("timeend",e.timeEnd.value),history.pushState(null,"",`${location.pathname}?${u.toString()}`),e.submitButton.disabled=!1,e.submitButton.textContent="取得"},{passive:!1}),F(),e.addEventListener("reset",t=>{t.preventDefault(),e._date.value=w,e.timeStart.value="",e.timeEnd.value="",e.timeEnd.disabled=!0,e.dateTimeButtons.hidden=!0,e.dateButtons.hidden=!0,e.timeButtons.hidden=!0,e.resetButton.hidden=!0,e.submitButton.disabled=!0,x=!1},{passive:!1}),h.addEventListener("click",t=>{const n=t.target.closest("li"),a=document.querySelector(".detail-sp"),r=document.getElementsByClassName("same-user");if(!n||n.classList.contains("detail-sp"))return;if([...r].forEach(m=>m.classList.remove("same-user")),n.nextElementSibling&&n.nextElementSibling.classList.contains("detail-sp")){g.textContent="",a.remove();return}g.textContent!==""&&(g.textContent=""),a&&a.remove();const M=o()?n.offsetTop-2-10:n.offsetTop-(window.innerHeight-E.offsetHeight-n.offsetHeight)/2,s=t.isTrusted?"smooth":"instant";window.scrollTo({top:M,behavior:s});const l=JSON.parse(n.querySelector(".raw-data").textContent),u=document.createElement("dl"),c={thread:"スレッドID",no:"コメント番号",vpos:"再生時間",date:"日時",date_usec:"日時(小数部)",user_id:"ユーザーID",name:"ニックネーム",mail:"コマンド",premium:"プレミアム会員",anonymity:"匿名",content:"コメント"};let v="";Object.keys(l).forEach(m=>{let d=l[m];switch(m){case"vpos":const y=new Date(Number(d)*10);y.getUTCDate()-1?(y.setUTCMonth(y.getUTCDate()-2),d=y.toLocaleString([],{timeZone:"UTC",day:"numeric",hour:"numeric",minute:"numeric",second:"numeric",fractionalSecondDigits:2})):d=y.toLocaleString([],{timeZone:"UTC",hour:"numeric",minute:"numeric",second:"numeric",fractionalSecondDigits:2});break;case"date":d=new Date(Number(d)*1e3).toLocaleString([],{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit"});break;case"date_usec":d="0."+d;break;case"user_id":case"name":!l.anonymity&&(d=`<a href="https://nico.ms/user/${l.user_id}" target="_blank">${d}</a>`);break;case"premium":d==="3"&&(d="(2ch実況板からの転載)");case"anonymity":switch(d){case"0":d="いいえ";break;case"1":d="はい";break}break}v+=`<dt>${c[m]||m}</dt>
      <dd>${d}</dd>
      `}),u.innerHTML=v;const B=[...h.children].filter(m=>m.dataset.userId===l.user_id),H=`<dl>
      <dt>コメント回数</dt>
      <dd>${B.findIndex(m=>m.dataset.thread===l.thread&&m.dataset.no===l.no)+1}回目/全${B.length}回中</dd>
    </dl>
    `;g.appendChild(u.cloneNode(!0)),g.appendChild(document.createElement("hr")),g.insertAdjacentHTML("beforeend",H);const L=document.createElement("li");L.classList.add("detail-sp"),L.appendChild(u),L.appendChild(document.createElement("hr")),L.insertAdjacentHTML("beforeend",H),n.insertAdjacentElement("afterend",L),B.forEach(m=>m.classList.add("same-user"))});let p=null;h.addEventListener("focus",t=>{p=t.target},!0),h.addEventListener("keydown",t=>{switch(console.log(t.key),t.key){case"ArrowUp":t.preventDefault(),(()=>{const n=p?p.previousElementSibling??h.lastElementChild:h.firstElementChild;n.click(),n.focus()})();break;case"ArrowDown":t.preventDefault(),(()=>{var a,r;const n=((a=p==null?void 0:p.nextElementSibling)!=null&&a.classList.contains("detail-sp")?(r=p.nextElementSibling)==null?void 0:r.nextElementSibling:p==null?void 0:p.nextElementSibling)??h.firstElementChild;n.click(),n.focus()})();break;case" ":case"Enter":t.target===document.activeElement&&(t.preventDefault(),t.target.click(),t.target.focus());break}})});