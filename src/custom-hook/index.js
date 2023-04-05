import React from "react";

export const useRunOnce = (callback, dependencies) => {
    const first_time = React.useRef(true);

    React.useEffect(() => {
        if (first_time.current) {
            callback();
            first_time.current = false;
        }
    }, dependencies)
}