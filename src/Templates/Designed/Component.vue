<script>
    import Template from '../../../../helper-vue-components/src/Template/Component.vue'

    export default {
        mixins: [
            Template
        ],
        data() {
            return {
                mainTemplatePath: 'designed',
                templates: {
                    designed: require('./designed').default,
                }
            }
        }
    }
</script>
