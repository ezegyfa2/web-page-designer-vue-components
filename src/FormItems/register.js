export default {
    install(Vue) {
        let prefix = 'web-designer'
		registerVueComponent(prefix + '-checkbox-input', require('./Inputs/CheckBox/Component.vue').default, Vue)
		registerVueComponent(prefix + '-number-input', require('./Inputs/Number/Component.vue').default, Vue)
		registerVueComponent(prefix + '-text-input', require('./Inputs/Text/Component.vue').default, Vue)
		registerVueComponent(prefix + '-text-input-without-label', require('./Inputs/TextWithoutLabel/Component.vue').default, Vue)
		registerVueComponent(prefix + '-email-input', require('./Inputs/Email/Component.vue').default, Vue)
		registerVueComponent(prefix + '-datetime-input', require('./Inputs/DateTime/Component.vue').default, Vue)
		registerVueComponent(prefix + '-array-input', require('./Array/Component.vue').default, Vue)
		registerVueComponent(prefix + '-section-input', require('./Section/Component.vue').default, Vue)
		registerVueComponent(prefix + '-property-input', require('./Property/Component.vue').default, Vue)
		registerVueComponent(prefix + '-object-input', require('./Object/Component.vue').default, Vue)
		registerVueComponent(prefix + '-select', require('./Select/Component.vue').default, Vue)
		registerVueComponent(prefix + '-select-without-label', require('./SelectWithoutLabel/Component.vue').default, Vue)
		registerVueComponent(prefix + '-textarea', require('./TextArea/Component.vue').default, Vue)
    }
}