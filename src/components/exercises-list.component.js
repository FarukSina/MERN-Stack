import React, { useState, useEffect } from "react";
import history from "../history";
import { Link } from "react-router-dom";
import axios from "axios";
import Exercise from "./Exercise";
const Exercises = () => {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/exercises/")
      .then((res) => {
        setExercises((exercises) => [...exercises, ...res.data]);
      })
      .then((res) => history.push("/"))
      .catch((err) => {
        console.log("Error", err);
      });
  }, []);

  const deleteExercise = (id) => {
    axios
      .delete("http://localhost:5000/exercises/" + id)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log("Error: " + err));
    setExercises(exercises.filter((el) => el._id !== id));
    console.log("Exercises after delete", exercises);
  };

  // const exerciseList = () => {
  //   exercises.map((exercise) => {
  //     return (
  //       <Exercise
  //         exercise={exercise}
  //         deleteExercise={deleteExercise}
  //         key={exercise._id}
  //       />
  //     );
  //   });
  // };

  return (
    <div>
      <h3>All Exercises</h3>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Username</th>
            <th>Description</th>
            <th>Duration</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {exercises.map((e) => {
            return (
              <Exercise
                exercise={e}
                deleteExercise={deleteExercise}
                key={e._id}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Exercises;
