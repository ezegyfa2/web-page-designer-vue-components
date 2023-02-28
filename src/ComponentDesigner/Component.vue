<template lang="pug">
    include Template.pug
</template>

<script>
    import DataTransmitting from '../../../helper-vue-components/src/DataTransmitting.vue'
    import Refresher from '../../../helper-vue-components/src/Refresher.vue'

    export default {
        mixins: [
            DataTransmitting,
            Refresher,
        ],
        props: {
            template: {
                type: Object
            }
        },
        data() {
            return {
                currentTemplate: {},
                propertyInfos: null,
                dataTransmits: {
                    currentTemplate: 'template'
                },
                selected: false
            }
        },
        mounted() {
            this.propertyInfos = getComponentPropertyInfos(this.currentTemplate.type)
        },
        computed: {
            formItemSections() {
                if (this.propertyInfos) {
                    return this.propertyInfos.getFormInfos()
                }
                else {
                    return []
                }
            },
            propertyNames() {
                return Object.keys(this.propertyInfos.properties)
            }
        },
        watch: {
            currentTemplate: {
                immediate: true,
                deep: true,
                handler(newTemplate) {
                    this.currentTemplate = newTemplate
                    this.propertyInfos = getComponentPropertyInfos(this.currentTemplate.type)
                    if (this.propertyInfos && this.currentTemplate && this.currentTemplate.data) {
                        Object.keys(this.propertyInfos.properties).forEach(propertyName => {
                            if (typeof this.currentTemplate.data[propertyName] === 'undefined') {
                                this.currentTemplate.data[propertyName] = null
                                //throw new Error('Property missing from template ' + propertyName)
                            }
                        })
                    }
                }
            }
        },
        methods: {
            changeSection(newSectionType, propertyName) {
                if (!this.currentTemplate.data[propertyName] || newSectionType != this.currentTemplate.data[propertyName].type) {
                    this.currentTemplate.data[propertyName] = {
                        type: newSectionType,
                        data: {}
                    }
                    this.propertyInfos = getComponentPropertyInfos(this.currentTemplate.type)
                    console.log('section change')
                    this.$emit('sectionChanged', newSectionType)
                }
            },
            createComponent() {
                let link = new URL(window.location)

                $.ajax({
                    type: "POST",
                    url: link.pathname + "/copy-component",
                    data: {
                        type: this.template.type, 
                        _token: document.querySelector('meta[name="csrf-token"]').content
                    },
                    success: () => console.log("Data sending is successful"),
                    dataType: "json"
                });
            },
            selectComponent() {
                if(this.template.selected) {
                    delete this.template.selected
                } else {
                    this.template.selected = true
                }
                
                this.selected = !this.selected
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "Style.scss";
</style>
