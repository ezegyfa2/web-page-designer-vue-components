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
                propertyInfos: null,
                selected: false
            }
        },
        mounted() {
            this.propertyInfos = getComponentPropertyInfos(this.template.type)
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
            template: {
                immediate: true,
                deep: true,
                handler(newTemplate) {
                    this.propertyInfos = getComponentPropertyInfos(newTemplate.type)
                    if (this.propertyInfos && newTemplate && newTemplate.data) {
                        Object.keys(this.propertyInfos.properties).forEach(propertyName => {
                            if (typeof newTemplate.data[propertyName] === 'undefined') {
                                newTemplate.data[propertyName] = null
                                //throw new Error('Property missing from template ' + propertyName)
                            }
                        })
                    }
                },
                flush: 'sync'
            }
        },
        methods: {
            changeSection(newSectionType, propertyName) {
                if (!this.template.data[propertyName] || newSectionType != this.template.data[propertyName].type) {
                    this.template.data[propertyName] = {
                        type: newSectionType,
                        data: {}
                    }
                    this.propertyInfos = getComponentPropertyInfos(this.template.type)
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
