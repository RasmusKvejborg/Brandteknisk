<template src="../components/ProjectTemplate.html" />
<style scoped>
td {
  white-space: nowrap;
}
</style>

<script>
// @ is an alias to /src
import { allData } from "@/components/allData.js";
import {
  updateProjectStatus,
  addDocumentIdToProject,
} from "@/components/utils.js";

import {
  collection,
  addDoc,
  getDocs,
  query,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase.js";

export default {
  props: {
    parameter: String,
  },

  data() {
    return {
      allData: allData,

      aktørData: ["", "aktør1", "aktør2", "aktør3", "aktør4"],
      versionData: ["", "Version 1", "Version 2", "Version 3", "Version 4"],

      selectedVersion: "",
      checkboxValues: {},
      versionValues: {},
      aktorDesignValues: {},
      aktorUdforselValues: {},

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
      selectedAktorDesignValue: null,
      selectedAktorUdforselValue: null,
      selectedKontrolType1: null,
      selectedKontrolType2: null,
      selectedKontrolNiveau1: null,
      selectedKontrolNiveau2: null,
      selectedStikprove: null,
      linkCreated: null,
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
      // filtrerer lige allData, så det kun er designData, der vises i designtabellen osv.
      return this.allData.filter((item) => item.belongsTo === belongsTo);
    },

    // firestore
    async designSaveData() {
      // burde måske omdøbes til designSaveData()...
      const colRef = collection(db, "documents");

      const dataObj = {
        checkBoxValues: this.checkboxValues,
        versionValues: this.versionValues,
        udgivelsesDatoValues: this.udgivelsesDatoValues,
        revDatoValues: this.revDatoValues,
        aktorDesignValues: this.aktorDesignValues, // design values. Skal bruge udforsel til de andre.
        belongsToProjectId: this.parameter,
      };

      const docRef = await addDoc(colRef, dataObj);

      // console.log("doc was created with ID: ", docRef.id); // DET HER SKAL JEG BRUGE
      this.linkCreated = `http://localhost:8080/form/${docRef.id}`;
      window.open(this.linkCreated, "_blank");

      this.updateStatusIgang("designStatus");
      this.addDesignIdToProject(this.parameter, docRef.id);
    },

    // -------- functioner der sendes videre over til utils -------------
    async addDesignIdToProject(projectId, documentId) {
      addDocumentIdToProject(projectId, "designDocId", documentId);
    },

    async updateStatusIgang(statusToUpdate) {
      updateProjectStatus(this.parameter, statusToUpdate, "Igangværende");
    },
  },
};
</script>
