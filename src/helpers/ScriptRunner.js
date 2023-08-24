// const url1 = 'https://www.amazon.co.uk/Cadbury-Dairy-Milk-Chocolate-Bar/dp/B07N7BG9WV/ref=sr_1_6?crid=3E2P0CTAAP8HT&keywords=dairy+milk&qid=1680979389&sprefix=dairymilk%2Caps%2C87&sr=8-6';
// const url1 = 'https://www.amazon.co.uk/SHOWKINGS-GT-730-Graphics-Computer/dp/B09PY6MK7X/ref=sr_1_1_sspa?keywords=gpu&qid=1681142991&sr=8-1-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1';
const url1 = "https://www.amazon.co.uk/gp/product/B0BV9TD8SH/ref=ewc_pr_img_1?smid=A2UG920FDFK00D&psc=1"
// const url1 = "https://www.amazon.co.uk/Gigabyte-GeForce-4080-GAMING-Graphics/dp/B0BLT45YZ1/ref=sr_1_16?crid=1II73RX8V8FSZ&keywords=graphics+cards&qid=1692827193&sprefix=graph%2Caps%2C129&sr=8-16"

export function amazon(taskId, task, context, taskGroupId) {

  window.electronAPI.amazonStart(taskId,taskGroupId, [
    'false',
    'true',
    30, 
    10, 
    0.1,
    1.7,
    0.1, 
    0.2, 

    url1,

    'noah.sinnott12@gmail.com',
    '123456',

    'Noah Sinnott',
    '07484783803',
    'ln44hn',
    'st michaels house',
    'church street',
    'billinghay',
    'Lincolnshire',

    'ln44hn',
    'st michaels house',
    'church street',
    'billinghay',
    'Lincolnshire',

    "4921819986286533",
    "Noah Sinnott",
    "06/26",
    "205",
    "07484783803"
  ])
}

export function kill(taskId) {
  window.electronAPI.kill(taskId)
}
