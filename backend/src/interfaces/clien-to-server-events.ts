export default interface ClientToServerEvents {
  auth: (username: string, reciever: string) => void;
  msg: (data: { message: string, sender: string, reciever: string }) => Promise<void>;
  addFriend: (sender: string, reciever: string) => void;
}