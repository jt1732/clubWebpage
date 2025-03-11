"use client";

import { useEffect } from "react";

function Bootstrap() {
    useEffect(() => {
        import("bootstrap/dist/js/bootstrap.bundle.min.js")
            .then(() => console.log("Bootstrap loaded"))
            .catch((err) => console.error("Bootstrap load error:", err));
    }, []);

    return null;
}

export default Bootstrap;
