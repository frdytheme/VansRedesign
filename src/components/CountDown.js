import React from "react";
import Countdown from "react-countdown";

function CountDown() {
  return (
    <>
      <Countdown
        date={Date.now() + 120000}
        renderer={(props) => (
          <div className="auth_timer">
            남은시간 - {props.minutes.toString().padStart(2, "0")}:
            {props.seconds.toString().padStart(2, "0")}초
          </div>
        )}
      />
    </>
  );
}

export default React.memo(CountDown);
