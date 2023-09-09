import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Stack,
  Typography,
} from "@mui/material";
import RsvpModal from "@/components/modals/rsvpModal";
import style from "@/styles/Home.module.css";

export default function Home() {
  const [showRsvpModal, setShowRsvpModal] = useState(false);

  const scrollToBottom = () => {
    const targetPosition = window.innerHeight;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });
  };

  return (
    <Stack direction="column" className={style["container"]}>
      <div className={style["main-page"]}>
        <Button
          className={style["rsvp-button"]}
          onClick={() => setShowRsvpModal(true)}
          size="large"
          variant="contained"
        >
          RSVP
        </Button>
        {showRsvpModal && <RsvpModal onClose={() => setShowRsvpModal(false)} />}
        <Button onClick={scrollToBottom}>important info</Button>
      </div>
      <Box className={style["important-info"]}>
        <Typography className={style["cursive"]} variant="h1">
          here are some important things!
        </Typography>
        <Typography className={style["cursive"]} variant="h3">
          Accomodation Details:
        </Typography>
        <Card>
          <CardContent>Asfsdfsd</CardContent>
        </Card>
      </Box>
    </Stack>
  );
}
