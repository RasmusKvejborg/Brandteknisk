import { doc, updateDoc, setDoc } from "firebase/firestore";
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

export async function addDocumentIdToProject(
  projectId,
  designOrProjekteringKeyString,
  documentId
) {
  const projectRef = doc(db, "projects", projectId);

  try {
    const dataToSet = {
      [designOrProjekteringKeyString]: documentId,
    };

    await setDoc(projectRef, dataToSet, { merge: true });

    console.log(
      `Field ${designOrProjekteringKeyString} set with document ID: ${documentId}`
    );
  } catch (error) {
    console.error("Error adding/updating field in the project:", error);
  }
}
