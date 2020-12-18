require('dotenv').config();
const mongoose = require('mongoose');
//const { default: createCloudinaryStorage } = require('multer-storage-cloudinary');
const Card = require('../models/Card.js');
const DB_NAME = 'proverbs-app';
mongoose.connect(process.env.MONGO_DB_URI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
}); 
const googleTTS = require('google-tts-api');

const cards = [
   {
    phrase: "Go for a lap around the big billiard" ,
    translation: "Vai dar uma volta ao bilhar grande",
    meaning: "Telling someone to stop annoying you and fuck off"
  },
  {
    phrase: "Not even if the cow coughs" ,
    translation: "Nem que a vaca tussa",
    meaning: "Same as : not in a million years"
  },
  {
    phrase: "That's like cleaning the ass of young boys" ,
    translation: "Isso é como limpar o cu a meninos",
    meaning: "Comparing something to a really easy task"
  },
  {
    phrase: "Here there's cat",
    translation: "Aqui há gato",
    meaning: "Meaning there's something not right in a situation/it's suspicious" 
  },
  {
    phrase: "Who talks like that isn't a stutterer" ,
    translation: "Quem fala assim não é gago",
    meaning: "Not afraid to say something/Knowing so much about a topic, that you can talk easily about it"
  },
  {
    phrase: "Elbow pain",
    translation: "Dor de cotovelo",
    meaning: "Describes when someone envies something"
  },
  {
    phrase: "God free me" ,
    translation: "Deus me livre",
    meaning: "Hope that something bad doesn't happen" 
  },
  {
    phrase: "Not fitting a bean in the ass" ,
    translation: "Não caber um feijão no cu",
    meaning: "Said to someone who is afraid/Said to someone who is arrogant"
  },
  {
    phrase: "Silent you would be a poet" ,
    translation: "Calado eras poeta",
    meaning: "Telling someone to shut up"
  },
  {
    phrase: "In the oldest dick" ,
    translation: "No caralho mais velho",
    meaning: "Somewhere far away"
  },
  {
    phrase: "Ill of hot ass" ,
    translation: "Doente do cu quente",
    meaning: "When you don't want to go somewhere, make up an excuse that you are sick and the other person finds out that you are lying and call you out on that"
  },
  {
    phrase: "Pussy of soap" ,
    translation: "Cona de sabão",
    meaning: "Someone who doesn't have a strong personality/ Someone who is weak"
  },
  {
    phrase:  "Eating ice-cream with your forehead",
    translation: "Comer gelados com a testa",
    meaning: "Used to call out someone who isn't paying attention to what they are saying or doing/ Also used to call someone dumb"
  },
  {
    phrase: "You are a boot licker",
    translation: "És um lambe botas",
    meaning: "Describes a suck up"
  },
  {
    phrase: "I broke myself laughing",
    translation: "Parti-me a rir",
    meaning: "When you laugh super hard"
  },
  {
    phrase: "More known than the lupin bean",
    translation: "Mais conhecido que o tremoço",
    meaning: "When something or someone is famous"
  },
  {
    phrase: "What a Zé Anthony",
    translation: "Que Zé António",
    meaning: "What you call someone when he says or does something stupid, dumb, or ridiculous"
  },
  {
    phrase: "Boss out, holiday in the store",
    translation: "Patrão fora, feriado na loja",
    meaning: "When tasks aren't monitored by the person in charge, leading to slack at work"
  },
  {
    phrase: "In times of war, any hole is a trench",
    translation: "Em tempo de guerra, qualquer buraco é trincheira",
    meaning: "In times of need, anything is useful"
  },
  {
    phrase: "Doing swimming pools",
    translation: "Fazer piscinas",
    meaning: "Doing repetitive routes"
  },
  {
    phrase: "Discussing the sex of angels",
    translation: "Discutir o sexo dos anjos",
    meaning: "Used when discussing a topic that is impossible to reach a conclusion/waste of time"
  },
  {
    phrase: "And if my grandma had whells, she would be a truck",
    translation: "E se a minha avó tivesse rodas, seria um camião",
    meaning: "Response to when a person talks hipothetically about a situation that could happen, but didn't"
  },
  {
    phrase: "Who doesn't have a dog, hunts with a cat",
    translation: "Quem não tem cão, caça com gato",
    meaning: "When you have to improvise using what you have to solve a problem"
  },
  {
    phrase: "Who doesn't cry, doesn't suckle",
    translation: "Quem não chora não mama",
    meaning: "Who doesn't ask or go after what they want, doesn't get it"
  },
  {
    phrase: "Seeing yourself greek",
    translation: "Ver-se grego",
    meaning: "Having dificulty in taking care of a problem or situation"
  },
  {
    phrase: "I make question",
    translation: "Faço questão",
    meaning: "Means that you are really want to do something" 
  },
  {
    phrase: "Luck monkey",
    translation: "Sorte macaca",
    meaning: "Means bad luck"
  },
  {
    phrase: "It's worth more a bird in your hand than two flying",
    translation: "Mais vale um pássaro na mão que dois a voar",
    meaning: "Expression to say that you should choose the certain over the uncertain, to the happy with what you have"
  },
  {
    phrase: "Are you with heartburn?",
    translation: "Estás com azia?",
    meaning: "When something you dislike happens and that pisses you off"
  },
  {
    phrase: "Apologies aren't to be asked, they are to be avoided",
    translation: "Desculpas não se pedem, evitam-se",
    meaning: "Something you say when someone makes a mistake that's very serious/ Also something said to kids for them to "
  },
  {
    phrase: "Go suck on the fifth leg of the horse",
    translation: "Vai mamar na quinta pata do cavalo",
    meaning: "Telling someone to fuck off, specially when they are being extra annoying"
  },
  {
    phrase: "The conversation hasn't reached the kitchen",
    translation: "A conversa ainda não chegou à cozinha",
    meaning: "When someone says something and you don't care about their opinion"
  },
  {
    phrase: "Things of the arch of the old lady",
    translation: "Coisas do arco da velha",
    meaning: "Used to qualify a story absurd or impossible to have happened"
  },
  {
    phrase: "Cod hand-job",
    translation: "Punheta de bacalhau",
    meaning: "Name of a typical portuguese dish, it's cod salad, made with cod, onion, garlic and oilve oil"
  },
  {
    phrase: "Lightning bolts breaking",
    translation: "Raios partam",
    meaning: "Same as goddamnit"
  },
  {
    phrase: "Getting the clothes to the fur",
    translation: "Chegar a roupa ao pêlo", 
    meaning: "When you kick someone's ass"
  },
  {
    phrase: "Piece of bad path",
    translation: "Pedaço de mau caminho", 
    meaning: "When someone is so hot that could lead you to bad decisions"
  },
  {
    phrase: "Who has mouth goes to rome",
    translation: "Quem tem boca vai a roma",
    meaning: "If you make the right questions you can go anywhere/achieve anything"
  },
  {
    phrase: "Travelling in the mayonnaise",
    translation: "Vaijar na maionese",
    meaning: "When someone does or says something that makes no sense/ when someone is distracted"
  },
  {
    phrase: "Going on shaky ass",
    translation: "Andar de cu tremido",
    meaning: "Going somewhere by car"
  },
  {
    phrase: "Never worse",
    translation: "Nunca pior",
    meaning: "When something can't be worse"
  },
  {
    phrase: "I'll go to your horns",
    translation: "Vou-te aos cornos",
    meaning: "WHen you threaten someone that you will kick their ass"
  },
  {
    phrase: "Having fabric for sleeves",
    translation: "Ter pano para mangas",
    meaning: "Used when there's a lot to talk about a certain topic"
  },
  {
    phrase: "Where the devil lost his boots",
    translation: "Onde o diabo perdeu as botas",
    meaning: "Somewhere far away"
  },
  {
    phrase: "You smell like milk",
    translation: "Cheiras a leite",
    meaning: "Refering to someone young, or when someone dares you to do something and you chicken out"
  },
  {
    phrase: "You are a delay of life",
    translation: "És um atraso de vida",
    meaning: "Someone who doesn't do anything productive"
  },
  {
    phrase: "Are you from Braga?",
    translation: "És de Braga?",
    meaning: "Question asked to someone who leaves the door open"
  },
  {
    phrase: "Giving the last ones",
    translation: "Dar as últimas",
    meaning: "When someone is really sick, or when something is almost broken"
  },
  {
    phrase: "Olive Oil Maker",
    translation: "Azeiteiro",
    meaning: "Someone trashy, ignorant, or a simple, but not in a good way"
  },
  {
    phrase: "Give shed",
    translation: "Dar barraca",
    meaning: "Not being discreet"
  },
  {
    phrase: "Having the king in the belly",
    translation: "Ter o rei na barriga",
    meaning: "When someone acts in an arrogant way, because they think they are more important then everyone else"
  },
  {
    phrase: "When you don't know how to fuck, even the testicles are in the way",
    translation: "Quando não se sabe foder, até os colhões atrapalham",
    meaning: "when people don't know how to do something and everything makes it harder"
  },
  {
    phrase: "Who knows, knows",
    translation: "Quem sabe, sabe",
    meaning: "Normally said by someone who knows what he's talking about"
  },
  {
    phrase: "You don't know the mass at half",
    translation: "Não sabes da missa a metade",
    meaning: "When you are unaware of the full scope of a situation"
  },
  {
    phrase: "Like big people",
    translation: "Como gente grande",
    meaning: "Doing something well, with ease"
  },
  {
    phrase: "Life stepmother", 
    translation: "vida madrasta",
    meaning: "Situations that bring sadness and misery"
  },
  {
    phrase: "The Hell is full of good intentions",
    translation: "De boas intenções está o inferno cheio",
    meaning: "Only having good intentions is not enough, you actually have to take action and make it better"
  },
  {
    phrase: "With the face of few friends",
    translation: "Com cara de poucos amigos",
    meaning: "When someone looks angry or annoyed"
  },
  {
    phrase: "You tire my beauty",
    translation: "Cansas-me a beleza",
    meaning: "When someone is annoying you, you imply that you are getting wrinkles from having to deal with them"
  },
  {
    phrase: "Son of 30 hookers",
    translation: "Filho de 30 putas",
    meaning: "Something that you call to someone that is an absolute dick"
  },
  {
    phrase: "Gild the pill",
    translation: "Dourar a pílula",
    meaning: "Say something in a way that makes it seem better that actually is"
  },
  {
    phrase: "Who goes to the sea loses the spot",
    translation: "Quem vai ao mar perde o lugar",
    meaning: "Normally when someone steals your seat, also used when you miss an opportunity"
  },
  {
    phrase: "Being with the olive oils",
    translation: "Estar com os azeites",
    meaning: "When you are in a bad mood, angry or annoyed"
  },
  {
    phrase: "Pooping a toast",
    translation: "Cagar uma tosta",
    meaning: "When you don't care about something or someone"
  },
  {
    phrase: "Who goes to war gives and takes",
    translation: "Quem vai à guerra dá e leva",
    meaning: "Normally used when you get into a fight, you hit and get hit, or in any situation between two people, where both sides get something good and bad"
  },
  {
    phrase: "It's the side towards I sleep the best",
    translation: "É para o lado que eu durmo melhor",
    meaning: "When something doesn't bother you"
  },
  {
    phrase: "Being in fleas",
    translation: "Estar em pulgas",
    meaning: "When you are really excited about something"
  },
  {
    phrase: "Doing everything at three hits",
    translation: "Fazer tudo às três pancadas",
    meaning: "When you do something without paying attention, normally ruining it"
  },
  {
    phrase: "Being in the shit",
    translation: "Estar na merda",
    meaning: "When everything goes wrong"
  },
  {
    phrase: "Throwing sand to the eyes",
    translation: "Atirar areia para os olhos",
    meaning: "When someone doesn't want to see the trth in front of them" 
  },
  {
    phrase: "You are stretching yourself",
    translation: "Estás-te a esticar",
    meaning: "When you are saying bullshit or doing something stupid, it's a warning for you to stop"
  },
  {
    phrase: "Falling the Carma and the Trinity",
    translation: "Cair o Carmo e a Trindade",
    meaning: "Situation of panic or catastrophe, imagine crash your mom's car, and having to tell her"
  },
  {
    phrase: "In Saint Pussy of the Whistle",
    translation: "Em Santa Cona do Assobio",
    meaning: "Somewhere far away"
  },
  {
    phrase: "God gives wallnuts to those without teeth",
    translation: "Deus dá nozes a quem não tem dentes",
    meaning: "Expression used when is given an opportunity to someone that can't or won't take advantage of it"
  },
  {
    phrase: "Hooker who gave birth",
    translation: "Puta que pariu",
    meaning: "Exclamation said when you are pissed with someone or somethig, also used to tell someone to go fuck themselves : go to the hoocker who birthed you"
  },
  {
    phrase: "Go fill yourself with flies",
    translation: "Vai'te encher de moscas",
    meaning: "Telling someone to fuck off"
  },
  {
    phrase: "Big and French-style",
    translation: "À grande e à francesa",
    meaning: "When you do something big, or have a lot of food at the table, or having a extravagant lifestyle"
  },
  {
    phrase: "Caught with the mouth in the heat bottle",
    translation: "Apanhado com a boca na botija",
    meaning: "Catching someone in the middle of the act, normally when they are up to no good"
  },
  {
    phrase: "If you weren't born you would have to be invented",
    translation: "Se não nascesses tinhas de ser inventado",
    meaning: "Normally said when someone does something weird of unexpected"
  },
  {
    phrase: "Growing at eyes seen",
    translation: "Crescer a olhos vistos",
    meaning: "When someone or something is growing up quickly"
  },
  {
    phrase: "Giving the scream",
    translation: "Dar o berro",
    meaning: "When someone faints or get sick, or when something stops working"
  },
  {
    phrase: "You're with me, you're with God",
    translation: "Estás comigo estás com Deus",
    meaning: "Meaning that if you are with me you are safe and will have everything you need"
  },
  {
    phrase: "Made in an eight",
    translation: "Feito num oito",
    meaning: "Being sore, or after a bad night of sleep, also associated to spine problems"
  },
  {
    phrase: "In the time of the other lady",
    translation: "Do tempo da outra senhora",
    meaning: "Something old, from a past time"
  },
  {
    phrase: "Not worth the feather",
    translation: "Não vale a pena",
    meaning: "Not worth the effort"
  },
  {
    phrase: "Tasting like a duck",
    translation: "Saber a pato",
    meaning: "When something feels or tastes good, or when something is free"
  },
  {
    phrase: "Doesn't warm up neither cools down",
    translation: "Não aquece nem arrefece",
    meaning: "When choosing between two options and you are fine with both"
  },
  {
    phrase: "Are you a donkey or you make yourself one?",
    translation: "És burro ou fazes-te?",
    meaning: "Used when you are surprised by someone acting, or talking something stupid"
  },
  {
    phrase: "The snail already has a cough",
    translation: "O caracol já tem tosse",
    meaning: "When someone younger is acting like a grown up"
  },
  {
    phrase: "At fake faith",
    translation: "À falsa fé",
    meaning: "When someone does something sneakingly or disloyal"
  },
  {
    phrase: "You are a good fork",
    translation: "Tu és um bom garfo",
    meaning: "If you eat well, and like all types off food, or not being picky"
  },
  {
    phrase: "Doing a little cow",
    translation: "Fazer uma vaquinha",
    meaning: "Putting money together with friends to buy something"
  },
  {
    phrase: "It's not my beach",
    translation: "Não é a minha praia",
    meaning: "Meaning that something is out of your confort zone"
  },
  {
    phrase: "Pepper on other peoples ass is like a refreshement to me",
    translation: "Pimenta no cu dos outros para mim é refresco",
    meaning: "Expression used when someone don't care with the suffer of others, but would be furious if the same thing happened to them"
  },
  {
    phrase: "At will is not at little will",
    translation: "À vontade não é à vontadinha",
    meaning: "Meaning that you are free to be comfortable to act as you please, but not abuse that freedom"
  },
  {
    phrase: "It's to make a saint lose its patience",
    translation: "És de fazer perder a paciência a um santo",
    meaning: "Being out of patience, completely fed up"
  },
  {
    phrase: "Having legs that reach the ass",
    translation: "Ter pernas até ao cu",
    meaning: "Having long legs"
  },
  {
    phrase: "Giving ball to someone",
    translation: "Dar baile a alguém",
    meaning: "Making fun or being better than someone"
  },
  {
    phrase: "I would rather fed a donkey on sponge cake",
    translation: "Mais vale alimentar um burro a pão de ló",
    meaning: "When someone eats a lot, usually used by your mom when you eat like a pig"
  },
  {
    phrase: "In blind's land who has eyes is a king",
    translation: "Em terra de cego, quem tem olho é rei",
    meaning: "Means that in the middle of ignorance, even the dumbest stand out"
  }/* ,
  {
    phrase: "The end of the world in panties",
    translation: "O fim do mundo em cuecas",
    meaning: "Related to a big confusion or a mess"
  },
  {
    phrase: "Crooked and straight",
    translation: "A torto e a direito",
    meaning: "Frequently and indiscriminately"
  },
  {
    phrase: "The dogs bark and the caravan goes by",
    translation: "Os cães ladram e a carava passa",
    meaning: "Means that you should ignore provocations"
  },
  {
    phrase: "Frying the popcorn",
    translation: "Fritar a pipoca",
    meaning: "Losing ypur mind"
  },
  {
    phrase: "You won't lose for the delay",
    translation: "Não perdes pela demora",
    meaning: "Normally related to revenge that is imminent"
  },
  {
    phrase: "You're going to see what is good for your cough",
    translation: "Vais ver o que é bom para a tosse",
    meaning: "Menacing someone, usually revenge over something, or used by moms before grounding you"
  },
  {
    phrase: "Who doesn't risk it, doesn't snack",
    translation: "Quem não arrisca, não petisca",
    meaning: "Meaning who doesn't try will never achieve what he desires"
  },
  {
    phrase: "Covering the sun with a strainer",
    translation: "Tapar o sol com a peneira",
    meaning: "When someone tries to hide or resolve a situation with half-measures"
  },
  {
    phrase: "With you it would be until we find oil!",
    translation: "Contigo era até encontrar petróleo",
    meaning: "Cat-calling phrase, descriving the amout of sex that you would have with someone if given the chance"
  },
  {
    phrase: "Not having legs to walk",
    translation: "Não ter pernas para andar",
    meaning: "Meaning that something doesn't have what it takes to succed"
  },
  {
    phrase: "Give leash",
    translation: "Dar trela",
    meaning: "Keep the conversation going, or keep showing interest in someone"
  },
  {
    phrase: "Give to the pens",
    translation: "Dar às canetas",
    meaning: "Walking quickly or running"
  },
  {
    phrase: "Give it by kissed hand",
    translation: "Dar de mão beijada",
    meaning: "Giving something wothout getting anything in return"
  },
  {
    phrase: "Looks of badly dead lamb",
    translation: "Ar de carneiro mal morto",
    meaning: "When someone looks annoyed or sick"
  },
  {
    phrase: "Walking with the house in the back",
    translation: "Andar com a casa às costas",
    meaning: "Someone who is carrying a lot of stuff on themselves"
  },
  {
    phrase: "April, one thousand waters",
    translation: "Abril, àguas mil", 
    meaning: "Proverb to common rainfall during that month"
  },
  {
    phrase: "Mother Joanna's house",
    translation: "Casa da mãe Joana",
    meaning: "Place where anything goes without rules"
  },
  {
    phrase: "When the king has is birthday",
    translation: "Quando o rei faz anos",
    meaning: "Referring to something that rarely happens"
  },
  {
    phrase: "Arming a thirty-one",
    translation: "Armar um trinta e um",
    meaning: "Make a big mess"
  },
  {
    phrase: "Put yourself in the hill",
    translation: "Põe-te a monte",
    meaning: "Telling someone to go away"
  },
  {
    phrase: "Passing by the embers",
    translation: "Passar pelas brasas",
    meaning: "Taking a nap"
  },
  {
    phrase: "Give to the sole",
    translation: "Dar à sola",
    meaning: "Walk fast, or avoiding a situation"
  },
  {
    phrase: "Putting the paw in the puddle",
    translation: "Meter a pata na poça",
    meaning: "Making a mistake"
  },
  {
    phrase: "Taking in the trunk",
    translation: "Levar na tromba",
    meaning: "Getting your ass kicked"
  },
  {
    phrase: "Head of wind",
    translation: "Cabeça de vento",
    meaning: "Distracted person"
  },
  {
    phrase: "From the three hundred store",
    translation: "Da loja dos trezentos",
    meaning: "Store that sells cheap, or low quality products"
  },
  {
    phrase: "For who likes shit it's a full plate",
    translation: "Para quem gosta de merda é um prato cheio",
    meaning: "Used whrn someone asks if something shitty is good"
  },
  {
    phrase: "Hitting the litle blind man",
    translation: "Bater no ceguinho",
    meaning: "Constantly talking about the same subject, nagging"
  },
  {
    phrase: "It doesn't matter even to baby Jesus",
    translation: "Não interessa nem ao menino Jesus",
    meaning: "When someone says something incredibly boring or useless"
  },
  {
    phrase: "Running to the thousands wonders",
    translation: "Correr às mil maravilhas",
    meaning: "When something went accordingly or better than expected"
  },
  {
    phrase: "Groping the terrain",
    translation: "Apalpar terreno",
    meaning: "Carefully assessing a situation"
  },
  {
    phrase: 'Walking to papers',
    translation:' Andar aos papéis',
    meaning: 'Not understanding something or being disoriented'
  },
  {
    phrase: 'Crazy swept',
    translation:'Doido varrido',
    meaning: 'Someone who is really insane'
  },
  {
    phrase: 'Raining on the wet',
    translation:'Chover no molhado',
    meaning: 'Doing or saying something irrelevant or repeating something too much'
  },
  {
    phrase: 'Like who doesn\'t want the thing',
    translation:'Como quem não quer a coisa',
    meaning: '1.Discretely / 2. Doing something while hiding second intentions'
  },
  {
    phrase: 'You are a half bowl',
    translation:'És um meia tigela',
    meaning: 'Calling someone a dork'
  },
  {
    phrase: 'With nervous little kid',
    translation:'Com nervoso miudinho',
    meaning: 'Light nervous sensation'
  },
  {
    phrase: 'Tie-fucks',
    translation:'Empata-fodas',
    meaning: 'Same as \'cockblocker\''
  },
  {
    phrase: 'Scratching the ass by the corners',
    translation:'Coçar o cu pelas esquinas',
    meaning: 'Not doing anything'
  },
  {
    phrase: 'Filling chorizos',
    translation:'Encher chouriços',
    meaning: 'Not doing anything productive'
  },
  {
    phrase: 'Give two fingers of conversation',
    translation:'Dar dois dedos de conversa',
    meaning: 'Briefly talking to someone'
  },
  {
    phrase: 'Calling Gregory',
    translation:'Chamar o Gregório',
    meaning: 'Puking'
  },
  {
    phrase: 'Giving a cod',
    translation:'Dar um bacalhau',
    meaning: 'Greeting someone - usually a handshake'
  },
  {
    phrase: 'Thinking a donkey died',
    translation:'A pensar morreu um burro',
    meaning: 'Said to someone who is very indecisive'
  },
  {
    phrase: 'Still hasn\'t fell the token',
    translation:'Ainda não caiu a ficha',
    meaning: 'When someone hasn\'t understood or accepted a situation'
  },
  {
    phrase: 'Give the master fart',
    translation:'Dar o peido mestre',
    meaning: 'Dying'
  },
  {
    phrase: 'Laying rockets before the party',
    translation:'Deitar foguetes antes da festa',
    meaning: 'Celebrating something to soon'
  },
  {
    phrase: 'What doesn\'t kill you makes you fat',
    translation:'O que não mata engorda',
    meaning: 'Used when someone is worried about something they are eating (if food falls on the floor for example)'
  },
  {
    phrase: 'Waking up with the feet outside the bed',
    translation:'Acordar com os pés fora da cama',
    meaning: 'Waking up in a bad mood'
  },
  {
    phrase: 'To give with a stick',
    translation:'A dar com um pau',
    meaning: 'In abundance'
  },
  {
    phrase: 'Beating up the clown',
    translation:'Espancar o palhaço',
    meaning: 'Masturbating'
  },
  {
    phrase: 'Doing figure of bear',
    translation:'Fazer figura de urso',
    meaning: 'Looking like an idiot'
  },
  {
    phrase: 'It\'s her for her',
    translation:'É ela por ela',
    meaning: 'Meaning it\'s the same or very close to being the same (used when making price comparisons for example)'
  },
  {
    phrase: 'You are here you are eating',
    translation:'Tás aqui tás a comer',
    meaning: 'Menacing to kick your ass'
  },
  {
    phrase: 'Go give bath to the dog',
    translation:'Vai dar banho ao cão',
    meaning: 'Telling someone to fuck off'
  },
  {
    phrase: 'For whore, whore and a half',
    translation:'Para puta, puta e meia',
    meaning: '1. Meaning "If I am something you are even worse" 2. When someone does something mean to you, so you get them back extra hard'
  },
  {
    phrase: 'Allowance of the family',
    translation:'Abono de família',
    meaning: 'Male genitalia'
  },
  {
    phrase: 'Giving pearls to pigs',
    translation:'Dar pérolas a porcos',
    meaning: 'Giving something valuable to someone who doesn\'t appreciate it, understand it or deserve it'
  },
  {
    phrase: 'Being all blind',
    translation:'Estar todo cego',
    meaning: '1.Being drunk 2.Being high 3.Used after saying something stupid and realizing it'
  },
  {
    phrase: 'I\'m already with a hooker',
    translation:'Já estou com uma puta',
    meaning: 'Being already drunk'
  },
  {
    phrase: 'Having bugs wood workers',
    translation:'Ter bichos carpinteiros',
    meaning: 'Someone who can\'t sit still'
  },
  {
    phrase: 'Time of the fat cows',
    translation:'Tempo das vacas gordas',
    meaning: 'Refering to a time where someone/something was wealthier and/or more prosper.'
  },
  {
    phrase: 'Fat like a goatling',
    translation:'Gordo como um chibo',
    meaning: 'When someone is really fat'
  },
  {
    phrase: 'Too much sand for your truck',
    translation:'Demasiada areia para a tua camioneta',
    meaning: '1. When someone is too good for you 2. When something is too much for you to handle.'
  },
  {
    phrase: 'Not here, neither in China',
    translation:'Nem aqui, nem na China',
    meaning: 'Refering to something that isn\'t gonna happen'
  },
  {
    phrase: 'You are a turnip',
    translation:'És um nabo',
    meaning: 'Calling someone a dork'
  },
  {
    phrase: 'Grain to grain fills the chicken the belly',
    translation:'Grão a grão enche a galinha o papo',
    meaning: 'Meaning that even if slowly but patiently, you can achieve a goal if you keep working on it'
  },
  {
    phrase: 'Calm down the popcorn',
    translation:'Acalma a pipoca',
    meaning: 'Telling someone to chill'
  },
  {
    phrase: 'Taking the little horse out of the raing',
    translation:'Tirar o cavalinho da chuva',
    meaning: 'Telling someone to get rid of expectations'
  },
  {
    phrase: 'What a medicine',
    translation:'Que remédio',
    meaning: 'Said when were isn\'t another favorable option'
  },
  {
    phrase: 'Holding on to the pens',
    translation:'Aguentar-se nas canetas',
    meaning: 'Person that because of a disease or fatigue has difficulty standing up'
  },
  {
    phrase: 'You are a bread without salt',
    translation:'És um pão sem sal',
    meaning: 'Someone who is not very interesting/bland'
  },
  
  {
    phrase: 'Who complains it\'s who drops the plum',
    translation:'Quem se queixa é quem larga a ameixa',
    meaning: 'Said after someone says he smells a fart'
  },
  {
    phrase: 'Crazy swept',
    translation:'Doido varrido',
    meaning: 'Someone who is really insane'
  },
  {
    phrase: 'Giving thong',
    translation:'Dar tanga',
    meaning: '1. Making fun of someone 2. When you make up stories'
  },
  {
    phrase: 'All to the sauce and faith in God',
    translation:'Tudo ao molho e fé em Deus',
    meaning: '1. Used when a big group gets together in a big confusion'
  },
  {
    phrase: 'That\'s gonna give shit',
    translation:'Isso vai dar merda',
    meaning: 'Expressing a feeling that something will end badly'
  },
  {
    phrase: 'Turn the disc and play the same',
    translation:'Vira o disco e toca o mesmo',
    meaning: 'Same as "You sound like a broken record"'
  },
  {
    phrase: 'Put the dots in the i\'s',
    translation:'Pôr os pontos nos is',
    meaning: 'Making something super clear'
  },
  {
    phrase: 'Who pooped you?',
    translation:'Quem te cagou?',
    meaning: 'Asked to someone who said/did something weird, stupid or dumb'
  },
  {
    phrase: 'Scratching the tomatoes',
    translation:'Coçar os tomates',
    meaning: '1. Scratching your balls 2. When someone isn\'t doing anything productive'
  },
  {
    phrase: 'Being with the rocket in the ass',
    translation:'Estar com um foguete no cu',
    meaning: '1. When someone is in a hurry, specially used when they are walking really fast'
  },
  {
    phrase: 'Donkey like a door',
    translation:'Burro como uma porta',
    meaning: 'Someone who is really dumb'
  },
  {
    phrase: 'Costing a cask of pasta',
    translation:'Custar uma pipa de massa',
    meaning: 'Being really expensive'
  },
  {
    phrase: 'Scrabble the mussel',
    translation:'Escarafunchar o mexilhão',
    meaning: 'Female oral sex'
  },
  {
    phrase: 'You have a lot of throat',
    translation:'Tens muita garganta',
    meaning: 'Used to tell someone they talk a lot but don\'t do anything about what they are saying'
  },
  {
    phrase: 'That is your face',
    translation:'Isso é a tua cara',
    meaning: 'Meaning that something really suits you'
  },
  {
    phrase: 'Who is alive always appears',
    translation:'Quem é vivo sempre aparece',
    meaning: 'Used to say to someone who hasn\'t been around recently'
  },
  {
    phrase: 'You don\'t give one to the box',
    translation:'Não dás uma para a caixa',
    meaning: 'Meaning someone doesn\'t do anything right'
  },
  {
    phrase: 'You are a bread',
    translation:'És um pão',
    meaning: 'Telling a guy he\'s hot'
  },
  {
    phrase: 'In the day of Saint Never in the Afternoon',
    translation:'No dia do São Nunca à Tarde',
    meaning: 'Referring to a day that doesn\'t exist, normally related to a situation that will never happen'
  },
  {
    phrase: 'Go see if it\'s raining',
    translation:'Vai ver se tá a chover',
    meaning: 'Telling someone to fuck off'
  },
  {
    phrase: 'What does the ass have to do with the pants?',
    translation:'O que é que o cu tem a ver com as calças?',
    meaning: 'Asked when someone says two things that have nothing to do with each other'
  },
  {
    phrase: 'Having the broth spilled',
    translation:'Ter o caldo entornado',
    meaning: 'Meaning that something now is ruined'
  },
  {
    phrase: 'Breaking the coconut laughing',
    translation:'Partir o coco a rir',
    meaning: 'Describes something really funny'
  }, 
  {
    phrase: 'I never saw him fatter',
    translation:'Nunca o vi mais gordo',
    meaning: 'Way to see you never saw that person in your life'
  },
  {
    phrase: 'Hulls of stopper',
    translation:'Cascos de rolha',
    meaning: 'Somewhere far away'
  },
  {
    phrase: 'Exchanging in kids',
    translation:'Trocar em miúdos',
    meaning: '1. Carefully detailing something 2.Explaining in an easier way'
  },
  {
    phrase: 'Bad Bad Mary',
    translation:'Mau Mau maria',
    meaning: 'When you are start thinking that what someone\'s doing or saying is a bad/wrong idea'
  },
  {
    phrase: 'I pooped and walked',
    translation:'Caguei e andei',
    meaning: 'When you are over a situation'
  },
  {
    phrase: 'I don\'t do kid',
    translation:'Não faço puto',
    meaning: 'Not doing anything'
  },
  {
    phrase: 'You are here you are taking',
    translation:'Tás aqui tás apanhar',
    meaning: 'Warning someone that they are going to get hit if they don\'t stop doing something'
  },
  {
    phrase: 'Swalloing frogs',
    translation:'Engolir sapos',
    meaning: 'To not say something that might upset someone and keep it to yourself instead, even if you get frustrated from it'
  },
  {
    phrase: 'Walking stepping on eggs',
    translation:'Andar a pisar ovos',
    meaning: '1. Walking very slowly 2. Also used when someone drives very slowly'
  },
  {
    phrase: 'Lick my rapini',
    translation:'Lambe-me o grelo',
    meaning: 'Female oral sex'
  },
  {
    phrase: 'Having more eyes than belly',
    translation:'Ter mais olhos que barriga',
    meaning: 'Describes people who want more than they can handle (normally related to food)'
  },
  {
    phrase: 'Raining pots',
    translation:'Chover a potes',
    meaning: 'When it rains a lot'
  },
  {
    phrase: 'Not doing an ass',
    translation:'Não fazer um cu',
    meaning: 'Not doing anything'
  },
  {
    phrase: 'Rain wets fools',
    translation:'Chuva molha tolos',
    meaning: 'Rain that isn\'t very noticeable but ends up leaving you soaked'
  },
  {
    phrase: 'Storm in a glass of water',
    translation:'Tempestade num copo de água',
    meaning: 'Overreaction to situations'
  },
  {
    phrase: 'Drowning the goose',
    translation:'Afogar o ganso',
    meaning: 'Having sex'
  },
  {
    phrase: 'Not hitting well of the ball',
    translation:'Não bater bem da bola',
    meaning: 'Someone who is mentally unstable'
  },
  {
    phrase: 'It\'s feather',
    translation:'É pena',
    meaning: 'Same as "It\'s a pity"'
  },
  {
    phrase: 'Go to the hooker who gave you birth',
    translation:'Vai para a puta que te pariu',
    meaning: 'Telling someone to fuck off'
  },
  {
    phrase: 'Hitting bad of the horns',
    translation:'Bater mal dos cornos',
    meaning: 'Someone who is crazy'
  },
  {
    phrase: 'Trust the virgin and don\'t run',
    translation:'Fia-te na virgem e não corras',
    meaning: 'Meaning that if you don\'t put hard work into something there\'s no divine spirits that will do it for you.'
  },
  {
    phrase: 'Lead foot',
    translation:'Pé de chumbo',
    meaning: 'Normally describing someone who sucks at dancing'
  },
  {
    phrase: 'Put yourself to the stick',
    translation:'Põe-te a pau',
    meaning: 'Staying alert towards something'
  },
  {
    phrase: 'Having a screw less',
    translation:'Ter um parafuso a menos',
    meaning: 'Not being mentally stable'
  },
  {
    phrase: 'Putting the ass between the legs',
    translation:'Meter o rabo entre as pernas',
    meaning: 'Not being able to face and/or being afraid of something/someone'
  },
  {
    phrase: 'Releasing the chicken',
    translation:'Soltar a franga',
    meaning: 'When you are really excited and going all-out (normally for a party)'
  },
  {
    phrase: 'I have you with a powder',
    translation:'Estou-te com um pó',
    meaning: 'When you are mad at someone'
  },
  {
    phrase: 'Being made to the steak',
    translation:'Estar feito ao bife',
    meaning: 'Being in a difficult situation'
  },
  {
    phrase: 'From small you twist the cucumber',
    translation:'De pequenino se torce o pepino',
    meaning: 'You start defining your personality from when you are young'
  },
  {
    phrase: 'More than moms',
    translation:'Mais que as mães',
    meaning: 'Describes a big group of people'
  },
  {
    phrase: 'Not having where to fall dead',
    translation:'Não ter onde cair morto',
    meaning: 'Insult towards someone who doesn\'t own a lot of material things and/or money'
  },
  {
    phrase: 'Throwing fish fillets',
    translation:'Mandar postas de pescada',
    meaning: 'Giving your opinion about something you don\'t really know much about'
  },
  {
    phrase: 'I\'m pooping myself',
    translation:'Estou-me a cagar',
    meaning: 'When you don\'t care about something'
  },
  {
    phrase: 'Unshit yourself',
    translation:'Desemerda-te',
    meaning: 'Used to tell someone to figure out how to get out of a situation by themsleves'
  },
  {
    phrase: 'Looping the peach tree',
    translation:'Esgalhar o pessegueiro',
    meaning: 'Masturbating'
  },
  {
    phrase: 'Staying in cod waters',
    translation:'Ficar em águas de bacalhau',
    meaning: 'Usually shows frustration, when something didn\'t happen as expected.'
  },
  {
    phrase: 'Pissing while laughing',
    translation:'Mijar a rir',
    meaning: 'Laughing so hard you could pee your pants'
  },
  {
    phrase: 'Eating and shutting up',
    translation:'Comer e calar',
    meaning: 'Listening to something you don\'t like or agree but not saying anything about it'
  },
  {
    phrase: 'It\'s chicken soup',
    translation:'É canja',
    meaning: 'Something that is easy'
  },
  {
    phrase: 'Arness the rock',
    translation:'Arrear o calhau',
    meaning: 'Pooping'
  },
  {
    phrase: 'Going like Canned Sardines',
    translation:'Ir como sardinhas enlatadas',
    meaning: 'when a place/transport is extremely full'
  },
  {
    phrase: 'Idea without feet or a head',
    translation:'Ideia sem pés nem cabeça',
    meaning: 'Ilogical or senseless idea'
  },
  {
    phrase: 'Having a stick face',
    translation:'Estar com cara de pau',
    meaning: 'Someone who looks very serious'
  },
  {
    phrase: 'Going around like a dizzy cockroach',
    translation:'Andar feito barata tonta',
    meaning: 'Someone that is very distracted/aloof'
  },
  {
    phrase: 'You were born with your ass facing the moon',
    translation:'Nasceste com o rabo virado para a lua',
    meaning: 'Someone who is very lucky in life even if they are desorganized and lazy'
  },
  {
    phrase: 'Monster of seven heads',
    translation:'Bicho de sete cabeças',
    meaning: 'Describes something that is really hard or complicated'
  },
  {
    phrase: 'It\'s not a big shotgun',
    translation:'Não é grande espingarda',
    meaning: 'Describes something that\'s not that great'
  },
  {
    phrase: 'In the ass of Judas',
    translation:'No cu de Judas',
    meaning: 'Somewhere very far away'
  },
  {
    phrase: 'Doing the candle',
    translation:'Fazer de vela',
    meaning: 'Describes "third-wheeling", being alone with a couple'
  },
  {
    phrase: 'Bread Bread Cheese Cheese',
    translation:'Pão Pão Queijo Queijo',
    meaning: 'Used to introduce a frank or direct statement'
  },
  {
    phrase: 'Having can',
    translation:'Ter lata',
    meaning: '1. Someone who is not afraid/ashamed to do or say something 2. Someone confident'
  },
  {
    phrase: 'Rotten Face',
    translation:'Cara podre',
    meaning: 'Someonw who is not afraid/ashamed to do or say something'
  },
  {
    phrase: 'Go with the pigs',
    translation:'Ir com os porcos',
    meaning: 'Another way to say someone passed away'
  },
  {
    phrase: 'Go comb monkeys',
    translation:'Vai pentear macacos',
    meaning: 'When your patience has reached its limits'
  },
  {
    phrase: 'Did the hoodie fit you?',
    translation:'Serviu-te a carapuça?',
    meaning: 'Ironic question asked to someone when a story is told and they commited that same mistake'
  },
  {
    phrase: 'Give your arm to twist',
    translation:'Dar o braço a torcer',
    meaning: 'When you accept an option or outcome that initially wasn\'t your choice'
  },
  {
    phrase: 'Hitting your boots',
    translation:'Bater as botas',
    meaning: 'Means dying'
  },
  {
    phrase: 'I must have a clown face',
    translation:'Devo ter cara de palhaço',
    meaning: 'What you say when someone tries to/makes fun of you'
  },
  {
    phrase: 'Boil in a little water',
    translation:'Ferver em pouca água',
    meaning: 'When someone easily gets annoyed and/or irritated'
  },
  {
    phrase: 'Greenhouse flower',
    translation:'Florzinha de estufa',
    meaning: 'Someone who is extremely sensitive and gets triggered with the smallest things'
  },
  {
    phrase: 'Treating someone with hot blankets',
    translation:'Tratar alguém com paninhos quentes',
    meaning: 'Treating someone in a condescent way because they are unable to handle a situation'
  },
  {
    phrase: 'A lot of years turning chickens',
    translation:'Muitos anos a virar frangos',
    meaning: 'When you do something for a long time and know what you are talking about'
  }, 
  {
    phrase: "Where Judas lost his boots",
    translation:"Onde o Judas perdeu as botas",
    meaning: "A place that is far away"
  }, 
  {
    phrase: "Giving pearls to pigs",
    translation:"Dar pérolas a porcos",
    meaning: "Giving something to someone ungratfull"
  }, 
  {
    phrase: "Caught with the jeans in the hand",
    translation:"Apanhado com as calças na mão",
    meaning: "Getting caught doing something wrong"
  }, 
  {
    phrase: "Whores and green wine",
    translation:"Putas e vinho verde",
    meaning: "Living the life"
  }  */
];


cards.forEach((card) => {
  let phraseAudioEng="";
  let translationAudioPt="";
  let meaningAudioEng="";
  phraseAudioEng = googleTTS.getAudioUrl(`${card.phrase}`, {
    lang:'en',
    slow: false,
    host: 'https://translate.google.com'
  });
  translationAudioPt = googleTTS.getAudioUrl(`${card.translation}`, {
    lang: 'pt',
    slow: false,
    host: 'https://translate.google.com'
  });
  meaningAudioEng = googleTTS.getAudioUrl(`${card.meaning}`, {
    lang: 'en',
    slow: false,
    host: 'https://translate.google.com'
  });
  return Card.create({
    phrase: card.phrase,
    translation: card.translation,
    meaning: card.meaning,
    phraseAudioEng,
    translationAudioPt,
    meaningAudioEng
  }).then((cardFromDb) => {
    console.log(`Created ${cardFromDb.phrase} proverbs`)
  }).catch((err) => {
    console.log(`An error occurred ${err}`)
  })
}) 
