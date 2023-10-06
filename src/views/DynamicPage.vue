<template>
  <div>
    <p>Welcome to "{{ parameter }}"</p>
    <p v-if="user">User.firstName: {{ user.firstName }}</p>

    <table>
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
        <tr v-for="(value, key) in user.firstName" :key="key">
          <td>{{ key }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
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
      user: null,
    };
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
          this.user = docSnapshot.data();
          console.log(this.user);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    },
  },
  // --created--
  created() {
    //  this.createUser()
    this.fetchData();
  },
};
</script>
