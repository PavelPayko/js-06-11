<template>
    <div class="error">
        <h3 class="error-mess">Не удаётся выполнить запрос к серверу</h3>
    </div>
</template>

<script>

export default {
  name: "Error",
};

</script>

<style>

.error {
    display: block;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    background-color: black;
    opacity: 0.5;
}
.error-mess {
    color: #ffffff;
    text-align: center;
    margin-top: 35%;
}
</style>