export default {
    namespaced: true,
    state: {
        count: 0
    },
    getters:{
        count(state){
            return state.count;
        },
        countHack(state){
            return state.count +245;
        }
    },
    mutations: {
        increment(state) {
            state.count++
        }
    },
    actions: {
        // les actions sont les application qui sont appeler
        // params est optionnel, c'est l'objet qui eest passé en paramètre
        increment(context, params) {
            var promise1 = new Promise(function (resolve, reject) {
                context.commit('increment'); // applique la mutation
                setTimeout(function () {
                    resolve("ok");
                    // reject(console.log(error,"error")) // renvoi une erreur
                }, 300);

            });

        },

    }
    // mutations, actions, getters...
}