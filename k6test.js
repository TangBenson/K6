import http from 'k6/http';
import { sleep } from 'k6';


/*
k6 run --vus 1 --duration 1s script.js
表示「模擬 10 個用戶，在 5 秒內不管 request 幾次，就是盡量去執行就對了」
 */
export const options = {
    vus: 10,
    duration: '5s'
};


/*
k6 run --vus 10 --duration 5s  --iterations 50 script.js
表示「模擬 10 個用戶，此次腳本最多就是執行 50 次，如果 50 次腳本沒執行完，時間卻到了，那此次測試會顯示 default ✗」
所以會建議若要限制腳本次數，盡量把時間拉滿，不然這樣的測試也沒有效果
 */
// export const options = {
//     vus: 10, //虛擬用戶數量，最少必須要 1 個，和 duration 搭配使用
//     duration: '5s', //指定測試運行的總持續時間，與 vus 一起使用
//     iterations: 50 //腳本中的函數被執行的上限次數。
// };


/*
k6 run --stage 30s:10, -s 1m30s:30, -s 20s:0 .\script.js
可以指定在特定時間內增加或減少 用戶 數量的執行方式，也就是說可以模仿更精準的測試情境。
第一階段就是在 30 秒間逐步把用戶加到 10 個
第二階段就是在一分半內逐步從 10 個用戶追加到 30 個用戶
第三階段是在 20 秒內逐步從 30 個用戶 降到 0 個用戶個用戶
*/
// export let options = {
//     stages: [
//         { duration: '30s', target: 10 },
//         { duration: '1m30s', target: 30 },
//         { duration: '20s', target: 0 },
//     ],
// };


/*
rps 用戶每秒可以發送最大的 request 數量。
用戶量 100 vus
執行時間 60s
request 條件是 100000
那就是一位 user rps 就是 100000/100/60 = 16
通常 rps 的範疇會多估 10-20% 以防萬一，所以湊個整數 20 就是較符合的數值
*/
// export const options = {
//     vus: 100,
//     duration: '60s',
//     rps: 20
// };


export default function () {
    http.get('https://test.k6.io');
    sleep(1);
}