import React from "react";
import styles from './styles'
import path from 'path'
import { spawn } from 'child_process'

  function AddToWatchlist({setPopup}) {

    const url1 = 'https://www.amazon.co.uk/Cadbury-Dairy-Milk-Chocolate-Bar/dp/B07N7BG9WV/ref=sr_1_6?crid=3E2P0CTAAP8HT&keywords=dairy+milk&qid=1680979389&sprefix=dairymilk%2Caps%2C87&sr=8-6'
    const url2 = 'https://www.amazon.co.uk/SHOWKINGS-GT-730-Graphics-Computer/dp/B09PY6MK7X/ref=sr_1_1_sspa?keywords=gpu&qid=1681142991&sr=8-1-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1'
    function submit(){

        const pyPath = path.join(process.cwd(), 'python', 'amazon.py');
        const pythonProcess = spawn('python', [pyPath, url1, 0.3, 2.7, 'noah@gmail.com', '1234', 'Checkout-page','shipping', 1]);  

        pythonProcess.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
        });

        pythonProcess.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
        });

        pythonProcess.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
        });

        setPopup(false)
    }

    return (
      <div style={styles.containerMain}>
        {/* <p>Account</p>
        <p>drop down of account names</p>
        <p>url</p>
        <p>textbox for url</p>
        <p>max price including shipping and tax</p>
        <p>textbox for max price</p>
        <p>refresh rate</p>
        <p>dropdown input for refresh rate</p>
        <p>end point</p>
        <p>dropdown of endpoints, e.g. checkout, product page, shipping page</p>
        <p>Amount</p>
        <p>num input for amount</p>
        <p>proxy</p>
        <p>drop down of proxy pools</p> */}
        <button onClick={() => submit()}>
            <p>Add Item</p>
        </button>
      </div>
    );
  }
  
  export default AddToWatchlist;
  