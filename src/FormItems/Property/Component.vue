<template lang="pug">
    include Template.pug
</template>

<script>
    import FormItemWithLabel from './../../../../helper-vue-components/src/Form/FormItems/FormItemWithLabel/Component.vue'
    import FormItemWithValue from './../../../../helper-vue-components/src/Form/BasicFormItems/FormItemWithValue.vue'

    export default {
        mixins: [
            FormItemWithLabel,
            FormItemWithValue,
        ],
        props: {
            value: {
                type: Object,
                default() {
                    return {}
                }
            },
            saved_template_names: {
                type: Array
            }
        },
        data() {
            return {
                propertyName: null,
                propertyValue: null
            }
        },
        watch: {
            value: {
                immediate: true,
                deep: true,
                handler(newValue) {
                    if (newValue) {
                        this.propertyName = newValue.name
                        this.propertyValue = newValue.value
                    }
                    else if (newValue === null) {
                        this.$emit('update:value', {
                            name: '',
                            value: ''
                        })
                    }
                },
                flush: 'sync'
            },
            propertyName: {
                immediate: true,
                deep: true,
                handler(newPropertyName) {
                    if (this.value && this.value.name != newPropertyName) {
                        this.$emit('update:value', {
                            name: newPropertyName,
                            value: this.value.value
                        })
                    }
                }
            },
            propertyValue: {
                immediate: true,
                deep: true,
                handler(newPropertyValue) {
                    if (this.value && this.value.value != newPropertyValue) {
                        this.$emit('update:value', {
                            name: this.value.name,
                            value: newPropertyValue
                        })
                    }
                }
            }
        }
    }
</script>
