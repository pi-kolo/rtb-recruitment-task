<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>

<template>
    <header>
        <h1>RTB recruitment task</h1>
    </header>
    <RouterView />
</template>

<style scoped>
h1 {
    text-align: center;
    font-size: 8em;
    font-weight: 300;
    margin: 1em 0;
    color: #7c73e6;
}

@media (max-width: 600px) {
    h1 {
        font-size: 3em;
        margin: 80px auto;
    }
}
</style>
