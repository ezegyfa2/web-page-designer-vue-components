<template lang="pug">
    include Template.pug
</template>

<script>
    import FormItemWithLabel from './../../../../helper-vue-components/src/Form/FormItems/FormItemWithLabel/Component.vue'
    import DataTransmitting from './../../../../helper-vue-components/src/DataTransmitting.vue'

    export default {
        mixins: [
            FormItemWithLabel,
            DataTransmitting,
        ],
        props: {
            value: {
                type: Array,
                default() {
                    return []
                }
            },
            item_type: {
                type: String
            }
        },
        data() {
            return {
                itemValues: [],
                specifiedItemType: null,
                dataTransmits: {
                    itemValues: 'value',
                }
            }
        },
        computed: {
            currentItemType() {
                if (this.specifiedItemType) {
                    return this.specifiedItemType
                }
                else {
                    return this.item_type
                }
            }
        },
        methods: {
            getValueFormInfos(value) {
                return {
                    type: this.currentItemType,
                    data: {
                        value: value
                    }
                }
            },
            createItem() {
                if (this.itemValues == null) {
                    this.itemValues = []
                }
                this.itemValues.push(null)
                this.$emit('update:value', this.itemValues)
                this.$emit('sectionChanged', '')
            },
            deleteItem(index) {
                this.itemValues.splice(index - 1, 1)
                this.itemValues = this.itemValues
                this.$emit('update:value', this.itemValues)
                this.$emit('sectionChanged', '')
            },
            changeSection(newSectionType, index) {
                if (!this.itemValues[index] || newSectionType != this.itemValues[index].type) {
                    this.itemValues[index] = {
                        type: newSectionType,
                        data: {}
                    }
                    this.$emit('update:value', this.itemValues)
                    this.$emit('sectionChanged', '')
                }
            },
            addSelectedTemplates() {
                
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "Style.scss";
</style>
