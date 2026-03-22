import { useState, useEffect } from "react";

const ALL_TRADITIONS = ["Reformed", "Lutheran", "Catholic", "Baptist", "Ecumenical", "Orthodox", "Anglican"];

const COLORS = {
  Reformed:   { bg: "#e8f0e8", border: "#5a8a5a", text: "#2a5a2a", header: "#5a8a5a" },
  Lutheran:   { bg: "#e8eaf5", border: "#5a6aaa", text: "#2a3a7a", header: "#5a6aaa" },
  Catholic:   { bg: "#f5e8e8", border: "#aa5a5a", text: "#7a2a2a", header: "#aa5a5a" },
  Baptist:    { bg: "#f5f0e8", border: "#aa8a5a", text: "#7a5a2a", header: "#aa8a5a" },
  Ecumenical: { bg: "#f0e8f5", border: "#8a5aaa", text: "#5a2a7a", header: "#8a5aaa" },
  Orthodox:   { bg: "#fdf5e0", border: "#b8962e", text: "#7a5a00", header: "#b8962e" },
  Anglican:   { bg: "#e8f0f5", border: "#4a7a9b", text: "#1a4a6b", header: "#4a7a9b" },
};

// ============================================================
// STATIC CONFESSION DATA
// These are real excerpts from public domain confession texts.
// Each confession has chapters, each chapter has sections.
// ============================================================
const CONFESSIONS = {
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
        number: 1,
        title: "Article I: Of God",
        sections: [
          { number: 1, text: "Our Churches, with common consent, do teach that the decree of the Council of Nicaea concerning the Unity of the Divine Essence and concerning the Three Persons, is true and to be believed without any doubting; that is to say, there is one Divine Essence which is called and which is God: eternal, without body, without parts, of infinite power, wisdom, and goodness, the Maker and Preserver of all things, visible and invisible." },
        ]
      },
      {
        number: 2,
        title: "Article II: Of Original Sin",
        sections: [
          { number: 1, text: "It is also taught among us that since the fall of Adam all men who are born according to the course of nature are conceived and born in sin. That is, all men are full of evil lust and inclinations from their mothers' wombs and are unable by nature to have true fear of God and true faith in God." },
        ]
      },
      {
        number: 4,
        title: "Article IV: Of Justification",
        sections: [
          { number: 1, text: "It is also taught among us that we cannot obtain forgiveness of sin and righteousness before God by our own merits, works, or satisfactions, but that we receive forgiveness of sin and become righteous before God by grace, for Christ's sake, through faith, when we believe that Christ suffered for us and that for his sake our sin is forgiven and righteousness and eternal life are given to us." },
        ]
      },
      {
        number: 9,
        title: "Article IX: Of Baptism",
        sections: [
          { number: 1, text: "Of Baptism they teach that it is necessary to salvation, and that through Baptism is offered the grace of God, and that children are to be baptized who, being offered to God through Baptism are received into God's grace." },
        ]
      },
      {
        number: 10,
        title: "Article X: Of the Lord's Supper",
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
        number: 1,
        title: "Of the Holy Scriptures",
        sections: [
          { number: 1, text: "The Holy Scripture is the only sufficient, certain, and infallible rule of all saving knowledge, faith, and obedience. The Holy Scripture is not the product of the will of man, but holy men of God spoke as they were moved by the Holy Spirit." },
          { number: 5, text: "We may be moved and induced by the testimony of the church of God to an high and reverent esteem of the Holy Scriptures; and the heavenliness of the matter, the efficacy of the doctrine, and the majesty of the style... are arguments whereby it doth abundantly evidence itself to be the Word of God." },
        ]
      },
      {
        number: 11,
        title: "Of Justification",
        sections: [
          { number: 1, text: "Those whom God effectually calleth, he also freely justifieth, not by infusing righteousness into them, but by pardoning their sins, and by accounting and accepting their persons as righteous; not for any thing wrought in them, or done by them, but for Christ's sake alone." },
        ]
      },
      {
        number: 29,
        title: "Of Baptism",
        sections: [
          { number: 1, text: "Baptism is an ordinance of the New Testament, ordained by Jesus Christ, to be unto the party baptized, a sign of his fellowship with him, in his death and resurrection; of his being engrafted into him; of remission of sins; and of giving up into God, through Jesus Christ, to live and walk in newness of life." },
          { number: 2, text: "Those who do actually profess repentance towards God, faith in, and obedience to, our Lord Jesus Christ, are the only proper subjects of this ordinance." },
          { number: 3, text: "The outward element to be used in this ordinance is water, wherein the party is to be baptized, in the name of the Father, and of the Son, and of the Holy Spirit. The mode is immersion, or dipping of the person in water." },
        ]
      },
      {
        number: 30,
        title: "Of the Lord's Supper",
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
        number: 1,
        title: "The Creed",
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
        number: 1,
        title: "Of Faith",
        sections: [
          { number: 1, text: "Q. What is faith? A. According to the definition of the Apostle Paul, faith is the substance of things hoped for, the evidence of things not seen (Heb. xi. 1); that is, a trust in the unseen as though it were seen, in that which is hoped for and not yet present as if it were present." },
          { number: 2, text: "Q. What is Christian faith in particular? A. A trust in our Lord Jesus Christ as the only Savior of men, and in his atoning sacrifice for sins, as the means of our reconciliation with God." },
        ]
      },
      {
        number: 2,
        title: "Of the Sacraments",
        sections: [
          { number: 1, text: "Q. What is a Sacrament? A. A Sacrament is a holy act, through which grace, or the saving power of God, works mysteriously upon man." },
          { number: 2, text: "Q. How many Sacraments are there? A. Seven: Baptism, Confirmation or Chrismation, Communion, Penance, Holy Orders, Matrimony, and Unction." },
        ]
      },
      {
        number: 3,
        title: "Of Baptism",
        sections: [
          { number: 1, text: "Q. What is Baptism? A. Baptism is a Sacrament in which a man who believes, having his body thrice immersed in water in the name of God the Father, the Son, and the Holy Ghost, dies to the life of sinful flesh, and is born again of the Holy Ghost to a life spiritual and holy." },
          { number: 2, text: "Q. Is Baptism necessary for salvation? A. Yes, absolutely; for Jesus Christ says expressly, Except a man be born of water and of the Spirit, he cannot enter into the kingdom of God." },
        ]
      },
      {
        number: 4,
        title: "Of Theosis",
        sections: [
          { number: 1, text: "The aim of the Christian life is theosis: the union of the human person with God, participation in the divine nature. As Athanasius of Alexandria wrote, God became man so that man might become god - not by nature, but by grace, through participation in the divine energies." },
          { number: 2, text: "This deification is not a merging of essences but a real union with God through his uncreated energies, as distinguished from his essence. Through prayer, the sacraments, and the ascetic life, the believer is transformed into the likeness of Christ." },
        ]
      },
      {
        number: 5,
        title: "Of Prayer",
        sections: [
          { number: 1, text: "Q. What is prayer? A. Prayer is the lifting up of the mind and heart to God, which consists in pious meditation on God, and his works, and manifests itself in petition, thanksgiving, and praise of God." },
          { number: 2, text: "Q. What should we ask for in prayer? A. We should ask for those things which are pleasing to God, and profitable for our souls — for the forgiveness of sins, for salvation, for aid in all good works, and for the coming of his kingdom." },
        ]
      },
      {
        number: 6,
        title: "Of Scripture and Tradition",
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
        number: 1,
        title: "Articles I–V: The Trinity and Christ",
        sections: [
          { number: 1, text: "Article I. Of Faith in the Holy Trinity. There is but one living and true God, everlasting, without body, parts, or passions; of infinite power, wisdom, and goodness; the Maker, and Preserver of all things both visible and invisible. And in unity of this Godhead there be three Persons, of one substance, power, and eternity; the Father, the Son, and the Holy Ghost." },
          { number: 2, text: "Article II. Of the Word or Son of God, which was made very Man. The Son, which is the Word of the Father, begotten from everlasting of the Father, the very and eternal God, and of one substance with the Father, took Man's nature in the womb of the blessed Virgin, of her substance: so that two whole and perfect Natures, that is to say, the Godhead and Manhood, were joined together in one Person, never to be divided." },
          { number: 3, text: "Article III. Of the going down of Christ into Hell. As Christ died for us, and was buried, so also is it to be believed, that he went down into Hell. For the body lay in the sepulchre until the resurrection; but his Ghost departing from him was with the Ghosts that were in prison or in hell, and did preach to the same." },
          { number: 4, text: "Article IV. Of the Resurrection of Christ. Christ did truly rise again from death, and took again his body, with flesh, bones, and all things appertaining to the perfection of Man's nature; wherewith he ascended into Heaven, and there sitteth, until he return to judge all Men at the last day." },
          { number: 5, text: "Article V. Of the Holy Ghost. The Holy Ghost, proceeding from the Father and the Son, is of one substance, majesty, and glory, with the Father and the Son, very and eternal God." },
        ]
      },
      {
        number: 2,
        title: "Articles VI–VIII: Scripture and Creeds",
        sections: [
          { number: 6, text: "Article VI. Of the Sufficiency of the holy Scriptures for salvation. Holy Scripture containeth all things necessary to salvation: so that whatsoever is not read therein, nor may be proved thereby, is not to be required of any man, that it should be believed as an article of the Faith, or be thought requisite or necessary to salvation." },
          { number: 7, text: "Article VII. Of the Old Testament. The Old Testament is not contrary to the New: for both in the Old and New Testament everlasting life is offered to Mankind by Christ, who is the only Mediator between God and Man, being both God and Man." },
          { number: 8, text: "Article VIII. Of the Three Creeds. The Three Creeds, Nicene Creed, Athanasius's Creed, and that which is commonly called the Apostles' Creed, ought thoroughly to be received and believed: for they may be proved by most certain warrants of holy Scripture." },
        ]
      },
      {
        number: 3,
        title: "Articles IX–XIV: Sin and Salvation",
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
        number: 4,
        title: "Articles XV–XVIII: Christ, Predestination & Salvation",
        sections: [
          { number: 15, text: "Article XV. Of Christ alone without Sin. Christ in the truth of our nature was made like unto us in all things, sin only except, from which he was clearly void, both in his flesh, and in his spirit. He came to be the Lamb without spot, who, by sacrifice of himself once made, should take away the sins of the world." },
          { number: 17, text: "Article XVII. Of Predestination and Election. Predestination to Life is the everlasting purpose of God, whereby (before the foundations of the world were laid) he hath constantly decreed by his counsel secret to us, to deliver from curse and damnation those whom he hath chosen in Christ out of mankind." },
          { number: 18, text: "Article XVIII. Of obtaining eternal Salvation only by the Name of Christ. They also are to be had accursed that presume to say, That every man shall be saved by the Law or Sect which he professeth, so that he be diligent to frame his life according to that Law, and the light of Nature. For holy Scripture doth set out unto us only the Name of Jesus Christ, whereby men must be saved." },
        ]
      },
      {
        number: 5,
        title: "Articles XIX–XXII: The Church",
        sections: [
          { number: 19, text: "Article XIX. Of the Church. The visible Church of Christ is a congregation of faithful men, in the which the pure Word of God is preached, and the Sacraments be duly ministered according to Christ's ordinance in all those things that of necessity are requisite to the same." },
          { number: 20, text: "Article XX. Of the Authority of the Church. The Church hath power to decree Rites or Ceremonies, and authority in Controversies of Faith: And yet it is not lawful for the Church to ordain any thing that is contrary to God's Word written, neither may it so expound one place of Scripture, that it be repugnant to another." },
          { number: 21, text: "Article XXI. Of the Authority of General Councils. General Councils may not be gathered together without the commandment and will of Princes. And when they be gathered together, (forasmuch as they be an assembly of men, whereof all be not governed with the Spirit and Word of God,) they may err, and sometime have erred, even in things pertaining unto God." },
          { number: 22, text: "Article XXII. Of Purgatory. The Romish Doctrine concerning Purgatory, Pardons, Worshipping, and Adoration, as well of Images as of Reliques, and also invocation of Saints, is a fond thing vainly invented, and grounded upon no warranty of Scripture, but rather repugnant to the Word of God." },
        ]
      },
      {
        number: 6,
        title: "Articles XXV–XXXI: Sacraments",
        sections: [
          { number: 25, text: "Article XXV. Of the Sacraments. Sacraments ordained of Christ be not only badges or tokens of Christian men's profession, but rather they be certain sure witnesses, and effectual signs of grace, and God's good will towards us, by the which he doth work invisibly in us, and doth not only quicken, but also strengthen and confirm our Faith in him. There are two Sacraments ordained of Christ our Lord in the Gospel, that is to say, Baptism, and the Supper of the Lord." },
          { number: 27, text: "Article XXVII. Of Baptism. Baptism is not only a sign of profession, and mark of difference, whereby Christian men are discerned from others that be not christened, but it is also a sign of Regeneration or new Birth, whereby, as by an instrument, they that receive Baptism rightly are grafted into the Church; the promises of forgiveness of sin, and of our adoption to be the sons of God by the Holy Ghost, are visibly signed and sealed." },
          { number: 28, text: "Article XXVIII. Of the Lord's Supper. The Supper of the Lord is not only a sign of the love that Christians ought to have among themselves one to another; but rather it is a Sacrament of our Redemption by Christ's death: insomuch that to such as rightly, worthily, and with faith, receive the same, the Bread which we break is a partaking of the Body of Christ; and likewise the Cup of Blessing is a partaking of the Blood of Christ." },
          { number: 31, text: "Article XXXI. Of the one Oblation of Christ finished upon the Cross. The Offering of Christ once made is that perfect redemption, propitiation, and satisfaction, for all the sins of the whole world, both original and actual; and there is none other satisfaction for sin, but that alone. Wherefore the sacrifices of Masses, in the which it was commonly said, that the Priest did offer Christ for the quick and the dead, to have remission of pain or guilt, were blasphemous fables, and dangerous deceits." },
        ]
      },
      {
        number: 7,
        title: "Articles XXXII–XXXIX: Discipline & Church Order",
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

async function callAPI(body, password) {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...body, password }),
  });
  return res.json();
}

const SYSTEM_PROMPT = `You are a Christian theology research assistant specializing in historic confessions and catechisms. You have deep knowledge of the Westminster Confession of Faith, Heidelberg Catechism, Augsburg Confession, Catechism of the Catholic Church, Nicene Creed, the 1689 London Baptist Confession, the Eastern Orthodox Longer Catechism, and the Thirty-Nine Articles of the Church of England. Always cite specific article numbers. Note where traditions agree and differ. Be scholarly but accessible.`;

const CITATION_PROMPT = `You are a theology citation extractor. Return citations in EXACTLY this format:

TRADITION: Reformed
CONFESSION: Westminster Confession of Faith
REFERENCE: Chapter 11, Section 1
QUOTE: those whom God effectually calleth he also freely justifieth
RELEVANCE: Primary definition of justification
---

Tradition must be one of: Reformed, Lutheran, Catholic, Baptist, Ecumenical, Orthodox, Anglican.
Include 3 to 6 citations. Plain text only.`;

const COMPARISON_PROMPT = `You are a Christian theology comparison engine.

When given a doctrine, respond in EXACTLY this format:

TOPIC: [name of the doctrine]
SUMMARY: [one sentence overview]
---
ASPECT: [aspect name]
REFORMED: [position] | [citation]
LUTHERAN: [position] | [citation]
CATHOLIC: [position] | [citation]
BAPTIST: [position] | [citation]
ECUMENICAL: [position] | [citation]
ORTHODOX: [position] | [citation]
ANGLICAN: [position] | [citation]
---

Include 4 to 6 aspects. One sentence per position. Plain text only.`;

function parseCitations(text) {
  const results = [];
  const blocks = text.split("---").map(b => b.trim()).filter(Boolean);
  for (const block of blocks) {
    const lines = block.split("\n").map(l => l.trim()).filter(Boolean);
    const item = {};
    for (const line of lines) {
      if (line.startsWith("TRADITION:")) item.tradition = line.replace("TRADITION:", "").trim();
      else if (line.startsWith("CONFESSION:")) item.confession = line.replace("CONFESSION:", "").trim();
      else if (line.startsWith("REFERENCE:")) item.reference = line.replace("REFERENCE:", "").trim();
      else if (line.startsWith("QUOTE:")) item.quote = line.replace("QUOTE:", "").trim();
      else if (line.startsWith("RELEVANCE:")) item.relevance = line.replace("RELEVANCE:", "").trim();
    }
    if (item.confession && item.tradition) results.push(item);
  }
  return results;
}

function parseComparison(text) {
  const lines = text.split("\n").map(l => l.trim()).filter(Boolean);
  const result = { topic: "", summary: "", rows: [] };
  let currentRow = null;
  for (const line of lines) {
    if (line.startsWith("TOPIC:")) result.topic = line.replace("TOPIC:", "").trim();
    else if (line.startsWith("SUMMARY:")) result.summary = line.replace("SUMMARY:", "").trim();
    else if (line.startsWith("ASPECT:")) {
      if (currentRow) result.rows.push(currentRow);
      currentRow = { aspect: line.replace("ASPECT:", "").trim() };
    } else if (line === "---") continue;
    else {
      for (const t of ALL_TRADITIONS) {
        const key = t.toUpperCase() + ":";
        if (line.startsWith(key)) {
          const content = line.replace(key, "").trim();
          const parts = content.split("|");
          currentRow[t] = { position: parts[0] ? parts[0].trim() : "", citation: parts[1] ? parts[1].trim() : "" };
        }
      }
    }
  }
  if (currentRow) result.rows.push(currentRow);
  return result;
}

// Safely extract text from API response, throwing on errors
function extractText(data) {
  if (data && data.content && data.content[0] && data.content[0].text) {
    return data.content[0].text;
  }
  if (data && data.error) {
    throw new Error(data.error.message || data.error);
  }
  throw new Error("No response from the AI service. Please try again.");
}

export default function TheologyAssistant() {
  // Password gate - user must enter the app password before accessing
  const [appPassword, setAppPassword] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  function submitPassword() {
    if (passwordInput.trim()) {
      setAppPassword(passwordInput.trim());
      setPasswordError(false);
    }
  }

  const [mode, setMode] = useState("research");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [citations, setCitations] = useState([]);
  const [citationsLoading, setCitationsLoading] = useState(false);
  const [compareInput, setCompareInput] = useState("");
  const [compareLoading, setCompareLoading] = useState(false);
  const [comparisonData, setComparisonData] = useState(null);
  const [compareError, setCompareError] = useState(null);
  const [activeTraditions, setActiveTraditions] = useState(new Set(ALL_TRADITIONS));
  const [entries, setEntries] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editingNote, setEditingNote] = useState("");

  // Browse mode state
  const [selectedConfession, setSelectedConfession] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [commentary, setCommentary] = useState({});
  const [commentaryLoading, setCommentaryLoading] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("theology-notebook");
      if (saved) setEntries(JSON.parse(saved));
    } catch (e) { console.error(e); }
  }, []);

  useEffect(() => {
    try { localStorage.setItem("theology-notebook", JSON.stringify(entries)); }
    catch (e) { console.error(e); }
  }, [entries]);

  function resetResearch() {
    setMessages([]);
    setCitations([]);
    setInput("");
  }

  function resetCompare() {
    setComparisonData(null);
    setCompareInput("");
    setCompareError(null);
  }

  const [newNoteText, setNewNoteText] = useState("");
  const [addingNewNote, setAddingNewNote] = useState(false);

  function addStandaloneNote() {
    if (!newNoteText.trim()) return;
    const newEntry = { id: Date.now(), date: new Date().toLocaleDateString(), question: "", answer: "", note: newNoteText.trim(), isStandalone: true };
    setEntries(prev => [newEntry, ...prev]);
    setNewNoteText("");
    setAddingNewNote(false);
  }

  function saveEntry(question, answer) {
    const newEntry = { id: Date.now(), date: new Date().toLocaleDateString(), question, answer, note: "", isStandalone: false };
    setEntries(prev => [newEntry, ...prev]);
    setMode("notebook");
  }

  function deleteEntry(id) { setEntries(prev => prev.filter(e => e.id !== id)); }

  function saveNote(id) {
    setEntries(prev => prev.map(e => e.id === id ? { ...e, note: editingNote } : e));
    setEditingId(null);
    setEditingNote("");
  }

  function toggleTradition(t) {
    setActiveTraditions(prev => {
      const next = new Set(prev);
      if (next.has(t)) { if (next.size > 1) next.delete(t); } else { next.add(t); }
      return next;
    });
  }

  async function getCommentary(confessionName, chapterTitle, sectionNumber, sectionText) {
    const key = confessionName + "-" + chapterTitle + "-" + sectionNumber;
    if (commentary[key]) return;
    setCommentaryLoading(key);
    try {
      const prompt = "Provide a brief scholarly commentary (3-4 sentences) on this section from " + confessionName + ", " + chapterTitle + ": " + sectionText + " Note its historical context, theological significance, and how it relates to other traditions.";
      const data = await callAPI({ max_tokens: 300, system: SYSTEM_PROMPT, messages: [{ role: "user", content: prompt }] }, appPassword);
      setCommentary(prev => ({ ...prev, [key]: extractText(data) }));
    } catch (e) {
      console.error(e);
      setCommentary(prev => ({ ...prev, [key]: "Commentary unavailable. " + (e.message || "Please try again.") }));
    }
    finally { setCommentaryLoading(false); }
  }

  const visibleTraditions = ALL_TRADITIONS.filter(t => activeTraditions.has(t));

  async function askQuestion() {
    if (!input.trim()) return;
    const userMessage = { role: "user", content: input };
    const updated = [...messages, userMessage];
    const question = input;
    setMessages(updated); setInput(""); setLoading(true); setCitationsLoading(true); setCitations([]);
    try {
      const [ad, cd] = await Promise.all([
        callAPI({ max_tokens: 1000, system: SYSTEM_PROMPT, messages: updated }, appPassword),
        callAPI({ max_tokens: 1000, system: CITATION_PROMPT, messages: [{ role: "user", content: question }] }, appPassword),
      ]);
      const answer = extractText(ad);
      setMessages([...updated, { role: "assistant", content: answer, question }]);
      try { setCitations(parseCitations(extractText(cd))); } catch { setCitations([]); }
    } catch (e) {
      console.error(e);
      setMessages([...updated, { role: "assistant", content: "Sorry, I couldn't get a response. " + (e.message || "Please try again.") }]);
    }
    finally { setLoading(false); setCitationsLoading(false); }
  }

  async function runComparison() {
    if (!compareInput.trim()) return;
    setCompareLoading(true); setComparisonData(null); setCompareError(null);
    try {
      const data = await callAPI({ max_tokens: 1500, system: COMPARISON_PROMPT, messages: [{ role: "user", content: compareInput }] }, appPassword);
      const text = extractText(data);
      const parsed = parseComparison(text);
      if (!parsed.topic || parsed.rows.length === 0) throw new Error("Could not parse response. Please try again.");
      setComparisonData(parsed);
    } catch (e) { console.error(e); setCompareError(e.message || "Unknown error."); }
    finally { setCompareLoading(false); }
  }

  const gold = "#c9a84c";
  const dark = "#2c2416";
  const cream = "#faf8f4";
  const border = "#d4c4a0";
  const mid = "#8a7a5a";
  const light = "#f5f0e8";

  const confessionNames = Object.keys(CONFESSIONS);

  // Show password screen if not yet authenticated
  if (!appPassword) {
    const gold = "#c9a84c";
    const dark = "#2c2416";
    const cream = "#faf8f4";
    const border = "#d4c4a0";
    return (
      <div style={{ fontFamily: "Georgia, serif", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: cream }}>
        <div style={{ width: 360, padding: "40px 36px", background: "#fff", border: "1px solid " + border, borderRadius: 12, boxShadow: "0 4px 20px rgba(0,0,0,0.08)", textAlign: "center" }}>
          <div style={{ fontSize: 22, fontWeight: "bold", color: dark, marginBottom: 6 }}>Confession and Catechism Research</div>
          <div style={{ fontSize: 11, color: gold, letterSpacing: 2, textTransform: "uppercase", marginBottom: 28 }}>Beta Access</div>
          <div style={{ fontSize: 14, color: "#5a4a2a", marginBottom: 20 }}>Enter your access password to continue</div>
          <input
            type="password"
            style={{ width: "100%", padding: "10px 14px", fontSize: 14, fontFamily: "Georgia, serif", border: "1px solid " + (passwordError ? "#cc4444" : border), borderRadius: 8, outline: "none", color: dark, boxSizing: "border-box", marginBottom: 10 }}
            value={passwordInput}
            onChange={(e) => { setPasswordInput(e.target.value); setPasswordError(false); }}
            onKeyDown={(e) => { if (e.key === "Enter") submitPassword(); }}
            placeholder="Password"
            autoFocus
          />
          {passwordError && <div style={{ fontSize: 12, color: "#cc4444", marginBottom: 10 }}>Incorrect password. Please try again.</div>}
          <button
            onClick={submitPassword}
            style={{ width: "100%", padding: "10px", background: gold, color: dark, border: "none", borderRadius: 8, fontSize: 14, fontWeight: "bold", cursor: "pointer", fontFamily: "Georgia, serif" }}>
            Enter
          </button>
        </div>
      </div>
    );
  }
  const currentConfession = selectedConfession ? CONFESSIONS[selectedConfession] : null;
  const currentChapter = selectedChapter !== null && currentConfession ? currentConfession.chapters[selectedChapter] : null;

  return (
    <div style={{ fontFamily: "Georgia, serif", height: "100vh", display: "flex", flexDirection: "column", background: cream, color: dark, overflow: "hidden" }}>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "12px 24px", background: dark, flexShrink: 0 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 16, fontWeight: "bold", color: cream }}>Confession and Catechism Research</div>
          <div style={{ fontSize: 10, color: gold, letterSpacing: 2, textTransform: "uppercase" }}>Westminster · Heidelberg · Augsburg · 1689 Baptist · Nicene · Orthodox · 39 Articles</div>
        </div>
        <div style={{ display: "flex", gap: 5, flexWrap: "wrap", justifyContent: "flex-end" }}>
          {[
            { key: "research", label: "Research" },
            { key: "compare", label: "Compare" },
            { key: "browse", label: "Browse" },
            { key: "notebook", label: "Notebook" + (entries.length > 0 ? " (" + entries.length + ")" : "") },
          ].map(({ key, label }) => (
            <button key={key} onClick={() => setMode(key)} style={{ padding: "5px 12px", background: mode === key ? gold : "transparent", color: mode === key ? dark : gold, border: "1px solid " + gold, borderRadius: 20, fontSize: 11, cursor: "pointer", fontFamily: "Georgia, serif", fontWeight: mode === key ? "bold" : "normal" }}>
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Tradition filter bar */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 24px", background: "#ede8dc", borderBottom: "1px solid " + border, flexShrink: 0, flexWrap: "wrap" }}>
        <span style={{ fontSize: 10, fontWeight: "bold", color: mid, letterSpacing: 1, textTransform: "uppercase", marginRight: 4 }}>Show:</span>
        {ALL_TRADITIONS.map(t => {
          const active = activeTraditions.has(t);
          const c = COLORS[t];
          return <button key={t} onClick={() => toggleTradition(t)} style={{ padding: "4px 12px", background: active ? c.border : "#fff", color: active ? "#fff" : "#aaa", border: "2px solid " + (active ? c.border : "#ccc"), borderRadius: 12, fontSize: 11, cursor: "pointer", fontFamily: "Georgia, serif", fontWeight: active ? "bold" : "normal", opacity: active ? 1 : 0.6, transition: "all 0.15s ease" }}>{t}</button>;
        })}
        <button onClick={() => setActiveTraditions(new Set(ALL_TRADITIONS))} style={{ padding: "2px 8px", background: "transparent", color: mid, border: "none", fontSize: 10, cursor: "pointer", fontFamily: "Georgia, serif", textDecoration: "underline" }}>All</button>
      </div>

      {/* RESEARCH MODE */}
      {mode === "research" && (
        <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
          <div style={{ flex: 3, display: "flex", flexDirection: "column", borderRight: "2px solid " + border, overflow: "hidden" }}>
            <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px", display: "flex", flexDirection: "column", gap: 14 }}>
              {messages.length === 0 && (
                <div style={{ textAlign: "center", padding: "40px 20px", color: mid }}>
                  <p style={{ fontSize: 17, color: "#5a4a2a", marginBottom: 12 }}>Ask a theological question</p>
                  <p style={{ fontSize: 13, marginBottom: 6, fontStyle: "italic" }}>What do the confessions say about justification by faith?</p>
                  <p style={{ fontSize: 13, marginBottom: 6, fontStyle: "italic" }}>How does Westminster describe Scripture?</p>
                  <p style={{ fontSize: 13, fontStyle: "italic" }}>What does Orthodoxy teach about theosis?</p>
                </div>
              )}
              {messages.map((msg, i) => (
                <div key={i}>
                  <div style={{ background: msg.role === "user" ? dark : "#fff", color: msg.role === "user" ? cream : dark, borderRadius: msg.role === "user" ? "12px 12px 2px 12px" : "2px 12px 12px 12px", padding: "12px 16px", border: msg.role === "user" ? "none" : "1px solid " + border, boxShadow: "0 1px 3px rgba(0,0,0,0.06)", display: "inline-block", maxWidth: msg.role === "user" ? "75%" : "100%", float: msg.role === "user" ? "right" : "none", clear: "both" }}>
                    <div style={{ fontSize: 10, fontWeight: "bold", letterSpacing: 1, textTransform: "uppercase", marginBottom: 5, color: msg.role === "user" ? gold : mid }}>{msg.role === "user" ? "You" : "Research Assistant"}</div>
                    <div style={{ fontSize: 14, lineHeight: 1.75, whiteSpace: "pre-wrap" }}>{msg.content}</div>
                    {msg.role === "assistant" && <button onClick={() => saveEntry(msg.question || "", msg.content)} style={{ marginTop: 10, padding: "4px 12px", background: light, border: "1px solid " + border, borderRadius: 8, fontSize: 12, color: mid, cursor: "pointer", fontFamily: "Georgia, serif" }}>Save to Notebook</button>}
                  </div>
                  <div style={{ clear: "both" }} />
                </div>
              ))}
              {loading && <div style={{ background: "#fff", border: "1px solid " + border, borderRadius: "2px 12px 12px 12px", padding: "12px 16px" }}><div style={{ fontSize: 10, fontWeight: "bold", letterSpacing: 1, textTransform: "uppercase", color: mid, marginBottom: 5 }}>Research Assistant</div><div style={{ fontSize: 13, color: mid, fontStyle: "italic" }}>Searching confessions...</div></div>}
            </div>
            <div style={{ padding: "12px 20px 16px", borderTop: "1px solid " + border, display: "flex", gap: 10, background: cream }}>
              <textarea style={{ flex: 1, padding: "10px 14px", fontSize: 14, fontFamily: "Georgia, serif", border: "1px solid " + border, borderRadius: 8, background: "#fff", color: dark, resize: "none", outline: "none" }} value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); askQuestion(); } }} placeholder="Ask about any doctrine, confession, or catechism..." rows={3} />
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <button onClick={askQuestion} disabled={loading} style={{ flex: 1, padding: "0 18px", background: loading ? border : gold, color: loading ? mid : dark, border: "none", borderRadius: 8, fontSize: 14, fontWeight: "bold", cursor: loading ? "not-allowed" : "pointer", fontFamily: "Georgia, serif" }}>{loading ? "..." : "Ask"}</button>
                {messages.length > 0 && <button onClick={resetResearch} style={{ padding: "6px 10px", background: "#fff", color: mid, border: "1px solid " + border, borderRadius: 8, fontSize: 11, cursor: "pointer", fontFamily: "Georgia, serif" }}>↺ New Search</button>}
              </div>
            </div>
          </div>
          <div style={{ flex: 2, overflowY: "auto", background: light, display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 18px", borderBottom: "1px solid " + border, background: "#ede8dc" }}>
              <span style={{ fontSize: 13, fontWeight: "bold", color: "#5a4a2a" }}>Sources</span>
              {citations.length > 0 && <span style={{ fontSize: 11, color: mid, background: border, padding: "2px 8px", borderRadius: 10 }}>{citations.length} references</span>}
            </div>
            {citationsLoading && <div style={{ padding: "24px", textAlign: "center", color: mid, fontSize: 13, fontStyle: "italic" }}>Identifying sources...</div>}
            {!citationsLoading && citations.length === 0 && <div style={{ padding: "32px 20px", textAlign: "center", color: mid, fontSize: 13 }}>Sources will appear here after your first question.</div>}
            {!citationsLoading && citations.filter(c => activeTraditions.has(c.tradition)).map((cite, i) => {
              const c = COLORS[cite.tradition] || COLORS.Ecumenical;
              return (
                <div key={i} style={{ margin: "10px 12px", padding: "12px 14px", background: "#fff", borderRadius: 8, borderLeft: "4px solid " + c.border, boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
                  <div style={{ display: "inline-block", fontSize: 10, fontWeight: "bold", letterSpacing: 1, textTransform: "uppercase", padding: "2px 8px", borderRadius: 10, marginBottom: 6, background: c.bg, color: c.text }}>{cite.tradition}</div>
                  <div style={{ fontSize: 13, fontWeight: "bold", color: dark, marginBottom: 2 }}>{cite.confession}</div>
                  <div style={{ fontSize: 12, color: mid, marginBottom: 6, fontStyle: "italic" }}>{cite.reference}</div>
                  {cite.quote && <div style={{ fontSize: 12, color: "#4a3a1a", lineHeight: 1.6, borderLeft: "2px solid " + border, paddingLeft: 8, marginBottom: 6, fontStyle: "italic" }}>{cite.quote}</div>}
                  {cite.relevance && <div style={{ fontSize: 11, color: mid }}>{cite.relevance}</div>}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* COMPARE MODE */}
      {mode === "compare" && (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <div style={{ padding: "18px 24px", borderBottom: "1px solid " + border, background: cream, flexShrink: 0 }}>
            <p style={{ margin: "0 0 10px", fontSize: 14, color: "#5a4a2a" }}>Enter a doctrine or topic to compare across traditions:</p>
            <div style={{ display: "flex", gap: 10 }}>
              <input style={{ flex: 1, padding: "10px 14px", fontSize: 14, fontFamily: "Georgia, serif", border: "1px solid " + border, borderRadius: 8, outline: "none", color: dark, background: "#fff" }} value={compareInput} onChange={(e) => setCompareInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") runComparison(); }} placeholder="e.g. Baptism, Justification, Theosis" />
              <button onClick={runComparison} disabled={compareLoading} style={{ padding: "0 18px", background: compareLoading ? border : gold, color: compareLoading ? mid : dark, border: "none", borderRadius: 8, fontSize: 14, fontWeight: "bold", cursor: compareLoading ? "not-allowed" : "pointer", fontFamily: "Georgia, serif" }}>{compareLoading ? "Comparing..." : "Compare"}</button>
              {comparisonData && <button onClick={resetCompare} style={{ padding: "0 14px", background: "#fff", color: mid, border: "1px solid " + border, borderRadius: 8, fontSize: 12, cursor: "pointer", fontFamily: "Georgia, serif" }}>↺ New</button>}
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 10, flexWrap: "wrap" }}>
              {["Baptism", "Justification", "Lords Supper", "Scripture", "Predestination", "Theosis"].map((t) => (
                <button key={t} onClick={() => setCompareInput(t)} style={{ padding: "3px 12px", background: "#fff", border: "1px solid " + border, borderRadius: 14, fontSize: 12, color: "#5a4a2a", cursor: "pointer", fontFamily: "Georgia, serif" }}>{t}</button>
              ))}
            </div>
          </div>
          {compareError && <div style={{ margin: "16px 24px", padding: "12px 16px", background: "#fff0f0", border: "1px solid #ffaaaa", borderRadius: 8, color: "#aa2222", fontSize: 13 }}>{compareError}</div>}
          {compareLoading && <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 8 }}><div style={{ fontSize: 18, color: "#5a4a2a" }}>Comparing traditions...</div><div style={{ fontSize: 13, color: mid, fontStyle: "italic" }}>Consulting all six traditions...</div></div>}
          {!comparisonData && !compareLoading && !compareError && <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", padding: 40, textAlign: "center" }}><p style={{ fontSize: 17, color: "#5a4a2a", marginBottom: 8 }}>Compare any doctrine across traditions</p><p style={{ fontSize: 13, color: mid, maxWidth: 440, lineHeight: 1.7 }}>Use the filter bar above to choose traditions, then enter a topic.</p></div>}
          {comparisonData && !compareLoading && (
            <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px" }}>
              <h2 style={{ margin: "0 0 6px", fontSize: 20, color: dark }}>{comparisonData.topic}</h2>
              <p style={{ margin: "0 0 18px", fontSize: 13, color: "#5a4a2a", fontStyle: "italic", lineHeight: 1.7 }}>{comparisonData.summary}</p>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                  <thead>
                    <tr>
                      <th style={{ padding: "10px 14px", background: dark, color: cream, textAlign: "left", fontSize: 12, minWidth: 110 }}>Aspect</th>
                      {visibleTraditions.map(t => <th key={t} style={{ padding: "10px 14px", background: COLORS[t].header, color: "#fff", textAlign: "left", fontSize: 12, minWidth: 155 }}>{t}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonData.rows.map((row, i) => (
                      <tr key={i} style={{ background: i % 2 === 0 ? "#fff" : cream }}>
                        <td style={{ padding: "12px 14px", fontWeight: "bold", fontSize: 12, color: dark, borderRight: "2px solid " + border, verticalAlign: "top", background: light }}>{row.aspect}</td>
                        {visibleTraditions.map(t => {
                          const cell = row[t]; const c = COLORS[t];
                          return <td key={t} style={{ padding: "12px 14px", verticalAlign: "top", borderRight: "1px solid #ede8dc" }}>{cell ? <div><div style={{ fontSize: 12, color: dark, lineHeight: 1.6, marginBottom: 3 }}>{cell.position}</div>{cell.citation && <div style={{ fontSize: 11, fontWeight: "bold", color: c.header }}>{cell.citation}</div>}</div> : <span style={{ color: "#ccc" }}>-</span>}</td>;
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* BROWSE MODE */}
      {mode === "browse" && (
        <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>

          {/* Confession list */}
          <div style={{ width: 200, borderRight: "2px solid " + border, overflowY: "auto", background: light, flexShrink: 0 }}>
            <div style={{ padding: "12px 16px", borderBottom: "1px solid " + border, background: "#ede8dc", fontSize: 11, fontWeight: "bold", color: mid, letterSpacing: 1, textTransform: "uppercase" }}>Confessions</div>
            {confessionNames.map(name => {
              const conf = CONFESSIONS[name];
              const c = COLORS[conf.tradition];
              const active = selectedConfession === name;
              return (
                <div key={name} onClick={() => { setSelectedConfession(name); setSelectedChapter(null); }} style={{ padding: "10px 14px", borderBottom: "1px solid " + border, cursor: "pointer", background: active ? c.bg : "transparent", borderLeft: active ? "3px solid " + c.border : "3px solid transparent" }}>
                  <div style={{ fontSize: 12, fontWeight: "bold", color: active ? c.text : dark, lineHeight: 1.4 }}>{name}</div>
                  <div style={{ fontSize: 10, color: mid, marginTop: 2 }}>{conf.tradition} - {conf.year}</div>
                </div>
              );
            })}
          </div>

          {/* Chapter list */}
          {currentConfession && (
            <div style={{ width: 200, borderRight: "2px solid " + border, overflowY: "auto", background: "#fff", flexShrink: 0 }}>
              <div style={{ padding: "12px 16px", borderBottom: "1px solid " + border, background: "#ede8dc", fontSize: 11, fontWeight: "bold", color: mid, letterSpacing: 1, textTransform: "uppercase" }}>Chapters</div>
              {currentConfession.chapters.map((ch, idx) => {
                const active = selectedChapter === idx;
                const c = COLORS[currentConfession.tradition];
                return (
                  <div key={idx} onClick={() => setSelectedChapter(idx)} style={{ padding: "10px 14px", borderBottom: "1px solid " + border, cursor: "pointer", background: active ? c.bg : "transparent", borderLeft: active ? "3px solid " + c.border : "3px solid transparent" }}>
                    <div style={{ fontSize: 11, color: mid, marginBottom: 2 }}>Chapter {ch.number}</div>
                    <div style={{ fontSize: 12, fontWeight: active ? "bold" : "normal", color: active ? c.text : dark, lineHeight: 1.4 }}>{ch.title}</div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Section text + commentary */}
          <div style={{ flex: 1, overflowY: "auto", padding: "24px 28px" }}>
            {!selectedConfession && (
              <div style={{ textAlign: "center", padding: "60px 20px", color: mid }}>
                <p style={{ fontSize: 17, color: "#5a4a2a", marginBottom: 8 }}>Browse the Confession Texts</p>
                <p style={{ fontSize: 13, lineHeight: 1.7 }}>Select a confession from the left to read the original text. Click any section to get AI commentary on its historical context and theological significance.</p>
              </div>
            )}
            {selectedConfession && !selectedChapter === true && selectedChapter !== 0 && (
              <div style={{ textAlign: "center", padding: "60px 20px", color: mid }}>
                <p style={{ fontSize: 15, color: "#5a4a2a" }}>Select a chapter to begin reading</p>
              </div>
            )}
            {currentChapter && (
              <div>
                <div style={{ marginBottom: 24 }}>
                  <div style={{ fontSize: 11, color: mid, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>{selectedConfession} - {currentConfession.year}</div>
                  <h2 style={{ margin: "0 0 4px", fontSize: 20, color: dark }}>Chapter {currentChapter.number}</h2>
                  <h3 style={{ margin: 0, fontSize: 15, color: "#5a4a2a", fontWeight: "normal" }}>{currentChapter.title}</h3>
                </div>
                {currentChapter.sections.map((section) => {
                  const key = selectedConfession + "-" + currentChapter.title + "-" + section.number;
                  const hasCommentary = commentary[key];
                  const isLoading = commentaryLoading === key;
                  return (
                    <div key={section.number} style={{ marginBottom: 28, paddingBottom: 28, borderBottom: "1px solid " + border }}>
                      <div style={{ fontSize: 11, fontWeight: "bold", color: COLORS[currentConfession.tradition].header, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>Section {section.number}</div>
                      <p style={{ fontSize: 15, lineHeight: 1.85, color: dark, margin: "0 0 12px", fontStyle: "italic" }}>{section.text}</p>
                      {!hasCommentary && !isLoading && (
                        <button onClick={() => getCommentary(selectedConfession, currentChapter.title, section.number, section.text)} style={{ padding: "4px 12px", background: "#fff", border: "1px solid " + border, borderRadius: 6, fontSize: 12, color: mid, cursor: "pointer", fontFamily: "Georgia, serif" }}>
                          Get Commentary
                        </button>
                      )}
                      {isLoading && <div style={{ fontSize: 12, color: mid, fontStyle: "italic" }}>Loading commentary...</div>}
                      {hasCommentary && (
                        <div style={{ marginTop: 10, padding: "12px 14px", background: light, borderRadius: 8, borderLeft: "3px solid " + COLORS[currentConfession.tradition].border }}>
                          <div style={{ fontSize: 10, fontWeight: "bold", color: mid, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>Commentary</div>
                          <div style={{ fontSize: 13, color: dark, lineHeight: 1.7 }}>{hasCommentary}</div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* NOTEBOOK MODE */}
      {mode === "notebook" && (
        <div style={{ flex: 1, overflowY: "auto", padding: "20px 28px" }}>
          {/* Add Note Panel */}
          <div style={{ marginBottom: 24 }}>
            {!addingNewNote ? (
              <button onClick={() => setAddingNewNote(true)} style={{ padding: "8px 20px", background: gold, color: dark, border: "none", borderRadius: 8, fontSize: 13, fontWeight: "bold", cursor: "pointer", fontFamily: "Georgia, serif" }}>+ Add Note</button>
            ) : (
              <div style={{ background: "#fff", border: "1px solid " + border, borderRadius: 10, padding: "16px 18px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
                <div style={{ fontSize: 12, fontWeight: "bold", color: mid, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>New Note</div>
                <textarea
                  style={{ width: "100%", padding: "10px", fontSize: 14, fontFamily: "Georgia, serif", border: "1px solid " + border, borderRadius: 6, color: dark, resize: "vertical", outline: "none", minHeight: 100, boxSizing: "border-box" }}
                  value={newNoteText}
                  onChange={(e) => setNewNoteText(e.target.value)}
                  placeholder="Write your note, reflection, or observation..."
                  autoFocus
                />
                <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                  <button onClick={addStandaloneNote} style={{ padding: "6px 18px", background: gold, color: dark, border: "none", borderRadius: 6, fontSize: 13, cursor: "pointer", fontFamily: "Georgia, serif", fontWeight: "bold" }}>Save Note</button>
                  <button onClick={() => { setAddingNewNote(false); setNewNoteText(""); }} style={{ padding: "6px 14px", background: "#fff", color: mid, border: "1px solid " + border, borderRadius: 6, fontSize: 13, cursor: "pointer", fontFamily: "Georgia, serif" }}>Cancel</button>
                </div>
              </div>
            )}
          </div>

          {entries.length === 0 ? (
            <div style={{ textAlign: "center", padding: "40px 20px", color: mid }}>
              <p style={{ fontSize: 17, color: "#5a4a2a", marginBottom: 8 }}>Your research notebook is empty</p>
              <p style={{ fontSize: 13 }}>Click <strong>+ Add Note</strong> to write your own notes, or ask a question in Research mode and click Save to Notebook.</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h2 style={{ margin: 0, fontSize: 18, color: dark }}>Research Notebook</h2>
                <span style={{ fontSize: 12, color: mid }}>{entries.length} saved {entries.length === 1 ? "entry" : "entries"}</span>
              </div>
              {entries.map((entry) => (
                <div key={entry.id} style={{ background: "#fff", border: "1px solid " + border, borderRadius: 10, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
                  <div style={{ padding: "12px 18px", background: light, borderBottom: "1px solid " + border, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ fontSize: 12, color: mid }}>{entry.date}</div>
                      {entry.isStandalone && <span style={{ fontSize: 10, padding: "2px 8px", background: "#fffdf5", border: "1px solid " + border, borderRadius: 10, color: mid, letterSpacing: 1, textTransform: "uppercase" }}>Note</span>}
                    </div>
                    <button onClick={() => deleteEntry(entry.id)} style={{ background: "transparent", border: "none", color: "#cc6666", fontSize: 12, cursor: "pointer", fontFamily: "Georgia, serif" }}>Delete</button>
                  </div>
                  <div style={{ padding: "14px 18px" }}>
                    {entry.isStandalone ? (
                      <div>
                        {editingId === entry.id ? (
                          <div>
                            <textarea style={{ width: "100%", padding: "10px", fontSize: 14, fontFamily: "Georgia, serif", border: "1px solid " + border, borderRadius: 6, color: dark, resize: "vertical", outline: "none", minHeight: 80, boxSizing: "border-box" }} value={editingNote} onChange={(e) => setEditingNote(e.target.value)} autoFocus />
                            <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                              <button onClick={() => saveNote(entry.id)} style={{ padding: "5px 16px", background: gold, color: dark, border: "none", borderRadius: 6, fontSize: 13, cursor: "pointer", fontFamily: "Georgia, serif", fontWeight: "bold" }}>Save</button>
                              <button onClick={() => { setEditingId(null); setEditingNote(""); }} style={{ padding: "5px 16px", background: "#fff", color: mid, border: "1px solid " + border, borderRadius: 6, fontSize: 13, cursor: "pointer", fontFamily: "Georgia, serif" }}>Cancel</button>
                            </div>
                          </div>
                        ) : (
                          <div>
                            <div style={{ fontSize: 14, color: dark, lineHeight: 1.75, whiteSpace: "pre-wrap", marginBottom: 10 }}>{entry.note}</div>
                            <button onClick={() => { setEditingId(entry.id); setEditingNote(entry.note); }} style={{ padding: "5px 14px", background: "#fff", border: "1px solid " + border, borderRadius: 6, fontSize: 12, color: mid, cursor: "pointer", fontFamily: "Georgia, serif" }}>Edit Note</button>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div>
                        <div style={{ fontSize: 12, fontWeight: "bold", color: mid, textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>Question</div>
                        <div style={{ fontSize: 14, color: dark, marginBottom: 14, fontStyle: "italic" }}>{entry.question}</div>
                        <div style={{ fontSize: 12, fontWeight: "bold", color: mid, textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>Response</div>
                        <div style={{ fontSize: 14, color: dark, lineHeight: 1.75, whiteSpace: "pre-wrap", marginBottom: 14 }}>{entry.answer}</div>
                        <div style={{ fontSize: 12, fontWeight: "bold", color: mid, textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>Your Notes</div>
                        {editingId === entry.id ? (
                          <div>
                            <textarea style={{ width: "100%", padding: "10px", fontSize: 14, fontFamily: "Georgia, serif", border: "1px solid " + border, borderRadius: 6, color: dark, resize: "vertical", outline: "none", minHeight: 80, boxSizing: "border-box" }} value={editingNote} onChange={(e) => setEditingNote(e.target.value)} placeholder="Add your own notes, reflections, or follow-up questions..." autoFocus />
                            <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                              <button onClick={() => saveNote(entry.id)} style={{ padding: "5px 16px", background: gold, color: dark, border: "none", borderRadius: 6, fontSize: 13, cursor: "pointer", fontFamily: "Georgia, serif", fontWeight: "bold" }}>Save Note</button>
                              <button onClick={() => { setEditingId(null); setEditingNote(""); }} style={{ padding: "5px 16px", background: "#fff", color: mid, border: "1px solid " + border, borderRadius: 6, fontSize: 13, cursor: "pointer", fontFamily: "Georgia, serif" }}>Cancel</button>
                            </div>
                          </div>
                        ) : (
                          <div>
                            {entry.note && <div style={{ padding: "8px 10px", border: "1px solid " + border, borderRadius: 6, fontSize: 14, color: dark, lineHeight: 1.6, whiteSpace: "pre-wrap", marginBottom: 8, background: "#fffdf5" }}>{entry.note}</div>}
                            <button onClick={() => { setEditingId(entry.id); setEditingNote(entry.note); }} style={{ padding: "5px 14px", background: "#fff", border: "1px solid " + border, borderRadius: 6, fontSize: 12, color: mid, cursor: "pointer", fontFamily: "Georgia, serif" }}>{entry.note ? "Edit Note" : "+ Add a Note"}</button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
