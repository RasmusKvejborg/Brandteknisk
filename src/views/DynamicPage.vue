<template>
  <div>
    <table v-if="form">
      <thead>
        <tr>
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

    <table>
      <thead>
        <tr>
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
      </thead>
      <tbody>
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
  </div>
</template>

<script>
// import { allData } from "./HomeView.vue";
import { allData } from "../components/allData.js";
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
