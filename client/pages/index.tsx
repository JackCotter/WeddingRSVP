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
        <div className={style["hero-container"]}>
          <div className={style["hero-text-container"]}>
            <Typography variant="h1" className={style["hero-text"]}>
              {" "}
              Kali &
            </Typography>
            <Typography variant="h1" className={style["hero-text"]}>
              {" "}
              Colby{" "}
            </Typography>
          </div>
          <div className={style["button-container"]}>
            <Button className={style["info-button"]} onClick={scrollToBottom}>
              important info
            </Button>
            <Button
              className={style["rsvp-button"]}
              onClick={() => setShowRsvpModal(true)}
              size="large"
              variant="contained"
            >
              RSVP
            </Button>
          </div>
        </div>
        {showRsvpModal && <RsvpModal onClose={() => setShowRsvpModal(false)} />}
      </div>
      <Box className={style["important-info"]}>
        <Typography className={style["cursive"]} variant="h1">
          Important things!
        </Typography>
        <Stack direction="row" spacing={2}>
          <Stack direction="column">
            <Typography className={style["cursive"]} variant="h3">
              Accomodation Details:
            </Typography>
            <Typography className={style["cursive"]} variant="h5">
              We have reserved a block of rooms at the exquisite 'Harmony
              Heights Inn,' a charming boutique hotel nestled amidst the scenic
              beauty of the countryside. Each room is elegantly appointed and
              features picturesque views, ensuring your stay is both comfortable
              and memorable. To secure your accommodation, please mention our
              wedding when booking your stay at the 'Harmony Heights Inn.' We
              can't wait to share this special day with you, and we hope you
              enjoy your time in our picturesque town.
            </Typography>
          </Stack>
          <Stack direction="column">
            <Typography className={style["cursive"]} variant="h3">
              Bar and Ammenities:
            </Typography>
            <Typography className={style["cursive"]} variant="h5">
              We have reserved a block of rooms at the exquisite 'Harmony
              Heights Inn,' a charming boutique hotel nestled amidst the scenic
              beauty of the countryside. Each room is elegantly appointed and
              features picturesque views, ensuring your stay is both comfortable
              and memorable. To secure your accommodation, please mention our
              wedding when booking your stay at the 'Harmony Heights Inn.' We
              can't wait to share this special day with you, and we hope you
              enjoy your time in our picturesque town.
            </Typography>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
}
