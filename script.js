const moodToppings = {
    'happy': ['pineapple', 'bell peppers', 'ham'],
    'sad': ['extra cheese', 'mushrooms', 'olives'],
    'excited': ['pepperoni', 'jalapenos', 'sausage'],
    'tired': ['spinach', 'feta', 'tomatoes'],
    'hungry': ['everything!', 'double cheese', 'extra meat'],
    'relaxed': ['margherita', 'basil', 'mozzarella'],
    'adventurous': ['anchovies', 'arugula', 'prosciutto']
};

let currentTopping = '';

function generateTopping() {
    const moodInput = document.getElementById('moodInput').value.toLowerCase();
    const resultDiv = document.getElementById('result');
    const saveButton = document.getElementById('saveButton');

    if (moodInput.trim() === '') {
        resultDiv.textContent = 'Please enter a mood!';
        saveButton.style.display = 'none';
        return;
    }

    let matchedMood = Object.keys(moodToppings).find(mood => moodInput.includes(mood));

    if (!matchedMood) {
        matchedMood = Object.keys(moodToppings)[Math.floor(Math.random() * Object.keys(moodToppings).length)];
    }

    const toppings = moodToppings[matchedMood];
    currentTopping = toppings[Math.floor(Math.random() * toppings.length)];

    resultDiv.textContent = `Based on your ${matchedMood} mood, we recommend: ${currentTopping}!`;
    saveButton.style.display = 'inline-block';
}

function saveTopping() {
    if (currentTopping) {
        const favoritesList = document.getElementById('favoritesList');
        const listItem = document.createElement('li');
        listItem.textContent = currentTopping;
        favoritesList.appendChild(listItem);
        currentTopping = '';
        document.getElementById('saveButton').style.display = 'none';
    }
}

function loadFavorites() {
    const favoritesList = document.getElementById('favoritesList');
    const favorites = JSON.parse(localStorage.getItem('favoriteToppings')) || [];
    favorites.forEach(topping => {
        const listItem = document.createElement('li');
        listItem.textContent = topping;
        favoritesList.appendChild(listItem);
    });
}

function saveFavoritesToLocalStorage() {
    const favoritesList = document.getElementById('favoritesList');
    const favorites = Array.from(favoritesList.children).map(li => li.textContent);
    localStorage.setItem('favoriteToppings', JSON.stringify(favorites));
}

window.addEventListener('load', loadFavorites);
window.addEventListener('beforeunload', saveFavoritesToLocalStorage);