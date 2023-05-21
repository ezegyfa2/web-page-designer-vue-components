<template lang="pug">
    include Template.pug
</template>

<script>
    import FormItemWithLabel from './../../../../helper-vue-components/src/Form/FormItems/FormItemWithLabel/Component.vue'

    export default {
        mixins: [
            FormItemWithLabel,
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
            },
            saved_template_names: {
                type: Array
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
                    console.log('value', JSON.parse(JSON.stringify(this.value)))
                    this.value.push(null)
                    this.$emit('update:value', this.value)
                }
                this.$emit('sectionChanged', '')
            },
            deleteItem(index) {
                this.value.splice(index - 1, 1)
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
            updatedValue(newValue, valueIndex) {
                this.$emit("valueUpdated", { 
                    newValue: newValue, 
                    index: valueIndex 
                })
            },
            addSelectedTemplates() {
                
            },
            loadSection(newSection, index) {
                this.value[index] = newSection
                this.$emit('update:value', this.value)
                this.$emit('sectionChanged', '')
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "Style.scss";
</style>
