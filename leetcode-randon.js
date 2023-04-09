// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  给新版leetcode增加随机按钮
// @author       You
// @match        https://leetcode.cn
// @icon         https://www.google.com/s2/favicons?sz=64&domain=leetcode.cn
// @grant        none
// ==/UserScript==

(function() {
  'use strict';
  async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }
  const startFunc = () => {
    const cssStyle = `

    `
    // 新建一个基底
    const randomDiv = document.createElement('div')
    const divStyle = {
      position: 'fixed',
      height: '50px',
      width: '50px',
      borderRadius: '12px 12px',
      border: '1px solid gray',
      right: '30px',
      bottom: '140px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '20px',
      cursor: 'pointer',
      transition: 'all 0.3s'
    }
    Object.assign(randomDiv.style, divStyle)
    randomDiv.textContent = '随机'
    randomDiv.addEventListener('click', () => {
      postData('/graphql/', {
        "query": "\n    query problemsetRandomFilteredQuestion($categorySlug: String!, $filters: QuestionListFilterInput) {\n  problemsetRandomFilteredQuestion(categorySlug: $categorySlug, filters: $filters)\n}\n    ",
        "variables": {
          "categorySlug": "",
          "filters": {}
        },
        "operationName": "problemsetRandomFilteredQuestion"
      }).then(res => {
        if (res.data && res.data.problemsetRandomFilteredQuestion) {
          const question = res.data.problemsetRandomFilteredQuestion
          window.open('/problems/' + question)
        }
      })
    })

    // 添加到body上
    document.body.appendChild(randomDiv)
  }
  setTimeout(startFunc, 1000);
})();