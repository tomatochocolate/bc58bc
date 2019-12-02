<template>
    <keep-alive :include="layoutInject.caches"><router-view /></keep-alive>
</template>
<script type="text/babel">
    export default {
        name: 'Main',
        inject: [ 'layoutInject' ]
    }
</script>
