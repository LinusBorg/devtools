import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    inited: 0,
    count: 0,
    lastCountPayload: null,
    date: new Date(),
    set: new Set(),
    map: new Map(),
    sym: Symbol('test'),
    object: {
      name: 'I am Object',
      number: 0,
      children: [
        {
          number: 0,
        },
      ],
    },
  },
  mutations: {
    TEST_INIT: state => state.inited++,
    INCREMENT: (state, payload) => {
      state.count++
      state.lastCountPayload = payload
    },
    DECREMENT: (state, payload) => {
      state.count--
      state.lastCountPayload = payload
    },
    UPDATE_DATE: state => {
      state.date = new Date()
    },
    TEST_COMPONENT: state => { /* noop */ },
    TEST_SET: state => {
      state.set.add(Math.random())
    },
    TEST_MAP: state => {
      state.map.set(`mykey_${state.map.size}`, state.map.size)
    },
  },
  actions: {
    ASYNC_INCREMENT: ({ commit }) => {
      return wait(100).then(() => {
        commit('INCREMENT', 1)
      })
    },
  },
  getters: {
    isPositive: state => state.count >= 0,
    hours: state => state.date.getHours(),
    errorGetter: () => {
      throw new Error('Error from getter')
    },
  },
  modules: {
    nested: {
      namespaced: true,
      state () {
        return {
          foo: 'bar',
        }
      },
      getters: {
        twoFoos: state => state.foo.repeat(2),
        dummy: () => {
          console.log('dummy getter was computed')
          return 'dummy'
        },
      },
      mutations: {
        ADD_BAR: (state) => {
          state.foo += 'bar'
        },
        REMOVE_BAR: (state) => {
          state.foo = state.foo.substring('bar'.length)
        },
      },
      modules: {
        nestedNested: {
          state () {
            return {
              answer: 42,
            }
          },
        },
      },
    },
    notNamespaced: {
      state () {
        return {
          hello: 'world',
        }
      },
      getters: {
        hello2: state => state.hello.repeat(2),
      },
    },
  },
})

function wait (ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}
