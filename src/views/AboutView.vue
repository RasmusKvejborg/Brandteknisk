<template>
  <div class="about">
    <h1>HEEEEJ</h1>

    <p v-for="user in users" :key="user.firstName">
      user: {{user.firstName}}
    </p>
  </div>
</template>

<script>

import {db} from '../firebase.js';
import {collection, addDoc, getDocs, query } from 'firebase/firestore'



export default {
data(){
  return {
    users: [],
  }
},

methods: {
  async createUser(){
    const colRef = collection(db, 'users')

    const dataObj = {
      firstName: 'John',
      lastName: 'Doe',
    }

    const docRef = await addDoc(colRef, dataObj)

    console.log('doc was created with ID: ', docRef.id)
  },

  async getCountry(){
    const docs = await getDocs(query(collection(db, 'users')))

    // add each doc to array
    docs.forEach((doc) => {
      this.users.push(doc.data())
    })

  }

},

created(){
//  this.createUser()
this.getCountry()


}



}



</script>
