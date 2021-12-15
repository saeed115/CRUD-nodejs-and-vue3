<template>
  <ClientForm :client="client" :submitForm="createClient" />
</template>

<script>
import ClientForm from "../components/ClientForm.vue";
import { reactive } from "vue";
export default {
  components: {
    ClientForm,
  },
  setup(_, context) {
    const API_URL = "http://localhost:5000/api/v1/clients";

    const client = reactive({
      name: "",
      email: "",
      phone: null,
      providers: [],
    });

    async function createClient() {
      try {
        const response = await fetch(API_URL, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            name: client.name,
            email: client.email,
            phone: client.phone,
            providers: client.providers,
          }),
        });
        const json = await response.json();

        if (json.status === "success") {
          client.name = "";
          client.email = "";
          client.phone = null;
          client.providers = [];

          context.emit("create-clients");
        }
      } catch (error) {
        console.log(error);
      }
    }
    return {
      client,
      createClient,
    };
  },
};
</script>

<style></style>
