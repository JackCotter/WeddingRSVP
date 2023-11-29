import { useEffect, useState } from "react";
import { Alert, Button, Stack, Typography } from "@mui/material";
import RsvpModal from "@/components/modals/rsvpModal";
import style from "@/styles/Home.module.css";
import { ImportantInfoCard } from "@/components/importantInfoCard";
import infoImg from "@/public/main-mobile.jpg";
import { useRSVP } from "@/components/context/rsvpContext";
import CheckIcon from "@mui/icons-material/Check";
import { useRouter } from "next/router";
import { useAuth } from "@/components/context/authContext";

export default function Home() {
  const [showRsvpModal, setShowRsvpModal] = useState(false);

  const { rsvpSuccess } = useRSVP();
  const { authString } = useAuth();

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
              disabled={rsvpSuccess}
            >
              RSVP
            </Button>
          </div>
          {rsvpSuccess && (
            <Alert
              className={style["rsvp-success-alert"]}
              icon={<CheckIcon className={style["rsvp-success-icon"]} />}
            >
              {" "}
              RSVP Successful{" "}
            </Alert>
          )}
        </div>
        {showRsvpModal && (
          <RsvpModal
            authString={authString}
            onClose={() => setShowRsvpModal(false)}
          />
        )}
      </div>
      <ImportantInfoCard
        image={infoImg}
        title="Bar and Ammenities"
        body="We have reserved a block of rooms at the exquisite Harmony Heights
              Inn, a charming boutique hotel nestled amidst the scenic beauty of
              the countryside. Each room is elegantly appointed and features
              picturesque views, ensuring your stay is both comfortable and
              memorable. To secure your accommodation, please mention our
              wedding when booking your stay at the Harmony Heights Inn. We cant
              wait to share this special day with you, and we hope you enjoy
              your time in our picturesque town."
      />
      <ImportantInfoCard
        reversed={true}
        title="Bar and Ammenities"
        body="We have reserved a block of rooms at the exquisite Harmony Heights
              Inn, a charming boutique hotel nestled amidst the scenic beauty of
              the countryside. Each room is elegantly appointed and features
              picturesque views, ensuring your stay is both comfortable and
              memorable. To secure your accommodation, please mention our
              wedding when booking your stay at the Harmony Heights Inn. We cant
              wait to share this special day with you, and we hope you enjoy
              your time in our picturesque town."
      />
      <ImportantInfoCard
        title="Bar and Ammenities"
        body="We have reserved a block of rooms at the exquisite Harmony Heights
              Inn, a charming boutique hotel nestled amidst the scenic beauty of
              the countryside. Each room is elegantly appointed and features
              picturesque views, ensuring your stay is both comfortable and
              memorable. To secure your accommodation, please mention our
              wedding when booking your stay at the Harmony Heights Inn. We cant
              wait to share this special day with you, and we hope you enjoy
              your time in our picturesque town."
      />
    </Stack>
  );
}
