import { getGuestList } from "@/utils/apiUtils";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { useState } from "react";

interface GuestList {
  name: string;
  email: string;
  guest: string;
  attending: boolean;
}

const GuestList = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [guestList, setGuestList] = useState<GuestList[]>([]);

  const queryGuestList = async () => {
    const result: any = await getGuestList(username, password);
    if (result.status !== 200) {
      console.log(result);
    } else {
      setGuestList(result.data);
    }
  };

  return (
    <div style={{ width: "100%" }}>
      <h1>Guest List</h1>
      {guestList.length == 0 && (
        <div style={{ background: "white" }}>
          <TextField
            label="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button variant="contained" onClick={() => queryGuestList()}>
            {" "}
            Get Guest List{" "}
          </Button>
        </div>
      )}
      {guestList.length > 0 && (
        <div>
          <TableContainer style={{ display: "flex", justifyContent: "center" }}>
            <Table sx={{ width: "50%" }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Email</TableCell>
                  <TableCell align="right">Guest</TableCell>
                  <TableCell align="right">attending</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {guestList.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.email}</TableCell>
                    <TableCell align="right">{row.guest}</TableCell>
                    <TableCell align="right">{row.attending}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </div>
  );
};

export default GuestList;
