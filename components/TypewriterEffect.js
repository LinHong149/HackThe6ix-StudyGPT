import React, { useState, useEffect } from 'react';

export default function TypewriterEffect({ initialMessage }) {
    const [index, setIndex] = useState(0);
    const message = initialMessage.split(" ");
    const [currentMessage, setCurrentMessage] = useState("");

    useEffect(() => {
        const interval = setInterval(() => {
            if (index < message.length) {
                setCurrentMessage(prev => prev + " " + message[index]);
                setIndex(prevIndex => prevIndex + 1);
            } else {
                clearInterval(interval);
            }
        }, 100); // Change the time (in milliseconds) here to adjust the speed

        return () => clearInterval(interval);  // This clears the interval when the component is unmounted
    }, [index]);

    return (
        <div>
            {currentMessage}
        </div>
    )
}
