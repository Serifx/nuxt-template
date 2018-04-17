<template>
  <div class="container">
    <AppLogo/>
    <h1>hello world!</h1>
  </div>
</template>

<script>
  import AppLogo from '~/components/AppLogo';
  
  export default {
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
  
  h1 {
    margin: 30px auto;
  }
</style>
