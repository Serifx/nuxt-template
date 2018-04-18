<template>
  <div class="container">
    <AppLogo/>
    <h1>hello world!</h1>
    <p><router-link to="item/details">Go to details</router-link></p>
  </div>
</template>

<script>
  import AppLogo from '~/components/AppLogo';
  
  export default {
    head () {
      return {
        title: 'Nuxt'
      };
    },
    components: {
      AppLogo
    }
  };
</script>

<style>
  html,
  body {
    height: 100%;
  }
  .app-root {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
</style>
<style scoped>
  h1 {
    margin: 30px auto;
  }
</style>
