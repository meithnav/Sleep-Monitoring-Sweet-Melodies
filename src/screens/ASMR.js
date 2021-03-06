import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import toast from "react-hot-toast";
import { LoadingContext } from "../utils/LoadingContext";
import LoaderComp from "../components/LoaderComp";
import "../styles/home.css";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  width: "96%",
}));

export default function ASMR() {
  const [sounds, setSounds] = useState([]);
  const { isLoading, setIsLoading } = useContext(LoadingContext);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("/audio/get-sounds/")
      .then((res) => {
        setSounds(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  }, []);

  return (
    <>
      {isLoading ? (
        <LoaderComp />
      ) : (
        <>
          <h1 className="header">ASMR</h1>
          <Box sx={{ flexGrow: 1, padding: 3 }}>
            <Grid container spacing={4}>
              {sounds.map((sound, index) => (
                <Grid
                  item
                  xs={3}
                  key={sound.id}
                  data-aos={index % 4 == 0 ? "fade-right" : "fade-left"}
                  data-aos-duration="500"
                  data-aos-delay="300"
                >
                  <Item>
                    <iframe
                      width="300"
                      height="480"
                      src={`https://www.youtube.com/embed/${sound.embed_code}`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title="Embedded youtube"
                    />
                  </Item>
                </Grid>
              ))}
            </Grid>
          </Box>
        </>
      )}
    </>
  );
}
