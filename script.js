const quotes = [
  "Believe in yourself and all that you are.",
  "Push yourself, because no one else is going to do it for you.",
  "Discipline is doing it even when you don't feel like it.",
  "Dream big. Start small. Act now.",
  "Success doesn’t just find you. You have to go out and get it.",
  "Hard work beats talent when talent doesn’t work hard.",
  "The future depends on what you do today.",
  "Don’t limit your challenges, challenge your limits.",
  "It’s not about having time. It’s about making time.",
  "Consistency is what transforms average into excellence.",
  "Don’t stop when you’re tired. Stop when you’re done.",
  "You miss 100% of the shots you don’t take.",
  "Winners are not afraid of losing. But losers are.",
  "A comfort zone is a beautiful place, but nothing ever grows there.",
  "Be stronger than your excuses.",
  "Work until your idols become your rivals.",
  "Success is the sum of small efforts repeated daily.",
  "Be so good they can’t ignore you.",
  "Your only limit is your mind.",
  "Wake up with determination. Go to bed with satisfaction.",
  "Stay patient and trust your journey.",
  "Do something today that your future self will thank you for.",
  "Small progress is still progress.",
  "Success starts with self-discipline.",
  "Keep going. Everything you need will come to you.",
  "The only way to do great work is to love what you do.",
  "Pain is temporary. Quitting lasts forever.",
  "A little progress each day adds up to big results.",
  "If you're tired, do it tired.",
  "Don't wait for opportunity. Create it.",
  "Success begins with the decision to try.",
  "You don’t have to be great to start, but you have to start to be great.",
  "The only place where success comes before work is in the dictionary.",
  "Don't be afraid to start over. It's a chance to build something better.",
  "You are capable of amazing things.",
  "The secret of getting ahead is getting started.",
  "The best way to predict the future is to create it.",
  "Don’t count the days. Make the days count.",
  "You are stronger than you think.",
  "Failure is not the opposite of success; it’s part of success.",
  "No pressure, no diamonds.",
  "Stars can’t shine without darkness.",
  "The pain you feel today will be the strength you feel tomorrow.",
  "Success is not for the lazy.",
  "Doubt kills more dreams than failure ever will.",
  "Champions train. Losers complain.",
  "Courage doesn’t always roar.",
  "Don’t be busy. Be productive.",
  "If you believe in it, fight for it.",
  "Winners focus on winning. Losers focus on winners.",
  "Make your life a masterpiece.",
  "Success is earned, not given.",
  "Hustle in silence, let your success make the noise.",
  "Grind now. Shine later.",
  "Sacrifice today for a better tomorrow.",
  "Keep grinding. Stay humble.",
  "When you feel like quitting, remember why you started.",
  "Stop doubting yourself. Work hard, and make it happen.",
  "Worry less, work more.",
  "Don't let fear stop you.",
  "Effort never betrays you.",
  "Make each day your masterpiece.",
  "You have the power to change your story.",
  "Winners never quit. Quitters never win.",
  "Success is a journey, not a destination.",
  "There is no elevator to success. You have to take the stairs.",
  "Work in silence and let success be your noise.",
  "Patience + Persistence = Progress.",
  "Start where you are. Use what you have. Do what you can.",
  "Turn pain into power.",
  "Your grind will pay off.",
  "Fall seven times, stand up eight.",
  "Live a few years like most people won’t, so you can live the rest like most people can’t.",
  "Fear kills more dreams than failure.",
  "You didn’t come this far to only come this far.",
  "You got this. One step at a time.",
  "Failure is not falling down but refusing to get up.",
  "Let your hustle speak.",
  "Every champion was once a contender that refused to give up.",
  "Grind in silence, let your results make the noise.",
  "Success is 1% idea, 99% execution.",
  "You are one decision away from a totally different life.",
  "Don’t stop until you’re proud.",
  "The difference between ordinary and extraordinary is that little extra.",
  "Never let success get to your head. Never let failure get to your heart.",
  "Learn to rest, not to quit.",
  "If it was easy, everyone would do it.",
  "Discipline will take you places motivation can’t.",
  "Focus on the step in front of you, not the whole staircase.",
  "Rise and grind.",
  "The only bad workout is the one that didn’t happen.",
  "In the middle of difficulty lies opportunity.",
  "Success requires replacement of excuses with effort.",
  "The grind includes Friday night.",
  "Don’t wish for it. Work for it.",
  "Let your dreams be bigger than your fears.",
  "You don’t have to have it all figured out to move forward.",
  "Do it for the version of you that never gave up.",
  "Everyday is a new beginning. Take a deep breath, smile, and start again.",
  "Just because it’s hard doesn’t mean it’s impossible.",
  "If you never try, you’ll never know.",
  "Nothing works unless you do."
];
let quoteText = "";
let timer;
let timeLeft = 0;
let timerRunning = false;

const quoteEl = document.getElementById("quote");
const input = document.getElementById("input");
const timerEl = document.getElementById("timer");
const wpmEl = document.getElementById("wpm");
const accuracyEl = document.getElementById("accuracy");
const progressEl = document.getElementById("progress");
const feedbackEl = document.getElementById("feedback");

const typeSound = document.getElementById("type-sound");
const successSound = document.getElementById("success-sound");

function generateQuote() {
  const rand = Math.floor(Math.random() * quotes.length);
  quoteText = quotes[rand];
  quoteEl.innerText = quoteText;
  input.value = "";
  progressEl.style.width = "0%";
}

function startTest() {
  if (timerRunning) return;

  const mode = parseInt(document.getElementById("mode").value);
  timeLeft = mode;
  timerEl.innerText = timeLeft;
  input.disabled = false;
  input.focus();
  generateQuote();
  timerRunning = true;

  timer = setInterval(() => {
    timeLeft--;
    timerEl.innerText = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      endTest(false);
    }
  }, 1000);
}

function endTest(completed = false) {
  input.disabled = true;
  const typed = input.value.trim();
  const typedWords = typed.split(/\s+/).filter(w => w !== "");
  const quoteWords = quoteText.trim().split(/\s+/);

  let correctWords = 0;
  for (let i = 0; i < typedWords.length; i++) {
    if (typedWords[i] === quoteWords[i]) correctWords++;
  }

  const totalTime = parseInt(document.getElementById("mode").value);
  const actualTime = totalTime - timeLeft;
  const minutes = actualTime > 0 ? actualTime / 60 : 1;

  const wpm = Math.round((correctWords / minutes));
  const accuracy = Math.round((correctWords / quoteWords.length) * 100);

  wpmEl.innerText = isNaN(wpm) ? 0 : wpm;
  accuracyEl.innerText = isNaN(accuracy) ? 0 : accuracy;

  if (completed) {
    timerEl.innerText = `✅ Done in ${actualTime.toFixed(2)}s`;
    successSound.play();
    feedbackEl.innerText = "🔥 Test Completed Successfully!";
  }

  timerRunning = false;
}

function resetTest() {
  clearInterval(timer);
  timerRunning = false;
  timeLeft = 0;
  timerEl.innerText = "--";
  wpmEl.innerText = "0";
  accuracyEl.innerText = "0";
  input.value = "";
  input.disabled = true;
  feedbackEl.innerText = "💬 Get ready to type!";
  quoteEl.innerText = "Loading...";
  progressEl.style.width = "0%";
}

input.addEventListener("input", () => {
  if (!timerRunning) return;

  const typed = input.value.replace(/\s+/g, " ").trim().toLowerCase();
  const target = quoteText.replace(/\s+/g, " ").trim().toLowerCase();

  const wordsTyped = typed.split(" ").length;
  const totalWords = target.split(" ").length;
  const percent = Math.min((wordsTyped / totalWords) * 100, 100);
  progressEl.style.width = `${percent}%`;

  // motivational feedback
  if (percent > 90) feedbackEl.innerText = "🔥 You're almost done!";
  else if (percent > 60) feedbackEl.innerText = "⚡ Keep going!";
  else if (percent > 30) feedbackEl.innerText = "💪 Doing great!";
  else feedbackEl.innerText = "🚀 Let’s go!";

  // typing sound
  typeSound.currentTime = 0.4;
  typeSound.play();
  successSound.volume = 0.6;

  // match and end test
  if (typed === target) {
    clearInterval(timer);
    endTest(true);
  }
});