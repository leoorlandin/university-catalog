module.exports = {
  age: function (timestamp) {
    const today = new Date()
    const birthDate = new Date(timestamp)

    let age = today.getFullYear() - birthDate.getFullYear()
    const month = today.getMonth() - birthDate.getMonth()

    if (month <= 0 && today.getDate() <= birthDate.getDate()) {
      age -= 1
    }

    return age

  },

  date: function(timestamp){
    
    const date = new Date(timestamp)

    const year = date.getUTCFullYear()
    const month = `0${date.getUTCMonth()}`.slice(-2)
    const day = `0${date.getUTCDay()}`.slice(-2)

    console.log(`${year}-${month}-${day}`)
    return `${year}-${month}-${day}`
  }
}