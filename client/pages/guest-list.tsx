import { getGuestList } from "@/utils/apiUtils";
import {
  Button,
  CircularProgress,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import Close from "@mui/icons-material/Close";

interface GuestListI {
  name: string;
  email: string;
  guest: string;
  attending: string;
  song: string;
  diet: string;
}

const GuestList = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [guestList, setGuestList] = useState<GuestListI[]>([
    /*{
      name: "sdf",
      email: "sdf",
      guest: "",
      attending: "true",
      song: "",
      diet: "",
    },
    {
      name: "sdf",
      email: "sdf",
      guest: "sdf",
      attending: "true",
      song: "song",
      diet: "diet",
    },*/
  ]);

  const queryGuestList = async () => {
    const guestList: any = await getGuestList(username, password);
    if (guestList.status !== 200) {
      throw new Error(guestList.message);
    }
    return guestList.guests;
  };

  const { mutate: getGuestListMutate, isLoading } = useMutation(
    queryGuestList,
    {
      onSuccess: (result: any) => {
        setGuestList(
          result.map((guest: any) => {
            return {
              name: guest.name,
              email: guest.email,
              guest: guest.guest,
              attending: guest.attending,
              song: guest.song,
              diet: guest.dietaryRestrictions,
            };
          })
        );
      },
      onError: (error: any) => {
        console.log(error);
      },
    }
  );

  return (
    <div style={{ width: "100%", margin: "8px" }}>
      <h1>Guest List</h1>
      {guestList && guestList.length == 0 && (
        <div style={{ background: "white" }}>
          <Stack direction="column" spacing={2}>
            <TextField
              label="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              sx={{ maxWidth: "20%" }}
            />
            <TextField
              label="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ maxWidth: "20%" }}
            />
            <Stack direction="row" spacing={2}>
              <Button variant="contained" onClick={() => getGuestListMutate()}>
                {" "}
                Get Guest List{" "}
              </Button>
            </Stack>
            {isLoading && <CircularProgress />}
          </Stack>
        </div>
      )}
      {guestList && guestList.length > 0 && (
        <div>
          <TableContainer style={{ display: "flex", justifyContent: "center" }}>
            <Table sx={{ width: "50%" }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Email</TableCell>
                  <TableCell align="right">Guest</TableCell>
                  <TableCell align="right">Attending</TableCell>
                  <TableCell align="right">Song Request</TableCell>
                  <TableCell align="right">Dietary Restriction</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {guestList.map((row) => (
                  <TableRow
                    key={row.email}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.email}</TableCell>
                    <TableCell align="right">
                      {row.guest !== "" ? row.guest : <CloseIcon />}
                    </TableCell>
                    <TableCell align="right">
                      {row.attending === "true" ? <CheckIcon /> : <CloseIcon />}
                    </TableCell>
                    <TableCell align="right">
                      {row.song !== "" ? row.song : "-"}
                    </TableCell>
                    <TableCell align="right">
                      {row.diet !== "" ? row.diet : "-"}
                    </TableCell>
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
