import React, {useState} from "react";
import Header from '../../Components/Header/Header'
import AddToWatchlist from '../../Components/AddToWatchlist/AddToWatchlist'

  function Home() {

    const [addItemPopup, setAddItemPopup] = useState(false)

    return (
      <div>
        <Header/>
        <p>Watclist</p>
        <button onClick={() => setAddItemPopup(true)}>
            <p>Add item</p>
        </button>
        {addItemPopup && <AddToWatchlist setPopup={setAddItemPopup}/>}
      </div>
    );
  }
  
  export default Home;
  