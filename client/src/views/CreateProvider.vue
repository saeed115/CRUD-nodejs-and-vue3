<template>
  <div>
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
          <button @click.prevent="createProvider" class="btn btn-success w-100">
            Add provider
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  setup(_, { emit }) {
    const provider = ref([]);

    const API_URL = "http://localhost:5000/api/v1/providers";

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

          emit("get-providers");
        }
      } catch (error) {
        console.log(error);
      }
    }

    return { provider, createProvider };
  },
};
</script>