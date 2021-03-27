import axios from "axios";

// Goal: Take sheet values and determine if its a loss/gain and update sheets/back
// Parms: sheetsData, account starting value, current month
// No return, updates values to sheetsData and backend through puts

function calculateNewValues(endingBalance,startingValue,sheetsData,setSheetsData,setIsLoading,currentMonth) {
      let totalProfit = Number(endingBalance) - startingValue;
      let clients = sheetsData;
      let requestArray = [];
      let sureFiresCut = 0;
      let atALossBalance = Number(endingBalance);

      // Use Total Profit to determine if this needs to be a loss calculation or a gain.
      //This will basically just take in all clients values and reduce them without surefire fee.
      if (totalProfit > 0) {
        for (let i = 0; i < clients.length; i++) {
          //Calculate regular client
          let clientStartingValue = Number(clients[i].startingBalance);
          let clientsCut =
            (clientStartingValue / startingValue) *
            totalProfit *
            (1 - Number(clients[i].SureFireFee));
          sureFiresCut +=
            (clientStartingValue / startingValue) * totalProfit - clientsCut;

          let percentGained = clientsCut / clientStartingValue;
          clientsCut += clientStartingValue;
          requestArray.push(
            axios.put(
              `https://api.steinhq.com/v1/storages/60514b53f62b6004b3eb6770/${currentMonth}`,
              {
                condition: { Id: clients[i].Id },
                set: {
                  NewNetBalance: clientsCut,
                  PercentageGain: percentGained,
                },
              }
            )
          );
        }
        axios.all(requestArray).then(() => {
          axios
            .get(
              `https://api.steinhq.com/v1/storages/60514b53f62b6004b3eb6770/${currentMonth}?search={"Id":"0"}`
            )
            .then((res) => {
              sureFiresCut += Number(res.data[0].NewNetBalance);
              axios
                .put(
                  `https://api.steinhq.com/v1/storages/60514b53f62b6004b3eb6770/${currentMonth}`,
                  {
                    condition: { Id: "0" },
                    set: {
                      NewNetBalance: sureFiresCut,
                    },
                  }
                )
                .then((need) => {
                  axios
                    .get(
                      `https://api.steinhq.com/v1/storages/60514b53f62b6004b3eb6770/${currentMonth}`
                    )
                    .then((response) => {
                      setSheetsData(response.data);
                      setIsLoading(false);
                    });
                });
            });
        });
      } else {
        for (let i = 0; i < clients.length; i++) {
          //Go through each client
          //Calculate regular client
          let clientStartingValue = Number(clients[i].startingBalance); // Gets their starting balance for the month
          let clientsCut =(clientStartingValue / startingValue) * atALossBalance; // Sees how much of the portfolio they are entitled too
          let percentageLoss = (1 - clientsCut/clientStartingValue) * -1; //Calculates the negative value of the loss in %
          requestArray.push(
            axios.put(
              `https://api.steinhq.com/v1/storages/60514b53f62b6004b3eb6770/${currentMonth}`,
              {
                condition: { Id: clients[i].Id },
                set: {
                  NewNetBalance: clientsCut,
                  PercentageGain: percentageLoss,
                },
              }
            )
          );
        }
        axios.all(requestArray).then(() => {
          axios
            .get(
              `https://api.steinhq.com/v1/storages/60514b53f62b6004b3eb6770/${currentMonth}`
            )
            .then((response) => {
              setSheetsData(response.data);  // Sets Sheet data to show to new values to screen
              setIsLoading(false);  // Stops loading on click of submit button
            });
        });
      }
    }

export default calculateNewValues