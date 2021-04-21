import { useState } from "react";


const AppState = (props) => {
  const [user, setUser] = useState(null);

  return (
    <AppState.Provider
      value={{
        user,
        setUser,
      }}
    >
      {props.children}
    </AppState.Provider>
  );
};

export default AppState;