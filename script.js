const chargeLevel = document.getElementById("charge-level");
const charge = document.getElementById("charge");
const chargingTimeRef = document.getElementById("charging-time");

window.onload = () => {
  //For browsers that don't support the battery status API
  if (!navigator.getBattery) {
    alert("Battery Status Api Is Not Supported In Your Browser");
    return false;
  }
};

navigator.getBattery().then((battery) => {
  function updateAllBatteryInfo() {
    updateChargingInfo();
    updateLevelInfo();
  }
  updateAllBatteryInfo();

  //When the charging status changes
  battery.addEventListener("chargingchange", () => {
    updateAllBatteryInfo();
  });

  //When the Battery Level Changes
  battery.addEventListener("levelchange", () => {
    updateAllBatteryInfo();
  });

  function updateChargingInfo() {
    if (battery.charging) {
      charge.classList.add("active");
      var Time = (battery.chargingTime/60).toFixed(0);
      if(Time<=0){
        chargingTimeRef.innerText = `fully charged`;
        timeRemaining = 'Not available';
      }else{
        //calculate the time remaining based on the current battery level and charging time
        var timeRemaining = Time* /*this is not working for now*/(1-battery.level);
        var hours = Math.floor(timeRemaining/60);
        var minutes = Math.floor(timeRemaining%60);
      chargingTimeRef.innerText = `${hours} hr ${minutes} min until fully charged`;}
    } else {
      charge.classList.remove("active");
      var batteryLevel = battery.level*100;
      if(batteryLevel<15){
        document.getElementById('charge').style.backgroundColor ="#db0011";
        alert("immediate charging required");
        // document.getElementById('charging-time').style.color="#db0011";
      }
      //Display time left to discharge only when it is a integer value i.e not infinity
      if (parseInt(battery.dischargingTime)) {
        let hr = parseInt(battery.dischargingTime / 3600);
        let min = parseInt(battery.dischargingTime / 60 - hr * 60);
        chargingTimeRef.innerText = `${hr}hr ${min}mins remaining`;
         document.getElementById('charging-time').style.color="rgb(62, 216, 62)"
        
        
      }
    }
  }

  //Updating battery level
  function updateLevelInfo() {
    let batteryLevel = `${parseInt(battery.level * 100)}%`;
    charge.style.width = batteryLevel;
    chargeLevel.textContent = batteryLevel;
  }
});
