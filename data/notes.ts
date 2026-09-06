export interface PhotoItem {
  id: number;
  src: string;
  alt: string;
}

export interface ScrapbookData {
  title: string;
  titleImage: string;
  paragraphs: string[];
  photos: PhotoItem[];
}

export const scrapbookData: ScrapbookData = {
  title: 'TrueShe ka janmdin',
  titleImage: '/pictures/title_image.png',
  paragraphs: [
    `Hello Sushi! 🙌🏻\nHow are you\n\nHappy birthdayyy!!\nI thought to write for the signature day but i felt lazy and didn't. chalo birthday hai na... signature day bi isi mai hojayega..`,

    `so... I want to tell you about a girl I saw on the first day of college. It was 27th oct 2022 at around 12 o'clock. I went to college for the first time to submit the documents and then saw her roaming around so tense. she asked the faculty about sliding to another branch. Good thing the sir did not say it correctly. Otherwise I would've missed a really good friend. 🙂`,

    `It was the 1st year... I noticed her posting random stories about her work. I was curious to know what she was doing.. I used to ask her about it and one day she asked a normal question.. something like.. its already 11 wont you sleep... and from there the convos changed from professional to pura casual in no time. That's when I discovered the silly side of her.`,

    `We started talking a lot, roasting each other, arguments, fun and jokes.. and most of our convos were about complaining about the college, subjects and the faculty but not studying... and slowly she became a very good friend..`,

    `we made good memories 1st year mai like jab mid exams start hue we have stayed in clg to study but did everything other than studying played skribble, constructed cards house... and when me and praneeth decided to go to her home when she texted me that shes bored.. and that time when insta mai notes feature aaya she, me and khaleel used to talk in that, making pizza on photos, and pata hei ek baar she tried to steal my calci cuz i did doodling on it 😒 and snap mai random scribbles send kiya tho she would make it into a nice drawing 🙂 and the time we spent in the NASA hackathon, and moreee. 1st year boohothh bhadiya tha.. ohh also, she is a singer 😂 I like her zara zara song.`,

    `then came the 2nd year...\nwe spent a really good time in CU and only a month after returning things have gone so worse...🥲 however she's the one who first asked me my opinion and my pov for what happened..\n\n2nd year tho bas esi hogayi without anything special.. bas wo sinti yaad hai jismai u lost ur earring 🙂 and grp mai disturbance and silence is the only thing im remembering 💀\n\naree haa wo cubes wala thing with photos after returning from CU... kitna masth chees banayi usne!! ithna time and efforts studies mai lagayi tho us sem mai acha gpa aati`,

    `But the 3rd year was good! after all the nonsense in 2nd year, we all again started talking from 3rd year. we went out for prasads, warangal, wonderla, khaleja movie, celebrated birthdays, farewell ke time pe dance.. and got back the 'rizzlers' feel.. ek baar she scolded me whole day cuz we went to play cricket without informing her 💀 and dont know how many times we complained about travelling so far and staying in hostel (ofc, not to reduce travelling but to increase masthi 😂) and many times my ears commited suicide by listening her songs. and playing skribble in Gmeet and talking in that ten ten app, and afternoons mai carroms.. aur har exam ke time pe we would discuss wt to study how much done and all... and har baar bunk maarke attendance keliye puchthi thi... shameless 🙂 esa bohoth sare choto choto memories we had...\n\n`,

    `Anddd aaya 4th year. pura b tech mai worst year. starting acha hi tha. saath mai phadthe the, wo smart interviews time, placement ka preparation, and us din jab shruti ke ghar gaye the while playing damb charades game first time i saw her laughing so much. muje pata nai tha ki wo ithna hasthi bi hai 😂\n\nand wo char minar jaana, aadhe se zyada classes bunk maarna and asking 'coming tom?' everyday, bowling ko jaana, OE exam mai u not helping me.. sabh bhadiya tha`,

    `fir hogaya life serious! 'major project' socha nai wo word muje trauma dhega 🥲 and that embedded lab! 😭 I hated that place!.. and all stupid things i did.. har step pe ek mistake, har chees ka explanation\nthe less i talk about the better it is 🫠\n\n aur 4-2 mai wo thi bi nai.. internship ko gayi 🙃. anyways, at last everything ended... and it's just a part of the story now..`,

    `Aur bi hai but i can't think of everything as of now... every little memory feels really good.. pata nai kese 4 saal ithna jaldi beeth gaye.. 🥲\n\nanyways, it was a great time, and i just wish she achieve everything she wants in life..\n\nache ideas tho hai uski dimag mai.. but kya kare.. sir tho reply nai dhete 😐\n\n`,

    `Aur tu dhek... how use less u are. kitna mood swings, har cheese pe ladai karti hai, kitna nonsense baathe karti hai, kuch bi sidha nai bolti, sometimes i feel like tu ladki hi nahi hai 🚶‍♂️, and teek se text karna bi nai aathi.. 10 words mai 9 words spelling mistakes honge 💀 5 min - 10 min bolke 2 hrs mai aayegi 🙄\n aur tu Schneider ka party bi nai di, ab birthday ka bi nahi. learn something from her. 👺\n\n aree haa! tera cake cutting kabi nai kiya naa.. ye lo, ye cake kaatke kaalo\n 👉🎂🎉`
  ],
  photos: [
    { id: 1, src: '/pictures/photo_1.png', alt: 'Memory photo 1' },
    { id: 2, src: '/pictures/photo_2.png', alt: 'Memory photo 2' },
    { id: 3, src: '/pictures/photo_3.png', alt: 'Memory photo 3' },
    { id: 4, src: '/pictures/photo_4.png', alt: 'Memory photo 4' },
    { id: 5, src: '/pictures/photo_5.png', alt: 'Memory photo 5' },
    { id: 6, src: '/pictures/photo_6.png', alt: 'Memory photo 6' },
    { id: 7, src: '/pictures/photo_7.png', alt: 'Memory photo 7' },
    { id: 8, src: '/pictures/photo_8.png', alt: 'Memory photo 8' },
    { id: 9, src: '/pictures/photo_9.png', alt: 'Memory photo 9' },
    { id: 10, src: '/pictures/photo_10.png', alt: 'Memory photo 10' },
    { id: 11, src: '/pictures/photo_11.png', alt: 'Memory photo 11' },
    { id: 12, src: '/pictures/photo_12.png', alt: 'Memory photo 12' },
    { id: 13, src: '/pictures/photo_13.png', alt: 'Memory photo 13' },
    { id: 14, src: '/pictures/photo_14.png', alt: 'Memory photo 14' },
    { id: 15, src: '/pictures/photo_15.png', alt: 'Memory photo 15' },
    { id: 16, src: '/pictures/photo_16.png', alt: 'Memory photo 16' },
    { id: 17, src: '/pictures/photo_17.png', alt: 'Memory photo 17' },
    { id: 18, src: '/pictures/photo_18.png', alt: 'Memory photo 18' },
    { id: 19, src: '/pictures/photo_19.png', alt: 'Memory photo 19' },
    { id: 20, src: '/pictures/photo_20.png', alt: 'Memory photo 20' },
    { id: 21, src: '/pictures/photo_21.png', alt: 'Memory photo 21' },
  ]
};
