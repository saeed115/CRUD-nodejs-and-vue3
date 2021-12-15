<template>
  <div>
    <label class="form-check-label">Providers</label>

    <div class="mb-3">
      <div class="row g-3">
        <div class="col-sm-9">
          <input class="form-control" type="text" placeholder="Phone" />
        </div>
        <div class="col-sm">
          <button @click.prevent="updateProvider" class="btn btn-success w-100">
            Update provider
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    provider: {
      type: Object,
    },
  },
  setup(props) {
    const API_URL = "http://localhost:5000/api/v1/providers";

    async function updateProvider() {
      console.log(props.provider);
    //   try {
    //     const response = await fetch(`${API_URL}/${props.provider._id}`, {
    //       method: "PATCH",
    //       headers: {
    //         "content-type": "application/json",
    //       },
    //       body: JSON.stringify({
    //         name: props.provider.name,
    //       }),
    //     });
    //     const json = await response.json();
    //     if (json.status === "success") {
    //       alert("Provider Update successfully");
    //     }
    //   } catch (error) {
    //     console.log(error);
    //   }
    }

    return { updateProvider };
  },
};
</script>