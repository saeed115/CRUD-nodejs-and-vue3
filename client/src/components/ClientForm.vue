<template>
  <div>
    <form>
      <label class="form-label">Name</label>
      <div class="mb-3">
        <input
          v-model="client.name"
          class="form-control"
          type="text"
          placeholder="Name"
        />
      </div>

      <label class="form-label">Email</label>
      <div class="mb-3">
        <input
          v-model="client.email"
          class="form-control"
          placeholder="Email"
        />
      </div>

      <label class="form-label">Phone</label>
      <div class="mb-3">
        <input
          v-model="client.phone"
          class="form-control"
          type="number"
          placeholder="Phone"
        />
      </div>

      <Provider
        :selectedProviders="client.providers"
        @send-providers="getProviders"
      />
    </form>

    <hr />

    <div class="d-flex justify-content-between align-items-center">
      <div>
        <button @click="submitForm" type="submit" class="btn btn-primary me-2">
          Save
        </button>
        <button
          type="submit"
          data-bs-dismiss="modal"
          class="btn btn-outline-secondary"
        >
          Cancel
        </button>
      </div>
      <button
        v-if="client._id"
        @click="deleteClinet"
        data-bs-dismiss="modal"
        type="submit"
        class="btn btn-danger"
      >
        Delete Client
      </button>
    </div>
  </div>
</template>

<script>
import { onMounted } from "@vue/runtime-core";
import Provider from "./Providers.vue";

export default {
  props: ["client", "submitForm"],

  components: {
    Provider,
  },

  setup(props, context) {
    onMounted(() => {
      // getProviders();
    });

    function getProviders(providers) {
      if (props.client.providers) {
        props.client.providers = providers;
      }
    }

    function deleteClinet() {
      context.emit("delete-client", props.client._id);
    }

    return {
      deleteClinet,
      getProviders,
    };
  },
};
</script>

<style></style>
