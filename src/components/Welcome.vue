<template>
    <div class="wrapper">
        <AMap></AMap>
    </div>
</template>

<script>
import AMap from './AMap'
import { GETLIVEDATALIST, GETWATERAREAS } from '../store/types'
export default {
    components: {
        // TiandiMap,
        AMap,
    },
    mounted() {
        this.$store.dispatch(GETLIVEDATALIST)
        this.$store.dispatch(GETWATERAREAS)
    },
}
</script>

<style scoped>
html,
body,
.wrapper {
    height: 100%;
}
</style>
