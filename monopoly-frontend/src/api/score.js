const BASE2 = "http://127.0.0.1";

export const postScore = ({ nick_name, score, country_code }) =>
  fetch(`${BASE2}/score-recorder`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nick_name, score, country_code })
  });

export const getRanking = () =>
  fetch(`${BASE2}/ranking`).then(r => r.json());
