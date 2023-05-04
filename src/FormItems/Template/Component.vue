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
            getParams(template, valueType) {
                let params = []
                if (Array.isArray(template)) {
                    params.push(...template.map((templateValue) => {
                        return this.getParams(templateValue, valueType)
                    }))
                }
                else if (template && typeof(template) == 'object') {
                    if ('type' in template) {
                        params.push(...this.getComponentParams(template))
                    }
                    else if (valueType) {
                        for (const [key, value] of Object.entries(template)) {
                            params.push(...this.getParams,  valueType)
                        }
                        params.push({
                            name: template,
                            type: 
                        })
                    }
                    else {
                        throw new Error('Can\'t get template params')
                    }
                }
                else if (valueType) {
                    params.push({
                        name: template,
                        type: valueType 
                    })
                }
                return params
            },
            getComponentParams(component) {
                checkVariableType(component, 'component', 'object')
                checkObjectHasProperty(component, 'type')
                let params = []
                if (component.data) {
                    for (const [key, value] of Object.entries(data)) {
                        params.push(...this.getParams(value, getPropertyType(component.type, key)))
                    }
                }
                return params
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "Style.scss";
</style>
