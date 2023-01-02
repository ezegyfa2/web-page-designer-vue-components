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
            }
        },
        data() {
            return {
                propertyName: null,
                propertyValue: null
            }
        },
        watch: {
            currentValue: {
                immediate: true,
                deep: true,
                handler(newValue) {
                    if (newValue) {
                        this.propertyName = newValue.name
                        this.propertyValue = newValue.value
                    }
                    else if (newValue === null) {
                        this.currentValue = {
                            name: '',
                            value: ''
                        }
                        this.propertyName = ''
                        this.propertyValue = ''
                    }
                }
            },
            propertyName: {
                immediate: true,
                deep: true,
                handler(newPropertyName) {
                    if (this.currentValue && this.currentValue.name != newPropertyName) {
                        this.currentValue.name = newPropertyName
                        this.$emit('update:value', this.currentValue)
                    }
                }
            },
            propertyValue: {
                immediate: true,
                deep: true,
                handler(newPropertyValue) {
                    if (this.currentValue && this.currentValue.value != newPropertyValue) {
                        this.currentValue.value = newPropertyValue
                        this.$emit('update:value', this.currentValue)
                    }
                }
            }
        }
    }
</script>
