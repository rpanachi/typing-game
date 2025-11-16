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
    url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=400&fit=crop&q=80',
    image: '/images/cat.jpg',
    category: 'animal',
    verified: 'yes'
  },
  {
    word: {
      en: 'DOG',
      pt: 'CACHORRO'
    },
    url: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?w=400&h=400&fit=crop&q=80',
    image: '/images/dog.jpg',
    category: 'animal',
    verified: 'yes'
  },
  {
    word: {
      en: 'LION',
      pt: 'LEÃO'
    },
    url: '/images/lion.jpg',
    image: '/images/lion.jpg',
    category: 'animal',
    verified: 'yes'
  },
  {
    word: {
      en: 'ELEPHANT',
      pt: 'ELEFANTE'
    },
    url: '/images/elephant.jpg',
    image: '/images/elephant.jpg',
    category: 'animal',
    verified: 'yes'
  },
  {
    word: {
      en: 'BIRD',
      pt: 'PÁSSARO'
    },
    url: 'https://images.unsplash.com/photo-1444464666168-49d633b86797?w=400&h=400&fit=crop&q=80',
    image: '/images/bird.jpg',
    category: 'animal',
    verified: 'yes'
  },
  {
    word: {
      en: 'FISH',
      pt: 'PEIXE'
    },
    url: 'https://images.unsplash.com/photo-1716929157477-f75c6f6e2195?ixid=M3w4MzEyMzl8MHwxfHNlYXJjaHw3fHxGSVNIJTIwY2FydG9vbiUyMGRyYXdpbmd8ZW58MHwyfHx8MTc2MzI1ODY4Mnww&ixlib=rb-4.1.0&w=400&h=400&fit=crop&q=80',
    image: '/images/fish.jpg',
    category: 'animal',
    verified: 'yes'
  },
  {
    word: {
      en: 'APPLE',
      pt: 'MAÇÃ'
    },
    url: 'https://images.unsplash.com/photo-1630313877297-8773445184b9?ixid=M3w4MzEyMzl8MHwxfHNlYXJjaHwzfHxBUFBMRSUyMGNhcnRvb24lMjBkcmF3aW5nfGVufDB8Mnx8fDE3NjMyNTg2ODR8MA&ixlib=rb-4.1.0&w=400&h=400&fit=crop&q=80',
    image: '/images/apple.jpg',
    category: 'food',
    verified: 'yes'
  },
  {
    word: {
      en: 'BANANA',
      pt: 'BANANA'
    },
    url: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&h=400&fit=crop&q=80',
    image: '/images/banana.jpg',
    category: 'food',
    verified: 'yes'
  },
  {
    word: {
      en: 'CARROT',
      pt: 'CENOURA'
    },
    url: 'https://images.unsplash.com/photo-1588073019544-d9d80701ef83?ixid=M3w4MzEyMzl8MHwxfHNlYXJjaHw2fHxDQVJST1QlMjBjYXJ0b29uJTIwZHJhd2luZ3xlbnwwfDJ8fHwxNzYzMjU4Njg1fDA&ixlib=rb-4.1.0&w=400&h=400&fit=crop&q=80',
    image: '/images/carrot.jpg',
    category: 'vegetable',
    verified: 'yes'
  },
  {
    word: {
      en: 'TOMATO',
      pt: 'TOMATE'
    },
    url: 'https://images.unsplash.com/photo-1587486938113-d6d38d424efa?ixid=M3w4MzEyMzl8MHwxfHNlYXJjaHw4fHxUT01BVE8lMjBjYXJ0b29uJTIwZHJhd2luZ3xlbnwwfDJ8fHwxNzYzMjU4Njg2fDA&ixlib=rb-4.1.0&w=400&h=400&fit=crop&q=80',
    image: '/images/tomato.jpg',
    category: 'vegetable',
    verified: 'yes'
  },
  {
    word: {
      en: 'BALL',
      pt: 'BOLA'
    },
    url: 'https://images.unsplash.com/photo-1614634713281-75ea0c149c3d?w=400&h=400&fit=crop&q=80',
    category: 'object',
    verified: 'invalid'
  },
  {
    word: {
      en: 'BOOK',
      pt: 'LIVRO'
    },
    url: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop&q=80',
    image: '/images/book.jpg',
    category: 'object',
    verified: 'yes'
  },
  {
    word: {
      en: 'SUN',
      pt: 'SOL'
    },
    url: 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=400&h=400&fit=crop&q=80',
    image: '/images/sun.jpg',
    category: 'object',
    verified: 'yes'
  },
  {
    word: {
      en: 'STAR',
      pt: 'ESTRELA'
    },
    url: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=400&h=400&fit=crop&q=80',
    image: '/images/star.jpg',
    category: 'object',
    verified: 'yes'
  },
  {
    word: {
      en: 'HOUSE',
      pt: 'CASA'
    },
    url: 'https://images.unsplash.com/photo-1754391653116-c6c5419588a9?ixid=M3w4MzEyMzl8MHwxfHNlYXJjaHwzfHxIT1VTRSUyMGNhcnRvb24lMjBkcmF3aW5nfGVufDB8Mnx8fDE3NjMyNTg2ODl8MA&ixlib=rb-4.1.0&w=400&h=400&fit=crop&q=80',
    image: '/images/house.jpg',
    category: 'object',
    verified: 'pending'
  },
  {
    word: {
      en: 'TREE',
      pt: 'ÁRVORE'
    },
    url: 'https://images.unsplash.com/photo-1738954096010-91c5a70f9244?ixid=M3w4MzEyMzl8MHwxfHNlYXJjaHwxfHxUUkVFJTIwY2FydG9vbiUyMGRyYXdpbmd8ZW58MHwyfHx8MTc2MzI1NjIyNXww&ixlib=rb-4.1.0&w=400&h=400&fit=crop&q=80',
    image: '/images/tree.jpg',
    category: 'object',
    verified: 'yes'
  },
  {
    word: {
      en: 'HEART',
      pt: 'CORAÇÃO'
    },
    url: 'https://images.unsplash.com/photo-1715111641716-e52694b3e3c1?ixid=M3w4MzEyMzl8MHwxfHNlYXJjaHwxfHxIRUFSVCUyMGNhcnRvb24lMjBkcmF3aW5nfGVufDB8Mnx8fDE3NjMyNTYyMjd8MA&ixlib=rb-4.1.0&w=400&h=400&fit=crop&q=80',
    image: '/images/heart.jpg',
    category: 'object',
    verified: 'yes'
  },
  {
    word: {
      en: 'MOON',
      pt: 'LUA'
    },
    url: 'https://images.unsplash.com/photo-1706608699875-f2e048575c81?ixid=M3w4MzEyMzl8MHwxfHNlYXJjaHwxfHxNT09OJTIwY2FydG9vbiUyMGRyYXdpbmd8ZW58MHwyfHx8MTc2MzI1NjIyOHww&ixlib=rb-4.1.0&w=400&h=400&fit=crop&q=80',
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
    url: 'https://images.unsplash.com/photo-1746106585883-3c938ed68c9d?ixid=M3w4MzEyMzl8MHwxfHNlYXJjaHwxfHxSQUJCSVQlMjBjYXJ0b29uJTIwZHJhd2luZ3xlbnwwfDJ8fHwxNzYzMjU2MjMwfDA&ixlib=rb-4.1.0&w=400&h=400&fit=crop&q=80',
    image: '/images/rabbit.jpg',
    category: 'animal',
    verified: 'pending'
  },
  {
    word: {
      en: 'BEAR',
      pt: 'URSO'
    },
    url: 'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?w=400&h=400&fit=crop&q=80',
    image: '/images/bear.jpg',
    category: 'animal',
    verified: 'yes'
  },
  {
    word: {
      en: 'TIGER',
      pt: 'TIGRE'
    },
    url: 'https://images.unsplash.com/photo-1703108091575-34c93bc8e85b?ixid=M3w4MzEyMzl8MHwxfHNlYXJjaHwxfHxUSUdFUiUyMGNhcnRvb24lMjBkcmF3aW5nfGVufDB8Mnx8fDE3NjMyNTYyMzN8MA&ixlib=rb-4.1.0&w=400&h=400&fit=crop&q=80',
    image: '/images/tiger.jpg',
    category: 'animal',
    verified: 'pending'
  },
  {
    word: {
      en: 'COW',
      pt: 'VACA'
    },
    url: 'https://images.unsplash.com/photo-1690527626754-024082731b47?ixid=M3w4MzEyMzl8MHwxfHNlYXJjaHwxfHxDT1clMjBjYXJ0b29uJTIwZHJhd2luZ3xlbnwwfDJ8fHwxNzYzMjU2MjM0fDA&ixlib=rb-4.1.0&w=400&h=400&fit=crop&q=80',
    image: '/images/cow.jpg',
    category: 'animal',
    verified: 'pending'
  },
  {
    word: {
      en: 'PIG',
      pt: 'PORCO'
    },
    url: 'https://images.unsplash.com/photo-1709768669165-e213f726aa9e?ixid=M3w4MzEyMzl8MHwxfHNlYXJjaHwxfHxQSUclMjBjYXJ0b29uJTIwZHJhd2luZ3xlbnwwfDJ8fHwxNzYzMjU2MjM2fDA&ixlib=rb-4.1.0&w=400&h=400&fit=crop&q=80',
    image: '/images/pig.jpg',
    category: 'animal',
    verified: 'pending'
  },
  {
    word: {
      en: 'DUCK',
      pt: 'PATO'
    },
    url: 'https://images.unsplash.com/photo-1762113396314-8e9e5417ed17?ixid=M3w4MzEyMzl8MHwxfHNlYXJjaHwxfHxEVUNLJTIwY2FydG9vbiUyMGRyYXdpbmd8ZW58MHwyfHx8MTc2MzI1NjIzN3ww&ixlib=rb-4.1.0&w=400&h=400&fit=crop&q=80',
    image: '/images/duck.jpg',
    category: 'animal',
    verified: 'pending'
  },
  {
    word: {
      en: 'HORSE',
      pt: 'CAVALO'
    },
    url: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=400&h=400&fit=crop&q=80',
    image: '/images/horse.jpg',
    category: 'animal',
    verified: 'yes'
  },
  {
    word: {
      en: 'MONKEY',
      pt: 'MACACO'
    },
    url: 'https://images.unsplash.com/photo-1749990631584-91727f831629?ixid=M3w4MzEyMzl8MHwxfHNlYXJjaHwxfHxNT05LRVklMjBjYXJ0b29uJTIwZHJhd2luZ3xlbnwwfDJ8fHwxNzYzMjU2MjM5fDA&ixlib=rb-4.1.0&w=400&h=400&fit=crop&q=80',
    image: '/images/monkey.jpg',
    category: 'animal',
    verified: 'pending'
  },
  {
    word: {
      en: 'PANDA',
      pt: 'PANDA'
    },
    url: 'https://images.unsplash.com/photo-1762860498409-19f0102bdae6?ixid=M3w4MzEyMzl8MHwxfHNlYXJjaHwxfHxQQU5EQSUyMGNhcnRvb24lMjBkcmF3aW5nfGVufDB8Mnx8fDE3NjMyNTYyNDB8MA&ixlib=rb-4.1.0&w=400&h=400&fit=crop&q=80',
    image: '/images/panda.jpg',
    category: 'animal',
    verified: 'pending'
  },
  {
    word: {
      en: 'BUTTERFLY',
      pt: 'BORBOLETA'
    },
    url: 'https://images.unsplash.com/photo-1543264511-b481fda2cb81?ixid=M3w4MzEyMzl8MHwxfHNlYXJjaHwxfHxCVVRURVJGTFklMjBjYXJ0b29uJTIwZHJhd2luZ3xlbnwwfDJ8fHwxNzYzMjU1ODYzfDA&ixlib=rb-4.1.0&w=400&h=400&fit=crop&q=80',
    image: '/images/butterfly.jpg',
    category: 'animal',
    verified: 'yes'
  },
  {
    word: {
      en: 'BEE',
      pt: 'ABELHA'
    },
    url: 'https://images.unsplash.com/photo-1712307155384-241ff2919638?ixid=M3w4MzEyMzl8MHwxfHNlYXJjaHwxfHxCRUUlMjBjYXJ0b29uJTIwZHJhd2luZ3xlbnwwfDJ8fHwxNzYzMjU2MjQzfDA&ixlib=rb-4.1.0&w=400&h=400&fit=crop&q=80',
    image: '/images/bee.jpg',
    category: 'animal',
    verified: 'pending'
  },
  {
    word: {
      en: 'SNAKE',
      pt: 'COBRA'
    },
    url: 'https://images.unsplash.com/photo-1633081528930-91c8cc07f3d7?ixid=M3w4MzEyMzl8MHwxfHNlYXJjaHwxfHxTTkFLRSUyMGNhcnRvb24lMjBkcmF3aW5nfGVufDB8Mnx8fDE3NjMyNTYyNDR8MA&ixlib=rb-4.1.0&w=400&h=400&fit=crop&q=80',
    image: '/images/snake.jpg',
    category: 'animal',
    verified: 'yes'
  },
  {
    word: {
      en: 'TURTLE',
      pt: 'TARTARUGA'
    },
    url: 'https://images.unsplash.com/photo-1716929806104-789860c3570c?ixid=M3w4MzEyMzl8MHwxfHNlYXJjaHwxfHxUVVJUTEUlMjBjYXJ0b29uJTIwZHJhd2luZ3xlbnwwfDJ8fHwxNzYzMjU2MjQ2fDA&ixlib=rb-4.1.0&w=400&h=400&fit=crop&q=80',
    image: '/images/turtle.jpg',
    category: 'animal',
    verified: 'pending'
  },
  {
    word: {
      en: 'FROG',
      pt: 'SAPO'
    },
    url: 'https://images.unsplash.com/photo-1640471510593-c2122aab7d3b?ixid=M3w4MzEyMzl8MHwxfHNlYXJjaHwxfHxGUk9HJTIwY2FydG9vbiUyMGRyYXdpbmd8ZW58MHwyfHx8MTc2MzI1NjI0N3ww&ixlib=rb-4.1.0&w=400&h=400&fit=crop&q=80',
    image: '/images/frog.jpg',
    category: 'animal',
    verified: 'yes'
  },
  {
    word: {
      en: 'OWL',
      pt: 'CORUJA'
    },
    url: 'https://images.unsplash.com/photo-1762113396444-e2f1a62da4f4?ixid=M3w4MzEyMzl8MHwxfHNlYXJjaHwxfHxPV0wlMjBjYXJ0b29uJTIwZHJhd2luZ3xlbnwwfDJ8fHwxNzYzMjU1ODY0fDA&ixlib=rb-4.1.0&w=400&h=400&fit=crop&q=80',
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
    url: 'https://images.unsplash.com/photo-1550497705-2acd5c1546f6?ixid=M3w4MzEyMzl8MHwxfHNlYXJjaHwxfHxPUkFOR0UlMjBjYXJ0b29uJTIwZHJhd2luZ3xlbnwwfDJ8fHwxNzYzMjU2MjUwfDA&ixlib=rb-4.1.0&w=400&h=400&fit=crop&q=80',
    image: '/images/orange.jpg',
    category: 'food',
    verified: 'pending'
  },
  {
    word: {
      en: 'GRAPE',
      pt: 'UVA'
    },
    url: 'https://images.unsplash.com/photo-1604449178522-682bc7c54692?w=400&h=400&fit=crop&q=80',
    category: 'food',
    verified: 'invalid'
  },
  {
    word: {
      en: 'STRAWBERRY',
      pt: 'MORANGO'
    },
    url: 'https://images.unsplash.com/photo-1749587452499-ea1fd591e63f?ixid=M3w4MzEyMzl8MHwxfHNlYXJjaHwxfHxTVFJBV0JFUlJZJTIwY2FydG9vbiUyMGRyYXdpbmd8ZW58MHwyfHx8MTc2MzI1NjI1MXww&ixlib=rb-4.1.0&w=400&h=400&fit=crop&q=80',
    image: '/images/strawberry.jpg',
    category: 'food',
    verified: 'yes'
  },
  {
    word: {
      en: 'CAKE',
      pt: 'BOLO'
    },
    url: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=400&fit=crop&q=80',
    image: '/images/cake.jpg',
    category: 'food',
    verified: 'yes'
  },
  {
    word: {
      en: 'COOKIE',
      pt: 'BISCOITO'
    },
    url: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400&h=400&fit=crop&q=80',
    image: '/images/cookie.jpg',
    category: 'food',
    verified: 'yes'
  },
  {
    word: {
      en: 'PIZZA',
      pt: 'PIZZA'
    },
    url: 'https://images.unsplash.com/photo-1692737580547-b45bb4a02356?ixid=M3w4MzEyMzl8MHwxfHNlYXJjaHwxfHxQSVpaQSUyMGNhcnRvb24lMjBkcmF3aW5nfGVufDB8Mnx8fDE3NjMyNTYyNTN8MA&ixlib=rb-4.1.0&w=400&h=400&fit=crop&q=80',
    image: '/images/pizza.jpg',
    category: 'food',
    verified: 'yes'
  },
  {
    word: {
      en: 'ICECREAM',
      pt: 'SORVETE'
    },
    url: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=400&fit=crop&q=80',
    image: '/images/icecream.jpg',
    category: 'food',
    verified: 'yes'
  },
  {
    word: {
      en: 'BREAD',
      pt: 'PÃO'
    },
    url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=400&fit=crop&q=80',
    image: '/images/bread.jpg',
    category: 'food',
    verified: 'pending'
  },
  {
    word: {
      en: 'CHEESE',
      pt: 'QUEIJO'
    },
    url: 'https://images.unsplash.com/photo-1618164436227-e5e4f57b5b3e?w=400&h=400&fit=crop&q=80',
    category: 'food',
    verified: 'invalid'
  },
  {
    word: {
      en: 'EGG',
      pt: 'OVO'
    },
    url: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400&h=400&fit=crop&q=80',
    image: '/images/egg.jpg',
    category: 'food',
    verified: 'yes'
  },
  {
    word: {
      en: 'MILK',
      pt: 'LEITE'
    },
    url: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&h=400&fit=crop&q=80',
    image: '/images/milk.jpg',
    category: 'food',
    verified: 'yes'
  },
  {
    word: {
      en: 'WATERMELON',
      pt: 'MELANCIA'
    },
    url: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&h=400&fit=crop&q=80',
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
    url: 'https://images.unsplash.com/photo-1518977822534-7049a61ee0c2?w=400&h=400&fit=crop&q=80',
    image: '/images/potato.jpg',
    category: 'vegetable',
    verified: 'pending'
  },
  {
    word: {
      en: 'CORN',
      pt: 'MILHO'
    },
    url: 'https://images.unsplash.com/photo-1574800158612-0467d582e440?ixid=M3w4MzEyMzl8MHwxfHNlYXJjaHwxfHxDT1JOJTIwY2FydG9vbiUyMGRyYXdpbmd8ZW58MHwyfHx8MTc2MzI1NTg2Nnww&ixlib=rb-4.1.0&w=400&h=400&fit=crop&q=80',
    image: '/images/corn.jpg',
    category: 'vegetable',
    verified: 'pending'
  },
  {
    word: {
      en: 'PEPPER',
      pt: 'PIMENTÃO'
    },
    url: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=400&h=400&fit=crop&q=80',
    image: '/images/pepper.jpg',
    category: 'vegetable',
    verified: 'yes'
  },
  {
    word: {
      en: 'CUCUMBER',
      pt: 'PEPINO'
    },
    url: 'https://images.unsplash.com/photo-1587313170527-446f86d0c3d9?ixid=M3w4MzEyMzl8MHwxfHNlYXJjaHwxfHxDVUNVTUJFUiUyMGNhcnRvb24lMjBkcmF3aW5nfGVufDB8Mnx8fDE3NjMyNTU4Njd8MA&ixlib=rb-4.1.0&w=400&h=400&fit=crop&q=80',
    image: '/images/cucumber.jpg',
    category: 'vegetable',
    verified: 'pending'
  },
  {
    word: {
      en: 'BROCCOLI',
      pt: 'BRÓCOLIS'
    },
    url: 'https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?w=400&h=400&fit=crop&q=80',
    image: '/images/broccoli.jpg',
    category: 'vegetable',
    verified: 'yes'
  },
  {
    word: {
      en: 'LETTUCE',
      pt: 'ALFACE'
    },
    url: 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=400&h=400&fit=crop&q=80',
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
    url: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=400&fit=crop&q=80',
    image: '/images/car.jpg',
    category: 'object',
    verified: 'yes'
  },
  {
    word: {
      en: 'TRAIN',
      pt: 'TREM'
    },
    url: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=400&h=400&fit=crop&q=80',
    image: '/images/train.jpg',
    category: 'object',
    verified: 'pending'
  },
  {
    word: {
      en: 'PLANE',
      pt: 'AVIÃO'
    },
    url: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&h=400&fit=crop&q=80',
    image: '/images/plane.jpg',
    category: 'object',
    verified: 'pending'
  },
  {
    word: {
      en: 'BOAT',
      pt: 'BARCO'
    },
    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop&q=80',
    image: '/images/boat.jpg',
    category: 'object',
    verified: 'pending'
  },
  {
    word: {
      en: 'BIKE',
      pt: 'BICICLETA'
    },
    url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop&q=80',
    image: '/images/bike.jpg',
    category: 'object',
    verified: 'pending'
  },
  {
    word: {
      en: 'CUP',
      pt: 'COPO'
    },
    url: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&h=400&fit=crop&q=80',
    image: '/images/cup.jpg',
    category: 'object',
    verified: 'pending'
  },
  {
    word: {
      en: 'SPOON',
      pt: 'COLHER'
    },
    url: 'https://images.unsplash.com/photo-1600267175161-cfaa711b4a81?w=400&h=400&fit=crop&q=80',
    image: '/images/spoon.jpg',
    category: 'object',
    verified: 'pending'
  },
  {
    word: {
      en: 'FORK',
      pt: 'GARFO'
    },
    url: 'https://images.unsplash.com/photo-1600267175161-cfaa711b4a81?w=400&h=400&fit=crop&q=80',
    image: '/images/fork.jpg',
    category: 'object',
    verified: 'pending'
  },
  {
    word: {
      en: 'PLATE',
      pt: 'PRATO'
    },
    url: 'https://images.unsplash.com/photo-1556910096-6f5e72db6803?w=400&h=400&fit=crop&q=80',
    image: '/images/plate.jpg',
    category: 'object',
    verified: 'pending'
  },
  {
    word: {
      en: 'PENCIL',
      pt: 'LÁPIS'
    },
    url: 'https://images.unsplash.com/photo-1583484963886-cfe2bff2945f?w=400&h=400&fit=crop&q=80',
    image: '/images/pencil.jpg',
    category: 'object',
    verified: 'pending'
  },
  {
    word: {
      en: 'FLOWER',
      pt: 'FLOR'
    },
    url: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400&h=400&fit=crop&q=80',
    image: '/images/flower.jpg',
    category: 'object',
    verified: 'yes'
  },
  {
    word: {
      en: 'CLOUD',
      pt: 'NUVEM'
    },
    url: 'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=400&h=400&fit=crop&q=80',
    image: '/images/cloud.jpg',
    category: 'object',
    verified: 'pending'
  },
  {
    word: {
      en: 'RAINBOW',
      pt: 'ARCOÍRIS'
    },
    url: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=400&fit=crop&q=80',
    image: '/images/rainbow.jpg',
    category: 'object',
    verified: 'pending'
  },
  {
    word: {
      en: 'SHOE',
      pt: 'SAPATO'
    },
    url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop&q=80',
    image: '/images/shoe.jpg',
    category: 'object',
    verified: 'yes'
  },
  {
    word: {
      en: 'HAT',
      pt: 'CHAPÉU'
    },
    url: 'https://images.unsplash.com/photo-1521369909029-2af15e2c7866?w=400&h=400&fit=crop&q=80',
    category: 'object',
    verified: 'invalid'
  },
  {
    word: {
      en: 'GLASSES',
      pt: 'ÓCULOS'
    },
    url: 'https://images.unsplash.com/photo-1761864293845-90f7ff41739b?ixid=M3w4MzEyMzl8MHwxfHNlYXJjaHwxfHxHTEFTU0VTJTIwY2FydG9vbiUyMGRyYXdpbmd8ZW58MHwyfHx8MTc2MzI1NTg2OXww&ixlib=rb-4.1.0&w=400&h=400&fit=crop&q=80',
    image: '/images/glasses.jpg',
    category: 'object',
    verified: 'yes'
  },
  {
    word: {
      en: 'CLOCK',
      pt: 'RELÓGIO'
    },
    url: 'https://images.unsplash.com/photo-1493612276216-ee3925520721?w=400&h=400&fit=crop&q=80',
    image: '/images/clock.jpg',
    category: 'object',
    verified: 'pending'
  },
  {
    word: {
      en: 'KEY',
      pt: 'CHAVE'
    },
    url: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=400&h=400&fit=crop&q=80',
    image: '/images/key.jpg',
    category: 'object',
    verified: 'pending'
  },
  {
    word: {
      en: 'UMBRELLA',
      pt: 'GUARDACHUVA'
    },
    url: 'https://images.unsplash.com/photo-1538991383142-36c4edeaffde?w=400&h=400&fit=crop&q=80',
    image: '/images/umbrella.jpg',
    category: 'object',
    verified: 'pending'
  },
  {
    word: {
      en: 'CANDLE',
      pt: 'VELA'
    },
    url: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop&q=80',
    image: '/images/candle.jpg',
    category: 'object',
    verified: 'pending'
  },
  {
    word: {
      en: 'GIFT',
      pt: 'PRESENTE'
    },
    url: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=400&h=400&fit=crop&q=80',
    image: '/images/gift.jpg',
    category: 'object',
    verified: 'pending'
  },
  {
    word: {
      en: 'CROWN',
      pt: 'COROA'
    },
    url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop&q=80',
    image: '/images/crown.jpg',
    category: 'object',
    verified: 'pending'
  },
  {
    word: {
      en: 'ROCKET',
      pt: 'FOGUETE'
    },
    url: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&h=400&fit=crop&q=80',
    image: '/images/rocket.jpg',
    category: 'object',
    verified: 'pending'
  },
  {
    word: {
      en: 'KITE',
      pt: 'PIPA'
    },
    url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop&q=80',
    image: '/images/kite.jpg',
    category: 'object',
    verified: 'pending'
  },
  {
    word: {
      en: 'DRUM',
      pt: 'TAMBOR'
    },
    url: 'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=400&h=400&fit=crop&q=80',
    image: '/images/drum.jpg',
    category: 'object',
    verified: 'yes'
  },
  {
    word: {
      en: 'GUITAR',
      pt: 'GUITARRA'
    },
    url: 'https://images.unsplash.com/photo-1516924962500-2b4b3b99ea02?w=400&h=400&fit=crop&q=80',
    image: '/images/guitar.jpg',
    category: 'object',
    verified: 'yes'
  }
]

// Function to get a random word for a specific language
// usedIndices: array of indices that have already been used in the current game session
// Only returns words with verified: 'yes'
export function getRandomWord(locale = 'en', usedIndices = []) {
  // Filter to only verified words (verified: 'yes')
  const verifiedWords = gameWords
    .map((word, index) => ({ word, index }))
    .filter(({ word }) => word.verified === 'yes')
  
  // If no verified words available, throw an error
  if (verifiedWords.length === 0) {
    throw new Error('No verified words available. Please run the image verification script first.')
  }
  
  // Filter out used indices from verified words
  const availableWords = verifiedWords.filter(({ index }) => !usedIndices.includes(index))
  
  // If all verified words have been used, reset the history
  if (availableWords.length === 0) {
    usedIndices = []
    return getRandomWord(locale, [])
  }
  
  // Pick a random word from available verified ones
  const randomWord = availableWords[Math.floor(Math.random() * availableWords.length)]
  const wordData = randomWord.word
  
  return {
    word: wordData.word[locale] || wordData.word.en,
    url: wordData.url,
    image: wordData.image || wordData.url, // Use image if available, fallback to url
    category: wordData.category,
    index: randomWord.index // Return the index so we can track it
  }
}

