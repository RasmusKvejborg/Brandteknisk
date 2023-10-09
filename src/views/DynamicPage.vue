<template>
  <!-- kan også sige else (hvis ikke "form" fines, at den så loader eller hvad nu) -->

  <div v-if="form">
    <!-- --------------------oversigt over valgte skemaer ------------------------->
    <table>
      <thead>
        <tr class="blue-header">
          <th>ID</th>
          <th>Kontrolgenstande</th>
          <th>Kontrolplan ID</th>
          <th>Aktør/firma</th>
          <th>Udgivelsesdato</th>
          <th>Version</th>
          <th>Rev.dato</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, key) in filteredFormData" :key="key">
          <td>{{ key }}</td>
          <td>{{ allData.find((data) => data.id === key).description }}</td>
          <td>{{ allData.find((data) => data.id === key).kontrolplansId }}</td>
          <td>{{ item.aktorDesignValue }}</td>
          <td>{{ item.udgivelsesDatoValue }}</td>
          <td>{{ item.versionValue }}</td>
          <td>{{ item.revDatoValue }}</td>
        </tr>
      </tbody>
    </table>
    <!-- --------------------oversigt slut ------------------------->

    <!---------------------- KONTROLOBJEKTER----------------------------------->
    <table class="tables-container">
      <tbody>
        <tr class="blue-header">
          <th colspan="4">
            KONTROLRAPPORT-INPUT: KONTROLOBJEKTER (her skal indskrives, hvilket
            projektmateriale, der danner baggrund for kontrolrapporten):
          </th>
          <th class="invisible-column"></th>
          <th colspan="3">
            KONTROLRAPPORT-INPUT: KONTROLLANTER (information om
            kontrollant(er)):
          </th>
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
            <input class="full-width-input" />
          </td>
          <td>
            <input class="full-width-input" />
          </td>
          <td>
            <input class="full-width-input" />
          </td>
          <td>
            <input class="full-width-input" />
          </td>
          <td class="invisible-column"></td>
          <td>
            <input class="full-width-input" />
          </td>
          <td>
            <input class="full-width-input" />
          </td>
          <td>
            <input class="full-width-input" />
          </td>
        </tr>
        <tr>
          <td>
            <input class="full-width-input" />
          </td>
          <td>
            <input class="full-width-input" />
          </td>
          <td>
            <input class="full-width-input" />
          </td>
          <td>
            <input class="full-width-input" />
          </td>
          <td class="invisible-column"></td>
          <td>
            <input class="full-width-input" />
          </td>
          <td>
            <input class="full-width-input" />
          </td>
          <td>
            <input class="full-width-input" />
          </td>
        </tr>
      </tbody>
    </table>

    <!-- ----------------------------------------------------------------------------------------------------------------------------- -->
    <!-- for hver checkbox der er sat flueben i -->
    <div v-for="(data, key) in filteredFormData" :key="key">
      <table class="kontrolplan-tables">
        <tbody>
          <!-- KONTROLPLAN First table content (second table er blandet ind, ) -->
          <tr>
            <th class="blue-header" colspan="5">Kontrolplan, {{ key }}</th>
            <th class="invisible-column"></th>
            <th class="blue-header" colspan="6">Kontrolrapport, {{ key }}</th>
          </tr>
          <tr>
            <th>Nr.</th>
            <th>Kontrolpunkt</th>
            <th>Godkendelseskriterie</th>
            <th>Grundlag for projektering og kontrol</th>
            <th>Dokumentations-form</th>

            <th class="invisible-column"></th>
            <th>Resultat</th>
            <th>Dato</th>
            <th>Kontrollant Initialer</th>
            <th>Bemærkninger</th>
            <th>Projekterende (init, dato)</th>
            <th>kontrollant (init, dato)</th>
          </tr>

          <tr v-for="item in designData[key.toUpperCase()]" :key="item.nr">
            <td class="no-wrap">{{ item.nr }}</td>
            <td class="no-wrap">{{ item.kontrolpunkt }}</td>
            <td>{{ item.godkendelsesbeskrivelse }}</td>
            <td>{{ item.grundlag }}</td>
            <td>{{ item.dokumentationsform }}</td>
            <td class="invisible-column"></td>
            <td>
              <input class="full-width-input" />
            </td>
            <td>
              <input class="full-width-input" />
            </td>
            <td>
              <input class="full-width-input" />
            </td>
            <td>
              <input class="full-width-input" />
            </td>
            <td>
              <input class="full-width-input" />
            </td>
            <td>
              <input class="full-width-input" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <button class="action-button">Indsend</button>
  </div>
</template>

<!-------------------------------- script --------------------------------------->

<script>
// import { allData } from "./HomeView.vue";
import { allData } from "../components/allData.js";
import { designData } from "../components/designData.js";
import { db } from "../firebase.js";
import {
  collection,
  addDoc,
  getDocs,
  querym,
  doc,
  getDoc,
} from "firebase/firestore";

export default {
  props: {
    parameter: String, // Define a prop to receive the route parameter
  },

  // --data--
  data() {
    return {
      form: null,
      allData: allData,
      designData: designData,
    };
  },

  computed: {
    filteredFormData() {
      // sorterer alle fra, som ikke har checkbox == true. Kan senere sortere, så det kun er design der tælles med her.
      const filteredData = {};
      Object.keys(this.form.checkBoxValues).forEach((key) => {
        if (this.form.checkBoxValues[key]) {
          filteredData[key] = {
            checkBoxValue: this.form.checkBoxValues[key],
            versionValue: this.form.versionValues[key],
            udgivelsesDatoValue: this.form.udgivelsesDatoValues[key],
            revDatoValue: this.form.revDatoValues[key],
            aktorDesignValue: this.form.aktorDesignValues[key],
          };
        }
      });
      return filteredData;
    },
  },

  // --methods--
  methods: {
    // async createUser() {
    //   const colRef = collection(db, "users");

    //   const dataObj = {
    //     firstName: "John",
    //     lastName: "Doe",
    //   };

    //   const docRef = await addDoc(colRef, dataObj);

    //   console.log("doc was created with ID: ", docRef.id);
    // },

    async fetchData() {
      const docRef = doc(db, "documents", this.parameter);

      try {
        const docSnapshot = await getDoc(docRef);
        console.log(docSnapshot.exists());

        if (docSnapshot.exists()) {
          // If the document exists, set the user data
          this.form = docSnapshot.data();
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    },
  },
  // --created--
  created() {
    console.log(designData.DBK);
    this.fetchData();
  },
};
</script>
