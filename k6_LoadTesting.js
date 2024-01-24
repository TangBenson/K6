import http from 'k6/http';
import { sleep } from 'k6';

/*
煙霧測試 Smoke Testing：
用最低系統配置(硬體、網路等等…)進行測試，確認系統與程式基本功能正常，目的為看是否有 Error

負載測試 Load Testing：
用當前系統配置，目的為預想用戶數量與吞吐量(RPS)狀況下服務效能狀況

壓力測試 Stress Testing：
用當前系統配置，目的測試系統的極限在哪, 流量慢慢的湧入 (請勿在production測試)

峰值測試 Spike Testing：
用當前系統配置，目的測試系統抵擋高併發極限, 流量一「瞬間」湧入 (請勿在production測試)

浸泡測試 Soak Testing：
主要測試負載量在「長時間」的情況下，確認系統的可靠性和效能
*/
export const options = {
    // vus: 50,
    // duration: '15s',
    // rps: 2,
    // iterations: 50
    stages: [
        { duration: '1s', target: 20 },
        { duration: '1s', target: 30 },
        { duration: '1s', target: 40 },
        { duration: '1s', target: 50 },
        { duration: '1s', target: 60 },
        { duration: '1s', target: 70 },
        { duration: '1s', target: 80 },
        { duration: '1s', target: 90 },
        { duration: '1s', target: 100 },
        { duration: '1s', target: 110 },
    ],
    rps: 20
};

export default function () {
    const url = 'http://apiv3.ai-irent.net/api/MotorRent';

    const payload = {
        ShowALL: 0,
        Latitude: 25.0688361,
        Longitude: 121.5335611,
        Radius: 1.5,
        CarTrip: 1
    };

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    http.post(url, JSON.stringify(payload), params);
}