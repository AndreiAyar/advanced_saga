import "./App.css";
import ChatWrapper from "./components/Chat/ChatWrapper/ChatWrapper";
import UsersView from "./components/UsersView/Usersview";
import { Provider } from "react-redux";
import store from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <div>
        <ChatWrapper />
        <UsersView />
      </div>

      <div>
        <a href="http://localhost:3000/" target="_blank">
          New Instance{" "}
        </a>
      </div>
    </Provider>
  );
}

export default App;
