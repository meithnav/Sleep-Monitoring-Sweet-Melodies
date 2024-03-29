import React, { useEffect, useState, useContext } from "react";
import { Chart as ChartJS, registerables } from "chart.js";
import { Line, Bar, Chart } from "react-chartjs-2";
import axios from "axios";
import { UserContext } from "../../utils/UserContext";
// import { intensity } from "../../data/data";
import LoaderComp from "../LoaderComp";
import { LoadingContext } from "../../utils/LoadingContext";

ChartJS.register(...registerables);

let labels;
// let value;

export default function IntensityChart({ value, setValue }) {
  const { user } = useContext(UserContext);
  const [intensity, setIntensity] = useState([]);
  const [moveLS, setMoveLS] = useState(0);
  const [moveRS, setMoveRS] = useState(0);
  let moveL=0;
  let moveR=0;

  const { isLoading, setIsLoading } = useContext(LoadingContext);

  //   let labels = intensity?.map(function (x) {
  //     return x * 30;
  //   });

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`/frame-capture/give-data/`, {
        headers: {
          Authorization: `Token ${user}`,
        },
      })
      .then((res) => {
        setIntensity(res.data);
        // console.log("INTENSITY: ", res.data);
        setIsLoading(false);
      }).catch = (err) => {
      console.log(err);
    };
  }, []);

  useEffect(() => {
    setIsLoading(true);

    labels = intensity.map(function (x) {
      return x.id * 30;
    });

    setValue(
      intensity.map(function (x) {
        return x.datapoints;
      })
    );

    setValue(
      intensity.map(function (x) {
        return x.datapoints;
      })
    );

    intensity.map((ele) => {
      // console.log(ele.movement);
      if (ele.movement === "Left") {
        setMoveLS(()=> (moveLS + 1));
        // moveL+=1;
        // console.log("LEFT : ", moveL);
      } else if (ele.movement === "Right") {
        setMoveRS(()=> (moveRS + 1));
        // moveR+=1
        // console.log("RIGHT : ", moveR);
      }

      // setMoveLS(moveL);
            // setMoveRS(moveR);


    });

    console.log("LABELS : ", labels);
    console.log("VALUES : ", value);

    setIsLoading(false);
  }, [intensity]);

  useEffect(() => {
    // console.log("LEFT : ", moveL);
    // console.log("RIGHT : ", moveR);
    setIsLoading(false);
    //  window.location.reload(false);
  }, [value]);
  return (
    <div className="durationChart">
      <h1>Intensity of Movments Chart</h1>
      <Line
        data={{
          labels: labels,
          datasets: [
            {
              label: "INTENSITY OF MOVEMENTS WHILE ASLEEP",
              data: value,
              backgroundColor: [
                "rgba(25, 99, 132, 0.8)",
                "rgba(54, 162, 235, 0.8)",
                "rgba(255, 206, 86, 0.8)",
                "rgba(75, 192, 192, 0.8)",
                "rgba(153, 102, 255, 0.8)",
                "rgba(255, 159, 64, 0.8)",
                "rgba(225, 99, 132, 0.8)",
              ],
              borderColor: [
                "rgba(25, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
                "rgba(225, 99, 132, 0.8)",
              ],
              borderWidth: 1,
            },
          ],
        }}
        options={{
          maintainAspectRatio: true,
          scales: {
            // x: [
            //   {
            //     gridLines: {
            //       display: true,
            //     },
            //     type: "time",
            //     time: {
            //       unit: "minute",
            //       unitStepSize: 30,
            //       displayFormats: {
            //         minute: "HH:mm",
            //       },
            //       // min: firstprettyTime, // <- moment js object
            //     },
            //   },
            // ],
            y: {
              // max: 24,
              //   min: 0,
              ticks: {
                beginAtZero: false,
              },
            },
          },
        }}
        height={180}
        width={380}
      />

      {/* <div className="movement">
        <h1>BODY MOVEMENTS OBSERVED </h1>
        <div>
          <h3 className="label">LEFT : </h3>
          <span>{moveLS}</span>
        </div>
        <div>
          <h3 className="label">RIGHT : </h3>
          <span>{moveRS}</span>
        </div>
      </div> */}
    </div>
  );
}
