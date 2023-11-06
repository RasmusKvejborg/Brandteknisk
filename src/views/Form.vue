<template>
  <br />
  <a href="/forklaring">Forklaring / læsevejledning</a>
  <div v-if="!formData">
    <p>Henter data...</p>
  </div>
  <div v-else>
    <!-- --------------------oversigt over valgte skemaer ------------------------->
    <input type="checkbox" id="toggleSelect" v-model="showSelect" />
    <label for="toggleSelect">Vis alle felter</label>

    <table>
      <thead>
        <tr class="blue-header">
          <th v-show="showSelect">ID</th>
          <th>Kontrolgenstande</th>
          <th>Kontrolplan ID</th>
          <th>Aktør/firma</th>
          <th>Udgivelsesdato</th>
          <th>Version</th>
          <th>Rev.dato</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="key in this.formData.checkBoxValues" :key="key">
          <td v-show="showSelect">{{ key }}</td>
          <td>
            {{ projectTexts.find((data) => data.id === key).description }}
          </td>
          <td>
            {{ projectTexts.find((data) => data.id === key).kontrolplansId }}
          </td>
          <td>{{ formData.aktorDesignValues[key] || "" }}</td>
          <td>{{ formData.udgivelsesDatoValues[key] || "" }}</td>
          <td>{{ formData.versionValues[key] || "" }}</td>
          <td>{{ formData.revDatoValues[key] || "" }}</td>
        </tr>
      </tbody>
    </table>
    <!-- --------------------oversigt slut ------------------------->

    <div v-for="key in this.formData.checkBoxValues" :key="key">
      <!-- ----------------------------------------------------------------------------------------------------------------------------- -->
      <!-- for hver checkbox der er sat flueben i -->
      <table class="kontrolplan-tables">
        <tbody>
          <!-- KONTROLPLAN First table content (second table er blandet ind, ) -->
          <tr>
            <th class="blue-header" colspan="3">Kontrolplan, {{ key }}</th>
            <th class="blue-header" v-show="showSelect"></th>
            <th class="invisible-column"></th>
            <th class="blue-header" colspan="6">Kontrolrapport, {{ key }}</th>
          </tr>
          <tr>
            <th>Nr.</th>
            <th>Kontrolpunkt</th>
            <th>Godkendelseskriterie</th>
            <th v-show="showSelect">Grundlag for projektering og kontrol</th>

            <th class="invisible-column"></th>
            <th>Resultat</th>
            <!-- <th class="width1">Kontrollant Initialer</th> -->
            <th class="min-width250">Bemærkninger</th>
            <!-- <th>Projekterende (init, dato)</th>
            <th>kontrollant (init, dato)</th> -->
          </tr>

          <tr v-for="item in designTexts[key.toUpperCase()]" :key="item.nr">
            <td class="item-nr">{{ item.nr }}</td>
            <td class="min-width180">{{ item.kontrolpunkt }}</td>
            <td class="min-width250">{{ item.godkendelsesbeskrivelse }}</td>
            <td v-show="showSelect">{{ item.grundlag }}</td>
            <td class="invisible-column"></td>

            <td v-if="item.dokumentationsform === 'OK / ikke OK'">
              <label>
                <input
                  type="radio"
                  :name="'status' + item.nr"
                  value="OK"
                  v-model="selectedStatus[item.nr]"
                />OK</label
              >
              <br />
              <label class="no-wrap">
                <input
                  type="radio"
                  :name="'status' + item.nr"
                  value="Ikke OK"
                  v-model="selectedStatus[item.nr]"
                />Ikke OK</label
              >
            </td>

            <td v-else>
              <label>
                <input
                  type="radio"
                  :name="'status' + item.nr"
                  value="OK"
                  v-model="selectedStatus[item.nr]"
                />OK</label
              >
              <br />
              <label class="no-wrap">
                <input
                  type="radio"
                  :name="'status' + item.nr"
                  value="Ikke OK"
                  v-model="selectedStatus[item.nr]"
                />Ikke OK</label
              >
              <br />
              <label>
                <input
                  type="radio"
                  :name="'status' + item.nr"
                  value="IR"
                  v-model="selectedStatus[item.nr]"
                />IR</label
              >
            </td>

            <td>
              <div class="margin-bemerkninger">
                <div class="sameline-ptag">
                  <p
                    v-if="
                      formData &&
                      formData.Kontrolrapport &&
                      formData.Kontrolrapport.kontrolDato &&
                      formData.Kontrolrapport.kontrolDato[item.nr] &&
                      formData.Kontrolrapport.kontrolInitialer[item.nr]
                    "
                  >
                    {{
                      `${formData.Kontrolrapport.kontrolDato[item.nr]}&nbsp${
                        formData.Kontrolrapport.kontrolInitialer[item.nr]
                      }:&nbsp`
                    }}
                  </p>

                  <p
                    v-if="
                      formData &&
                      formData.Kontrolrapport &&
                      formData.Kontrolrapport.bemerkninger &&
                      formData.Kontrolrapport.bemerkninger[item.nr]
                    "
                  >
                    {{ formData.Kontrolrapport.bemerkninger[item.nr] }}
                  </p>
                </div>
                <div class="horizontal-line">
                  <input
                    placeholder="initial"
                    v-model="kontrolInitialer[item.nr]"
                    class="min-width40"
                  />
                  <input
                    v-model="kontrolDato[item.nr]"
                    class="min-width40"
                    placeholder="dato"
                  />
                </div>

                <textarea
                  class="full-width-input"
                  v-model="bemerkninger[item.nr]"
                ></textarea>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <button @click="designSaveResult" class="action-button">Indsend</button>
    <div v-if="showNotification" class="notification">Data indsendt!</div>
  </div>
</template>

<!-------------------------------- script --------------------------------------->

<script>
import { projectTexts } from "../components/projectTexts.js";
import { designTexts } from "../components/designTexts.js";
import { db } from "../firebase.js";
import { updateProjectStatus } from "@/components/utils.js";
import {
  collection,
  addDoc,
  getDocs,
  querym,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";

export default {
  props: {
    parameter: String, // Define a prop to receive the route parameter
  },

  // --data--
  data() {
    return {
      formData: null,
      projectTexts: projectTexts,
      designTexts: designTexts,
      showSelect: false,
      showNotification: false,
      // inputData
      // kontrolobjekter
      filnavn1: {},
      filnavn2: {},
      emne1: {},
      emne2: {},
      udarbejdet1: {},
      udarbejdet2: {},
      dato1: {},
      dato2: {},
      initialer1: {},
      initialer2: {},
      navn1: {},
      navn2: {},
      firma1: {},
      firma2: {},
      //kontrolrapport
      // resultat: {},
      kontrolDato: {},
      kontrolInitialer: {},
      bemerkninger: {},
      projekterende: {},
      kontrollant: {},
      selectedStatus: {},
    };
  },

  // --methods--
  methods: {
    bindingInitialer(fieldName, targetDataName, key) {
      for (const item of this.designTexts[key.toUpperCase()]) {
        this[targetDataName][item.nr] = this[fieldName][key];
      }
    },

    toggleShowSelect() {
      this.showSelect = !this.showSelect;
    },

    async updateStatusUdfyldt(statusToUpdate) {
      updateProjectStatus(
        this.formData.belongsToProjectId,
        statusToUpdate,
        "Udfyldt"
      );
    },

    async fetchData() {
      const docRef = doc(db, "documents", this.parameter);

      try {
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
          // If the document exists, set the user data
          this.formData = docSnapshot.data();
          console.log(this.formData.Kontrolrapport.bemerkninger);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    },
    // --------------------------------------designSaveResult-----------------------------------------
    async designSaveResult() {
      const docToUpdate = doc(db, "documents", this.parameter);

      // Define the field you want to update
      const fieldToUpdate = {
        kontrolobjekter: {
          filnavn1: this.filnavn1 || "",
          filnavn2: this.filnavn2 || "",
          emne1: this.emne1 || "",
          emne2: this.emne2 || "",
          udarbejdet1: this.udarbejdet1 || "",
          udarbejdet2: this.udarbejdet2 || "",
          dato1: this.dato1 || "",
          dato2: this.dato2 || "",
          initialer1: this.initialer1 || "",
          initialer2: this.initialer2 || "",
          navn1: this.navn1 || "",
          navn2: this.navn2 || "",
          firma1: this.firma1 || "",
          firma2: this.firma2 || "",
        },
        Kontrolrapport: {
          kontrolDato: this.kontrolDato || "",
          kontrolInitialer: this.kontrolInitialer || "",
          bemerkninger: this.bemerkninger || "",
          projekterende: this.projekterende || "",
          kontrollant: this.kontrollant || "",
          selectedStatus: this.selectedStatus || "",
        },
      };

      // Use setDoc with merge: true to update the specific field
      await setDoc(docToUpdate, fieldToUpdate, { merge: true });

      this.updateStatusUdfyldt("designStatus"); //opdaterer til "udfyldt"

      this.showNotification = true; // Show a notification

      setTimeout(() => {
        this.showNotification = false; // Hide the notification after a delay
      }, 2000);

      // this.addDesignIdToProject(this.parameter, docRef.id); Denne her vil opdatere, medmindre jeg bruger setDoc og beder den bruge den samme id...
    },
    //----------------------- designSaveResult end --------------------------------------------
  }, // methods end
  // --created--
  created() {
    this.fetchData();
  },
};
</script>
