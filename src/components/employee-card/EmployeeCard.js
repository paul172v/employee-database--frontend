import React, { useEffect, useState, useContext } from "react";

import { AiFillPhone } from "react-icons/ai";
import { MdEmail } from "react-icons/md";

import classes from "./EmployeeCard.module.scss";

import employeesDataContext from "../../context/employees-data-context";

const EmployeeCard = (props) => {
  const employeesDataCtx = useContext(employeesDataContext);

  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    setPhoto(`http://localhost:5000/public/img/user-photos/${props.photo}`);
  }, []);

  return (
    <div className={classes.card}>
      <div className={classes["image-wrapper"]}>
        <img
          className={classes.photo}
          src={photo !== null ? photo : "/img/user-photos/default.jpg"}
          alt={
            props.photo
              ? `${props.name} ${employeesDataCtx.photoCounter}`
              : "Default"
          }
        />
      </div>
      <div className={classes["text-wrapper"]}>
        <h3 className={classes["card-heading"]}>{props.name}</h3>
        <p className={classes["card-text"]}>
          {props.position || props.position}
        </p>
        <p className={classes["card-text"]}>
          {props.department || props.department}
        </p>
        {props.phone !== "N/A" && (
          <a href={`tel:+${props.phone}`} className={classes["card-telephone"]}>
            {props.phone} <AiFillPhone />
          </a>
        )}
        <a
          href="mailto:IsabellaGrant@Misty.com"
          className={classes["card-email"]}
        >
          {props.email} <MdEmail />
        </a>
      </div>
    </div>
  );
};

export default EmployeeCard;
