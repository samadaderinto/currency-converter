const amount = document.querySelector("[input-el]")
const convert = document.querySelector("[convert-btn]")
const select = document.querySelectorAll("[select-el]")


const dataSorted = []

class Convert {
  constructor(baseNumber, fromCountry, toCountry, amount) {
    this.baseNumber = baseNumber
    this.fromCountry = fromCountry
    this.toCountry = toCountry
    this.amount = amount
  }

  convertCurrency() {

    this.fromCountryToBaseCountryValue = (this.amount / this.fromCountry) * this.baseNumber

    this.results = (this.toCountry * this.fromCountryToBaseCountryValue) / this.baseNumber
    console.log(this.results)

  }
}

async function fetchData() {
  try {
    const request = await fetch("https://api.exchangerate.host/latest")
    return await request.json()
  } catch (error) {
    alert(error)
  }

}

fetchData()
  .then(symbols => {
    for (let data of Object.entries(symbols.rates)) {
      dataSorted.push(data)
    }


    dataSorted.forEach(a => {
      const html = `<option value=${a[1]}><svg><path></path></svg><span>${a[0]}</span></option>`
      select.forEach(select => {
        select.insertAdjacentHTML("beforeend", html)
        UpdateselectValue(select)
      })

    })

  })


function UpdateselectValue(element) {
  return [parseFloat(element.value)]
}


function UpdateAmountValue() {
  if (amount.value !== "") {
    return [parseFloat(amount.value)]
  }
}

select.forEach(select => select.addEventListener("change", UpdateselectValue(select)))

convert.addEventListener("click", () => {
  const a = UpdateselectValue(select[0])
  const b = UpdateselectValue(select[1])
  const c = UpdateAmountValue()
  const convertCurrency = new Convert(baseNumber = 1, a, b, c)
  convertCurrency.convertCurrency()
})

amount.addEventListener("change", UpdateAmountValue())