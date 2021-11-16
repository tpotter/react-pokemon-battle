import React from "react";

function DinosolAvatar(props) {
    const faint = props.faint;
    let anim;
    if (faint === true) {
        anim = "animated fadeOut slow";
    } else if(faint === false && props.dinoside === 'opponent') {
        anim = "animated zoomIn slow";
    } else if(faint === false && props.dinoside === 'player') {
        anim = "animated fadeInUp slow";
    } else {
        anim = "hide";
    }

    //console.log(props.dinoimage);
    return ( <
        div className = { anim } >
        <img className = "avatar"
            src = {props.dinoimage}
            alt = {props.dinoside + "-icon"} />
        </div>
    );
}

export default DinosolAvatar;