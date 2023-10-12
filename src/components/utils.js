import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase.js";

export async function updateProjectStatus(projectId, statusToUpdate, status) {
  if (
    statusToUpdate != "designStatus" &&
    "projekteringStatus" &&
    "udførselStatus"
  ) {
    console.log("statusToUpdate is wrong");
    return;
  } else {
    const projectRef = doc(db, "projects", projectId);

    try {
      // Update the status
      await updateDoc(projectRef, {
        [statusToUpdate]: status,
      });
      console.log("Project status updated successfully.");
    } catch (error) {
      console.error("Error updating project status:", error);
    }
  }
}

// async updateStatusIgang(statusToUpdate) {
//     if (
//       (statusToUpdate != "designStatus",
//       "projekteringStatus",
//       "udførselStatus")
//     ) {
//       console.log("statusToUpdate is wrong");
//       return;
//     } else {
//       updateProjectStatus(this.parameter, statusToUpdate, "igangværende");
//     }
