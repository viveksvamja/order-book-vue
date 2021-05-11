<template>
    <!-- Call to action buttons -->
    <ul class="list-inline m-0">
        <li class="list-inline-item" v-if="module == 'order'">
            <button class="btn btn-danger btn-icon btn-rounded" @click="download(id, order_no)" data-toggle="tooltip" data-placement="top" title="Download Invoice"><i class="mdi mdi-file-pdf"></i></button>
        </li>
        <li class="list-inline-item">
            <router-link :to="{ path: `/${module}/${id}`}" class="btn btn-secondary btn-icon btn-rounded icon-padding" type="button" data-toggle="tooltip" data-placement="top" title="View">
                <i class="mdi mdi-file-document-box"></i>
            </router-link>
        </li>
        <li class="list-inline-item">
            <router-link :to="{ path: `/${module}/edit/${id}`}" class="btn btn-primary btn-icon btn-rounded icon-padding" type="button" data-toggle="tooltip" data-placement="top" title="Edit">
                <i class="mdi mdi-lead-pencil"></i>
            </router-link>
        </li>
        <li class="list-inline-item">
            <button class="btn btn-danger btn-icon btn-rounded" @click="deleteRecord(id)" data-toggle="tooltip" data-placement="top" title="Delete"><i class="mdi mdi-delete"></i></button>
        </li>
    </ul>
</template>

<script>
export default {
    props: {
        id : [String, null],
        order_no : [Number, null],
        module : [String, null],
    },
    methods: {
        deleteRecord(id) {
            this.$emit('delete', id);
        },
        download(id, order_no) {
            this.$emit('download', id, order_no);
        }
    }
}
</script>

<style scoped>
.icon-padding {
    padding: 8px;
}
</style>