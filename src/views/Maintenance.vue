<template>
  <div>
    <div>
      <div>
        <div>
          <button @click="updateCreatureIndexes" disabled>
            Update Creatures Indexes
          </button>
        </div>
        <div>
          <button @click="fixCreatureUserData" disabled>
            Fix Creature user Data
          </button>
        </div>
      </div>
      <!-- <div>
        <div><button disabled>Convert to new Tags</button></div>
      </div>
      <div>
        <div><button disabled>Update abilities</button></div>
      </div>
      <div>
        <div><button disabled>Update references</button></div>
      </div> -->
    </div>
  </div>
</template>

<script lang="ts">
import { firebaseClient } from "@/api/firebaseClient";
import { FirestoreAcces } from "@/api/firestoreAccess";
import { userStore } from "@/store";
import { Creature } from "@/types";
import {
  addDoc,
  collection,
  deleteField,
  doc,
  getDocs,
  query,
  where,
  writeBatch,
} from "@firebase/firestore";
import { uniqBy } from "lodash";
import Vue from "vue";
export default Vue.extend({
  methods: {
    async updateCreatureIndexes() {
      // const creatures = (await getCreatures()) as Creature[];
      // console.log(creatures);
      // const indexes = creatures.map((c) => getCreatureIndex(c));
      // console.log(indexes);
      // await setCreatureIndexes(indexes);
    },
    async fixCreatureUserData() {
      // const firestore = new FirestoreAcces<Creature>(
      //   firebaseClient.store,
      //   "creatures"
      // );
      // const creatures = firestore.ref();
      // const commented = await getDocs(
      //   query(creatures, where("comments", "!=", false))
      // );
      // const faved = await getDocs(
      //   query(creatures, where("favorite", "!=", false))
      // );
      // const filtered = uniqBy(commented.docs.concat(faved.docs), (c) => c.id);
      // if (userStore.state.currentUser) {
      //   const userId = userStore.state.currentUser?.uid;
      //   const db = firebaseClient.store;
      //   const batch = writeBatch(db);
      //   for (let index = 0; index < filtered.length; index++) {
      //     const creature = filtered[index].data();
      //     const { comments, favorite } = creature;
      //     const { id } = filtered[index];
      //     const userDataCollection = collection(
      //       db,
      //       "creatures",
      //       id,
      //       "userData"
      //     );
      //     await addDoc(userDataCollection, {
      //       comments,
      //       favorite,
      //       userId,
      //     });
      //     const creatureRef = doc(db, "creatures", id);
      //     batch.update(creatureRef, {
      //       ...creature,
      //       comments: deleteField(),
      //       favorite: deleteField(),
      //     });
      //   }
      //   await batch.commit();
      // } else throw new Error("User was not set");
    },
  },
});
</script>

<style lang="scss" scoped>
</style>
