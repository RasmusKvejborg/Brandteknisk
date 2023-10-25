<template src="../components/ProjectTemplate.html" />
<style scoped>
td {
  white-space: nowrap;
}
</style>

<script>
///////////////////////////////////////////////////////////////////// script ////////////////////////////////////////////////////////////////////////////////
// @ is an alias to /src
import { projectTexts } from "@/components/projectTexts.js";
import {
  updateProjectStatus,
  addDocumentIdToProject,
} from "@/components/utils.js";

import {
  collection,
  addDoc,
  getDoc,
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
      projectTexts: projectTexts,

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
      projectData: null,
    };
  },

  created() {
    // Initialize inputValues with udgivelsesDato when the component is created
    this.changeValues("udgivelsesDato", "udgivelsesDatoValues");
    this.changeValues("revDato", "revDatoValues");

    // fetcher lige projectData hver gang man åbner siden, bare for at tjekke, om man har lavet forms(f.eks) design tidligere...
    this.fetchProjectData();
  },

  // computed: {},

  methods: {
    changeValues(fieldName, targetDataName) {
      for (const item of this.projectTexts) {
        this[targetDataName][item.id] = this[fieldName];
      }
    },

    filteredData(belongsTo) {
      // filtrerer lige projectTexts, så det kun er designTexts, der vises i designtabellen osv.
      return this.projectTexts.filter((item) => item.belongsTo === belongsTo);
    },

    // firestore

    //------------------------------------------------------ save designTexts --------------------------------------------------------------------
    async designSaveForm() {
      // Check if at least one checkbox is checked
      const atLeastOneCheckboxChecked = Object.values(this.checkboxValues).some(
        (value) => value
      );

      if (!atLeastOneCheckboxChecked) {
        // Display an error message or handle the error as needed
        alert(
          "Vælg mindst ét kontrolpunkt i checkboksene ude til højre, under 'Design'"
        );
        return;
      }

      // burde også have et tjek om den findes i forvejen..?
      if (this.projectData.designDocId) {
        alert(
          "Design er allerede oprettet, gå til hovedsiden for at se den. (Eller skal det være muligt at overskrive?)"
        );
        return;
      }

      const colRef = collection(db, "documents");

      const dataObj = {
        checkBoxValues: [], // laver dette til et array for at få en fast rækkefølge
        versionValues: {},
        udgivelsesDatoValues: {},
        revDatoValues: {},
        aktorDesignValues: {},
        belongsToProjectId: this.parameter,
      };

      // Loop through the keys in checkboxValues and add checked keys to the array
      Object.keys(this.checkboxValues).forEach((key) => {
        if (this.checkboxValues[key]) {
          // Push the checked key into the checkBoxValues array
          dataObj.checkBoxValues.push(key);

          // Add other data fields to other arrays similarly
          dataObj.versionValues[key] = this.versionValues[key] || "";
          dataObj.udgivelsesDatoValues[key] =
            this.udgivelsesDatoValues[key] || "";
          dataObj.revDatoValues[key] = this.revDatoValues[key] || "";
          dataObj.aktorDesignValues[key] = this.aktorDesignValues[key] || "";
        }
      });

      const docRef = await addDoc(colRef, dataObj);

      // console.log("doc was created with ID: ", docRef.id); // DET HER SKAL JEG BRUGE
      this.linkCreated = `/form/${docRef.id}`;

      window.open(this.linkCreated, "_blank");

      this.updateStatusIgang("designStatus");
      this.addDesignIdToProject(this.parameter, docRef.id);
    },
    //----------------------- save designform end ---------------------------------------------------------------------------------

    // -------- functioner der sendes videre over til utils -------------
    async addDesignIdToProject(projectId, documentId) {
      addDocumentIdToProject(projectId, "designDocId", documentId);
    },

    async updateStatusIgang(statusToUpdate) {
      updateProjectStatus(this.parameter, statusToUpdate, "Igangværende");
    },

    //----------------------------------------------------------

    async fetchProjectData() {
      const docRef = doc(db, "projects", this.parameter);

      try {
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
          // If the document exists, set the  data
          this.projectData = docSnapshot.data();
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    },
  },
};
</script>
