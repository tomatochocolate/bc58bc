/**
 *
 * @author 请叫我蛋蛋哥 <76573917@qq.com>
 * @created 2017/07/19 23:33
 */
import { isNumber, isString, isFunction, isUndefined } from '@/libs/utils'

export const _ = {
    version: '2.5.1',
    areas: {},
    apis: {},

    // utilities
    inherit (api, object) {
        for (let key of Object.keys(api)) {
            if (!object.hasOwnProperty(key)) {
                object[key] = api[key]
            }
        }
        return object
    },
    stringify (data) {
        return isUndefined(data) || isFunction(data) ? data + '' : JSON.stringify(data)
    },
    parse (string) {
        // if it doesn't parse, return as is
        try {
            return JSON.parse(string)
        } catch (error) {
            return string
        }
    },

    // extension hooks
    fn (name, fn) {
        _.storeAPI[name] = fn
        for (let api of Object.keys(_.apis)) {
            _.apis[api][name] = fn
        }
    },
    get (area, key) {
        return area.getItem(key)
    },
    set (area, key, string) {
        area.setItem(key, string)
    },
    remove (area, key) {
        area.removeItem(key)
    },
    key (area, key) {
        return area.key(key)
    },
    length (area) {
        return area.length
    },
    clear (area) {
        area.clear()
    },

    // core functions
    Store (id, area, namespace) {
        let store = _.inherit(_.storeAPI, (key, data, overwrite) => {
            if (arguments.length === 0) {
                return store.getAll()
            }
            // fn=data, alt=overwrite
            if (isFunction(data)) {
                return store.transact(key, data, overwrite)
            }
            if (!isUndefined(data)) {
                return store.set(key, data, overwrite)
            }
            if (isString(key) || isNumber(key)) {
                return store.get(key)
            }
            if (!key) {
                return store.clear()
            }
            // overwrite=data, data=key
            return store.setAll(key, data)
        })
        store._id = id
        try {
            let testKey = '_safariPrivate_'
            area.setItem(testKey, 'sucks')
            store._area = area
            area.removeItem(testKey)
        } catch (error) {}
        if (!store._area) {
            store._area = _.inherit(_.storageAPI, { items: {}, name: 'fake' })
        }
        store._ns = namespace || ''
        if (!_.areas[id]) {
            _.areas[id] = store._area
        }
        if (!_.apis[store._ns + store._id]) {
            _.apis[store._ns + store._id] = store
        }
        return store
    },
    storeAPI: {
        // admin functions
        area (id, area) {
            let store = this[id]
            if (!store || !store.area) {
                // new area-specific api in this namespace
                store = _.Store(id, area, this._ns)
                if (!this[id]) {
                    this[id] = store
                }
            }
            return store
        },
        namespace (namespace, noSession) {
            if (!namespace) {
                return this._ns ? this._ns.substring(0, this._ns.length - 1) : ''
            }
            let ns = namespace
            let store = this[ns]
            if (!store || !store.namespace) {
                // new namespaced api
                store = _.Store(this._id, this._area, this._ns + ns + '.')
                if (!this[ns]) {
                    this[ns] = store
                }
                if (!noSession) {
                    store.area('session', _.areas.session)
                }
            }
            return store
        },
        isFake () {
            return this._area.name === 'fake'
        },
        toString () {
            return `store${(this._ns ? `.${this.namespace()}` : '')}[${this._id}]`
        },

        // storage functions
        has (key) {
            if (this._area.has) {
                // extension hook
                return this._area.has(this._in(key))
            }
            return !!(this._in(key) in this._area)
        },
        size () {
            return this.keys().length
        },
        each (fn, and) {
            for (let i = 0, m = _.length(this._area); i < m; i++) {
                let key = this._out(_.key(this._area, i))

                if (key !== undefined) {
                    if (fn.call(this, key, and || this.get(key)) === false) {
                        break
                    }
                }
                // in case of removeItem
                if (m > _.length(this._area)) {
                    m--
                    i--
                }
            }
            return and || this
        },
        keys () {
            return this.each((key, list) => {
                list.push(key)
            }, [])
        },
        get (key, alt) {
            let string = _.get(this._area, this._in(key))
            // support alt for easy default mgmt
            return string !== null ? _.parse(string) : alt || string
        },
        getAll () {
            return this.each((key, all) => {
                all[key] = this.get(key)
            }, {})
        },
        transact (key, fn, alt) {
            let val = this.get(key, alt)
            let ret = fn(val)

            this.set(key, ret === undefined ? val : ret)
            return this
        },
        set (key, data, overwrite) {
            let item = this.get(key)

            if (item !== null && overwrite === false) {
                return data
            }
            return _.set(this._area, this._in(key), _.stringify(data), overwrite) || item
        },
        setAll (data, overwrite) {
            let changed

            for (let key of Object.keys(data)) {
                let item = data[key]

                if (this.set(key, item, overwrite) !== item) {
                    changed = true
                }
            }
            return changed
        },
        remove (key) {
            let item = this.get(key)

            _.remove(this._area, this._in(key))
            return item
        },
        clear () {
            if (!this._ns) {
                _.clear(this._area)
            } else {
                this.each(key => {
                    _.remove(this._area, this._in(key))
                }, 1)
            }
            return this
        },
        clearAll () {
            let area = this._area

            for (let id in _.areas) {
                if (_.areas.hasOwnProperty(id)) {
                    this._area = _.areas[id]
                    this.clear()
                }
            }
            this._area = area
            return this
        },

        // internal use functions
        _in (key) {
            if (!isString(key)) {
                key = _.stringify(key)
            }
            return this._ns ? this._ns + key : key
        },
        _out (key) {
            return this._ns ? key && key.indexOf(this._ns) === 0 ? key.substring(this._ns.length) : undefined : key
        }
    },
    storageAPI: {
        length: 0,
        has (key) {
            return this.items.hasOwnProperty(key)
        },
        key (i) {
            let c = 0

            for (let key of Object.keys(this.items)) {
                if (this.has(key) && i === c++) {
                    return key
                }
            }
        },
        setItem (key, value) {
            if (!this.has(key)) {
                this.length++
            }
            this.items[key] = value
        },
        removeItem (key) {
            if (this.has(key)) {
                delete this.items[key]
                this.length--
            }
        },
        getItem (key) {
            return this.has(key) ? this.items[key] : null
        },
        clear () {
            for (let key in this.list) {
                this.removeItem(key)
            }
        },
        toString () {
            return `${this.length} items in ${this.name}Storage`
        }
    }
}

// safely set this up (throws error in IE10/32bit mode for local files)
let store = _.Store('local', (() => {
    try {
        return localStorage
    } catch (error) {}
})())
// for completeness
store.local = store
// safely setup store.session (throws exception in FF for file:/// urls)
store.session = store.area('session', (() => {
    try {
        return sessionStorage
    } catch (error) {}
})())
// for extenders and debuggers...
store._ = _

export default store
