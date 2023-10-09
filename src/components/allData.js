export const allData = [
  {
    id: "kom",
    label: "KOM",
    description: "Brandteknisk dimensionering",
    kontrolplansId: "_KPKR_D_DIM",
    belongsTo: "designData",
  },
  {
    id: "funk",
    label: "FUNK",
    description: "Funktionsbeskrivelse",
    kontrolplansId: "_KPKR_D_FUNK",
    belongsTo: "designData",
  },
  {
    id: "kpla",
    label: "KPLA",
    description: "Brandtekniske kontrolplaner",
    kontrolplansId: "_KPKR_D_KPLA",
    belongsTo: "designData",
  },
  {
    id: "dkv",
    label: "DKV",
    description: "Drifts-, kontrol-, og vedligeholdelsesplan",
    kontrolplansId: "_KPKR_D_DKV",
    belongsTo: "designData",
  },
  {
    id: "flugt",
    label: "FLUGT",
    description: "Flugtvejsgange, -arealer og -trapper.",
    kontrolplansId: "_KPKR_P_FLUGT",
    belongsTo: "flugtvejsData",
  },
  {
    id: "sikt",
    label: "SIKT",
    description: "Sikkerhedstrapper",
    kontrolplansId: "_KPKR_P_SIKT",
    belongsTo: "flugtvejsData",
  },
  {
    id: "red",
    label: "RED",
    description: "Redningsåbninger",
    kontrolplansId: "_KPKR_P_RED",
    belongsTo: "flugtvejsData",
  },
  {
    id: "ind",
    label: "IND",
    description: "Indsatsforhold generelt",
    kontrolplansId: "_KPKR_P_IND",
    belongsTo: "flugtvejsData",
  },
  {
    id: "adsk",
    label: "ADSK",
    description: "Brand- og røgmæssige adskillelser",
    kontrolplansId: "_KPKR_P_ADSK",
    belongsTo: "Bygningsdele",
  },
  {
    id: "dør",
    label: "DØR",
    description: "Brand- flugtvejsdøre",
    kontrolplansId: "_KPKR_P_DØR",
    belongsTo: "Bygningsdele",
  },
  {
    id: "iof",
    label: "IOF",
    description: "Indvendige overflader",
    kontrolplansId: "_KPKR_P_IOF",
    belongsTo: "Bygningsdele",
  },
  {
    id: "uof",
    label: "UOF",
    description: "Udvendige overflader",
    kontrolplansId: "_KPKR_P_UOF",
    belongsTo: "Bygningsdele",
  },
  {
    id: "iso",
    label: "ISO",
    description: "Isoleringsmaterialer",
    kontrolplansId: "_KPKR_P_ISO",
    belongsTo: "Bygningsdele",
  },
  {
    id: "hs",
    label: "HS",
    description: "Røgalarmanlæg",
    kontrolplansId: "_KPKR_P_HS",
    belongsTo: "Håndslukningsudstyr",
  },
  {
    id: "ru",
    label: "RU",
    description: "Vandfyldte slangevinder",
    kontrolplansId: "_KPKR_P_RU",
    belongsTo: "Håndslukningsudstyr",
  },
  {
    id: "raa",
    label: "RAA",
    description: "Stigrør",
    kontrolplansId: "_KPKR_P_RAA",
    belongsTo: "Håndslukningsudstyr",
  },
  {
    id: "vsv",
    label: "VSV",
    description: "Brandsikring af ventilationsanlæg",
    kontrolplansId: "_KPKR_P_VSV",
    belongsTo: "Håndslukningsudstyr",
  },
  {
    id: "stig",
    label: "STIG",
    description: "ABDL-anlæg",
    kontrolplansId: "_KPKR_P_STIG",
    belongsTo: "Håndslukningsudstyr",
  },
  {
    id: "vent",
    label: "VENT",
    description: "Brandtætning af installationsgennemføringer",
    kontrolplansId: "_KPKR_P_VENT",
    belongsTo: "Håndslukningsudstyr",
  },
  {
    id: "abdl",
    label: "ABDL",
    description: "Rør- og kabelinstallationer",
    kontrolplansId: "_KPKR_P_ABDL",
    belongsTo: "Håndslukningsudstyr",
  },
  {
    id: "btæt",
    label: "BTÆT",
    description: "Brandtætning af installationsgennemføringer",
    kontrolplansId: "_KPKR_P_BTÆT",
    belongsTo: "Håndslukningsudstyr",
  },
  {
    id: "rør",
    label: "RØR",
    description: "Rør- og kabelinstallationer",
    kontrolplansId: "_KPKR_P_RØR",
    belongsTo: "Håndslukningsudstyr",
  },
  {
    id: "sys",
    label: "SYS",
    description: "Systemintegrationstest",
    kontrolplansId: "Udføres af akkrediteret virksomhed",
    belongsTo: "Funktionsafprøvning",
  },
  {
    id: "aba",
    label: "ABA",
    description: "Automatisk brandalarmanlæg (ABA-anlæg)",
    kontrolplansId: "Udføres af akkrediteret virksomhed",
    belongsTo: "Funktionsafprøvning",
  },
  {
    id: "avs",
    label: "AVS",
    description: "Sprinkleranlæg (AVS-anlæg)",
    kontrolplansId: "Udføres af akkrediteret virksomhed",
    belongsTo: "Funktionsafprøvning",
  },
  {
    id: "bme",
    label: "BME",
    description: "Brandmandselevator",
    kontrolplansId: "Udføres af akkrediteret virksomhed",
    belongsTo: "Funktionsafprøvning",
  },
  {
    id: "abv",
    label: "ABV",
    description: "Automatisk brandventilation (ABV-anlæg)",
    kontrolplansId: "Udføres af akkrediteret virksomhed",
    belongsTo: "Funktionsafprøvning",
  },
  {
    id: "f&p",
    label: "F&P",
    description: "Flugtvejs- og panikbelysning",
    kontrolplansId: "Udføres af akkrediteret virksomhed",
    belongsTo: "Funktionsafprøvning",
  },
  {
    id: "va",
    label: "VA",
    description: "Varslingsanlæg",
    kontrolplansId: "Udføres af akkrediteret virksomhed",
    belongsTo: "Funktionsafprøvning",
  },
  {
    id: "ata",
    label: "ATA",
    description: "Automatisk tryksætningsanlæg (ATA-anlæg)",
    kontrolplansId: "Udføres af akkrediteret virksomhed",
    belongsTo: "Funktionsafprøvning",
  },
];

// -----------------------------------------------------DESIGNDATA -----------------------------------------------

// export const allDataStructured = {   // har vist ikke alle designklasser. DBK
// ITT
// BSR
// BPLAN
// PFP
// KOM
// FUNK
// KPLA
// DKV

//   kom: {
//     label: "KOM",
//     description: "Brandteknisk dimensionering",
//     kontrolplansId: "_KPKR_D_DIM",
//     belongsTo: "designData",
//   },
//   funk: {
//     label: "FUNK",
//     description: "Funktionsbeskrivelse",
//     kontrolplansId: "_KPKR_D_FUNK",
//     belongsTo: "designData",
//   },
//   kpla: {
//     label: "KPLA",
//     description: "Brandtekniske kontrolplaner",
//     kontrolplansId: "_KPKR_D_KPLA",
//     belongsTo: "designData",
//   },
//   dkv: {
//     label: "DKV",
//     description: "Drifts-, kontrol-, og vedligeholdelsesplan",
//     kontrolplansId: "_KPKR_D_DKV",
//     belongsTo: "designData",
//   },
//   flugt: {
//     label: "FLUGT",
//     description: "Flugtvejsgange, -arealer og -trapper.",
//     kontrolplansId: "_KPKR_P_FLUGT",
//     belongsTo: "flugtvejsData",
//   },
//   sikt: {
//     label: "SIKT",
//     description: "Sikkerhedstrapper",
//     kontrolplansId: "_KPKR_P_SIKT",
//     belongsTo: "flugtvejsData",
//   },
//   red: {
//     label: "RED",
//     description: "Redningsåbninger",
//     kontrolplansId: "_KPKR_P_RED",
//     belongsTo: "flugtvejsData",
//   },
//   ind: {
//     label: "IND",
//     description: "Indsatsforhold generelt",
//     kontrolplansId: "_KPKR_P_IND",
//     belongsTo: "flugtvejsData",
//   },
//   adsk: {
//     label: "ADSK",
//     description: "Brand- og røgmæssige adskillelser",
//     kontrolplansId: "_KPKR_P_ADSK",
//     belongsTo: "Bygningsdele",
//   },
//   dør: {
//     label: "DØR",
//     description: "Brand- flugtvejsdøre",
//     kontrolplansId: "_KPKR_P_DØR",
//     belongsTo: "Bygningsdele",
//   },
//   iof: {
//     label: "IOF",
//     description: "Indvendige overflader",
//     kontrolplansId: "_KPKR_P_IOF",
//     belongsTo: "Bygningsdele",
//   },
//   uof: {
//     label: "UOF",
//     description: "Udvendige overflader",
//     kontrolplansId: "_KPKR_P_UOF",
//     belongsTo: "Bygningsdele",
//   },
//   iso: {
//     label: "ISO",
//     description: "Isoleringsmaterialer",
//     kontrolplansId: "_KPKR_P_ISO",
//     belongsTo: "Bygningsdele",
//   },
//   hs: {
//     label: "HS",
//     description: "Røgalarmanlæg",
//     kontrolplansId: "_KPKR_P_HS",
//     belongsTo: "Håndslukningsudstyr",
//   },
//   ru: {
//     label: "RU",
//     description: "Vandfyldte slangevinder",
//     kontrolplansId: "_KPKR_P_RU",
//     belongsTo: "Håndslukningsudstyr",
//   },
//   raa: {
//     label: "RAA",
//     description: "Stigrør",
//     kontrolplansId: "_KPKR_P_RAA",
//     belongsTo: "Håndslukningsudstyr",
//   },
//   vsv: {
//     label: "VSV",
//     description: "Brandsikring af ventilationsanlæg",
//     kontrolplansId: "_KPKR_P_VSV",
//     belongsTo: "Håndslukningsudstyr",
//   },
//   stig: {
//     label: "STIG",
//     description: "ABDL-anlæg",
//     kontrolplansId: "_KPKR_P_STIG",
//     belongsTo: "Håndslukningsudstyr",
//   },
//   vent: {
//     label: "VENT",
//     description: "Brandtætning af installationsgennemføringer",
//     kontrolplansId: "_KPKR_P_VENT",
//     belongsTo: "Håndslukningsudstyr",
//   },
//   abdl: {
//     label: "ABDL",
//     description: "Rør- og kabelinstallationer",
//     kontrolplansId: "_KPKR_P_ABDL",
//     belongsTo: "Håndslukningsudstyr",
//   },
//   btæt: {
//     label: "BTÆT",
//     description: "Brandtætning af installationsgennemføringer",
//     kontrolplansId: "_KPKR_P_BTÆT",
//     belongsTo: "Håndslukningsudstyr",
//   },
//   rør: {
//     label: "RØR",
//     description: "Rør- og kabelinstallationer",
//     kontrolplansId: "_KPKR_P_RØR",
//     belongsTo: "Håndslukningsudstyr",
//   },
//   sys: {
//     label: "SYS",
//     description: "Systemintegrationstest",
//     kontrolplansId: "Udføres af akkrediteret virksomhed",
//     belongsTo: "Funktionsafprøvning",
//   },
//   aba: {
//     label: "ABA",
//     description: "Automatisk brandalarmanlæg (ABA-anlæg)",
//     kontrolplansId: "Udføres af akkrediteret virksomhed",
//     belongsTo: "Funktionsafprøvning",
//   },
//   avs: {
//     label: "AVS",
//     description: "Sprinkleranlæg (AVS-anlæg)",
//     kontrolplansId: "Udføres af akkrediteret virksomhed",
//     belongsTo: "Funktionsafprøvning",
//   },
//   bme: {
//     label: "BME",
//     description: "Brandmandselevator",
//     kontrolplansId: "Udføres af akkrediteret virksomhed",
//     belongsTo: "Funktionsafprøvning",
//   },
//   abv: {
//     label: "ABV",
//     description: "Automatisk brandventilation (ABV-anlæg)",
//     kontrolplansId: "Udføres af akkrediteret virksomhed",
//     belongsTo: "Funktionsafprøvning",
//   },
//   "f&p": {
//     label: "F&P",
//     description: "Flugtvejs- og panikbelysning",
//     kontrolplansId: "Udføres af akkrediteret virksomhed",
//     belongsTo: "Funktionsafprøvning",
//   },
//   va: {
//     label: "VA",
//     description: "Varslingsanlæg",
//     kontrolplansId: "Udføres af akkrediteret virksomhed",
//     belongsTo: "Funktionsafprøvning",
//   },
//   ata: {
//     label: "ATA",
//     description: "Automatisk tryksætningsanlæg (ATA-anlæg)",
//     kontrolplansId: "Udføres af akkrediteret virksomhed",
//     belongsTo: "Funktionsafprøvning",
//   },
// };
