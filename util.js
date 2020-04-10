module.exports = {
  age: function (timestamp) {
    const today = new Date()
    const birthDate = new Date(timestamp)

    let age = today.getFullYear() - birthDate.getFullYear()
    const month = today.getMonth() - birthDate.getMonth()

    if (month < 0 || month == 0 && today.getDate() <= birthDate.getDate()) {
      age = age - 1
    }

    return age

  },

  date: function (timestamp) {

    const date = new Date(timestamp)

    const year = date.getUTCFullYear()
    const month = `0${date.getUTCMonth() + 1}`.slice(-2)
    const day = `0${date.getUTCDate()}`.slice(-2)

    return {
      year: `${year}`,
      month: `${month}`,
      day: `${day}`,
      iso: `${year}-${month}-${day}`,
      birthDay: `${day}/${month}`
    }
  },

  grade: function (studentYear) {

    switch (studentYear) {
      case "5th-elementary": return `5º Ano do ensino fundamental`
        break
      case "6th-elementary": return `6º Ano do ensino fundamental`
        break
      case "7th-elementary": return `7º Ano do ensino fundamental`
        break
      case "8th-elementary": return `8º Ano do ensino fundamental`
        break
      case "1st-high": return `1º Ano do ensino médio`
        break
      case "2nd-high": return `2º Ano do ensino médio`
        break
      default: return `3º Ano do ensino médio`
    }


  }
}