import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import { rsvp } from "@/utils/apiUtils";
import { useRouter } from "next/router";

interface RsvpModalProps {
  onClose: () => void;
}

const RsvpModal = (props: RsvpModalProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [attending, setAttending] = useState(false);
  const [guest, setGuest] = useState("");
  const router = useRouter();
  const rsvpUser = async () => {
    try {
      const a = await rsvp(email, name, attending, guest);
      console.log(a);
      router.push("/rsvpSuccess");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Dialog open={true} onClose={props.onClose}>
      <DialogTitle>RSVP</DialogTitle>
      <DialogContent>
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
        <TextField
          label="Guest Name"
          value={guest}
          onChange={(e) => setGuest(e.target.value)}
        />
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
      </DialogContent>
    </Dialog>
  );
};

export default RsvpModal;
