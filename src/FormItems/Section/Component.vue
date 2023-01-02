<template lang="pug">
    include Template.pug
</template>

<script>
    import FormItemWithLabel from './../../../../helper-vue-components/src/Form/FormItems/FormItemWithLabel/Component.vue'
    import FormItemWithValue from './../../../../helper-vue-components/src/Form/BasicFormItems/FormItemWithValue.vue'
    import DataTransmitting from './../../../../helper-vue-components/src/DataTransmitting.vue'

    export default {
        mixins: [
            FormItemWithLabel,
            FormItemWithValue,
            DataTransmitting,
        ],
        props: {
            parameters: {
                type: Object
            }
        },
        data() {
            return {
                filters: {},
                currentSectionType: null
            }
        },
        computed: {
            componentNameoptions() {
                return Object.keys(window.componentProperties).map(componentName => {
                    return {
                        text: componentName,
                        value: componentName
                    }
                })
            }
        },
        watch: {
            currentValue: {
                handler(newValue) {
                    if (newValue) {
                        this.currentSectionType = newValue.type
                    }
                }
            },
            currentSectionType: {
                handler(newSectionType) {
                    if (!this.currentValue || newSectionType != this.currentValue.type) {
                        this.$emit('sectionSelected', newSectionType)
                    }
                }
            }
        },
        methods: {
        }
    }
</script>

<style lang="scss" scoped>
    @import "Style.scss";
</style>
