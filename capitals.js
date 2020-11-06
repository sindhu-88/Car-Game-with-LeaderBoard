var state;
function setup()
{
    stateObj = [
    {
        State: "Karnataka",
        Food: "Bisibelebath"
    },
    {
        State: "Punjab",
        Food: "Sarson Ka Saag"
    },
    {
        State: "New Delhi",
        Food: "Paranthas"
    }
    ]   

    for(var i in stateObj)
    {
        console.log(stateObj[i].State+" "+stateObj[i].Food);
    }

}

function draw()
{
    background("black");

    
}