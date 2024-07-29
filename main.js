import './style.scss'

import {htmlspecialchars} from './utils';

document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('header');
  const jkLoadForm = document.forms['jk-load'];
  jkLoadForm.channelPicker = jkLoadForm.elements['channel-picker'];
  jkLoadForm.datetimeField = jkLoadForm.querySelector('.datetime-field');
  jkLoadForm._date = jkLoadForm.elements['date'];
  jkLoadForm.timeStart = jkLoadForm.elements['time-start'];
  jkLoadForm.timeEnd = jkLoadForm.elements['time-end'];
  jkLoadForm.dateTimeButtons = jkLoadForm.querySelector('.datetime-buttons');
  jkLoadForm.dateButtons = jkLoadForm.querySelector('.date-buttons');
  jkLoadForm.dateMinus1D = jkLoadForm.elements['date--1d'];
  jkLoadForm.dateMinus2D = jkLoadForm.elements['date--2d'];
  jkLoadForm.dateMinus5D = jkLoadForm.elements['date--5d'];
  jkLoadForm.dateMinus7D = jkLoadForm.elements['date--7d'];
  jkLoadForm.dateMinus14D = jkLoadForm.elements['date--14d'];
  jkLoadForm.dateMinus1M = jkLoadForm.elements['date--1m'];
  jkLoadForm.dateMinus3M = jkLoadForm.elements['date--3m'];
  jkLoadForm.dateMinus6M = jkLoadForm.elements['date--6m'];
  jkLoadForm.dateMinus1Y = jkLoadForm.elements['date--1y'];
  jkLoadForm.dateMinus5Y = jkLoadForm.elements['date--5y'];
  jkLoadForm.timeButtons = jkLoadForm.querySelector('.time-buttons');
  jkLoadForm.timePlus1H = jkLoadForm.elements['time-+1h'];
  jkLoadForm.timePlus2H = jkLoadForm.elements['time-+2h'];
  jkLoadForm.timePlus6H = jkLoadForm.elements['time-+6h'];
  jkLoadForm.timePlus12H = jkLoadForm.elements['time-+12h'];
  jkLoadForm.timePlus1M = jkLoadForm.elements['time-+1m'];
  jkLoadForm.timePlus2M = jkLoadForm.elements['time-+2m'];
  jkLoadForm.timePlus5M = jkLoadForm.elements['time-+5m'];
  jkLoadForm.timePlus10M = jkLoadForm.elements['time-+10m'];
  jkLoadForm.timePlus30M = jkLoadForm.elements['time-+30m'];
  jkLoadForm.resetButton = jkLoadForm.elements['reset-button'];
  jkLoadForm.submitButton = jkLoadForm.elements['submit-button'];
  const commentsList = document.getElementById('comments-list');
  const detailPc = document.querySelector('.detail-pc');
  const isSmallWindow = () => window.innerWidth < 1024;

  const now = new Date();
  // const oneDayAgo = new Date(now);
  // oneDayAgo.setDate(oneDayAgo.getDate() - 1);
  // oneDayAgo.setHours(0);
  // oneDayAgo.setMinutes(-oneDayAgo.getTimezoneOffset());
  // oneDayAgo.setSeconds(0);
  // oneDayAgo.setMilliseconds(0);
  const oneMinutesAgo = new Date(now);
  oneMinutesAgo.setMinutes(now.getMinutes() - 1);
  const day = ("0" + now.getDate()).slice(-2);
  const month = ("0" + (now.getMonth() + 1)).slice(-2);
  const today = now.getFullYear()+"-"+(month)+"-"+(day);
  const time = now.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
  const oneMinutesAgoTime = oneMinutesAgo.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
  const defaultTitle = document.title;

  jkLoadForm._date.value = today;
  jkLoadForm._date.max = today;
  jkLoadForm.timeStart.max = oneMinutesAgoTime;
  jkLoadForm.timeEnd.max = time;

  const checkParams = () => {
    if (location.search) {
      const params = new URLSearchParams(location.search);
      const paramValidator = param => {
        if (!params.has(param)) {
          return false;
        }
        const value = params.get(param);
        switch (param) {
          case 'ch':
            const options = jkLoadForm.channelPicker.options;
            return [...options].some(option => option.value === value);

          case 'date':
            const dateElem = jkLoadForm._date;
            return value >= dateElem.min && value <= dateElem.max;

          case 'timestart':
          case 'timeend':
            return value >= '00:00' && value <= '23:59';

          default:
            return false;
        }
      };

      if (['ch','date','timestart','timeend'].every(param => paramValidator(param))) {
        jkLoadForm.channelPicker.value = params.get('ch');
        jkLoadForm._date.value = params.get('date');
        jkLoadForm.timeStart.value = params.get('timestart');
        jkLoadForm.timeEnd.disabled = false;
        jkLoadForm.timeEnd.value = params.get('timeend');
        jkLoadForm.resetButton.hidden = false;
        jkLoadForm.submitButton.disabled = false;
        attachTimeLimit();
        jkLoadForm.requestSubmit();
      } else {
        alert('過去ログの指定が不正でした。');
      }
    }
  }

  //---------------
  // Form Controls
  //---------------

  const buttonJudgement = () => jkLoadForm.submitButton.disabled = !jkLoadForm.checkValidity();

  jkLoadForm.datetimeField.addEventListener('change', buttonJudgement);
  jkLoadForm.datetimeField.addEventListener('click', buttonJudgement);

  let timeEndInputed = false;

  const timeEndEnableJudgement = () => {
    if(jkLoadForm._date.value !== '' && jkLoadForm.timeStart.value !== ''){
      jkLoadForm.timeEnd.disabled = false;
      if (!timeEndInputed) {
        jkLoadForm.timeEnd.value = jkLoadForm.timeStart.value;
        // const oneMinutesLaterDate = jkLoadForm.timeStart.valueAsDate;
        // oneMinutesLaterDate.setMinutes(oneMinutesLaterDate.getMinutes() + 1);
        // jkLoadForm.timeEnd.valueAsDate = oneMinutesLaterDate;
      }
    }
    jkLoadForm.resetButton.hidden = false;
  }

  [jkLoadForm._date, jkLoadForm.timeStart].forEach(elem => {
    elem.addEventListener('input', timeEndEnableJudgement);
  });

  const attachTimeLimit = () => {
    if (jkLoadForm.timeStart.value === '' || jkLoadForm.timeEnd.value === '') {
      return;
    }
    const oneMinutesLater = jkLoadForm.timeStart.valueAsDate;
    oneMinutesLater.setMinutes(oneMinutesLater.getMinutes() + 1);
    const oneMinutesLaterTime = oneMinutesLater.toLocaleTimeString([], {timeZone: 'UTC', hour: '2-digit', minute: '2-digit'});
    const isYesterdayDate = jkLoadForm._date.valueAsDate.getDate() === now.getDate() - 1;
    const isCanOverflow = jkLoadForm.timeStart.value >= time;
    const isSpanDays = jkLoadForm.timeStart.value >= jkLoadForm.timeEnd.value;
    const compareAndAssign = (target, prop, value) => {
      if (target[prop] !== value) {
        target[prop] = value;
      }
    };

    if (jkLoadForm._date.value === today) {
      compareAndAssign(jkLoadForm.timeStart, 'max', oneMinutesAgoTime);
      compareAndAssign(jkLoadForm.timeEnd, 'min', oneMinutesLaterTime);
      compareAndAssign(jkLoadForm.timeEnd, 'max', time);
    } else if (isYesterdayDate && isCanOverflow && isSpanDays) {
      compareAndAssign(jkLoadForm.timeStart, 'max', '');
      compareAndAssign(jkLoadForm.timeEnd, 'min', '');
      compareAndAssign(jkLoadForm.timeEnd, 'max', time);
    } else {
      compareAndAssign(jkLoadForm.timeStart, 'max', '');
      compareAndAssign(jkLoadForm.timeEnd, 'min', '');
      compareAndAssign(jkLoadForm.timeEnd, 'max', '');
    }
  }

  let focusedElem = null;
  [jkLoadForm._date, jkLoadForm.timeStart, jkLoadForm.timeEnd].forEach(elem => {
    elem.addEventListener('focus', e => {
      focusedElem = e.target;
      if(focusedElem.value === '') { // TODO: 書き方考える
        focusedElem.value = '00:00';
        focusedElem.dispatchEvent(new Event('input', {bubbles: true}));
        focusedElem.dispatchEvent(new Event('change', {bubbles: true}));
      }
      jkLoadForm.dateTimeButtons.hidden = false;
      switch (focusedElem) {
        case jkLoadForm._date:
          jkLoadForm.dateButtons.hidden = false;
          jkLoadForm.timeButtons.hidden = true;
          break;
        case jkLoadForm.timeStart:
        case jkLoadForm.timeEnd:
          jkLoadForm.dateButtons.hidden = true;
          jkLoadForm.timeButtons.hidden = false;
          break;
      }
    });
    elem.addEventListener('click', e => e.preventDefault(), {once: true});
    elem.addEventListener('input', attachTimeLimit);
    elem.addEventListener('blur', () => {
      elem.addEventListener('click', e => e.preventDefault(), {once: true});
    });
  });

  jkLoadForm.timeEnd.addEventListener('input', () => timeEndInputed = true);

  document.addEventListener('click', e => {
    if (!e.target.closest('.jk-load-form')) {
      jkLoadForm.dateTimeButtons.hidden = true;
      jkLoadForm.dateButtons.hidden = true;
      jkLoadForm.timeButtons.hidden = true;
    }
  });

  const setDiffDate = (date, num) => date.setDate(date.getDate() + num);
  const setDiffMonth = (date, num) => date.setMonth(date.getMonth() + num);
  const setDiffYear = (date, num) => date.setFullYear(date.getFullYear() + num);
  const setDiffHours = (date, num) => date.setHours(date.getHours() + num);
  const setDiffMinutes = (date, num) => date.setMinutes(date.getMinutes() + num);
  const buttons = [
    {elem: jkLoadForm.dateMinus1D, action: date => setDiffDate(date, -1)},
    {elem: jkLoadForm.dateMinus2D, action: date => setDiffDate(date, -2)},
    {elem: jkLoadForm.dateMinus5D, action: date => setDiffDate(date, -5)},
    {elem: jkLoadForm.dateMinus7D, action: date => setDiffDate(date, -7)},
    {elem: jkLoadForm.dateMinus14D, action: date => setDiffDate(date, -14)},

    {elem: jkLoadForm.dateMinus1M, action: date => setDiffMonth(date, -1)},
    {elem: jkLoadForm.dateMinus3M, action: date => setDiffMonth(date, -3)},
    {elem: jkLoadForm.dateMinus6M, action: date => setDiffMonth(date, -6)},

    {elem: jkLoadForm.dateMinus1Y, action: date => setDiffYear(date, -1)},
    {elem: jkLoadForm.dateMinus5Y, action: date => setDiffYear(date, -5)},

    {elem: jkLoadForm.timePlus1H, action: date => setDiffHours(date, 1)},
    {elem: jkLoadForm.timePlus2H, action: date => setDiffHours(date, 2)},
    {elem: jkLoadForm.timePlus6H, action: date => setDiffHours(date, 6)},
    {elem: jkLoadForm.timePlus12H, action: date => setDiffHours(date, 12)},

    {elem: jkLoadForm.timePlus1M, action: date => setDiffMinutes(date, 1)},
    {elem: jkLoadForm.timePlus2M, action: date => setDiffMinutes(date, 2)},
    {elem: jkLoadForm.timePlus5M, action: date => setDiffMinutes(date, 5)},
    {elem: jkLoadForm.timePlus10M, action: date => setDiffMinutes(date, 10)},
    {elem: jkLoadForm.timePlus30M, action: date => setDiffMinutes(date, 30)},
  ];

  buttons.forEach(({elem, action}) => {
    elem.addEventListener('click', () => {
      const date = focusedElem.valueAsDate;
      action(date);
      focusedElem.valueAsDate = date;
      focusedElem.dispatchEvent(new Event('input', {bubbles: true}));
      focusedElem.dispatchEvent(new Event('change', {bubbles: true}));
    });
  });

  const makeHTMLFromComment = comment => {
    comment = comment.chat;
    const formatted = {
      text: htmlspecialchars(comment.content).replace(/\n/g, '<br>'),
      time: new Date(Number(comment.date) * 1000).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', second: '2-digit'})
    };
    const html =
    `<li data-thread="${comment.thread}" data-no="${comment.no}" data-user-id="${comment.user_id}" tabindex="0">
      <span class="text">${formatted.text}</span><span class="time">${formatted.time}</span>
      <script type="application/json" class="raw-data">${JSON.stringify(comment)}</script>
    </li>
    `;
    return html;
  };

  const appendComments = comments => {
    let html = '';
    while (comments.length) {
      html += makeHTMLFromComment(comments.shift());
      // console.log('comment shifted, comments count:', comments.length);
    }
    commentsList.insertAdjacentHTML('beforeend', html);
    // console.log('comment count:',this.querySelectorAll('li').length);
  }

  jkLoadForm.addEventListener('submit', async e => {
    e.preventDefault();
    jkLoadForm.submitButton.disabled = true;
    jkLoadForm.submitButton.textContent = '読み込み中...';
    commentsList.textContent = '';
    const APIURL = new URL(`https://jikkyo.tsukumijima.net/api/kakolog/${jkLoadForm.channelPicker.value}`);
    const APIParams = APIURL.searchParams;
    const toUnixTimeSec = (timeString) => Math.floor(new Date(timeString).getTime() / 1000);
    const startTime = toUnixTimeSec(`${jkLoadForm._date.value}T${jkLoadForm.timeStart.value}`);
    APIParams.append('starttime', startTime);
    const datePlain = new Date(`${jkLoadForm._date.value}T${jkLoadForm.timeEnd.value}`);
    const endTime = jkLoadForm.timeStart.valueAsDate < jkLoadForm.timeEnd.valueAsDate ? toUnixTimeSec(datePlain) : (() => {
      const dateOneDayLater = datePlain.setDate(datePlain.getDate() + 1);
      return toUnixTimeSec(dateOneDayLater);
    })();
    APIParams.append('endtime', endTime);
    APIParams.append('format', 'json');
    await fetch(APIURL)
      .then(async response => {
        // console.log(response);
        const data = await response.json();
        // console.log(data);
        if (response.status === 200) {
          if (data.error) {
            console.error('Error:', data.error);
            alert('エラー:' + data.error);
          } else if (!data.packet.length) {
            console.log('not comments found');
            alert('指定の期間にコメントがありませんでした。');
          } else {
            appendComments(data.packet);
          }
        } else {
          console.log('error or no content', response.status);
        }
      }).catch(e => {
        console.error('Failed to load', e);
      });
    document.title = `${defaultTitle} - ${jkLoadForm.channelPicker.selectedOptions[0].label} ${jkLoadForm._date.value.replaceAll('-','/')} ${jkLoadForm.timeStart.value} - ${jkLoadForm.timeEnd.value}`;
    const params = new URLSearchParams(location.search);
    params.set('ch', jkLoadForm.channelPicker.value);
    params.set('date', jkLoadForm._date.value);
    params.set('timestart', jkLoadForm.timeStart.value);
    params.set('timeend', jkLoadForm.timeEnd.value);
    history.pushState(null, '', `${location.pathname}?${params.toString()}`);
    jkLoadForm.submitButton.disabled = false;
    jkLoadForm.submitButton.textContent = '取得';
  }, {passive: false});

  checkParams();

  jkLoadForm.addEventListener('reset', e => {
    e.preventDefault();
    jkLoadForm._date.value = today;
    jkLoadForm.timeStart.value = '';
    jkLoadForm.timeEnd.value = '';
    jkLoadForm.timeEnd.disabled = true;
    jkLoadForm.dateTimeButtons.hidden = true;
    jkLoadForm.dateButtons.hidden = true;
    jkLoadForm.timeButtons.hidden = true;
    jkLoadForm.resetButton.hidden = true;
    jkLoadForm.submitButton.disabled = true;
    timeEndInputed = false;
  }, {passive: false});

  //----------------
  // /Form Controls
  //----------------

  commentsList.addEventListener('click', e => {
    const li = e.target.closest('li');
    const detailSp = document.querySelector('.detail-sp');
    const oldSameUsers = document.getElementsByClassName('same-user');
    if (!li || li.classList.contains('detail-sp')) {
      return;
    }
    [...oldSameUsers].forEach(elem => elem.classList.remove('same-user'));
    if (li.nextElementSibling && li.nextElementSibling.classList.contains('detail-sp')) {
      detailPc.textContent = '';
      detailSp.remove();
      return;
    }
    if (detailPc.textContent !== '') {
      detailPc.textContent = '';
    }
    if (detailSp) {
      detailSp.remove();
    }
    const scrollPosition = isSmallWindow() ? li.offsetTop - 2 - 10 : li.offsetTop - (window.innerHeight - header.offsetHeight - li.offsetHeight) / 2;
    const behavior = e.isTrusted ? 'smooth' : 'instant';
    window.scrollTo({top: scrollPosition, behavior});
    const rawMeta = JSON.parse((li.querySelector('.raw-data').textContent));
    const dl = document.createElement('dl');
    const descList = {
      thread: 'スレッドID',
      no: 'コメント番号',
      vpos: '再生時間',
      date: '日時',
      date_usec: '日時(小数部)',
      user_id: 'ユーザーID',
      name: 'ニックネーム',
      mail: 'コマンド',
      premium: 'プレミアム会員',
      anonymity: '匿名',
      content: 'コメント'
    };
    let html = '';
    Object.keys(rawMeta).forEach(key => {
      let value = rawMeta[key];
      switch (key) {
        case 'vpos':
          const baseDate = new Date(Number(value) * 10);
          /* if (baseDate.getUTCFullYear() - 1970) {
            baseDate.setUTCFullYear(baseDate.getUTCFullYear() - 1970);
            value = baseDate.toLocaleString([], {timeZone: 'UTC', year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', fractionalSecondDigits: 2});
          } else if (baseDate.getUTCMonth()) {
            baseDate.setUTCMonth(baseDate.getUTCMonth() - 1);
            value = baseDate.toLocaleString([], {timeZone: 'UTC', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', fractionalSecondDigits: 2});
          } else */ if (baseDate.getUTCDate() - 1) {
            baseDate.setUTCMonth(baseDate.getUTCDate() - 2);
            value = baseDate.toLocaleString([], {timeZone: 'UTC', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', fractionalSecondDigits: 2});
          } else {
            value = baseDate.toLocaleString([], {timeZone: 'UTC', hour: 'numeric', minute: 'numeric', second: 'numeric', fractionalSecondDigits: 2});
          }
          break;
        case 'date':
          value = new Date(Number(value) * 1000)
            .toLocaleString([], { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'});
          break;
        case 'date_usec':
          value = '0.' + value;
          break;
        case 'user_id':
        case 'name':
          !rawMeta.anonymity && (value = `<a href="https://nico.ms/user/${rawMeta.user_id}" target="_blank">${value}</a>`);
          break;
        case 'premium':
          value === '3' && (value = '(2ch実況板からの転載)');
        case 'anonymity':
          switch (value) {
            case '0':
              value = 'いいえ';
              break;
            case '1':
              value = 'はい';
              break;
            // case '3':
            //   key === 'premium' && (value = '(2ch実況板からの転載)');
            //   break;
          }
          break;
      }
      html +=
      `<dt>${descList[key] || key}</dt>
      <dd>${value}</dd>
      `;
    });
    dl.innerHTML = html;
    const commentItems = commentsList.children;
    const newSameUsers = [...commentItems].filter(comment => comment.dataset.userId === rawMeta.user_id);
    const numberOfCommentsFromSameUser = newSameUsers.findIndex(comment => comment.dataset.thread === rawMeta.thread && comment.dataset.no === rawMeta.no) + 1;
    const dl2 =
    `<dl>
      <dt>コメント回数</dt>
      <dd>${numberOfCommentsFromSameUser}回目/全${newSameUsers.length}回中</dd>
    </dl>
    `;
    detailPc.appendChild(dl.cloneNode(true));
    detailPc.appendChild(document.createElement('hr'));
    detailPc.insertAdjacentHTML('beforeend', dl2);
    const newDetailSp = document.createElement('li');
    newDetailSp.classList.add('detail-sp');
    newDetailSp.appendChild(dl);
    newDetailSp.appendChild(document.createElement('hr'));
    newDetailSp.insertAdjacentHTML('beforeend', dl2);
    li.insertAdjacentElement('afterend', newDetailSp);
    newSameUsers.forEach(comment => comment.classList.add('same-user'));
  });

  let focusedLi = null;
  commentsList.addEventListener('focus', e => {
    focusedLi = e.target;
  }, true);
  commentsList.addEventListener('keydown', e => {
    console.log(e.key);
    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault();
        (() => {
          const next = focusedLi ? (focusedLi.previousElementSibling ?? commentsList.lastElementChild) : commentsList.firstElementChild;
          next.click();
          next.focus();
        })();
        break;
      case 'ArrowDown':
        e.preventDefault();
        (() => {
          const next = (focusedLi?.nextElementSibling?.classList.contains('detail-sp') ? focusedLi.nextElementSibling?.nextElementSibling : focusedLi?.nextElementSibling) ?? commentsList.firstElementChild;
          next.click();
          next.focus();
        })();
        break;
      case ' ':
      case 'Enter':
        if (e.target === document.activeElement) {
          e.preventDefault();
          e.target.click();
          e.target.focus();
        }
        break;
    }
  });
});