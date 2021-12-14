<template>
  <div class="container mt-5">
    <form @submit.prevent="submitForm">
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

      <label class="form-check-label">Providers</label>

      <div class="mb-3">
        <div class="row g-3">
          <div class="col-sm-9">
            <input
              v-model="provider.name"
              class="form-control"
              type="text"
              placeholder="Phone"
            />
          </div>
          <div class="col-sm">
            <button
              @click.prevent="createProvider"
              class="btn btn-success w-100"
            >
              Add provider
            </button>
          </div>
        </div>
      </div>

      <div class="mb-3">
        <div
          v-for="provider in providers"
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
              type="checkbox"
              name="provider"
              class="form-check-input"
              :id="provider._id"
            />
            <label class="form-check-label" :for="provider._id">{{
              provider.name
            }}</label>
          </div>
          <div>
            <button class="btn btn-info me-3">Edit</button>
            <button
              @click.prevent="deleteProvider(provider._id)"
              class="btn btn-danger"
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";

export default {
  props: ["client", "submitForm"],

  setup() {
    const providers = ref([]);
    const provider = ref({
      name: "",
    });
    const API_URL = "http://localhost:5000/api/v1/providers";

    onMounted(() => {
      getProviders();
    });

    async function getProviders() {
      try {
        const response = await fetch(API_URL);
        const json = await response.json();
        providers.value = json.data.providers;
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

    async function deleteProvider(_id) {
      const response = await fetch(`${API_URL}/${_id}`, {
        method: "DELETE",
      });

      getProviders();
    }

    return {
      providers,
      provider,
      createProvider,
      deleteProvider,
    };
  },
};
</script>

<style></style>
