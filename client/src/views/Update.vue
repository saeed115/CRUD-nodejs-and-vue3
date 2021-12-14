<template>
  <client-form :client="clientObj" :submitForm="updateClient"></client-form>
</template>

<script>
import ClientForm from "../components/ClientForm.vue";
export default {
  props: {
    clientObj: {
      type: Object,
    },
  },
  components: {
    ClientForm,
  },
  setup(props) {
    const API_URL = "http://localhost:5000/api/v1/clients";

    async function updateClient() {
      console.log(props.clientObj);
      // try {
      //   const response = await fetch(`${API_URL}/${props.clientObj._id}`, {
      //     method: "PATCH",
      //     headers: {
      //       "content-type": "application/json",
      //     },
      //     body: JSON.stringify({
      //       name: props.clientObj.name,
      //       email: props.clientObj.email,
      //       phone: props.clientObj.phone,
      //       providers: props.clientObj.providers,
      //     }),
      //   });
      //   const json = await response.json();
      // } catch (error) {
      //   console.log(error);
      // }
    }
    return {
      updateClient,
    };
  },
};
</script>

<style></style>
