import CheckBox from "@react-native-community/checkbox";
import React, { useState } from "react";

function CheckboxComponent() {
  const [toggleCheckbox, setToggleCheckbox] = useState(false);

  return (
    <CheckBox
      disabled={false}
      value={toggleCheckbox}
      onValueChange={(newValue) => setToggleCheckbox(newValue)}
    />
  );
}

export default CheckboxComponent;
