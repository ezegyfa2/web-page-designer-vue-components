<template lang="pug">
    include Template.pug
</template>

<script>
    export default {
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
                changeCount: 0,
                itemValues: [],
                itemValuesChanging: false,
            }
        },
        computed: {
            convertedValue() {
                let currentValue = {}
                this.itemValues.forEach(itemValue => {
                    if (itemValue) {
                        currentValue[itemValue.name] = itemValue.value
                    }
                })
                return currentValue
            }
        },
        watch: {
            value: {
                immediate: true,
                deep: true,
                handler(newValue) {
                    if (newValue && this.itemValuesChanged(newValue)) {
                        this.itemValues = Object.keys(newValue).filter(propertyName => {
                            return propertyName && propertyName !== ''
                        }).map(propertyName => {
                            return {
                                name: propertyName,
                                value: newValue[propertyName]
                            }
                        })
                    }
                },
                flush: 'sync'
            },
            itemValues: {
                immediate: true,
                deep: true,
                handler(newItemValues) {
                    if (!this.itemValuesChanging) {
                        this.itemValues = newItemValues
                        this.$emit('update:value', this.convertedValue)
                    }
                },
                flush: 'sync'
            }
        },
        methods: {
            itemValuesChanged(newValue) {
                let filledItemValues = this.itemValues.filter(itemValue => {
                    return itemValue
                })
                let valuePropertyNames = Object.keys(newValue)
                let itemValueNames = filledItemValues.map(itemValue => {
                    return itemValue.name
                })
                if (valuePropertyNames.length == itemValueNames.length) {
                    for (const valuePropertyName of valuePropertyNames) {
                        if (!itemValueNames.includes(valuePropertyName)) {
                            return true
                        }
                    }
                    for (const itemValue of filledItemValues) {
                        if (itemValue && newValue[itemValue.name] != itemValue.value) {
                            return true
                        }
                    }
                    return false
                }
                else {
                    return true
                }
            }
        }
    }
</script>
