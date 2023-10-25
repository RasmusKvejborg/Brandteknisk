<template>
  <div>
    <button
      @click="startAddingProject"
      class="action-button"
      v-if="!isAddingProject"
    >
      + Lav nyt projekt
    </button>

    <div v-if="isAddingProject">
      <input
        v-model="newProjectName"
        placeholder="Projektnavn"
        class="project-input"
      />
      <button @click="saveProject" class="action-button">Gem projekt</button>
    </div>

    <h3>Igangværende projekter:</h3>

    <div
      v-for="(project, index) in projects"
      :key="index"
      class="project-container"
    >
      <!-- <h4 class="project-title">{{ project.projectName }}</h4> -->
      <!-- <a class="project-title" :href="google.com">{{ project.projectName }}</a> -->
      <a
        class="project-title"
        :href="`/project/${project.id}`"
        target="_blank"
        >{{ project.projectName }}</a
      >

      <div class="project-details">
        <div class="status-group">
          <a
            class="status-label"
            v-if="project.designDocId"
            :href="`/form/${project.designDocId}`"
            target="_blank"
            >Design</a
          >
          <div v-else class="status-label">Design</div>
          <span :class="returnColoredDots(project.designStatus)"></span>
          <div class="status-value">{{ project.designStatus }}</div>
        </div>

        <div class="status-group">
          <div class="status-label">Projektering</div>
          <span :class="returnColoredDots(project.projekteringsStatus)"></span>
          <div class="status-value">{{ project.projekteringsStatus }}</div>
        </div>

        <div class="status-group">
          <div class="status-label">Udførsel</div>
          <span :class="returnColoredDots(project.udforselsStatus)"></span>
          <div class="status-value">{{ project.udforselsStatus }}</div>
        </div>
      </div>

      <!-- <a
        v-if="project.designDocId"
        :href="`/form/${project.designDocId}`"
        >Design Doc</a
      > -->

      <a
        v-if="project.designStatus == 'Udfyldt'"
        :href="`/result/${project.designDocId}`"
        >Vis resultat</a
      >
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
      isAddingProject: false, // Flag to show/hide the input field
      newProjectName: "",
      // project findes, men bliver ikk initiliseret før fetch
    };
  },

  methods: {
    returnColoredDots(status) {
      if (status === "Ikke lavet") {
        return "dot red";
      } else if (status === "Igangværende") {
        return "dot yellow";
      } else {
        return "dot green";
      }
    },

    startAddingProject() {
      // bare til at vise navneinput
      this.isAddingProject = true;
    },

    async saveProject() {
      const colRef = collection(db, "projects");

      const dataObj = {
        accountId: null,
        projectName: this.newProjectName,
        designStatus: "Ikke lavet",
        projekteringsStatus: "Ikke lavet",
        udforselsStatus: "Ikke lavet",
        date: new Date(),
      };

      const docRef = await addDoc(colRef, dataObj);

      console.log("project was created with ID: ", docRef.id); // DET HER SKAL JEG BRUGE
      this.linkCreated = `/project/${docRef.id}`;
      window.open(this.linkCreated, "_blank");

      this.fetchData();
      // Reset the input field and hide it
      this.cancelAddingProject();
    },

    cancelAddingProject() {
      this.newProjectName = ""; // Reset the input field
      this.isAddingProject = false; // Hide the input field
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
              id: docSnapshot.id, // Include the document ID
              projectName: data.projectName,
              designStatus: data.designStatus,
              projekteringsStatus: data.projekteringsStatus,
              udforselsStatus: data.udforselsStatus,
              date: data.date,
              designDocId: data.designDocId ? data.designDocId : null,
            };
            projectList.push(project);
          }
        });

        projectList.sort((a, b) => b.date - a.date); // Reverse the order

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
  margin-top: 40px;
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
  background-color: rgb(255, 192, 34);
}

.green {
  background-color: green;
}

.status-group {
  display: flex;
  align-items: center;
}

.status-label {
  min-width: 160px;
  font-weight: bold;
}

.status-value {
  margin-right: 10px;
}

.project-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  background-color: #fff;
  border-radius: 10px;
  margin: 10px 0;
  padding: 10px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
}

.project-input {
  flex: 1; /* Take up the available space */
  padding: 10px;
  border: 1px solid var(--headlinebackground);
  border-radius: 5px;
  background-color: #fff;
  color: #333;
  margin-right: 10px; /* Add some spacing between the input and button */
}

.project-title {
  flex: 1;
  text-align: left;
  padding: 10px;
}
.project-details {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}
</style>
