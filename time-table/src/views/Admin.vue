<template>
  <div class="Admin">
    <h1>these are the shifts</h1>
    <select v-model="chosenWorker" name="worker" id="worker" v-if="workers">
      <option
        selected="worker.id"
        v-for="worker in workers"
        v-bind:key="worker.id"
        v-text="worker.id"
      ></option>
    </select>
    <Shifts :workerId="chosenWorker" />
  </div>
</template>
<script>
import db from "../utils/db";
import store from "../store";
import functions from "../utils/functions";
import Shifts from "../components/Shifts.vue";
export default {
  components: {
    Shifts,
  },
  name: "Admin",
  data() {
    return {
      workers: store.state.users.filter((user) =>
        functions.isUserOnShift(user.id)
      ),
      chosenWorker: 0,
    };
  },
  mounted: function () {
    db.getUsers();
  },
};
</script>
