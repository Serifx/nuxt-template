<template>
  <div class="details">
    <h1>Now you see me</h1>
    <p><router-link to="../" replace>Go back</router-link></p>
  </div>
</template>

<script>
  export default {
    components: {
      //
    }
  };
</script>
<style scoped>
  .details {
    font-size: 26px;
    color: #f00;
  }
</style>
