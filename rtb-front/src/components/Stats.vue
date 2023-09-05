<script setup lang="ts">
import { UserService } from '@/api/UserService';
import type UsersStats from '@/model/UsersStats';
import { computed, onMounted, ref, type Ref } from 'vue';

let stats: Ref<UsersStats> = ref({ all: 0, visited: 0 });

onMounted(async () => {
    const data = await UserService.getStats();
    stats.value.all = data.data.all;
    stats.value.visited = data.data.visited;
});

const fraction = computed(() => {
    return stats.value.all ? ((stats.value.visited / stats.value.all) * 100).toFixed(2) : 0;
});
</script>
<template>
    <div>
        <h2>Page traffic data</h2>
        <table>
            <tr>
                <th>Number of all users</th>
                <th>% that scrolled to the image</th>
            </tr>
            <tr>
                <td>{{ stats.all }}</td>
                <td>{{ fraction }}</td>
            </tr>
        </table>
    </div>
</template>

<style scoped>
h2 {
    font-weight: 300;
    font-size: 3em;
}
div {
    text-align: center;
}
table {
    width: 40%;
    max-width: 800px;
    min-width: 300px;
    text-align: center;
    line-height: 2;
    border-collapse: collapse;
    margin: auto;
}
table td,
table th {
    padding: 0.5em;
    width: 50%;
    font-weight: 300;
}
table th {
    background-color: #c4c1e0;
}
table td {
    background-color: #fafafa;
}
</style>
