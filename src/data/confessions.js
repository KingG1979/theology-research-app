export const ALL_TRADITIONS = ["Reformed", "Lutheran", "Catholic", "Baptist", "Ecumenical", "Orthodox", "Anglican"];

export const COLORS = {
  Reformed:   { bg: "#e8f0e8", border: "#5a8a5a", text: "#2a5a2a", header: "#5a8a5a" },
  Lutheran:   { bg: "#e8eaf5", border: "#5a6aaa", text: "#2a3a7a", header: "#5a6aaa" },
  Catholic:   { bg: "#f5e8e8", border: "#aa5a5a", text: "#7a2a2a", header: "#aa5a5a" },
  Baptist:    { bg: "#f5f0e8", border: "#aa8a5a", text: "#7a5a2a", header: "#aa8a5a" },
  Ecumenical: { bg: "#f0e8f5", border: "#8a5aaa", text: "#5a2a7a", header: "#8a5aaa" },
  Orthodox:   { bg: "#fdf5e0", border: "#b8962e", text: "#7a5a00", header: "#b8962e" },
  Anglican:   { bg: "#e8f0f5", border: "#4a7a9b", text: "#1a4a6b", header: "#4a7a9b" },
  // Church Fathers era colors
  Patristic:  { bg: "#faf5ed", border: "#b08c4a", text: "#5a4020", header: "#8a6a2a" },
};

// Theme colors used throughout the app
export const THEME = {
  gold: "#c9a84c",
  dark: "#2c2416",
  cream: "#faf8f4",
  border: "#d4c4a0",
  mid: "#8a7a5a",
  light: "#f5f0e8",
};

// Era badge colors for Church Fathers
export const ERA_COLORS = {
  "Ante-Nicene": { bg: "#e8ede4", text: "#4a5a3a", border: "#7a8a5a" },
  "Nicene":      { bg: "#fdf5e0", text: "#7a5a00", border: "#b8962e" },
  "Post-Nicene": { bg: "#f0e4e8", text: "#6a3040", border: "#8a4a5a" },
};

export const CONFESSIONS = {
  "Westminster Confession of Faith": {
    tradition: "Reformed",
    year: "1647",
    chapters: [
      {
        number: 1,
        title: "Of the Holy Scripture",
        sections: [
          { number: 1, text: "Although the light of nature, and the works of creation and providence do so far manifest the goodness, wisdom, and power of God, as to leave men unexcusable; yet are they not sufficient to give that knowledge of God, and of his will, which is necessary unto salvation." },
          { number: 2, text: "Under the name of Holy Scripture, or the Word of God written, are now contained all the books of the Old and New Testament, which are these: [lists 66 books]. All which are given by inspiration of God to be the rule of faith and life." },
          { number: 4, text: "The authority of the Holy Scripture, for which it ought to be believed, and obeyed, dependeth not upon the testimony of any man, or Church; but wholly upon God (who is truth itself) the author thereof: and therefore it is to be received, because it is the Word of God." },
          { number: 6, text: "The whole counsel of God concerning all things necessary for his own glory, man's salvation, faith and life, is either expressly set down in Scripture, or by good and necessary consequence may be deduced from Scripture." },
        ]
      },
      {
        number: 2,
        title: "Of God, and of the Holy Trinity",
        sections: [
          { number: 1, text: "There is but one only, living, and true God, who is infinite in being and perfection, a most pure spirit, invisible, without body, parts, or passions; immutable, immense, eternal, incomprehensible, almighty, most holy, most free, most absolute." },
          { number: 3, text: "In the unity of the Godhead there be three persons, of one substance, power, and eternity: God the Father, God the Son, and God the Holy Ghost. The Father is of none, neither begotten, nor proceeding; the Son is eternally begotten of the Father; the Holy Ghost eternally proceeding from the Father and the Son." },
        ]
      },
      {
        number: 3,
        title: "Of God's Eternal Decree",
        sections: [
          { number: 1, text: "God, from all eternity, did, by the most wise and holy counsel of his own will, freely, and unchangeably ordain whatsoever comes to pass; yet so, as thereby neither is God the author of sin, nor is violence offered to the will of the creatures." },
          { number: 3, text: "By the decree of God, for the manifestation of his glory, some men and angels are predestinated unto everlasting life; and others foreordained to everlasting death." },
        ]
      },
      {
        number: 11,
        title: "Of Justification",
        sections: [
          { number: 1, text: "Those whom God effectually calleth, he also freely justifieth: not by infusing righteousness into them, but by pardoning their sins, and by accounting and accepting their persons as righteous; not for any thing wrought in them, or done by them, but for Christ's sake alone." },
          { number: 2, text: "Faith, thus receiving and resting on Christ and his righteousness, is the alone instrument of justification: yet is it not alone in the person justified, but is ever accompanied with all other saving graces, and is no dead faith, but worketh by love." },
        ]
      },
      {
        number: 28,
        title: "Of Baptism",
        sections: [
          { number: 1, text: "Baptism is a sacrament of the New Testament, ordained by Jesus Christ, not only for the solemn admission of the party baptized into the visible Church; but also, to be unto him a sign and seal of the covenant of grace, of his ingrafting into Christ, of regeneration, of remission of sins, and of his giving up unto God, through Jesus Christ, to walk in newness of life." },
          { number: 4, text: "Not only those that do actually profess faith in and obedience unto Christ, but also the infants of one, or both, believing parents, are to be baptized." },
        ]
      },
    ]
  },
  "Heidelberg Catechism": {
    tradition: "Reformed",
    year: "1563",
    chapters: [
      {
        number: 1,
        title: "Our Only Comfort (Q. 1-2)",
        sections: [
          { number: 1, text: "Q. 1: What is your only comfort in life and in death? A. That I am not my own, but belong body and soul, in life and in death, to my faithful Savior, Jesus Christ. He has fully paid for all my sins with his precious blood, and has set me free from the tyranny of the devil." },
          { number: 2, text: "Q. 2: What must you know to live and die in the joy of this comfort? A. Three things: first, how great my sin and misery are; second, how I am set free from all my sins and misery; third, how I am to thank God for such deliverance." },
        ]
      },
      {
        number: 2,
        title: "Sin and Misery (Q. 3-11)",
        sections: [
          { number: 3, text: "Q. 3: How do you come to know your misery? A. The law of God tells me." },
          { number: 5, text: "Q. 5: Can you live up to all this perfectly? A. No. I have a natural tendency to hate God and my neighbor." },
        ]
      },
      {
        number: 7,
        title: "The Lord's Supper (Q. 75-82)",
        sections: [
          { number: 75, text: "Q. 75: How does the Lord's Supper remind you and assure you that you share in Christ's one sacrifice on the cross and in all his gifts? A. In this way: Christ has commanded me and all believers to eat this broken bread and to drink this cup. With this command he gave this promise: first, as surely as I see with my eyes the bread of the Lord broken for me and the cup given to me, so surely his body was offered and sacrificed for me on the cross." },
          { number: 80, text: "Q. 80: How does the Lord's Supper differ from the Roman Catholic Mass? A. The Lord's Supper declares to us that our sins have been completely forgiven through the one sacrifice of Jesus Christ which he himself finished on the cross once and for all." },
        ]
      },
      {
        number: 9,
        title: "Baptism (Q. 69-74)",
        sections: [
          { number: 69, text: "Q. 69: How does baptism remind you and assure you that Christ's one sacrifice on the cross is for you personally? A. In this way: Christ instituted this outward washing and with it gave the promise that, as surely as water washes away the dirt from the body, so certainly his blood and his Spirit wash away my soul's impurity, in other words, all my sins." },
          { number: 74, text: "Q. 74: Should infants, too, be baptized? A. Yes. Infants as well as adults are in God's covenant and are his people. They, no less than adults, are promised the forgiveness of sin through Christ's blood and the Holy Spirit who produces faith." },
        ]
      },
    ]
  },
  "Augsburg Confession": {
    tradition: "Lutheran",
    year: "1530",
    chapters: [
      {
        number: 1, title: "Article I: Of God",
        sections: [
          { number: 1, text: "Our Churches, with common consent, do teach that the decree of the Council of Nicaea concerning the Unity of the Divine Essence and concerning the Three Persons, is true and to be believed without any doubting; that is to say, there is one Divine Essence which is called and which is God: eternal, without body, without parts, of infinite power, wisdom, and goodness, the Maker and Preserver of all things, visible and invisible." },
        ]
      },
      {
        number: 2, title: "Article II: Of Original Sin",
        sections: [
          { number: 1, text: "It is also taught among us that since the fall of Adam all men who are born according to the course of nature are conceived and born in sin. That is, all men are full of evil lust and inclinations from their mothers' wombs and are unable by nature to have true fear of God and true faith in God." },
        ]
      },
      {
        number: 4, title: "Article IV: Of Justification",
        sections: [
          { number: 1, text: "It is also taught among us that we cannot obtain forgiveness of sin and righteousness before God by our own merits, works, or satisfactions, but that we receive forgiveness of sin and become righteous before God by grace, for Christ's sake, through faith, when we believe that Christ suffered for us and that for his sake our sin is forgiven and righteousness and eternal life are given to us." },
        ]
      },
      {
        number: 9, title: "Article IX: Of Baptism",
        sections: [
          { number: 1, text: "Of Baptism they teach that it is necessary to salvation, and that through Baptism is offered the grace of God, and that children are to be baptized who, being offered to God through Baptism are received into God's grace." },
        ]
      },
      {
        number: 10, title: "Article X: Of the Lord's Supper",
        sections: [
          { number: 1, text: "Of the Supper of the Lord they teach that the Body and Blood of Christ are truly present, and are distributed to those who eat the Supper of the Lord; and they reject those that teach otherwise." },
        ]
      },
    ]
  },
  "1689 Baptist Confession": {
    tradition: "Baptist",
    year: "1689",
    chapters: [
      {
        number: 1, title: "Of the Holy Scriptures",
        sections: [
          { number: 1, text: "The Holy Scripture is the only sufficient, certain, and infallible rule of all saving knowledge, faith, and obedience. The Holy Scripture is not the product of the will of man, but holy men of God spoke as they were moved by the Holy Spirit." },
          { number: 5, text: "We may be moved and induced by the testimony of the church of God to an high and reverent esteem of the Holy Scriptures; and the heavenliness of the matter, the efficacy of the doctrine, and the majesty of the style... are arguments whereby it doth abundantly evidence itself to be the Word of God." },
        ]
      },
      {
        number: 11, title: "Of Justification",
        sections: [
          { number: 1, text: "Those whom God effectually calleth, he also freely justifieth, not by infusing righteousness into them, but by pardoning their sins, and by accounting and accepting their persons as righteous; not for any thing wrought in them, or done by them, but for Christ's sake alone." },
        ]
      },
      {
        number: 29, title: "Of Baptism",
        sections: [
          { number: 1, text: "Baptism is an ordinance of the New Testament, ordained by Jesus Christ, to be unto the party baptized, a sign of his fellowship with him, in his death and resurrection; of his being engrafted into him; of remission of sins; and of giving up into God, through Jesus Christ, to live and walk in newness of life." },
          { number: 2, text: "Those who do actually profess repentance towards God, faith in, and obedience to, our Lord Jesus Christ, are the only proper subjects of this ordinance." },
          { number: 3, text: "The outward element to be used in this ordinance is water, wherein the party is to be baptized, in the name of the Father, and of the Son, and of the Holy Spirit. The mode is immersion, or dipping of the person in water." },
        ]
      },
      {
        number: 30, title: "Of the Lord's Supper",
        sections: [
          { number: 1, text: "The supper of the Lord Jesus was instituted by him the same night wherein he was betrayed, to be observed in his churches, unto the end of the world, for the perpetual remembrance, and shewing forth the sacrifice of himself in his death." },
          { number: 7, text: "Worthy receivers, outwardly partaking of the visible elements in this ordinance, do then also inwardly by faith, really and indeed, yet not carnally and corporally, but spiritually receive, and feed upon Christ crucified, and all the benefits of his death." },
        ]
      },
    ]
  },
  "Nicene Creed": {
    tradition: "Ecumenical",
    year: "381 AD",
    chapters: [
      {
        number: 1, title: "The Creed",
        sections: [
          { number: 1, text: "We believe in one God, the Father almighty, maker of heaven and earth, of all things visible and invisible." },
          { number: 2, text: "And in one Lord Jesus Christ, the only Son of God, begotten from the Father before all ages, God from God, Light from Light, true God from true God, begotten, not made; of the same essence as the Father. Through him all things were made." },
          { number: 3, text: "For us and for our salvation he came down from heaven; he became incarnate by the Holy Spirit and the virgin Mary, and was made human. He was crucified for us under Pontius Pilate; he suffered and was buried. The third day he rose again, according to the Scriptures." },
          { number: 4, text: "And we believe in the Holy Spirit, the Lord, the giver of life. He proceeds from the Father and the Son, and with the Father and the Son is worshiped and glorified. He spoke through the prophets." },
          { number: 5, text: "We believe in one holy catholic and apostolic church. We affirm one baptism for the forgiveness of sins. We look forward to the resurrection of the dead, and to life in the world to come. Amen." },
        ]
      },
    ]
  },
  "Longer Catechism (Orthodox)": {
    tradition: "Orthodox",
    year: "1839",
    chapters: [
      {
        number: 1, title: "Of Faith",
        sections: [
          { number: 1, text: "Q. What is faith? A. According to the definition of the Apostle Paul, faith is the substance of things hoped for, the evidence of things not seen (Heb. xi. 1); that is, a trust in the unseen as though it were seen, in that which is hoped for and not yet present as if it were present." },
          { number: 2, text: "Q. What is Christian faith in particular? A. A trust in our Lord Jesus Christ as the only Savior of men, and in his atoning sacrifice for sins, as the means of our reconciliation with God." },
        ]
      },
      {
        number: 2, title: "Of the Sacraments",
        sections: [
          { number: 1, text: "Q. What is a Sacrament? A. A Sacrament is a holy act, through which grace, or the saving power of God, works mysteriously upon man." },
          { number: 2, text: "Q. How many Sacraments are there? A. Seven: Baptism, Confirmation or Chrismation, Communion, Penance, Holy Orders, Matrimony, and Unction." },
        ]
      },
      {
        number: 3, title: "Of Baptism",
        sections: [
          { number: 1, text: "Q. What is Baptism? A. Baptism is a Sacrament in which a man who believes, having his body thrice immersed in water in the name of God the Father, the Son, and the Holy Ghost, dies to the life of sinful flesh, and is born again of the Holy Ghost to a life spiritual and holy." },
          { number: 2, text: "Q. Is Baptism necessary for salvation? A. Yes, absolutely; for Jesus Christ says expressly, Except a man be born of water and of the Spirit, he cannot enter into the kingdom of God." },
        ]
      },
      {
        number: 4, title: "Of Theosis",
        sections: [
          { number: 1, text: "The aim of the Christian life is theosis: the union of the human person with God, participation in the divine nature. As Athanasius of Alexandria wrote, God became man so that man might become god - not by nature, but by grace, through participation in the divine energies." },
          { number: 2, text: "This deification is not a merging of essences but a real union with God through his uncreated energies, as distinguished from his essence. Through prayer, the sacraments, and the ascetic life, the believer is transformed into the likeness of Christ." },
        ]
      },
      {
        number: 5, title: "Of Prayer",
        sections: [
          { number: 1, text: "Q. What is prayer? A. Prayer is the lifting up of the mind and heart to God, which consists in pious meditation on God, and his works, and manifests itself in petition, thanksgiving, and praise of God." },
          { number: 2, text: "Q. What should we ask for in prayer? A. We should ask for those things which are pleasing to God, and profitable for our souls — for the forgiveness of sins, for salvation, for aid in all good works, and for the coming of his kingdom." },
        ]
      },
      {
        number: 6, title: "Of Scripture and Tradition",
        sections: [
          { number: 1, text: "Q. What is the rule of faith for Christians? A. Divine Revelation, as preserved in Holy Scripture and Holy Tradition, and rightly interpreted by the Holy Orthodox Church." },
          { number: 2, text: "Q. What is Holy Tradition? A. Holy Tradition is that which the Church of Christ believes and practices, handed down from the Apostles through the Fathers, preserved in the consciousness of the Church and expressed in its worship, canons, and teaching." },
        ]
      },
    ]
  },
  "39 Articles": {
    tradition: "Anglican",
    year: "1571",
    chapters: [
      {
        number: 1, title: "Articles I\u2013V: The Trinity and Christ",
        sections: [
          { number: 1, text: "Article I. Of Faith in the Holy Trinity. There is but one living and true God, everlasting, without body, parts, or passions; of infinite power, wisdom, and goodness; the Maker, and Preserver of all things both visible and invisible. And in unity of this Godhead there be three Persons, of one substance, power, and eternity; the Father, the Son, and the Holy Ghost." },
          { number: 2, text: "Article II. Of the Word or Son of God, which was made very Man. The Son, which is the Word of the Father, begotten from everlasting of the Father, the very and eternal God, and of one substance with the Father, took Man's nature in the womb of the blessed Virgin, of her substance: so that two whole and perfect Natures, that is to say, the Godhead and Manhood, were joined together in one Person, never to be divided." },
          { number: 3, text: "Article III. Of the going down of Christ into Hell. As Christ died for us, and was buried, so also is it to be believed, that he went down into Hell. For the body lay in the sepulchre until the resurrection; but his Ghost departing from him was with the Ghosts that were in prison or in hell, and did preach to the same." },
          { number: 4, text: "Article IV. Of the Resurrection of Christ. Christ did truly rise again from death, and took again his body, with flesh, bones, and all things appertaining to the perfection of Man's nature; wherewith he ascended into Heaven, and there sitteth, until he return to judge all Men at the last day." },
          { number: 5, text: "Article V. Of the Holy Ghost. The Holy Ghost, proceeding from the Father and the Son, is of one substance, majesty, and glory, with the Father and the Son, very and eternal God." },
        ]
      },
      {
        number: 2, title: "Articles VI\u2013VIII: Scripture and Creeds",
        sections: [
          { number: 6, text: "Article VI. Of the Sufficiency of the holy Scriptures for salvation. Holy Scripture containeth all things necessary to salvation: so that whatsoever is not read therein, nor may be proved thereby, is not to be required of any man, that it should be believed as an article of the Faith, or be thought requisite or necessary to salvation." },
          { number: 7, text: "Article VII. Of the Old Testament. The Old Testament is not contrary to the New: for both in the Old and New Testament everlasting life is offered to Mankind by Christ, who is the only Mediator between God and Man, being both God and Man." },
          { number: 8, text: "Article VIII. Of the Three Creeds. The Three Creeds, Nicene Creed, Athanasius's Creed, and that which is commonly called the Apostles' Creed, ought thoroughly to be received and believed: for they may be proved by most certain warrants of holy Scripture." },
        ]
      },
      {
        number: 3, title: "Articles IX\u2013XIV: Sin and Salvation",
        sections: [
          { number: 9, text: "Article IX. Of Original or Birth-sin. Original sin standeth not in the following of Adam, (as the Pelagians do vainly talk;) but it is the fault and corruption of the Nature of every man, that naturally is engendered of the offspring of Adam; whereby man is very far gone from original righteousness, and is of his own nature inclined to evil." },
          { number: 10, text: "Article X. Of Free-Will. The condition of Man after the fall of Adam is such, that he cannot turn and prepare himself, by his own natural strength and good works, to faith; and calling upon God: Wherefore we have no power to do good works pleasant and acceptable to God, without the grace of God by Christ preventing us." },
          { number: 11, text: "Article XI. Of the Justification of Man. We are accounted righteous before God, only for the merit of our Lord and Saviour Jesus Christ by Faith, and not for our own works or deservings: Wherefore, that we are justified by Faith only is a most wholesome Doctrine, and very full of comfort." },
          { number: 12, text: "Article XII. Of Good Works. Albeit that Good Works, which are the fruits of Faith, and follow after Justification, cannot put away our sins, and endure the severity of God's Judgement; yet are they pleasing and acceptable to God in Christ, and do spring out necessarily of a true and lively Faith." },
          { number: 13, text: "Article XIII. Of Works before Justification. Works done before the grace of Christ, and the Inspiration of his Spirit, are not pleasant to God, forasmuch as they spring not of faith in Jesus Christ; neither do they make men meet to receive grace, or (as the School-authors say) deserve grace of congruity." },
          { number: 14, text: "Article XIV. Of Works of Supererogation. Voluntary Works besides, over and above, God's Commandments, which they call Works of Supererogation, cannot be taught without arrogancy and impiety: for by them men do declare, that they do not only render unto God as much as they are bound to do, but that they do more for his sake, than of bounden duty is required." },
        ]
      },
      {
        number: 4, title: "Articles XV\u2013XVIII: Christ, Predestination & Salvation",
        sections: [
          { number: 15, text: "Article XV. Of Christ alone without Sin. Christ in the truth of our nature was made like unto us in all things, sin only except, from which he was clearly void, both in his flesh, and in his spirit. He came to be the Lamb without spot, who, by sacrifice of himself once made, should take away the sins of the world." },
          { number: 17, text: "Article XVII. Of Predestination and Election. Predestination to Life is the everlasting purpose of God, whereby (before the foundations of the world were laid) he hath constantly decreed by his counsel secret to us, to deliver from curse and damnation those whom he hath chosen in Christ out of mankind." },
          { number: 18, text: "Article XVIII. Of obtaining eternal Salvation only by the Name of Christ. They also are to be had accursed that presume to say, That every man shall be saved by the Law or Sect which he professeth, so that he be diligent to frame his life according to that Law, and the light of Nature. For holy Scripture doth set out unto us only the Name of Jesus Christ, whereby men must be saved." },
        ]
      },
      {
        number: 5, title: "Articles XIX\u2013XXII: The Church",
        sections: [
          { number: 19, text: "Article XIX. Of the Church. The visible Church of Christ is a congregation of faithful men, in the which the pure Word of God is preached, and the Sacraments be duly ministered according to Christ's ordinance in all those things that of necessity are requisite to the same." },
          { number: 20, text: "Article XX. Of the Authority of the Church. The Church hath power to decree Rites or Ceremonies, and authority in Controversies of Faith: And yet it is not lawful for the Church to ordain any thing that is contrary to God's Word written, neither may it so expound one place of Scripture, that it be repugnant to another." },
          { number: 21, text: "Article XXI. Of the Authority of General Councils. General Councils may not be gathered together without the commandment and will of Princes. And when they be gathered together, (forasmuch as they be an assembly of men, whereof all be not governed with the Spirit and Word of God,) they may err, and sometime have erred, even in things pertaining unto God." },
          { number: 22, text: "Article XXII. Of Purgatory. The Romish Doctrine concerning Purgatory, Pardons, Worshipping, and Adoration, as well of Images as of Reliques, and also invocation of Saints, is a fond thing vainly invented, and grounded upon no warranty of Scripture, but rather repugnant to the Word of God." },
        ]
      },
      {
        number: 6, title: "Articles XXV\u2013XXXI: Sacraments",
        sections: [
          { number: 25, text: "Article XXV. Of the Sacraments. Sacraments ordained of Christ be not only badges or tokens of Christian men's profession, but rather they be certain sure witnesses, and effectual signs of grace, and God's good will towards us, by the which he doth work invisibly in us, and doth not only quicken, but also strengthen and confirm our Faith in him. There are two Sacraments ordained of Christ our Lord in the Gospel, that is to say, Baptism, and the Supper of the Lord." },
          { number: 27, text: "Article XXVII. Of Baptism. Baptism is not only a sign of profession, and mark of difference, whereby Christian men are discerned from others that be not christened, but it is also a sign of Regeneration or new Birth, whereby, as by an instrument, they that receive Baptism rightly are grafted into the Church; the promises of forgiveness of sin, and of our adoption to be the sons of God by the Holy Ghost, are visibly signed and sealed." },
          { number: 28, text: "Article XXVIII. Of the Lord's Supper. The Supper of the Lord is not only a sign of the love that Christians ought to have among themselves one to another; but rather it is a Sacrament of our Redemption by Christ's death: insomuch that to such as rightly, worthily, and with faith, receive the same, the Bread which we break is a partaking of the Body of Christ; and likewise the Cup of Blessing is a partaking of the Blood of Christ." },
          { number: 31, text: "Article XXXI. Of the one Oblation of Christ finished upon the Cross. The Offering of Christ once made is that perfect redemption, propitiation, and satisfaction, for all the sins of the whole world, both original and actual; and there is none other satisfaction for sin, but that alone. Wherefore the sacrifices of Masses, in the which it was commonly said, that the Priest did offer Christ for the quick and the dead, to have remission of pain or guilt, were blasphemous fables, and dangerous deceits." },
        ]
      },
      {
        number: 7, title: "Articles XXXII\u2013XXXIX: Discipline & Church Order",
        sections: [
          { number: 32, text: "Article XXXII. Of the Marriage of Priests. Bishops, Priests, and Deacons, are not commanded by God's Law, either to vow the estate of single life, or to abstain from marriage: therefore it is lawful also for them, as for all other Christian men, to marry at their own discretion, as they shall judge the same to serve better to godliness." },
          { number: 35, text: "Article XXXV. Of the Homilies. The second Book of Homilies, the several titles whereof we have joined under this Article, doth contain a godly and wholesome Doctrine, and necessary for these times, as doth the former Book of Homilies, which were set forth in the time of Edward the Sixth." },
          { number: 37, text: "Article XXXVII. Of the Civil Magistrates. The King's Majesty hath the chief power in this Realm of England, and other his Dominions, unto whom the chief Government of all Estates of this Realm, whether they be Ecclesiastical or Civil, in all causes doth appertain." },
          { number: 39, text: "Article XXXIX. Of a Christian man's Oath. As we confess that vain and rash Swearing is forbidden Christian men by our Lord Jesus Christ, and James his Apostle: So we judge, that Christian Religion doth not prohibit, but that a man may swear when the Magistrate requireth, in a cause of faith and charity, so it be done according to the Prophet's teaching in justice, judgement, and truth." },
        ]
      },
    ]
  },
};
