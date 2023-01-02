export default {
	install(Vue) {
		registerVueComponent('web-designer-component-designer', require('./ComponentDesigner/Component.vue').default, Vue)
		registerVueComponent('web-designer-page-designer', require('./WebPageDesigner/Component.vue').default, Vue)
		registerVueComponent('web-designer-designed-page', require('./Templates/Designed/Component.vue').default, Vue)

		require('./FormItems/register.js').default.install(Vue)
	}
};