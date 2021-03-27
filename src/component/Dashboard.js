import React,{useState} from "react";
import axios from "axios";
import AccountAdjustment from './utils/accountAdjustment.js'

import { monthsDropdownData,currentMonth,currentYear} from "../consts/constants";

import { Table,Select } from "semantic-ui-react";

const Dashboard = (props) => {
  const { sheetsData, setSheetsData } = props;
  const [dropDownHolder,setDropDownHolder] = useState(currentMonth)

const handleDropdown = e => {
    let selectedMonth = e+" "+currentYear
    if(selectedMonth==="May2021"){
      selectedMonth="May 2021"
    }
    setDropDownHolder(selectedMonth)
    const getData = () => {
      axios
        .get(
          `https://api.steinhq.com/v1/storages/60514b53f62b6004b3eb6770/${selectedMonth}`
        )
        .then((response) => {
          let unSortedSheet = response.data
          unSortedSheet.sort((a, b) => {
            return a.Id - b.Id;
          });
          setSheetsData(unSortedSheet)
        })    
    }
    getData();
  }

const MonthDropDown = () => (
    <Select
      fluid
      selection
      options={monthsDropdownData}
      onChange={(e)=>handleDropdown(e.target.innerText)}
      defaultValue={dropDownHolder}
    />
);
  return (
    <>
      <Table striped className="testforDommy">
        <Table.Header>
          <Table.Row>
            <MonthDropDown />
            <Table.HeaderCell>
              <h3>Client Name</h3>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <h3>Starting Monthly Balance</h3>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <h3>Sure Fire Fee</h3>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <h3>New Net Balance</h3>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <h3>Percentage Gain</h3>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <h3>Withdrawal</h3>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <h3>Deposit</h3>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <h3>Next Months Balance</h3>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {sheetsData ? (
            sheetsData.map((client) => {
              return <AccountAdjustment client={client} />;
            })
          ) : (
            <Table.Row>
              <Table.Cell>Loading</Table.Cell>
              <Table.Cell>Data </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </>
  );
};



export default Dashboard;
