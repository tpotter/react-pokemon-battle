import React, { useState, useEffect } from 'react';

function OpponentGeneration() {

    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        setTimeout(() => {


            setLoading(false);
        },5000);
    },[]);

    function renderView() {
        let viewJsx = null;
        
        if(loading) {
            viewJsx = <h1>Loading...</h1>;
        }

        return viewJsx;
    }

    return (
        <div id="opponent-generation-container" className="section-container">
            {
                renderView()
            }
        </div>
    );
}

export default OpponentGeneration;