import React from "react";
import useTableInput from "./hooks/useTableInput";
import { Table, Button, Dropdown, Header } from "semantic-ui-react";

const Dashboard = (sheetsData) => {
  
  // Make dynamic with Sheet tabs.
  const DropdownExampleDropdown = () => (
    <Dropdown text="Month">
      <Dropdown.Menu> 
        <Dropdown.Item text="January" />
        <Dropdown.Item text="February" />
        <Dropdown.Item text="March" />
        <Dropdown.Item text="April" />
        <Dropdown.Item text="May" />
        <Dropdown.Item text="June" />
        <Dropdown.Item text="July" />
        <Dropdown.Item text="August" />
        <Dropdown.Item text="September" />
        <Dropdown.Item text="October" />
        <Dropdown.Item text="November" />
        <Dropdown.Item text="December" />
      </Dropdown.Menu>
    </Dropdown>
  );

  return (
    <>
      <Table striped>
        <Table.Header>
          <Table.Row>
            <DropdownExampleDropdown />
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
            sheetsData.sheetsData.map((client) => {
              return <BuddysWorld client={client} />;
            })
          ) : (
            <Table.Row>
              <Table.Cell>Loading</Table.Cell>
              <Table.Cell>Data </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
      <div id="submitChangesButtonDiv">
        <Button color="blue" className="submitbutton">Submit Changes</Button>
        <Header id="endingborder" as="h3">
          Net Ending Portfolio Value for the Month: Numbers go here
        </Header>
      </div>
    </>
  );
};

function BuddysWorld({ client }) {
  const [
    withdrawalEditing,
    newWithdrawal,
    setNewWithdrawal,
    withDrawlHandler,
  ] = useTableInput();

  const [
    depositEditing,
    newDeposit,
    setNewDeposit,
    depositHandler,
  ] = useTableInput();

  return (
    <React.Fragment key={client.Id}>
      <Table.Row className={client.Id}>
        <Table.Cell>{client.Month}</Table.Cell>
        <Table.Cell>
          <h4>{client.clientName}</h4>
        </Table.Cell>
        <Table.Cell>£ {Number(client.startingBalance).toFixed(2)} </Table.Cell>
        <Table.Cell>{client.SureFireFee} </Table.Cell>
        <Table.Cell>£ {Number(client.NewNetBalance).toFixed(2)} </Table.Cell>
        <Table.Cell>{client.PercentageGain} </Table.Cell>
        <Table.Cell>
          {withdrawalEditing ? (
            <input
              onChange={(e) => setNewWithdrawal(e.target.value)}
              value={newWithdrawal}
              type="number"
            />
          ) : (
            Number(newWithdrawal) + Number(client.Withdrawal) + " "
          )}
          <button class="positive ui button" onClick={withDrawlHandler}>
            {withdrawalEditing ? "Confirm" : "Edit"}
          </button>
        </Table.Cell>
        <Table.Cell>
          {depositEditing ? (
            <input
              onChange={(e) => setNewDeposit(e.target.value)}
              value={newDeposit}
              type="number"
            />
          ) : (
            Number(newDeposit) + Number(client.Deposit) + " "
          )}
          <button class="negative ui button" onClick={depositHandler}>
            {depositEditing ? "Confirm" : "Edit"}
          </button>
        </Table.Cell>
        <Table.Cell>{client.NextMonthValue} </Table.Cell>
      </Table.Row>
    </React.Fragment>
  );
}

export default Dashboard;
