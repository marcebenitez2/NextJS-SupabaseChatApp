"use client";
import React, { useEffect, useRef } from "react";
import { useMessage } from "./messages";

function InitMessages({ messages }) {
  const initState = useRef(false);

  useEffect(() => {
    if (!initState.current) {
      useMessage.setState({ messages });
    }

    initState.current = true;
  }, []);
  return <></>;
}

export default InitMessages;
