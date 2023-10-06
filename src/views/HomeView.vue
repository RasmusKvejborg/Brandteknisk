<template src="../components/HomeTemplate.html" />

<script>
// @ is an alias to /src

import { collection, addDoc, getDocs, query } from "firebase/firestore";
import { db } from "../firebase.js";

export default {
  data() {
    return {
      allData: [
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
      ],

      aktørData: ["", "aktør1", "aktør2", "aktør3", "aktør4"],
      versionData: ["", "Version 1", "Version 2", "Version 3", "Version 4"],

      selectedVersion: "",
      versionValues: {},
      checkboxValues: {},

      kontrolTypeData: [
        "",
        "Egenkontrol",
        "Uafhængig kontrol",
        "Tredjepartskontrol",
      ],
      kontrolTypeValues1: {},
      kontrolTypeValues2: {},

      kontrolniveauData: [
        "",
        "Minimumskontrol",
        "Udvidet kontrol",
        "Maksimumskontrol",
        "Stikprøvekontrol",
      ],
      kontrolniveauValues1: {},
      kontrolniveauValues2: {},

      stikproveData: [
        "",
        "15% af kontrolobjekterne, dog min. 5 kontrolobjekter pr. afsnit",
        "25% af kontrolobjekterne, dog min. 5 kontrolobjekter pr. afsnit",
        "35% af kontrolobjekterne, dog min. 5 kontrolobjekter pr. afsnit",
        "Iht. risikoklasse for afsnit, dog min. 5 kontrolobjekter pr. afsnit",
      ],
      stikproveValues: {},

      showSelect: true,
      udgivelsesDato: new Date().toISOString().slice(0, 10),
      udgivelsesDatoValues: {},
      revDato: new Date().toISOString().slice(0, 10),
      revDatoValues: {},
      versionDataValues: {},
      selectedKontrolType1: null,
      selectedKontrolType2: null,
      selectedKontrolNiveau1: null,
      selectedKontrolNiveau2: null,
      selectedStikprove: null,
      linkCreated: "hej",
      // firstItemState: false,
    };
  },

  created() {
    // Initialize inputValues with udgivelsesDato when the component is created
    this.changeValues("udgivelsesDato", "udgivelsesDatoValues");
    this.changeValues("revDato", "revDatoValues");
  },

  // computed: {},

  methods: {
    changeValues(fieldName, targetDataName) {
      for (const item of this.allData) {
        this[targetDataName][item.id] = this[fieldName];
      }
    },

    filteredData(belongsTo) {
      return this.allData.filter((item) => item.belongsTo === belongsTo);
    },

    // firestore
    async saveData() {
      const colRef = collection(db, "documents");

      const dataObj = {
        firstName: this.checkboxValues,
        lastName: "TEST",
        // ischecked: this.firstItemState
      };

      const docRef = await addDoc(colRef, dataObj);

      console.log("doc was created with ID: ", docRef.id); // DET HER SKAL JEG BRUGE
      this.linkCreated = `http://localhost:8080/form/${docRef.id}`;
      window.open(this.linkCreated, "_blank");
    },
  },
};
</script>
