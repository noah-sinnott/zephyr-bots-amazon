import {generateId} from './generateId'

// const url1 = 'https://www.amazon.co.uk/Cadbury-Dairy-Milk-Chocolate-Bar/dp/B07N7BG9WV/ref=sr_1_6?crid=3E2P0CTAAP8HT&keywords=dairy+milk&qid=1680979389&sprefix=dairymilk%2Caps%2C87&sr=8-6';
const url2 = 'https://www.amazon.co.uk/SHOWKINGS-GT-730-Graphics-Computer/dp/B09PY6MK7X/ref=sr_1_1_sspa?keywords=gpu&qid=1681142991&sr=8-1-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1';

export function amazon(taskId, task, context, taskGroupId) {
  const id = generateId()
  window.electronAPI.amazonStart(id, [
    url2,
    0.3,
    2.7,
    'noah.sinnott12@gmail.com',
    '123456',
    'Checkout-page',
    'GB',
    'Noah Sinnott',
    '07484783803',
    'ln44hn',
    'st michaels house',
    'church street',
    'billinghay'
  ])

  window.electronAPI.amazonDataGood((event, pidId, data) => {
    if(pidId !== id) return
    console.log(`stdout: ${data}`, context, taskId, taskGroupId);
    const cleanStr = data.toString().replace(/[\r\n]+/gm, '');
    let notifs = context.data.database.taskGroups[taskGroupId].tasks[taskId].notifications;
    let newNotifs = [...notifs, cleanStr];
    let newDB = context.data.database;
    newDB.taskGroups[taskGroupId].tasks[taskId].notifications = newNotifs;
    context.updateData({ database: newDB })
  })

  window.electronAPI.amazonDataBad((event, pidId, data) => {
    if(pidId !== id) return
    console.error(`stderr: ${data}`);
  })

  window.electronAPI.amazonDataClose((event, pidId, data) => {
    if(pidId !== id) return
    console.log(`child process exited with code ${data}`);
    let newDB = context.data.database;
    newDB.taskGroups[taskGroupId].tasks[taskId].pythonPID = false;
    context.updateData({ database: newDB });
  })

  return id; 
}

export function kill(pid) {
  window.electronAPI.kill(pid)
}
