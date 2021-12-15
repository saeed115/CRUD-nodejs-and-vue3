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

      <CreateProvider @get-providers="getProviders" />

      <div class="mb-3">
        <div
          v-for="provider in providersList"
          :key="provider._id"
          class="
            mb-3
            d-flex
            justify-content-between
            align-items-center
            form-check
          "
        >
          <div>
            <input
              v-model="client.providers"
              :value="provider._id"
              type="checkbox"
              name="providers"
              class="form-check-input"
              :id="provider._id"
              :checked="isInProviderList(client.providers)"
            />
            <label class="form-check-label" :for="provider._id">{{
              provider.name
            }}</label>
          </div>
          <div>
            <button
              data-bs-toggle="modal"
              data-bs-target="#updateProvider"
              @click.prevent="editProvider(provider)"
              class="btn btn-info me-3"
            >
              Edit
            </button>
            <button
              @click.prevent="deleteProvider(provider._id)"
              class="btn btn-danger"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
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
import CreateProvider from "../views/CreateProvider.vue";
import UpdateProvider from "../views/UpdateProvider.vue";
import { ref, onMounted } from "vue";

export default {
  props: ["client", "submitForm"],

  components: {
    CreateProvider,
    UpdateProvider,
  },

  setup(props, context) {
    const providersList = ref([]);
    const providers = ref([]);
    const provider = ref({
      name: "",
    });
    const API_URL = "http://localhost:5000/api/v1/providers";

    onMounted(() => {
      getProviders();
    });
    function deleteClinet() {
      context.emit("delete-client", props.client._id);
    }
    async function getProviders() {
      try {
        const response = await fetch(API_URL);
        const json = await response.json();
        providersList.value = json.data.providers;
      } catch (error) {
        console.log(error);
      }
    }

    async function createProvider() {
      try {
        const response = await fetch(API_URL, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            name: provider.value.name,
          }),
        });
        const json = await response.json();

        if (json.status === "success") {
          provider.value.name = "";

          getProviders();
        }
      } catch (error) {
        console.log(error);
      }
    }

    function isInProviderList(providersIds) {
      // for (let providerId of providersIds) {
      //   console.log(providerId._id);
      //   return providerId._id === providersList.value.some((item) => item._id);
      // }
    }

    function editProvider(obj) {
      // pro;
    }

    async function deleteProvider(_id) {
      const response = await fetch(`${API_URL}/${_id}`, {
        method: "DELETE",
      });

      getProviders();
    }

    return {
      providersList,
      provider,
      providers,
      deleteClinet,
      createProvider,
      deleteProvider,
      isInProviderList,
      getProviders,
      editProvider,
    };
  },
};
</script>

<style></style>
