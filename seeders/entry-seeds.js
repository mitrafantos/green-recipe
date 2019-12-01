// Подключаем mongoose.
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/recipe-assessment', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Recipe = require('../models/recipe');

const recipes = [
  {
    itemName: 'Salsify Taro Catsear Garlic',
    description:
      'Gumbo beet greens corn soko endive gumbo gourd. Parsley shallot courgette tatsoi pea sprouts fava bean collard greens dandelion okra wakame tomato. Dandelion cucumber earthnut pea peanut soko zucchini.',
    startsAt: new Date(),
    endsAt: new Date(),
    authID: '5dde52b2a7758456fe768db5',
  },
  {
    itemName: 'Kohlrabi Radish Okra Azuki',
    description:
      'Turnip greens yarrow ricebean rutabaga endive cauliflower sea lettuce kohlrabi amaranth water spinach avocado daikon napa cabbage asparagus winter purslane kale. ',
    startsAt: new Date(),
    endsAt: new Date(),
    authID: '5dde52b2a7758456fe768db5',
  },
  {
    itemName: 'Lotus Root Water Spinach',
    description:
      'Celery potato scallion desert raisin horseradish spinach carrot soko. Lotus root water spinach fennel kombu maize bamboo shoot green bean swiss chard seakale pumpkin onion chickpea gram corn pea. ',
    startsAt: new Date(),
    endsAt: new Date(),
    authID: '5dde52b2a7758456fe768db5',
  },
  {
    itemName: 'Bean Swiss Chard Seakale',
    description:
      'Nori grape silver beet broccoli kombu beet greens fava bean potato quandong celery. Bunya nuts black-eyed pea prairie turnip leek lentil turnip greens parsnip. Sea lettuce lettuce water chestnut eggplant winter purslane fennel azuki bean earthnut pea sierra leone bologi leek soko chicory celtuce parsley',
    startsAt: new Date(),
    endsAt: new Date(),
    authID: '5dde52b2a7758456fe768db5',
  },
  {
    itemName: 'Magis Kohlrabi Welsh Onion',
    description:
      'Celery quandong swiss chard chicory earthnut pea potato. Salsify taro catsear garlic gram celery bitterleaf wattle seed collard greens nori. Grape wattle seed kombu beetroot horseradish carrot squash brussels sprout chard.',
    startsAt: new Date(),
    endsAt: new Date(),
    authID: '5dde52b2a7758456fe768db5',
  },
  {
    itemName: 'Parsley Shallot Courgette Tatsoi',
    description:
      'Beetroot water spinach okra water chestnut ricebean pea catsear courgette summer purslane. Water spinach arugula pea tatsoi aubergine spring onion bush tomato kale radicchio turnip chicory salsify pea sprouts fava bean. ',
    startsAt: new Date(),
    endsAt: new Date(),
    authID: '5dde52b2a7758456fe768db5',
  },
  {
    itemName: 'Bean Mustard Tigernut',
    description:
      'Soko radicchio bunya nuts gram dulse silver beet parsnip napa cabbage lotus root sea lettuce brussels sprout cabbage. Catsear cauliflower garbanzo yarrow salsify chicory garlic bell pepper napa cabbage lettuce tomato kale arugula melon sierra leone bologi rutabaga tigernut.',
    startsAt: new Date(),
    endsAt: new Date(),
    authID: '5dde52b2a7758456fe768db5',
  },
  {
    itemName: 'Aubergine Spring Onion',
    description:
      'Sea lettuce gumbo grape kale kombu cauliflower salsify kohlrabi okra sea lettuce broccoli celery lotus root carrot winter purslane turnip greens garlic. JÃ­cama garlic courgette coriander radicchio plantain scallion cauliflower fava bean desert raisin spring onion chicory bunya nuts.',
    startsAt: new Date(),
    endsAt: new Date(),
    authID: '5dde52b2a7758456fe768db5',
  },
  {
    itemName: 'Chicory Celtuce Parsley',
    description:
      'Soko radicchio bunya nuts gram dulse silver beet parsnip napa cabbage lotus root sea lettuce brussels sprout cabbage. Catsear cauliflower garbanzo yarrow salsify chicory garlic bell pepper napa cabbage lettuce tomato kale arugula melon sierra leone bologi rutabaga tigernut. ',
    startsAt: new Date(),
    endsAt: new Date(),
    authID: '5dde52b2a7758456fe768db5',
  },
  {
    itemName: 'Coriander Yarrow Sweet Pepper',
    description:
      'Water spinach arugula pea tatsoi aubergine spring onion bush tomato kale radicchio turnip chicory salsify pea sprouts fava bean. Dandelion zucchini burdock yarrow chickpea dandelion sorrel courgette turnip greens tigernut soybean radish artichoke wattle seed endive groundnut broccoli arugula.',
    startsAt: new Date(),
    endsAt: new Date(),
    authID: '5dde52b2a7758456fe768db5',
  },
];

Recipe.insertMany(recipes).then(() => {
  mongoose.connection.close();
});
