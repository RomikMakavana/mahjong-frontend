import { useDispatch } from "react-redux";
import { setNotification } from "./store/slices/notificationSlice";

export const useNotifications = () => {
  const dispatch = useDispatch();

  const notification = (message: string, type: 'success' | 'error' | 'info') => {
    dispatch(
      setNotification({
        message: message,
        type: type,
      })
    );
  };

  return { notification };
};
