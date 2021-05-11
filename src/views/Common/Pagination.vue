<template>
    <div class="btn-group float-left" role="group" aria-label="Pagination">
        <button type="button" class="btn btn-sm btn-outline-primary" :disabled="currentPage == 1" @click="paginate(1)"><i class="mdi mdi-chevron-double-left"></i></button>
        <button type="button" class="btn btn-sm btn-outline-primary" :disabled="currentPage == 1" @click="paginate(currentPage-1)"><i class="mdi mdi-chevron-left"></i></button>
        <button type="button" class="btn btn-sm btn-outline-primary" v-for="(page, index) in Pages" :key="index" @click="paginate(index+1)">{{index+1}}</button>
        <button type="button" class="btn btn-sm btn-outline-primary" :disabled="currentPage >= Pages" @click="paginate(currentPage+1)"><i class="mdi mdi-chevron-right"></i></button>
        <button type="button" class="btn btn-sm btn-outline-primary" :disabled="currentPage >= Pages" @click="paginate(Pages)"><i class="mdi mdi-chevron-double-right"></i></button>
    </div>
</template>

<script>
import axios from "axios"
export default {
    name: "Pagination",
    props: {
        total: Number,
        searchText: String,
        limit: Number,
        currentPage: Number,
        Pages: Number,
        moduleName: String
    },
    data() {
        return {
            results: [],
        }
    },
    methods: {
        paginate(page) {
            //this.currentPage = page
            axios.get(`${this.moduleName}?page=${page}`, {
                headers: {
                'Authorization': `Bearer ${this.$store.getters.token}`
                },
            }).then(response => {
                this.results = response.data
                this.$emit('updateResults', this.results)
            })
        }
    }
}
</script>

<style>

</style>