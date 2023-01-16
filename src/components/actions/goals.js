import API from "goals-todos-api";

const ADD_GOAL = "ADD_GOAL";
const REMOVE_GOAL = "REMOVE_GOAL";


function addGoal (goal) {
    return {
        type : ADD_GOAL,
        goal,
    }
};

function removeGoal(id) {
    return {
        type: REMOVE_GOAL,
        id,
    };
};

export function handleAddGoal(name, cb) { //cb refers to callback export function where we reset the value
    return (dispatch) => {
        return API.saveGoal(name)
        .then((goal)=> { 
           dispatch(addGoal(goal));
           cb();
        })
        .catch(()=> {
            alert("An error occured. Try again.");
        });
    };
};

export function handleDeleteGoal (goal) {
    return (dispatch) => {
        dispatch(removeGoal(goal.id));
        return API.deleteGoal(goal.id)
        .catch(()=> {
            dispatch(addGoal(goal));
            alert("An error occured. Try again.")
        });
    };
};