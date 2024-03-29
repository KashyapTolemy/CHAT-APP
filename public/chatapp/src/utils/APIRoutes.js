export const host = import.meta.env.VITE_BACKEND_URL;
export const registerRoute = `${host}/api/auth/register`;
export const loginRoute = `${host}/api/auth/login`;
export const chatRoute = `${host}/api/auth/chat`;
export const SetAvatarRoute = `${host}/api/auth/setavatar`;
export const allUsersRoute = `${host}/api/auth/allusers`;
export const sendMessageRoute = `${host}/api/messages/addmsg`;
export const getAllMessageRoute = `${host}/api/messages/getmsg`;
