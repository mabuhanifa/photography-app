import React from "react";
import { useApp } from "../../components/appContext";

export default function index() {
  const state = useApp();
  console.log(state)
  return <div>Items</div>;
}
