    export interface Bllesing {
        "1st": string;
        "2nd": string;
        "3rd": string;
        bonus: string;
        disp: string;
        dispbonus: string;
        growth?: any;
        modify: string;
        selected?: any;
        total: string;
    }

    export interface Intellect {
        "1st": string;
        "2nd": string;
        "3rd": string;
        bonus: string;
        disp: string;
        dispbonus: string;
        growth?: any;
        modify?: any;
        selected?: any;
        total: string;
    }

    export interface Name {
        "1st": string;
        "2nd": string;
        "3rd": string;
    }

    export interface Nametext {
        "1st"?: any;
        "2nd"?: any;
        "3rd"?: any;
    }

    export interface Reflex {
        "1st": string;
        "2nd": string;
        "3rd": string;
        bonus: string;
        disp: string;
        dispbonus: string;
        growth?: any;
        modify?: any;
        selected?: any;
        total: string;
    }

    export interface Sense {
        "1st": string;
        "2nd": string;
        "3rd": string;
        bonus: string;
        disp: string;
        dispbonus: string;
        growth?: any;
        modify?: any;
        selected: string;
        total: string;
    }

    export interface Specialpower {
        "1st": string;
        "2nd": string;
        "3rd": string;
    }

    export interface Strong {
        "1st": string;
        "2nd": string;
        "3rd": string;
        bonus: string;
        disp: string;
        dispbonus: string;
        growth?: any;
        modify: string;
        selected?: any;
        total: string;
    }

    export interface Type {
        "1st": string;
        "2nd": string;
        "3rd": string;
    }

    export interface Will {
        "1st": string;
        "2nd": string;
        "3rd": string;
        bonus: string;
        disp: string;
        dispbonus: string;
        growth?: any;
        modify?: any;
        selected?: any;
        total: string;
    }

    export interface Abl {
        bllesing: Bllesing;
        intellect: Intellect;
        name: Name;
        nametext: Nametext;
        reflex: Reflex;
        sense: Sense;
        specialpower: Specialpower;
        strong: Strong;
        type: Type;
        will: Will;
    }

    export interface Armour {
        crash: string;
        dark: string;
        fire: string;
        ice: string;
        light: string;
        memo: string;
        name: string;
        part: string;
        pierce: string;
        selected: string;
        slash: string;
        thunder: string;
    }

    export interface Armourstotal {
        crash: string;
        dark: string;
        fire: string;
        ice: string;
        light: string;
        pierce: string;
        slash: string;
        thunder: string;
    }

    export interface Base {
        age: string;
        cover?: any;
        exp: string;
        eye: string;
        hair?: any;
        height?: any;
        level: string;
        memo: string;
        name: string;
        nameKana: string;
        player: string;
        sex: string;
        weight?: any;
    }

    export interface Battle {
        action: string;
        attack: string;
        countermagic: string;
        dodge: string;
        fp: string;
        hit: string;
        hp: string;
        level: string;
        magic: string;
        mp: string;
        name: string;
        nametext?: any;
    }

    export interface Battlebase {
        action: string;
        attack: string;
        countermagic: string;
        dodge: string;
        fp: string;
        hit: string;
        hp: string;
        magic: string;
        mp: string;
    }

    export interface Battlemod {
        action?: any;
        countermagic?: any;
        dodge?: any;
        fp?: any;
        hit?: any;
        hp?: any;
        magic?: any;
        mp?: any;
    }

    export interface Battlesubtotal {
        action: string;
        attack: string;
        countermagic: string;
        dodge: string;
        fp: string;
        hit: string;
        hp: string;
        magic: string;
        mp: string;
    }

    export interface Class {
        level: string;
        name: string;
        nametext?: any;
    }

    export interface Entry {
        connection: string;
        value: string;
    }

    export interface Item {
        effect: string;
        name: string;
        point: string;
    }

    export interface Itemstotal {
        arms: string;
        exp?: any;
        exppoint: string;
        skills?: any;
        subtotal: string;
        total: string;
    }

    export interface Connection {
        exp?: any;
        name?: any;
        relation?: any;
    }

    export interface Quest {
        name: string;
    }

    export interface Lifepath {
        birth?: any;
        connection: Connection[];
        encounter?: any;
        environment?: any;
        quest: Quest[];
    }

    export interface Bodysuit {
        action: string;
        attack: string;
        countermagic: string;
        dodge: string;
        fp: string;
        hit: string;
        hp?: any;
        magic: string;
        mp: string;
        name: string;
        point?: any;
        selected: string;
        speed: string;
    }

    export interface MainWeaponShort {
        action: string;
        attack: string;
        countermagic: string;
        damagetype: string;
        dodge: string;
        fp?: any;
        hit: string;
        hp?: any;
        magic: string;
        mp?: any;
        name: string;
        point: string;
        range: string;
        selected: string;
        strong: string;
    }

    export interface Option {
        action?: any;
        attack?: any;
        countermagic?: any;
        dodge?: any;
        fp?: any;
        hit?: any;
        hp?: any;
        magic?: any;
        mp?: any;
        name?: any;
        point?: any;
        range?: any;
        selected: string;
        speed?: any;
        strong?: any;
    }

    export interface Other {
        action: string;
        attack?: any;
        countermagic?: any;
        dodge?: any;
        fp?: any;
        hit?: any;
        hp?: any;
        magic?: any;
        mp?: any;
        name: string;
        point: string;
        range?: any;
        selected: string;
        speed?: any;
        strong?: any;
    }

    export interface Soulsuit {
        action: string;
        attack: string;
        countermagic: string;
        dodge: string;
        fp: string;
        hit: string;
        hp?: any;
        magic: string;
        mp: string;
        name: string;
        point?: any;
        selected: string;
        speed?: any;
    }

    export interface SubWeaponShort {
        action?: any;
        attack?: any;
        countermagic?: any;
        damagetype: string;
        dodge?: any;
        fp?: any;
        hit?: any;
        hp?: any;
        magic?: any;
        mp?: any;
        name?: any;
        point?: any;
        range?: any;
        selected: string;
        strong?: any;
    }

    export interface Battlespeed {
        base: string;
        mod?: any;
        total: string;
    }

    export interface Maxspeed {
        base: string;
    }

    export interface Total {
        action: string;
        battlespeed: Battlespeed;
        countermagic: string;
        dodge: string;
        fp: string;
        hit: string;
        hp: string;
        magic: string;
        main_weapon_shortattack: string;
        main_weapon_shortname: string;
        main_weapon_shortrange: string;
        main_weapon_shortstrong: string;
        maxspeed: Maxspeed;
        mp: string;
        point: string;
        sub_weapon_shortattack: string;
        sub_weapon_shortname?: any;
        sub_weapon_shortrange?: any;
        sub_weapon_shortstrong?: any;
    }

    export interface Outfits {
        bodysuits: Bodysuit[];
        main_weapon_short: MainWeaponShort[];
        option: Option[];
        other: Other[];
        soulsuits: Soulsuit[];
        sub_weapon_short: SubWeaponShort[];
        total: Total;
    }

    export interface Skill {
        class: string;
        cost: string;
        exp?: any;
        level: string;
        memo: string;
        name: string;
        range: string;
        target: string;
        timing: string;
        type: string;
    }

    export interface Special {
        effect: string;
        name: string;
    }

    export interface MarCharacter {
        abl: Abl;
        addfortunepoint: string;
        armours: Armour[];
        armourstotal: Armourstotal;
        base: Base;
        battle: Battle[];
        battlebase: Battlebase;
        battlemod: Battlemod;
        battlesubtotal: Battlesubtotal;
        classes: Class[];
        display?: any;
        entry: Entry;
        fortunepoint: string;
        items: Item[];
        itemstotal: Itemstotal;
        lifepath: Lifepath;
        outfits: Outfits;
        outline: string;
        skills: Skill[];
        specials: Special[];
    }
