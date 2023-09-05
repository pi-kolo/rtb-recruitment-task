<script async setup lang="ts">
import { onMounted, ref, type Ref } from 'vue';
import { UserService } from '../api/UserService';
import type User from '@/model/User';

const intersectionOptions: IntersectionObserverInit = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};
const lorem =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam in maximus urna, eget sodales felis. Phasellus ac pulvinar mi. Vivamus turpis lorem, varius ac rutrum auctor, scelerisque sed est. Vestibulum pellentesque neque eget euismod malesuada. Duis nec quam ullamcorper, venenatis mauris id, pharetra purus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed euismod odio vel augue dignissim scelerisque. Quisque ullamcorper tincidunt sem in mollis. Duis laoreet cursus pellentesque. Sed pretium augue ac lectus ultrices, a accumsan sem lacinia. Quisque fermentum imperdiet turpis nec sodales.\
Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vivamus consequat tellus sit amet consequat tincidunt. Maecenas ullamcorper cursus fringilla. In venenatis posuere laoreet. Donec suscipit augue nibh, id lobortis justo sollicitudin ac. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vivamus varius id diam ut interdum. Maecenas in quam ac leo euismod finibus quis in mi. Integer ultricies tellus finibus efficitur vulputate. Curabitur vitae interdum neque, at suscipit nisl. Duis malesuada leo velit. Proin fermentum lorem sit amet risus hendrerit, ut varius ipsum aliquam.\
Sed at congue tortor. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nunc porttitor egestas lacus, vel fermentum eros pretium eu. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Proin eu neque ante. Mauris non mauris tempor, tempus lectus ac, pellentesque lectus. Sed posuere egestas ipsum et suscipit. Ut arcu eros, ultricies sit amet orci nec, sodales rutrum enim. Nullam sit amet dignissim nibh, non accumsan ligula. Cras consectetur viverra augue sit amet laoreet. Pellentesque nec congue risus. Suspendisse porttitor, velit at posuere convallis, velit massa suscipit purus, at vestibulum odio magna quis ligula. Quisque pharetra ullamcorper diam eget pellentesque. Morbi vitae neque nisl. Duis consequat neque leo, eget iaculis nisl eleifend vel.';
let userData: Ref<User> = ref({});
const observer = new IntersectionObserver(handleIntersect, intersectionOptions);

onMounted(async () => {
    observer.observe(<Element>document.querySelector('#avatar'));
    const response = await fetch('https://random-data-api.com/api/v2/users');
    const data = await (await response).json();
    userData.value.avatar = data.avatar;
    userData.value.uid = data.uid;

    if (!sessionStorage.getItem('uid')) {
        sessionStorage.setItem('uid', <string>userData.value.uid);
        await UserService.storeUser(userData.value);
    }
});

async function handleIntersect(entries: IntersectionObserverEntry[], observer: IntersectionObserver) {
    if (sessionStorage.getItem('visited') && sessionStorage.getItem('uid')) {
        observer.disconnect();
    }

    entries.forEach(async (entry) => {
        if (entry.isIntersecting) {
            userData.value.visited = true;
            sessionStorage.setItem('visited', '1');
            await UserService.updateUser(userData.value);
            observer.disconnect();
        }
    });
}
</script>

<template>
    <router-link class="button" to="/stats">Go to stats</router-link>
    <p class="paragraph" v-for="_ in 10">{{ lorem }}</p>
    <div class="avatarContainer">
        <img id="avatar" :src="userData.avatar" alt="avatar" />
    </div>
    <p class="paragraph" v-for="_ in 10">{{ lorem }}</p>
</template>

<style scoped>
.paragraph {
    font-size: 1.25em;
    font-weight: 300;
    line-height: 2;
    padding: 20px 10%;
    margin: auto;
}
.paragraph:nth-child(2n) {
    background-color: #fafafa;
}
.avatarContainer {
    text-align: center;
}
.button {
    font-family: 'Lato', sans-serif;
    font-weight: 300;
    font-size: 2em;
    position: absolute;
    top: 40px;
    right: 20px;
    text-decoration: none;
    background-color: #c4c1e0;
    color: #fafafa;
    padding: 12px 20px;
}
@media (max-width: 600px) {
    .button {
        position: fixed;
        bottom: 30px;
        top: unset;
    }
}
</style>
