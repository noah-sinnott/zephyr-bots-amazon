// const url1 = 'https://www.amazon.co.uk/Cadbury-Dairy-Milk-Chocolate-Bar/dp/B07N7BG9WV/ref=sr_1_6?crid=3E2P0CTAAP8HT&keywords=dairy+milk&qid=1680979389&sprefix=dairymilk%2Caps%2C87&sr=8-6';
// const url1 = 'https://www.amazon.co.uk/SHOWKINGS-GT-730-Graphics-Computer/dp/B09PY6MK7X/ref=sr_1_1_sspa?keywords=gpu&qid=1681142991&sr=8-1-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1';
const url1 = "https://www.amazon.co.uk/gp/product/B0BV9TD8SH/ref=ewc_pr_img_1?smid=A2UG920FDFK00D&psc=1"
// const url1 = "https://www.amazon.co.uk/Gigabyte-GeForce-4080-GAMING-Graphics/dp/B0BLT45YZ1/ref=sr_1_16?crid=1II73RX8V8FSZ&keywords=graphics+cards&qid=1692827193&sprefix=graph%2Caps%2C129&sr=8-16"

export function amazon(taskId, task, taskGroupId) {

  window.electronAPI.amazonStart(taskId,taskGroupId, JSON.stringify({
    proxy: 'false',
    visible: 'true',
    maxPrice: 30, 
    refreshRate: 10, 
    wait1: 0.1,
    wait2: 1.7,
    typing1: 0.1, 
    typing2: 0.2, 

    url: url1,

    email: 'noah.sinnott12@gmail.com',
    password: '123456',

    name: 'Noah Sinnott',
    number: '07484783803',
    addressPostCode: 'ln44hn',
    addressLine1: 'st michaels house',
    addressLine2: 'church street',
    addressCity: 'billinghay',
    addressRegion: 'Lincolnshire',

    billingPostCode: 'ln44hn',
    billingLine1: 'st michaels house',
    billingLine2: 'church street',
    billingCity: 'billinghay',
    billingRegion: 'Lincolnshire',

    billingCardNumber: "4921819986286533",
    billingName:"Noah Sinnott",
    billingExpirationDate: "06/26",
    billingCVC: "205",
    billingPhoneNumber: "07484783803"
  })
  
  )
}

export function kill(taskId) {
  window.electronAPI.kill(taskId)
}
