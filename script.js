const moodToppings = {
  'happy': ['pineapple', 'bell peppers', 'ham'],
  'sad': ['extra cheese', 'mushrooms', 'olives'],
  'excited': ['pepperoni', 'jalapenos', 'sausage'],
  'tired': ['spinach', 'feta', 'tomatoes'],
  'hungry': ['everything!', 'double cheese', 'extra meat'],
  'relaxed': ['margherita', 'basil', 'mozzarella'],
  'adventurous': ['anchovies', 'arugula', 'prosciutto']
};

function generateTopping() {
  const moodInput = document.getElementById('moodInput').value.toLowerCase();
  const resultDiv = document.getElementById('result');

  if (moodInput.trim() === '') {
      resultDiv.textContent = 'Please enter a mood!';
      return;
  }

  let matchedMood = Object.keys(moodToppings).find(mood => moodInput.includes(mood));

  if (!matchedMood) {
      matchedMood = Object.keys(moodToppings)[Math.floor(Math.random() * Object.keys(moodToppings).length)];
  }

  const toppings = moodToppings[matchedMood];
  const randomTopping = toppings[Math.floor(Math.random() * toppings.length)];

  resultDiv.textContent = `Based on your ${matchedMood} mood, we recommend: ${randomTopping}!`;
}