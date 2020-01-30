import React from "react";
import { Ionicons } from "@expo/vector-icons";

export default function FavoriteButton(props) {
  const heartIconName = props.filled ? "md-heart" : "md-heart-empty"
  const heartIconColor = props.filled ? "red" : "grey";

  return <Ionicons name={heartIconName} size={25} color={heartIconColor} />;
}
