import React from "react";
import { useNavigate  } from 'react-router-dom'; 
import styles from './styles'
import amazonCheckout from '../../scripts/amazonCheckout'

  function AddToWatchlist({setPopup}: any) {

    const navigate = useNavigate();

    const url = 'https://www.amazon.co.uk/Cadbury-Dairy-Milk-Chocolate-Bar/dp/B07N7BG9WV/ref=sr_1_6?crid=3E2P0CTAAP8HT&keywords=dairy+milk&qid=1680979389&sprefix=dairymilk%2Caps%2C87&sr=8-6'

    function submit(){
        amazonCheckout('noah.sinnott123@gmail.com', '1234', url, 10, 5,'shipping', 1)
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
  