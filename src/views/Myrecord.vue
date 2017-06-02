<template>
    <div>
        <el-tabs v-model="$route.name" @tab-click="handleClick">
            <el-tab-pane label="Current" name="current" data-tab="current"></el-tab-pane>
            <el-tab-pane label="History" name="history" data-tab="history"></el-tab-pane>
        </el-tabs>
        <div class="records-content">
            <router-view></router-view>
        </div>

    </div>
</template>

<script>
export default {
    data() {
        return {
            options: [{

            },{

            }]
        };
    },
    methods: {
        handleClick(tab, event) {
            this.$router.push({ path: `/myrecord/${tab.$el.getAttribute('data-tab')}` });
        }
    },
};
</script>


<style lang="scss" scoped>
.records-content {
}
</style>