import React, { useState, useEffect } from "react";
import history from "../history";
import axios from "axios";
const CreateAdminUser = () => {
  const [adminUserName, setAdminUserName] = useState({
    username: "",
    email: "",
    password: "",
  });

  const onChange = (e) => {
    const { value, name } = e.target;
    setAdminUserName({ ...adminUserName, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const userAdminName = {
      username: adminUserName.username,
      email: adminUserName.email,
      password: adminUserName.password,
    };
    console.log("userAdminName", userAdminName);

    axios
      .post("http://localhost:5000/adminUsers/add", userAdminName)
      .then((res) => console.log(res.data));
  };

  return (
    <div>
      <h3>Create New User</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Username: </label>
          <input
            type="text"
            required
            className="form-control"
            value={adminUserName.username}
            name="username"
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label>Email: </label>
          <input
            type="text"
            required
            className="form-control"
            value={adminUserName.email}
            name="email"
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label>Password: </label>
          <input
            type="text"
            required
            className="form-control"
            value={adminUserName.password}
            name="password"
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Create Admin User"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateAdminUser;
