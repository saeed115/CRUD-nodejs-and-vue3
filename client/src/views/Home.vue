<template>
  <div class="container">
    <div class="d-flex justify-content-between align-items-center p-4 bg-light">
      <h1>Clients</h1>
      <button
        class="btn btn-success"
        data-bs-toggle="modal"
        data-bs-target="#createClient"
      >
        Create client
      </button>
    </div>
    <!-- Client List -->
    <table class="table border">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Phone</th>
          <th scope="col">Providers</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(client, i) in clients" :key="client._id">
          <th scope="row">{{ i + 1 }}</th>
          <td>{{ client.name }}</td>
          <td>{{ client.email }}</td>
          <td>{{ client.phone }}</td>
          <td>
            <span
              v-for="(provider, i) in client.providers"
              :key="provider._id"
              class="me-1"
            >
              <span v-if="i > 0" class="me-2">,</span>
              {{ provider.name }}
            </span>
          </td>
          <td>
            <button
              @click="editClient(client)"
              data-bs-toggle="modal"
              data-bs-target="#updateClient"
              class="btn btn-primary me-2"
            >
              Edit
            </button>
            <button @click="removeClient(client._id)" class="btn btn-danger">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal For Create Client -->
    <div
      class="modal fade"
      id="createClient"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Create Client</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <!-- Create component -->
            <Create @create-client="getClients" />
          </div>
        </div>
      </div>
    </div>

    <!-- Modal For Create Client -->
    <div
      class="modal fade"
      id="updateClient"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Update Client</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <!-- Update component -->
            <Update :clientObj="client" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Update from "./UpdateClient.vue";
import Create from "./CreateClient.vue";
import { ref, onMounted } from "vue";
export default {
  components: {
    Create,
    Update,
  },
  setup() {
    const clients = ref([]);
    const client = ref({});

    const API_URL = "http://localhost:5000/api/v1/clients";

    onMounted(() => {
      getClients();
    });

    async function getClients() {
      try {
        const response = await fetch(API_URL);
        const json = await response.json();
        clients.value = json.data.clients;
      } catch (error) {
        console.log(error);
      }
    }

    async function removeClient(_id) {
      const response = await fetch(`${API_URL}/${_id}`, {
        method: "DELETE",
      });
      getClients();
    }

    async function editClient(clientObj) {
      client.value = clientObj;
    }
    return {
      clients,
      client,
      removeClient,
      editClient,
      getClients,
    };
  },
};
</script>

<style></style>
