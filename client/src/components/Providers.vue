<template>
  <div>
    <label class="form-check-label">Providers</label>

    <div class="mb-3">
      <div class="row g-3">
        <div class="col-sm-9">
          <input
            v-model="name"
            class="form-control"
            type="text"
            placeholder="Provider"
          />
        </div>
        <div class="col-sm">
          <button @click.prevent="createProvider" class="btn btn-success w-100">
            Add provider
          </button>
        </div>
      </div>
    </div>

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
            v-model="providers"
            :value="provider._id"
            type="checkbox"
            name="provider"
            class="form-check-input"
            :id="provider._id"
            :checked="isInProviders(provider._id)"
            @change="sendProviders"
          />
          <label class="form-check-label" :for="provider._id">{{
            provider.name
          }}</label>
        </div>

        <div>
          <button
            @click.prevent="getProvider(provider.name, provider._id)"
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

    <div
      v-if="showUpdateFrom"
      class="
        bg-light
        position-absolute
        top-50
        start-50
        w-75
        translate-middle
        p-5
      "
    >
      <div>
        <input
          v-model="dataToUpdate.name"
          class="form-control"
          type="text"
          placeholder="Phone"
        />
      </div>
      <div class="d-flex mt-3">
        <button @click.prevent="updateProvider()" class="btn btn-success me-2">
          Save
        </button>
        <button @click.prevent="showUpdateFrom = false" class="btn btn-danger">
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";

export default {
  props: ["selectedProviders"],
  setup(props, context) {
    const API_URL = "http://localhost:5000/api/v1/providers";

    const name = ref("");
    const providersList = ref([]);
    const providers = ref([]);
    const showUpdateFrom = ref(false);
    const dataToUpdate = ref({
      name: "",
      id: "",
    });

    onMounted(() => {
      getProviders();
      isInProviders();
    });

    async function createProvider() {
      try {
        const response = await fetch(API_URL, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            name: name.value,
          }),
        });
        const json = await response.json();

        if (json.status === "success") {
          name.value = "";

          if (json.status === "success") {
            alert("Provider Update successfully");
          }

          getProviders();
        } else {
          for (const error of json.messages) {
            alert(error);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }

    async function updateProvider() {
      try {
        const response = await fetch(`${API_URL}/${dataToUpdate.value.id}`, {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            name: dataToUpdate.value.name,
          }),
        });
        const json = await response.json();
        if (json.status === "success") {
          alert("Provider Update successfully");
          showUpdateFrom.value = false;

          getProviders();
        }
      } catch (error) {
        console.log(error);
      }
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

    function isInProviders(id) {
      if (props.selectedProviders) {
        return props.selectedProviders.some((arrVal) => id === arrVal._id);
      }
    }

    function sendProviders() {
      context.emit("send-providers", providers);
    }

    function getProvider(providerName, id) {
      dataToUpdate.value.name = providerName;
      dataToUpdate.value.id = id;

      showUpdateFrom.value = true;
    }

    async function deleteProvider(_id) {
      try {
        const response = await fetch(`${API_URL}/${_id}`, {
          method: "DELETE",
        });

        if (response.status === 204) {
          alert("Provider Deleted successfully");
        }
      } catch (error) {
        console.log(error);
      }

      getProviders();
    }

    return {
      providersList,
      showUpdateFrom,
      dataToUpdate,
      providers,
      name,
      isInProviders,
      deleteProvider,
      updateProvider,
      createProvider,
      getProvider,
      sendProviders,
    };
  },
};
</script>