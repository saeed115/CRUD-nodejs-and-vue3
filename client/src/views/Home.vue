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

    <div class="py-3 text-center w-100" v-if="loading">
      <h2 class="text-secondary">loading Data...</h2>
    </div>

    <!-- Client List -->
    <table v-if="!loading && clients != ''" class="table border">
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

    <div class="py-3 text-center w-100" v-if="!loading && clients == ''">
      <h2 class="text-secondary">No data available</h2>
    </div>

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
            <Create @create-clients="getClients" />
          </div>
        </div>
      </div>
    </div>

    <!-- Modal For Update Client -->
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
            <Update
              :client="client"
              @delete-client="removeClient"
              @get-clients="getClients"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Update from "../components/UpdateClient.vue";
import Create from "../components/CreateClient.vue";
import { ref, onMounted } from "vue";
export default {
  components: {
    Create,
    Update,
  },
  setup() {
    const clients = ref([]);
    const client = ref({});
    let loading = ref(false);

    const API_URL = "http://localhost:5000/api/v1/clients";

    onMounted(() => {
      getClients();
    });

    async function getClients() {
      loading.value = true;
      try {
        const response = await fetch(API_URL);
        const json = await response.json();
        console.log(json.data.clients);
        clients.value = json.data.clients;
        console.log(clients.value);
      } catch (error) {
        console.log(error);
      }

      loading.value = false;
    }

    async function removeClient(_id) {
      try {
        const response = await fetch(`${API_URL}/${_id}`, {
          method: "DELETE",
        });

        if (response.status === 204) {
          alert("Client Deleted successfully");
        }
      } catch (error) {
        console.log(error);
      }

      getClients();
    }

    async function editClient(clientData) {
      client.value = clientData;
    }

    return {
      clients,
      client,
      removeClient,
      editClient,
      getClients,
      loading,
    };
  },
};
</script>

<style></style>
