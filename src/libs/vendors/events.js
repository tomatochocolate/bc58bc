/**
 *
 * @author 请叫我蛋蛋哥 <76573917@qq.com>
 * @created 2018/09/30 14:59
 */
const install = (Vue, opts = {}) => {
    // Exit if the plugin has already been installed.
    if (install.installed) return

    // Create a `vm` to serve as our global event bus.
    const events = new Vue({
        methods: {
            /**
             * Emit the given event.
             * @param { String|Object } event
             * @param { ...* } args
             */
            emit (event, ...args) {
                this.$emit(event, ...args)
            },
            /**
             * Emit the given event.
             * @param { String|Object } event
             * @param { ...* } args
             */
            fire (event, ...args) {
                this.emit(event, ...args)
            },
            /**
             * Listen for the given event.
             * @param { String } event
             * @param { Function } callback
             */
            on (event, callback) {
                this.$on(event, callback)
            },
            /**
             * Listen for the given event.
             * @param { String } event
             * @param { Function } callback
             */
            listen (event, callback) {
                this.on(event, callback)
            },
            /**
             * Listen for the given event once.
             * @param { String } event
             * @param { Function } callback
             */
            once (event, callback) {
                this.$once(event, callback)
            },
            /**
             * Remove one or more event listeners.
             * @param { String } event
             * @param { Function } callback
             */
            off (event, callback) {
                this.$off(event, callback)
            },
            /**
             * Remove one or more event listeners.
             * @param { String } event
             * @param { Function } callback
             */
            remove (event, callback) {
                this.off(event, callback)
            }
        }
    })
    // Extend `Vue.prototype` to include our global event bus.
    Object.defineProperty(Vue.prototype, '$events', {
        get () {
            return events
        }
    })
    // Register a mixin that adds an `events` option to Vue 2.0 components.
    Vue.mixin({
        // Hook into the Vue 2.0 `beforeCreate` life-cycle event.
        beforeCreate () {
            // Exit if there's no `events` option.
            if (typeof this.$options.events !== 'object') return
            // Cache of events to bound functions for automatic unsubscriptions
            let eventMap = {}
            // Loop through each event.
            for (let key in this.$options.events) {
                // Assign event type and bound function to map
                eventMap[key] = this.$options.events[key].bind(this)
            }
            // Listen for the `hook:beforeMount` Vue 2.0 life-cycle event.
            this.$once('hook:beforeMount', () => {
                // Loop through each event.
                for (let key in eventMap) {
                    // Register a listener for the event.
                    events.$on(key, eventMap[key])
                }
            })
            // Listen for the `hook:beforeDestroy` Vue 2.0 life-cycle event.
            this.$once('hook:beforeDestroy', () => {
                // Loop through each event.
                for (let key in eventMap) {
                    // Register a listener for the event.
                    events.$off(key, eventMap[key])
                }
                // Release cache
                eventMap = null
            })
        }
    })
}

export default {
    install
}
