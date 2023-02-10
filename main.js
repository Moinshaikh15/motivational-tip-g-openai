let textEl = document.querySelector(".motivational-tip");

let attendance = document.getElementById("attendance");
let numberOfDays = document.getElementById("number-of-days");
let grade = document.getElementById("grade");
let course1Label = document.getElementById("course1-label");
let course1Ans = document.getElementById("course1-ans");

let course2Label = document.getElementById("course2-label");
let course2Ans = document.getElementById("course2-ans");

let course3Label = document.getElementById("course3-label");
let course3Ans = document.getElementById("course3-ans");

let course4Label = document.getElementById("course4-label");
let course4Ans = document.getElementById("course4-ans");

let course5Label = document.getElementById("course5-label");
let course5Ans = document.getElementById("course5-ans");

let text;
let getData = () => {
  document.querySelector(".loader").style.display = "flex";
  let promptText = `Create motivational tips for students with the following current information.

${numberOfDays.value} school days are left in the semester.
The student attendance rate is ${attendance.value}%
The grade level is ${grade.value}
1. ${course1Ans.value} in ${course1Label.value}.
2. ${course2Ans.value}in ${course2Label.value}
3. ${course3Ans.value} in ${course3Label.value}
4. ${course4Ans.value} in ${course4Label.value}
5. ${course5Ans.value} in ${course5Label.value}
Include emojis.
`;
  fetch("https://api.openai.com/v1/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer Your-API-KEY`,
    },
    body: JSON.stringify({
      model: "text-davinci-003",
      prompt: promptText,
      temperature: 0.9,
      max_tokens: 150,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0.6,
    }),
  })
    .then((resp) => resp.json())
    .then((result) => {
      document.querySelector(".loader").style.display = "none";
      textEl.innerHTML = result?.choices[0]?.text;
      text = result?.choices[0]?.text;
      document.querySelector(".copy-btn").style.display = "flex";
    });
};

let copyToClipboard = () => {
  navigator.clipboard.writeText(text);
  document.querySelector(".copied").style.display = "flex";
  setTimeout(() => {
    document.querySelector(".copied").style.display = "none";
  }, 1500);
};
