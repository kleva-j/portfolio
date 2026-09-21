import type { Variants } from "motion/react";

import type { BjorkTableThemeMode } from "./table-theme";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

import { useBjorkTableIsDark } from "./table-theme";

export type ElementCategory =
  | "alkali"
  | "alkaline"
  | "transition"
  | "post-transition"
  | "metalloid"
  | "nonmetal"
  | "halogen"
  | "noble-gas"
  | "lanthanide"
  | "actinide";

export interface ChemicalElement {
  number: number;
  symbol: string;
  name: string;
  mass: string;
  category: ElementCategory;
  col: number;
  row: number;
  period: number;
  group: number | null;
  block: "main" | "f";
}

export const ELEMENTS: ChemicalElement[] = [
  {
    number: 1,
    symbol: "H",
    name: "Hydrogen",
    mass: "1.008",
    category: "nonmetal",
    col: 1,
    row: 1,
    period: 1,
    group: 1,
    block: "main",
  },
  {
    number: 2,
    symbol: "He",
    name: "Helium",
    mass: "4.0026",
    category: "noble-gas",
    col: 18,
    row: 1,
    period: 1,
    group: 18,
    block: "main",
  },
  {
    number: 3,
    symbol: "Li",
    name: "Lithium",
    mass: "6.94",
    category: "alkali",
    col: 1,
    row: 2,
    period: 2,
    group: 1,
    block: "main",
  },
  {
    number: 4,
    symbol: "Be",
    name: "Beryllium",
    mass: "9.0122",
    category: "alkaline",
    col: 2,
    row: 2,
    period: 2,
    group: 2,
    block: "main",
  },
  {
    number: 5,
    symbol: "B",
    name: "Boron",
    mass: "10.81",
    category: "metalloid",
    col: 13,
    row: 2,
    period: 2,
    group: 13,
    block: "main",
  },
  {
    number: 6,
    symbol: "C",
    name: "Carbon",
    mass: "12.011",
    category: "nonmetal",
    col: 14,
    row: 2,
    period: 2,
    group: 14,
    block: "main",
  },
  {
    number: 7,
    symbol: "N",
    name: "Nitrogen",
    mass: "14.007",
    category: "nonmetal",
    col: 15,
    row: 2,
    period: 2,
    group: 15,
    block: "main",
  },
  {
    number: 8,
    symbol: "O",
    name: "Oxygen",
    mass: "15.999",
    category: "nonmetal",
    col: 16,
    row: 2,
    period: 2,
    group: 16,
    block: "main",
  },
  {
    number: 9,
    symbol: "F",
    name: "Fluorine",
    mass: "18.998",
    category: "halogen",
    col: 17,
    row: 2,
    period: 2,
    group: 17,
    block: "main",
  },
  {
    number: 10,
    symbol: "Ne",
    name: "Neon",
    mass: "20.180",
    category: "noble-gas",
    col: 18,
    row: 2,
    period: 2,
    group: 18,
    block: "main",
  },
  {
    number: 11,
    symbol: "Na",
    name: "Sodium",
    mass: "22.990",
    category: "alkali",
    col: 1,
    row: 3,
    period: 3,
    group: 1,
    block: "main",
  },
  {
    number: 12,
    symbol: "Mg",
    name: "Magnesium",
    mass: "24.305",
    category: "alkaline",
    col: 2,
    row: 3,
    period: 3,
    group: 2,
    block: "main",
  },
  {
    number: 13,
    symbol: "Al",
    name: "Aluminium",
    mass: "26.982",
    category: "post-transition",
    col: 13,
    row: 3,
    period: 3,
    group: 13,
    block: "main",
  },
  {
    number: 14,
    symbol: "Si",
    name: "Silicon",
    mass: "28.085",
    category: "metalloid",
    col: 14,
    row: 3,
    period: 3,
    group: 14,
    block: "main",
  },
  {
    number: 15,
    symbol: "P",
    name: "Phosphorus",
    mass: "30.974",
    category: "nonmetal",
    col: 15,
    row: 3,
    period: 3,
    group: 15,
    block: "main",
  },
  {
    number: 16,
    symbol: "S",
    name: "Sulfur",
    mass: "32.06",
    category: "nonmetal",
    col: 16,
    row: 3,
    period: 3,
    group: 16,
    block: "main",
  },
  {
    number: 17,
    symbol: "Cl",
    name: "Chlorine",
    mass: "35.45",
    category: "halogen",
    col: 17,
    row: 3,
    period: 3,
    group: 17,
    block: "main",
  },
  {
    number: 18,
    symbol: "Ar",
    name: "Argon",
    mass: "39.948",
    category: "noble-gas",
    col: 18,
    row: 3,
    period: 3,
    group: 18,
    block: "main",
  },
  {
    number: 19,
    symbol: "K",
    name: "Potassium",
    mass: "39.098",
    category: "alkali",
    col: 1,
    row: 4,
    period: 4,
    group: 1,
    block: "main",
  },
  {
    number: 20,
    symbol: "Ca",
    name: "Calcium",
    mass: "40.078",
    category: "alkaline",
    col: 2,
    row: 4,
    period: 4,
    group: 2,
    block: "main",
  },
  {
    number: 21,
    symbol: "Sc",
    name: "Scandium",
    mass: "44.956",
    category: "transition",
    col: 3,
    row: 4,
    period: 4,
    group: 3,
    block: "main",
  },
  {
    number: 22,
    symbol: "Ti",
    name: "Titanium",
    mass: "47.867",
    category: "transition",
    col: 4,
    row: 4,
    period: 4,
    group: 4,
    block: "main",
  },
  {
    number: 23,
    symbol: "V",
    name: "Vanadium",
    mass: "50.942",
    category: "transition",
    col: 5,
    row: 4,
    period: 4,
    group: 5,
    block: "main",
  },
  {
    number: 24,
    symbol: "Cr",
    name: "Chromium",
    mass: "51.996",
    category: "transition",
    col: 6,
    row: 4,
    period: 4,
    group: 6,
    block: "main",
  },
  {
    number: 25,
    symbol: "Mn",
    name: "Manganese",
    mass: "54.938",
    category: "transition",
    col: 7,
    row: 4,
    period: 4,
    group: 7,
    block: "main",
  },
  {
    number: 26,
    symbol: "Fe",
    name: "Iron",
    mass: "55.845",
    category: "transition",
    col: 8,
    row: 4,
    period: 4,
    group: 8,
    block: "main",
  },
  {
    number: 27,
    symbol: "Co",
    name: "Cobalt",
    mass: "58.933",
    category: "transition",
    col: 9,
    row: 4,
    period: 4,
    group: 9,
    block: "main",
  },
  {
    number: 28,
    symbol: "Ni",
    name: "Nickel",
    mass: "58.693",
    category: "transition",
    col: 10,
    row: 4,
    period: 4,
    group: 10,
    block: "main",
  },
  {
    number: 29,
    symbol: "Cu",
    name: "Copper",
    mass: "63.546",
    category: "transition",
    col: 11,
    row: 4,
    period: 4,
    group: 11,
    block: "main",
  },
  {
    number: 30,
    symbol: "Zn",
    name: "Zinc",
    mass: "65.38",
    category: "transition",
    col: 12,
    row: 4,
    period: 4,
    group: 12,
    block: "main",
  },
  {
    number: 31,
    symbol: "Ga",
    name: "Gallium",
    mass: "69.723",
    category: "post-transition",
    col: 13,
    row: 4,
    period: 4,
    group: 13,
    block: "main",
  },
  {
    number: 32,
    symbol: "Ge",
    name: "Germanium",
    mass: "72.630",
    category: "metalloid",
    col: 14,
    row: 4,
    period: 4,
    group: 14,
    block: "main",
  },
  {
    number: 33,
    symbol: "As",
    name: "Arsenic",
    mass: "74.922",
    category: "metalloid",
    col: 15,
    row: 4,
    period: 4,
    group: 15,
    block: "main",
  },
  {
    number: 34,
    symbol: "Se",
    name: "Selenium",
    mass: "78.971",
    category: "nonmetal",
    col: 16,
    row: 4,
    period: 4,
    group: 16,
    block: "main",
  },
  {
    number: 35,
    symbol: "Br",
    name: "Bromine",
    mass: "79.904",
    category: "halogen",
    col: 17,
    row: 4,
    period: 4,
    group: 17,
    block: "main",
  },
  {
    number: 36,
    symbol: "Kr",
    name: "Krypton",
    mass: "83.798",
    category: "noble-gas",
    col: 18,
    row: 4,
    period: 4,
    group: 18,
    block: "main",
  },
  {
    number: 37,
    symbol: "Rb",
    name: "Rubidium",
    mass: "85.468",
    category: "alkali",
    col: 1,
    row: 5,
    period: 5,
    group: 1,
    block: "main",
  },
  {
    number: 38,
    symbol: "Sr",
    name: "Strontium",
    mass: "87.62",
    category: "alkaline",
    col: 2,
    row: 5,
    period: 5,
    group: 2,
    block: "main",
  },
  {
    number: 39,
    symbol: "Y",
    name: "Yttrium",
    mass: "88.906",
    category: "transition",
    col: 3,
    row: 5,
    period: 5,
    group: 3,
    block: "main",
  },
  {
    number: 40,
    symbol: "Zr",
    name: "Zirconium",
    mass: "91.224",
    category: "transition",
    col: 4,
    row: 5,
    period: 5,
    group: 4,
    block: "main",
  },
  {
    number: 41,
    symbol: "Nb",
    name: "Niobium",
    mass: "92.906",
    category: "transition",
    col: 5,
    row: 5,
    period: 5,
    group: 5,
    block: "main",
  },
  {
    number: 42,
    symbol: "Mo",
    name: "Molybdenum",
    mass: "95.95",
    category: "transition",
    col: 6,
    row: 5,
    period: 5,
    group: 6,
    block: "main",
  },
  {
    number: 43,
    symbol: "Tc",
    name: "Technetium",
    mass: "98",
    category: "transition",
    col: 7,
    row: 5,
    period: 5,
    group: 7,
    block: "main",
  },
  {
    number: 44,
    symbol: "Ru",
    name: "Ruthenium",
    mass: "101.07",
    category: "transition",
    col: 8,
    row: 5,
    period: 5,
    group: 8,
    block: "main",
  },
  {
    number: 45,
    symbol: "Rh",
    name: "Rhodium",
    mass: "102.91",
    category: "transition",
    col: 9,
    row: 5,
    period: 5,
    group: 9,
    block: "main",
  },
  {
    number: 46,
    symbol: "Pd",
    name: "Palladium",
    mass: "106.42",
    category: "transition",
    col: 10,
    row: 5,
    period: 5,
    group: 10,
    block: "main",
  },
  {
    number: 47,
    symbol: "Ag",
    name: "Silver",
    mass: "107.87",
    category: "transition",
    col: 11,
    row: 5,
    period: 5,
    group: 11,
    block: "main",
  },
  {
    number: 48,
    symbol: "Cd",
    name: "Cadmium",
    mass: "112.41",
    category: "transition",
    col: 12,
    row: 5,
    period: 5,
    group: 12,
    block: "main",
  },
  {
    number: 49,
    symbol: "In",
    name: "Indium",
    mass: "114.82",
    category: "post-transition",
    col: 13,
    row: 5,
    period: 5,
    group: 13,
    block: "main",
  },
  {
    number: 50,
    symbol: "Sn",
    name: "Tin",
    mass: "118.71",
    category: "post-transition",
    col: 14,
    row: 5,
    period: 5,
    group: 14,
    block: "main",
  },
  {
    number: 51,
    symbol: "Sb",
    name: "Antimony",
    mass: "121.76",
    category: "metalloid",
    col: 15,
    row: 5,
    period: 5,
    group: 15,
    block: "main",
  },
  {
    number: 52,
    symbol: "Te",
    name: "Tellurium",
    mass: "127.60",
    category: "metalloid",
    col: 16,
    row: 5,
    period: 5,
    group: 16,
    block: "main",
  },
  {
    number: 53,
    symbol: "I",
    name: "Iodine",
    mass: "126.90",
    category: "halogen",
    col: 17,
    row: 5,
    period: 5,
    group: 17,
    block: "main",
  },
  {
    number: 54,
    symbol: "Xe",
    name: "Xenon",
    mass: "131.29",
    category: "noble-gas",
    col: 18,
    row: 5,
    period: 5,
    group: 18,
    block: "main",
  },
  {
    number: 55,
    symbol: "Cs",
    name: "Caesium",
    mass: "132.91",
    category: "alkali",
    col: 1,
    row: 6,
    period: 6,
    group: 1,
    block: "main",
  },
  {
    number: 56,
    symbol: "Ba",
    name: "Barium",
    mass: "137.33",
    category: "alkaline",
    col: 2,
    row: 6,
    period: 6,
    group: 2,
    block: "main",
  },
  {
    number: 72,
    symbol: "Hf",
    name: "Hafnium",
    mass: "178.49",
    category: "transition",
    col: 4,
    row: 6,
    period: 6,
    group: 4,
    block: "main",
  },
  {
    number: 73,
    symbol: "Ta",
    name: "Tantalum",
    mass: "180.95",
    category: "transition",
    col: 5,
    row: 6,
    period: 6,
    group: 5,
    block: "main",
  },
  {
    number: 74,
    symbol: "W",
    name: "Tungsten",
    mass: "183.84",
    category: "transition",
    col: 6,
    row: 6,
    period: 6,
    group: 6,
    block: "main",
  },
  {
    number: 75,
    symbol: "Re",
    name: "Rhenium",
    mass: "186.21",
    category: "transition",
    col: 7,
    row: 6,
    period: 6,
    group: 7,
    block: "main",
  },
  {
    number: 76,
    symbol: "Os",
    name: "Osmium",
    mass: "190.23",
    category: "transition",
    col: 8,
    row: 6,
    period: 6,
    group: 8,
    block: "main",
  },
  {
    number: 77,
    symbol: "Ir",
    name: "Iridium",
    mass: "192.22",
    category: "transition",
    col: 9,
    row: 6,
    period: 6,
    group: 9,
    block: "main",
  },
  {
    number: 78,
    symbol: "Pt",
    name: "Platinum",
    mass: "195.08",
    category: "transition",
    col: 10,
    row: 6,
    period: 6,
    group: 10,
    block: "main",
  },
  {
    number: 79,
    symbol: "Au",
    name: "Gold",
    mass: "196.97",
    category: "transition",
    col: 11,
    row: 6,
    period: 6,
    group: 11,
    block: "main",
  },
  {
    number: 80,
    symbol: "Hg",
    name: "Mercury",
    mass: "200.59",
    category: "transition",
    col: 12,
    row: 6,
    period: 6,
    group: 12,
    block: "main",
  },
  {
    number: 81,
    symbol: "Tl",
    name: "Thallium",
    mass: "204.38",
    category: "post-transition",
    col: 13,
    row: 6,
    period: 6,
    group: 13,
    block: "main",
  },
  {
    number: 82,
    symbol: "Pb",
    name: "Lead",
    mass: "207.2",
    category: "post-transition",
    col: 14,
    row: 6,
    period: 6,
    group: 14,
    block: "main",
  },
  {
    number: 83,
    symbol: "Bi",
    name: "Bismuth",
    mass: "208.98",
    category: "post-transition",
    col: 15,
    row: 6,
    period: 6,
    group: 15,
    block: "main",
  },
  {
    number: 84,
    symbol: "Po",
    name: "Polonium",
    mass: "209",
    category: "post-transition",
    col: 16,
    row: 6,
    period: 6,
    group: 16,
    block: "main",
  },
  {
    number: 85,
    symbol: "At",
    name: "Astatine",
    mass: "210",
    category: "halogen",
    col: 17,
    row: 6,
    period: 6,
    group: 17,
    block: "main",
  },
  {
    number: 86,
    symbol: "Rn",
    name: "Radon",
    mass: "222",
    category: "noble-gas",
    col: 18,
    row: 6,
    period: 6,
    group: 18,
    block: "main",
  },
  {
    number: 87,
    symbol: "Fr",
    name: "Francium",
    mass: "223",
    category: "alkali",
    col: 1,
    row: 7,
    period: 7,
    group: 1,
    block: "main",
  },
  {
    number: 88,
    symbol: "Ra",
    name: "Radium",
    mass: "226",
    category: "alkaline",
    col: 2,
    row: 7,
    period: 7,
    group: 2,
    block: "main",
  },
  {
    number: 104,
    symbol: "Rf",
    name: "Rutherfordium",
    mass: "267",
    category: "transition",
    col: 4,
    row: 7,
    period: 7,
    group: 4,
    block: "main",
  },
  {
    number: 105,
    symbol: "Db",
    name: "Dubnium",
    mass: "268",
    category: "transition",
    col: 5,
    row: 7,
    period: 7,
    group: 5,
    block: "main",
  },
  {
    number: 106,
    symbol: "Sg",
    name: "Seaborgium",
    mass: "269",
    category: "transition",
    col: 6,
    row: 7,
    period: 7,
    group: 6,
    block: "main",
  },
  {
    number: 107,
    symbol: "Bh",
    name: "Bohrium",
    mass: "270",
    category: "transition",
    col: 7,
    row: 7,
    period: 7,
    group: 7,
    block: "main",
  },
  {
    number: 108,
    symbol: "Hs",
    name: "Hassium",
    mass: "277",
    category: "transition",
    col: 8,
    row: 7,
    period: 7,
    group: 8,
    block: "main",
  },
  {
    number: 109,
    symbol: "Mt",
    name: "Meitnerium",
    mass: "278",
    category: "transition",
    col: 9,
    row: 7,
    period: 7,
    group: 9,
    block: "main",
  },
  {
    number: 110,
    symbol: "Ds",
    name: "Darmstadtium",
    mass: "281",
    category: "transition",
    col: 10,
    row: 7,
    period: 7,
    group: 10,
    block: "main",
  },
  {
    number: 111,
    symbol: "Rg",
    name: "Roentgenium",
    mass: "282",
    category: "transition",
    col: 11,
    row: 7,
    period: 7,
    group: 11,
    block: "main",
  },
  {
    number: 112,
    symbol: "Cn",
    name: "Copernicium",
    mass: "285",
    category: "transition",
    col: 12,
    row: 7,
    period: 7,
    group: 12,
    block: "main",
  },
  {
    number: 113,
    symbol: "Nh",
    name: "Nihonium",
    mass: "286",
    category: "post-transition",
    col: 13,
    row: 7,
    period: 7,
    group: 13,
    block: "main",
  },
  {
    number: 114,
    symbol: "Fl",
    name: "Flerovium",
    mass: "289",
    category: "post-transition",
    col: 14,
    row: 7,
    period: 7,
    group: 14,
    block: "main",
  },
  {
    number: 115,
    symbol: "Mc",
    name: "Moscovium",
    mass: "290",
    category: "post-transition",
    col: 15,
    row: 7,
    period: 7,
    group: 15,
    block: "main",
  },
  {
    number: 116,
    symbol: "Lv",
    name: "Livermorium",
    mass: "293",
    category: "post-transition",
    col: 16,
    row: 7,
    period: 7,
    group: 16,
    block: "main",
  },
  {
    number: 117,
    symbol: "Ts",
    name: "Tennessine",
    mass: "294",
    category: "halogen",
    col: 17,
    row: 7,
    period: 7,
    group: 17,
    block: "main",
  },
  {
    number: 118,
    symbol: "Og",
    name: "Oganesson",
    mass: "294",
    category: "noble-gas",
    col: 18,
    row: 7,
    period: 7,
    group: 18,
    block: "main",
  },
  // Lanthanides (f-block row 1, cols 3-17)
  {
    number: 57,
    symbol: "La",
    name: "Lanthanum",
    mass: "138.91",
    category: "lanthanide",
    col: 3,
    row: 1,
    period: 6,
    group: null,
    block: "f",
  },
  {
    number: 58,
    symbol: "Ce",
    name: "Cerium",
    mass: "140.12",
    category: "lanthanide",
    col: 4,
    row: 1,
    period: 6,
    group: null,
    block: "f",
  },
  {
    number: 59,
    symbol: "Pr",
    name: "Praseodymium",
    mass: "140.91",
    category: "lanthanide",
    col: 5,
    row: 1,
    period: 6,
    group: null,
    block: "f",
  },
  {
    number: 60,
    symbol: "Nd",
    name: "Neodymium",
    mass: "144.24",
    category: "lanthanide",
    col: 6,
    row: 1,
    period: 6,
    group: null,
    block: "f",
  },
  {
    number: 61,
    symbol: "Pm",
    name: "Promethium",
    mass: "145",
    category: "lanthanide",
    col: 7,
    row: 1,
    period: 6,
    group: null,
    block: "f",
  },
  {
    number: 62,
    symbol: "Sm",
    name: "Samarium",
    mass: "150.36",
    category: "lanthanide",
    col: 8,
    row: 1,
    period: 6,
    group: null,
    block: "f",
  },
  {
    number: 63,
    symbol: "Eu",
    name: "Europium",
    mass: "151.96",
    category: "lanthanide",
    col: 9,
    row: 1,
    period: 6,
    group: null,
    block: "f",
  },
  {
    number: 64,
    symbol: "Gd",
    name: "Gadolinium",
    mass: "157.25",
    category: "lanthanide",
    col: 10,
    row: 1,
    period: 6,
    group: null,
    block: "f",
  },
  {
    number: 65,
    symbol: "Tb",
    name: "Terbium",
    mass: "158.93",
    category: "lanthanide",
    col: 11,
    row: 1,
    period: 6,
    group: null,
    block: "f",
  },
  {
    number: 66,
    symbol: "Dy",
    name: "Dysprosium",
    mass: "162.50",
    category: "lanthanide",
    col: 12,
    row: 1,
    period: 6,
    group: null,
    block: "f",
  },
  {
    number: 67,
    symbol: "Ho",
    name: "Holmium",
    mass: "164.93",
    category: "lanthanide",
    col: 13,
    row: 1,
    period: 6,
    group: null,
    block: "f",
  },
  {
    number: 68,
    symbol: "Er",
    name: "Erbium",
    mass: "167.26",
    category: "lanthanide",
    col: 14,
    row: 1,
    period: 6,
    group: null,
    block: "f",
  },
  {
    number: 69,
    symbol: "Tm",
    name: "Thulium",
    mass: "168.93",
    category: "lanthanide",
    col: 15,
    row: 1,
    period: 6,
    group: null,
    block: "f",
  },
  {
    number: 70,
    symbol: "Yb",
    name: "Ytterbium",
    mass: "173.05",
    category: "lanthanide",
    col: 16,
    row: 1,
    period: 6,
    group: null,
    block: "f",
  },
  {
    number: 71,
    symbol: "Lu",
    name: "Lutetium",
    mass: "174.97",
    category: "lanthanide",
    col: 17,
    row: 1,
    period: 6,
    group: null,
    block: "f",
  },
  // Actinides (f-block row 2, cols 3-17)
  {
    number: 89,
    symbol: "Ac",
    name: "Actinium",
    mass: "227",
    category: "actinide",
    col: 3,
    row: 2,
    period: 7,
    group: null,
    block: "f",
  },
  {
    number: 90,
    symbol: "Th",
    name: "Thorium",
    mass: "232.04",
    category: "actinide",
    col: 4,
    row: 2,
    period: 7,
    group: null,
    block: "f",
  },
  {
    number: 91,
    symbol: "Pa",
    name: "Protactinium",
    mass: "231.04",
    category: "actinide",
    col: 5,
    row: 2,
    period: 7,
    group: null,
    block: "f",
  },
  {
    number: 92,
    symbol: "U",
    name: "Uranium",
    mass: "238.03",
    category: "actinide",
    col: 6,
    row: 2,
    period: 7,
    group: null,
    block: "f",
  },
  {
    number: 93,
    symbol: "Np",
    name: "Neptunium",
    mass: "237",
    category: "actinide",
    col: 7,
    row: 2,
    period: 7,
    group: null,
    block: "f",
  },
  {
    number: 94,
    symbol: "Pu",
    name: "Plutonium",
    mass: "244",
    category: "actinide",
    col: 8,
    row: 2,
    period: 7,
    group: null,
    block: "f",
  },
  {
    number: 95,
    symbol: "Am",
    name: "Americium",
    mass: "243",
    category: "actinide",
    col: 9,
    row: 2,
    period: 7,
    group: null,
    block: "f",
  },
  {
    number: 96,
    symbol: "Cm",
    name: "Curium",
    mass: "247",
    category: "actinide",
    col: 10,
    row: 2,
    period: 7,
    group: null,
    block: "f",
  },
  {
    number: 97,
    symbol: "Bk",
    name: "Berkelium",
    mass: "247",
    category: "actinide",
    col: 11,
    row: 2,
    period: 7,
    group: null,
    block: "f",
  },
  {
    number: 98,
    symbol: "Cf",
    name: "Californium",
    mass: "251",
    category: "actinide",
    col: 12,
    row: 2,
    period: 7,
    group: null,
    block: "f",
  },
  {
    number: 99,
    symbol: "Es",
    name: "Einsteinium",
    mass: "252",
    category: "actinide",
    col: 13,
    row: 2,
    period: 7,
    group: null,
    block: "f",
  },
  {
    number: 100,
    symbol: "Fm",
    name: "Fermium",
    mass: "257",
    category: "actinide",
    col: 14,
    row: 2,
    period: 7,
    group: null,
    block: "f",
  },
  {
    number: 101,
    symbol: "Md",
    name: "Mendelevium",
    mass: "258",
    category: "actinide",
    col: 15,
    row: 2,
    period: 7,
    group: null,
    block: "f",
  },
  {
    number: 102,
    symbol: "No",
    name: "Nobelium",
    mass: "259",
    category: "actinide",
    col: 16,
    row: 2,
    period: 7,
    group: null,
    block: "f",
  },
  {
    number: 103,
    symbol: "Lr",
    name: "Lawrencium",
    mass: "266",
    category: "actinide",
    col: 17,
    row: 2,
    period: 7,
    group: null,
    block: "f",
  },
];

export const ELEMENT_CATEGORY_LABELS: Record<ElementCategory, string> = {
  alkali: "Alkali metal",
  alkaline: "Alkaline earth",
  transition: "Transition metal",
  "post-transition": "Post-transition",
  metalloid: "Metalloid",
  nonmetal: "Nonmetal",
  halogen: "Halogen",
  "noble-gas": "Noble gas",
  lanthanide: "Lanthanide",
  actinide: "Actinide",
};

interface CategoryPalette {
  text: string;
  bg: string;
  border: string;
  dot: string;
}

export function getElementCategoryPalette(
  category: ElementCategory,
  isDark: boolean,
): CategoryPalette {
  const palettes: Record<ElementCategory, CategoryPalette> = {
    alkali: {
      text: isDark ? "text-[#d86a2c]" : "text-[#9f4317]",
      bg: isDark ? "bg-[#ec5c13]/14" : "bg-[#ead9cb]",
      border: isDark ? "border-[#ec5c13]/28" : "border-[#d5b59f]",
      dot: isDark ? "bg-[#d86a2c]" : "bg-[#9f4317]",
    },
    alkaline: {
      text: isDark ? "text-[#c8a24a]" : "text-[#8a6d1f]",
      bg: isDark ? "bg-[#c9a227]/12" : "bg-[#ede4cd]",
      border: isDark ? "border-[#c9a227]/24" : "border-[#dccfa8]",
      dot: isDark ? "bg-[#c8a24a]" : "bg-[#8a6d1f]",
    },
    transition: {
      text: isDark ? "text-[#a89f8d]" : "text-[#6f6653]",
      bg: isDark ? "bg-[#a89f8d]/12" : "bg-[#e7e0d4]",
      border: isDark ? "border-[#a89f8d]/20" : "border-[#d3c9b8]",
      dot: isDark ? "bg-[#a89f8d]" : "bg-[#6f6653]",
    },
    "post-transition": {
      text: isDark ? "text-[#a8b36b]" : "text-[#66703a]",
      bg: isDark ? "bg-[#97a05c]/14" : "bg-[#e3e5d2]",
      border: isDark ? "border-[#97a05c]/24" : "border-[#ccd1ae]",
      dot: isDark ? "bg-[#a8b36b]" : "bg-[#66703a]",
    },
    metalloid: {
      text: isDark ? "text-[#77b596]" : "text-[#3d6f5c]",
      bg: isDark ? "bg-[#5f9f88]/14" : "bg-[#d8e5de]",
      border: isDark ? "border-[#5f9f88]/26" : "border-[#b7cfc2]",
      dot: isDark ? "bg-[#77b596]" : "bg-[#3d6f5c]",
    },
    nonmetal: {
      text: isDark ? "text-[#77b58b]" : "text-[#47785c]",
      bg: isDark ? "bg-[#3e6f52]/18" : "bg-[#dce8dc]",
      border: isDark ? "border-[#5f9f78]/28" : "border-[#bad0bd]",
      dot: isDark ? "bg-[#77b58b]" : "bg-[#47785c]",
    },
    halogen: {
      text: isDark ? "text-[#7bb5b3]" : "text-[#3f6d6c]",
      bg: isDark ? "bg-[#5f9f9c]/14" : "bg-[#d9e4e4]",
      border: isDark ? "border-[#5f9f9c]/26" : "border-[#b5cbca]",
      dot: isDark ? "bg-[#7bb5b3]" : "bg-[#3f6d6c]",
    },
    "noble-gas": {
      text: isDark ? "text-[#8fa5c4]" : "text-[#4d6076]",
      bg: isDark ? "bg-[#6f87a8]/14" : "bg-[#dde2e8]",
      border: isDark ? "border-[#6f87a8]/26" : "border-[#c0c9d6]",
      dot: isDark ? "bg-[#8fa5c4]" : "bg-[#4d6076]",
    },
    lanthanide: {
      text: isDark ? "text-[#cf8a6b]" : "text-[#94573f]",
      bg: isDark ? "bg-[#c4704f]/14" : "bg-[#ead8d2]",
      border: isDark ? "border-[#c4704f]/26" : "border-[#d7bcb2]",
      dot: isDark ? "bg-[#cf8a6b]" : "bg-[#94573f]",
    },
    actinide: {
      text: isDark ? "text-[#cf7c72]" : "text-[#9d5149]",
      bg: isDark ? "bg-[#87463f]/18" : "bg-[#eadad5]",
      border: isDark ? "border-[#c46a61]/28" : "border-[#d7bcb4]",
      dot: isDark ? "bg-[#cf7c72]" : "bg-[#9d5149]",
    },
  };

  return palettes[category];
}

interface PeriodicTableProps {
  elements?: ChemicalElement[];
  onElementSelect?: (element: ChemicalElement) => void;
  className?: string;
  theme?: BjorkTableThemeMode;
  enableAnimations?: boolean;
  showLegend?: boolean;
}

interface CardAnchor {
  element: ChemicalElement;
  x: number;
  y: number;
  placeBelow: boolean;
}

const CARD_GAP = 10;
const CARD_WIDTH = 228;

export function PeriodicTable({
  elements = ELEMENTS,
  onElementSelect,
  className = "",
  theme = "auto",
  enableAnimations = true,
  showLegend = true,
}: PeriodicTableProps) {
  const [mounted, setMounted] = useState(false);
  const forcedTheme = theme === "auto" ? undefined : theme;
  const detectedIsDark = useBjorkTableIsDark(undefined, forcedTheme);
  const isDark = !mounted && theme === "auto" ? true : detectedIsDark;
  const shouldReduceMotion = useReducedMotion();
  const shouldAnimate = enableAnimations && !shouldReduceMotion;

  const containerRef = useRef<HTMLDivElement>(null);
  const cellRefs = useRef(new Map<number, HTMLButtonElement>());
  const [anchor, setAnchor] = useState<CardAnchor | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleElementEnter = useCallback((element: ChemicalElement) => {
    const node = cellRefs.current.get(element.number);
    const container = containerRef.current;
    if (!node || !container) return;
    const placeBelow = element.block === "main" && element.period <= 2;
    // Keep the card fully inside the container on narrow screens
    const halfCard = CARD_WIDTH / 2 + 8;
    const rawX = node.offsetLeft + node.offsetWidth / 2;
    const maxX = container.clientWidth - halfCard;
    setAnchor({
      element,
      x: Math.min(Math.max(rawX, halfCard), Math.max(maxX, halfCard)),
      y: placeBelow
        ? node.offsetTop + node.offsetHeight + CARD_GAP
        : node.offsetTop - CARD_GAP,
      placeBelow,
    });
  }, []);

  const clearAnchor = useCallback(() => setAnchor(null), []);

  const mainElements = elements.filter((element) => element.block === "main");
  const fBlockElements = elements.filter((element) => element.block === "f");

  const cellVariants: Variants = {
    hidden: { opacity: 0, y: 14, scale: 0.92, filter: "blur(4px)" },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 420,
        damping: 30,
        mass: 0.7,
        delay: 0.05 + index * 0.004,
      },
    }),
  };

  const anchorSpring = shouldReduceMotion
    ? { duration: 0.12 }
    : { type: "spring" as const, stiffness: 480, damping: 38, mass: 0.8 };

  const activeCategory = anchor
    ? getElementCategoryPalette(anchor.element.category, isDark)
    : null;

  return (
    <div
      ref={containerRef}
      data-bjork-theme={isDark ? "dark" : "light"}
      onMouseLeave={clearAnchor}
      onClick={clearAnchor}
      className={cn(
        "relative mx-auto w-full max-w-[1060px] rounded-[20px] border",
        "border-[var(--bjork-border)] bg-[var(--bjork-surface)] p-4 shadow-[var(--bjork-shadow-surface)] sm:p-5",
        className,
      )}
    >
      {showLegend && (
        <div className="mb-4 flex flex-wrap items-center gap-x-3.5 gap-y-1.5 px-1">
          {(Object.keys(ELEMENT_CATEGORY_LABELS) as ElementCategory[]).map(
            (category) => {
              const categoryPalette = getElementCategoryPalette(
                category,
                isDark,
              );
              return (
                <span
                  key={category}
                  className="flex items-center gap-1.5 text-[10.5px] leading-none"
                >
                  <span
                    className={cn("size-1.5 rounded-full", categoryPalette.dot)}
                  />
                  <span className="text-[var(--bjork-text-muted)]">
                    {ELEMENT_CATEGORY_LABELS[category]}
                  </span>
                </span>
              );
            },
          )}
        </div>
      )}

      <div className="grid grid-cols-[repeat(18,minmax(0,1fr))] gap-1">
        {mainElements.map((element, index) => (
          <ElementCell
            key={element.number}
            element={element}
            index={index}
            isActive={anchor?.element.number === element.number}
            isDark={isDark}
            shouldAnimate={shouldAnimate}
            variants={cellVariants}
            registerCell={(node) => {
              if (node) cellRefs.current.set(element.number, node);
              else cellRefs.current.delete(element.number);
            }}
            onEnter={handleElementEnter}
            onLeave={clearAnchor}
            onSelect={onElementSelect}
          />
        ))}
        {/* f-block placeholders in the main grid */}
        <div
          style={{ gridColumn: 3, gridRow: 6 }}
          className="pointer-events-none flex aspect-square items-center justify-center rounded-[8px] border border-dashed border-[var(--bjork-border-strong)] text-[8.5px] text-[var(--bjork-text-faint)] tabular-nums"
        >
          57-71
        </div>
        <div
          style={{ gridColumn: 3, gridRow: 7 }}
          className="pointer-events-none flex aspect-square items-center justify-center rounded-[8px] border border-dashed border-[var(--bjork-border-strong)] text-[8.5px] text-[var(--bjork-text-faint)] tabular-nums"
        >
          89-103
        </div>
      </div>

      <div className="mt-3 grid grid-cols-[repeat(18,minmax(0,1fr))] gap-1">
        {fBlockElements.map((element, index) => (
          <ElementCell
            key={element.number}
            element={element}
            index={mainElements.length + index}
            isActive={anchor?.element.number === element.number}
            isDark={isDark}
            shouldAnimate={shouldAnimate}
            variants={cellVariants}
            registerCell={(node) => {
              if (node) cellRefs.current.set(element.number, node);
              else cellRefs.current.delete(element.number);
            }}
            onEnter={handleElementEnter}
            onLeave={clearAnchor}
            onSelect={onElementSelect}
          />
        ))}
      </div>

      {/* Floating element card */}
      <AnimatePresence>
        {anchor && activeCategory && (
          <motion.div
            key="periodic-element-card"
            className="pointer-events-none absolute top-0 left-0 z-30"
            initial={{ x: anchor.x, y: anchor.y }}
            animate={{ x: anchor.x, y: anchor.y }}
            transition={anchorSpring}
          >
            <div
              className={cn(
                "-translate-x-1/2",
                anchor.placeBelow ? "" : "-translate-y-full",
              )}
            >
              <motion.div
                initial={
                  shouldAnimate
                    ? {
                        opacity: 0,
                        y: anchor.placeBelow ? -12 : 12,
                        scale: 0.94,
                        filter: "blur(8px)",
                      }
                    : { opacity: 0 }
                }
                animate={
                  shouldAnimate
                    ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
                    : { opacity: 1 }
                }
                exit={
                  shouldAnimate
                    ? {
                        opacity: 0,
                        y: anchor.placeBelow ? -6 : 6,
                        scale: 0.97,
                        filter: "blur(6px)",
                        transition: { duration: 0.12, ease: "easeOut" },
                      }
                    : { opacity: 0, transition: { duration: 0.1 } }
                }
                transition={
                  shouldReduceMotion
                    ? { duration: 0.15 }
                    : {
                        type: "spring",
                        stiffness: 420,
                        damping: 30,
                        mass: 0.7,
                      }
                }
                className="w-[228px] rounded-[16px] border border-[var(--bjork-border-muted)] bg-[var(--bjork-surface)] p-4 text-[var(--bjork-text-medium)] shadow-[var(--bjork-shadow-menu)]"
              >
                <motion.div
                  key={anchor.element.number}
                  initial={{ opacity: 0, filter: "blur(3px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  transition={{ duration: 0.14, ease: "easeOut" }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-[var(--bjork-accent)] tabular-nums">
                      {anchor.element.number}
                    </span>
                    <span
                      className={cn(
                        "rounded-[8px] border px-1.5 py-0.5 text-[10px] leading-none font-medium",
                        activeCategory.bg,
                        activeCategory.border,
                        activeCategory.text,
                      )}
                    >
                      {ELEMENT_CATEGORY_LABELS[anchor.element.category]}
                    </span>
                  </div>

                  <div className="mt-2 flex items-end justify-between gap-3">
                    <div className="min-w-0">
                      <div className="text-[34px] leading-none font-bold tracking-tight text-[var(--bjork-text-strong)]">
                        {anchor.element.symbol}
                      </div>
                      <div className="mt-1.5 truncate text-[13px] text-[var(--bjork-text-muted)]">
                        {anchor.element.name}
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 grid grid-cols-3 gap-2 border-t border-[var(--bjork-border-muted)] pt-2.5">
                    <div>
                      <div className="text-[12px] font-medium text-[var(--bjork-text-strong)] tabular-nums">
                        {anchor.element.mass}
                      </div>
                      <div className="mt-0.5 text-[9.5px] leading-none text-[var(--bjork-text-soft)]">
                        Mass
                      </div>
                    </div>
                    <div>
                      <div className="text-[12px] font-medium text-[var(--bjork-text-strong)] tabular-nums">
                        {anchor.element.group ?? "f-block"}
                      </div>
                      <div className="mt-0.5 text-[9.5px] leading-none text-[var(--bjork-text-soft)]">
                        Group
                      </div>
                    </div>
                    <div>
                      <div className="text-[12px] font-medium text-[var(--bjork-text-strong)] tabular-nums">
                        {anchor.element.period}
                      </div>
                      <div className="mt-0.5 text-[9.5px] leading-none text-[var(--bjork-text-soft)]">
                        Period
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface ElementCellProps {
  element: ChemicalElement;
  index: number;
  isActive: boolean;
  isDark: boolean;
  shouldAnimate: boolean;
  variants: Variants;
  registerCell: (node: HTMLButtonElement | null) => void;
  onEnter: (element: ChemicalElement) => void;
  onLeave: () => void;
  onSelect?: (element: ChemicalElement) => void;
}

function ElementCell({
  element,
  index,
  isActive,
  isDark,
  shouldAnimate,
  variants,
  registerCell,
  onEnter,
  onLeave,
  onSelect,
}: ElementCellProps) {
  const categoryPalette = getElementCategoryPalette(element.category, isDark);

  return (
    <motion.button
      ref={registerCell}
      type="button"
      style={{ gridColumn: element.col, gridRow: element.row }}
      custom={index}
      initial={shouldAnimate ? "hidden" : "visible"}
      animate="visible"
      variants={shouldAnimate ? variants : undefined}
      whileHover={shouldAnimate ? { scale: 1.14, y: -2 } : undefined}
      whileTap={shouldAnimate ? { scale: 0.94 } : undefined}
      transition={
        shouldAnimate
          ? { type: "spring", stiffness: 500, damping: 28 }
          : { duration: 0 }
      }
      onMouseEnter={() => onEnter(element)}
      onMouseLeave={onLeave}
      onFocus={() => onEnter(element)}
      onBlur={onLeave}
      onClick={(event) => {
        event.stopPropagation();
        onEnter(element);
        onSelect?.(element);
      }}
      aria-label={`${element.name}, atomic number ${element.number}`}
      className={cn(
        "relative z-0 flex aspect-square cursor-pointer flex-col items-center justify-center rounded-[8px] border outline-none",
        "focus-visible:ring-2 focus-visible:ring-[#ec5c13]/40",
        "border-[var(--bjork-border-muted)] bg-[var(--bjork-field)] shadow-[var(--bjork-shadow-soft)]",
        "transition-colors hover:border-[var(--bjork-border-strong)] hover:bg-[var(--bjork-surface-hover)]",
        isActive &&
          "border-[var(--bjork-accent-muted)] bg-[var(--bjork-accent-soft)] hover:border-[var(--bjork-accent-muted)] hover:bg-[var(--bjork-accent-soft)]",
        isActive && "z-10",
      )}
    >
      <span className="absolute top-[3px] left-[5px] text-[8px] leading-none text-[var(--bjork-text-soft)] tabular-nums">
        {element.number}
      </span>
      <span
        className={cn(
          "text-[13px] leading-none font-semibold tracking-tight",
          categoryPalette.text,
        )}
      >
        {element.symbol}
      </span>
    </motion.button>
  );
}
