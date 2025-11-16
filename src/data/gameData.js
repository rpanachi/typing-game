// Game data with words and their cartoon-style images
// Note: You can replace these image URLs with cartoon-style images from Google Images
// Search for terms like "cartoon [word] drawing" or "kids [word] illustration"
// Words are stored as a map by locale
// verified: 'yes' indicates the image has been verified to correctly represent the word (confidence >= 70% and matches English word)
// verified: 'invalid' indicates the image URL returns 404 (not found) OR confidence < 70% OR no matching object found
// verified: 'pending' indicates the image needs verification (temporary status, will be updated during verification)
export const gameWords = [
  {
    word: {
      en: 'CAT',
      pt: 'GATO'
    },
    difficulty: {
      en: 'easy',
      pt: 'easy'
    },
    image: '/images/cat.jpg',
    category: 'animal',
    verified: 'yes'
  },
  {
    word: {
      en: 'DOG',
      pt: 'CACHORRO'
    },
    difficulty: {
      en: 'easy',
      pt: 'medium'
    },
    image: '/images/dog.jpg',
    category: 'animal',
    verified: 'yes'
  },
  {
    word: {
      en: 'LION',
      pt: 'LEÃO'
    },
    difficulty: {
      en: 'easy',
      pt: 'easy'
    },
    image: '/images/lion.jpg',
    category: 'animal',
    verified: 'yes'
  },
  {
    word: {
      en: 'ELEPHANT',
      pt: 'ELEFANTE'
    },
    difficulty: {
      en: 'medium',
      pt: 'medium'
    },
    image: '/images/elephant.jpg',
    category: 'animal',
    verified: 'yes'
  },
  {
    word: {
      en: 'BIRD',
      pt: 'PÁSSARO'
    },
    difficulty: {
      en: 'easy',
      pt: 'medium'
    },
    image: '/images/bird.jpg',
    category: 'animal',
    verified: 'yes'
  },
  {
    word: {
      en: 'FISH',
      pt: 'PEIXE'
    },
    difficulty: {
      en: 'easy',
      pt: 'medium'
    },
    image: '/images/fish.jpg',
    category: 'animal',
    verified: 'yes'
  },
  {
    word: {
      en: 'APPLE',
      pt: 'MAÇÃ'
    },
    difficulty: {
      en: 'easy',
      pt: 'easy'
    },
    image: '/images/apple.jpg',
    category: 'food',
    verified: 'yes'
  },
  {
    word: {
      en: 'BANANA',
      pt: 'BANANA'
    },
    difficulty: {
      en: 'medium',
      pt: 'medium'
    },
    image: '/images/banana.jpg',
    category: 'food',
    verified: 'yes'
  },
  {
    word: {
      en: 'CARROT',
      pt: 'CENOURA'
    },
    difficulty: {
      en: 'medium',
      pt: 'medium'
    },
    image: '/images/carrot.jpg',
    category: 'vegetable',
    verified: 'yes'
  },
  {
    word: {
      en: 'TOMATO',
      pt: 'TOMATE'
    },
    difficulty: {
      en: 'medium',
      pt: 'medium'
    },
    image: '/images/tomato.jpg',
    category: 'vegetable',
    verified: 'yes'
  },
  {
    word: {
      en: 'BALL',
      pt: 'BOLA'
    },
    difficulty: {
      en: 'easy',
      pt: 'easy'
    },
    category: 'object',
    verified: 'invalid'
  },
  {
    word: {
      en: 'BOOK',
      pt: 'LIVRO'
    },
    difficulty: {
      en: 'easy',
      pt: 'medium'
    },
    image: '/images/book.jpg',
    category: 'object',
    verified: 'yes'
  },
  {
    word: {
      en: 'SUN',
      pt: 'SOL'
    },
    difficulty: {
      en: 'easy',
      pt: 'easy'
    },
    image: '/images/sun.jpg',
    category: 'object',
    verified: 'yes'
  },
  {
    word: {
      en: 'STAR',
      pt: 'ESTRELA'
    },
    difficulty: {
      en: 'easy',
      pt: 'medium'
    },
    image: '/images/star.jpg',
    category: 'object',
    verified: 'yes'
  },
  {
    word: {
      en: 'HOUSE',
      pt: 'CASA'
    },
    difficulty: {
      en: 'easy',
      pt: 'easy'
    },
    image: '/images/house.jpg',
    category: 'object',
    verified: 'pending'
  },
  {
    word: {
      en: 'TREE',
      pt: 'ÁRVORE'
    },
    difficulty: {
      en: 'easy',
      pt: 'medium'
    },
    image: '/images/tree.jpg',
    category: 'object',
    verified: 'yes'
  },
  {
    word: {
      en: 'HEART',
      pt: 'CORAÇÃO'
    },
    difficulty: {
      en: 'easy',
      pt: 'medium'
    },
    image: '/images/heart.jpg',
    category: 'object',
    verified: 'yes'
  },
  {
    word: {
      en: 'MOON',
      pt: 'LUA'
    },
    difficulty: {
      en: 'easy',
      pt: 'easy'
    },
    image: '/images/moon.jpg',
    category: 'object',
    verified: 'yes'
  },
  // More Animals
  {
    word: {
      en: 'RABBIT',
      pt: 'COELHO'
    },
    difficulty: {
      en: 'medium',
      pt: 'medium'
    },
    image: '/images/rabbit.jpg',
    category: 'animal',
    verified: 'pending'
  },
  {
    word: {
      en: 'BEAR',
      pt: 'URSO'
    },
    difficulty: {
      en: 'easy',
      pt: 'easy'
    },
    image: '/images/bear.jpg',
    category: 'animal',
    verified: 'yes'
  },
  {
    word: {
      en: 'TIGER',
      pt: 'TIGRE'
    },
    difficulty: {
      en: 'medium',
      pt: 'medium'
    },
    image: '/images/tiger.jpg',
    category: 'animal',
    verified: 'pending'
  },
  {
    word: {
      en: 'COW',
      pt: 'VACA'
    },
    difficulty: {
      en: 'easy',
      pt: 'easy'
    },
    image: '/images/cow.jpg',
    category: 'animal',
    verified: 'pending'
  },
  {
    word: {
      en: 'PIG',
      pt: 'PORCO'
    },
    difficulty: {
      en: 'easy',
      pt: 'medium'
    },
    image: '/images/pig.jpg',
    category: 'animal',
    verified: 'pending'
  },
  {
    word: {
      en: 'DUCK',
      pt: 'PATO'
    },
    difficulty: {
      en: 'easy',
      pt: 'easy'
    },
    image: '/images/duck.jpg',
    category: 'animal',
    verified: 'pending'
  },
  {
    word: {
      en: 'HORSE',
      pt: 'CAVALO'
    },
    difficulty: {
      en: 'medium',
      pt: 'medium'
    },
    image: '/images/horse.jpg',
    category: 'animal',
    verified: 'yes'
  },
  {
    word: {
      en: 'MONKEY',
      pt: 'MACACO'
    },
    difficulty: {
      en: 'medium',
      pt: 'easy'
    },
    image: '/images/monkey.jpg',
    category: 'animal',
    verified: 'pending'
  },
  {
    word: {
      en: 'PANDA',
      pt: 'PANDA'
    },
    difficulty: {
      en: 'medium',
      pt: 'medium'
    },
    image: '/images/panda.jpg',
    category: 'animal',
    verified: 'pending'
  },
  {
    word: {
      en: 'BUTTERFLY',
      pt: 'BORBOLETA'
    },
    difficulty: {
      en: 'medium',
      pt: 'medium'
    },
    image: '/images/butterfly.jpg',
    category: 'animal',
    verified: 'yes'
  },
  {
    word: {
      en: 'BEE',
      pt: 'ABELHA'
    },
    difficulty: {
      en: 'easy',
      pt: 'medium'
    },
    image: '/images/bee.jpg',
    category: 'animal',
    verified: 'pending'
  },
  {
    word: {
      en: 'SNAKE',
      pt: 'COBRA'
    },
    difficulty: {
      en: 'medium',
      pt: 'medium'
    },
    image: '/images/snake.jpg',
    category: 'animal',
    verified: 'yes'
  },
  {
    word: {
      en: 'TURTLE',
      pt: 'TARTARUGA'
    },
    difficulty: {
      en: 'medium',
      pt: 'medium'
    },
    image: '/images/turtle.jpg',
    category: 'animal',
    verified: 'pending'
  },
  {
    word: {
      en: 'FROG',
      pt: 'SAPO'
    },
    difficulty: {
      en: 'easy',
      pt: 'easy'
    },
    image: '/images/frog.jpg',
    category: 'animal',
    verified: 'yes'
  },
  {
    word: {
      en: 'OWL',
      pt: 'CORUJA'
    },
    difficulty: {
      en: 'easy',
      pt: 'medium'
    },
    image: '/images/owl.jpg',
    category: 'animal',
    verified: 'pending'
  },
  // More Foods
  {
    word: {
      en: 'ORANGE',
      pt: 'LARANJA'
    },
    difficulty: {
      en: 'medium',
      pt: 'medium'
    },
    image: '/images/orange.jpg',
    category: 'food',
    verified: 'pending'
  },
  {
    word: {
      en: 'GRAPE',
      pt: 'UVA'
    },
    difficulty: {
      en: 'medium',
      pt: 'easy'
    },
    category: 'food',
    verified: 'invalid'
  },
  {
    word: {
      en: 'STRAWBERRY',
      pt: 'MORANGO'
    },
    difficulty: {
      en: 'medium',
      pt: 'medium'
    },
    image: '/images/strawberry.jpg',
    category: 'food',
    verified: 'yes'
  },
  {
    word: {
      en: 'CAKE',
      pt: 'BOLO'
    },
    difficulty: {
      en: 'easy',
      pt: 'easy'
    },
    image: '/images/cake.jpg',
    category: 'food',
    verified: 'yes'
  },
  {
    word: {
      en: 'COOKIE',
      pt: 'BISCOITO'
    },
    difficulty: {
      en: 'medium',
      pt: 'medium'
    },
    image: '/images/cookie.jpg',
    category: 'food',
    verified: 'yes'
  },
  {
    word: {
      en: 'PIZZA',
      pt: 'PIZZA'
    },
    difficulty: {
      en: 'medium',
      pt: 'medium'
    },
    image: '/images/pizza.jpg',
    category: 'food',
    verified: 'yes'
  },
  {
    word: {
      en: 'ICECREAM',
      pt: 'SORVETE'
    },
    difficulty: {
      en: 'medium',
      pt: 'medium'
    },
    image: '/images/icecream.jpg',
    category: 'food',
    verified: 'yes'
  },
  {
    word: {
      en: 'BREAD',
      pt: 'PÃO'
    },
    difficulty: {
      en: 'medium',
      pt: 'easy'
    },
    image: '/images/bread.jpg',
    category: 'food',
    verified: 'pending'
  },
  {
    word: {
      en: 'CHEESE',
      pt: 'QUEIJO'
    },
    difficulty: {
      en: 'medium',
      pt: 'medium'
    },
    category: 'food',
    verified: 'invalid'
  },
  {
    word: {
      en: 'EGG',
      pt: 'OVO'
    },
    difficulty: {
      en: 'easy',
      pt: 'easy'
    },
    image: '/images/egg.jpg',
    category: 'food',
    verified: 'yes'
  },
  {
    word: {
      en: 'MILK',
      pt: 'LEITE'
    },
    difficulty: {
      en: 'easy',
      pt: 'easy'
    },
    image: '/images/milk.jpg',
    category: 'food',
    verified: 'yes'
  },
  {
    word: {
      en: 'WATERMELON',
      pt: 'MELANCIA'
    },
    difficulty: {
      en: 'medium',
      pt: 'medium'
    },
    image: '/images/watermelon.jpg',
    category: 'food',
    verified: 'yes'
  },
  // More Vegetables
  {
    word: {
      en: 'POTATO',
      pt: 'BATATA'
    },
    difficulty: {
      en: 'medium',
      pt: 'easy'
    },
    image: '/images/potato.jpg',
    category: 'vegetable',
    verified: 'pending'
  },
  {
    word: {
      en: 'CORN',
      pt: 'MILHO'
    },
    difficulty: {
      en: 'easy',
      pt: 'medium'
    },
    image: '/images/corn.jpg',
    category: 'vegetable',
    verified: 'pending'
  },
  {
    word: {
      en: 'PEPPER',
      pt: 'PIMENTÃO'
    },
    difficulty: {
      en: 'medium',
      pt: 'medium'
    },
    image: '/images/pepper.jpg',
    category: 'vegetable',
    verified: 'yes'
  },
  {
    word: {
      en: 'CUCUMBER',
      pt: 'PEPINO'
    },
    difficulty: {
      en: 'medium',
      pt: 'easy'
    },
    image: '/images/cucumber.jpg',
    category: 'vegetable',
    verified: 'pending'
  },
  {
    word: {
      en: 'BROCCOLI',
      pt: 'BRÓCOLIS'
    },
    difficulty: {
      en: 'medium',
      pt: 'medium'
    },
    image: '/images/broccoli.jpg',
    category: 'vegetable',
    verified: 'yes'
  },
  {
    word: {
      en: 'LETTUCE',
      pt: 'ALFACE'
    },
    difficulty: {
      en: 'medium',
      pt: 'medium'
    },
    image: '/images/lettuce.jpg',
    category: 'vegetable',
    verified: 'yes'
  },
  // More Objects
  {
    word: {
      en: 'CAR',
      pt: 'CARRO'
    },
    difficulty: {
      en: 'easy',
      pt: 'medium'
    },
    image: '/images/car.jpg',
    category: 'object',
    verified: 'yes'
  },
  {
    word: {
      en: 'TRAIN',
      pt: 'TREM'
    },
    difficulty: {
      en: 'medium',
      pt: 'medium'
    },
    image: '/images/train.jpg',
    category: 'object',
    verified: 'pending'
  },
  {
    word: {
      en: 'PLANE',
      pt: 'AVIÃO'
    },
    difficulty: {
      en: 'medium',
      pt: 'medium'
    },
    image: '/images/plane.jpg',
    category: 'object',
    verified: 'pending'
  },
  {
    word: {
      en: 'BOAT',
      pt: 'BARCO'
    },
    difficulty: {
      en: 'easy',
      pt: 'medium'
    },
    image: '/images/boat.jpg',
    category: 'object',
    verified: 'pending'
  },
  {
    word: {
      en: 'BIKE',
      pt: 'BICICLETA'
    },
    difficulty: {
      en: 'easy',
      pt: 'medium'
    },
    image: '/images/bike.jpg',
    category: 'object',
    verified: 'pending'
  },
  {
    word: {
      en: 'CUP',
      pt: 'COPO'
    },
    difficulty: {
      en: 'easy',
      pt: 'easy'
    },
    image: '/images/cup.jpg',
    category: 'object',
    verified: 'pending'
  },
  {
    word: {
      en: 'SPOON',
      pt: 'COLHER'
    },
    difficulty: {
      en: 'medium',
      pt: 'medium'
    },
    image: '/images/spoon.jpg',
    category: 'object',
    verified: 'pending'
  },
  {
    word: {
      en: 'FORK',
      pt: 'GARFO'
    },
    difficulty: {
      en: 'easy',
      pt: 'medium'
    },
    image: '/images/fork.jpg',
    category: 'object',
    verified: 'pending'
  },
  {
    word: {
      en: 'PLATE',
      pt: 'PRATO'
    },
    difficulty: {
      en: 'medium',
      pt: 'medium'
    },
    image: '/images/plate.jpg',
    category: 'object',
    verified: 'pending'
  },
  {
    word: {
      en: 'PENCIL',
      pt: 'LÁPIS'
    },
    difficulty: {
      en: 'medium',
      pt: 'medium'
    },
    image: '/images/pencil.jpg',
    category: 'object',
    verified: 'pending'
  },
  {
    word: {
      en: 'FLOWER',
      pt: 'FLOR'
    },
    difficulty: {
      en: 'medium',
      pt: 'easy'
    },
    image: '/images/flower.jpg',
    category: 'object',
    verified: 'yes'
  },
  {
    word: {
      en: 'CLOUD',
      pt: 'NUVEM'
    },
    difficulty: {
      en: 'medium',
      pt: 'medium'
    },
    image: '/images/cloud.jpg',
    category: 'object',
    verified: 'pending'
  },
  {
    word: {
      en: 'RAINBOW',
      pt: 'ARCOÍRIS'
    },
    difficulty: {
      en: 'medium',
      pt: 'hard'
    },
    image: '/images/rainbow.jpg',
    category: 'object',
    verified: 'pending'
  },
  {
    word: {
      en: 'SHOE',
      pt: 'SAPATO'
    },
    difficulty: {
      en: 'easy',
      pt: 'medium'
    },
    image: '/images/shoe.jpg',
    category: 'object',
    verified: 'yes'
  },
  {
    word: {
      en: 'HAT',
      pt: 'CHAPÉU'
    },
    difficulty: {
      en: 'easy',
      pt: 'medium'
    },
    category: 'object',
    verified: 'invalid'
  },
  {
    word: {
      en: 'GLASSES',
      pt: 'ÓCULOS'
    },
    difficulty: {
      en: 'medium',
      pt: 'medium'
    },
    image: '/images/glasses.jpg',
    category: 'object',
    verified: 'yes'
  },
  {
    word: {
      en: 'CLOCK',
      pt: 'RELÓGIO'
    },
    difficulty: {
      en: 'medium',
      pt: 'medium'
    },
    image: '/images/clock.jpg',
    category: 'object',
    verified: 'pending'
  },
  {
    word: {
      en: 'KEY',
      pt: 'CHAVE'
    },
    difficulty: {
      en: 'easy',
      pt: 'medium'
    },
    image: '/images/key.jpg',
    category: 'object',
    verified: 'pending'
  },
  {
    word: {
      en: 'UMBRELLA',
      pt: 'GUARDACHUVA'
    },
    difficulty: {
      en: 'medium',
      pt: 'hard'
    },
    image: '/images/umbrella.jpg',
    category: 'object',
    verified: 'pending'
  },
  {
    word: {
      en: 'CANDLE',
      pt: 'VELA'
    },
    difficulty: {
      en: 'medium',
      pt: 'easy'
    },
    image: '/images/candle.jpg',
    category: 'object',
    verified: 'pending'
  },
  {
    word: {
      en: 'GIFT',
      pt: 'PRESENTE'
    },
    difficulty: {
      en: 'easy',
      pt: 'medium'
    },
    image: '/images/gift.jpg',
    category: 'object',
    verified: 'pending'
  },
  {
    word: {
      en: 'CROWN',
      pt: 'COROA'
    },
    difficulty: {
      en: 'medium',
      pt: 'medium'
    },
    image: '/images/crown.jpg',
    category: 'object',
    verified: 'pending'
  },
  {
    word: {
      en: 'ROCKET',
      pt: 'FOGUETE'
    },
    difficulty: {
      en: 'medium',
      pt: 'medium'
    },
    image: '/images/rocket.jpg',
    category: 'object',
    verified: 'pending'
  },
  {
    word: {
      en: 'KITE',
      pt: 'PIPA'
    },
    difficulty: {
      en: 'easy',
      pt: 'easy'
    },
    image: '/images/kite.jpg',
    category: 'object',
    verified: 'pending'
  },
  {
    word: {
      en: 'DRUM',
      pt: 'TAMBOR'
    },
    difficulty: {
      en: 'easy',
      pt: 'medium'
    },
    image: '/images/drum.jpg',
    category: 'object',
    verified: 'yes'
  },
  {
    word: {
      en: 'GUITAR',
      pt: 'GUITARRA'
    },
    difficulty: {
      en: 'medium',
      pt: 'hard'
    },
    image: '/images/guitar.jpg',
    category: 'object',
    verified: 'yes'
  }
]

// Function to get a random word for a specific language
// usedIndices: array of indices that have already been used in the current game session
// difficulty: 'any', 'easy', 'medium', or 'hard' - filters words by difficulty (default: 'any')
// Only returns words with verified: 'yes'
export function getRandomWord(locale = 'en', usedIndices = [], difficulty = 'any') {
  // Filter to only verified words (verified: 'yes')
  let verifiedWords = gameWords
    .map((word, index) => ({ word, index }))
    .filter(({ word }) => word.verified === 'yes')
  
  // Filter by difficulty if specified (not 'any')
  if (difficulty !== 'any') {
    verifiedWords = verifiedWords.filter(({ word }) => {
      const wordDifficulty = word.difficulty?.[locale] || word.difficulty?.en
      return wordDifficulty === difficulty
    })
  }
  
  // If no verified words available, throw an error
  if (verifiedWords.length === 0) {
    throw new Error('No verified words available. Please run the image verification script first.')
  }
  
  // Filter out used indices from verified words
  const availableWords = verifiedWords.filter(({ index }) => !usedIndices.includes(index))
  
  // If all verified words have been used, reset the history
  if (availableWords.length === 0) {
    usedIndices = []
    return getRandomWord(locale, [], difficulty)
  }
  
  // Pick a random word from available verified ones
  const randomWord = availableWords[Math.floor(Math.random() * availableWords.length)]
  const wordData = randomWord.word
  
  return {
    word: wordData.word[locale] || wordData.word.en,
    image: wordData.image || wordData.url, // Use image if available, fallback to url
    category: wordData.category,
    index: randomWord.index // Return the index so we can track it
  }
}

