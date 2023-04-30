<template lang="pug">
    include Template.pug
</template>

<script>
    import FormItemWithLabel from './../../../../helper-vue-components/src/Form/FormItems/FormItemWithLabel/Component.vue'
    import FromItemWithoutLabel from '../../../../helper-vue-components/src/Form/FormItemsWithoutLabel/Select/Component.vue'
    import FormItemWithValue from './../../../../helper-vue-components/src/Form/BasicFormItems/FormItemWithValue.vue'
    import DataTransmitting from './../../../../helper-vue-components/src/DataTransmitting.vue'

    export default {
        mixins: [
            FormItemWithLabel,
            FromItemWithoutLabel,
            FormItemWithValue,
            DataTransmitting,
        ],
        props: {
            parameters: {
                type: Object
            },
            saved_template_names: {
                type: Array
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
            },
            savedTemplateNamesOptions() {
                return this.saved_template_names.forEach(templateName => {
                    return {
                        text: templateName,
                        value: templateName
                    }
                })
            }
        },
        watch: {
            currentValue: {
                immediate: true,
                handler(newValue) {
                    if (newValue) {
                        this.currentSectionType = newValue.type
                    }
                },
                flush: 'sync'
            },
            currentSectionType: {
                immediate: true,
                handler(newSectionType) {
                    if (!this.currentValue || newSectionType != this.currentValue.type) {
                        this.$emit('sectionSelected', newSectionType)
                    }
                },
                flush: 'sync'
            }
        },
        methods: {
            addSelectedTemplates() {
                
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "Style.scss";
</style>
