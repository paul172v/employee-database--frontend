import React from "react";

import classes from "./BirthdaysPanel.module.scss";

const BirthdaysPanel = (props) => {
  return (
    <div className={classes["birthdays-card"]}>
      <h2>Upcoming Birthdays</h2>
      <div className={classes["birthday-items-wrapper"]}>
        {props.onUserBirthdays && props.onUserBirthdays.length > 0 ? (
          props.onUserBirthdays.map((user) => {
            const day = user[1].slice(3, 5);
            let month = user[1].slice(0, 2);

            if (month === "01") month = "Jan";
            if (month === "02") month = "Feb";
            if (month === "03") month = "Mar";
            if (month === "04") month = "Apr";
            if (month === "05") month = "May";
            if (month === "06") month = "Jun";
            if (month === "07") month = "Jul";
            if (month === "08") month = "Aug";
            if (month === "09") month = "Sep";
            if (month === "10") month = "Oct";
            if (month === "11") month = "Nov";
            if (month === "12") month = "Dec";

            return (
              <p
                key={user[0] + user[2] + user[3]}
              >{`${user[2]} ${user[3]}: ${month} ${day}`}</p>
            );
          })
        ) : (
          <p>There are currently no upcoming employee birthdays.</p>
        )}
      </div>
    </div>
  );
};

export default BirthdaysPanel;
