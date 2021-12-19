<template>
  <client-form :client="client" :submitForm="updateClient"></client-form>
</template>

<script>
import ClientForm from "./ClientForm.vue";
export default {
  props: {
    client: {
      type: Object,
    },
  },
  components: {
    ClientForm,
  },
  setup(props, context) {
    const API_URL = "http://localhost:5000/api/v1/clients";

    async function updateClient() {
      console.log(props.client);
      try {
        const response = await fetch(`${API_URL}/${props.client._id}`, {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            name: props.client.name,
            email: props.client.email,
            phone: props.client.phone,
            providers: props.client.providers,
          }),
        });
        const json = await response.json();
        if (json.status === "success") {
          alert("Client Update successfully");
          context.emit("get-clients");
        }
      } catch (error) {
        console.log(error);
      }
    }
    return {
      updateClient,
    };
  },
};
</script>

<style></style>
