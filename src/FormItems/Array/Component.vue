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
                specifiedItemType: null,
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
                if (this.value == null) {
                    this.$emit('update:value', [null])
                }
                else {
                    this.value.push(null)
                    this.$emit('update:value', this.value)
                }
                this.$emit('sectionChanged', '')
            },
            deleteItem(index) {
                this.value.splice(index - 1, 1)
                this.$emit('update:value', this.value)
                this.$emit('update:value', this.value)
                this.$emit('sectionChanged', '')
            },
            changeSection(newSectionType, index) {
                if (!this.value[index] || newSectionType != this.value[index].type) {
                    this.value[index] = {
                        type: newSectionType,
                        data: {}
                    }
                    this.$emit('update:value', this.value)
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
