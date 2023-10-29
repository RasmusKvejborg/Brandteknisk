<template>
  <br />
  <a href="/forklaring" target="_blank">Forklaring / læsevejledning</a>
  <div v-if="!formData">
    <p>Henter data...</p>
  </div>
  <div v-else>
    <input type="checkbox" id="toggleSelect" v-model="showSelect" />
    <label for="toggleSelect">Vis alle felter</label>
    <br />

    <download-button
      class="action-button"
      dom="#resultPrinted"
      name="myFilename.pdf"
    />

    <div id="resultPrinted">
      <table>
        <thead>
          <tr class="browngrey-header">
            <th v-show="showSelect">ID</th>
            <th>Kontrolgenstande</th>
            <th>Kontrolplan ID</th>
            <th>Aktør/firma</th>
            <th>Udgivelsesdato</th>
            <th>Version</th>
            <th>Rev.dato</th>
          </tr>
        </thead>
        <!-- --------------------oversigt over valgte skemaer ------------------------->

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
        <!---------------------- KONTROLOBJEKTER----------------------------------->
        <table class="tables-container">
          <tbody>
            <tr class="browngrey-header">
              <th colspan="4">Kontrolobjekter</th>
              <th class="invisible-column"></th>
              <th colspan="3">Kontrollanter</th>
            </tr>
            <tr>
              <th>Dokument id / filnavn:</th>
              <th>Dokument navn / emne:</th>
              <th>Udarbejdet af:</th>
              <th>Dato:</th>
              <th class="invisible-column"></th>
              <th colspan="3">Kontrollant(er): (Initialer/Navn/Firma)</th>
            </tr>
            <tr>
              <td>
                {{ formData.kontrolobjekter.filnavn1[key] }}
              </td>
              <td>
                {{ formData.kontrolobjekter.emne1[key] }}
              </td>
              <td>
                {{ formData.kontrolobjekter.udarbejdet1[key] }}
              </td>
              <td>
                {{ formData.kontrolobjekter.dato1[key] }}
              </td>
              <td class="invisible-column"></td>
              <td>
                {{ formData.kontrolobjekter.initialer1[key] }}
              </td>
              <td>
                {{ formData.kontrolobjekter.navn1[key] }}
              </td>
              <td>
                {{ formData.kontrolobjekter.firma1[key] }}
              </td>
            </tr>
            <tr>
              <td>
                {{ formData.kontrolobjekter.filnavn2[key] }}
              </td>
              <td>
                {{ formData.kontrolobjekter.emne2[key] }}
              </td>
              <td>
                {{ formData.kontrolobjekter.udarbejdet2[key] }}
              </td>
              <td>
                {{ formData.kontrolobjekter.dato2[key] }}
              </td>
              <td class="invisible-column"></td>
              <td>
                {{ formData.kontrolobjekter.initialer2[key] }}
              </td>
              <td>
                {{ formData.kontrolobjekter.navn2[key] }}
              </td>
              <td>
                {{ formData.kontrolobjekter.firma2[key] }}
              </td>
            </tr>
          </tbody>
        </table>

        <!-- ----------------------------------------------------------------------------------------------------------------------------- -->
        <!-- for hver checkbox der er sat flueben i -->
        <table class="kontrolplan-tables">
          <tbody>
            <!-- KONTROLPLAN First table content (second table er blandet ind, ) -->
            <tr>
              <th class="browngrey-header" colspan="3">
                Kontrolplan, {{ key }}
              </th>
              <th class="browngrey-header" v-show="showSelect"></th>
              <th class="invisible-column"></th>
              <th class="browngrey-header" colspan="6">
                Kontrolrapport, {{ key }}
              </th>
            </tr>
            <tr>
              <th>Nr.</th>
              <th>Kontrolpunkt</th>
              <th>Godkendelseskriterie</th>
              <th v-show="showSelect">Grundlag for projektering og kontrol</th>

              <th class="invisible-column"></th>
              <th>Resultat</th>
            </tr>

            <tr v-for="item in designTexts[key.toUpperCase()]" :key="item.nr">
              <td class="no-wrap">{{ item.nr }}</td>
              <td>{{ item.kontrolpunkt }}</td>
              <td>{{ item.godkendelsesbeskrivelse }}</td>
              <td v-show="showSelect">{{ item.grundlag }}</td>
              <td class="invisible-column"></td>

              <td class="no-wrap">
                {{ this.formData.Kontrolrapport.selectedStatus[item.nr] }}
                <br />
                Dato: {{ this.formData.Kontrolrapport.kontrolDato[item.nr] }}
                <br />
                Kontrollant Initialer:
                {{ this.formData.Kontrolrapport.kontrolInitialer[item.nr] }}
                <br />
                Bemærkninger:
                {{ this.formData.Kontrolrapport.bemerkninger[item.nr] }}

                <br />
                Projekterende (init, dato):
                {{ this.formData.Kontrolrapport.projekterende[item.nr] }}

                <br />
                kontrollant (init, dato):
                {{ this.formData.Kontrolrapport.kontrollant[item.nr] }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <download-button
      class="action-button"
      dom="#resultPrinted"
      name="myFilename.pdf"
    />
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
import DownloadButton from "../components/DownloadButton";

export default {
  name: "SomeComponent",
  components: {
    DownloadButton,
  },
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
      // resultat: {}, // tror nedenstående er kopieret fra Form.. Men bruges statid pga colonnerne er der stadig
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
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    },
  }, // methods end
  // --created--
  created() {
    this.fetchData();
  },
};
</script>
