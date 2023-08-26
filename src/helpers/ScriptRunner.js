// const url1 = 'https://www.amazon.co.uk/Cadbury-Dairy-Milk-Chocolate-Bar/dp/B07N7BG9WV/ref=sr_1_6?crid=3E2P0CTAAP8HT&keywords=dairy+milk&qid=1680979389&sprefix=dairymilk%2Caps%2C87&sr=8-6';
// const url1 = 'https://www.amazon.co.uk/SHOWKINGS-GT-730-Graphics-Computer/dp/B09PY6MK7X/ref=sr_1_1_sspa?keywords=gpu&qid=1681142991&sr=8-1-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1';
const url1 = "https://www.amazon.co.uk/gp/product/B0BV9TD8SH/ref=ewc_pr_img_1?smid=A2UG920FDFK00D&psc=1"
// const url1 = "https://www.amazon.co.uk/Gigabyte-GeForce-4080-GAMING-Graphics/dp/B0BLT45YZ1/ref=sr_1_16?crid=1II73RX8V8FSZ&keywords=graphics+cards&qid=1692827193&sprefix=graph%2Caps%2C129&sr=8-16"

function getProxy(obj) {
  const keys = Object.keys(obj);
  const randomIndex = Math.floor(Math.random() * keys.length);
  const randomKey = keys[randomIndex];
  return obj[randomKey].ip  + ":" + obj[randomKey].port + ":" + obj[randomKey].username + ":" + obj[randomKey].password
}

export function amazon(taskId, taskGroupId, task, db) {
  let proxy = !task.proxy ?  "false" : getProxy(db.proxyGroups[task.proxy].proxies)
  let account = db.accounts[task.account]
  let billing = db.billing[task.billing]

  let data = JSON.stringify({
    proxy: proxy,
    visible: db.settings.visible,
    maxPrice: task.maxPrice, 
    refreshRate1: db.settings.refreshRate[0], 
    refreshRate2: db.settings.refreshRate[1], 
    wait1: db.settings.waitSpeed[0],
    wait2: db.settings.waitSpeed[1],
    typing1: db.settings.typingSpeed[0], 
    typing2: db.settings.typingSpeed[1], 

    url: task.url,

    email: account.username,
    password: account.password,

    name: billing.shippingFullName,
    number: billing.shippingNumber,
    addressPostCode: billing.shippingPostCode,
    addressLine1: billing.shippingAddressLine1,
    addressLine2: billing.shippingAddressLine2 == "" ? "false" : billing.shippingAddressLine2,
    addressCity: billing.shippingCity,
    addressRegion: billing.shippingRegion,

    billingPostCode: billing.billingPostCode,
    billingLine1: billing.billingAddressLine1,
    billingLine2: billing.billingAddressLine2 == "" ? "false" : billing.billingAddressLine2,
    billingCity: billing.billingCity,
    billingRegion: billing.billingRegion,

    billingCardNumber: billing.cardNumber,
    billingName: billing.cardHolderName,
    billingExpirationDate: billing.expiresAt,
    billingCVC: billing.CVC,
    billingPhoneNumber: billing.cardHolderNumber
  })

  window.electronAPI.amazonStart(taskId,taskGroupId, data)
}

export function kill(taskId) {
  window.electronAPI.kill(taskId)
}
