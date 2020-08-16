import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import history from "../history";
import axios from "axios";
const EditExercise = (props) => {
  const [exercises, setExercises] = useState({
    username: "",
    description: "",
    duration: 0,
    date: new Date(),
    users: [],
  });

  useEffect(() => {
    let tempExercise = { ...exercises };
    axios
      .get("http://localhost:5000/exercises/" + props.match.params.id)
      .then((response) => {
        console.log("response data", response.data);
        tempExercise = {
          ...tempExercise,

          username: response.data.username,
          description: response.data.description,
          duration: response.data.duration,
          date: new Date(response.data.date),
          users: ["asd"],
        };
        console.log("exercises", exercises);
      })
      .then((res) => {
        axios
          .get("http://localhost:5000/users/")
          .then((res) => {
            if (res.data.length > 0) {
              console.log("response users", res);

              tempExercise = {
                ...tempExercise,
                users: res.data.map((user) => user.username),
              };
            }
          })
          .then((res) => {
            console.log("USERS SETTED", tempExercise);
            setExercises(tempExercise);
          });
      })

      .catch((err) => console.log(err));
  }, [props.match.params.id]); /// [exercises] when we do it like that it works but it renders infinitly why?

  const onChange = (e) => {
    const { value, name } = e.target;
    setExercises({ ...exercises, [name]: value });
  };

  const onChangeDate = (date) => {
    setExercises({ ...exercises, date });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const exercise = {
      username: exercises.username,
      description: exercises.description,
      duration: exercises.duration,
      date: exercises.date,
    };
    console.log("exercise", exercise);
    axios
      .post(
        "http://localhost:5000/exercises/update/" + props.match.params.id,
        exercise
      )
      .then((res) => console.log(res.data))
      .then((res) => history.push("/"));
  };

  return (
    <div>
      <h3>Edit New Exercises</h3>
      <form onSubmit={onSubmit}>
        <div className={"form-group"}>
          <label>Username : </label>
          <select
            required
            name="username"
            className="form-control"
            value={exercises.username}
            onChange={onChange}
          >
            {exercises.users.map((user) => {
              return (
                <option key={user} value={user}>
                  {user}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-group">
          <label>Description: </label>
          <input
            name="description"
            type="text"
            required
            className="form-control"
            value={exercises.description}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label>Duration (in minutes)</label>
          <input
            name="duration"
            type="text"
            required
            className="form-control"
            value={exercises.duration}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label>Date :</label>
          <div>
            <DatePicker
              name="date"
              selected={exercises.date}
              onChange={onChangeDate}
            />
          </div>
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Edit Exercises"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
};
export default EditExercise;
