export const ALL_TRADITIONS = ["Reformed", "Lutheran", "Catholic", "Baptist", "Ecumenical", "Orthodox", "Anglican"];

export const COLORS = {
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
// These are real texts from public domain confession texts.
// Each confession has chapters, each chapter has sections.
// ============================================================
export const CONFESSIONS = {
  "Westminster Confession of Faith": {
    tradition: "Reformed",
    year: "1647",
    chapters: [
      {
        number: 1,
        title: "Of the Holy Scripture",
        sections: [
          { number: 1, text: "Although the light of nature, and the works of creation and providence, do so far manifest the goodness, wisdom, and power of God, as to leave men unexcusable; yet are they not sufficient to give that knowledge of God, and of his will, which is necessary unto salvation: therefore it pleased the Lord, at sundry times, and in divers manners, to reveal himself, and to declare that his will unto his Church; and afterwards, for the better preserving and propagating of the truth, and for the more sure establishment and comfort of the Church against the corruption of the flesh, and the malice of Satan and of the world, to commit the same wholly unto writing; which maketh the holy Scripture to be most necessary; those former ways of God\'s revealing his will unto his people being now ceased." },
          { number: 2, text: "Under the name of holy Scripture, or the Word of God written, are now contained all the Books of the Old and New Testament, which are these: Of the Old Testament: Genesis, Exodus, Leviticus, Numbers, Deuteronomy, Joshua, Judges, Ruth, I Samuel, II Samuel, I Kings, II Kings, I Chronicles, II Chronicles, Ezra, Nehemiah, Esther, Job, Psalms, Proverbs, Ecclesiastes, The Song of Songs, Isaiah, Jeremiah, Lamentations, Ezekiel, Daniel, Hosea, Joel, Amos, Obadiah, Jonah, Micah, Nahum, Habakkuk, Zephaniah, Haggai, Zechariah, Malachi. Of the New Testament: The Gospels according to Matthew, Mark, Luke, John, The Acts of the Apostles, Paul\'s Epistles to the Romans, Corinthians I, Corinthians II, Galatians, Ephesians, Philippians, Colossians, Thessalonians I, Thessalonians II, To Timothy I, To Timothy II, To Titus, To Philemon, The Epistle to the Hebrews, The Epistle of James, The first and second Epistles of Peter, The first, second, and third Epistles of John, The Epistle of Jude, The Revelation of John. All which are given by inspiration of God, to be the rule of faith and life." },
          { number: 3, text: "The books commonly called Apocrypha, not being of divine inspiration, are no part of the Canon of Scripture; and therefore are of no authority in the Church of God, nor to be any otherwise approved, or made use of, than other human writings." },
          { number: 4, text: "The authority of the holy Scripture, for which it ought to be believed and obeyed, dependeth not upon the testimony of any man or Church, but wholly upon God (who is truth itself), the author thereof; and therefore it is to be received, because it is the Word of God." },
          { number: 5, text: "We may be moved and induced by the testimony of the Church to an high and reverent esteem of the holy Scripture; and the heavenliness of the matter, the efficacy of the doctrine, the majesty of the style, the consent of all the parts, the scope of the whole (which is to give all glory to God), the full discovery it makes of the only way of man\'s salvation, the many other incomparable excellencies, and the entire perfection thereof, are arguments whereby it doth abundantly evidence itself to be the Word of God; yet, notwithstanding, our full persuasion and assurance of the infallible truth and divine authority thereof, is from the inward work of the Holy Spirit, bearing witness by and with the Word in our hearts." },
          { number: 6, text: "The whole counsel of God, concerning all things necessary for his own glory, man\'s salvation, faith and life, is either expressly set down in Scripture, or by good and necessary consequence may be deduced from Scripture: unto which nothing at any time is to be added, whether by new revelations of the Spirit, or traditions of men. Nevertheless we acknowledge the inward illumination of the Spirit of God to be necessary for the saving understanding of such things as are revealed in the Word; and that there are some circumstances concerning the worship of God, and government of the Church, common to human actions and societies, which are to be ordered by the light of nature and Christian prudence, according to the general rules of the Word, which are always to be observed." },
          { number: 7, text: "All things in Scripture are not alike plain in themselves, nor alike clear unto all; yet those things which are necessary to be known, believed, and observed, for salvation, are so clearly propounded and opened in some place of Scripture or other, that not only the learned, but the unlearned, in a due use of the ordinary means, may attain unto a sufficient understanding of them." },
          { number: 8, text: "The Old Testament in Hebrew (which was the native language of the people of God of old), and the New Testament in Greek (which at the time of the writing of it was most generally known to the nations), being immediately inspired by God, and by his singular care and providence kept pure in all ages, are therefore authentical; so as in all controversies of religion the Church is finally to appeal unto them. But because these original tongues are not known to all the people of God who have right unto, and interest in, the Scriptures, and are commanded, in the fear of God, to read and search them, therefore they are to be translated into the vulgar language of every nation unto which they come, that the Word of God dwelling plentifully in all, they may worship him in an acceptable manner, and, through patience and comfort of the Scriptures, may have hope." },
          { number: 9, text: "The infallible rule of interpretation of Scripture is the Scripture itself; and therefore, when there is a question about the true and full sense of any Scripture (which is not manifold, but one), it must be searched and known by other places that speak more clearly." },
          { number: 10, text: "The Supreme Judge, by which all controversies of religion are to be determined, and all decrees of councils, opinions of ancient writers, doctrines of men, and private spirits, are to be examined, and in whose sentence we are to rest, can be no other but the Holy Spirit speaking in the Scripture." }
        ]
      },
      {
        number: 2,
        title: "Of God, and of the Holy Trinity",
        sections: [
          { number: 1, text: "There is but one only living and true God, who is infinite in being and perfection, a most pure spirit, invisible, without body, parts, or passions, immutable, immense, eternal, incomprehensible, almighty, most wise, most holy, most free, most absolute, working all things according to the counsel of his own immutable and most righteous will, for his own glory; most loving, gracious, merciful, long-suffering, abundant in goodness and truth, forgiving iniquity, transgression, and sin; the rewarder of them that diligently seek him; and withal most just and terrible in his judgments; hating all sin, and who will by no means clear the guilty." },
          { number: 2, text: "God hath all life, glory, goodness, blessedness, in and of himself; and is alone in and unto himself all-sufficient, not standing in need of any creatures which he hath made, nor deriving any glory from them, but only manifesting his own glory in, by, unto, and upon them: he is the alone fountain of all being, of whom, through whom, and to whom are all things; and hath most sovereign dominion over them, to do by them, for them, or upon them, whatsoever himself pleaseth. In his sight all things are open and manifest; his knowledge is most holy, most free, most ample, and infallible; and his most holy will is most righteous. In him is most sovereign dominion over all his creatures, to do by them, for them, or upon them, whatsoever himself pleaseth. He is most loving, gracious, merciful, long-suffering, abundant in goodness and truth, forgiving iniquity, transgression, and sin; the rewarder of them that diligently seek him. His judgments are most holy and most just, and he hath most sovereign dominion over them all. He only is holy, most free, most absolute, working all things according to the counsel of his own immutable and most righteous will, for his own glory; most holy in all his counsels, in all his works, and in all his commands; unto whom is due from angels and men, and every other creature, whatsoever worship, service, or obedience, he is pleased to require of them." },
          { number: 3, text: "In the unity of the Godhead there be three Persons of one substance, power, and eternity: God the Father, God the Son, and God the Holy Ghost. The Father is of none, neither begotten nor proceeding; the Son is eternally begotten of the Father; the Holy Ghost eternally proceeding from the Father and the Son." }
        ]
      },
      {
        number: 3,
        title: "Of God's Eternal Decree",
        sections: [
          { number: 1, text: "God from all eternity did by the most wise and holy counsel of his own will, freely and unchangeably ordain whatsoever comes to pass; yet so as thereby neither is God the author of sin, nor is violence offered to the will of the creatures, nor is the liberty or contingency of second causes taken away, but rather established." },
          { number: 2, text: "Although God knows whatsoever may or can come to pass, upon all supposed conditions; yet hath he not decreed any thing because he foresaw it as future, or as that which would come to pass, upon such conditions." },
          { number: 3, text: "By the decree of God, for the manifestation of his glory, some men and angels are predestinated unto everlasting life, and others foreordained to everlasting death." },
          { number: 4, text: "These angels and men, thus predestinated and foreordained, are particularly and unchangeably designed; and their number is so certain and definite, that it cannot be either increased or diminished." },
          { number: 5, text: "Those of mankind that are predestinated unto life, God, before the foundation of the world was laid, according to his eternal and immutable purpose, and the secret counsel and good pleasure of his will, hath chosen in Christ, unto everlasting glory, out of his mere free grace and love, without any foresight of faith or good works, or perseverance in either of them, or any other thing in the creature, as conditions, or causes moving him thereunto; and all to the praise of his glorious grace." },
          { number: 6, text: "As God hath appointed the elect unto glory, so hath he, by the eternal and most free purpose of his will, foreordained all the means thereunto. Wherefore they who are elected being fallen in Adam are redeemed by Christ, are effectually called unto faith in Christ by his Spirit working in due season; are justified, adopted, sanctified, and kept by his power through faith unto salvation. Neither are any other redeemed by Christ, effectually called, justified, adopted, sanctified, and saved, but the elect only." },
          { number: 7, text: "The rest of mankind, God was pleased, according to the unsearchable counsel of his own will, whereby he extendeth or withholdeth mercy as he pleaseth, for the glory of his sovereign power over his creatures, to pass by, and to ordain them to dishonor and wrath for their sin, to the praise of his glorious justice." },
          { number: 8, text: "The doctrine of this high mystery of predestination is to be handled with special prudence and care, that men attending the will of God revealed in his Word, and yielding obedience thereunto, may, from the certainty of their effectual vocation, be assured of their eternal election. So shall this doctrine afford matter of praise, reverence, and admiration of God; and of humility, diligence, and abundant consolation to all that sincerely obey the gospel." }
        ]
      },
      {
        number: 4,
        title: "Of Creation",
        sections: [
          { number: 1, text: "It pleased God the Father, Son, and Holy Ghost, for the manifestation of the glory of his eternal power, wisdom, and goodness, in the beginning, to create or make of nothing the world, and all things therein, whether visible or invisible, in the space of six days, and all very good." },
          { number: 2, text: "After God had made all other creatures, he created man, male and female, with reasonable and immortal souls, endued with knowledge, righteousness, and true holiness after his own image, having the law of God written in their hearts, and power to fulfil it; and yet under a possibility of transgressing, being left to the liberty of their own will, which was subject unto change. Besides this law written in their hearts, they received a command not to eat of the tree of the knowledge of good and evil; which while they kept they were happy in their communion with God, and had dominion over the creatures." }
        ]
      },
      {
        number: 5,
        title: "Of Providence",
        sections: [
          { number: 1, text: "God, the great Creator of all things, doth uphold, direct, dispose, and govern all creatures, actions, and things, from the greatest even to the least, by his most wise and holy providence, according to his infallible foreknowledge, and the free and immutable counsel of his own will, to the praise of the glory of his wisdom, power, justice, goodness, and mercy." },
          { number: 2, text: "Although in relation to the foreknowledge and decree of God, the first cause, all things come to pass immutably and infallibly; yet, by the same providence, he ordereth them to fall out according to the nature of second causes, either necessarily, freely, or contingently." },
          { number: 3, text: "God, in his ordinary providence, maketh use of means, yet is free to work without, above, and against them, at his pleasure." },
          { number: 4, text: "The almighty power, unsearchable wisdom, and infinite goodness of God so far manifest themselves in his providence, that it extendeth itself even to the first fall, and all other sins of angels and men, and that not by a bare permission, but such as hath joined with it a most wise and powerful bounding, and otherwise ordering and governing of them, in a manifold dispensation, to his own holy ends; yet so as the sinfulness thereof proceedeth only from the creature, and not from God; who being most holy and righteous, neither is nor can be the author or approver of sin." },
          { number: 5, text: "The most wise, righteous, and gracious God doth oftentimes leave for a season his own children to manifold temptations and the corruption of their own hearts, to chastise them for their former sins, or to discover unto them the hidden strength of corruption and deceitfulness of their hearts, that they may be humbled; and to raise them to a more close and constant dependence for their support upon himself, and to make them more watchful against all future occasions of sin, and for sundry other just and holy ends." },
          { number: 6, text: "As for those wicked and ungodly men whom God, as a righteous judge, for former sins doth blind and harden: from them he not only withholdeth his grace, whereby they might have been enlightened in their understandings and wrought upon in their hearts; but sometimes also withdraweth the gifts which they had, and exposeth them to such objects as their corruption makes occasion of sin; and withal, gives them over to their own lusts, the temptations of the world, and the power of Satan; whereby it comes to pass that they harden themselves, even under those means which God useth for the softening of others." },
          { number: 7, text: "As the providence of God doth, in general, reach to all creatures; so, after a most special manner, it taketh care of his Church, and disposeth all things to the good thereof." }
        ]
      },
      {
        number: 6,
        title: "Of the Fall of Man, of Sin, and of the Punishment Thereof",
        sections: [
          { number: 1, text: "Our first parents, being seduced by the subtilty and temptation of Satan, sinned in eating the forbidden fruit. This their sin God was pleased, according to his wise and holy counsel, to permit, having purposed to order it to his own glory." },
          { number: 2, text: "By this sin they fell from their original righteousness and communion with God, and so became dead in sin, and wholly defiled in all the faculties and parts of soul and body." },
          { number: 3, text: "They being the root of all mankind, the guilt of this sin was imputed, and the same death in sin and corrupted nature conveyed to all their posterity descending from them by ordinary generation." },
          { number: 4, text: "From this original corruption, whereby we are utterly indisposed, disabled, and made opposite to all good, and wholly inclined to all evil, do proceed all actual transgressions." },
          { number: 5, text: "This corruption of nature, during this life, doth remain in those that are regenerated; and although it be through Christ pardoned and mortified, yet both itself, and all the motions thereof, are truly and properly sin." },
          { number: 6, text: "Every sin, both original and actual, being a transgression of the righteous law of God, and contrary thereunto, doth, in its own nature, bring guilt upon the sinner, whereby he is bound over to the wrath of God, and curse of the law, and so made subject to death, with all miseries spiritual, temporal, and eternal." }
        ]
      },
      {
        number: 7,
        title: "Of God's Covenant with Man",
        sections: [
          { number: 1, text: "The distance between God and the creature is so great, that although reasonable creatures do owe obedience unto him as their Creator, yet they could never have any fruition of him as their blessedness and reward, but by some voluntary condescension on God\'s part, which he hath been pleased to express by way of covenant." },
          { number: 2, text: "The first covenant made with man was a covenant of works, wherein life was promised to Adam, and in him to his posterity, upon condition of perfect and personal obedience." },
          { number: 3, text: "Man by his fall having made himself incapable of life by that covenant, the Lord was pleased to make a second, commonly called the covenant of grace: wherein he freely offereth unto sinners life and salvation by Jesus Christ, requiring of them faith in him, that they may be saved; and promising to give unto all those that are ordained unto life, his Holy Spirit, to make them willing and able to believe." },
          { number: 4, text: "This covenant of grace is frequently set forth in the Scripture by the name of a testament, in reference to the death of Jesus Christ the testator, and to the everlasting inheritance, with all things belonging to it, therein bequeathed." },
          { number: 5, text: "This covenant was differently administered in the time of the law, and in the time of the gospel: under the law it was administered by promises, prophecies, sacrifices, circumcision, the paschal lamb, and other types and ordinances delivered to the people of the Jews, all fore-signifying Christ to come, which were for that time sufficient and efficacious, through the operation of the Spirit, to instruct and build up the elect in faith in the promised Messiah, by whom they had full remission of sins, and eternal salvation, and is called the Old Testament." },
          { number: 6, text: "Under the gospel, when Christ the substance was exhibited, the ordinances in which this covenant is dispensed are the preaching of the Word, and the administration of the sacraments of Baptism and the Lord\'s Supper; which, though fewer in number, and administered with more simplicity and less outward glory, yet in them it is held forth in more fullness, evidence, and spiritual efficacy, to all nations, both Jews and Gentiles; and is called the New Testament. There are not therefore two covenants of grace differing in substance, but one and the same under various dispensations." }
        ]
      },
      {
        number: 8,
        title: "Of Christ the Mediator",
        sections: [
          { number: 1, text: "It pleased God, in his eternal purpose, to choose and ordain the Lord Jesus, his only-begotten Son, to be the Mediator between God and man, the Prophet, Priest, and King; the Head and Savior of his Church, the Heir of all things, and Judge of the world; unto whom he did, from all eternity, give a people to be his seed, and to be by him in time redeemed, called, justified, sanctified, and glorified." },
          { number: 2, text: "The Son of God, the second Person in the Trinity, being very and eternal God, of one substance, and equal with the Father, did, when the fullness of time was come, take upon him man\'s nature, with all the essential properties and common infirmities thereof, yet without sin: being conceived by the power of the Holy Ghost in the womb of the Virgin Mary, of her substance. So that two whole, perfect, and distinct natures, the Godhead and the manhood, were inseparably joined together in one person, without conversion, composition, or confusion. Which person is very God and very man, yet one Christ, the only Mediator between God and man." },
          { number: 3, text: "The Lord Jesus in his human nature thus united to the divine, was sanctified and anointed with the Holy Spirit above measure; having in him all the treasures of wisdom and knowledge, in whom it pleased the Father that all fullness should dwell: to the end that being holy, harmless, undefiled, and full of grace and truth, he might be throughly furnished to execute the office of a Mediator and Surety. Which office he took not unto himself, but was thereunto called by his Father; who put all power and judgment into his hand, and gave him commandment to execute the same." },
          { number: 4, text: "This office the Lord Jesus did most willingly undertake, which, that he might discharge, he was made under the law, and did perfectly fulfil it; endured most grievous torments immediately in his soul, and most painful sufferings in his body; was crucified and died; was buried, and remained under the power of death, yet saw no corruption. On the third day he arose from the dead, with the same body in which he suffered; with which also he ascended into heaven, and there sitteth at the right hand of his Father, making intercession; and shall return to judge men and angels, at the end of the world." },
          { number: 5, text: "The Lord Jesus, by his perfect obedience and sacrifice of himself, which he through the eternal Spirit once offered up unto God, hath fully satisfied the justice of his Father; and purchased not only reconciliation, but an everlasting inheritance in the kingdom of heaven, for all those whom the Father hath given unto him." },
          { number: 6, text: "Although the work of redemption was not actually wrought by Christ till after his incarnation, yet the virtue, efficacy, and benefits thereof were communicated unto the elect, in all ages successively from the beginning of the world, in and by those promises, types, and sacrifices wherein he was revealed, and signified to be the seed of the woman, which should bruise the serpent\'s head, and the Lamb slain from the beginning of the world, being yesterday and today the same and forever." },
          { number: 7, text: "Christ, in the work of mediation, acteth according to both natures; by each nature doing that which is proper to itself; yet by reason of the unity of the person, that which is proper to one nature is sometimes in Scripture attributed to the person denominated by the other nature." },
          { number: 8, text: "To all those for whom Christ hath purchased redemption, he doth certainly and effectually apply and communicate the same; making intercession for them; and revealing unto them, in and by the Word, the mysteries of salvation; effectually persuading them by his Spirit to believe and obey; and governing their hearts by his Word and Spirit; overcoming all their enemies by his almighty power and wisdom, in such manner and ways as are most consonant to his wonderful and unsearchable dispensation." }
        ]
      },
      {
        number: 9,
        title: "Of Free Will",
        sections: [
          { number: 1, text: "God hath endued the will of man with that natural liberty, that it is neither forced, nor by any absolute necessity of nature determined to good or evil." },
          { number: 2, text: "Man, in his state of innocency, had freedom and power to will and to do that which is good and well-pleasing to God; but yet mutably, so that he might fall from it." },
          { number: 3, text: "Man, by his fall into a state of sin, hath wholly lost all ability of will to any spiritual good accompanying salvation; so as a natural man, being altogether averse from that good, and dead in sin, is not able, by his own strength, to convert himself, or to prepare himself thereunto." },
          { number: 4, text: "When God converts a sinner and translates him into the state of grace, he freeth him from his natural bondage under sin, and by his grace alone enables him freely to will and to do that which is spiritually good; yet so as that, by reason of his remaining corruption, he doth not perfectly, nor only, will that which is good, but doth also will that which is evil." },
          { number: 5, text: "The will of man is made perfectly and immutably free to good alone, in the state of glory only." }
        ]
      },
      {
        number: 10,
        title: "Of Effectual Calling",
        sections: [
          { number: 1, text: "All those whom God hath predestinated unto life, and those only, he is pleased, in his appointed and accepted time, effectually to call, by his Word and Spirit, out of that state of sin and death in which they are by nature, to grace and salvation by Jesus Christ: enlightening their minds, spiritually and savingly, to understand the things of God; taking away their heart of stone, and giving unto them an heart of flesh; renewing their wills, and by his almighty power determining them to that which is good; and effectually drawing them to Jesus Christ; yet so as they come most freely, being made willing by his grace." },
          { number: 2, text: "This effectual call is of God\'s free and special grace alone, not from any thing at all foreseen in man, who is altogether passive therein, until, being quickened and renewed by the Holy Spirit, he is thereby enabled to answer this call, and to embrace the grace offered and conveyed in it." },
          { number: 3, text: "Elect infants dying in infancy are regenerated and saved by Christ through the Spirit, who worketh when, and where, and how he pleaseth. So also are all other elect persons who are incapable of being outwardly called by the ministry of the Word." },
          { number: 4, text: "Others, not elected, although they may be called by the ministry of the Word, and may have some common operations of the Spirit, yet they never truly come unto Christ, and therefore cannot be saved: much less can men, not professing the Christian religion, be saved in any other way whatsoever, be they never so diligent to frame their lives according to the light of nature, and the law of that religion they do profess; and to assert and maintain that they may, is very pernicious, and to be detested." }
        ]
      },
      {
        number: 11,
        title: "Of Justification",
        sections: [
          { number: 1, text: "Those whom God effectually calleth, he also freely justifieth: not by infusing righteousness into them, but by pardoning their sins, and by accounting and accepting their persons as righteous: not for any thing wrought in them, or done by them, but for Christ\'s sake alone: nor by imputing faith itself, the act of believing, or any other evangelical obedience, to them as their righteousness; but by imputing the obedience and satisfaction of Christ unto them, they receiving and resting on him and his righteousness by faith: which faith they have not of themselves; it is the gift of God." },
          { number: 2, text: "Faith, thus receiving and resting on Christ and his righteousness, is the alone instrument of justification; yet is it not alone in the person justified, but is ever accompanied with all other saving graces, and is no dead faith, but worketh by love." },
          { number: 3, text: "Christ, by his obedience and death, did fully discharge the debt of all those that are thus justified, and did make a proper, real, and full satisfaction to his Father\'s justice in their behalf. Yet inasmuch as he was given by the Father for them, and his obedience and satisfaction accepted in their stead, and both freely, not for any thing in them, their justification is only of free grace; that both the exact justice and rich grace of God might be glorified in the justification of sinners." },
          { number: 4, text: "God did from all eternity decree to justify all the elect; and Christ did, in the fullness of time, die for their sins and rise again for their justification: nevertheless they are not justified until the Holy Spirit doth, in due time, actually apply Christ unto them." },
          { number: 5, text: "God doth continue to forgive the sins of those that are justified; and although they can never fall from the state of justification, yet they may fall under God\'s fatherly displeasure, and not have the light of his countenance restored unto them, until they humble themselves, confess their sins, beg pardon, and renew their faith and repentance." },
          { number: 6, text: "The justification of believers under the Old Testament was, in all these respects, one and the same with the justification of believers under the New Testament." }
        ]
      },
      {
        number: 12,
        title: "Of Adoption",
        sections: [
          { number: 1, text: "All those that are justified, God vouchsafeth, in and for his only Son Jesus Christ, to make partakers of the grace of adoption; by which they are taken into the number, and enjoy the liberties and privileges of the children of God; have his name put upon them, receive the Spirit of adoption; have access to the throne of grace with boldness; are enabled to cry, Abba, Father; are pitied, protected, provided for, and chastened by him as by a Father; yet never cast off, but sealed to the day of redemption, and inherit the promises, as heirs of everlasting salvation." }
        ]
      },
      {
        number: 13,
        title: "Of Sanctification",
        sections: [
          { number: 1, text: "They who are effectually called and regenerated, having a new heart and a new spirit created in them, are further sanctified, really and personally, through the virtue of Christ\'s death and resurrection, by his Word and Spirit dwelling in them; the dominion of the whole body of sin is destroyed, and the several lusts thereof are more and more weakened and mortified, and they more and more quickened and strengthened in all saving graces, to the practice of true holiness, without which no man shall see the Lord." },
          { number: 2, text: "This sanctification is throughout in the whole man, yet imperfect in this life; there abideth still some remnants of corruption in every part, whence ariseth a continual and irreconcilable war; the flesh lusting against the Spirit, and the Spirit against the flesh." },
          { number: 3, text: "In which war, although the remaining corruption for a time may much prevail, yet, through the continual supply of strength from the sanctifying Spirit of Christ, the regenerate part doth overcome: and so the saints grow in grace, perfecting holiness in the fear of God." }
        ]
      },
      {
        number: 14,
        title: "Of Saving Faith",
        sections: [
          { number: 1, text: "The grace of faith, whereby the elect are enabled to believe to the saving of their souls, is the work of the Spirit of Christ in their hearts; and is ordinarily wrought by the ministry of the Word: by which also, and by the administration of the sacraments, and prayer, it is increased and strengthened." },
          { number: 2, text: "By this faith, a Christian believeth to be true whatsoever is revealed in the Word, for the authority of God himself speaking therein; and acteth differently upon that which each particular passage thereof containeth; yielding obedience to the commands, trembling at the threatenings, and embracing the promises of God for this life and that which is to come. But the principal acts of saving faith are, accepting, receiving, and resting upon Christ alone for justification, sanctification, and eternal life, by virtue of the covenant of grace." },
          { number: 3, text: "This faith is different in degrees, weak or strong; may be often and many ways assailed and weakened, but gets the victory; growing up in many to the attainment of a full assurance through Christ, who is both the author and finisher of our faith." }
        ]
      },
      {
        number: 15,
        title: "Of Repentance unto Life",
        sections: [
          { number: 1, text: "Repentance unto life is an evangelical grace, the doctrine whereof is to be preached by every minister of the gospel, as well as that of faith in Christ." },
          { number: 2, text: "By it a sinner, out of the sight and sense, not only of the danger, but also of the filthiness and odiousness of his sins, as contrary to the holy nature and righteous law of God, and upon the apprehension of his mercy in Christ to such as are penitent, so grieves for, and hates his sins, as to turn from them all unto God, purposing and endeavoring to walk with him in all the ways of his commandments." },
          { number: 3, text: "Although repentance be not to be rested in as any satisfaction for sin, or any cause of the pardon thereof, which is the act of God\'s free grace in Christ; yet it is of such necessity to all sinners, that none may expect pardon without it." },
          { number: 4, text: "As there is no sin so small but it deserves damnation; so there is no sin so great that it can bring damnation upon those who truly repent." },
          { number: 5, text: "Men ought not to content themselves with a general repentance, but it is every man\'s duty to endeavor to repent of his particular sins, particularly." },
          { number: 6, text: "As every man is bound to make private confession of his sins to God, praying for the pardon thereof; upon which, and the forsaking of them, he shall find mercy: so he that scandalizeth his brother, or the Church of Christ, ought to be willing, by a private or public confession and sorrow for his sin, to declare his repentance to those that are offended; who are thereupon to be reconciled to him, and in love to receive him." }
        ]
      },
      {
        number: 16,
        title: "Of Good Works",
        sections: [
          { number: 1, text: "Good works are only such as God hath commanded in his holy Word, and not such as, without the warrant thereof, are devised by men out of blind zeal, or upon any pretence of good intention." },
          { number: 2, text: "These good works, done in obedience to God\'s commandments, are the fruits and evidences of a true and lively faith: and by them believers manifest their thankfulness, strengthen their assurance, edify their brethren, adorn the profession of the gospel, stop the mouths of the adversaries, and glorify God, whose workmanship they are, created in Christ Jesus thereunto, that, having their fruit unto holiness, they may have the end, eternal life." },
          { number: 3, text: "Their ability to do good works is not at all of themselves, but wholly from the Spirit of Christ. And that they may be enabled thereunto, beside the graces they have already received, there is required an actual influence of the same Holy Spirit to work in them to will and to do of his good pleasure; yet are they not hereupon to grow negligent, as if they were not bound to perform any duty unless upon a special motion of the Spirit; but they ought to be diligent in stirring up the grace of God that is in them." },
          { number: 4, text: "They, who in their obedience, attain to the greatest height which is possible in this life, are so far from being able to supererogate and to do more than God requires, that they fall short of much which in duty they are bound to do." },
          { number: 5, text: "We cannot, by our best works, merit pardon of sin, or eternal life, at the hand of God, by reason of the great disproportion that is between them and the glory to come, and the infinite distance that is between us and God, whom by them we can neither profit, nor satisfy for the debt of our former sins; but when we have done all we can, we have done but our duty, and are unprofitable servants: and because, as they are good, they proceed from his Spirit; and as they are wrought by us, they are defiled and mixed with so much weakness and imperfection, that they cannot endure the severity of God\'s judgment." },
          { number: 6, text: "Yet notwithstanding, the persons of believers being accepted through Christ, their good works also are accepted in him; not as though they were in this life wholly unblameable and unreprovable in God\'s sight; but that he, looking upon them in his Son, is pleased to accept and reward that which is sincere, although accompanied with many weaknesses and imperfections." },
          { number: 7, text: "Works done by unregenerate men, although for the matter of them they may be things which God commands, and of good use both to themselves and others; yet because they proceed not from a heart purified by faith, nor are done in a right manner, according to the Word, nor to a right end, the glory of God; they are therefore sinful, and cannot please God, or make a man meet to receive grace from God: and yet their neglect of them is more sinful and displeasing unto God." }
        ]
      },
      {
        number: 17,
        title: "Of the Perseverance of the Saints",
        sections: [
          { number: 1, text: "They whom God hath accepted in his Beloved, effectually called and sanctified by his Spirit, can neither totally nor finally fall away from the state of grace; but shall certainly persevere therein to the end, and be eternally saved." },
          { number: 2, text: "This perseverance of the saints depends, not upon their own free-will, but upon the immutability of the decree of election, flowing from the free and unchangeable love of God the Father; upon the efficacy of the merit and intercession of Jesus Christ; the abiding of the Spirit and of the seed of God within them; and the nature of the covenant of grace; from all which ariseth also the certainty and infallibility thereof." },
          { number: 3, text: "Nevertheless they may, through the temptations of Satan and of the world, the prevalency of corruption remaining in them, and the neglect of the means of their preservation, fall into grievous sins; and for a time continue therein: whereby they incur God\'s displeasure, and grieve his Holy Spirit; come to be deprived of some measure of their graces and comforts; have their hearts hardened, and their consciences wounded; hurt and scandalize others, and bring temporal judgments upon themselves." }
        ]
      },
      {
        number: 18,
        title: "Of the Assurance of Grace and Salvation",
        sections: [
          { number: 1, text: "Although hypocrites, and other unregenerate men, may vainly deceive themselves with false hopes and carnal presumptions: of being in the favor of God and estate of salvation; which hope of theirs shall perish: yet such as truly believe in the Lord Jesus, and love him in sincerity, endeavoring to walk in all good conscience before him, may in this life be certainly assured that they are in a state of grace, and may rejoice in the hope of the glory of God: which hope shall never make them ashamed." },
          { number: 2, text: "This certainty is not a bare conjectural and probable persuasion, grounded upon a fallible hope; but an infallible assurance of faith, founded upon the divine truth of the promises of salvation, the inward evidence of those graces unto which these promises are made, the testimony of the Spirit of adoption witnessing with our spirits that we are the children of God: which Spirit is the earnest of our inheritance, whereby we are sealed to the day of redemption." },
          { number: 3, text: "This infallible assurance doth not so belong to the essence of faith, but that a true believer may wait long, and conflict with many difficulties before he be partaker of it: yet, being enabled by the Spirit to know the things which are freely given him of God, he may, without extraordinary revelation, in the right use of ordinary means, attain thereunto. And therefore it is the duty of everyone to give all diligence to make his calling and election sure; that thereby his heart may be enlarged in peace and joy in the Holy Ghost, in love and thankfulness to God, and in strength and cheerfulness in the duties of obedience; the proper fruits of this assurance: so far is it from inclining men to looseness." },
          { number: 4, text: "True believers may have the assurance of their salvation divers ways shaken, diminished, and intermitted; as, by negligence in preserving of it; by falling into some special sin, which woundeth the conscience, and grieveth the Spirit; by some sudden or vehement temptation; by God\'s withdrawing the light of his countenance, and suffering even such as fear him to walk in darkness and to have no light: yet are they never utterly destitute of that seed of God, and life of faith, that love of Christ and the brethren, that sincerity of heart and conscience of duty, out of which, by the operation of the Spirit, this assurance may in due time be revived, and by the which, in the mean time, they are supported from utter despair." }
        ]
      },
      {
        number: 19,
        title: "Of the Law of God",
        sections: [
          { number: 1, text: "God gave to Adam a law, as a covenant of works, by which he bound him and all his posterity to personal, entire, exact, and perpetual obedience; promised life upon the fulfilling, and threatened death upon the breach of it; and endued him with power and ability to keep it." },
          { number: 2, text: "This law, after his fall, continued to be a perfect rule of righteousness; and, as such, was delivered by God upon mount Sinai in ten commandments, and written in two tables: the first four commandments containing our duty toward God, and the other six our duty to man." },
          { number: 3, text: "Beside this law, commonly called moral, God was pleased to give to the people of Israel, as a Church under age, ceremonial laws, containing several typical ordinances; partly of worship, prefiguring Christ, his graces, actions, sufferings, and benefits; and partly holding forth divers instructions of moral duties. All which ceremonial laws are now abrogated under the New Testament." },
          { number: 4, text: "To them also, as a body politic, he gave sundry judicial laws, which expired together with the state of that people, not obliging any other now, further than the general equity thereof may require." },
          { number: 5, text: "The moral law doth forever bind all, as well justified persons as others, to the obedience thereof; and that not only in regard of the matter contained in it, but also in respect of the authority of God the Creator who gave it. Neither doth Christ in the gospel any way dissolve, but much strengthen, this obligation." },
          { number: 6, text: "Although true believers be not under the law as a covenant of works, to be thereby justified or condemned; yet is it of great use to them, as well as to others; in that, as a rule of life, informing them of the will of God and their duty, it directs and binds them to walk accordingly; discovering also the sinful pollutions of their natures, hearts, and lives; so as, examining themselves thereby, they may come to further conviction of, humiliation for, and hatred against, sin; together with a clearer sight of the need they have of Christ, and the perfection of his obedience. It is likewise of use to the regenerate, to restrain their corruptions, in that it forbids sin; and the threatenings of it serve to show what even their sins deserve, and what afflictions in this life they may expect for them, although freed from the curse thereof threatened in the law. The promises of it, in like manner, show them God\'s approbation of obedience, and what blessings they may expect upon the performance thereof; although not as due to them by the law as a covenant of works: so as a man\'s doing good, and refraining from evil, because the law encourageth to the one, and deterreth from the other, is no evidence of his being under the law, and not under grace." },
          { number: 7, text: "Neither are the aforementioned uses of the law contrary to the grace of the gospel, but do sweetly comply with it: the Spirit of Christ subduing and enabling the will of man to do that freely and cheerfully which the will of God, revealed in the law, requireth to be done." }
        ]
      },
      {
        number: 20,
        title: "Of Christian Liberty, and Liberty of Conscience",
        sections: [
          { number: 1, text: "The liberty which Christ hath purchased for believers under the gospel consists in their freedom from the guilt of sin, the condemning wrath of God, the curse of the moral law; and in their being delivered from this present evil world, bondage to Satan, and dominion of sin, from the evil of afflictions, the sting of death, the victory of the grave, and everlasting damnation; as also in their free access to God, and their yielding obedience unto him, not out of slavish fear, but a child-like love and a willing mind. All which were common also to believers under the law; but under the New Testament the liberty of Christians is further enlarged in their freedom from the yoke of the ceremonial law, to which the Jewish Church was subjected; and in greater boldness of access to the throne of grace, and in fuller communications of the free Spirit of God, than believers under the law did ordinarily partake of." },
          { number: 2, text: "God alone is Lord of the conscience, and hath left it free from the doctrines and commandments of men which are in any thing contrary to his Word, or beside it in matters of faith or worship. So that to believe such doctrines, or to obey such commands out of conscience, is to betray true liberty of conscience; and the requiring of an implicit faith, and an absolute and blind obedience, is to destroy liberty of conscience, and reason also." },
          { number: 3, text: "They who, upon pretence of Christian liberty, do practice any sin, or cherish any lust, do thereby destroy the end of Christian liberty; which is, that, being delivered out of the hands of our enemies, we might serve the Lord without fear, in holiness and righteousness before him, all the days of our life." },
          { number: 4, text: "And because the powers which God hath ordained, and the liberty which Christ hath purchased, are not intended by God to destroy, but mutually to uphold and preserve one another; they who, upon pretence of Christian liberty, shall oppose any lawful power, or the lawful exercise of it, whether it be civil or ecclesiastical, resist the ordinance of God. And for their publishing of such opinions, or maintaining of such practices, as are contrary to the light of nature, or to the known principles of Christianity, whether concerning faith, worship, or conversation; or to the power of godliness; or such erroneous opinions or practices, as either in their own nature, or in the manner of publishing or maintaining them, are destructive to the external peace and order which Christ hath established in the Church; they may lawfully be called to account, and proceeded against by the censures of the Church, and by the power of the civil magistrate." }
        ]
      },
      {
        number: 21,
        title: "Of Religious Worship and the Sabbath Day",
        sections: [
          { number: 1, text: "The light of nature showeth that there is a God, who hath lordship and sovereignty over all; is just, good, and doth good unto all; and is therefore to be feared, loved, praised, called upon, trusted in, and served with all the heart, and with all the soul, and with all the might. But the acceptable way of worshiping the true God is instituted by himself, and so limited by his own revealed will, that he may not be worshiped according to the imaginations and devices of men, or the suggestions of Satan, under any visible representation, or any other way not prescribed in the holy Scripture." },
          { number: 2, text: "Religious worship is to be given to God, the Father, Son, and Holy Ghost; and to him alone: not to angels, saints, or any other creature; and since the fall, not without a Mediator; nor in the mediation of any other but of Christ alone." },
          { number: 3, text: "Prayer with thanksgiving, being one special part of religious worship, is by God required of all men; and that it may be accepted, it is to be made in the name of the Son, by the help of his Spirit, according to his will, with understanding, reverence, humility, fervency, faith, love, and perseverance; and, if vocal, in a known tongue." },
          { number: 4, text: "Prayer is to be made for things lawful, and for all sorts of men living, or that shall live hereafter; but not for the dead, nor for those of whom it may be known that they have sinned the sin unto death." },
          { number: 5, text: "The reading of the Scriptures with godly fear; the sound preaching, and conscionable hearing of the Word, in obedience unto God with understanding, faith, and reverence; singing of psalms with grace in the heart; as also the due administration and worthy receiving of the sacraments instituted by Christ; are all parts of the ordinary religious worship of God: besides religious oaths, vows, solemn fastings, and thanksgivings upon special occasions; which are, in their several times and seasons, to be used in an holy and religious manner." },
          { number: 6, text: "Neither prayer, nor any other part of religious worship, is now, under the gospel, either tied unto, or made more acceptable by, any place in which it is performed, or towards which it is directed: but God is to be worshiped everywhere in spirit and in truth; as in private families daily, and in secret each one by himself; so more solemnly in the public assemblies, which are not carelessly or willfully to be neglected or forsaken, when God, by his Word or providence, calleth thereunto." },
          { number: 7, text: "As it is of the law of nature, that, in general, a due proportion of time be set apart for the worship of God; so, in his Word, by a positive, moral, and perpetual commandment, binding all men in all ages, he hath particularly appointed one day in seven for a Sabbath, to be kept holy unto him: which, from the beginning of the world to the resurrection of Christ, was the last day of the week; and, from the resurrection of Christ, was changed into the first day of the week, which in Scripture is called the Lord\'s Day, and is to be continued to the end of the world as the Christian Sabbath." },
          { number: 8, text: "This Sabbath is then kept holy unto the Lord, when men, after a due preparing of their hearts, and ordering of their common affairs beforehand, do not only observe an holy rest all the day from their own works, words, and thoughts about their worldly employments and recreations; but also are taken up the whole time in the public and private exercises of his worship, and in the duties of necessity and mercy." }
        ]
      },
      {
        number: 22,
        title: "Of Lawful Oaths and Vows",
        sections: [
          { number: 1, text: "A lawful oath is a part of religious worship, wherein upon just occasion the person swearing solemnly calleth God to witness what he asserteth or promiseth; and to judge him according to the truth or falsehood of what he sweareth." },
          { number: 2, text: "The name of God only is that by which men ought to swear, and therein it is to be used with all holy fear and reverence: therefore to swear vainly or rashly by that glorious and dreadful name, or to swear at all by any other thing, is sinful, and to be abhorred. Yet, as in matters of weight and moment, an oath is warranted by the Word of God, under the New Testament, as well as under the Old; so a lawful oath, being imposed by lawful authority, in such matters ought to be taken." },
          { number: 3, text: "Whosoever taketh an oath ought duly to consider the weightiness of so solemn an act, and therein to avouch nothing but what he is fully persuaded is the truth. Neither may any man bind himself by oath to any thing but what is good and just, and what he believeth so to be, and what he is able and resolved to perform." },
          { number: 4, text: "An oath is to be taken in the plain and common sense of the words, without equivocation or mental reservation. It cannot oblige to sin; but in any thing not sinful, being taken, it binds to performance, although to a man\'s own hurt; nor is it to be violated, although made to heretics or infidels." },
          { number: 5, text: "A vow is of the like nature with a promissory oath, and ought to be made with the like religious care, and to be performed with the like faithfulness." },
          { number: 6, text: "It is not to be made to any creature, but to God alone: and that it may be accepted, it is to be made voluntarily, out of faith and conscience of duty, in way of thankfulness for mercy received, or for the obtaining of what we want; whereby we more strictly bind ourselves to necessary duties, or to other things so far and so long as they may fitly conduce thereunto." },
          { number: 7, text: "No man may vow to do any thing forbidden in the Word of God, or what would hinder any duty therein commanded, or which is not in his own power, and for the performance whereof he hath no promise of ability from God. In which respects, Popish monastical vows of perpetual single life, professed poverty, and regular obedience, are so far from being degrees of higher perfection, that they are superstitious and sinful snares, in which no Christian may entangle himself." }
        ]
      },
      {
        number: 23,
        title: "Of the Civil Magistrate",
        sections: [
          { number: 1, text: "God, the supreme Lord and King of all the world, hath ordained civil magistrates to be under him over the people, for his own glory and the public good; and to this end hath armed them with the power of the sword, for the defense and encouragement of them that are good, and for the punishment of evil-doers." },
          { number: 2, text: "It is lawful for Christians to accept and execute the office of a magistrate when called thereunto; in the managing whereof, as they ought especially to maintain piety, justice, and peace, according to the wholesome laws of each commonwealth; so, for that end, they may lawfully, now under the New Testament, wage war upon just and necessary occasions." },
          { number: 3, text: "Civil magistrates may not assume to themselves the administration of the Word and sacraments; or the power of the keys of the kingdom of heaven; or, in the least, interfere in matters of faith. Yet, as nursing fathers, it is the duty of civil magistrates to protect the Church of our common Lord, without giving the preference to any denomination of Christians above the rest, in such a manner that all ecclesiastical persons whatever shall enjoy the full, free, and unquestioned liberty of discharging every part of their sacred functions, without violence or danger. And, as Jesus Christ hath appointed a regular government and discipline in his Church, no law of any commonwealth should interfere with, let, or hinder, the due exercise thereof, among the voluntary members of any denomination of Christians, according to their own profession and belief. It is the duty of civil magistrates to protect the person and good name of all their people, in such an effectual manner as that no person be suffered, either upon pretence of religion or of infidelity, to offer any indignity, violence, abuse, or injury to any other person whatsoever; and to take order, that all religious and ecclesiastical assemblies be held without molestation or disturbance." },
          { number: 4, text: "It is the duty of the people to pray for magistrates, to honor their persons, to pay them tribute and other dues, to obey their lawful commands, and to be subject to their authority, for conscience\' sake. Infidelity, or difference in religion, doth not make void the magistrate\'s just and legal authority, nor free the people from their due obedience to him: from which ecclesiastical persons are not exempted; much less hath the Pope any power or jurisdiction over them in their dominions, or over any of their people; and least of all to deprive them of their dominions or lives, if he shall judge them to be heretics, or upon any other pretence whatsoever." }
        ]
      },
      {
        number: 24,
        title: "Of Marriage and Divorce",
        sections: [
          { number: 1, text: "Marriage is to be between one man and one woman: neither is it lawful for any man to have more than one wife, nor for any woman to have more than one husband at the same time." },
          { number: 2, text: "Marriage was ordained for the mutual help of husband and wife; for the increase of mankind with a legitimate issue, and of the Church with an holy seed; and for preventing of uncleanness." },
          { number: 3, text: "It is lawful for all sorts of people to marry who are able with judgment to give their consent. Yet it is the duty of Christians to marry only in the Lord: and therefore such as profess the true reformed religion should not marry with infidels, Papists, or other idolaters: neither should such as are godly be unequally yoked, by marrying with such as are notoriously wicked in their life, or maintain damnable heresies." },
          { number: 4, text: "Marriage ought not to be within the degrees of consanguinity or affinity forbidden in the Word; nor can such incestuous marriages ever be made lawful by any law of man, or consent of parties, so as those persons may live together as man and wife. The man may not marry any of his wife\'s kindred nearer in blood than he may of his own, nor the woman of her husband\'s kindred nearer in blood than of her own." },
          { number: 5, text: "Adultery or fornication, committed after a contract, being detected before marriage, giveth just occasion to the innocent party to dissolve that contract. In the case of adultery after marriage, it is lawful for the innocent party to sue out a divorce, and after the divorce to marry another, as if the offending party were dead." },
          { number: 6, text: "Although the corruption of man be such as is apt to study arguments, unduly to put asunder those whom God hath joined together in marriage; yet nothing but adultery, or such willful desertion as can no way be remedied by the Church or civil magistrate, is cause sufficient of dissolving the bond of marriage; wherein a public and orderly course of proceeding is to be observed; and the persons concerned in it not left to their own wills and discretion in their own case." }
        ]
      },
      {
        number: 25,
        title: "Of the Church",
        sections: [
          { number: 1, text: "The catholic or universal Church, which is invisible, consists of the whole number of the elect, that have been, are, or shall be gathered into one, under Christ the head thereof; and is the spouse, the body, the fullness of him that filleth all in all." },
          { number: 2, text: "The visible Church, which is also catholic or universal under the gospel (not confined to one nation as before under the law), consists of all those throughout the world that profess the true religion, together with their children; and is the kingdom of the Lord Jesus Christ, the house and family of God, out of which there is no ordinary possibility of salvation." },
          { number: 3, text: "Unto this catholic visible Church Christ hath given the ministry, oracles, and ordinances of God, for the gathering and perfecting of the saints, in this life, to the end of the world; and doth by his own presence and Spirit, according to his promise, make them effectual thereunto." },
          { number: 4, text: "This catholic Church hath been sometimes more, sometimes less visible. And particular Churches, which are members thereof, are more or less pure, according as the doctrine of the gospel is taught and embraced, ordinances administered, and public worship performed more or less purely in them." },
          { number: 5, text: "The purest Churches under heaven are subject both to mixture and error; and some have so degenerated as to become apparently no Churches of Christ. Nevertheless, there shall be always a Church on earth to worship God according to his will." },
          { number: 6, text: "There is no other head of the Church but the Lord Jesus Christ: nor can the Pope of Rome, in any sense, be head thereof; but is that Antichrist, that man of sin, and son of perdition, that exalteth himself in the Church against Christ and all that is called God." }
        ]
      },
      {
        number: 26,
        title: "Of the Communion of Saints",
        sections: [
          { number: 1, text: "All saints that are united to Jesus Christ their head, by his Spirit and by faith, have fellowship with him in his graces, sufferings, death, resurrection, and glory: and, being united to one another in love, they have communion in each other\'s gifts and graces, and are obliged to the performance of such duties, public and private, as do conduce to their mutual good, both in the inward and outward man." },
          { number: 2, text: "Saints, by profession, are bound to maintain an holy fellowship and communion in the worship of God, and in performing such other spiritual services as tend to their mutual edification; as also in relieving each other in outward things, according to their several abilities and necessities. Which communion, as God offereth opportunity, is to be extended unto all those who, in every place, call upon the name of the Lord Jesus." },
          { number: 3, text: "This communion which the saints have with Christ doth not make them in any wise partakers of the substance of his Godhead, or to be equal with Christ in any respect: either of whom to affirm is impious and blasphemous. Nor doth their communion one with another as saints take away or infringe the title or property which each man hath in his goods and possessions." }
        ]
      },
      {
        number: 27,
        title: "Of the Sacraments",
        sections: [
          { number: 1, text: "Sacraments are holy signs and seals of the covenant of grace, immediately instituted by God, to represent Christ and his benefits, and to confirm our interest in him: as also to put a visible difference between those that belong unto the Church and the rest of the world; and solemnly to engage them to the service of God in Christ, according to his Word." },
          { number: 2, text: "There is in every sacrament a spiritual relation, or sacramental union, between the sign and the thing signified; whence it comes to pass that the names and effects of the one are attributed to the other." },
          { number: 3, text: "The grace which is exhibited in or by the sacraments, rightly used, is not conferred by any power in them; neither doth the efficacy of a sacrament depend upon the piety or intention of him that doth administer it, but upon the work of the Spirit, and the word of institution, which contains, together with a precept authorizing the use thereof, a promise of benefit to worthy receivers." },
          { number: 4, text: "There be only two sacraments ordained by Christ our Lord in the gospel, that is to say, Baptism and the Supper of the Lord: neither of which may be dispensed by any but by a minister of the Word lawfully ordained." },
          { number: 5, text: "The sacraments of the Old Testament, in regard of the spiritual things thereby signified and exhibited, were, for substance, the same with those of the New." }
        ]
      },
      {
        number: 28,
        title: "Of Baptism",
        sections: [
          { number: 1, text: "Baptism is a sacrament of the New Testament, ordained by Jesus Christ, not only for the solemn admission of the party baptized into the visible Church, but also to be unto him a sign and seal of the covenant of grace, of his ingrafting into Christ, of regeneration, of remission of sins, and of his giving up unto God, through Jesus Christ, to walk in newness of life: which sacrament is, by Christ\'s own appointment, to be continued in his Church until the end of the world." },
          { number: 2, text: "The outward element to be used in this sacrament is water, wherewith the party is to be baptized in the name of the Father, and of the Son, and of the Holy Ghost, by a minister of the gospel, lawfully called thereunto." },
          { number: 3, text: "Dipping of the person into the water is not necessary; but baptism is rightly administered by pouring or sprinkling water upon the person." },
          { number: 4, text: "Not only those that do actually profess faith in and obedience unto Christ, but also the infants of one or both believing parents are to be baptized." },
          { number: 5, text: "Although it be a great sin to contemn or neglect this ordinance, yet grace and salvation are not so inseparably annexed unto it as that no person can be regenerated or saved without it, or that all that are baptized are undoubtedly regenerated." },
          { number: 6, text: "The efficacy of baptism is not tied to that moment of time wherein it is administered; yet, notwithstanding, by the right use of this ordinance, the grace promised is not only offered, but really exhibited and conferred by the Holy Ghost, to such (whether of age or infants) as that grace belongeth unto, according to the counsel of God\'s own will, in his appointed time." },
          { number: 7, text: "The sacrament of baptism is but once to be administered to any person." }
        ]
      },
      {
        number: 29,
        title: "Of the Lord's Supper",
        sections: [
          { number: 1, text: "Our Lord Jesus, in the night wherein he was betrayed, instituted the sacrament of his body and blood, called the Lord\'s Supper, to be observed in his Church unto the end of the world; for the perpetual remembrance of the sacrifice of himself in his death, the sealing all benefits thereof unto true believers, their spiritual nourishment and growth in him, their further engagement in and to all duties which they owe unto him; and to be a bond and pledge of their communion with him, and with each other, as members of his mystical body." },
          { number: 2, text: "In this sacrament Christ is not offered up to his Father, nor any real sacrifice made at all for remission of sins of the quick or dead, but a commemoration of that one offering up of himself, by himself, upon the cross, once for all, and a spiritual oblation of all possible praise unto God for the same: so that the Popish sacrifice of the mass, as they call it, is most abominably injurious to Christ\'s one only sacrifice, the alone propitiation for all the sins of the elect." },
          { number: 3, text: "The Lord Jesus hath, in this ordinance, appointed his ministers to declare his word of institution to the people, to pray, and bless the elements of bread and wine, and thereby to set them apart from a common to an holy use; and to take and break the bread, to take the cup, and (they communicating also themselves) to give both to the communicants; but to none who are not then present in the congregation." },
          { number: 4, text: "Private masses, or receiving this sacrament by a priest, or any other, alone; as likewise the denial of the cup to the people; worshiping the elements, the lifting them up, or carrying them about for adoration, and the reserving them for any pretended religious use, are all contrary to the nature of this sacrament, and to the institution of Christ." },
          { number: 5, text: "The outward elements in this sacrament, duly set apart to the uses ordained by Christ, do by divine appointment represent his body and blood, both as offered in sacrifice for us; so that they are truly, yet sacramentally only, called by the name of the things they represent, to wit, the body and blood of Christ: albeit, in substance and nature, they still remain truly and only bread and wine, as they were before." },
          { number: 6, text: "That doctrine which maintains a change of the substance of bread and wine, into the substance of Christ\'s body and blood (commonly called transubstantiation), by consecration of a priest, or by any other way, is repugnant, not to Scripture alone, but even to common sense and reason; overthroweth the nature of the sacrament; and hath been, and is, the cause of manifold superstitions, yea, of gross idolatries." },
          { number: 7, text: "Worthy receivers, outwardly partaking of the visible elements in this sacrament, do then also inwardly by faith, really and indeed, yet not carnally and corporally, but spiritually, receive and feed upon Christ crucified, and all benefits of his death: the body and blood of Christ being then not corporally or carnally in, with, or under the bread and wine; yet as really, but spiritually, present to the faith of believers in that ordinance, as the elements themselves are to their outward senses." },
          { number: 8, text: "Although ignorant and wicked men receive the outward elements in this sacrament, yet they receive not the thing signified thereby; but by their unworthy coming thereunto are guilty of the body and blood of the Lord, to their own damnation. Wherefore all ignorant and ungodly persons, as they are unfit to enjoy communion with him, so are they unworthy of the Lord\'s table, and cannot without great sin against Christ be admitted thereunto." }
        ]
      },
      {
        number: 30,
        title: "Of Church Censures",
        sections: [
          { number: 1, text: "The Lord Jesus, as king and head of his Church, hath therein appointed a government in the hand of Church officers, distinct from the civil magistrate." },
          { number: 2, text: "To these officers the keys of the kingdom of heaven are committed, by virtue whereof they have power respectively to retain and remit sins, to shut that kingdom against the impenitent, both by the Word and censures; and to open it unto penitent sinners, by the ministry of the gospel, and by absolution from censures, as occasion shall require." },
          { number: 3, text: "Church censures are necessary for the reclaiming and gaining of offending brethren; for deterring of others from the like offenses; for purging out of that leaven which might infect the whole lump; for vindicating the honor of Christ, and the holy profession of the gospel; and for preventing the wrath of God, which might justly fall upon the Church, if they should suffer his covenant, and the seals thereof, to be profaned by notorious and obstinate offenders." },
          { number: 4, text: "For the better attaining of these ends, the officers of the Church are to proceed by admonition, suspension from the sacrament of the Lord\'s Supper for a season, and by excommunication from the Church, according to the nature of the crime and demerit of the person." }
        ]
      },
      {
        number: 31,
        title: "Of Synods and Councils",
        sections: [
          { number: 1, text: "For the better government and further edification of the Church, there ought to be such assemblies as are commonly called synods or councils; and it belongeth to the overseers and other rulers of the particular Churches, by virtue of their office, and the power which Christ hath given them for edification, and not for destruction, to appoint such assemblies; and to convene together in them, as often as they shall judge it expedient for the good of the Church." },
          { number: 2, text: "It belongeth to synods and councils, ministerially, to determine controversies of faith and cases of conscience; to set down rules and directions for the better ordering of the public worship of God and government of his Church; to receive complaints in cases of maladministration, and authoritatively to determine the same: which decrees and determinations, if consonant to the Word of God, are to be received with reverence and submission, not only for their agreement with the Word, but also for the power whereby they are made, as being an ordinance of God, appointed thereunto in his Word." },
          { number: 3, text: "All synods or councils since the apostles\' times, whether general or particular, may err, and many have erred; therefore they are not to be made the rule of faith or practice, but to be used as a help in both." },
          { number: 4, text: "Synods and councils are to handle or conclude nothing but that which is ecclesiastical; and are not to intermeddle with civil affairs which concern the commonwealth, unless by way of humble petition in cases extraordinary; or by way of advice for satisfaction of conscience, if they be thereunto required by the civil magistrate." },
          { number: 5, text: "Synods and councils are to handle or conclude nothing but that which is ecclesiastical; and are not to intermeddle with civil affairs which concern the commonwealth, unless by way of humble petition in cases extraordinary; or by way of advice for satisfaction of conscience, if they be thereunto required by the civil magistrate." }
        ]
      },
      {
        number: 32,
        title: "Of the State of Man After Death, and of the Resurrection of the Dead",
        sections: [
          { number: 1, text: "The bodies of men after death return to dust, and see corruption; but their souls (which neither die nor sleep), having an immortal subsistence, immediately return to God who gave them. The souls of the righteous, being then made perfect in holiness, are received into the highest heavens, where they behold the face of God in light and glory, waiting for the full redemption of their bodies; and the souls of the wicked are cast into hell, where they remain in torment and utter darkness, reserved to the judgment of the great day. Besides these two places for souls separated from their bodies, the Scripture acknowledgeth none." },
          { number: 2, text: "At the last day, such as are found alive shall not die, but be changed: and all the dead shall be raised up with the self-same bodies, and none other, although with different qualities, which shall be united again to their souls forever." },
          { number: 3, text: "The bodies of the unjust shall, by the power of Christ, be raised to dishonor; the bodies of the just, by his Spirit, unto honor, and be made conformable to his own glorious body." }
        ]
      },
      {
        number: 33,
        title: "Of the Last Judgment",
        sections: [
          { number: 1, text: "God hath appointed a day wherein he will judge the world in righteousness by Jesus Christ, to whom all power and judgment is given of the Father. In which day, not only the apostate angels shall be judged, but likewise all persons that have lived upon earth shall appear before the tribunal of Christ, to give an account of their thoughts, words, and deeds; and to receive according to what they have done in the body, whether good or evil." },
          { number: 2, text: "The end of God\'s appointing this day, is for the manifestation of the glory of his mercy in the eternal salvation of the elect; and of his justice in the damnation of the reprobate, who are wicked and disobedient. For then shall the righteous go into everlasting life, and receive that fullness of joy and refreshing which shall come from the presence of the Lord: whereas the wicked, who know not God, and obey not the gospel of Jesus Christ, shall be cast into eternal torments, and punished with everlasting destruction from the presence of the Lord, and from the glory of his power." },
          { number: 3, text: "As Christ would have us to be certainly persuaded that there shall be a day of judgment, both to deter all men from sin, and for the greater consolation of the godly in their adversity: so will he have that day unknown to men, that they may shake off all carnal security, and be always watchful, because they know not at what hour the Lord will come; and may be ever prepared to say, Come, Lord Jesus, come quickly. Amen." }
        ]
      }
    ]
  },

  "Heidelberg Catechism": {
    tradition: "Reformed",
    year: "1563",
    chapters: [
      {
        number: 1,
        title: "Lord's Day 1",
        sections: [
          { number: 1, text: "Q. 1: What is your only comfort in life and in death? A. That I am not my own, but belong body and soul, in life and in death, to my faithful Savior, Jesus Christ. He has fully paid for all my sins with his precious blood, and has set me free from the tyranny of the devil. He also watches over me in such a way that not a hair can fall from my head without the will of my Father in heaven: in fact, all things must work together for my salvation. Because I belong to him, Christ, by his Holy Spirit, assures me of eternal life and makes me wholeheartedly willing and ready from now on to live for him." },
          { number: 2, text: "Q. 2: What must you know to live and die in the joy of this comfort? A. Three things: first, how great my sin and misery are; second, how I am set free from all my sins and misery; third, how I am to thank God for such deliverance." },
        ]
      },
      {
        number: 2,
        title: "Lord's Day 2",
        sections: [
          { number: 3, text: "Q. 3: How do you come to know your misery? A. The law of God tells me." },
          { number: 4, text: "Q. 4: What does God\'s law require of us? A. Christ teaches us this in summary in Matthew 22:37-40: \'Love the Lord your God with all your heart and with all your soul and with all your mind and with all your strength. This is the first and greatest commandment. And the second is like it: Love your neighbor as yourself. All the Law and the Prophets hang on these two commandments.\'" },
          { number: 5, text: "Q. 5: Can you live up to all this perfectly? A. No. I have a natural tendency to hate God and my neighbor." },
        ]
      },
      {
        number: 3,
        title: "Lord's Day 3",
        sections: [
          { number: 6, text: "Q. 6: Did God create people so wicked and perverse? A. No. God created them good and in his own image, that is, in true righteousness and holiness, so that they might truly know God their creator, love him with all their heart, and live with God in eternal happiness, to praise and glorify him." },
          { number: 7, text: "Q. 7: Then where does this corrupt human nature come from? A. The fall and disobedience of our first parents, Adam and Eve, in Paradise. This fall has so poisoned our nature that we are all conceived and born in a sinful condition." },
          { number: 8, text: "Q. 8: But are we so corrupt that we are totally unable to do any good and inclined toward all evil? A. Yes, unless we are born again by the Spirit of God." },
        ]
      },
      {
        number: 4,
        title: "Lord's Day 4",
        sections: [
          { number: 9, text: "Q. 9: But doesn\'t God do us an injustice by requiring in his law what we are unable to do? A. No, God created human beings with the ability to keep the law. They, however, provoked by the devil, in willful disobedience, robbed themselves and all their descendants of these gifts." },
          { number: 10, text: "Q. 10: Will God permit such disobedience and rebellion to go unpunished? A. Certainly not. God is terribly angry with the sin we are born with as well as the sins we personally commit. As a just judge, God will punish them both now and in eternity, having declared: \'Cursed is everyone who does not continue to do everything written in the Book of the Law.\'" },
          { number: 11, text: "Q. 11: But isn\'t God also merciful? A. God is certainly merciful, but also just. His justice demands that sin committed against his supreme majesty be punished with the supreme penalty — eternal punishment of body and soul." },
        ]
      },
      {
        number: 5,
        title: "Lord's Day 5",
        sections: [
          { number: 12, text: "Q. 12: According to God\'s righteous judgment we deserve punishment both now and in eternity: how then can we escape this punishment and return to God\'s favor? A. God requires that his justice be satisfied. Therefore the claims of this justice must be paid in full, either by ourselves or by another." },
          { number: 13, text: "Q. 13: Can we make this payment ourselves? A. Certainly not. Actually, we increase our debt every day." },
          { number: 14, text: "Q. 14: Can another creature — any one at all — pay this debt for us? A. No. To begin with, God will not punish another creature for what a human is guilty of. Furthermore, no mere creature can bear the weight of God\'s eternal wrath against sin and release others from it." },
          { number: 15, text: "Q. 15: What kind of mediator and deliverer should we look for then? A. One who is truly human and truly righteous, yet more powerful than all creatures, that is, one who is also truly God." },
        ]
      },
      {
        number: 6,
        title: "Lord's Day 6",
        sections: [
          { number: 16, text: "Q. 16: Why must the mediator be truly human and truly righteous? A. God\'s justice demands that human nature, which has sinned, must pay for sin; but a sinner could not pay for others." },
          { number: 17, text: "Q. 17: Why must the mediator also be truly God? A. So that the mediator, by the power of his divinity, might bear the weight of God\'s wrath in his humanity and earn for us and restore to us righteousness and life." },
          { number: 18, text: "Q. 18: Then who is this mediator — truly God and at the same time truly human and truly righteous? A. Our Lord Jesus Christ, who was given to us to completely deliver us and make us right with God." },
          { number: 19, text: "Q. 19: How do you come to know this? A. The holy gospel tells me. God himself began to reveal the gospel already in Paradise; later, he proclaimed it by the holy patriarchs and prophets, and portrayed it by the sacrifices and other ceremonies of the law; and finally, he fulfilled it through his own dear Son." },
        ]
      },
      {
        number: 7,
        title: "Lord's Day 7",
        sections: [
          { number: 20, text: "Q. 20: Are all people then saved through Christ just as they were lost through Adam? A. No. Only those are saved who through true faith are grafted into Christ and accept all his benefits." },
          { number: 21, text: "Q. 21: What is true faith? A. True faith is not only a sure knowledge by which I hold as true all that God has revealed to us in Scripture; it is also a wholehearted trust, which the Holy Spirit creates in me by the gospel, that God has freely granted, not only to others but to me also, forgiveness of sins, eternal righteousness, and salvation. These are gifts of sheer grace, granted solely by Christ\'s merit." },
          { number: 22, text: "Q. 22: What then must a Christian believe? A. Everything God promises us in the gospel. That gospel is summarized for us in the articles of our Christian faith — a creed beyond doubt, and confessed throughout the world." },
          { number: 23, text: "Q. 23: What are these articles? A. I believe in God, the Father almighty, creator of heaven and earth. I believe in Jesus Christ, his only begotten Son, our Lord, who was conceived by the Holy Spirit and born of the virgin Mary. He suffered under Pontius Pilate, was crucified, died and was buried; he descended to hell. The third day he rose again from the dead. He ascended to heaven and is seated at the right hand of God the Father almighty. From there he will come to judge the living and the dead. I believe in the Holy Spirit, the holy catholic church, the communion of saints, the forgiveness of sins, the resurrection of the body, and the life everlasting. Amen." },
        ]
      },
      {
        number: 8,
        title: "Lord's Day 8",
        sections: [
          { number: 24, text: "Q. 24: How are these articles divided? A. Into three parts: God the Father and our creation; God the Son and our deliverance; and God the Holy Spirit and our sanctification." },
          { number: 25, text: "Q. 25: Since there is only one divine being, why do you speak of three: Father, Son, and Holy Spirit? A. Because that is how God has revealed himself in his Word: these three distinct persons are the one, true, eternal God." },
        ]
      },
      {
        number: 9,
        title: "Lord's Day 9",
        sections: [
          { number: 26, text: "Q. 26: What do you believe when you say, \'I believe in God, the Father almighty, creator of heaven and earth\'? A. That the eternal Father of our Lord Jesus Christ, who out of nothing created heaven and earth and everything in them, who still upholds and rules them by his eternal counsel and providence, is my God and Father because of Christ his Son. I trust him so much that I do not doubt he will provide whatever I need for body and soul, and he will turn to my good whatever adversity he sends me in this sad world. He is able to do this because he is almighty God; he desires to do this because he is a faithful Father." },
        ]
      },
      {
        number: 10,
        title: "Lord's Day 10",
        sections: [
          { number: 27, text: "Q. 27: What do you understand by the providence of God? A. Providence is the almighty and ever present power of God by which God upholds, as with his hand, heaven and earth and all creatures, and so rules them that leaf and blade, rain and drought, fruitful and lean years, food and drink, health and sickness, prosperity and poverty — all things, in fact, come to us not by chance but by his fatherly hand." },
          { number: 28, text: "Q. 28: How does the knowledge of God\'s creation and providence help us? A. We can be patient when things go against us, thankful when things go well, and for the future we can have good confidence in our faithful God and Father that nothing will separate us from his love. All creatures are so completely in his hand that without his will they can neither move nor be moved." },
        ]
      },
      {
        number: 11,
        title: "Lord's Day 11",
        sections: [
          { number: 29, text: "Q. 29: Why is the Son of God called \'Jesus,\' meaning \'savior\'? A. Because he saves us from our sins. Salvation cannot be found in anyone else; it is futile to look for any salvation elsewhere." },
          { number: 30, text: "Q. 30: Do those who look for their salvation and well-being from saints, by their own efforts, or by some other means really believe in the only savior Jesus? A. No. Although they boast of being his, by their actions they deny the only savior and deliverer Jesus. Either Jesus is not a perfect savior, or those who in true faith accept this savior have in him all they need for their salvation." },
        ]
      },
      {
        number: 12,
        title: "Lord's Day 12",
        sections: [
          { number: 31, text: "Q. 31: Why is he called \'Christ,\' meaning \'anointed\'? A. Because he has been ordained by God the Father and has been anointed with the Holy Spirit to be our chief prophet and teacher who perfectly reveals to us the secret counsel and will of God for our deliverance; our only high priest who has set us free by the one sacrifice of his body, and who continually pleads our cause with the Father; and our eternal king who governs us by his Word and Spirit, and who guards us and keeps us in the freedom he has won for us." },
          { number: 32, text: "Q. 32: But why are you called a Christian? A. Because by faith I am a member of Christ and so I share in his anointing. I am anointed to confess his name, to present myself to him as a living sacrifice of thanks, to strive with a good conscience against sin and the devil in this life, and afterward to reign with Christ over all creation for all eternity." },
        ]
      },
      {
        number: 13,
        title: "Lord's Day 13",
        sections: [
          { number: 33, text: "Q. 33: Why is he called God\'s \'only begotten Son\' when we also are God\'s children? A. Because Christ alone is the eternal, natural Son of God. We, however, are adopted children of God — adopted by grace through Christ." },
          { number: 34, text: "Q. 34: Why do you call him \'our Lord\'? A. Because — not with gold or silver, but with his precious blood — he has set us free from sin and from the tyranny of the devil, and has bought us, body and soul, to be his very own." },
        ]
      },
      {
        number: 14,
        title: "Lord's Day 14",
        sections: [
          { number: 35, text: "Q. 35: What does it mean that he \'was conceived by the Holy Spirit and born of the virgin Mary\'? A. That the eternal Son of God, who is and remains true and eternal God, took to himself, through the working of the Holy Spirit, from the flesh and blood of the virgin Mary, a truly human nature so that he might become David\'s true descendant, like his brothers and sisters in every way except for sin." },
          { number: 36, text: "Q. 36: How does the holy conception and birth of Christ benefit you? A. He is our mediator and, in God\'s sight, he covers with his innocence and perfect holiness my sinfulness in which I was conceived." },
        ]
      },
      {
        number: 15,
        title: "Lord's Day 15",
        sections: [
          { number: 37, text: "Q. 37: What do you understand by the word \'suffered\'? A. That during his whole life on earth, but especially at the end, Christ sustained in body and soul the wrath of God against the sin of the whole human race. This he did in order that, by his suffering as the only atoning sacrifice, he might deliver us, body and soul, from eternal condemnation, and gain for us God\'s grace, righteousness, and eternal life." },
          { number: 38, text: "Q. 38: Why did he suffer \'under Pontius Pilate\' as judge? A. So that he, though innocent, might be condemned by an earthly judge, and so free us from the severe judgment of God that was to fall on us." },
          { number: 39, text: "Q. 39: Is it significant that he was \'crucified\' and did not die some other way? A. Yes. This death convinces me that he shouldered the curse which lay on me, since death by crucifixion was accursed by God." },
        ]
      },
      {
        number: 16,
        title: "Lord's Day 16",
        sections: [
          { number: 40, text: "Q. 40: Why did Christ have to go all the way to death? A. Because God\'s justice and truth demand it: only the death of God\'s Son could pay for our sin." },
          { number: 41, text: "Q. 41: Why was he \'buried\'? A. His burial testifies that he really died." },
          { number: 42, text: "Q. 42: Since Christ has died for us, why do we still have to die? A. Our death does not pay the debt of our sins. Rather, it puts an end to our sinning and is our entrance into eternal life." },
          { number: 43, text: "Q. 43: What further benefit do we receive from Christ\'s sacrifice and death on the cross? A. Through Christ\'s death our old selves are crucified, put to death, and buried with him, so that the evil desires of the flesh may no longer rule us, but that instead we may dedicate ourselves as an offering of gratitude to him." },
          { number: 44, text: "Q. 44: Why does the creed add, \'He descended to hell\'? A. To assure me during attacks of deepest dread and temptation that Christ my Lord, by suffering unspeakable anguish, pain, and terror of soul, on the cross but also earlier, has delivered me from hellish anguish and torment." },
        ]
      },
      {
        number: 17,
        title: "Lord's Day 17",
        sections: [
          { number: 45, text: "Q. 45: How does Christ\'s resurrection benefit us? A. First, by his resurrection he has overcome death, so that he might make us share in the righteousness he won for us by his death. Second, by his power we too are already now resurrected to a new life. Third, Christ\'s resurrection is a guarantee of our glorious resurrection." },
        ]
      },
      {
        number: 18,
        title: "Lord's Day 18",
        sections: [
          { number: 46, text: "Q. 46: What do you mean by saying, \'He ascended to heaven\'? A. That Christ, while his disciples watched, was lifted up from the earth to heaven and will be there for our good until he comes again to judge the living and the dead." },
          { number: 47, text: "Q. 47: But isn\'t Christ with us until the end of the world as he promised us? A. Christ is truly human and truly God. In his human nature Christ is not now on earth; but in his divinity, majesty, grace, and Spirit he is not absent from us for a moment." },
          { number: 48, text: "Q. 48: If his humanity is not present wherever his divinity is, then aren\'t the two natures of Christ separated from each other? A. Certainly not. Since divinity is not limited and is present everywhere, it is evident that Christ\'s divinity is surely beyond the bounds of the humanity he has taken on, but at the same time his divinity is in and remains personally united to his humanity." },
          { number: 49, text: "Q. 49: How does Christ\'s ascension to heaven benefit us? A. First, he pleads our cause in heaven in the presence of his Father. Second, we have our own flesh in heaven — a guarantee that Christ our head will take us, his members, to himself in heaven. Third, he sends his Spirit to us on earth as a further guarantee. By the Spirit\'s power we make the goal of our lives, not earthly things, but the things above where Christ is, sitting at God\'s right hand." },
        ]
      },
      {
        number: 19,
        title: "Lord's Day 19",
        sections: [
          { number: 50, text: "Q. 50: Why the next words: \'and is seated at the right hand of God\'? A. Christ ascended to heaven, there to show that he is head of his church, and that the Father rules all things through him." },
          { number: 51, text: "Q. 51: How does this glory of Christ our head benefit us? A. First, through his Holy Spirit he pours out his gifts from heaven upon us his members. Second, by his power he defends us and keeps us safe from all enemies." },
          { number: 52, text: "Q. 52: What comfort does this give you, that Christ \'will come to judge the living and the dead\'? A. In all my distress and persecution I turn my eyes to the heavens and confidently await as judge the very one who has already stood trial in my place before God and so has removed the whole curse from me. All his enemies and mine he will condemn to everlasting punishment: but me and all his chosen ones he will take to himself into the joy and the glory of heaven." },
        ]
      },
      {
        number: 20,
        title: "Lord's Day 20",
        sections: [
          { number: 53, text: "Q. 53: What do you believe concerning \'the Holy Spirit\'? A. First, he, as well as the Father and the Son, is eternal God. Second, he has been given to me personally, so that, by true faith, he makes me share in Christ and all his blessings, comforts me, and remains with me forever." },
        ]
      },
      {
        number: 21,
        title: "Lord's Day 21",
        sections: [
          { number: 54, text: "Q. 54: What do you believe concerning \'the holy catholic church\'? A. I believe that the Son of God through his Spirit and Word, out of the entire human race, from the beginning of the world to its end, gathers, protects, and preserves for himself a community chosen for eternal life and united in true faith. And of this community I am and always will be a living member." },
          { number: 55, text: "Q. 55: What do you understand by \'the communion of saints\'? A. First, that believers one and all, as members of this community, share in Christ and in all his treasures and gifts. Second, that each member should consider it a duty to use these gifts readily and cheerfully for the service and enrichment of the other members." },
          { number: 56, text: "Q. 56: What do you believe concerning \'the forgiveness of sins\'? A. I believe that God, because of Christ\'s atonement, will never hold against me any of my sins nor my sinful nature which I need to struggle against all my life. Rather, in his grace God grants me the righteousness of Christ to free me forever from judgment." },
        ]
      },
      {
        number: 22,
        title: "Lord's Day 22",
        sections: [
          { number: 57, text: "Q. 57: What comfort does \'the resurrection of the body\' offer you? A. Not only my soul will be taken immediately after this life to Christ its head; but even my very flesh, raised by the power of Christ, will be reunited with my soul and made like Christ\'s glorious body." },
          { number: 58, text: "Q. 58: What comfort does the article concerning \'life everlasting\' give you? A. Even as I already now experience in my heart the beginning of eternal joy, so after this life I will have perfect blessedness such as no eye has seen, no ear has heard, no human heart has ever imagined: a blessedness in which to praise God eternally." },
        ]
      },
      {
        number: 23,
        title: "Lord's Day 23",
        sections: [
          { number: 59, text: "Q. 59: What good does it do you, however, to believe all this? A. In Christ I am right with God and heir to life everlasting." },
          { number: 60, text: "Q. 60: How are you right with God? A. Only by true faith in Jesus Christ. Even though my conscience accuses me of having grievously sinned against all God\'s commandments and of never having kept any of them, and even though I am still inclined toward all evil, nevertheless, without my deserving it at all, out of sheer grace, God grants and credits to me the perfect satisfaction, righteousness, and holiness of Christ, as if I had never sinned nor been a sinner, as if I had been as perfectly obedient as Christ was obedient for me. All I need to do is to accept this gift of God with a believing heart." },
          { number: 61, text: "Q. 61: Why do you say that by faith alone you are right with God? A. It is not because of any value my faith has that God is pleased with me. Only Christ\'s satisfaction, righteousness, and holiness make me right with God. And I can receive this righteousness and make it mine in no other way than by faith alone." },
        ]
      },
      {
        number: 24,
        title: "Lord's Day 24",
        sections: [
          { number: 62, text: "Q. 62: But why can\'t the good we do make us right with God, or at least help make us right with him? A. Because the righteousness which can pass God\'s judgment must be entirely perfect and must in every way measure up to the divine law. Even the best we do in this life is imperfect and stained with sin." },
          { number: 63, text: "Q. 63: How can you say that the good we do doesn\'t earn anything when God promises to reward it in this life and the next? A. This reward is not earned; it is a gift of grace." },
          { number: 64, text: "Q. 64: But doesn\'t this teaching make people indifferent and wicked? A. No. It is impossible for those grafted into Christ by true faith not to produce fruits of gratitude." },
        ]
      },
      {
        number: 25,
        title: "Lord's Day 25",
        sections: [
          { number: 65, text: "Q. 65: It is by faith alone that we share in Christ and all his blessings: where then does that faith come from? A. The Holy Spirit produces it in our hearts by the preaching of the holy gospel, and confirms it through our use of the holy sacraments." },
          { number: 66, text: "Q. 66: What are sacraments? A. Sacraments are holy signs and seals for us to see. They were instituted by God so that by our use of them he might make us understand more clearly the promise of the gospel, and might put his seal on that promise. And this is God\'s gospel promise: to forgive our sins and give us eternal life by grace alone because of Christ\'s one sacrifice finished on the cross." },
          { number: 67, text: "Q. 67: Are both the word and the sacraments then intended to focus our faith on the sacrifice of Jesus Christ on the cross as the only ground of our salvation? A. Right! In the gospel the Holy Spirit teaches us and through the holy sacraments he assures us that our entire salvation rests on Christ\'s one sacrifice for us on the cross." },
          { number: 68, text: "Q. 68: How many sacraments did Christ institute in the New Testament? A. Two: holy baptism and the holy supper." },
        ]
      },
      {
        number: 26,
        title: "Lord's Day 26",
        sections: [
          { number: 69, text: "Q. 69: How does holy baptism remind you and assure you that Christ\'s one sacrifice on the cross is for you personally? A. In this way: Christ instituted this outward washing and with it gave the promise that, as surely as water washes away the dirt from the body, so certainly his blood and his Spirit wash away my soul\'s impurity, in other words, all my sins." },
          { number: 70, text: "Q. 70: What does it mean to be washed with Christ\'s blood and Spirit? A. To be washed with Christ\'s blood means that God, by grace, has forgiven my sins because of Christ\'s blood poured out for me in his sacrifice on the cross. To be washed with Christ\'s Spirit means that the Holy Spirit has renewed me and set me apart to be a member of Christ so that more and more I become dead to sin and increasingly live a holy and blameless life." },
          { number: 71, text: "Q. 71: Where does Christ promise that we are washed with his blood and Spirit as surely as we are washed with the water of baptism? A. In the institution of baptism where he says: \'Therefore go and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit.\' And: \'Whoever believes and is baptized will be saved, but whoever does not believe will be condemned.\' This promise is repeated when Scripture calls baptism the washing of rebirth and the washing away of sins." },
          { number: 72, text: "Q. 72: Does this outward washing with water itself wash away sins? A. No, only Jesus Christ\'s blood and the Holy Spirit cleanse us from all sins." },
          { number: 73, text: "Q. 73: Why then does the Holy Spirit call baptism the washing of rebirth and the washing away of sins? A. God has good reasons for these words. He wants to teach us that the blood and Spirit of Christ wash away our sins just as water washes away dirt from the body. But more important, he wants to assure us, by this divine pledge and sign, that the washing away of our sins spiritually is as real as physical washing with water." },
          { number: 74, text: "Q. 74: Should infants also be baptized? A. Yes. Infants as well as adults are in God\'s covenant and are his people. They, no less than adults, are promised the forgiveness of sin through Christ\'s blood and the Holy Spirit who produces faith. Therefore, by baptism, the mark of the covenant, infants should be received into the Christian church and should be distinguished from the children of unbelievers. This was done in the Old Testament by circumcision, which was replaced in the New Testament by baptism." },
        ]
      },
      {
        number: 27,
        title: "Lord's Day 27",
        sections: [
          { number: 75, text: "Q. 75: How does the holy supper remind you and assure you that you share in Christ\'s one sacrifice on the cross and in all his gifts? A. In this way: Christ has commanded me and all believers to eat this broken bread and to drink this cup. With this command he gave this promise: First, as surely as I see with my eyes the bread of the Lord broken for me and the cup given to me, so surely his body was offered and broken for me and his blood was poured out for me on the cross. Second, as surely as I receive from the hand of the one who serves, and taste with my mouth the bread and cup of the Lord, given me as sure signs of Christ\'s body and blood, so surely he nourishes and refreshes my soul for eternal life with his crucified body and poured-out blood." },
          { number: 76, text: "Q. 76: What does it mean to eat the crucified body of Christ and to drink his poured-out blood? A. It means to accept with a believing heart the entire suffering and death of Christ and thereby to receive forgiveness of sins and eternal life. But it means more. Through the Holy Spirit, who lives both in Christ and in us, we are united more and more to Christ\'s blessed body. And so, although he is in heaven and we are on earth, we are flesh of his flesh and bone of his bone. And we forever live on and are governed by one Spirit, as the members of our body are by one soul." },
          { number: 77, text: "Q. 77: Where does Christ promise to nourish and refresh believers with his body and blood as surely as they eat this broken bread and drink this cup? A. In the institution of the Lord\'s Supper: \'The Lord Jesus, on the night he was betrayed, took bread, and when he had given thanks, he broke it and said, \'This is my body, which is for you; do this in remembrance of me.\' In the same way, after supper he took the cup, saying, \'This cup is the new covenant in my blood; do this, whenever you drink it, in remembrance of me.\' For whenever you eat this bread and drink this cup, you proclaim the Lord\'s death until he comes.\' This promise is repeated by Paul where he says: \'Is not the cup of thanksgiving for which we give thanks a participation in the blood of Christ? And is not the bread that we break a participation in the body of Christ? Because there is one loaf, we, who are many, are one body, for we all share the one loaf.\'" },
          { number: 78, text: "Q. 78: Do the bread and wine become the very body and blood of Christ? A. No. Just as the water of baptism is not changed into Christ\'s blood and does not itself wash away sins but is simply God\'s sign and assurance, so too the bread of the Lord\'s Supper is not changed into the very body of Christ even though it is called the body of Christ in keeping with the nature and language of sacraments." },
          { number: 79, text: "Q. 79: Why then does Christ call the bread his body and the cup his blood, or the new covenant in his blood? (Paul uses the words, a participation in Christ\'s body and blood.) A. Christ has good reason for these words. He wants to teach us that as bread and wine nourish the temporal life, so too his crucified body and poured-out blood truly nourish our souls for eternal life. But more important, he wants to assure us, by this visible sign and pledge, that we, through the Holy Spirit\'s work, share in his true body and blood as surely as our mouths receive these holy signs in his remembrance, and that all of his suffering and obedience are as definitely ours as if we personally had suffered and made satisfaction to God in our place." },
        ]
      },
      {
        number: 28,
        title: "Lord's Day 28",
        sections: [
          { number: 80, text: "Q. 80: How does the Lord\'s Supper differ from the Roman Catholic Mass? A. The Lord\'s Supper declares to us that our sins have been completely forgiven through the one sacrifice of Jesus Christ which he himself finished on the cross once and for all. It also declares to us that the Holy Spirit grafts us into Christ, who with his very body is now in heaven at the right hand of the Father where he wants us to worship him. But the Mass teaches that the living and the dead do not have their sins forgiven through the suffering of Christ unless Christ is still offered for them daily by the priests. It also teaches that Christ is bodily present under the form of bread and wine where Christ is therefore to be worshiped. Thus the Mass is basically nothing but a denial of the one sacrifice and suffering of Jesus Christ and a condemnable idolatry." },
        ]
      },
      {
        number: 29,
        title: "Lord's Day 29",
        sections: [
          { number: 81, text: "Q. 81: Who are to come to the Lord\'s table? A. Those who are displeased with themselves because of their sins, but who nevertheless trust that their sins are pardoned and that their continuing weakness is covered by the suffering and death of Christ, and who also desire more and more to strengthen their faith and to lead a better life. Hypocrites and those who are unrepentant, however, eat and drink judgment on themselves." },
          { number: 82, text: "Q. 82: Are those also to be admitted to the Lord\'s Supper who show by what they say and do that they are unbelieving and ungodly? A. No, that would dishonor God\'s covenant and bring down God\'s anger upon the entire congregation. Therefore, according to the instruction of Christ and his apostles, the Christian church is duty-bound to exclude such people, by the official use of the keys of the kingdom, until they reform their lives." },
        ]
      },
      {
        number: 30,
        title: "Lord's Day 30",
        sections: [
          { number: 83, text: "Q. 83: What are the keys of the kingdom? A. The preaching of the holy gospel and Christian discipline toward repentance. Both preaching and discipline open the kingdom of heaven to believers and close it to unbelievers." },
          { number: 84, text: "Q. 84: How does preaching the holy gospel open and close the kingdom of heaven? A. According to the command of Christ: The kingdom of heaven is opened by proclaiming and publicly declaring to each and every believer that, as often as he accepts the gospel promise in true faith, God, because of what Christ has done, truly has forgiven all his sins. The kingdom of heaven is closed, however, by proclaiming and publicly declaring to unbelievers and hypocrites that, as long as they do not repent, the anger of God and eternal condemnation rest on them. God\'s judgment, both in this life and in the life to come, is based on this gospel testimony." },
          { number: 85, text: "Q. 85: How is the kingdom of heaven closed and opened by Christian discipline? A. According to the command of Christ: Those who, though called Christians, profess unchristian teachings or live unchristian lives, and who after repeated personal and loving admonition, refuse to abandon their errors and wickedness, and who after being reported to the church, that is, to its officers, fail to respond also to their admonition — such persons the officers exclude from the Christian fellowship by withholding the sacraments from them, and God himself excludes them from the kingdom of Christ. Such persons, when they promise and show real amendment, are received again as members of Christ and of his church." },
        ]
      },
      {
        number: 31,
        title: "Lord's Day 31",
        sections: [
          { number: 86, text: "Q. 86: We have been delivered from our misery by God\'s grace alone through Christ, without any merit of our own. Why then must we still do good? A. To be sure, Christ has redeemed us by his blood. But we do good because Christ by his Spirit is also renewing us to be like himself, so that in all our living we may show that we are thankful to God for all he has done for us, and so that he may be praised through us. And we do good so that we may be assured of our faith by its fruits, and so that by our godly living our neighbors may be won over to Christ." },
          { number: 87, text: "Q. 87: Can those be saved who do not turn to God from their ungrateful and impenitent ways? A. By no means. Scripture tells us that no unchaste person, no idolater, adulterer, thief, no covetous person, no drunkard, slanderer, robber, or the like is going to inherit the kingdom of God." },
        ]
      },
      {
        number: 32,
        title: "Lord's Day 32",
        sections: [
          { number: 88, text: "Q. 88: What is involved in genuine repentance or conversion? A. Two things: the dying-away of the old self, and the rising-to-life of the new." },
          { number: 89, text: "Q. 89: What is the dying-away of the old self? A. It is to be genuinely sorry for sin, to hate it more and more, and to run away from it." },
          { number: 90, text: "Q. 90: What is the rising-to-life of the new self? A. It is wholehearted joy in God through Christ and a strong desire to live according to the will of God by doing every kind of good work." },
          { number: 91, text: "Q. 91: What do we do that is good? A. Only that which arises out of true faith, conforms to God\'s law, and is done for his glory; and not that which is based on what we think is right or on established human tradition." },
        ]
      },
      {
        number: 33,
        title: "Lord's Day 33",
        sections: [
          { number: 92, text: "Q. 92: What is the law of the LORD? A. God spoke all these words: I am the LORD your God, who brought you out of Egypt, out of the land of slavery. You shall have no other gods before me. You shall not make for yourself an image in the form of anything in heaven above or on the earth beneath or in the waters below. You shall not bow down to them or worship them; for I, the LORD your God, am a jealous God, punishing the children for the sin of the parents to the third and fourth generation of those who hate me, but showing love to a thousand generations of those who love me and keep my commandments. You shall not misuse the name of the LORD your God, for the LORD will not hold anyone guiltless who misuses his name. Remember the Sabbath day by keeping it holy. Six days you shall labor and do all your work, but the seventh day is a sabbath to the LORD your God. On it you shall not do any work, neither you, nor your son or daughter, nor your male or female servant, nor your animals, nor any foreigner residing in your towns. For in six days the LORD made the heavens and the earth, the sea, and all that is in them, but he rested on the seventh day. Therefore the LORD blessed the Sabbath day and made it holy. Honor your father and your mother, so that you may live long in the land the LORD your God is giving you. You shall not murder. You shall not commit adultery. You shall not steal. You shall not give false testimony against your neighbor. You shall not covet your neighbor\'s house. You shall not covet your neighbor\'s wife, or his male or female servant, his ox or donkey, or anything that belongs to your neighbor." },
          { number: 93, text: "Q. 93: How are these commandments divided? A. Into two tables. The first has four commandments, teaching us what our relation to God should be. The second has six commandments, teaching us what we owe our neighbor." },
          { number: 94, text: "Q. 94: What does the LORD require in the first commandment? A. That I, not wanting to endanger my very salvation, avoid and shun all idolatry, magic, superstitious rites, and prayer to saints or to other creatures. That I sincerely acknowledge the only true God, trust him alone, look to him for every good thing humbly and patiently, love him, fear him, and honor him with all my heart. In short, that I give up anything rather than go against his will in any way." },
          { number: 95, text: "Q. 95: What is idolatry? A. Idolatry is having or inventing something in which one trusts in place of or alongside of the only true God, who has revealed himself in the Word." },
        ]
      },
      {
        number: 34,
        title: "Lord's Day 34",
        sections: [
          { number: 96, text: "Q. 96: What is God\'s will for us in the second commandment? A. That we in no way make any image of God nor worship him in any other way than has been commanded in God\'s Word." },
          { number: 97, text: "Q. 97: May we then not make any image at all? A. God can not and may not be visibly portrayed in any way. Although creatures may be portrayed, yet God forbids making or having such images if one\'s intention is to worship them or to serve God through them." },
          { number: 98, text: "Q. 98: But may not images be permitted in churches in place of books for the unlearned? A. No, we should not try to be wiser than God. God wants the Christian community instructed by the living preaching of his Word, not by idols that cannot even talk." },
        ]
      },
      {
        number: 35,
        title: "Lord's Day 35",
        sections: [
          { number: 99, text: "Q. 99: What is required in the third commandment? A. That we must not profane or abuse the name of God by cursing, perjury, or unnecessary oaths, nor share in such horrible sins by being silent bystanders. In a word, we must use the holy name of God only with reverence and awe, so that we may properly confess him, pray to him, and praise him in everything we do and say." },
          { number: 100, text: "Q. 100: Is blasphemy of God\'s name by swearing and cursing really such serious sin that God is angry also with those who do not do all they can to help prevent and forbid it? A. Yes, indeed. No sin is greater, no sin makes God more angry than blaspheming his name. That is why he commanded the death penalty for it." },
        ]
      },
      {
        number: 36,
        title: "Lord's Day 36",
        sections: [
          { number: 101, text: "Q. 101: But may we swear an oath in God\'s name if we do it reverently? A. Yes, when the government demands it, or when necessity requires it, in order to maintain and promote truth and trustworthiness for God\'s glory and our neighbor\'s good. Such oaths are approved in God\'s Word and were rightly used by Old Testament saints." },
          { number: 102, text: "Q. 102: May we also swear by saints or by other creatures? A. No. A legitimate oath means calling upon God as the one who knows my heart to witness to my truthfulness and to punish me if I swear falsely. No creature is worthy of such honor." },
        ]
      },
      {
        number: 37,
        title: "Lord's Day 37",
        sections: [
          { number: 103, text: "Q. 103: What is God\'s will for you in the fourth commandment? A. First, that the gospel ministry and education for it be maintained, and that, especially on the festive day of rest, I regularly attend the assembly of God\'s people to learn what God\'s Word teaches, to participate in the sacraments, to pray to God publicly, and to bring Christian offerings for the poor. Second, that every day of my life I rest from my evil ways, let the Lord work in me through his Spirit, and so begin already in this life the eternal Sabbath." },
          { number: 104, text: "Q. 104: What is God\'s will for you in the fifth commandment? A. That I honor, love, and be loyal to my father and mother and all those in authority over me; that I obey and submit to them, as is proper, when they correct and punish me; and also that I be patient with their failings — for through them God chooses to rule us." },
        ]
      },
      {
        number: 38,
        title: "Lord's Day 38",
        sections: [
          { number: 105, text: "Q. 105: What is God\'s will for you in the sixth commandment? A. I am not to belittle, insult, hate, or kill my neighbor — not by my thoughts, my words, my look or gesture, and certainly not by actual deeds — and I am not to be party to this in others; rather, I am to put away all desire for revenge. I am not to harm or recklessly endanger myself either. Prevention of murder is also why government is armed with the sword." },
          { number: 106, text: "Q. 106: Does this commandment refer only to killing? A. By forbidding murder God teaches us that he hates the root of murder: envy, hatred, anger, vindictiveness. In God\'s sight all such are murder." },
          { number: 107, text: "Q. 107: Is it enough then that we do not kill our neighbor in any such way? A. No. By condemning envy, hatred, and anger God tells us to love our neighbors as ourselves, to be patient, peace-loving, gentle, merciful, and friendly to them, to protect them from harm as much as we can, and to do good even to our enemies." },
        ]
      },
      {
        number: 39,
        title: "Lord's Day 39",
        sections: [
          { number: 108, text: "Q. 108: What is God\'s will for us in the seventh commandment? A. God condemns all unchastity. We should therefore thoroughly detest it and, married or single, live decent and chaste lives. Those who are married should be faithful to their spouses; those who are single should be chaste, avoiding all unchaste actions, looks, words, thoughts, or entertainment, as much as possible. They should use all means available to them to maintain chastity, including prayer." },
        ]
      },
      {
        number: 40,
        title: "Lord's Day 40",
        sections: [
          { number: 109, text: "Q. 109: Is it enough in this commandment that we do not steal? A. No. God tells us to take action against greed and useless spending and to share our goods with those in need. In addition, we are to work faithfully so that we are able to give to those who are in need." },
          { number: 110, text: "Q. 110: What is forbidden in the eighth commandment? A. God forbids not only outright theft and robbery, punishable by law. But in God\'s sight theft also includes cheating and swindling our neighbor by schemes made to appear legitimate, such as: inaccurate measurements of weight, size, or volume; fraudulent merchandising; counterfeit money; excessive interest; or any other means forbidden by God. In addition God forbids all greed and pointless squandering of his gifts." },
        ]
      },
      {
        number: 41,
        title: "Lord's Day 41",
        sections: [
          { number: 111, text: "Q. 111: But what does God require of you in this commandment? A. That I do whatever I can for my neighbor\'s good, that I treat others as I would like them to treat me, and that I work faithfully so that I may share with those in need." },
          { number: 112, text: "Q. 112: What is the aim of the ninth commandment? A. That I never give false testimony against anyone, twist no one\'s words, not gossip or slander, nor join in condemning anyone without a hearing or without a just cause. Rather, in court and everywhere else, I should avoid lying and deceit of every kind; these are devices the devil himself uses, and they would call down on me God\'s intense anger. I should love the truth, speak it candidly, and openly acknowledge it. And I should do what I can to guard and advance my neighbor\'s good name." },
        ]
      },
      {
        number: 42,
        title: "Lord's Day 42",
        sections: [
          { number: 113, text: "Q. 113: What is the aim of the tenth commandment? A. That not even the slightest thought or desire contrary to any one of God\'s commandments should ever arise in our hearts. Rather, with all our hearts we should always hate sin and take pleasure in whatever is right." },
          { number: 114, text: "Q. 114: But can those converted to God obey these commandments perfectly? A. No. In this life even the holiest have only a small beginning of this obedience. Nevertheless, with all seriousness of purpose, they do begin to live according to all, not only some, of God\'s commandments." },
          { number: 115, text: "Q. 115: No one in this life can obey the ten commandments perfectly: why then does God want them preached so pointedly? A. First, so that the longer we live the more we may come to know our sinfulness and the more eagerly look to Christ for forgiveness of sins and righteousness. Second, so that, while praying to God for the grace of the Holy Spirit, we may never stop striving to be renewed more and more after God\'s image, until after this life we reach our goal: perfection." },
        ]
      },
      {
        number: 43,
        title: "Lord's Day 43",
        sections: [
          { number: 116, text: "Q. 116: Why do Christians need to pray? A. Because prayer is the most important part of the thankfulness God requires of us. And also because God gives his grace and Holy Spirit only to those who pray continually and groan inwardly, asking God for these gifts and thanking him for them." },
        ]
      },
      {
        number: 44,
        title: "Lord's Day 44",
        sections: [
          { number: 117, text: "Q. 117: How does God want us to pray so that he will listen to us? A. First, we must pray from the heart to no other than the one true God, who has revealed himself to us in his Word, asking for everything he has commanded us to ask for. Second, we must acknowledge our need and misery, hiding nothing, and humble ourselves in his majestic presence. Third, we must rest on this unshakeable foundation: even though we do not deserve it, God will surely listen to our prayer because of Christ our Lord. That is what he promised us in his Word." },
          { number: 118, text: "Q. 118: What did God command us to pray for? A. Everything we need, spiritually and physically, as embraced in the prayer Christ our Lord himself taught us." },
          { number: 119, text: "Q. 119: What is this prayer? A. Our Father in heaven, hallowed be your name, your kingdom come, your will be done, on earth as it is in heaven. Give us today our daily bread. And forgive us our debts, as we also have forgiven our debtors. And lead us not into temptation, but deliver us from the evil one. For yours is the kingdom and the power and the glory forever. Amen." },
        ]
      },
      {
        number: 45,
        title: "Lord's Day 45",
        sections: [
          { number: 120, text: "Q. 120: Why did Christ command us to call God \'our Father\'? A. At the very beginning of our prayer Christ wants to kindle in us what is basic to our prayer — the childlike awe and trust that God through Christ has become our Father. Our fathers do not refuse us the things of this life; God our Father will even less refuse to give us what we ask in faith." },
          { number: 121, text: "Q. 121: Why the words \'in heaven\'? A. These words teach us not to think of God\'s heavenly majesty as something earthly, and to expect everything for body and soul from his almighty power." },
        ]
      },
      {
        number: 46,
        title: "Lord's Day 46",
        sections: [
          { number: 122, text: "Q. 122: What does the first petition mean? A. \'Hallowed be your name\' means, Help us to really know you, to bless, worship, and praise you for all your works and for all that shines forth from them: your almighty power, wisdom, kindness, justice, mercy, and truth. And it means, Help us to direct all our living — what we think, say, and do — so that your name will never be blasphemed because of us but always honored and praised." },
        ]
      },
      {
        number: 47,
        title: "Lord's Day 47",
        sections: [
          { number: 123, text: "Q. 123: What does the second petition mean? A. \'Your kingdom come\' means, Rule us by your Word and Spirit in such a way that more and more we submit to you. Keep your church strong, and add to it. Destroy the devil\'s work; destroy every force which revolts against you and every conspiracy against your Word. Do this until your kingdom is so complete and perfect that in it you are all in all." },
        ]
      },
      {
        number: 48,
        title: "Lord's Day 48",
        sections: [
          { number: 124, text: "Q. 124: What does the third petition mean? A. \'Your will be done, on earth as it is in heaven\' means, Help us and all people to reject our own wills and to obey your will without any back talk. Your will alone is good. Help us one and all to carry out the work we are called to, as willingly and faithfully as the angels in heaven." },
        ]
      },
      {
        number: 49,
        title: "Lord's Day 49",
        sections: [
          { number: 125, text: "Q. 125: What does the fourth petition mean? A. \'Give us today our daily bread\' means, Do take care of all our physical needs so that we come to know that you are the only source of everything good, and that neither our work and worry nor your gifts can do us any good without your blessing. And so help us to give up our trust in creatures and to put trust in you alone." },
        ]
      },
      {
        number: 50,
        title: "Lord's Day 50",
        sections: [
          { number: 126, text: "Q. 126: What does the fifth petition mean? A. \'And forgive us our debts, as we also have forgiven our debtors\' means, Because of Christ\'s blood, do not hold against us, poor sinners that we are, any of the sins we do or the evil that constantly clings to us. Forgive us just as we are fully determined, as evidence of your grace in us, to forgive our neighbors." },
        ]
      },
      {
        number: 51,
        title: "Lord's Day 51",
        sections: [
          { number: 127, text: "Q. 127: What does the sixth petition mean? A. \'And lead us not into temptation, but deliver us from the evil one\' means, By ourselves we are too weak to hold our own even for a moment. And our sworn enemies — the devil, the world, and our own flesh — never stop attacking us. And so, Lord, uphold us and make us strong with the strength of your Holy Spirit, so that we may not go down to defeat in this spiritual struggle, but may firmly resist our enemies until we finally win the complete victory." },
          { number: 128, text: "Q. 128: What does your conclusion to this prayer mean? A. \'For yours is the kingdom and the power and the glory forever\' means, We have made all these petitions of you because, as our all-powerful king, you both want to and are able to give us all that is good; and because your holy name, and not we ourselves, should receive all the glory, forever and ever." },
        ]
      },
      {
        number: 52,
        title: "Lord's Day 52",
        sections: [
          { number: 129, text: "Q. 129: What does that little word \'Amen\' express? A. Amen means, This is sure to be! It is even more sure that God listens to my prayer than that I really desire what I pray for." },
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
          { number: 1, text: "Our Churches, with common consent, do teach that the decree of the Council of Nicaea concerning the Unity of the Divine Essence and concerning the Three Persons, is true and to be believed without any doubting; that is to say, there is one Divine Essence which is called and which is God: eternal, without body, without parts, of infinite power, wisdom, and goodness, the Maker and Preserver of all things, visible and invisible; and yet there are three Persons, of the same essence and power, who also are coeternal, the Father, the Son, and the Holy Ghost. And the term \"person\" they use as the Fathers have used it, to signify, not a part or quality in another, but that which subsists of itself. They condemn all heresies which have sprung up against this article, as the Manichaeans, who assumed two principles, one Good and the other Evil: also the Valentinians, Arians, Eunomians, Mohammedans, and all such. They condemn also the Samosatenes, old and new, who, contending that there is but one Person, sophistically and impiously argue that the Word and the Holy Ghost are not distinct Persons, but that \"Word\" signifies a spoken word, and \"Spirit\" signifies motion created in things." }
        ]
      },
      {
        number: 2,
        title: "Article II: Of Original Sin",
        sections: [
          { number: 1, text: "Also they teach that since the fall of Adam all men begotten in the natural way are born with sin, that is, without the fear of God, without trust in God, and with concupiscence; and that this disease, or vice of origin, is truly sin, even now condemning and bringing eternal death upon those not born again through Baptism and the Holy Ghost. They condemn the Pelagians and others who deny that original depravity is sin, and who, to obscure the glory of Christ\'s merit and benefits, argue that man can be justified before God by his own strength and reason." }
        ]
      },
      {
        number: 3,
        title: "Article III: Of the Son of God",
        sections: [
          { number: 1, text: "Also they teach that the Word, that is, the Son of God, did assume the human nature in the womb of the blessed Virgin Mary, so that there are two natures, the divine and the human, inseparably enjoined in one Person, one Christ, true God and true man, who was born of the Virgin Mary, truly suffered, was crucified, dead, and buried, that He might reconcile the Father unto us, and be a sacrifice, not only for original guilt, but also for all actual sins of men. He also descended into hell, and truly rose again the third day; afterward He ascended into heaven that He might sit on the right hand of the Father, and forever reign and have dominion over all creatures, and sanctify them that believe in Him, by sending the Holy Ghost into their hearts, to rule, comfort, and quicken them, and to defend them against the devil and the power of sin. The same Christ shall openly come again to judge the quick and the dead, etc., according to the Apostles\' Creed." }
        ]
      },
      {
        number: 4,
        title: "Article IV: Of Justification",
        sections: [
          { number: 1, text: "Also they teach that men cannot be justified before God by their own strength, merits, or works, but are freely justified for Christ\'s sake, through faith, when they believe that they are received into favor, and that their sins are forgiven for Christ\'s sake, who, by His death, has made satisfaction for our sins. This faith God imputes for righteousness in His sight. Rom. 3 and 4." }
        ]
      },
      {
        number: 5,
        title: "Article V: Of the Ministry",
        sections: [
          { number: 1, text: "That we may obtain this faith, the Ministry of Teaching the Gospel and administering the Sacraments was instituted. For through the Word and Sacraments, as through instruments, the Holy Ghost is given, who works faith, where and when it pleases God, in them that hear the Gospel, to wit, that God, not for our own merits, but for Christ\'s sake, justifies those who believe that they are received into grace for Christ\'s sake. They condemn the Anabaptists and others who think that the Holy Ghost comes to men without the external Word, through their own preparations and works." }
        ]
      },
      {
        number: 6,
        title: "Article VI: Of New Obedience",
        sections: [
          { number: 1, text: "Also they teach that this faith is bound to bring forth good fruits, and that it is necessary to do good works commanded by God, because of God\'s will, but that we should not rely on those works to merit justification before God. For remission of sins and justification is apprehended by faith, as also the voice of Christ attests: When ye shall have done all these things, say: We are unprofitable servants. Luke 17:10. The same is also taught by the Fathers. For Ambrose says: It is ordained of God that he who believes in Christ is saved, freely receiving remission of sins, without works, by faith alone." }
        ]
      },
      {
        number: 7,
        title: "Article VII: Of the Church",
        sections: [
          { number: 1, text: "Also they teach that one holy Church is to continue forever. The Church is the congregation of saints, in which the Gospel is rightly taught and the Sacraments are rightly administered. And to the true unity of the Church it is enough to agree concerning the doctrine of the Gospel and the administration of the Sacraments. Nor is it necessary that human traditions, that is, rites or ceremonies, instituted by men, should be everywhere alike. As Paul says: One faith, one Baptism, one God and Father of all, etc. Eph. 4:5-6." }
        ]
      },
      {
        number: 8,
        title: "Article VIII: What the Church Is",
        sections: [
          { number: 1, text: "Although the Church properly is the congregation of saints and true believers, nevertheless, since in this life many hypocrites and evil persons are mingled therewith, it is lawful to use Sacraments administered by evil men, according to the saying of Christ: The Scribes and the Pharisees sit in Moses\' seat, etc. Matt. 23:2. Both the Sacraments and Word are effectual by reason of the institution and commandment of Christ, notwithstanding they be administered by evil men. They condemn the Donatists, and such like, who denied it was lawful to use the ministry of evil men in the Church, and who thought the ministry of evil men to be unprofitable and of none effect." }
        ]
      },
      {
        number: 9,
        title: "Article IX: Of Baptism",
        sections: [
          { number: 1, text: "Of Baptism they teach that it is necessary to salvation, and that through Baptism is offered the grace of God, and that children are to be baptized who, being offered to God through Baptism are received into God\'s grace. They condemn the Anabaptists, who reject the baptism of children, and say that children are saved without Baptism." }
        ]
      },
      {
        number: 10,
        title: "Article X: Of the Lord's Supper",
        sections: [
          { number: 1, text: "Of the Supper of the Lord they teach that the Body and Blood of Christ are truly present, and are distributed to those who eat the Supper of the Lord; and they reject those that teach otherwise." }
        ]
      },
      {
        number: 11,
        title: "Article XI: Of Confession",
        sections: [
          { number: 1, text: "Of Confession they teach that Private Absolution ought to be retained in the churches, although in confession an enumeration of all sins is not necessary. For it is impossible according to the Psalm: Who can understand his errors? Ps. 19:12." }
        ]
      },
      {
        number: 12,
        title: "Article XII: Of Repentance",
        sections: [
          { number: 1, text: "Of Repentance they teach that for those who have fallen after Baptism there is remission of sins whenever they are converted, and that the Church ought to impart absolution to those thus returning to repentance. Now, repentance consists properly of two parts: One is contrition, that is, terrors smiting the conscience through the knowledge of sin; the other is faith, which is born of the Gospel, or of absolution, and believes that for Christ\'s sake, sins are forgiven, comforts the conscience, and delivers it from terror. Then good works are bound to follow, which are the fruits of repentance. They condemn the Anabaptists, who deny that those once justified can lose the Holy Ghost. Also condemned are those who contend that some may attain to such perfection in this life that they cannot sin. The Novatians also are condemned, who would not absolve such as had fallen after Baptism, though they returned to repentance. They also are rejected who do not teach that remission of sins comes through faith, but command us to merit grace through satisfactions of our own." }
        ]
      },
      {
        number: 13,
        title: "Article XIII: Of the Use of the Sacraments",
        sections: [
          { number: 1, text: "Of the Use of the Sacraments they teach that the Sacraments were ordained, not only to be marks of profession among men, but rather to be signs and testimonies of the will of God toward us, instituted to awaken and confirm faith in those who use them. Wherefore we must so use the Sacraments that faith be added to believe the promises which are offered and set forth through the Sacraments. They therefore condemn those who teach that the Sacraments justify by the outward act, and who do not teach that, in the use of the Sacraments, faith which believes that sins are forgiven, is required." }
        ]
      },
      {
        number: 14,
        title: "Article XIV: Of Ecclesiastical Order",
        sections: [
          { number: 1, text: "Of Ecclesiastical Order they teach that no one should publicly teach in the Church or administer the Sacraments unless he be regularly called." }
        ]
      },
      {
        number: 15,
        title: "Article XV: Of Ecclesiastical Usages",
        sections: [
          { number: 1, text: "Of Usages in the Church they teach that those ought to be observed which may be observed without sin, and which are profitable unto tranquillity and good order in the Church, as particular holy days, festivals, and the like. Nevertheless, concerning such things men are admonished that consciences are not to be burdened, as though such observance was necessary to salvation. They are admonished also that human traditions instituted to propitiate God, to merit grace, and to make satisfaction for sins, are opposed to the Gospel and the doctrine of faith. Wherefore vows and traditions concerning meats and days, etc., instituted to merit grace and to make satisfaction for sins, are useless and contrary to the Gospel." }
        ]
      },
      {
        number: 16,
        title: "Article XVI: Of Civil Affairs",
        sections: [
          { number: 1, text: "Of Civil Affairs they teach that lawful civil ordinances are good works of God, and that it is right for Christians to bear civil office, to sit as judges, to judge matters by the Imperial and other existing laws, to award just punishments, to engage in just wars, to serve as soldiers, to make legal contracts, to hold property, to make oath when required by the magistrates, to marry a wife, to be given in marriage. They condemn the Anabaptists who forbid these civil offices to Christians. They condemn also those who do not place evangelical perfection in the fear of God and in faith, but in forsaking civil offices, for the Gospel teaches an eternal righteousness of the heart. Meanwhile, it does not destroy the State or the family, but very much requires that they be preserved as ordinances of God, and that charity be practiced in such ordinances. Therefore, Christians are necessarily bound to obey their own magistrates and laws save only when commanded to sin; for then they ought to obey God rather than men. Acts 5:29." }
        ]
      },
      {
        number: 17,
        title: "Article XVII: Of Christ's Return to Judgment",
        sections: [
          { number: 1, text: "Also they teach that at the Consummation of the World Christ will appear for judgment, and will raise up all the dead; He will give to the godly and elect eternal life and everlasting joys, but ungodly men and the devils He will condemn to be tormented without end. They condemn the Anabaptists, who think that there will be an end to the punishments of condemned men and devils. They condemn also others who are now spreading certain Jewish opinions, that before the resurrection of the dead the godly shall take possession of the kingdom of the world, the ungodly being everywhere suppressed." }
        ]
      },
      {
        number: 18,
        title: "Article XVIII: Of Free Will",
        sections: [
          { number: 1, text: "Of Free Will they teach that man\'s will has some liberty to choose civil righteousness, and to work things subject to reason. But it has no power, without the Holy Ghost, to work the righteousness of God, that is, spiritual righteousness; since the natural man receiveth not the things of the Spirit of God, 1 Cor. 2:14; but this righteousness is wrought in the heart when the Holy Ghost is received through the Word. These things are said in as many words by Augustine in his Hypognosticon, Book III: We concede that all men have a free will, free, inasmuch as it has the judgment of reason; not that it is thereby capable, without God, either to begin, or, at least, to complete aught in things pertaining to God, but only in works of this life, whether good or evil. \"Good\" I call those works which spring from the good in nature, such as, willing to labor in the field, to eat and drink, to have a friend, to clothe oneself, to build a house, to marry a wife, to raise cattle, to learn divers useful arts, or whatsoever good pertains to this life. For all of these things are not without dependence on the providence of God; yea, of Him and through Him they are and have their being. \"Evil\" I call such works as willing to worship an idol, to commit murder, etc. They condemn the Pelagians and others who teach that without the Holy Ghost, by the power of nature alone, we are able to love God above all things; also to do the commandments of God as touching \"the substance of the act.\" For, although nature is able in a measure to do the outward work, (for it is able to keep the hands from theft and murder,) yet it cannot produce the inward motions, such as the fear of God, trust in God, chastity, patience, etc." }
        ]
      },
      {
        number: 19,
        title: "Article XIX: Of the Cause of Sin",
        sections: [
          { number: 1, text: "Of the Cause of Sin they teach that, although God does create and preserve nature, yet the cause of sin is the will of the wicked, that is, of the devil and ungodly men; which will, unaided of God, turns itself from God, as Christ says John 8:44: When he speaketh a lie, he speaketh of his own." }
        ]
      },
      {
        number: 20,
        title: "Article XX: Of Good Works",
        sections: [
          { number: 1, text: "Our teachers are falsely accused of forbidding Good Works. For their published writings on the Ten Commandments, and others of like import, bear witness that they have taught to good purpose concerning all estates and duties of life, as to what estates of life and what works in every calling be pleasing to God. Concerning these things preachers used to teach but little, and urged only childish and needless works, as particular holy days, particular fasts, brotherhoods, pilgrimages, services in honor of saints, the use of rosaries, monasticism, and such like. Since our adversaries have been admonished of these things, they are now unlearning them, and do not preach these unprofitable works as heretofore. Besides, they are beginning to mention faith, of which there was formerly marvelous silence. They teach that we are justified not by works only, but they conjoin faith and works, and say that we are justified by faith and works. This doctrine is more tolerable than the former one, and can afford more consolation than their old doctrine. Forasmuch, therefore, as the doctrine concerning faith, which ought to be the chief one in the Church, has lain so long unknown, as all must needs grant that there was the deepest silence in their sermons concerning the righteousness of faith, while only the doctrine of works was treated in the churches, our teachers have instructed the churches concerning faith as follows: We begin by teaching that our works cannot reconcile God or merit forgiveness of sins, grace, and justification, but that we obtain this only by faith when we believe that we are received into favor for Christ\'s sake, Who alone has been set forth the Mediator and Propitiation, 1 Tim. 2:5, that the Father may be reconciled through Him. Whosoever, therefore, trusts that by works he merits grace, despises the merit and grace of Christ, and seeks a way to God without Christ, by human strength, although Christ has said of Himself: I am the Way, the Truth, and the Life. John 14:6. This doctrine concerning faith is everywhere treated by Paul: Eph. 2:8: By grace are ye saved through faith; and that not of yourselves, it is the gift of God, not of works, etc. And lest any one should craftily say that a new interpretation of Paul has been devised by us, this entire matter is supported by the testimonies of the Fathers. For Augustine, in many volumes, defends grace and the righteousness of faith, over against the merits of works. And Ambrose, in his De Vocatione Gentium, and elsewhere, teaches to like effect. For in his De Vocatione Gentium he says as follows: Redemption by the blood of Christ would become of little value, neither would the preeminence of man\'s works be superseded by the mercy of God, if justification, which is wrought by grace, were due to the merits going before, so as to be, not the free gift of a donor, but the reward due to the laborer. But since faith is that which brings justification and not some works which follow upon faith, we do not on that account abolish or forbid good works. We teach that good works necessarily follow justification. The regenerate man is enabled by the Holy Spirit, who is received through faith, to perform the works which God commands. The law teaches what kinds of works God requires, namely, love to God and one\'s neighbor, obedience to parents, chastity, diligence, and the like. Those who are not justified by the Holy Ghost but follow only external discipline, cannot truly keep God\'s commandments. As an example of what we mean by good works which are acceptable to God: when a bishop governs the church, preaches the Gospel, ministers the sacraments, when a father trains his children in a godly way, when a mother nurses her infant and maintains the household, when a prince maintains order and justice in his kingdom, when a laborer toils in the fields — these are all good works which are acceptable to God. They condemn those who teach that we merit grace and justification before God by our works, and they commend those who teach that we are freely justified by faith for Christ\'s sake." }
        ]
      },
      {
        number: 21,
        title: "Article XXI: Of the Worship of the Saints",
        sections: [
          { number: 1, text: "Of the Worship of Saints they teach that the memory of saints may be set before us, that we may follow their faith and good works, according to our calling, as the Emperor may follow the example of David in making war to drive away the Turk from his country; for both are kings. But the Scripture does not teach that we are to invoke saints or to ask help of saints, since it sets before us the one Christ as the Mediator, Propitiation, High Priest, and Intercessor. He is to be prayed to, and has promised that He will hear our prayer; and this worship He approves above all, to wit, that in all afflictions He be called upon, 1 John 2:1: If any man sin, we have an Advocate with the Father, etc." }
        ]
      },
      {
        number: 22,
        title: "Article XXII: Of Both Kinds in the Sacrament",
        sections: [
          { number: 1, text: "To the laity are given Both Kinds in the Sacrament of the Lord\'s Supper, because this usage has the commandment of the Lord: Drink ye all of it, Matt. 26:27, where Christ has manifestly commanded concerning the cup that all should drink. And lest any man should craftily gloss over these words and say that they relate only to priests, Paul in 1 Cor. 11:27 recites the use of Both Kinds as belonging to the whole Church: Whosoever shall eat this bread and drink this cup of the Lord unworthily, shall be guilty of the Body and Blood of the Lord. By these words it appears that the cup belongs also to the laity. For Paul speaks to the whole Church at Corinth when he says: Whosoever shall eat this bread and drink this cup of the Lord unworthily, he among those that eat and drink, who is guilty of the Body and Blood of the Lord. Also, long after, Gelasius, the Roman Bishop, commands that the Sacrament be not divided, Pope Gelasius, Dist. 2, De Consecrat. c. Comperimus. Only custom, not so ancient, has it otherwise. But it is evident that, where there is a custom introduced against the commandments of God, such custom is to be abandoned, as the Canons witness, Dist. 8, c. Veritate, and c. Consuetudo. But this custom has been received, not only against the Scripture, but also against the old Canons and the example of the Church. Therefore, if any preferred to use both kinds of the Sacrament, they were not to be compelled to do otherwise. And forasmuch as the division of the Sacrament does not agree with the institution of Christ, we are accustomed to omit the procession, which hitherto has been in use." }
        ]
      },
      {
        number: 23,
        title: "Article XXIII: Of the Marriage of Priests",
        sections: [
          { number: 1, text: "There has been common complaint concerning the examples of priests who were not chaste. For that reason also Pope Pius is reported to have said that there were certain causes why marriage was taken from priests, but that there were far weightier ones why it ought to be given back; for so Platina writes. Since, therefore, our priests were desirous to avoid these open scandals, they married wives, and taught that it was lawful for them to contract matrimony. First, because Paul says, 1 Cor. 7:2: To avoid fornication, let every man have his own wife. Also verse 9: It is better to marry than to burn. Secondly, Christ says, Matt. 19:11: All men cannot receive this saying, where He teaches that not all men are fit to lead a single life; for God created man for procreation, Gen. 1:28. Nor is it in man\'s power, without a singular gift and work of God, to alter this creation. Therefore, those who are not fit for a single life ought to contract matrimony. For no man\'s law, no vow, can annul the commandment and institution of God. For these reasons the priests teach that it is lawful for them to marry wives. It is also evident that in the ancient Church priests were married men. For Paul says, 1 Tim. 3:2, that a bishop should be chosen who is the husband of one wife. And in Germany, four hundred years ago for the first time, the priests were compelled to lead a single life, who indeed offered such resistance that the Archbishop of Mayence, when about to publish the Pope\'s decree concerning this matter, was almost killed in the tumult raised by the enraged priests. And the dealing in the matter was so harsh that not only were marriages forbidden for the future, but also existing marriages were torn asunder, contrary to all laws, divine and human, contrary even to the Canons themselves, made not only by the Popes but by most celebrated Councils. Seeing also that, as the world is aging, man\'s nature is gradually growing weaker, it is well to guard against more vices and infirmities entering Germany. Furthermore, God ordained marriage to be a help against human infirmity. The Canons themselves say that the old rigor ought now and then to be relaxed in behalf of the weakness of men; which it is to be wished were done in this matter. And it is to be expected that the churches shall at some time lack pastors if marriage continues to be forbidden. But while the commandment of God is in force, while the custom of the Church is well known, while impure celibacy causes many scandals, adulteries, and other crimes deserving the punishments of just magistrates, yet it is a marvelous thing that in nothing is more cruelly exercised than in this matter. God has commanded that marriage be had in honor. The laws of all well-ordered commonwealths, even among the heathen, have glorified marriage most highly. But now men, and that, priests, are cruelly put to death, contrary to the intent of the Canons, for no other cause than marriage. Paul, in 1 Tim. 4:3, calls that a doctrine of devils which forbids marriage. This may now be readily understood when the law against marriage is maintained by such penalties." }
        ]
      },
      {
        number: 24,
        title: "Article XXIV: Of the Mass",
        sections: [
          { number: 1, text: "Falsely are our churches accused of abolishing the Mass; for the Mass is retained among us, and celebrated with the highest reverence. Nearly all the usual ceremonies are also preserved, save that the parts sung in Latin are interspersed here and there with German hymns, which have been added to teach the people. For ceremonies are needed to this end alone that the unlearned be taught [what they need to know of Christ]. Moreover, the people are accustomed to partake of the Sacrament together, if any be fit for it, and this also increases the reverence and devotion of public worship. For none are admitted except they be first examined. The people are also advised concerning the dignity and use of the Sacrament, how great consolation it brings to anxious consciences, that they may learn to believe God, and to expect and ask of Him all that is good. Thus the worship is not abolished; it is rather approved; but this abuse is corrected that the Mass should not be used as a work which, when offered for others, merits remission of sins for them. For this is what is attributed to the Mass when it is said that it is a sacrifice of propitiation for the living and the dead, which profits ex opere operato. Some have not only taught that it is a sacrifice, but also that the repetition of the sacrifice is necessary for the forgiveness of sins. From this doctrine came innumerable Masses. But the Scripture teaches that we are justified before God through faith in Christ, not through works or the merit of the Mass. Against these errors our teachers have taught the following: The one sacrifice of Christ, his death upon the cross, has made satisfaction for all our sins, as it is written, Heb. 10:12: Christ, having offered one sacrifice for sins forever, sat down on the right hand of God. It is a monstrous thing that men have dared to invent new ways of justification and new works for the forgiveness of sins, and to sell these in the churches. However, it is plain that the Mass was instituted in the Church not merely to be a sacrament but also to be a commemoration and a giving of thanks to God. Therefore, we retain the Mass and observe it with all reverence. We add German hymns that the people may be taught. We have not abolished the canonical Hours, but we preach and teach the Word, and administer the Sacraments in a manner pleasing to God. We preach the passion of Christ, not merely as an example, but as the sacrifice by which sin is atoned, by which justification and eternal life are given to us. We reject the private masses in which the priest alone communicated and which were not celebrated for the instruction and edification of the congregation, since this kind of private mass is contrary to the institution of Christ." }
        ]
      },
      {
        number: 25,
        title: "Article XXV: Of Confession",
        sections: [
          { number: 1, text: "Confession in the churches is not abolished among us; for it is not usual to give the body of the Lord, except to them that have been previously examined and absolved. And the people are most carefully taught concerning faith in the absolution, about which there was formerly profound silence. Our people are taught that they should highly prize the absolution, as being the voice of God, and pronounced by God\'s command. The power of the keys is set forth in its beauty and they are reminded what great consolation it brings to anxious consciences, that God requires faith to believe the absolution as truly as if they heard a voice from heaven, that they should joyfully receive the absolution, and that this faith in the absolution is truly receiving the forgiveness of sins, which God has promised in the Gospel. Formerly satisfaction was extolled without mercy; of faith and the merit of Christ and the righteousness of faith no mention was made; wherefore, on this point, our churches are by no means to be blamed. For this even our adversaries have to concede to us that the doctrine concerning repentance has been most diligently treated and laid open by our teachers. But of Confession they teach that an enumeration of sins is not necessary, and that consciences be not burdened with anxiety to enumerate all sins, for it is impossible to recount all sins, as the Psalm testifies: Who can understand his errors? Ps. 19:12. The Fathers also are of this mind. For in the Decrees of Chrysostom it is written: I say not to thee that thou shouldest go into public, nor that thou shouldest accuse thyself before others, but I would have thee obey the prophet who says, Reveal thy way before God. Therefore confess thy sins before God, the true Judge, with prayer. Tell thine errors, not to a fellow-servant, that may upbraid thee, but to the Lord, who heals and cares for thee. And the Gloss of Gratian acknowledges that Confession is of human right only. Nevertheless, Confession is retained among us on account of the great benefit of absolution, and because it is otherwise useful to the conscience." }
        ]
      },
      {
        number: 26,
        title: "Article XXVI: Of the Distinction of Meats",
        sections: [
          { number: 1, text: "It has been the general persuasion, not of the people alone, but also of those teaching in the churches, that making distinctions of meats, and like traditions of men, are works profitable to merit grace, and able to make satisfactions for sins. And that the world so thought, appears from this, that new ceremonies, new orders, new holidays, and new fasts were daily instituted, and the teachers in the churches did exact these works as a service necessary to merit grace, and did greatly terrify men\'s consciences if they should omit any of these things. From this persuasion concerning traditions much detriment has resulted in the Church. First, it has obscured the doctrine of grace and the righteousness of faith, which is the chief part of the Gospel, and ought to stand out as the most prominent in the Church, that the merit of Christ may be well known, and that faith which believes that sins are forgiven for Christ\'s sake, may be exalted far above works and above all other acts of worship. Paul, therefore, lays the greatest stress on this article, and puts aside the law and human traditions, in order to show that Christian righteousness is something else than such works, to wit, the faith which believes that sins are freely forgiven for Christ\'s sake. But this doctrine of Paul has been almost wholly smothered by traditions, which have produced the opinion that, by making distinctions in meats and like services, we must merit grace and righteousness. In treating of repentance, there was no mention made of faith; only those works of satisfaction were set forth; in these the whole of repentance seemed to consist. Secondly, these traditions have obscured the commandments of God, because traditions were placed far above the commandments of God. Christianity was thought to consist wholly in the observance of certain holidays, rites, fasts, and vestments. These observances had a striking appearance of sanctity and wisdom, and in the meantime the commandments of God, according to each one\'s calling, were without honor, namely, that a father brought up his children, that a mother governed her household, that a prince governed the commonwealth; these were accounted worldly matters, and imperfect, and far below those glittering observances. And this error greatly tormented devout consciences which grieved that they were held in an imperfect state of life, as in marriage, in the office of magistrate, or in other civil ministrations; on the other hand, they admired the monks and such like, and falsely imagined that the observances of such men were more acceptable to God. Thirdly, traditions brought great danger to consciences; for it was impossible to keep all traditions, and yet men judged these observances to be necessary acts of worship. Gerson writes that many fell into despair, and that some even took their own lives, because they felt that they were not able to satisfy the traditions, and they had all the while heard nothing of the consolation of the righteousness of faith and of grace. We see that the summists and theologians gather the traditions together, and seek mitigations whereby to ease consciences, and yet they do not sufficiently unloose, but sometimes entangle, the consciences still more. And with the gathering of these traditions, the schools and sermons have been so much occupied that they have had no leisure to touch upon Scripture, and to seek the more profitable doctrine of faith, of the cross, of hope, of the dignity of civil affairs, of consolation of sorely tried consciences. Hence Gerson and some other theologians have been moved with complaints that they were hindered by these strivings about traditions from attaining to a better kind of doctrine. Augustine also forbids that men\'s consciences should be burdened with such observances, and prudently advises Januarius that he must know that they are to be observed as things indifferent; for such are his words. Wherefore our teachers must not be looked upon as having taken up this matter rashly or from hatred of the bishops, as some falsely suspect. There was great need to warn the churches of these errors, which had arisen from misunderstanding of traditions. For the Gospel compels us to insist in the churches upon the doctrine of grace and of the righteousness of faith; which, however, cannot be understood, if men think that they merit grace by observances of their own choice. Thus, therefore, they have taught that by the observance of human traditions we cannot merit grace or be justified, and hence we must not think such observances necessary acts of worship. They add testimonies of Scripture. Christ, Matt. 15:3, defends the Apostles who had not observed the usual tradition, which, however, evidently pertained to a matter not unlawful, but indifferent, and excuses them, saying: In vain do they worship Me with the commandments of men. He, therefore, does not exact a useless worship. Shortly after He adds: Not that which goeth into the mouth defileth a man. So also Paul, Rom. 14:17: The kingdom of God is not meat and drink. Col. 2:16: Let no man judge you in meat, or in drink, or in respect of a holy day, or of the Sabbath-day. Also in Tit. 1:14 he openly says that they must not give heed to Jewish fables and commandments of men that turn from the truth. And Christ says of those who urge traditions: Let them alone, they be blind leaders of the blind. Matt. 15:14. These things being so, our people refuse unjust accusations. For they keep the traditions, as many as may be kept without sin. But some traditions are, of themselves, such that they cannot be kept without sin. As to festivals, they teach that the Lord\'s Day ought to be retained for the sake of the instruction and rest of the people, but that we are not bound to observe the Jewish Sabbath, which the Lord Himself abrogated, as it is written: Col. 2:16, 17. But since the ancient observances are retained in regard to the Lord\'s Day and other holy days, the adversaries cannot accuse us of departing from the ancient customs. Furthermore, the fasts are not wholly abolished. Specific fasts are retained, as a discipline of the body, not as a means of meriting grace. But the notion that fasts are works which merit grace and expiate sins is renounced. Therefore those traditions are to be distinguished which are contrary to the Gospel, from those which are not. Hence we must separate the commandments of God from the traditions of men, and distinguish what belongs to the divine order from the observances of the church, which the church may change for good reasons. Lastly, the adversaries condemn us for teaching that men are free from the law. For they say we teach in this that man is free from the law of God. But we teach that we are free from the ceremonies of Moses, not from the moral law. God has indeed commanded us not to observe the ceremonies of Moses, but the moral law remains in force." }
        ]
      },
      {
        number: 27,
        title: "Article XXVII: Of Monastic Vows",
        sections: [
          { number: 1, text: "What is taught among us concerning Monastic Vows, will be better understood if it be remembered what has been the state of the monasteries, and how many things were daily done in those very monasteries contrary to the Canons. In Augustine\'s time, monastic life was voluntary. Afterward, when discipline was corrupted, vows were added everywhere, with the design of restoring discipline by this means, as by a prison. Many other observances were added besides vows, in course of time. And these fetters were laid upon many before the lawful age, contrary to the Canons. Many also entered into this kind of life through ignorance, being unable to judge of their strength, though they were of sufficient age. Being thus ensnared, they were compelled to remain, even though some could have been freed by the Canons. And this was more the case in convents of women than of monks, although more consideration should have been shown the weaker sex. This rigor displeased many good men before this time, who saw that young men and maidens were thrown into convents for a maintenance. They saw what unfortunate results came of this procedure, and what scandals were created, what snares were laid for consciences! They were grieved that the authority of the Canons in so momentous a matter was utterly set aside and despised. To these evils was added an opinion concerning vows which, it is well known, in former times displeased even those monks who were more considerate. They taught that monastic vows were equal to Baptism; they taught that by this kind of life they merited forgiveness of sins and justification before God. Yea, they added that the monastic life not only merited righteousness before God, but greater things still, because it kept not only the precepts but also the evangelical counsels. Thus they made men believe that the monastic profession was far better than Baptism, and that the monastic life was more meritorious than that of magistrates, than the life of pastors, and such like, who served their calling in accordance with God\'s commands, without any man-made rules. None of these things can be denied; for they appear in their own books. What happened next in the monasteries? Formerly they were schools of theology and of other branches useful to the Church; from them came pastors and bishops. Now it is different. It is needless to rehearse what is known to all. Formerly they came together to learn; now they feign that it is a kind of life instituted to merit grace and righteousness; yea, they preach that it is a state of perfection, and they put it far above all other modes of life ordained by God. These things we have recounted without odious exaggeration, to the end that our doctrine on this point might be better understood. First, concerning such as contract matrimony: since among us there are many priests and monks who, having abandoned the monastic life, have contracted matrimony, we teach that those who have done this have acted rightly; for they have been released from their vows by a divine dispensation, in that Christ has redeemed and freed them from the bondage of the law. These things being so, we refer to the canons themselves for the refutation of the adversaries. For the Canons say, if any one through ignorance or from other causes has made a vow he cannot fulfil, such person may be freed from his vow. Now, if we look at the matter closely, it is certain that many who made monastic vows did not fully understand them, and were not able to keep them. Neither ought any one be compelled to obey a vow which is impossible to be kept or is unlawful. And we believe that this is the right view to take of the matter. For Paul says, 1 Cor. 7:20: Let every man abide in the same calling wherein he was called. Also verse 9: It is better to marry than to burn. Furthermore, faith requires that we understand what God demands and what is possible for us. So when a monk perceives that he cannot live a chaste life in the monastery, he ought to leave and marry. For all human tradition must yield to the word of God, and to faith, and to the divine ordinance of matrimony. We believe therefore that those who have broken their monastic vows, were moved thereto by a divine impulse, not by mere wantonness of will. Therefore we do not condemn them, but praise them. And of the vow of celibacy itself, we teach that it cannot be a work that merits justification; for justification is only by faith in Christ. Now, if a monk thinks that he merits justification by his vow of celibacy, he errs greatly. But on the other hand, those who believe that they are able to keep the vow of celibacy without sin, and that they are fit for it, may remain in the monastic life; for we have no desire to break up monasteries or to forbid celibacy. We only say that whoever wishes to live celibate may do so. But whoever cannot live celibate without sin ought to marry. Neither do we condemn the vow of poverty; those who wish to live in voluntary poverty and to serve God in this manner, may do so. But the vow of poverty ought not to be made a matter of merit and of satisfaction for sins. For poverty itself, if undertaken in the right spirit and for God\'s glory, is not sinful." }
        ]
      },
      {
        number: 28,
        title: "Article XXVIII: Of Ecclesiastical Power",
        sections: [
          { number: 1, text: "There has been great controversy concerning the Power of Bishops, in which some have awkwardly confounded the power of the Church and the power of the sword. And from this confusion very great wars and tumults have resulted, while the Popes, emboldened by the power of the Keys, not only have instituted new services and burdened consciences with reservation of cases and ruthless excommunications, but have also undertaken to transfer the kingdoms of this world, and to take the Empire from the Emperor. These wrongs have long since been rebuked in the Church by learned and godly men. Therefore our teachers, for the comforting of men\'s consciences, were constrained to show the difference between the power of the Church and the power of the sword, and taught that both of them, because of God\'s commandment, are to be held in reverence and honor, as the chief blessings of God on earth. But this is their opinion: that the power of the Keys, or the power of the bishops, according to the Gospel, is a power or commandment of God, to preach the Gospel, to remit and retain sins, and to administer Sacraments. For with this commandment Christ sends forth His Apostles, John 20:21 sqq.: As My Father hath sent Me, even so send I you. Receive ye the Holy Ghost. Whosesoever sins ye remit, they are remitted unto them; and whosesoever sins ye retain, they are retained. Mark 16:15: Go preach the Gospel to every creature. This power is exercised only by teaching or preaching the Gospel and administering the Sacraments, according to their calling either to many or to individuals. For thereby are granted, not bodily, but eternal things, as eternal righteousness, the Holy Ghost, eternal life. These things cannot come but by the ministry of the Word and the Sacraments, as Paul says: Rom. 1:16: The Gospel is the power of God unto salvation to every one that believeth. Therefore, since the power of the Church grants eternal things, and is exercised only through the ministry of the Word, it does not interfere with civil government; no more than the art of singing interferes with civil government. For civil government deals with other things than does the Gospel. The civil rulers defend not minds, but bodies and bodily things against manifest injuries, and restrain men with the sword and bodily punishments in order to preserve civil justice and peace. Therefore, the two authorities, the spiritual and the civil, are not to be mingled or confused, for the spiritual power has its commission to preach the Gospel and administer the sacraments. Hence it follows that bishops as bishops (that is, as those who have charge of the ministry of the Word and Sacraments) have no command to introduce ways of worshiping God, to institute or abrogate feasts, or to make laws and canons concerning meats and beverages, vestments, and the like, except that such ordinances should be formed with the consent of the Church for the sake of good order and tranquillity. But for such ordinances there is this law, that they should not burden consciences. Now our adversaries charge us that our teachers have rent asunder the Church and have separated themselves from it. But the separation was not made by our teachers; for neither does the doctrine of our teachers require it, as is proved above, nor do our teachers desire it. Our teachers do not desire separation from the Church; they only ask that the abuses which have crept in be corrected. If this cannot be done, they are compelled to follow the Apostle, who says, Acts 5:29: We must obey God rather than men. Paul in Gal. 1:8 threatens with a curse those who teach otherwise than the Gospel. The bishops, therefore, who defend the wicked usages, sin against God and the Church, and shall have to give account to God. But if any bishop be found who is not willing to hear and to amend the abuses introduced into the church, the people may be instructed that they are not bound by human traditions which are against the Word of God. The bishops have no right to force upon men any tradition which is not founded in the Word of God, and which is contrary to the canons and the customs of the Church. As Paul says, 2 Cor. 10:8: For though I should boast somewhat more of our authority, which the Lord hath given us for edification, and not for your destruction, I should not be ashamed. Therefore we ask that the bishops be willing to abate the rigor which they are exercising in the matter of the administration of rites which are not necessary to salvation. If they will do this, they will show a pastoral care not only for their own people, but also for the whole Church." }
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
          { number: 1, text: "The Holy Scripture is the only sufficient, certain, and infallible rule of all saving knowledge, faith, and obedience, although the light of nature, and the works of creation and providence do so far manifest the goodness, wisdom, and power of God, as to leave men inexcusable; yet are they not sufficient to give that knowledge of God and his will which is necessary unto salvation. Therefore it pleased the Lord at sundry times and in divers manners to reveal himself, and to declare that his will unto his church; and afterward for the better preserving and propagating of the truth, and for the more sure establishment and comfort of the church against the corruption of the flesh, and the malice of Satan, and of the world, to commit the same wholly unto writing; which maketh the Holy Scriptures to be most necessary, those former ways of God\\'s revealing his will unto his people being now ceased." },
          { number: 2, text: "Under the name of Holy Scripture, or the Word of God written, are now contained all the books of the Old and New Testaments, which are these: Of the Old Testament: Genesis, Exodus, Leviticus, Numbers, Deuteronomy, Joshua, Judges, Ruth, I Samuel, II Samuel, I Kings, II Kings, I Chronicles, II Chronicles, Ezra, Nehemiah, Esther, Job, Psalms, Proverbs, Ecclesiastes, The Song of Songs, Isaiah, Jeremiah, Lamentations, Ezekiel, Daniel, Hosea, Joel, Amos, Obadiah, Jonah, Micah, Nahum, Habakkuk, Zephaniah, Haggai, Zechariah, Malachi. Of the New Testament: Matthew, Mark, Luke, John, The Acts of the Apostles, Paul\\'s Epistle to the Romans, I Corinthians, II Corinthians, Galatians, Ephesians, Philippians, Colossians, I Thessalonians, II Thessalonians, I Timothy, II Timothy, To Titus, To Philemon, The Epistle to the Hebrews, Epistle of James, The First and Second Epistles of Peter, The First, Second, and Third Epistles of John, The Epistle of Jude, The Revelation. All of which are given by the inspiration of God, to be the rule of faith and life." },
          { number: 3, text: "The books commonly called Apocrypha, not being of divine inspiration, are no part of the canon or rule of the Scripture, and therefore are of no authority to the church of God, nor to be any otherwise approved or made use of than other human writings." },
          { number: 4, text: "The authority of the Holy Scripture, for which it ought to be believed, dependeth not upon the testimony of any man or church, but wholly upon God (who is truth itself), the author thereof; therefore it is to be received because it is the Word of God." },
          { number: 5, text: "We may be moved and induced by the testimony of the church of God to an high and reverent esteem of the Holy Scriptures; and the heavenliness of the matter, the efficacy of the doctrine, and the majesty of the style, the consent of all the parts, the scope of the whole (which is to give all glory to God), the full discovery it makes of the only way of man\\'s salvation, and many other incomparable excellencies, and entire perfections thereof, are arguments whereby it doth abundantly evidence itself to be the Word of God; yet notwithstanding, our full persuasion and assurance of the infallible truth, and divine authority thereof, is from the inward work of the Holy Spirit bearing witness by and with the Word in our hearts." },
          { number: 6, text: "The whole counsel of God concerning all things necessary for his own glory, man\\'s salvation, faith and life, is either expressly set down or necessarily contained in the Holy Scripture; unto which nothing at any time is to be added, whether by new revelation of the Spirit, or traditions of men. Nevertheless we acknowledge the inward illumination of the Spirit of God to be necessary for the saving understanding of such things as are revealed in the Word, and that there are some circumstances concerning the worship of God, and government of the church, common to human actions and societies, which are to be ordered by the light of nature and Christian prudence, according to the general rules of the Word, which are always to be observed." },
          { number: 7, text: "All things in Scripture are not alike plain in themselves, nor alike clear unto all; yet those things which are necessary to be known, believed, and observed for salvation, are so clearly propounded and opened in some place of Scripture or other, that not only the learned, but the unlearned, in a due use of ordinary means, may attain to a sufficient understanding of them." },
          { number: 8, text: "The Old Testament in Hebrew (which was the native language of the people of God of old), and the New Testament in Greek (which at the time of the writing of it was most generally known to the nations), being immediately inspired by God, and by his singular care and providence kept pure in all ages, are therefore authentic; so as in all controversies of religion, the church is finally to appeal to them. But because these original tongues are not known to all the people of God who have right unto and interest in the Scriptures, and are commanded in the fear of God to read and search them, therefore they are to be translated into the vulgar language of every nation unto which they come, that the Word of God dwelling plentifully in all, they may worship him in an acceptable manner, and through patience and comfort of the Scriptures may have hope." },
          { number: 9, text: "The infallible rule of interpretation of Scripture is the Scripture itself; and therefore when there is a question about the true and full sense of any Scripture (which is not manifold, but one), it must be searched by other places that speak more clearly." },
          { number: 10, text: "The supreme judge, by which all controversies of religion are to be determined, and all decrees of councils, opinions of ancient writers, doctrines of men, and private spirits, are to be examined, and in whose sentence we are to rest, can be no other but the Holy Scripture delivered by the Spirit; into which Scripture so delivered, our faith is finally resolved." }
        ]
      },
      {
        number: 2,
        title: "Of God and of the Holy Trinity",
        sections: [
          { number: 1, text: "The Lord our God is but one only living and true God; whose subsistence is in and of himself, infinite in being and perfection; whose essence cannot be comprehended by any but himself; a most pure spirit, invisible, without body, parts, or passions, who only hath immortality, dwelling in the light which no man can approach unto; who is immutable, immense, eternal, incomprehensible, almighty, every way infinite, most holy, most free, most absolute; working all things according to the counsel of his own immutable and most righteous will, for his own glory; most loving, gracious, merciful, long-suffering, abundant in goodness and truth, forgiving iniquity, transgression, and sin; the rewarder of them that diligently seek him, and withal most just and terrible in his judgments, hating all sin, and who will by no means clear the guilty." },
          { number: 2, text: "God, having all life, glory, goodness, blessedness, in and of himself, is alone in and unto himself all-sufficient, not standing in need of any creature which he hath made, nor deriving any glory from them, but only manifesting his own glory in, by, unto, and upon them; he is the alone fountain of all being, of whom, through whom, and to whom are all things, and he hath most sovereign dominion over all creatures, to do by them, for them, or upon them, whatsoever himself pleaseth; in his sight all things are open and manifest, his knowledge is most holy, most free, and most perfect; for nothing is to him contingent or uncertain. He is most holy in all his counsels, in all his works, and in all his commands. To him is due from angels and men, whatsoever worship, service, or obedience, as creatures they owe unto the Creator, and whatever he is further pleased to require of them." },
          { number: 3, text: "In this divine and infinite Being there are three subsistences, the Father, the Word or Son, and Holy Spirit, of one substance, power, and eternity, each having the whole divine essence, yet the essence undivided: the Father is of none, neither begotten nor proceeding; the Son is eternally begotten of the Father; the Holy Spirit proceeding from the Father and the Son; all infinite, without beginning, therefore but one God, who is not to be divided in nature and being, but distinguished by several peculiar relative properties and personal relations; which doctrine of the Trinity is the foundation of all our communion with God, and comfortable dependence on him." }
        ]
      },
      {
        number: 3,
        title: "Of God's Decree",
        sections: [
          { number: 1, text: "God hath decreed in himself, from all eternity, by the most wise and holy counsel of his own will, freely and unchangeably, all things, whatsoever comes to pass; yet so as thereby is God neither the author of sin nor hath fellowship with any therein; nor is violence offered to the will of the creature, nor yet is the liberty or contingency of second causes taken away, but rather established; in which appears his wisdom in disposing all things, and power and faithfulness in accomplishing his decree." },
          { number: 2, text: "Although God knoweth whatsoever may or can come to pass, upon all supposed conditions, yet hath he not decreed anything, because he foresaw it as future, or as that which would come to pass upon such conditions." },
          { number: 3, text: "By the decree of God, for the manifestation of his glory, some men and angels are predestinated, or foreordained to eternal life through Jesus Christ, to the praise of his glorious grace; others being left to act in their sin to their just condemnation, to the praise of his glorious justice." },
          { number: 4, text: "These angels and men thus predestinated and foreordained, are particularly and unchangeably designed, and their number so certain and definite, that it cannot be either increased or diminished." },
          { number: 5, text: "Those of mankind that are predestinated to life, God, before the foundation of the world was laid, according to his eternal and immutable purpose, and the secret counsel and good pleasure of his will, hath chosen in Christ unto everlasting glory, out of his mere free grace and love, without any other thing in the creature as a condition or cause moving him thereunto." },
          { number: 6, text: "As God hath appointed the elect unto glory, so he hath, by the eternal and most free purpose of his will, foreordained all the means thereunto; wherefore they who are elected, being fallen in Adam, are redeemed by Christ, are effectually called unto faith in Christ, by his Spirit working in due season, are justified, adopted, sanctified, and kept by his power through faith unto salvation; neither are any other redeemed by Christ, or effectually called, justified, adopted, sanctified, and saved, but the elect only." },
          { number: 7, text: "The doctrine of this high mystery of predestination is to be handled with special prudence and care, that men attending the will of God revealed in his Word, and yielding obedience thereunto, may, from the certainty of their effectual vocation, be assured of their eternal election; so shall this doctrine afford matter of praise, reverence, and admiration of God, and of humility, diligence, and abundant consolation to all that sincerely obey the gospel." }
        ]
      },
      {
        number: 4,
        title: "Of Creation",
        sections: [
          { number: 1, text: "In the beginning it pleased God the Father, Son, and Holy Spirit, for the manifestation of the glory of his eternal power, wisdom, and goodness, to create or make the world, and all things therein, whether visible or invisible, in the space of six days, and all very good." },
          { number: 2, text: "After God had made all other creatures, he created man, male and female, with reasonable and immortal souls, rendering them fit unto that life to God for which they were created; being made after the image of God, in knowledge, righteousness, and true holiness; having the law of God written in their hearts, and power to fulfil it, with a dominion over the creatures, yet subject to fall." },
          { number: 3, text: "Besides the law written in their hearts, they received a command not to eat of the tree of knowledge of good and evil, which whilst they kept, they were happy in their communion with God, and had dominion over the creatures." }
        ]
      },
      {
        number: 5,
        title: "Of Divine Providence",
        sections: [
          { number: 1, text: "God the good Creator of all things, in his infinite power and wisdom, doth uphold, direct, dispose, and govern all creatures and things, from the greatest even to the least, by his most wise and holy providence, to the end for the which they were created, according unto his infallible foreknowledge, and the free and immutable counsel of his own will; to the praise of the glory of his wisdom, power, justice, infinite goodness, and mercy." },
          { number: 2, text: "Although in relation to the foreknowledge and decree of God, the first cause, all things come to pass immutably and infallibly; so that there is not anything befalls any by chance, or without his providence; yet by the same providence he ordereth them to fall out according to the nature of second causes, either necessarily, freely, or contingently." },
          { number: 3, text: "God, in his ordinary providence maketh use of means, yet is free to work without, above, and against them at his pleasure." },
          { number: 4, text: "The almighty power, unsearchable wisdom, and infinite goodness of God, so far manifest themselves in his providence, that his determinate counsel extendeth itself even to the first fall, and all other sinful actions both of angels and men; and that not by a bare permission, which also he most wisely and powerfully boundeth, and otherwise ordereth and governeth, in a manifold dispensation to his most holy ends; yet so, as the sinfulness of their acts proceedeth only from the creatures, and not from God, who, being most holy and righteous, neither is nor can be the author or approver of sin." },
          { number: 5, text: "The most wise, righteous, and gracious God doth oftentimes leave for a season his own children to manifold temptations and the corruptions of their own hearts, to chastise them for their former sins, or to discover unto them the hidden strength of corruption and deceitfulness of their hearts, that they may be humbled; and to raise them to a more close and constant dependence for their support upon himself; and to make them more watchful against all future occasions of sin, and for other just and holy ends. So that whatsoever befalls any of his elect is by his appointment, for his glory, and their good." },
          { number: 6, text: "As for those wicked and ungodly men whom God, as the righteous judge, for former sin doth blind and harden; from them he not only withholdeth his grace, whereby they might have been enlightened in their understanding and wrought upon in their hearts; but sometimes also withdraweth the gifts which they had, and exposeth them to such objects as their corruption makes occasion of sin; and withal gives them over to their own lusts, the temptations of the world, and the power of Satan, whereby it comes to pass that they harden themselves, under those means which God useth for the softening of others." },
          { number: 7, text: "As the providence of God doth in general reach to all creatures, so after a more special manner it taketh care of his church, and disposeth all things to the good thereof." }
        ]
      },
      {
        number: 6,
        title: "Of the Fall of Man, of Sin, and of the Punishment Thereof",
        sections: [
          { number: 1, text: "Although God created man upright and perfect, and gave him a righteous law, which had been unto life had he kept it, and threatened death upon the breach thereof, yet he did not long abide in this honor; Satan using the subtlety of the serpent to seduce first Eve, then by her seducing Adam, who, without any compulsion, did willfully transgress the law of their creation, and the command given to them, in eating the forbidden fruit, which God was pleased, according to his wise and holy counsel, to permit, having purposed to order it to his own glory." },
          { number: 2, text: "Our first parents, by this sin, fell from their original righteousness and communion with God, and we in them whereby death came upon all: all becoming dead in sin, and wholly defiled in all the faculties and parts of soul and body." },
          { number: 3, text: "They being the root, and by God\\'s appointment, standing in the room and stead of all mankind, the guilt of the sin was imputed, and corrupted nature conveyed, to all their posterity descending from them by ordinary generation, being now conceived in sin, and by nature children of wrath, the servants of sin, the subjects of death, and all other miseries, spiritual, temporal, and eternal, unless the Lord Jesus set them free." },
          { number: 4, text: "From this original corruption, whereby we are utterly indisposed, disabled, and made opposite to all good, and wholly inclined to all evil, do proceed all actual transgressions." }
        ]
      },
      {
        number: 7,
        title: "Of God's Covenant",
        sections: [
          { number: 1, text: "The distance between God and the creature is so great, that although reasonable creatures do owe obedience unto him as their creator, yet they could never have attained the reward of life but by some voluntary condescension on God\\'s part, which he hath been pleased to express by way of covenant." },
          { number: 2, text: "Moreover, man having brought himself under the curse of the law by his fall, it pleased the Lord to make a covenant of grace, wherein he freely offereth unto sinners life and salvation by Jesus Christ, requiring of them faith in him, that they may be saved; and promising to give unto all those that are ordained unto eternal life, his Holy Spirit, to make them willing and able to believe." },
          { number: 3, text: "This covenant is revealed in the gospel; first of all to Adam in the promise of salvation by the seed of the woman, and afterwards by farther steps, until the full discovery thereof was completed in the New Testament; and it is founded in that eternal covenant transaction that was between the Father and the Son about the redemption of the elect; and it is alone by the grace of this covenant that all the posterity of fallen Adam that ever were saved did obtain life and blessed immortality, man being now utterly incapable of acceptance with God upon those terms on which Adam stood in his state of innocency." }
        ]
      },
      {
        number: 8,
        title: "Of Christ the Mediator",
        sections: [
          { number: 1, text: "It pleased God, in his eternal purpose, to choose and ordain the Lord Jesus, his only begotten Son, according to the covenant made between them both, to be the mediator between God and man; the prophet, priest, and king; head and savior of the church, the heir of all things, and judge of the world; unto whom he did from all eternity give a people to be his seed and to be by him in time redeemed, called, justified, sanctified, and glorified." },
          { number: 2, text: "The Son of God, the second person in the Holy Trinity, being very and eternal God, the brightness of the Father\\'s glory, of one substance and equal with him who made the world, who upholdeth and governeth all things he hath made, did, when the fullness of time was come, take upon him man\\'s nature, with all the essential properties and common infirmities thereof, yet without sin; being conceived by the Holy Spirit in the womb of the Virgin Mary, the Holy Spirit coming down upon her: and the power of the Highest overshadowing her; and so was made of a woman of the tribe of Judah, of the seed of Abraham and David according to the Scriptures; so that two whole, perfect, and distinct natures were inseparably joined together in one person, without conversion, composition, or confusion; which person is very God and very man, yet one Christ, the only mediator between God and man." },
          { number: 3, text: "The Lord Jesus, in his human nature thus united to the divine, in the person of the Son, was sanctified and anointed with the Holy Spirit above measure, having in him all the treasures of wisdom and knowledge; in whom it pleased the Father that all fullness should dwell, to the end that being holy, harmless, undefiled, and full of grace and truth, he might be thoroughly furnished to execute the office of mediator and surety; which office he took not upon himself, but was thereunto called by his Father; who also put all power and judgment in his hand, and gave him commandment to execute the same." },
          { number: 4, text: "This office the Lord Jesus did most willingly undertake, which that he might discharge he was made under the law, and did perfectly fulfil it, and underwent the punishment due to us, which we should have borne and suffered, being made sin and a curse for us; enduring most grievous sorrows in his soul, and most painful sufferings in his body; was crucified, and died, and remained in the state of the dead, yet saw no corruption: on the third day he arose from the dead with the same body in which he suffered, with which he also ascended into heaven, and there sitteth at the right hand of his Father, making intercession, and shall return to judge men and angels at the end of the world." },
          { number: 5, text: "The Lord Jesus, by his perfect obedience and sacrifice of himself, which he through the eternal Spirit once offered up unto God, hath fully satisfied the justice of God, procured reconciliation, and purchased an everlasting inheritance in the kingdom of heaven, for all those whom the Father hath given unto him." },
          { number: 6, text: "Although the price of redemption was not actually paid by Christ till after his incarnation, yet the virtue, efficacy, and benefit thereof were communicated unto the elect in all ages successively from the beginning of the world, in and by those promises, types, and sacrifices wherein he was revealed, and signified to be the seed which should bruise the serpent\\'s head; and the Lamb slain from the foundation of the world, being the same yesterday, and today and for ever." },
          { number: 7, text: "Christ, in the work of mediation, acteth according to both natures, by each nature doing that which is proper to itself; yet by reason of the unity of the person, that which is proper to one nature is sometimes in Scripture attributed to the person denominated by the other nature." },
          { number: 8, text: "To all those for whom Christ hath obtained eternal redemption, he doth certainly and effectually apply and communicate the same, making intercession for them; uniting them to himself by his Spirit, revealing unto them, in and by his Word, the mystery of salvation, persuading them to believe and obey, governing their hearts by his Word and Spirit, and overcoming all their enemies by his almighty power and wisdom, in such manner and ways as are most consonant to his wonderful and unsearchable dispensation; and all of free and absolute grace, without any condition foreseen in them to procure it." },
          { number: 9, text: "This office of mediator between God and man is proper only to Christ, who is the prophet, priest, and king of the church of God; and may not be either in whole, or any part thereof, transferred from him to any other." },
          { number: 10, text: "This number and order of offices is necessary; for in respect of our ignorance, we stand in need of his prophetical office; and in respect of our alienation from God, and imperfection of the best of our services, we need his priestly office to reconcile us and present us acceptable unto God; and in respect of our averseness and utter inability to return to God, and for our rescue and security from our spiritual adversaries, we need his kingly office to convince, subdue, draw, uphold, deliver, and preserve us to his heavenly kingdom." }
        ]
      },
      {
        number: 9,
        title: "Of Free Will",
        sections: [
          { number: 1, text: "God hath endued the will of man with that natural liberty and power of acting upon choice, that it is neither forced, nor by any necessity of nature determined to do good or evil." },
          { number: 2, text: "Man, in his state of innocency, had freedom and power to will and to do that which is good and well-pleasing to God, but yet was mutable, so that he might fall from it." },
          { number: 3, text: "Man, by his fall into a state of sin, hath wholly lost all ability of will to any spiritual good accompanying salvation; so as a natural man, being altogether averse from that good, and dead in sin, is not able by his own strength to convert himself, or to prepare himself thereunto." },
          { number: 4, text: "When God converts a sinner, and translates him into the state of grace, he freeth him from his natural bondage under sin, and by his grace alone enables him freely to will and to do that which is spiritually good; yet so as that by reason of his remaining corruptions, he doth not perfectly, nor only will that which is good, but doth also will that which is evil." },
          { number: 5, text: "This will of man is made perfectly and immutably free to good alone in the state of glory only." }
        ]
      },
      {
        number: 10,
        title: "Of Effectual Calling",
        sections: [
          { number: 1, text: "Those whom God hath predestinated unto life, he is pleased in his appointed, and accepted time, effectually to call, by his Word and Spirit, out of that state of sin and death in which they are by nature, to grace and salvation by Jesus Christ; enlightening their minds spiritually and savingly to understand the things of God; taking away their heart of stone, and giving unto them a heart of flesh; renewing their wills, and by his almighty power determining them to that which is good, and effectually drawing them to Jesus Christ; yet so as they come most freely, being made willing by his grace." },
          { number: 2, text: "This effectual call is of God\\'s free and special grace alone, not from anything at all foreseen in man, nor from any power or agency in the creature, being wholly passive therein, being dead in sins and trespasses, until being quickened and renewed by the Holy Spirit; he is thereby enabled to answer this call, and to embrace the grace offered and conveyed in it, and that by no less power than that which raised up Christ from the dead." },
          { number: 3, text: "Elect infants dying in infancy are regenerated and saved by Christ through the Spirit; who worketh when, and where, and how he pleaseth; so also are all elect persons, who are incapable of being outwardly called by the ministry of the Word." },
          { number: 4, text: "Others not elected, although they may be called by the ministry of the Word, and may have some common operations of the Spirit, yet not being effectually drawn by the Father, they neither will nor can truly come to Christ, and therefore cannot be saved: much less can men that receive not the Christian religion be saved; be they never so diligent to frame their lives according to the light of nature and the law of that religion they do profess." }
        ]
      },
      {
        number: 11,
        title: "Of Justification",
        sections: [
          { number: 1, text: "Those whom God effectually calleth, he also freely justifieth, not by infusing righteousness into them, but by pardoning their sins, and by accounting and accepting their persons as righteous; not for anything wrought in them, or done by them, but for Christ\\'s sake alone; not by imputing faith itself, the act of believing, or any other evangelical obedience to them, as their righteousness; but by imputing Christ\\'s active obedience unto the whole law, and passive obedience in his death for their whole and sole righteousness, they receiving and resting on him and his righteousness by faith, which faith they have not of themselves; it is the gift of God." },
          { number: 2, text: "Faith thus receiving and resting on Christ and his righteousness, is the alone instrument of justification; yet it is not alone in the person justified, but is ever accompanied with all other saving graces, and is no dead faith, but worketh by love." },
          { number: 3, text: "Christ, by his obedience and death, did fully discharge the debt of all those that are justified; and did, by the sacrifice of himself in the blood of his cross, undergoing in their stead the penalty due unto them, make a proper, real, and full satisfaction to God\\'s justice in their behalf; yet inasmuch as he was given by the Father for them, and his obedience and satisfaction accepted in their stead, and both freely, not for anything in them, their justification is only of free grace, that both the exact justice and rich grace of God might be glorified in the justification of sinners." },
          { number: 4, text: "God did from all eternity decree to justify all the elect, and Christ did in the fullness of time die for their sins, and rise again for their justification; nevertheless they are not justified personally, until the Holy Spirit doth in due time actually apply Christ unto them." },
          { number: 5, text: "God doth continue to forgive the sins of those that are justified, and although they can never fall from the state of justification, yet they may fall under God\\'s fatherly displeasure; and in that condition they have not usually the light of his countenance restored unto them, until they humble themselves, confess their sins, beg pardon, and renew their faith and repentance." },
          { number: 6, text: "The justification of believers under the Old Testament was, in all these respects, one and the same with the justification of believers under the New Testament." }
        ]
      },
      {
        number: 12,
        title: "Of Adoption",
        sections: [
          { number: 1, text: "All those that are justified, God vouchsafeth, in and for the sake of his only Son Jesus Christ, to make partakers of the grace of adoption, by which they are taken into the number, and enjoy the liberties and privileges of the children of God; have his name put upon them, receive the Spirit of adoption, have access to the throne of grace with boldness, are enabled to cry Abba, Father, are pitied, protected, provided for, and chastened by him as by a father, yet never cast off, but sealed to the day of redemption, and inherit the promises as heirs of everlasting salvation." }
        ]
      },
      {
        number: 13,
        title: "Of Sanctification",
        sections: [
          { number: 1, text: "They who are united to Christ, effectually called, and regenerated, having a new heart and a new spirit created in them through the virtue of Christ\\'s death and resurrection, are also farther sanctified, really and personally, through the same virtue, by his Word and Spirit dwelling in them; the dominion of the whole body of sin is destroyed, and the several lusts thereof are more and more weakened and mortified, and they more and more quickened and strengthened in all saving graces, to the practice of all true holiness, without which no man shall see the Lord." },
          { number: 2, text: "This sanctification is throughout the whole man, yet imperfect in this life; there abideth still some remnants of corruption in every part, whence ariseth a continual and irreconcilable war; the flesh lusting against the Spirit, and the Spirit against the flesh." },
          { number: 3, text: "In which war, although the remaining corruption for a time may much prevail, yet through the continual supply of strength from the sanctifying Spirit of Christ, the regenerate part doth overcome; and so the saints grow in grace, perfecting holiness in the fear of God, pressing after an heavenly life, in evangelical obedience to all the commands which Christ as head and king, in his Word hath prescribed them." }
        ]
      },
      {
        number: 14,
        title: "Of Saving Faith",
        sections: [
          { number: 1, text: "The grace of faith, whereby the elect are enabled to believe to the saving of their souls, is the work of the Spirit of Christ in their hearts, and is ordinarily wrought by the ministry of the Word; by which also, and by the administration of baptism and the Lord\\'s supper, prayer, and other means appointed of God, it is increased and strengthened." },
          { number: 2, text: "By this faith a Christian believeth to be true whatsoever is revealed in the Word for the authority of God himself, and also apprehendeth an excellency therein above all other writings and all things in the world, as it bears forth the glory of God in his attributes, the excellency of Christ in his nature and offices, and the power and fullness of the Holy Spirit in his workings and operations; and so is enabled to cast his soul upon the truth thus believed; and also acteth differently upon that which each particular passage thereof containeth; yielding obedience to the commands, trembling at the threatenings, and embracing the promises of God for this life and that which is to come; but the principle acts of saving faith have immediate relation to Christ, accepting, receiving, and resting upon him alone for justification, sanctification, and eternal life, by virtue of the covenant of grace." },
          { number: 3, text: "This faith, although it be different in degrees, and may be weak or strong, yet it is in the least degree of it different in the kind or nature of it, as is all other saving grace, from the faith and common grace of temporary believers; and therefore, though it may be many times assailed and weakened, yet it gets the victory, growing up in many to the attainment of a full assurance through Christ, who is both the author and finisher of our faith." }
        ]
      },
      {
        number: 15,
        title: "Of Repentance Unto Life and Salvation",
        sections: [
          { number: 1, text: "Such of the elect as are converted at riper years, having sometime lived in the state of nature, and therein served divers lusts and pleasures, God in their effectual calling giveth them repentance unto life." },
          { number: 2, text: "Whereas there is none that doth good and sinneth not, and the best of men may, through the power and deceitfulness of their corruptions dwelling in them, with the prevalency of temptation, fall into great sins and provocations; God hath, in the covenant of grace, mercifully provided that believers so sinning and falling shall be renewed through repentance unto salvation." },
          { number: 3, text: "This saving repentance is an evangelical grace, whereby a person, being by the Holy Spirit made sensible of the manifold evils of his sin, doth, by faith in Christ, humble himself for it with godly sorrow, detestation of it, and self-abhorrency, praying for pardon and strength of grace, with a purpose and endeavor, by supplies of the Spirit, to walk before God unto all well-pleasing in all things." },
          { number: 4, text: "As repentance is to be continued through the whole course of our lives, upon the account of the body of death, and the motions thereof, so it is every man\\'s duty to repent of his particular known sins particularly." },
          { number: 5, text: "Such is the provision which God hath made through Christ in the covenant of grace for the preservation of believers unto salvation; that although there is no sin so small but it deserves damnation, yet there is no sin so great that it shall bring damnation on them that repent; which makes the constant preaching of repentance necessary." }
        ]
      },
      {
        number: 16,
        title: "Of Good Works",
        sections: [
          { number: 1, text: "Good works are only such as God hath commanded in his Holy Word, and not such as without the warrant thereof are devised by men out of blind zeal, or upon any pretense of good intentions." },
          { number: 2, text: "These good works, done in obedience to God\\'s commandments, are the fruits and evidences of a true and lively faith; and by them believers manifest their thankfulness, strengthen their assurance, edify their brethren, adorn the profession of the gospel, stop the mouths of the adversaries, and glorify God, whose workmanship they are, created in Christ Jesus thereunto; that having their fruit unto holiness, they may have the end eternal life." },
          { number: 3, text: "Their ability to do good works is not at all of themselves, but wholly from the Spirit of Christ; and that they may be enabled thereunto, besides the graces they have already received, there is necessary an actual influence of the same Holy Spirit to work in them to will and to do of his good pleasure; yet they are not hereupon to grow negligent, as if they were not bound to perform any duty, unless upon a special motion of the Spirit; but they ought to be diligent in stirring up the grace of God that is in them." },
          { number: 4, text: "They who in their obedience attain to the greatest height which is possible in this life, are so far from being able to supererogate, and to do more than God requires, that they fall short of much which in duty they are bound to do." },
          { number: 5, text: "We cannot by our best works merit pardon of sin or eternal life at the hand of God, by reason of the great disproportion that is between them and the glory to come, and the infinite distance that is between us and God, whom by them we can neither profit nor satisfy for the debt of our former sins; but when we have done all we can, we have done but our duty, and are unprofitable servants; and because as they are good they proceed from his Spirit, and as they are wrought by us they are defiled and mixed with so much weakness and imperfection, that they cannot endure the severity of God\\'s punishment." },
          { number: 6, text: "Yet notwithstanding the persons of believers being accepted through Christ, their good works also are accepted in him, not as though they were in this life wholly unblamable and unreprovable in God\\'s sight, but that he, looking upon them in his Son, is pleased to accept and reward that which is sincere, although accompanied with many weaknesses and imperfections." }
        ]
      },
      {
        number: 17,
        title: "Of the Perseverance of the Saints",
        sections: [
          { number: 1, text: "Those whom God hath accepted in the beloved, effectually called and sanctified by his Spirit, and given the precious faith of his elect unto, can neither totally nor finally fall from the state of grace, but shall certainly persevere therein to the end, and be eternally saved, seeing the gifts and callings of God are without repentance, whence he still begets and nourisheth in them faith, repentance, love, joy, hope, and all the graces of the Spirit unto immortality; and though many storms and floods arise and beat against them, yet they shall never be able to take them off that foundation and rock which by faith they are fastened upon; notwithstanding, through unbelief and the temptations of Satan, the sensible sight of the light and love of God may for a time be clouded and obscured from them, yet he is still the same, and they shall be sure to be kept by the power of God unto salvation, where they shall enjoy their purchased possession, they being engraven upon the palm of his hands, and their names having been written in the book of life from all eternity." },
          { number: 2, text: "This perseverance of the saints depends not upon their own free will, but upon the immutability of the decree of election, flowing from the free and unchangeable love of God the Father, upon the efficacy of the merit and intercession of Jesus Christ and union with him, the oath of God, the abiding of his Spirit, and the seed of God within them, and the nature of the covenant of grace; from all which ariseth also the certainty and infallibility thereof." },
          { number: 3, text: "And though they may, through the temptation of Satan and of the world, the prevalency of corruption remaining in them, and the neglect of the means of their preservation, fall into grievous sins, and for a time continue therein, whereby they incur God\\'s displeasure and grieve his Holy Spirit, come to have their graces and comforts impaired, have their hearts hardened and their consciences wounded, hurt and scandalize others, and bring temporal judgments upon themselves, yet they shall renew their repentance and be preserved through faith in Christ Jesus to the end." }
        ]
      },
      {
        number: 18,
        title: "Of the Assurance of Grace and Salvation",
        sections: [
          { number: 1, text: "Although temporary believers, and other unregenerate men, may vainly deceive themselves with false hopes and carnal presumptions of being in the favor of God and state of salvation, which hope of theirs shall perish; yet such as truly believe in the Lord Jesus, and love him in sincerity, endeavoring to walk in all good conscience before him, may in this life be certainly assured that they are in the state of grace, and may rejoice in the hope of the glory of God, which hope shall never make them ashamed." },
          { number: 2, text: "This certainty is not a bare conjectural and probable persuasion, grounded upon a fallible hope, but an infallible assurance of faith, founded on the blood and righteousness of Christ revealed in the gospel; and also upon the inward evidence of those graces unto which these promises are made, and on the testimony of the Spirit of adoption, witnessing with our spirits that we are the children of God; which Spirit is the earnest of our inheritance, whereby we are sealed to the day of redemption." },
          { number: 3, text: "This infallible assurance doth not so belong to the essence of faith, but that a true believer may wait long and conflict with many difficulties before he be partaker of it; yet being enabled by the Spirit to know the things which are freely given him of God, he may, without extraordinary revelation, in the right use of means, attain thereunto: and therefore it is the duty of every one to give all diligence to make his calling and election sure, that thereby his heart may be enlarged in peace and joy in the Holy Spirit, in love and thankfulness to God, and in strength and cheerfulness in the duties of obedience, the proper fruits of this assurance; it being far from inclining men to looseness." },
          { number: 4, text: "True believers may have the assurance of their salvation divers ways shaken, diminished, and intermitted; as by negligence in preserving of it, by falling into some special sin which woundeth the conscience and grieveth the Spirit; by some sudden or vehement temptation, by God\\'s withdrawing the light of his countenance, and suffering even such as fear him to walk in darkness and to have no light; yet are they never utterly destitute of that seed of God, and life of faith, that love of Christ and the brethren, that sincerity of heart and conscience of duty, out of which, by the operation of the Spirit, this assurance may in due time be revived, and by the which, in the mean time, they are preserved from utter despair." }
        ]
      },
      {
        number: 19,
        title: "Of the Law of God",
        sections: [
          { number: 1, text: "God gave to Adam a law of universal obedience written in his heart, and a particular precept of not eating the fruit of the tree of knowledge of good and evil; by which he bound him and all his posterity to personal, entire, exact, and perpetual obedience; promised life upon the fulfilling, and threatened death upon the breach of it; and endued him with power and ability to keep it." },
          { number: 2, text: "The same law that was first written in the heart of man continued to be a perfect rule of righteousness after the fall, and was delivered by God upon Mount Sinai, in ten commandments, and written in two tables; the four first containing our duty towards God, and the other six our duty to man." },
          { number: 3, text: "Besides this law, commonly called moral, God was pleased to give to the people of Israel ceremonial laws, containing several typical ordinances; partly of worship, prefiguring Christ, his graces, actions, sufferings, and benefits; and partly holding forth divers instructions of moral duties; all which ceremonial laws being appointed only to the time of reformation, are, by Jesus Christ the true Messiah and only law-giver, who was furnished with power from the Father for that end, abrogated and taken away." },
          { number: 4, text: "To them also he gave sundry judicial laws, which expired together with the state of that people, not obliging any now by virtue of that institution; their general equity only being of moral use." },
          { number: 5, text: "The moral law doth for ever bind all, as well justified persons as others, to the obedience thereof, and that not only in regard of the matter contained in it, but also in respect of the authority of God the Creator, who gave it; neither doth Christ in the gospel any way dissolve, but much strengthen this obligation." },
          { number: 6, text: "Although true believers be not under the law as a covenant of works, to be thereby justified or condemned, yet it is of great use to them as well as to others; in that, as a rule of life, informing them of the will of God and their duty, it directs and binds them to walk accordingly; discovering also the sinful pollutions of their natures, hearts, and lives, so as examining themselves thereby, they may come to further conviction of, humiliation for, and hatred against sin; together with a clearer sight of the need they have of Christ and the perfection of his obedience; it is likewise of use to the regenerate to restrain their corruptions, in that it forbids sin; and the threatenings of it serve to show what even their sins deserve, and what afflictions in this life they may expect for them, although freed from the curse and unallayed rigor thereof. The promises of it likewise show them God\\'s approbation of obedience, and what blessings they may expect upon the performance thereof, though not as due to them by the law as a covenant of works; so as man\\'s doing good and refraining from evil, because the law encourageth to the one and deterreth from the other, is no evidence of his being under the law and not under grace." },
          { number: 7, text: "Neither are the forementioned uses of the law contrary to the grace of the gospel, but do sweetly comply with it, the Spirit of Christ subduing and enabling the will of man to do that freely and cheerfully which the will of God, revealed in the law, requireth to be done." }
        ]
      },
      {
        number: 20,
        title: "Of the Gospel and of the Extent of the Grace Thereof",
        sections: [
          { number: 1, text: "The covenant of works being broken by sin, and made unprofitable unto life, God was pleased to give forth the promise of Christ, the seed of the woman, as the means of calling the elect, and begetting in them faith and repentance; in this promise the gospel, as to the substance of it, was revealed, and is therein effectual for the conversion and salvation of sinners." },
          { number: 2, text: "This promise of Christ, and salvation by him, is revealed only by the Word of God; neither do the works of creation or providence, with the light of nature, make discovery of Christ, or of grace by him, so much as in a general or obscure way; much less that men destitute of the revelation of him by the promise or gospel, should be enabled thereby to attain saving faith or repentance." },
          { number: 3, text: "The revelation of the gospel unto sinners, made in divers times and by sundry parts, with the addition of further promises and precepts of the same substance, continued from the time of the first entrance of sin to the incarnation of Christ, in whom all the promises of the covenant of grace are yea and amen." },
          { number: 4, text: "Although the gospel be the only outward means of revealing Christ and saving grace, and is, as such, abundantly sufficient thereunto; yet that men who are dead in trespasses may be born again, quickened or regenerated, there is moreover necessary an effectual insuperable work of the Holy Spirit upon the whole soul, for the producing in them a new spiritual life; without which no other means will effect their conversion unto God." }
        ]
      },
      {
        number: 21,
        title: "Of Christian Liberty and Liberty of Conscience",
        sections: [
          { number: 1, text: "The liberty which Christ hath purchased for believers under the gospel, consists in their freedom from the guilt of sin, the condemning wrath of God, the severity and curse of the law, and in their being delivered from this present evil world, bondage to Satan, and dominion of sin, from the evil of afflictions, the fear and sting of death, the victory of the grave, and everlasting damnation: as also in their free access to God, and their yielding obedience unto him, not out of slavish fear, but a child-like love and willing mind. All which were common also to believers under the law, for the substance of them; but under the New Testament, the liberty of Christians is further enlarged in their freedom from the yoke of the ceremonial law, the whole legal administration of the covenant of grace, to which the Jewish church was subjected; and in greater boldness of access to the throne of grace, and in fuller communications of the free Spirit of God, than believers under the law did ordinarily partake of." },
          { number: 2, text: "God alone is Lord of the conscience, and hath left it free from the doctrines and commandments of men which are in anything contrary to his Word, or not contained in it. So that to believe such doctrines, or to obey such commandments out of conscience, is to betray true liberty of conscience; and the requiring of an implicit faith, and an absolute and blind obedience, is to destroy liberty of conscience and reason also. And they who, upon pretense of Christian liberty, do practice any sin, or cherish any sinful lust, as they do thereby pervert the main design of the grace of the gospel to their own destruction, so they wholly destroy the end of Christian liberty, which is, that being delivered out of the hand of our enemies, we might serve the Lord without fear, in holiness and righteousness before him, all the days of our lives." }
        ]
      },
      {
        number: 22,
        title: "Of Religious Worship and the Sabbath Day",
        sections: [
          { number: 1, text: "The light of nature shews that there is a God, who hath lordship and sovereignty over all; is just, good, and doth good unto all; and is therefore to be feared, loved, praised, called upon, trusted in, and served, with all the heart and all the soul, and with all the might. But the acceptable way of worshipping the true God, is instituted by himself, and so limited by his own revealed will, that he may not be worshipped according to the imagination and devices of men, nor the suggestions of Satan, under any visible representations, or any other way not prescribed in the Holy Scriptures." },
          { number: 2, text: "Religious worship is to be given to God the Father, Son, and Holy Spirit, and to him alone; not to angels, saints, or any other creatures; and since the fall, not without a mediator, nor in the mediation of any other but Christ alone." },
          { number: 3, text: "Prayer with thanksgiving, being one part of natural worship, is by God required of all men; but that it may be accepted, it is to be made in the name of the Son, by the help of the Spirit, according to his will; with understanding, reverence, humility, fervency, faith, love, and perseverance; and when with others, in a known tongue." },
          { number: 4, text: "Prayer is to be made for things lawful, and for all sorts of men living, or that shall live hereafter; but not for the dead, nor for those of whom it may be known that they have sinned the sin unto death." },
          { number: 5, text: "The reading of the Scriptures, preaching and hearing the Word of God, teaching and admonishing one another in psalms, hymns, and spiritual songs, singing with grace in our hearts to the Lord; as also the administration of baptism, and the Lord\\'s supper, are all parts of religious worship of God, to be performed in obedience to him, with understanding, faith, reverence, and godly fear; moreover, solemn humiliation, with fastings and thanksgivings, upon special occasions, ought to be used in an holy and religious manner." },
          { number: 6, text: "Neither prayer nor any other part of religious worship, is now under the gospel, tied unto, or made more acceptable by any place in which it is performed, or towards which it is directed; but God is to be worshipped everywhere in spirit and in truth; as in private families daily, and in secret each one by himself; so more solemnly in the public assemblies, which are not carelessly nor willfully to be neglected or forsaken, when God by his Word or providence calleth thereunto." },
          { number: 7, text: "As it is the law of nature, that in general a proportion of time, by God\\'s appointment, be set apart for the worship of God, so by his Word, in a positive moral and perpetual commandment, binding all men in all ages, he hath particularly appointed one day in seven for a sabbath to be kept holy unto him, which from the beginning of the world to the resurrection of Christ was the last day of the week, and from the resurrection of Christ was changed into the first day of the week, which is called the Lord\\'s day; and is to be continued to the end of the world as the Christian Sabbath, the observation of the last day of the week being abolished." },
          { number: 8, text: "The sabbath is then kept holy unto the Lord, when men, after a due preparing of their hearts, and ordering their common affairs before-hand, do not only observe an holy rest all the day from their own works, words, and thoughts about their worldly employments and recreations, but also are taken up the whole time in the public and private exercises of his worship, and in the duties of necessity and mercy." }
        ]
      },
      {
        number: 23,
        title: "Of Lawful Oaths and Vows",
        sections: [
          { number: 1, text: "A lawful oath is a part of religious worship, wherein the person swearing in truth, righteousness, and judgment, solemnly calleth God to witness what he sweareth, and to judge him according to the truth or falseness of it." },
          { number: 2, text: "The name of God only is that by which men ought to swear, and therein it is to be used, with all holy fear and reverence; therefore to swear vainly or rashly by that glorious and dreadful name, or to swear at all by any other thing, is sinful and to be abhorred; yet as in matter of weight and moment, for confirmation of truth, and ending all strife, an oath is warranted by the Word of God; so a lawful oath being imposed by lawful authority in such matters, ought to be taken." },
          { number: 3, text: "Whosoever taketh an oath warranted by the Word of God, ought duly to consider the weightiness of so solemn an act, and therein to avouch nothing but what he knoweth to be the truth; for that by rash, false, and vain oaths, the Lord is provoked, and for them this land mourns." },
          { number: 4, text: "An oath is to be taken in the plain and common sense of the words, without equivocation or mental reservation." },
          { number: 5, text: "A vow, which is not to be made to any creature, but to God alone, is to be made and performed with all religious care and faithfulness; but popish monastical vows of perpetual single life, professed poverty, and regular obedience, are so far from being degrees of higher perfection, that they are superstitious and sinful snares, in which no Christian may entangle himself." },
          { number: 6, text: "It is not to be made to any creature, but to God alone; and that it may be accepted, it is to be made voluntarily, out of faith and conscience of duty, in way of thankfulness for mercy received, or for obtaining of what we want; whereby we more strictly bind ourselves to necessary duties, or to other things, so far and so long as they may fitly conduce thereunto." },
          { number: 7, text: "No man may vow to do anything forbidden in the Word of God, or what would hinder any duty therein commanded, or which is not in his own power, and for the performance of which he hath no promise or ability from God. In which respects, monastical vows of perpetual single life, professed poverty, and regular obedience, are so far from being degrees of higher perfection, that they are superstitious and sinful snares, in which no Christian may entangle himself." }
        ]
      },
      {
        number: 24,
        title: "Of the Civil Magistrate",
        sections: [
          { number: 1, text: "God, the supreme Lord and King of all the world, hath ordained civil magistrates to be under him, over the people, for his own glory and the public good; and to this end hath armed them with the power of the sword, for defence and encouragement of them that do good, and for the punishment of evil doers." },
          { number: 2, text: "It is lawful for Christians to accept and execute the office of a magistrate when called thereunto; in the management whereof, as they ought especially to maintain justice and peace, according to the wholesome laws of each kingdom and commonwealth, so for that end they may lawfully now, under the New Testament, wage war upon just and necessary occasions." },
          { number: 3, text: "Civil magistrates being set up by God for the ends aforesaid; subjection in all lawful things commanded by them ought to be yielded by us in the Lord, not only for wrath, but for conscience\\'s sake; and we ought to make supplications and prayers for kings and all that are in authority, that under them we may live a quiet and peaceable life, in all godliness and honesty." }
        ]
      },
      {
        number: 25,
        title: "Of Marriage",
        sections: [
          { number: 1, text: "Marriage is to be between one man and one woman; neither is it lawful for any man to have more than one wife, nor for any woman to have more than one husband at the same time." },
          { number: 2, text: "Marriage was ordained for the mutual help of husband and wife, for the increase of mankind with a legitimate issue, and of the church with an holy seed; and for preventing of uncleanness." },
          { number: 3, text: "It is lawful for all sorts of people to marry who are able with judgment to give their consent; yet it is the duty of Christians to marry in the Lord; and therefore such as profess the true religion, should not marry with infidels, or idolaters; neither should such as are godly be unequally yoked, by marrying with such as are wicked in their life, or who maintain damnable heresy." },
          { number: 4, text: "Marriage ought not to be within the degrees of consanguinity or affinity forbidden in the Word; nor can such incestuous marriages ever be made lawful by any law of man or consent of parties, so as those persons may live together as man and wife." }
        ]
      },
      {
        number: 26,
        title: "Of the Church",
        sections: [
          { number: 1, text: "The catholic or universal church, which (with respect to the internal work of the Spirit and truth of grace) may be called invisible, consists of the whole number of the elect, that have been, are, or shall be gathered into one, under Christ the head thereof; and is the spouse, the body, the fullness of him that filleth all in all." },
          { number: 2, text: "All persons throughout the world, professing the faith of the gospel, and obedience unto God by Christ according unto it, not destroying their own profession by any errors everting the foundation, or unholiness of conversation, are and may be called visible saints; and of such ought all particular congregations to be constituted." },
          { number: 3, text: "The purest churches under heaven are subject to mixture and error; and some have so degenerated as to become no churches of Christ, but synagogues of Satan; nevertheless Christ always hath had, and ever shall have a kingdom in this world, to the end thereof, of such as believe in him, and make profession of his name." },
          { number: 4, text: "The Lord Jesus Christ is the head of the church, in whom by the appointment of the Father all power for the calling, institution, order, or government of the church is invested in a supreme and sovereign manner; neither can the Pope of Rome in any sense be head thereof, but is that Antichrist, that man of sin, and son of perdition, that exalteth himself in the church against Christ and all that is called God; whom the Lord shall destroy with the brightness of his coming." },
          { number: 5, text: "In the execution of this power wherewith he is so intrusted, the Lord Jesus calleth out of the world unto himself, through the ministry of his Word, by his Spirit, those that are given unto him by his Father, that they may walk before him in all the ways of obedience, which he prescribeth to them in his Word. Those thus called, he commandeth to walk together in particular societies, or churches, for their mutual edification, and the due performance of that public worship, which he requireth of them in the world." },
          { number: 6, text: "The members of these churches are saints by calling, visibly manifesting and evidencing (in and by their profession and walking) their obedience unto that call of Christ; and do willingly consent to walk together, according to the appointment of Christ; giving up themselves to the Lord, and one to another, by the will of God, in professed subjection to the ordinances of the gospel." },
          { number: 7, text: "To each of these churches thus gathered, according to his mind declared in his Word, he hath given all that power and authority, which is in any way needful for their carrying on that order in worship and discipline, which he hath instituted for them to observe; with commands and rules for the due and right exerting and executing of that power." },
          { number: 8, text: "A particular church, gathered and completely organized according to the mind of Christ, consists of officers and members; and the officers appointed by Christ to be chosen and set apart by the church (so called and gathered), for the peculiar administration of ordinances, and execution of power or duty, which he intrusts them with, or calls them to, to be continued to the end of the world, are bishops or elders, and deacons." },
          { number: 9, text: "The way appointed by Christ for the calling of any person, fitted and gifted by the Holy Spirit, unto the office of bishop or elder in a church, is, that he be chosen thereunto by the common suffrage of the church itself; and solemnly set apart by fasting and prayer, with imposition of hands of the eldership of the church, if there be any before constituted therein; and of a deacon that he be chosen by the like suffrage, and set apart by prayer, and the like imposition of hands." },
          { number: 10, text: "The work of pastors being constantly to attend the service of Christ, in his churches, in the ministry of the Word and prayer, with watching for their souls, as they that must give an account to him; it is incumbent on the churches to whom they minister, not only to give them all due respect, but also to communicate to them of all their good things according to their ability, so as they may have a comfortable supply, without being themselves entangled in secular affairs; and may also be capable of exercising hospitality towards others; and this is required by the law of nature, and by the express order of our Lord Jesus, who hath ordained that they that preach the gospel should live of the gospel." },
          { number: 11, text: "Although it be incumbent on the bishops or pastors of the churches to be instant in preaching the Word, by way of office, yet the work of preaching the Word is not so peculiarly confined to them but that others also gifted and fitted by the Holy Spirit for it, and approved (being by lawful ways and means in the providence of God coming to it) may publicly, an ordinarily perform it; so that when any of the flock are called to it, they ought to exercise their gift therein." },
          { number: 12, text: "As all believers are bound to join themselves to particular churches, when and where they have opportunity so to do; so all that are admitted unto the privileges of a church, are also under the censures and government thereof, according to the rule of Christ." },
          { number: 13, text: "No church members, upon any offence taken by them, having performed their duty required of them towards the person they are offended at, ought to disturb any church order, or absent themselves from the assemblies of the church or administration of any ordinances, upon the account of such offence at any of their fellow members, but to wait upon Christ, in the further proceedings of the church." },
          { number: 14, text: "As each church, and all the members of it, are bound to pray continually for the good and prosperity of all the churches of Christ, in all places, and upon all occasions to further every one within the bounds of their places and callings, in the exercise of their gifts and graces; so the churches, when planted by the providence of God, so as they may enjoy opportunity and advantage for it, ought to hold communion amongst themselves, for their peace, increase of love, and mutual edification." },
          { number: 15, text: "Cases of difficulties or differences, either in point of doctrine or administration, wherein either the churches in general are concerned, or any one church in their peace, union, and edification, or any member or members of any church are injured in or by any proceedings in censures not agreeable to truth and order; it is according to the mind of Christ that many churches holding communion together do, by their messengers, meet to consider and give their advice in or about that matter in difference, and to report to all the churches concerned; howbeit these messengers assembled are not intrusted with any church-power properly so called, or with any jurisdiction over the churches themselves, to exercise any censures either over any churches or persons, or to impose their determination on the churches or officers." }
        ]
      },
      {
        number: 27,
        title: "Of the Communion of Saints",
        sections: [
          { number: 1, text: "All saints that are united to Jesus Christ, their head, by his Spirit, and by faith, although they are not made thereby one person with him, have fellowship in his graces, sufferings, death, resurrection, and glory; and, being united to one another in love, they have communion in each other\\'s gifts and graces, and are obliged to the performance of such duties, public and private, in an orderly way, as do conduce to their mutual good, both in the inward and outward man." },
          { number: 2, text: "Saints by profession are bound to maintain an holy fellowship and communion in the worship of God, and in performing such other spiritual services as tend to their mutual edification; as also in relieving each other in outward things according to their several abilities and necessities; which communion, though especially to be exercised by them in the relations wherein they stand, whether in families, or churches, yet, as God offereth opportunity, is to be extended to all the household of faith, even all those who in every place call upon the name of Jesus Christ our Lord." }
        ]
      },
      {
        number: 28,
        title: "Of Baptism and the Lord's Supper",
        sections: [
          { number: 1, text: "Baptism and the Lord\\'s Supper are ordinances of positive and sovereign institution, appointed by the Lord Jesus, the only lawgiver, to be continued in his church to the end of the world; and these alone are to be accounted sacraments properly so called." }
        ]
      },
      {
        number: 29,
        title: "Of Baptism",
        sections: [
          { number: 1, text: "Baptism is an ordinance of the New Testament, ordained by Jesus Christ, to be unto the party baptized, a sign of his fellowship with him, in his death and resurrection; of his being engrafted into him; of remission of sins; and of his giving up into God, through Jesus Christ, to live and walk in newness of life." },
          { number: 2, text: "Those who do actually profess repentance towards God, faith in, and obedience to, our Lord Jesus Christ, are the only proper subjects of this ordinance." },
          { number: 3, text: "The outward element to be used in this ordinance is water, wherein the party is to be baptized, in the name of the Father, and of the Son, and of the Holy Spirit." },
          { number: 4, text: "Immersion, or dipping of the person in water, is necessary to the due administration of this ordinance." }
        ]
      },
      {
        number: 30,
        title: "Of the Lord's Supper",
        sections: [
          { number: 1, text: "The supper of the Lord Jesus was instituted by him the same night wherein he was betrayed, to be observed in his churches, unto the end of the world, for the perpetual remembrance, and shewing forth the sacrifice of himself in his death, confirmation of the faith of believers in all the benefits thereof, their spiritual nourishment and growth in him, their further engagement in and to all duties which they owe unto him; and to be a bond and pledge of their communion with him, and with each other." },
          { number: 2, text: "In this ordinance Christ is not offered up to his Father, nor any real sacrifice made at all for remission of sin of the quick or dead, but only a memorial of that one offering up of himself by himself upon the cross, once for all; and a spiritual oblation of all possible praise unto God for the same; so that the popish sacrifice of the mass, as they call it, is most abominable, injurious to Christ\\'s own sacrifice the alone propitiation for all the sins of the elect." },
          { number: 3, text: "The Lord Jesus hath, in this ordinance, appointed his ministers to pray, and bless the elements of bread and wine, and thereby to set them apart from a common to a holy use; and to take and break the bread; to take the cup, and (they communicating also themselves) to give both to the communicants." },
          { number: 4, text: "The denial of the cup to the people, worshipping the elements, the lifting them up, or carrying them about for adoration, and reserving them for any pretended religious use, are all contrary to the nature of this ordinance, and to the institution of Christ." },
          { number: 5, text: "The outward elements in this ordinance, duly set apart to the use ordained by Christ, do bear a sacramental relation to his crucified body and blood; and are therefore sometimes called by the names of the things they represent, to wit, the body and blood of Christ; albeit in substance and nature they still remain truly and only bread and wine, as they were before." },
          { number: 6, text: "That doctrine which maintains a change of the substance of bread and wine, into the substance of Christ\\'s body and blood, commonly called transubstantiation, by consecration of a priest, or by any other way, is repugnant not to Scripture alone, but even to common sense and reason; overthroweth the nature of the ordinance, and hath been and is the cause of manifold superstitions, yea, of gross idolatries." },
          { number: 7, text: "Worthy receivers, outwardly partaking of the visible elements in this ordinance, do then also inwardly by faith, really and indeed, yet not carnally and corporally, but spiritually receive and feed upon Christ crucified, and all the benefits of his death; the body and blood of Christ being then not corporally or carnally, but spiritually present to the faith of believers in that ordinance, as the elements themselves are to their outward senses." },
          { number: 8, text: "All ignorant and ungodly persons, as they are unfit to enjoy communion with Christ, so are they unworthy of the Lord\\'s table, and cannot without great sin against him, while they remain such, partake of these holy mysteries, or be admitted thereunto; yea whosoever shall eat and drink in an unworthy manner, shall be guilty of the body and blood of the Lord, eating and drinking judgment to themselves." }
        ]
      },
      {
        number: 31,
        title: "Of the State of Man After Death and of the Resurrection of the Dead",
        sections: [
          { number: 1, text: "The bodies of men after death return to dust, and see corruption; but their souls, which neither die nor sleep, having an immortal subsistence, immediately return to God who gave them. The souls of the righteous being then made perfect in holiness, are received into paradise, where they are with Christ, and behold the face of God in light and glory, waiting for the full redemption of their bodies; and the souls of the wicked are cast into hell, where they remain in torment and utter darkness, reserved to the judgment of the great day; besides these two places for souls separated from their bodies, the Scripture acknowledgeth none." },
          { number: 2, text: "At the last day, such of the saints as are found alive, shall not sleep, but be changed; and all the dead shall be raised up with the selfsame bodies, and none other; although with different qualities, which shall be united again to their souls for ever." },
          { number: 3, text: "The bodies of the unjust shall, by the power of Christ, be raised to dishonour; the bodies of the just, by his Spirit, unto honour, and be made conformable to his own glorious body." }
        ]
      },
      {
        number: 32,
        title: "Of the Last Judgment",
        sections: [
          { number: 1, text: "God hath appointed a day wherein he will judge the world in righteousness, by Jesus Christ; to whom all power and judgment is given of the Father; in which day, not only the apostate angels shall be judged, but likewise all persons that have lived upon the earth shall appear before the tribunal of Christ, to give an account of their thoughts, words, and deeds, and to receive according to what they have done in the body, whether good or evil." },
          { number: 2, text: "The end of God\\'s appointing this day, is for the manifestation of the glory of his mercy in the eternal salvation of the elect, and of his justice in the damnation of the reprobate, who are wicked and disobedient. For then shall the righteous go into everlasting life, and receive that fulness of joy and glory with everlasting rewards, in the presence of the Lord; but the wicked, who know not God, and obey not the gospel of Jesus Christ, shall be cast aside into everlasting torments, and punished with everlasting destruction, from the presence of the Lord, and from the glory of his power." },
          { number: 3, text: "As Christ would have us to be certainly persuaded that there shall be a day of judgment, both to deter all men from sin, and for the greater consolation of the godly in their adversity; so will he have the day unknown to men, that they may shake off all carnal security, and be always watchful, because they know not at what hour the Lord will come; and may ever be prepared to say, Come Lord Jesus, come quickly. Amen." }
        ]
      }
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
          { number: 2, text: "Article II. Of the Word or Son of God, which was made very Man. The Son, which is the Word of the Father, begotten from everlasting of the Father, the very and eternal God, and of one substance with the Father, took Man\'s nature in the womb of the blessed Virgin, of her substance: so that two whole and perfect Natures, that is to say, the Godhead and Manhood, were joined together in one Person, never to be divided, whereof is one Christ, very God, and very Man; who truly suffered, was crucified, dead, and buried, to reconcile his Father to us, and to be a sacrifice, not only for original guilt, but also for all actual sins of men." },
          { number: 3, text: "Article III. Of the going down of Christ into Hell. As Christ died for us, and was buried, so also is it to be believed, that he went down into Hell." },
          { number: 4, text: "Article IV. Of the Resurrection of Christ. Christ did truly rise again from death, and took again his body, with flesh, bones, and all things appertaining to the perfection of Man\'s nature; wherewith he ascended into Heaven, and there sitteth, until he return to judge all Men at the last day." },
          { number: 5, text: "Article V. Of the Holy Ghost. The Holy Ghost, proceeding from the Father and the Son, is of one substance, majesty, and glory, with the Father and the Son, very and eternal God." },
        ]
      },
      {
        number: 2,
        title: "Articles VI–VIII: Scripture and Creeds",
        sections: [
          { number: 6, text: "Article VI. Of the Sufficiency of the holy Scriptures for salvation. Holy Scripture containeth all things necessary to salvation: so that whatsoever is not read therein, nor may be proved thereby, is not to be required of any man, that it should be believed as an article of the Faith, or be thought requisite or necessary to salvation. In the name of the holy Scripture we do understand those Canonical Books of the Old and New Testament, of whose authority was never any doubt in the Church. Of the Names and Number of the Canonical Books: Genesis, Exodus, Leviticus, Numbers, Deuteronomy, Joshua, Judges, Ruth, The First Book of Samuel, The Second Book of Samuel, The First Book of Kings, The Second Book of Kings, The First Book of Chronicles, The Second Book of Chronicles, The First Book of Esdras, The Second Book of Esdras, The Book of Esther, The Book of Job, The Psalms, The Proverbs, Ecclesiastes or Preacher, Cantica or Songs of Solomon, Four Prophets the greater, Twelve Prophets the less. And the other Books (as Hierome saith) the Church doth read for example of life and instruction of manners; but yet doth it not apply them to establish any doctrine; such are these following: The Third Book of Esdras, The Fourth Book of Esdras, The Book of Tobias, The Book of Judith, The rest of the Book of Esther, The Book of Wisdom, Jesus the Son of Sirach, Baruch the Prophet, The Song of the Three Children, The Story of Susanna, Of Bel and the Dragon, The Prayer of Manasses, The First Book of Maccabees, The Second Book of Maccabees. All the Books of the New Testament, as they are commonly received, we do receive, and account them Canonical." },
          { number: 7, text: "Article VII. Of the Old Testament. The Old Testament is not contrary to the New: for both in the Old and New Testament everlasting life is offered to Mankind by Christ, who is the only Mediator between God and Man, being both God and Man. Wherefore they are not to be heard, which feign that the old Fathers did look only for transitory promises. Although the Law given from God by Moses, as touching Ceremonies and Rites, do not bind Christian men, nor the Civil precepts thereof ought of necessity to be received in any commonwealth; yet notwithstanding, no Christian man whatsoever is free from the obedience of the Commandments which are called Moral." },
          { number: 8, text: "Article VIII. Of the Three Creeds. The Three Creeds, Nicene Creed, Athanasius\'s Creed, and that which is commonly called the Apostles\' Creed, ought thoroughly to be received and believed: for they may be proved by most certain warrants of holy Scripture." },
        ]
      },
      {
        number: 3,
        title: "Articles IX–XIV: Sin and Salvation",
        sections: [
          { number: 9, text: "Article IX. Of Original or Birth-sin. Original sin standeth not in the following of Adam, (as the Pelagians do vainly talk;) but it is the fault and corruption of the Nature of every man, that naturally is engendered of the offspring of Adam; whereby man is very far gone from original righteousness, and is of his own nature inclined to evil, so that the flesh lusteth always contrary to the spirit; and therefore in every person born into this world, it deserveth God\'s wrath and damnation. And this infection of nature doth remain, yea in them that are regenerated; whereby the lust of the flesh, called in the Greek, Phronema Sarkos, which some do expound the wisdom, some sensuality, some the affection, some the desire, of the flesh, is not subject to the Law of God. And although there is no condemnation for them that believe and are baptized, yet the Apostle doth confess, that concupiscence and lust hath of itself the nature of sin." },
          { number: 10, text: "Article X. Of Free-Will. The condition of Man after the fall of Adam is such, that he cannot turn and prepare himself, by his own natural strength and good works, to faith; and calling upon God: Wherefore we have no power to do good works pleasant and acceptable to God, without the grace of God by Christ preventing us, that we may have a good will, and working with us, when we have that good will." },
          { number: 11, text: "Article XI. Of the Justification of Man. We are accounted righteous before God, only for the merit of our Lord and Saviour Jesus Christ by Faith, and not for our own works or deservings: Wherefore, that we are justified by Faith only is a most wholesome Doctrine, and very full of comfort, as more largely is expressed in the Homily of Justification." },
          { number: 12, text: "Article XII. Of Good Works. Albeit that Good Works, which are the fruits of Faith, and follow after Justification, cannot put away our sins, and endure the severity of God\'s Judgement; yet are they pleasing and acceptable to God in Christ, and do spring out necessarily of a true and lively Faith; insomuch that by them a lively Faith may be as evidently known as a tree discerned by the fruit." },
          { number: 13, text: "Article XIII. Of Works before Justification. Works done before the grace of Christ, and the Inspiration of his Spirit, are not pleasant to God, forasmuch as they spring not of faith in Jesus Christ; neither do they make men meet to receive grace, or (as the School-authors say) deserve grace of congruity: yea rather, for that they are not done as God hath willed and commanded them to be done, we doubt not but they have the nature of sin." },
          { number: 14, text: "Article XIV. Of Works of Supererogation. Voluntary Works besides, over and above, God\'s Commandments, which they call Works of Supererogation, cannot be taught without arrogancy and impiety: for by them men do declare, that they do not only render unto God as much as they are bound to do, but that they do more for his sake, than of bounden duty is required: whereas Christ saith plainly, When ye have done all that are commanded to you, say, We are unprofitable servants." },
        ]
      },
      {
        number: 4,
        title: "Articles XV–XVIII: Christ, Predestination & Salvation",
        sections: [
          { number: 15, text: "Article XV. Of Christ alone without Sin. Christ in the truth of our nature was made like unto us in all things, sin only except, from which he was clearly void, both in his flesh, and in his spirit. He came to be the Lamb without spot, who, by sacrifice of himself once made, should take away the sins of the world, and sin, as Saint John saith, was not in him. But all we the rest, although baptized, and born again in Christ, yet offend in many things; and if we say we have no sin, we deceive ourselves, and the truth is not in us." },
          { number: 16, text: "Article XVI. Of Sin after Baptism. Not every deadly sin willingly committed after Baptism is sin against the Holy Ghost, and unpardonable. Wherefore the grant of repentance is not to be denied to such as fall into sin after Baptism. After we have received the Holy Ghost, we may depart from grace given, and fall into sin, and by the grace of God we may arise again, and amend our lives. And therefore they are to be condemned, which say, they can no more sin as long as they live here, or deny the place of forgiveness to such as truly repent." },
          { number: 17, text: "Article XVII. Of Predestination and Election. Predestination to Life is the everlasting purpose of God, whereby (before the foundations of the world were laid) he hath constantly decreed by his counsel secret to us, to deliver from curse and damnation those whom he hath chosen in Christ out of mankind, and to bring them by Christ to everlasting salvation, as vessels made to honour. Wherefore, they which be endued with so excellent a benefit of God be called according to God\'s purpose by his Spirit working in due season: they through Grace obey the calling: they be justified freely: they be made sons of God by adoption: they be made like the image of his only-begotten Son Jesus Christ: they walk religiously in good works, and at length, by God\'s mercy, they attain to everlasting felicity. As the godly consideration of Predestination, and our Election in Christ, is full of sweet, pleasant, and unspeakable comfort to godly persons, and such as feel in themselves the working of the Spirit of Christ, mortifying the works of the flesh, and their earthly members, and drawing up their mind to high and heavenly things, as well because it doth greatly establish and confirm their faith of eternal Salvation to be enjoyed through Christ, as because it doth fervently kindle their love towards God: So, for curious and carnal persons, lacking the Spirit of Christ, to have continually before their eyes the sentence of God\'s Predestination, is a most dangerous downfall, whereby the Devil doth thrust them either into desperation, or into wretchlessness of most unclean living, no less perilous than desperation. Furthermore, we must receive God\'s promises in such wise, as they be generally set forth to us in holy Scripture: and, in our doings, that Will of God is to be followed, which we have expressly declared unto us in the Word of God." },
          { number: 18, text: "Article XVIII. Of obtaining eternal Salvation only by the Name of Christ. They also are to be had accursed that presume to say, That every man shall be saved by the Law or Sect which he professeth, so that he be diligent to frame his life according to that Law, and the light of Nature. For holy Scripture doth set out unto us only the Name of Jesus Christ, whereby men must be saved." },
        ]
      },
      {
        number: 5,
        title: "Articles XIX–XXII: The Church",
        sections: [
          { number: 19, text: "Article XIX. Of the Church. The visible Church of Christ is a congregation of faithful men, in the which the pure Word of God is preached, and the Sacraments be duly ministered according to Christ\'s ordinance in all those things that of necessity are requisite to the same. As the Church of Jerusalem, Alexandria, and Antioch, have erred; so also the Church of Rome hath erred, not only in their living and manner of Ceremonies, but also in matters of Faith." },
          { number: 20, text: "Article XX. Of the Authority of the Church. The Church hath power to decree Rites or Ceremonies, and authority in Controversies of Faith: And yet it is not lawful for the Church to ordain any thing that is contrary to God\'s Word written, neither may it so expound one place of Scripture, that it be repugnant to another. Wherefore, although the Church be a witness and a keeper of holy Writ, yet, as it ought not to decree any thing against the same, so besides the same ought it not to enforce any thing to be believed for necessity of Salvation." },
          { number: 21, text: "Article XXI. Of the Authority of General Councils. General Councils may not be gathered together without the commandment and will of Princes. And when they be gathered together, (forasmuch as they be an assembly of men, whereof all be not governed with the Spirit and Word of God,) they may err, and sometime have erred, even in things pertaining unto God. Wherefore things ordained by them as necessary to salvation have neither strength nor authority, unless it may be declared that they be taken out of holy Scripture." },
          { number: 22, text: "Article XXII. Of Purgatory. The Romish Doctrine concerning Purgatory, Pardons, Worshipping, and Adoration, as well of Images as of Reliques, and also invocation of Saints, is a fond thing vainly invented, and grounded upon no warranty of Scripture, but rather repugnant to the Word of God." },
        ]
      },
      {
        number: 6,
        title: "Articles XXIII–XXXI: Ministry and Sacraments",
        sections: [
          { number: 23, text: "Article XXIII. Of Ministering in the Congregation. It is not lawful for any man to take upon him the office of publick preaching, or ministering the Sacraments in the Congregation, before he be lawfully called, and sent to execute the same. And those we ought to judge lawfully called and sent, which be chosen and called to this work by men who have publick authority given unto them in the Congregation, to call and send Ministers into the Lord\'s vineyard." },
          { number: 24, text: "Article XXIV. Of Speaking in the Congregation in such a Tongue as the people understandeth. It is a thing plainly repugnant to the Word of God, and the custom of the Primitive Church, to have publick Prayer in the Church, or to minister the Sacraments in a tongue not understanded of the people." },
          { number: 25, text: "Article XXV. Of the Sacraments. Sacraments ordained of Christ be not only badges or tokens of Christian men\'s profession, but rather they be certain sure witnesses, and effectual signs of grace, and God\'s good will towards us, by the which he doth work invisibly in us, and doth not only quicken, but also strengthen and confirm our Faith in him. There are two Sacraments ordained of Christ our Lord in the Gospel, that is to say, Baptism, and the Supper of the Lord. Those five commonly called Sacraments, that is to say, Confirmation, Penance, Orders, Matrimony, and extreme Unction, are not to be counted for Sacraments of the Gospel, being such as have grown partly of the corrupt following of the Apostles, partly are states of life allowed in the Scriptures; but yet have not like nature of Sacraments with Baptism, and the Lord\'s Supper, for that they have not any visible sign or ceremony ordained of God. The Sacraments were not ordained of Christ to be gazed upon, or to be carried about, but that we should duly use them. And in such only as worthily receive the same they have a wholesome effect or operation: but they that receive them unworthily purchase to themselves damnation, as Saint Paul saith." },
          { number: 26, text: "Article XXVI. Of the Unworthiness of the Ministers, which hinders not the effect of the Sacrament. Although in the visible Church the evil be ever mingled with the good, and sometime the evil have chief authority in the Ministration of the Word and Sacraments, yet forasmuch as they do not the same in their own name, but in Christ\'s, and do minister by his commission and authority, we may use their Ministry, both in hearing the Word of God, and in receiving of the Sacraments. Neither is the effect of Christ\'s ordinance taken away by their wickedness, nor the grace of God\'s gifts diminished from such as by faith and rightly do receive the Sacraments ministered unto them; which be effectual, because of Christ\'s institution and promise, although they be ministered by evil men. Nevertheless, it appertaineth to the discipline of the Church, that inquiry be made of evil Ministers, and that they be accused by those that have knowledge of their offences; and finally being found guilty, by just judgement be deposed." },
          { number: 27, text: "Article XXVII. Of Baptism. Baptism is not only a sign of profession, and mark of difference, whereby Christian men are discerned from others that be not christened, but it is also a sign of Regeneration or new Birth, whereby, as by an instrument, they that receive Baptism rightly are grafted into the Church; the promises of forgiveness of sin, and of our adoption to be the sons of God by the Holy Ghost, are visibly signed and sealed; Faith is confirmed, and Grace increased by virtue of prayer unto God. The Baptism of young Children is in any wise to be retained in the Church, as most agreeable with the institution of Christ." },
          { number: 28, text: "Article XXVIII. Of the Lord\'s Supper. The Supper of the Lord is not only a sign of the love that Christians ought to have among themselves one to another; but rather it is a Sacrament of our Redemption by Christ\'s death: insomuch that to such as rightly, worthily, and with faith, receive the same, the Bread which we break is a partaking of the Body of Christ; and likewise the Cup of Blessing is a partaking of the Blood of Christ. Transubstantiation (or the change of the substance of Bread and Wine) in the Supper of the Lord, cannot be proved by holy Writ; but is repugnant to the plain words of Scripture, overthroweth the nature of a Sacrament, and hath given occasion to many superstitions. The Body of Christ is given, taken, and eaten, in the Supper, only after an heavenly and spiritual manner. And the mean whereby the Body of Christ is received and eaten in the Supper is Faith. The Sacrament of the Lord\'s Supper was not by Christ\'s ordinance reserved, carried about, lifted up, or worshipped." },
          { number: 29, text: "Article XXIX. Of the Wicked which eat not the Body of Christ in the use of the Lord\'s Supper. The Wicked, and such as be void of a lively faith, although they do carnally and visibly press with their teeth (as Saint Augustine saith) the Sacrament of the Body and Blood of Christ, yet in no wise are they partakers of Christ: but rather, to their condemnation, do eat and drink the sign or Sacrament of so great a thing." },
          { number: 30, text: "Article XXX. Of both kinds. The Cup of the Lord is not to be denied to the Lay-people: for both the parts of the Lord\'s Sacrament, by Christ\'s ordinance and commandment, ought to be ministered to all Christian men alike." },
          { number: 31, text: "Article XXXI. Of the one Oblation of Christ finished upon the Cross. The Offering of Christ once made is that perfect redemption, propitiation, and satisfaction, for all the sins of the whole world, both original and actual; and there is none other satisfaction for sin, but that alone. Wherefore the sacrifices of Masses, in the which it was commonly said, that the Priest did offer Christ for the quick and the dead, to have remission of pain or guilt, were blasphemous fables, and dangerous deceits." },
        ]
      },
      {
        number: 7,
        title: "Articles XXXII–XXXIX: Discipline & Church Order",
        sections: [
          { number: 32, text: "Article XXXII. Of the Marriage of Priests. Bishops, Priests, and Deacons, are not commanded by God\'s Law, either to vow the estate of single life, or to abstain from marriage: therefore it is lawful also for them, as for all other Christian men, to marry at their own discretion, as they shall judge the same to serve better to godliness." },
          { number: 33, text: "Article XXXIII. Of excommunicate Persons, how they are to be avoided. That person which by open denunciation of the Church is rightly cut off from the unity of the Church, and excommunicated, ought to be taken of the whole multitude of the faithful, as an Heathen and Publican, until he be openly reconciled by penance, and received into the Church by a Judge that hath authority thereunto." },
          { number: 34, text: "Article XXXIV. Of the Traditions of the Church. It is not necessary that Traditions and Ceremonies be in all places one, and utterly like; for at all times they have been divers, and may be changed according to the diversities of countries, times, and men\'s manners, so that nothing be ordained against God\'s Word. Whosoever through his private judgement, willingly and purposely, doth openly break the traditions and ceremonies of the Church, which be not repugnant to the Word of God, and be ordained and approved by common authority, ought to be rebuked openly, (that others may fear to do the like,) as he that offendeth against the common order of the Church, and hurteth the authority of the Magistrate, and woundeth the consciences of the weak brethren. Every particular or national Church hath authority to ordain, change, and abolish, ceremonies or rites of the Church ordained only by man\'s authority, so that all things be done to edifying." },
          { number: 35, text: "Article XXXV. Of the Homilies. The second Book of Homilies, the several titles whereof we have joined under this Article, doth contain a godly and wholesome Doctrine, and necessary for these times, as doth the former Book of Homilies, which were set forth in the time of Edward the Sixth; and therefore we judge them to be read in Churches by the Ministers, diligently and distinctly, that they may be understanded of the people. Of the Names of the Homilies. 1. Of the right Use of the Church. 2. Against peril of Idolatry. 3. Of repairing and keeping clean of Churches. 4. Of good Works: first of Fasting. 5. Against Gluttony and Drunkenness. 6. Against Excess of Apparel. 7. Of Prayer. 8. Of the Place and Time of Prayer. 9. That Common Prayers and Sacraments ought to be ministered in a known tongue. 10. Of the reverend Estimation of God\'s Word. 11. Of Alms-doing. 12. Of Christian life and Manners. 13. Of the Nativity of Christ. 14. Of the Passion of Christ. 15. Of the Resurrection of Christ. 16. Of the worthy receiving of the Sacrament of the Body and Blood of Christ. 17. Of the Gifts of the Holy Ghost. 18. For the Rogation-days. 19. Of the State of Matrimony. 20. Of Repentance. 21. Against Idleness. 22. Against Rebellion." },
          { number: 36, text: "Article XXXVI. Of Consecration of Bishops and Ministers. The Book of Consecration of Archbishops and Bishops, and Ordering of Priests and Deacons, lately set forth in the time of Edward the Sixth, and confirmed at the same time by authority of Parliament, doth contain all things necessary to such Consecration and Ordering: neither hath it any thing, that of itself is superstitious and ungodly. And therefore whosoever are consecrated or ordered according to the Rites of that Book, since the second year of the forenamed King Edward unto this time, or hereafter shall be consecrated or ordered according to the same Rites; we decree all such to be rightly, orderly, and lawfully consecrated and ordered." },
          { number: 37, text: "Article XXXVII. Of the Civil Magistrates. The King\'s Majesty hath the chief power in this Realm of England, and other his Dominions, unto whom the chief Government of all Estates of this Realm, whether they be Ecclesiastical or Civil, in all causes doth appertain, and is not, nor ought to be, subject to any foreign Jurisdiction. Where we attribute to the King\'s Majesty the chief government, by which Titles we understand the minds of some slanderous folks to be offended; we give not our Princes the ministering either of God\'s Word, or of the Sacraments, the which thing the Injunctions also lately set forth by Elizabeth our Queen do most plainly testify; but that only prerogative, which we see to have been given always to all godly Princes in holy Scriptures by God himself; that is, that they should rule all estates and degrees committed to their charge by God, whether they be Ecclesiastical or Temporal, and restrain with the civil sword the stubborn and evil-doers. The Bishop of Rome hath no jurisdiction in this Realm of England. The Laws of the Realm may punish Christian men with death, for heinous and grievous offences. It is lawful for Christian men, at the commandment of the Magistrate, to wear weapons, and serve in the wars." },
          { number: 38, text: "Article XXXVIII. Of Christian men\'s Goods, which are not common. The Riches and Goods of Christians are not common, as touching the right, title, and possession of the same, as certain Anabaptists do falsely boast. Notwithstanding, every man ought, of such things as he possesseth, liberally to give alms to the poor, according to his ability." },
          { number: 39, text: "Article XXXIX. Of a Christian man\'s Oath. As we confess that vain and rash Swearing is forbidden Christian men by our Lord Jesus Christ, and James his Apostle: So we judge, that Christian Religion doth not prohibit, but that a man may swear when the Magistrate requireth, in a cause of faith and charity, so it be done according to the Prophet\'s teaching in justice, judgement, and truth." },
        ]
      },
    ]
  },

};
