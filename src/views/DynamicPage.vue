<template>
  <!-- kan også sige else (hvis ikke "form" fines, at den så loader eller hvad nu) -->
  <div v-if="form">
    <!-- oversigt over valgte skemaer -->

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

    <!-- navneindskrivning -->
    <table class="tables-container">
      <tbody>
        <tr class="blue-header">
          <th colspan="4">
            KONTROLRAPPORT-INPUT: KONTROLOBJEKTER (her skal indskrives, hvilket
            projektmateriale, der danner baggrund for kontrolrapporten):
          </th>
        </tr>
        <tr>
          <th>Dokument id / filnavn:</th>
          <th>Dokument navn / emne:</th>
          <th>Udarbejdet af:</th>
          <th>Dato: (reduntant)</th>
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
        </tr>
      </tbody>

      <!-- kontrollant lille tabel på linje med navneindskrivning -->
      <tbody>
        <tr class="blue-header">
          <th colspan="3">
            KONTROLRAPPORT-INPUT: KONTROLLANTER (information om
            kontrollant(er)):
          </th>
        </tr>
        <tr>
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
        </tr>
      </tbody>
    </table>

    <!-- ----------------------------------------------------------------------------------------------------------------------------- -->

    <table class="tables-container">
      <tbody>
        <!-- KONTROLPLAN First table content -->
        <tr class="blue-header">
          <th colspan="5">Kontrolplan</th>
        </tr>
        <tr>
          <th>Nr.</th>
          <th>Kontrolpunkt</th>
          <th>Godkendelseskriterie</th>
          <th>Grundlag for projektering og kontrol</th>
          <th>Dokumentations-form</th>
        </tr>

        <!-- for loopet skal ændres når jeg laver et table for each checkboxid -->
        <tr v-for="item in designData[0].DBK" :key="item.nr">
          <td>{{ item.nr }}</td>
          <td>{{ item.kontrolpunkt }}</td>
          <td>{{ item.godkendelsesbeskrivelse }}</td>
          <td>{{ item.grundlag }}</td>
          <td>{{ item.dokumentationsform }}</td>
        </tr>
        <!-- <tr>
          <td>BSR 1</td>
          <td>Anvendelseskategori</td>
          <td>
            Er den anviste anvendelseskategori korrekt ift. personers adfærd og
            bygningens anvendelse?
          </td>
          <td>BSR Præ-accepterede løsninger</td>
          <td>OK / ikke OK / IR</td>
        </tr>
        <tr>
          <td>BSR 1</td>
          <td>Anvendelseskategori</td>
          <td>
            Er den anviste anvendelseskategori korrekt ift. personers adfærd og
            bygningens anvendelse?
          </td>
          <td>BSR Præ-accepterede løsninger</td>
          <td>OK / ikke OK / IR</td>
        </tr> -->
      </tbody>

      <tbody>
        <!-- KONTROLRAPPORT Second table content -->
        <tr class="blue-header">
          <th colspan="4">KONTROLRAPPORT</th>
          <th colspan="2">Opfølgning (hvis "ikke OK")</th>
        </tr>
        <tr>
          <th>Resultat</th>
          <th>Dato</th>
          <th>Kontrollant Initialer</th>
          <th>Bemærkninger</th>
          <th>Projekterende (init, dato)</th>
          <th>kontrollant (init, dato)</th>
        </tr>
        <tr v-for="item in designData[0].DBK" :key="item.nr">
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

    <button class="action-button">Indsend</button>
  </div>
</template>

<!-------------------------------- script --------------------------------------->

<script>
// import { allData } from "./HomeView.vue";
import { allData, designData } from "../components/allData.js";
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
    this.fetchData();
  },
};
</script>
