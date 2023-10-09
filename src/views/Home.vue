<template>
  <div>
    <button @click="saveProject" class="action-button">
      + Lav nyt projekt
    </button>

    <h3>igangværende projekter:</h3>

    <div v-for="(project, index) in projects" :key="index">
      <hr />
      <h4>{{ project.projectName }}</h4>

      Design status: {{ project.designStatus }}
      <span v-if="project.designStatus === 'Ikke lavet'" class="dot red"></span>
      <span
        v-else-if="project.designStatus === 'igangværende'"
        class="dot yellow"
      ></span>
      <span v-else class="dot green"></span>
      <br />

      Projektering status: {{ project.projekteringsStatus }}
      <span
        v-if="project.projekteringsStatus === 'Ikke lavet'"
        class="dot red"
      ></span>
      <span
        v-else-if="project.projekteringsStatus === 'igangværende'"
        class="dot yellow"
      ></span>
      <span v-else class="dot green"></span>
      <br />

      Udførsel status: {{ project.udforselsStatus }}
      <span
        v-if="project.udforselsStatus === 'Ikke lavet'"
        class="dot red"
      ></span>
      <span
        v-else-if="project.udforselsStatus === 'igangværende'"
        class="dot yellow"
      ></span>
      <span v-else class="dot green"></span>
      <hr />
    </div>
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
  data() {
    return {
      projects: null,
    };
  },

  methods: {
    async saveProject() {
      const colRef = collection(db, "projects");

      const dataObj = {
        accountId: null,
        projectName: "Projektnavn",
        designStatus: "Ikke lavet",
        projekteringsStatus: "Ikke lavet",
        udforselsStatus: "Ikke lavet",
      };

      const docRef = await addDoc(colRef, dataObj);

      console.log("project was created with ID: ", docRef.id); // DET HER SKAL JEG BRUGE
      this.linkCreated = `http://localhost:8080/project/${docRef.id}`;
      window.open(this.linkCreated, "_blank");
    },

    async fetchData() {
      const collectionRef = collection(db, "projects");

      try {
        const querySnapshot = await getDocs(collectionRef);

        const projectList = [];

        querySnapshot.forEach((docSnapshot) => {
          if (docSnapshot.exists()) {
            const data = docSnapshot.data();
            const project = {
              projectName: data.projectName,
              designStatus: data.designStatus,
              projekteringsStatus: data.projekteringsStatus,
              udforselsStatus: data.udforselsStatus,
            };
            projectList.push(project);
          }
        });

        this.projects = projectList; // Update the projects data property
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    },
  }, // -----end of methods-----

  created() {
    this.fetchData();
  },
};
</script>

<style>
button {
  margin-top: 50px;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: inline-block;
  margin-right: 5px;
}

.red {
  background-color: red;
}

.yellow {
  background-color: rgb(253, 228, 126);
}

.green {
  background-color: green;
}
</style>
