/*	-WHAT IS THIS?-
	The script featured here is an explanation of how to make your own custom addition to MPMB's D&D 5e Character Tools.
	To add your own content to the Character Sheet, use the syntax below and save it in a file. You can then import this file directly to the sheet using the "Import" button and "Import/Export" bookmark.
	There you can either import the file as a whole or just copy the text into a dialogue.
	-KEEP IN MIND-
	Note that you can add as many custom codes as you want, either by importing consecutive files or pasting the scripts into the dialogue.
	It is recommended to enter the code in a freshly downloaded or reset sheet before adding any other information so that there won't be any conflicts.
*/

/*	-INFORMATION-
	Subject:	Class
	Effect:		adds a class called "Mist Walker" (v2.0) and the three subclasses for it: "Conviction of the Blade", "Conviction of the Mind", and "Conviction of the Shroud"
				This is taken from the DriveThru RPG website (https://www.drivethrurpg.com/product/241129/The-Mist-Walker--DD-5e-Class)
				This class and subclasses are made by Cody C. Lewis of Taking20.

  Code by:	Landon Jamieson
	Sheet:		v12.999 (2018-11-14)

  Please support the creator of this content (Cody C. Lewis) and download his material from the DriveThru RPG: https://www.drivethrurpg.com/browse/pub/11353/Taking20
  */

  var iFileName = "Mist Walker - Taking20.js";
  RequiredSheetVersion(12.999);

  SourceList["T20:MW"] = {
    name : "Taking20: Mist Walker Class v2.0",
    abbreviation : "T20:MW",
    group : "DriveThru RPG",
  	url : "https://www.drivethrurpg.com/product/241129/The-Mist-Walker--DD-5e-Class",
  	date : "2018/11/14"
  };

  // Adds the armor to the drop down menu, but I cannot get addArmor to automatically
  // switch to Unarmored Defense (Int) like it does for the barbarian with Unarmored Defense (Con)
  ArmourList["unarmored defense"] = {
    regExpSearch : /^unarmou?red(?=.*defense).*$/i, // I have tried various combinations of regExp and changing the name in the above line
    name : "Unarmored Defense (Int)",
    source : ["T20:MW", 4],
    type : "",
    ac : 10,
    stealthdis : false,
    addMod : true
  };

  ClassList["mist walker"] = {
    regExpSearch : /^(?=.*mist)(?=.*walker).*$/i,
  	name : "Mist Walker",
  	source : ["T20:MW", 0],
  	primaryAbility : "\n \u2022 Mist Walker: Dexterity or Strength, and Intelligence or Constitution;",
    abilitySave : 4,
  	prereqs : "\n \u2022 Mist Walker: Dexterity 13 or Strength 13, and Intelligence 13;",
  	die : 10,
  	improvements : [0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 5],
  	saves : ["Dex", "Int"],
  	skills : ["\n\n" + toUni("Mist Walker") + ": Choose three from Acrobatics, Deception, History, Intimidation, Perception, Persuasion, Sleight of Hand, and Stealth."],
  	toolProfs : {
  		primary : ["Poisoner's Kit"],
  		secondary : ["Poisoner's Kit"]
    },
    armor : [
  		[true, false, false, true],
  		[false, false, false, false]
  	],
  	weapons : [
  		[true, false, ["rapier", "scimitar", "shortsword"]],
  		[false, false, ["rapier", "scimitar", "shortsword"]]
  	],
  	equipment : "Mist Walker starting equipment:\n \u2022 a rapier -or- a shortsword;\n \u2022 Shield -or- a shortsword;\n \u2022 an Explorers Pack -or- a Dungeoneers Pack;\n \u2022 Leather Armor, two Daggers, and Poisoner's Kit.\n\nAlternatively, choose 5d4 \xD7 10 gp worth of starting equipment instead of both the class' and the background's starting equipment.",
  	subclasses : ["Mist Walker Convictions", ["conviction of the blade", "conviction of the mind", "conviction of the shroud"]],
  	attacks : [1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    features : {
      "mist walk" : {
        name : "Mist Walk",
        source : ["T20:MW", 3],
        minlevel : 1,
        description : desc(["As part of my movement, I can teleport up to my Mist Walk Distance to an unoccupied space. If not Dashing, I can move up to half my movement speed and Mist Walk up to half my Mist Walk Distance. From 5th level as a bonus action, I can Mist Walk up to half my Mist Walk Distance if I Mist Walked with my move or up to the full distance if not"]),
        additional : levels.map(function (lvl) {
          return "Mist Walk Distance " + (lvl <  4 ? 30 : lvl < 8 ? 40 : lvl < 12 ? 50 : lvl < 16 ? 60 : lvl < 20 ? 70 : 80) + " ft";
        }),
        // Attempting to add an action at 5th level. It adds, but have had trouble removing. This is my latest test to be able to remove.
        eval : "if (classes.known['mist walker'].level > 4) { AddAction('bonus action', 'Mist Walk (Bonus)', 'Mist Walker'); }",
        changeeval : "var MWlevelOld = classes.old['mist walker'] ? classes.old['mist walker'].classslevel : 0; var MWlevelNew = classes.known['mist walker'] ? classes.known['mist walker'].level : 0; if (MWlevelNew >= 5 && MWlevelOld < 5) { AddAction('bonus action', 'Mist Walk (Bonus)', 'Mist Walker'); } else if (MWlevelNew < 5 && MWlevelOld >= 5) {RemoveAction('bonus action', 'Mist Walker (Bonus)', 'Mist Walker'); }",
        removeeval : "if (classes.known['mist walker'].level < 5) { RemoveAction('bonus action', 'Mist Walk (Bonus)', 'Mist Walker'); }"
      },
      "unarmored defense" : {
        name : "Unarmored Defense",
        source : ["T20:MW", 4],
        minlevel : 1,
        description :  desc(["Without armor, my AC is 10 + Dexterity modifier + Intelligence modifier + shield"]),
        addArmor : "Unarmored Defense (Int)" // Does not seem to automatically equipment the armor has it does with the barbarian. I have the armor added in the list.
      },
      "fighting style" : {
        name :  "Fighting Style",
        source : ["T20:MW", 4],
        minlevel : 2,
        description : desc(["Choose a Fighting Style using the \"Choose Feature\" button above"]),
        choices : ["Dueling", "Two-Weapon Fighting"],
        "dueling" :  FightingStyles.dueling,
        "two-weapon fighting" : FightingStyles.two_weapon
      },
      "shroud points" : {
        name : "Shroud Points",
        source : ["T20:MW", 4],
        minlevel : 2,
        description : desc(["I gain Shroud Points and the Cloaking Mist, Veiled Shield, and Jaunt Shroud Abilities"]),
        usages : levels.map(function (lvl) {
          return lvl > 1 ? lvl : 0;
        }),
        recovery : "long rest",
        extrachoices : ["Cloaking Mist", "Jaunt", "Veiled Shield"],
        choicesNotInMenu : true,
        extraname : "Shroud Abilities",
        "cloaking mist" : {
          name : "Cloaking Mist",
          source : ["T20:MW", 4],
          additional : "1 Shroud Point",
          description : desc(["As an action, I create a 30 ft radius sphere of dark mist centered on myself for 1 minute or until a moderate wind disperses it. Everything within the mist is heavily obscured"]),
          action : ["action", ""]
        },
        "veiled shield" : {
          name : "Veiled Shield",
          source : ["T20:MW", 4],
          additional : levels.map(function (lvl) {
            return "1 Shroud Point; +" + (lvl < 10 ? 2 : lvl < 20 ? 3 : 4) + " AC"
          }),
          description: desc(["As a reaction, when I am hit with a melee attack, I gain a bonus to my AC for that attack. The bonus changes at 10th and 20th level"]),
          action : ["reaction", ""]
        },
        "jaunt" : {
          name : "Jaunt",
          source : ["T20:MW", 4],
          additional : "1 Shroud Point",
          description : desc(["As a reaction when I take damage, I can teleport up to my half Mist Walk Distance to an unoccupied space"]),
          action : ["reaction", ""]
        },
        eval : "ClassFeatureOptions(['mist walker', 'shroud points', 'cloaking mist', 'extra']); ClassFeatureOptions(['mist walker', 'shroud points', 'veiled shield', 'extra']); ClassFeatureOptions(['mist walker', 'shroud points', 'jaunt', 'extra']);",
        removeeval : "ClassFeatureOptions(['mist walker', 'shroud points', 'cloaking mist', 'extra'], 'remove'); ClassFeatureOptions(['mist walker', 'shroud points', 'veiled shield', 'extra'], 'remove'); ClassFeatureOptions(['mist walker', 'shroud points', 'jaunt', 'extra'], 'remove');"
      },
      "methodical strikes" : {
        name : "Methodical Strikes",
        source : ["T20:MW", 4],
        minlevel : 3,
        description : desc(["After I Mist Walk, I gain a bonus to my next melee attack roll until the end of the turn. This bonus changes at 11th and 18th level"]),
        additional : levels.map(function(lvl) {
          return "+" + (lvl < 11 ? 1 : lvl < 18 ? 2 : 3) + " to attack roll";
        })
      },
      "subclassfeature3" : {
        name : "Mist Walker Conviction",
        source : ["T20:MW", 5],
        minlevel : 3,
        description : desc([
          "Choose a Mist Walker Conviction you follow and put it in the \"Class\" field",
          "Choose either the Conviction of the Blade, Mind, or Shroud"
        ])
      },
      "expansive mind" : {
        name : "Expansive Mind",
        source : ["T20:MW", 5],
        minlevel : 6,
        description : desc(["Once per short rest when I make an Intelligence ability check, I may roll an additional d20 and take the highest result"]),
        additional : "1\u00D7 per short rest" // Resources gets crowded for some of the subclasses, doing this so that isn't an issue
      },
      "misty escape" : {
        name : "Misty Escape",
        source : ["T20:MW", 5],
        minlevel : 7,
        description : desc(["As a reaction when I succeed at a Dexterity saving throw vs. an area effect for half damage, I can teleport to the nearest unoccupied space within half my Mist Walk Distance and take no damage"]),
        action : ["reaction", ""]
      },
      "tactical precision" : {
        name : "Tactical Precision",
        source : ["T20:MW", 5],
        minlevel : 9,
        description : desc(["I can add my Intelligence modifier to my weapon attack damage"]),
        calcChanges : {
          atkCalc : ["if (classes.known['mist walker'] && classes.known['mist walker'].level > 8) { output.extraDmg += What('Int Mod'); }", "I can add my Intelligence modifier to my weapon attack damage"]
        }
      },
      "honed mind" : {
        name : "Honed Mind",
        source : ["T20:MW", 5],
        minlevel : 10,
        description : desc(["I can add my Intelligence modifier when I make a Wisdom or Charisma saving throw"]),
        usages : "Half Intelligence mod per ",
        usagescalc : "event.value = Math.max(1, Math.floor(tDoc.getField('Int Mod').value / 2))",
        recovery : "long rest"
      },
      "misty vision" : {
        name : "Misty Vision",
        source : ["T20:MW", 5],
        minlevel : 13,
        description : desc(["Fighting in heavily obscured areas no longer troubles me. I have blindsight up to 15 ft"]),
        vision : [["Blindsight", 15]]
      },
      "misty form" : {
        name : "Misty Form",
        source : ["T20:MW", 5],
        minlevel : 17,
        description : desc(["As a bonus action after I Mist Walk with my move, I can use Mirror Image as though I cast it. The duplicates move with me even if I Mist Walk"]),
        usages : "Intelligence mod per ",
        usagescalc : "event.value = Math.max(1, tDoc.getField('Int Mod').value)",
        recovery : "long rest",
        action : ["bonus action", " (After Mist Walk)"],
      spellcastingBonus : {
          name : "Misty Form",
          spells : ["mist walker-misty form"],
          selection : ["mist walker-misty form"]
        }
      },
      "greater mist walk" : {
        name : "Greater Mist Walk",
        source : ["T20:MW", 6],
        minlevel : 18,
        description : desc(["As an action once per long rest, I can use the Teleport spell as though I cast it. If I bring anyone else with me, I can do this again in per 1d6 days"]),
        action : ["action", ""],
        additional : "Self: 1\u00D7 per long rest; 1\u00D7 per 1d6 days",
        spellcastingBonus : {
          name : "Greater Mist Walk",
          spells : ["mist walker-greater mist walk"],
          selection : ["mist walker-greater mist walk"],
          oncelr : true
        }
      },
      "mist clone" : {
        name : "Mist Clone",
        source : ["T20:MW", 6],
        minlevel : 20,
        description : desc([
          "As an action once per long rest, I create a Clone of myself from mist in an unoccupied space within my Mist Walk Distance that lasts for 1 minute. It is identical to me, has my equipment and cannot speak. Its ability scores, hit points, proficiency bonus and AC are mine without magic items. Reaching 0 hit points or not being on same plane as me destroys it. It is immune to being charmed, frightened, petrified, poisoned, and paralyzed. It uses my Intelligence modifier for all saving throws, attack and damage rolls which are considered magical. It can move and may only perform the following:",
          "\u25C6 The attack action, including extra attack, and a bonus action to attack",
          "\u25C6 Interact with an object",
          "\u25C6 Mist Walk up to half my Mist Walk Distance as part of action",
          "\u25C6 The help action"
        ]),
        action : ["action", ""],
        additional : "1\u00D7 per long rest"
      }
    }
  };

ClassSubList["conviction of the blade"] = {
  regExpSearch : /blade/i,
  subname : "Conviction of the Blade",
  source : ["T20:MW", 6],
  features : {
    "subclassfeature3" : {
      name : "Additional Shroud Ability",
      source : ["T20:MW", 7],
      minlevel : 3,
      description : desc(["I know the Forceful Jaunt Shroud Ability"]),
      extraname : "Additional Shroud Ability",
      extrachoices : ["forceful jaunt"],
      choicesNotInMenu : true,
      "forceful jaunt" : {
        name : "Forceful Jaunt",
        source : ["T20:MW", 7],                                                                                                                                                                                                                                                                //
        description : desc(["As a bonus action, one up to medium size creature within 5 ft must succeed at a Dexterity saving throw or be teleported up to my half Mist Walk Distance to an unoccupied space. Creatures within 5 ft of that space can make one attack as a reaction"]),
        additional : "3 Shroud Points",
        action : ["bonus action", ""]
      },
      eval : "ClassFeatureOptions(['mist walker', 'subclassfeature3', 'forceful jaunt', 'extra']);",
      removeeval : "ClassFeatureOptions(['mist walker', 'subclassfeature3', 'forceful jaunt', 'extra'], 'remove');"
    },
    "subclassfeature3.1" : {
      name : "Violent Jaunt",
      source : ["T20:MW", 7],
      minlevel : 3,
      description : desc(["If I critical hit a creature, I may use Forceful Jaunt without expending Shroud Points"])
    },
    "subclassfeature7" : {
      name : "Mist Imbued Weapons",
      source : ["T20:MW", 7],
      minlevel : 7,
      description : desc(["Both my ranged and melee weapon attacks count as magical"])
    },
    "subclassfeature11" : {
      name: "Misty Mark",
      source : ["T20:MW", 7],
      minlevel : 11,
      description : desc(["As an action, I can make one attack. If I hit, the target is marked while within 150 ft. Whenever I hit a marked target, I deal an additional 1d10 force damage"]),
      additional : "1d10 force damage",
      action : ["action" , ""],
    },
    "subclassfeature15" : {
      name : "Devastating Assault",
      source : ["T20:MW", 7],
      minlevel : 15,
      description : desc(["As a bonus action, I make an Intelligence (Investigation) check with DC 15 to study a creature within 50 ft with disadvantage if it is an Aberration or Construct. On success once per short rest, my next weapon attack that hits the target before combat ends deals an additional 12d10 force damage"]),
      additional : "Damage: 1\u00D7 per short rest",
      action : ["bonus action", " (Find Opening)"]
    }
  }
};

ClassSubList["conviction of the mind"] = {
  regExpSearch : /mind/i,

  subname : "Conviction of the Mind",
  source : ["T20:MW", 7],
  features : {
    "subclassfeature3" : {
      name : "Additional Shroud Abilities",
      source : ["T20:MW", 7],
      minlevel : 3,
      description : desc(["I know Oppressive Haze, Disarming Mist, Obstructing Shroud, and Swift Guidance"]),
      extraname : "Additional Shroud Abilities",
      extrachoices : ["oppressive haze", "disarming mist", "obstructing shroud", "swift guidance"],
      choicesNotInMenu : true,
      "oppressive haze" : {
        name : "Oppressive Haze",
        source : ["T20:MW", 7],
        description : desc(["As a bonus action, I may use the Slow Spell as though I cast it on one creature within 10 ft I can see taking the form of oppressive gray mist that surrounds them"]),
        additional : "3 Shroud Points",
        action : ["bonus action", ""],
        spellcastingBonus : {
          name : "Oppressive Haze",
          spells : ["mist walker-oppressive haze"],
          selection : ["mist walker-oppressive haze"],
          firstCol : 3
        },
        spellFirstColTitle : "SP"
      },
      "disarming mist" : {
        name : "Disarming Mist",
        source : ["T20:MW", 8],
         description : desc(["As a bonus action when I hit a creature with an attack, they must succeed at a Dexterity (Acrobatics) check or their wielded weapon is teleported to a space up to 30 ft away"]),
        additional : "2 Shroud Points",
        action : ["bonus action", " (After attack hits)"]
      },
      "obstructing shroud" : {
        name : "Obstructing Shroud",
        source : ["T20:MW", 8],
        description : desc(["As a bonus action, one up to large size creature I choose within 10 ft must succeed at a Constitution saving throw or have disadvantage on attacks until the end of their next turn"]),
        additional : "2 Shroud Points",
        action : ["bonus action", ""]
      },
      "swift guidance" : {
        name : "Swift Guidance",
        source : ["T20:MW", 8],
        description : desc(["As a bonus action, I choose any number of creatures within my Mist Walk Distance I can see to get an additional 15 ft of movement speed until the end of their next turn"]),
        additional : "1 Shroud Points per target",
        action : ["bonus action", ""]
      },
      eval : "ClassFeatureOptions(['mist walker', 'subclassfeature3', 'oppressive haze', 'extra']); ClassFeatureOptions(['mist walker', 'subclassfeature3', 'disarming mist', 'extra']); ClassFeatureOptions(['mist walker', 'subclassfeature3', 'obstructing shroud', 'extra']); ClassFeatureOptions(['mist walker', 'subclassfeature3', 'swift guidance', 'extra']);",
      removeeval : "ClassFeatureOptions(['mist walker', 'subclassfeature3', 'oppressive haze', 'extra'], 'remove'); ClassFeatureOptions(['mist walker', 'subclassfeature3', 'disarming mist', 'extra'], 'remove'); ClassFeatureOptions(['mist walker', 'subclassfeature3', 'obstructing shroud', 'extra'], 'remove'); ClassFeatureOptions(['mist walker', 'subclassfeature3', 'swift guidance', 'extra'], 'remove');"
    },
    "subclassfeature3.1" : {
      name: "Tenacious Mind",
      source : ["T20:MW", 8],
      minlevel : 3,
      description : desc(["Once per long rest, I can recover my expended Shroud Points during a short rest"]),
      additional : "1\u00D7 per long rest"
    },
    "subclassfeature3.2" : {
      name : "Calculated Exchange",
      source : ["T20:MW", 8],
      minlevel : 3,
      description : desc(["As an action, I can swap the position of two willing up to medium size creatures within half my Mist Walk Distance"]),
      action : ["action", ""]
    },
    "subclassfeature7" : {
      name : "Veiled Ferry",
      source : ["T20:MW", 8],
      minlevel : 7,
      description : desc(["I can bring a willing up to medium size creature I touch with me when I Mist Walk. They appear in an unoccupied space next to me. If they can't then they move to the nearest one and take 2d6 force damage per 5 ft. The creature has advantage on the next attack they make before the end of their next turn"]),
      usages : levels.map(function(lvl) {
        return  (lvl < 13 ? "" : "twice " ) + "Intelligence mod per ";
      }),
      usagescalc : "event.value = Math.max(1, (classes.known['mist walker'].level < 13 ? 1 : 2) * tDoc.getField('Int Mod').value);",
      recovery : "long rest"
    },
    "subclassfeature11" : {
      name : "Vigilant Response",
      source : ["T20:MW", 9],
      minlevel : 11,
      description : desc(["As a reaction once per short rest when I see or hear a creature within 30 ft begin casting a spell, I can teleport to an unoccupied space next to and make a single attack against them. If I hit, the creature must succeed at a Constitution saving throw or lose the spell"]),
      additional : "1\u00D7 per short rest",
      action : ["reaction", ""]
    },
    "subclassfeature15" : {
      name : "Veiled Subterfuge",
      source : ["T20:MW", 9],
      minlevel : 15,
      description : desc(["As a reaction once per short rest when I see an ally attacked within my Mist Walk Distance, I can swap the position, and being targeted by the attack, of that ally and one up to medium size creature within my Mist Walk Distance. An unwilling creature must succeed at a Wisdom saving throw to not be teleported"]),
      additional : "1\u00D7 per short rest",
      action : ["reaction", ""]
    }
  }
};

ClassSubList["conviction of the shroud"] = {
  regExpSearch : /shroud/i,
  subname : "Conviction of the Shroud",
  source : ["T20:MW", 9],
  features : {
    "subclassfeature3" : {
      name : "Additional Shroud Ability",
      source : ["T20:MW", 9],
      minlevel : 3,
      description : desc(["I know the Soothing Mist Shroud Ability"]),
      extraname : "Additional Shroud Ability",
      extrachoices : ["soothing mist"],
      choicesNotInMenu : true,
      "soothing mist" : {
        name : "Soothing Mist",
        source : ["T20:MW", 9],
        description : desc(["As a action, I and any number of creatures within 10 ft heal a number of hit points equal to my Intelligence modifier, twice that at 9th level, and three times that at 15th level"]),
        additional : levels.map(function(lvl) {
          var heal = (lvl < 9 ? "" : lvl < 15 ? "twice " : "three times ") + " Intelligence modifier hit points";
          return "3 Shroud Points; heal " +  heal;
        }),
        action : ["action", ""]
      },
      eval : "ClassFeatureOptions(['mist walker', 'subclassfeature3', 'soothing mist', 'extra']);",
      removeeval : "ClassFeatureOptions(['mist walker', 'subclassfeature3', 'soothing mist', 'extra'], 'remove');"
    },
    "subclassfeature3.1" : {
      name: "Vanishing Step",
      source : ["T20:MW", 9],
      minlevel : 3,
      description : desc(["As a bonus action after I Mist Walk with my move, I can attempt to hide"]),
      action : ["bonus action", " (After Mist Walk)"]
    },
    "subclassfeature3.2" : {
      name : "Vital Transference",
      source : ["T20:MW", 9],
      minlevel : 3,
      description : desc(["As an action, I can take 1d6 of unpreventable necrotic damage to heal an creature I touch for 1d6 + Intelligence modifier hit points. If I would be reduced to 0 by this, I am reduce to 1 and the creature receives no healing. I can choose to roll up to, for both damage and healing, 2d6 at 7th, 3d6 at 11th, 4d6 at 15th, and 5d6 at 19th level"]),
      usages : "twice Int mod per ",
      usagescalc : "event.value = Math.max(1, 2 * tDoc.getField('Int Mod').value);",
      recovery : "long rest",
      action : ["action", ""]
    },
    "subclassfeature7" : {
      name : "Toxic Mist",
      source : ["T20:MW", 10],
      minlevel : 7,
      description : desc(["As an action, I create a 30 ft radius sphere of toxic green mist centered on myself for 1 minute or until a moderate wind disperses it. Each creature starting their turn in the mist that needs to breathe or isn't immune to poison must succeed at a Constitution saving throw or be incapacitated and suffocating"]),
      usages : "twice Intelligence per ",
      usagescalc : "event.value = Math.max(1, 2 * tDoc.getField('Int Mod').value);",
      recovery: "long rest",
      action : ["action", ""]
    },
    "subclassfeature11" : {
      name : "Vampiric Transference",
      source : ["T20:MW", 10],
      minlevel : 11,
      description : desc(["As an action, I pulse a 30 ft radius sphere of necrotic mist centered on myself and any creatures I want within the mist take 4d6 necrotic damage if they fail a Constitution saving throw, or half if they succeed. I divide the total damage among any creatures within the mist I want as healing"]),
      usages : "IntMod per ", //Ugly but prevents it from pushing to the next line.
      usagescalc : "event.value = Math.max(1, tDoc.getField('Int Mod').value)",
      recovery : "long rest",
      action : ["action", ""]
    },
    "subclassfeature15" : {
      name : "Dauntless Mist",
      source : ["T20:MW", 10],
      minlevel : 15,
      description : desc(["As an action once per short rest, I choose up to my Intelligence modifier creatures within my Mist Walk Distance and dark purple mist covers them for 1 minute. If they start their turn within half my Mist Walk Distance, they gain +2 AC, 1d4 temporary hit points and cannot be magically slowed"]),
      additional : "1\u00D7 per short rest",
      action : ["action", ""]
    }
  }
};


// Slightly modified spells for Mist Walker's spell-like abilities
// Unsure if this is the best way to go about this, or if the orginal are better.
// The tooltips with the full descriptions did not appear in my testing.

// Mirror Image
SpellsList["mist walker-misty form"] = {
  name : "Misty Form (Mirror Image)",
  nameShort : "Misty Form",
  classes : ["mist walker"],
	source : [["SRD", 165], ["P", 260]],
	level : 0,
	time : "1 bns",
	range : "Self",
	duration : "1 min (D)",
	description : "Create three illusionary duplicates of you; destroyed if hit; randomize attacks; AC 10 + your Dex mod.",
	descriptionFull : "Three misty duplicates of yourself appear in your space as you are covered in mist yourself. Until the spell ends, the duplicates move with you and mimic your actions, shifting position so it's impossible to track which image is real. You can use your action to dismiss the illusory duplicates." + "\n   " + "Each time a creature targets you with an attack during the spell's duration, roll a d20 to determine whether the attack instead targets one of your duplicates." + "\n   " + "If you have three duplicates, you must roll a 6 or higher to change the attack's target to a duplicate. With two duplicates, you must roll an 8 or higher. With one duplicate, you must roll an 11 or higher." + "\n   " + "A duplicate's AC equals 10 + your Dexterity modifier. If an attack hits a duplicate, the duplicate is destroyed. A duplicate can be destroyed only by an attack that hits it. It ignores all other damage and effects." + "\n   " + "A creature is unaffected by this ability if it can't see, if it relies on senses other than sight, such as blindsight, or if it can perceive illusions as false, as with truesight."
};

// Teleport
SpellsList["mist walker-greater mist walk"] = {
  name : "Greater Mist Walk (Teleport)",
  nameShort : "Greater Mist Walk",
  classes : ["mist walker"],
  source : [["SRD", 185], ["P", 281]],
  level : 0,
  time : "1 a",
  range : "10 ft",
  duration : "Instantaneous",
  description : "You, 8 willing crea, or an object teleport to a place you know, have seen, or can describe; see book",
  descriptionFull : "This ability instantly transports you and up to eight willing creatures of your choice that you can see within range, or a single object that you can see within range, to a destination you select. If you target an object, it must be able to fit entirely inside a 10-foot cube, and it can't be held or carried by an unwilling creature. The destination you choose must be known to you, and it must be on the same plane of existence as you. Your familiarity with the destination determines whether you arrive there successfully. The DM rolls d100 and consults the table." + "\n\n" + toUni("Familiarity") + "\t" + toUni("Mishap") + "\t" + toUni("Similar") + "\t  " + toUni("Off") + "\t   " + toUni("On") + "\n\t\t\t  " + toUni("Area") + "\t" + toUni("Target") + "\t" + toUni("Target") + "\nPermanent Circle\t    -\t    -\t    -\t01-100\nAssociated Object\t    -\t    -\t    -\t01-100\nVery Familiar\t01-05\t06-13\t14-24\t25-100\nSeen Casually\t01-33\t34-43\t44-53\t54-100\nViewed Once\t01-43\t44-53\t54-73\t74-100\nDescription\t01-43\t44-53\t54-73\t74-100\nFalse Description\t01-50\t51-100\t    -\t    -" + "\n\n" + toUni("Familiarity") + ": \"Permanent Circle\" means a permanent teleportation circle whose sigil sequence you know. \"Associated Object\" means that you possess an object taken from the desired destination within the last six months, such as a book from a wizard's library, bed linen from a royal suite, or a chunk of marble from a Lich's secret tomb." + "\n   " + "\"Very Familiar\" is a place you have been very often, a place you have carefully studied, or a place you can see when use the ability. \"Seen Casually\" is some place you have seen more than once but with which you aren't very familiar. \"Viewed Once\" is a place you have seen once, possibly using magic. \"Description\" is a place whose location and appearance you know through someone else's description, perhaps from a map." + "\n   " + "\"False Description\" is a place that doesn't exist. Perhaps you tried to scry an enemy's sanctum but instead viewed an illusion, or you are attempting to teleport to a familiar location that no longer exists." + "\n   " + toUni("On Target") + ": You and your group (or the target object) appear where you want to go." + "\n   " + toUni("Off Target") + ": You and your group (or the target object) appear a random distance away from the destination in a random direction. Distance off target is 1d10 \u00D7 1d10 percent of the distance that was to be travelled. For example, if you tried to travel 120 miles, landed off target, and rolled a 5 and 3 on the two d10s, then you would be off target by 15 percent, or 18 miles. The DM determines the direction off target randomly by rolling a d8 and designating 1 as north, 2 as north-east, 3 as east, and so on around the points of the compass. If you were teleporting to a coastal city and wound up 18 miles out at sea, you could be in trouble." + "\n   " + toUni("Similar Area") + ": You and your group (or the target object) wind up in a different area that's visually or thematically similar to the target area. If you are heading for your home laboratory, for example, you might wind up in another wizard's laboratory or in an alchemical supply shop that has many of the same tools and implements as your laboratory. Generally, you appear in the closest similar place, but since the ability has no range limit, you could conceivably wind up anywhere on the plane." + "\n   " + toUni("Mishap") + ": The Mist's unpredictable magic results in a difficult journey. Each teleporting creature (or the target object) takes 3d10 force damage and the DM rerolls on the table to see where you wind up (multiple mishaps can occur, dealing damage each time)."
};

// Slow
SpellsList["mist walker-oppressive haze"] = {
  name : "Oppressive Haze (Slow)",
  nameShort : "Oppressive Haze",
  classes : ["mist walker"],
  source : [["SRD", 180], ["P", 277], ["T20:MW", 7]],
	level : 0,
	time : "1 bns",
	range : "10 ft",
	duration :  "1 min",
	save : "Wis",
	description : "1 creature save or half speed, -2 AC, -2 Dex saves, no rea, only 1 a or bns a; 1 atk; see book",
	descriptionFull : "You send oppressive gray mist around one creature within range. The target must succeed on a Wisdom saving throw or be surrounded in the gray mist for the duration." + "\n   " + "An affected target's speed is halved, it takes a -2 penalty to AC and Dexterity saving throws, and it can't use reactions. On its turn, it can use either an action or a bonus action, not both. Regardless of the creature's abilities or magic items, it can't make more than one melee or ranged attack during its turn." + "\n   " + "If the creature attempts to cast a spell with a casting time of 1 action, roll a d20. On an 11 or higher, the spell doesn't take effect until the creature's next turn, and the creature must use its action on that turn to complete the spell. If it can't, the spell is wasted." + "\n   " + "A creature affected by this ability makes another Wisdom saving throw at the end of its turn. On a successful save, the effect ends for it."
};
