import { useEffect, useState } from "react";

const CountDown = ({ onTimeUp }) => {
    const [count, setCount] = useState(300);
    const time_down = new Date(count * 1000).toISOString().substring(11, 19);

    useEffect(() => {
        if (count === 0) {
            onTimeUp();
            return;
        };
        const timer = setInterval(() => {
            setCount(count - 1);
        }, 1000);

        // setTimeout(() => {
        //     clearInterval(timer);
        // }, 5000);
        return () => {
            clearInterval(timer);
        }
    }, [count])

    return (
        <div className="countdown-container">
            {time_down}
        </div>
    )
}

export default CountDown;