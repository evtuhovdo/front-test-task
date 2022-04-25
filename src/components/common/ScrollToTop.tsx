import React, {useEffect, FC} from "react";
import {useLocation} from "react-router";

const ScrollToTop: FC = () => {
    const location = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    return <React.Fragment/>;
};

export default ScrollToTop;
