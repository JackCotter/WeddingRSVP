import {
  Alert,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import { useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import { rsvp } from "@/utils/apiUtils";
import { useRouter } from "next/router";
import { APIResponse } from "@/interfaces/apiInterfaces";

interface RsvpModalProps {
  onClose: () => void;
}

const RsvpModal = (props: RsvpModalProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [attending, setAttending] = useState(false);
  const [guest, setGuest] = useState("");
  const [errorBar, setErrorBar] = useState({ show: false, message: "" });
  const [needsGuest, setNeedsGuest] = useState(false);
  const router = useRouter();
  const rsvpUser = async () => {
    const a = await rsvp(email, name, attending, guest);
    console.log(a);
    if (a.status !== 200) {
      setErrorBar({ show: true, message: a.message });
      console.log(a);
    } else {
      router.push("/rsvpSuccess");
    }
  };
  return (
    <Dialog open={true} onClose={props.onClose}>
      <DialogTitle>RSVP</DialogTitle>
      <DialogContent>
        <Stack spacing={2} direction="column" style={{ minWidth: "500px" }}>
          {errorBar.show && (
            <Alert severity="error">
              {errorBar.message ? errorBar.message : "There was a server error"}
            </Alert>
          )}
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            variant={needsGuest ? "contained" : "outlined"}
            onClick={() => setNeedsGuest(!needsGuest)}
            startIcon={needsGuest && <CheckIcon />}
          >
            Bringing a guest?
          </Button>
          {needsGuest && (
            <TextField
              label="Guest Name"
              value={guest}
              onChange={(e) => setGuest(e.target.value)}
            />
          )}
          <Button
            variant={attending ? "contained" : "outlined"}
            onClick={() => setAttending(!attending)}
            startIcon={attending && <CheckIcon />}
          >
            Attending
          </Button>
          <Button variant="contained" onClick={rsvpUser}>
            {" "}
            Submit{" "}
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default RsvpModal;
