import store from "store";

const storeUtils = {
 saveUser(user) {
  store.set('user', user)
 },
 getUser() {
  return store.get('user')
 },
 removeUser() {
  store.remove('user')
 }
}

export default storeUtils