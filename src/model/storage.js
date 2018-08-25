let storage = {
  get: function (key) {
    return JSON.parse(localStorage.getItem(key))
  },
  set: function (key, val) {
    // localStorage没法写入对象
    return localStorage.setItem(key, JSON.stringify(val))
  },
  remove: function (key) {
    localStorage.removeItem(key)
  }
}

export default storage
