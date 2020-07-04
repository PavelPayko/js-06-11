<template>
  <header>
    <slot />
  </header>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style>
header {
  display: flex;
  justify-content: space-around;
  background: #fff;
  padding: 20px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
  position: relative;
}
</style>