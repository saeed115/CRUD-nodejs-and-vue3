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
        <button data-bs-dismiss="modal" class="btn btn-outline-secondary">
          Cancel
        </button>
      </div>
      <BaseButton
        v-if="client._id"
        @click.prevent="deleteClinet"
        data-bs-dismiss="modal"
        color="danger"
        >Delete Client</BaseButton
      >
    </div>
  </div>
</template>

<script>
import BaseButton from "@/components/BaseButton.vue";
import Provider from "./Providers.vue";

export default {
  props: ["client", "submitForm"],

  components: {
    Provider,
    BaseButton,
  },

  setup(props, context) {
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
