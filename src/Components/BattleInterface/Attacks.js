import React from "react";

function Attacks(props) {
  return (
    <div className="attack-container">
      <div>
        <span
          className="move-pointer"
          onClick={() => props.handleAttackClick(props.details.attackName, props.details.attackDamage)}>
          { props.details.attackName }
        </span>
      </div>
    </div>
  );
}

export default Attacks;
