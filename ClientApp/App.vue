<template>
    <div>
        Hello from App Vue: <strong>{{</strong> message <strong>}}</strong>
        <router-link to="/about">Go to A</router-link>
        <router-link to="/contact">Go to B</router-link>
        <router-view></router-view>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                message: "Message from App.vue",
            };
        }
    };
</script>