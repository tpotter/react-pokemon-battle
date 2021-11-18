// TODO: Hacked in Enum converter until we build the Enum into the schema.
export function moveIdToName(move_id) {
    let name = "";
    switch (move_id) {
        case 0:
            name = "";
            break;
        case 1:
            name = "Slash";
            break;
        case 2:
            name = "Bite";
            break;
        case 3:
            name = "PackHunt";
            break;
        case 4:
            name = "Bite";
            break;
        case 5:
            name = "Crush";
            break;
        case 6:
            name = "GroupTear";
            break;
        case 7:
            name = "Claw";
            break;
        case 8:
            name = "Drop";
            break;
        case 9:
            name = "Swarm";
            break;
        case 10:
            name = "Stab";
            break;
        case 11:
            name = "Charge";
            break;
        case 12:
            name = "Herd Defense";
            break;
        case 13:
            name = "Laser";
            break;
        default:
            name = "";
    }

    return name;
}