import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import classes from "./Announcements.module.scss";

import PageBoilerplate from "../../components/page-boilerplate/PageBoilerplate";
import BirthdaysPanel from "../../components/birthdays-panel/BirthdaysPanel";

const Announcements = () => {
  const [token, setToken] = useState(undefined);
  const [userBirthdays, setUserBirthdays] = useState(undefined);

  const getData = async () => {
    await fetch(
      "https://test172v-b8264eda63d9.herokuapp.com/api/v1/users/get-birthdays",
      {
        method: "GET",

        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setUserBirthdays(data.payload);
      });
  };

  const cookies = document.cookie.split(";");

  useEffect(() => {
    for (let i = 0; i < cookies.length; i++) {
      if (cookies[i].startsWith("jwt=Bearer")) {
        setToken(cookies[i]);
      }
    }

    token !== undefined && getData();
  }, [token]);

  return (
    <PageBoilerplate>
      <BirthdaysPanel onUserBirthdays={userBirthdays} />

      <div className={classes["announcements-card"]}>
        <h2>Welcome</h2>
        <p>
          Welcome to our new web app! This innovative platform is specifically
          designed to streamline your daily tasks and enhance communication
          within our dynamic team. As an integral part of our hotel family, you
          can now access and update vital information seamlessly, monitor work
          schedules, connect with colleagues, and tap into resources to foster
          your professional growth. Our goal is to empower you, making your work
          life more efficient and enjoyable. With just a few clicks, the
          information you need is at your fingertips, whether you're managing
          rosters, updating records, or seeking internal support. Dive into this
          easy-to-navigate tool and experience a more connected and efficient
          work environment. Welcome aboard!
        </p>
      </div>

      <div className={classes["announcements-card"]}>
        <h2>Misty Glen Hotel: Embracing Transformation, Together</h2>
        <p>Dear Valued Misty Glen Hotel Team,</p>
        <p>
          As a family united by a shared passion for hospitality and a
          commitment to creating unforgettable guest experiences, we write to
          you today with both a tinge of sadness and a spark of excitement. Our
          cherished Misty Glen Hotel will be undergoing a period of
          transformation, and we are thrilled to share the details with each and
          every one of you.
        </p>
        <p>
          On <span className={classes.bold}>November 12th</span>, we will be
          temporarily closing our doors to embark on an extensive renovation
          project that will breathe new life into our beloved establishment.
          This decision has not been made lightly, but with careful
          consideration and a vision to elevate Misty Glen Hotel to
          unprecedented levels of excellence.
        </p>
        <p>
          We, the management, wish to take this opportunity to express our
          utmost gratitude for your unwavering dedication and exceptional
          service throughout the years. It is because of your tireless efforts,
          your genuine warmth, and your commitment to excellence that the Misty
          Glenn Hotel has earned a reputation as a paragon of luxury and
          hospitality in the industry.
        </p>
        <p>
          The forthcoming closure presents a unique opportunity for us to
          reevaluate every aspect of our hotel and to bring forth a new era of
          opulence, innovation, and guest-centricity. From the structural
          enhancements to the finest details of decor, this endeavor is an
          opportunity for us to shine even brighter and create a haven that
          exceeds the expectations of every guest who walks through our doors.
        </p>
        <p>
          We recognize that this transition may evoke mixed emotions, as the
          Misty Glenn Hotel has become more than just a place of work for all of
          us. It is a second home, where friendships were forged, and memories
          were shared. Rest assured, as we embrace this transformative period,
          we will do so together as a cohesive team, supporting one another
          every step of the way.
        </p>
        <p>
          During the closure, we encourage you to take this time for
          self-improvement, both personally and professionally. Training
          opportunities will be provided to expand your skill set, ensuring that
          we emerge from this period stronger and more versatile than ever
          before. Your well-being and growth remain at the forefront of our
          priorities, and we are committed to fostering a nurturing environment
          during this brief hiatus.
        </p>
        <p>
          As we embark on this journey of renewal, we invite you to share your
          ideas, thoughts, and aspirations for the future of Misty Glen Hotel.
          We firmly believe that your input is invaluable, as it reflects the
          heartbeat of our establishment and the essence of what makes it
          exceptional.
        </p>
        <p>
          On <span className={classes.bold}>February 2nd</span>, with great
          pride and excitement, we will reopen our doors, revealing a
          transformed Misty Glen Hotel. A momentous day that will mark the
          beginning of a new chapter, and we wholeheartedly invite you to be
          part of this joyous occasion.
        </p>
        <p>
          In the interim, rest assured that our human resources team will keep
          you informed of any developments and updates throughout the closure
          period. Should you have any questions or need support, we encourage
          you to reach out to them at any time.
        </p>
        <p>
          As the closing day draws near, let us embrace the journey ahead with
          optimism and enthusiasm. Together, we will make history, leaving an
          indelible mark on the world of hospitality, and continuing to create
          magical moments for our guests for generations to come.
        </p>
        <p>
          Thank you for your unwavering dedication and for being the heartbeat
          of Misty Glen Hotel. We look forward to embracing the future together
          and welcoming you back on
          <span className={classes.bold}> February 2nd</span> to an even more
          extraordinary and unforgettable Misty Glen Hotel.
        </p>
        <p>With heartfelt appreciation,</p>
        <p>Jacob McKenzie</p>
        <p>General Manager</p>
        <p>Misty Glen Hotel</p>
      </div>
    </PageBoilerplate>
  );
};

export default Announcements;
