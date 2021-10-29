import React, { PureComponent } from "react";

export default class EnemyAvatar extends PureComponent {
    render() {
        let faint = this.props.enemyFaint;
        let anim;
        if (faint === true) {
            anim = "animated fadeOut slow";
        }
        if (faint === false) {
            anim = "animated zoomIn slow";
        }
        if (faint === "") {
            anim = "hide";
        }
        return ( 
            <div className = { anim } >
            <img className = "avatar"
                src = "https://dinosols.app/images/posher.png"
                alt = "" />
            </div>
        );
    }
}