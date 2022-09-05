import React, { useEffect , useState} from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const App = () => {
  const [allData, setAllData] = useState([])

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    let { data } = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    setAllData(data)
  };

  return (
    <>
    <h1>Solution for Q2: Real World Problem by Swapnil Chaure</h1>
    <TableContainer>
      <Table
        sx={{ minWidth: 650 }}
        aria-label="simple table"
      >
        <TableHead   style={{ background: "lightgrey" }}>
          <TableRow>
            <TableCell><b>ID</b></TableCell>
            <TableCell >
              <b>Name</b>
            </TableCell>
            <TableCell >
              <b>Username</b>
            </TableCell>
            <TableCell >
              <b>Email</b>
            </TableCell>
            <TableCell >
              <b>Phone Number</b>
            </TableCell>
            <TableCell >
              <b>Company</b>
            </TableCell>
            <TableCell >
              <b>Website</b>
            </TableCell>
            <TableCell align="right">
              <b>Address</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allData.map(row =>
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell >
                {row.name}
              </TableCell>
              <TableCell >
                {row.username}
              </TableCell>
              <TableCell >
                {row.email}
              </TableCell>
              <TableCell>
                {row.phone}
              </TableCell>
              <TableCell >
                {row.comany?.name}
              </TableCell>
              <TableCell >
                {row.website}
              </TableCell>
              <TableCell align="right">
                {row.address?.street} {row.address?.city} {row.address?.zipcode}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
};

export default App;
