// export interface IMessage {
//   id: string;
//   message: string;
// }

export interface ICreateMessagePayload {
  text: string;
  userId: string;
  fileId: string;
}
