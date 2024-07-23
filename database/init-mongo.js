db.createCollection("users");
db.users.insertMany(
  [
    {
      "_id": ObjectId("64a4763d673ab26b467486fb"),
      "username": "urlauber69",
      "passwordHash": "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08",
      "email": "urlaub.malle@gmail.com",
      "registeredAt": new Date("2023-07-04T19:42:53.232Z"),
      "passwordChangedAt": new Date("2023-07-08T18:08:24.414Z"),
      "birthdate": new Date("2000-12-12T00:00:00.000Z"),
      "__v": 0
    },
    {
      "_id": ObjectId("64a4899ed4d9fa090e1bdc5e"),
      "username": "Mr.Worldwide",
      "passwordHash": "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08",
      "email": "mr.world@wide.de",
      "registeredAt": new Date("2023-07-04T21:05:34.215Z"),
      "passwordChangedAt": new Date("2023-07-04T21:05:34.215Z"),
      "birthdate": new Date("2000-12-12T00:00:00.000Z"),
      "__v": 0
    },
    {
      "_id": ObjectId("64a48adcd4d9fa090e1bdc6e"),
      "username": "Tim0",
      "passwordHash": "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08",
      "email": "timo.maier@web.de",
      "registeredAt": new Date("2023-07-04T21:10:52.113Z"),
      "passwordChangedAt": new Date("2023-07-04T21:10:52.113Z"),
      "birthdate": new Date("2000-12-12T00:00:00.000Z"),
      "__v": 0
    },
    {
      "_id": ObjectId("64a9a397ef66ffbcfb305710"),
      "username": "SurvivalManfred",
      "passwordHash": "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08",
      "email": "überleben.leicht@wald.de",
      "registeredAt": new Date("2023-07-08T17:57:43.123Z"),
      "passwordChangedAt": new Date("2023-07-08T18:04:43.021Z"),
      "birthdate": new Date("1984-10-02T00:00:00.000Z"),
      "__v": 0
    },
    {
      "_id": ObjectId("64a9a5c2ef66ffbcfb30576c"),
      "username": "JapanLover24",
      "passwordHash": "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08",
      "email": "japan.lover@gmx.de",
      "registeredAt": new Date("2023-07-08T18:06:58.670Z"),
      "passwordChangedAt": new Date("2023-07-08T18:06:58.670Z"),
      "birthdate": new Date("2003-12-14T00:00:00.000Z"),
      "__v": 0
    },
    {
      "_id": ObjectId("64a9a66eef66ffbcfb3057b2"),
      "username": "Lisa-Marie",
      "passwordHash": "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08",
      "email": "lisa.mueller@web.de",
      "registeredAt": new Date("2023-07-08T18:09:50.186Z"),
      "passwordChangedAt": new Date("2023-07-08T18:09:50.186Z"),
      "birthdate": new Date("2002-07-16T00:00:00.000Z"),
      "__v": 0
    },
    {
      "_id": ObjectId("64a9a7b1ef66ffbcfb3057d9"),
      "username": "Kaffeebohne78",
      "passwordHash": "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08",
      "email": "kaffee.lover@outlook.de",
      "registeredAt": new Date("2023-07-08T18:15:13.762Z"),
      "passwordChangedAt": new Date("2023-07-08T18:15:13.762Z"),
      "birthdate": new Date("1996-04-12T00:00:00.000Z"),
      "__v": 0
    },
    {
      "_id": ObjectId("64a9a8c3ef66ffbcfb30580f"),
      "username": "TravelLisa",
      "passwordHash": "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08",
      "email": "lisa.reisen@gmail.com",
      "registeredAt": new Date("2023-07-08T18:19:47.836Z"),
      "passwordChangedAt": new Date("2023-07-08T18:19:47.836Z"),
      "birthdate": new Date("2001-06-02T00:00:00.000Z"),
      "__v": 0
    },
    {
      "_id": ObjectId("64a9ad93ef66ffbcfb3058b8"),
      "username": "Klaus",
      "passwordHash": "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08",
      "email": "klaus.uhr@gmx.de",
      "registeredAt": new Date("2023-07-08T18:40:19.811Z"),
      "passwordChangedAt": new Date("2023-07-08T18:40:19.811Z"),
      "birthdate": new Date("1987-10-10T00:00:00.000Z"),
      "__v": 0
    }
  ]
);

db.createCollection("reviews");
db.reviews.insertMany(
  [
    {
      "_id": ObjectId("64a432752bebaaffd47a912d"),
      "author": ObjectId("64a9ad93ef66ffbcfb3058b8"),
      "destination": "Erfurt",
      "text": "Echt gute Stadt!",
      "rating": 5,
      "__v": 0
    },
    {
      "_id": ObjectId("64a47cded4d9fa090e1bdc20"),
      "author": ObjectId("64a4763d673ab26b467486fb"),
      "destination": "New York",
      "text": "Absolut tolle Stadt!!",
      "rating": 5,
      "__v": 0
    },
    {
      "_id": ObjectId("64a47eb5d4d9fa090e1bdc36"),
      "author": ObjectId("64a4763d673ab26b467486fb"),
      "destination": "Erfurt",
      "text": "Nordstrand beste!",
      "rating": 5,
      "__v": 0
    },
    {
      "_id": ObjectId("64a47f0dd4d9fa090e1bdc46"),
      "author": ObjectId("64a4763d673ab26b467486fb"),
      "destination": "Sylt",
      "text": "Mit nächstem 9€-Ticket gerne wieder!",
      "rating": 3.5,
      "__v": 0
    },
    {
      "_id": ObjectId("64a4822cd4d9fa090e1bdc55"),
      "author": ObjectId("64a4763d673ab26b467486fb"),
      "destination": "Gera",
      "text": "Gotha war besser",
      "rating": 0.5,
      "__v": 0
    },
    {
      "_id": ObjectId("64a48a32d4d9fa090e1bdc66"),
      "author": ObjectId("64a4899ed4d9fa090e1bdc5e"),
      "destination": "Erfurt",
      "text": "Gute Hotels. Gute Atmosphäre",
      "rating": 4.5,
      "__v": 0
    },
    {
      "_id": ObjectId("64a48afdd4d9fa090e1bdc76"),
      "author": ObjectId("64a48adcd4d9fa090e1bdc6e"),
      "destination": "Erfurt",
      "text": "Schöne Altstadt!",
      "rating": 4,
      "__v": 0
    },
    {
      "_id": ObjectId("64a99746ef66ffbcfb3056a0"),
      "author": ObjectId("64a4763d673ab26b467486fb"),
      "destination": "Berlin",
      "text": "Für ein Wochenende mal ganz schön, aber danach auch wieder lieber nach Hause.",
      "rating": 2.5,
      "__v": 0
    },
    {
      "_id": ObjectId("64a9a270ef66ffbcfb3056fe"),
      "author": ObjectId("64a4763d673ab26b467486fb"),
      "destination": "Zürich",
      "text": "Wahnsinn wie sauber es hier ist! Gerne wieder!",
      "rating": 4.5,
      "__v": 0
    },
    {
      "_id": ObjectId("64a9a529ef66ffbcfb30572d"),
      "author": ObjectId("64a9a397ef66ffbcfb305710"),
      "destination": "New York",
      "text": "Viel zu wenig Tiere im Central Park gegen die man kämpfen kann! Hot Dogs sind aber lecker hier!",
      "rating": 1.5,
      "__v": 0
    },
    {
      "_id": ObjectId("64a9a5f1ef66ffbcfb305778"),
      "author": ObjectId("64a9a5c2ef66ffbcfb30576c"),
      "destination": "Tokio",
      "text": "Oh man, hätte nicht gedacht das hier so viele Menschen sind.",
      "rating": 2.5,
      "__v": 0
    },
    {
      "_id": ObjectId("64a9a689ef66ffbcfb3057be"),
      "author": ObjectId("64a9a66eef66ffbcfb3057b2"),
      "destination": "Magdeburg",
      "text": "Viel zu wenige Restaurants!",
      "rating": 1.5,
      "__v": 0
    },
    {
      "_id": ObjectId("64a9a7ebef66ffbcfb3057e5"),
      "author": ObjectId("64a9a7b1ef66ffbcfb3057d9"),
      "destination": "Wien",
      "text": "Ein Bekannter sagte mir, dass es hier sehr guten Kaffe gibt. Nach meinem Urlaub kann ich sagen: Er hatte vollkommen recht!",
      "rating": 5,
      "__v": 0
    },
    {
      "_id": ObjectId("64a9a8f2ef66ffbcfb30581c"),
      "author": ObjectId("64a9a8c3ef66ffbcfb30580f"),
      "destination": "Erfurt",
      "text": "Stadt ist wirklich immer einen Besuch wert! ",
      "rating": 4.5,
      "__v": 0
    },
    {
      "_id": ObjectId("64a9aca3ef66ffbcfb30589e"),
      "author": ObjectId("64a9a397ef66ffbcfb305710"),
      "destination": "Perth",
      "text": "Zwar sehr schöner Strand, aber viel zu viele gefährliche Schlangen und Spinnen!",
      "rating": 0.5,
      "__v": 0
    },
    {
      "_id": ObjectId("64a9af3aef66ffbcfb3058c4"),
      "author": ObjectId("64a9ad93ef66ffbcfb3058b8"),
      "destination": "Dubai",
      "text": "Sieht durch eigene Augen noch viel krasser aus als auf Social Media! Aber sehr teuer und warm.",
      "rating": 4,
      "__v": 0
    }
  ]
);