const moodToppings = {
    'happy': ['pineapple', 'bell peppers', 'ham'],
    'sad': ['extra cheese', 'mushrooms', 'olives'],
    'excited': ['pepperoni', 'jalapenos', 'sausage'],
    'tired': ['spinach', 'feta', 'tomatoes'],
    'hungry': ['everything!', 'double cheese', 'extra meat'],
    'relaxed': ['margherita', 'basil', 'mozzarella'],
    'adventurous': ['anchovies', 'arugula', 'prosciutto']
};

const crustTypes = ['Thin', 'Thick', 'Stuffed', 'Deep Dish', 'Neapolitan', 'New York Style', 'Sicilian'];

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

function generateFullPizza() {
    const moodInput = document.getElementById('moodInput').value.toLowerCase();
    const fullPizzaResultDiv = document.getElementById('fullPizzaResult');

    if (moodInput.trim() === '') {
        fullPizzaResultDiv.textContent = 'Please enter a mood!';
        return;
    }

    let matchedMood = Object.keys(moodToppings).find(mood => moodInput.includes(mood));

    if (!matchedMood) {
        matchedMood = Object.keys(moodToppings)[Math.floor(Math.random() * Object.keys(moodToppings).length)];
    }

    const toppings = moodToppings[matchedMood];
    const selectedToppings = [];
    const numToppings = Math.floor(Math.random() * 3) + 2;

    for (let i = 0; i < numToppings; i++) {
        const topping = toppings[Math.floor(Math.random() * toppings.length)];
        if (!selectedToppings.includes(topping)) {
            selectedToppings.push(topping);
        }
    }

    const crust = crustTypes[Math.floor(Math.random() * crustTypes.length)];

    fullPizzaResultDiv.innerHTML = `
        <h3>Your Mood-Based Pizza:</h3>
        <p><strong>Crust:</strong> ${crust}</p>
        <p><strong>Toppings:</strong> ${selectedToppings.join(', ')}</p>
        <p>Enjoy your ${matchedMood} mood pizza!</p>
    `;
}

function saveTopping() {
    if (currentTopping) {
        const favoritesList = document.getElementById('favoritesList');
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <span>${currentTopping}</span>
            <div class="star-rating" data-rating="0">
                <span data-value="5">☆</span>
                <span data-value="4">☆</span>
                <span data-value="3">☆</span>
                <span data-value="2">☆</span>
                <span data-value="1">☆</span>
            </div>
            <button class="remove-btn" onclick="removeTopping(this)">Remove</button>
        `;
        favoritesList.appendChild(listItem);
        currentTopping = '';
        document.getElementById('saveButton').style.display = 'none';
        addStarRatingListeners(listItem.querySelector('.star-rating'));
        saveFavoritesToLocalStorage();
    }
}

function removeTopping(button) {
    const listItem = button.parentElement;
    listItem.remove();
    saveFavoritesToLocalStorage();
}

function addStarRatingListeners(starRatingElement) {
    const stars = starRatingElement.querySelectorAll('span');
    stars.forEach(star => {
        star.addEventListener('click', function() {
            const value = this.getAttribute('data-value');
            starRatingElement.setAttribute('data-rating', value);
            updateStarRating(starRatingElement);
            saveFavoritesToLocalStorage();
        });
    });
}

function updateStarRating(starRatingElement) {
    const stars = starRatingElement.querySelectorAll('span');
    const rating = parseInt(starRatingElement.getAttribute('data-rating'));
    stars.forEach(star => {
        star.classList.remove('active');
        if (star.getAttribute('data-value') <= rating) {
            star.classList.add('active');
        }
    });
}

function loadFavorites() {
    const favoritesList = document.getElementById('favoritesList');
    const favorites = JSON.parse(localStorage.getItem('favoriteToppings')) || [];
    favorites.forEach(favorite => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <span>${favorite.topping}</span>
            <div class="star-rating" data-rating="${favorite.rating}">
                <span data-value="5">☆</span>
                <span data-value="4">☆</span>
                <span data-value="3">☆</span>
                <span data-value="2">☆</span>
                <span data-value="1">☆</span>
            </div>
            <button class="remove-btn" onclick="removeTopping(this)">Remove</button>
        `;
        favoritesList.appendChild(listItem);
        addStarRatingListeners(listItem.querySelector('.star-rating'));
        updateStarRating(listItem.querySelector('.star-rating'));
    });
}

function saveFavoritesToLocalStorage() {
    const favoritesList = document.getElementById('favoritesList');
    const favorites = Array.from(favoritesList.children).map(li => ({
        topping: li.querySelector('span').textContent,
        rating: li.querySelector('.star-rating').getAttribute('data-rating')
    }));
    localStorage.setItem('favoriteToppings', JSON.stringify(favorites));
}

function sortFavorites(criteria) {
    const favoritesList = document.getElementById('favoritesList');
    const items = Array.from(favoritesList.children);

    items.sort((a, b) => {
        if (criteria === 'rating') {
            const ratingA = parseInt(a.querySelector('.star-rating').getAttribute('data-rating'));
            const ratingB = parseInt(b.querySelector('.star-rating').getAttribute('data-rating'));
            return ratingB - ratingA;
        } else if (criteria === 'name') {
            const nameA = a.querySelector('span').textContent.toLowerCase();
            const nameB = b.querySelector('span').textContent.toLowerCase();
            return nameA.localeCompare(nameB);
        }
    });

    favoritesList.innerHTML = '';
    items.forEach(item => favoritesList.appendChild(item));
    saveFavoritesToLocalStorage();
}

function addCustomCombination() {
    const customMood = document.getElementById('customMood').value.trim();
    const customTopping = document.getElementById('customTopping').value.trim();

    if (customMood && customTopping) {
        if (!moodToppings[customMood]) {
            moodToppings[customMood] = [];
        }
        if (!moodToppings[customMood].includes(customTopping)) {
            moodToppings[customMood].push(customTopping);
        }

        updateCustomCombinationsList();
        saveCustomCombinationsToLocalStorage();

        document.getElementById('customMood').value = '';
        document.getElementById('customTopping').value = '';
    }
}

function updateCustomCombinationsList() {
    const customCombinationsList = document.getElementById('customCombinationsList');
    customCombinationsList.innerHTML = '';

    for (const [mood, toppings] of Object.entries(moodToppings)) {
        toppings.forEach(topping => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <span>${mood}: ${topping}</span>
                <button class="remove-btn" onclick="removeCustomCombination('${mood}', '${topping}')">Remove</button>
            `;
            customCombinationsList.appendChild(listItem);
        });
    }
}

function removeCustomCombination(mood, topping) {
    moodToppings[mood] = moodToppings[mood].filter(t => t !== topping);
    if (moodToppings[mood].length === 0) {
        delete moodToppings[mood];
    }
    updateCustomCombinationsList();
    saveCustomCombinationsToLocalStorage();
}

function saveCustomCombinationsToLocalStorage() {
    localStorage.setItem('customMoodToppings', JSON.stringify(moodToppings));
}

function loadCustomCombinationsFromLocalStorage() {
    const storedCombinations = localStorage.getItem('customMoodToppings');
    if (storedCombinations) {
        moodToppings = JSON.parse(storedCombinations);
        updateCustomCombinationsList();
    }
}

window.addEventListener('load', () => {
    loadFavorites();
    loadCustomCombinationsFromLocalStorage();
});

window.addEventListener('beforeunload', () => {
    saveFavoritesToLocalStorage();
    saveCustomCombinationsToLocalStorage();
});