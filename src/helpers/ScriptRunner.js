import path from 'path';
import { spawn } from 'child_process';

const url1 = 'https://www.amazon.co.uk/Cadbury-Dairy-Milk-Chocolate-Bar/dp/B07N7BG9WV/ref=sr_1_6?crid=3E2P0CTAAP8HT&keywords=dairy+milk&qid=1680979389&sprefix=dairymilk%2Caps%2C87&sr=8-6';
const url2 = 'https://www.amazon.co.uk/SHOWKINGS-GT-730-Graphics-Computer/dp/B09PY6MK7X/ref=sr_1_1_sspa?keywords=gpu&qid=1681142991&sr=8-1-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1';

let pythonProcesses = new Map();

export function amazon(taskId, task, context, taskGroupId) {
  const pyPath = path.join(process.cwd(), 'python', 'amazon.py');
  const pythonProcess = spawn('python', [
    '-u',
    pyPath,
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
  ]);

  pythonProcess.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
    const cleanStr = data.toString().replace(/[\r\n]+/gm, '');
    let notifs = context.data.database.taskGroups[taskGroupId].tasks[taskId].notifications;
    let newNotifs = [...notifs, cleanStr];
    let newDB = context.data.database;
    newDB.taskGroups[taskGroupId].tasks[taskId].notifications = newNotifs;
    context.updateData({ database: newDB });
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  pythonProcess.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
    pythonProcesses.delete(pythonProcess.pid); 
    let newDB = context.data.database;
    newDB.taskGroups[taskGroupId].tasks[taskId].pythonPID = false;
    context.updateData({ database: newDB });
  });

  pythonProcesses.set(pythonProcess.pid, pythonProcess);
  return pythonProcess.pid; 
}

export function kill(pid) {
  if (!pythonProcesses.has(pid)) {
    console.log(`Python process with pid ${pid} not running`);
    return;
  }

  const pythonProcess = pythonProcesses.get(pid);
  pythonProcess.stdin.write('End\n');
  pythonProcess.stdin.end();
  pythonProcesses.delete(pid); // Remove child process from Map by pid
}
