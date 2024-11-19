/* eslint-disable react/prop-types */

import MessagesPane from './MessagesPane';
import { chats } from '../data';

export default function MyMessages() {
  return (

      <MessagesPane chat={chats[0]} />

  );
}
