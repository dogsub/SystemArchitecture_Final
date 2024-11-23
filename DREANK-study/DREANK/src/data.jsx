export const users = [
  {
    name: "김주혜",
    username: "@steveEberger",
    avatar: "/static/images/avatar/2.jpg",
    online: true,
  },
  {
    name: "전지우",
    username: "@kathy",
    avatar: "/static/images/avatar/3.jpg",
    online: false,
  },
  {
    name: "이민우",
    username: "@phoenix",
    avatar: "/static/images/avatar/1.jpg",
    online: true,
  },
  {
    name: "송은정",
    username: "@eleanor",
    avatar: "/static/images/avatar/4.jpg",
    online: false,
  },
  {
    name: "정명서",
    username: "@kenny",
    avatar: "/static/images/avatar/5.jpg",
    online: true,
  },
  {
    name: "제현우",
    username: "@al",
    avatar: "/static/images/avatar/6.jpg",
    online: true,
  },
];

export const chats = [
  {
    id: "1",
    sender: "단톡방",
    messages: [
      {
        id: "1",
        content: "안녕하세요! Spring Boot 스터디 단톡방입니다:)",
        timestamp: "Wednesday 9:13am",
        sender: "You",
      },
      {
        id: "2",
        content: "안녕하세요! 반갑습니다ㅎㅎ",
        timestamp: "Wednesday 9:13am",
        sender: users[1],
      },
      {
        id: "3",
        timestamp: "Wednesday 9:15am",
        sender: users[0],
        content: "안녕하세요~~",
      },
      {
        id: "4",
        timestamp: "Wednesday 9:17am",
        sender: "You",
        content: "저희 스터디 장소 먼저 정해볼까요?",
      },
      {
        id: "5",
        timestamp: "Wednesday 9:18pm",
        sender: users[2],
        content: "네, 좋습니다~",
      },
      {
        id: "6",
        content: "에공관 인큐베이터는 어떠세요?",
        timestamp: "Wednesday 9:18pm",
        sender: users[3],
      },
      {
        id: "7",
        content: "오! 좋아용~~",
        timestamp: "Wednesday 9:19pm",
        sender: users[4],
      },
      {
        //   id: "3",
        //   timestamp: "Thursday 11:40am",
        //   sender: users[5],
        //   content: "Tech requirements.pdf",
        //   attachment: {
        //     fileName: "Tech requirements.pdf",
        //     type: "pdf",
        //     size: "1.2 MB",
        //   },
        // },
        // {
        id: "8",
        timestamp: "Wednesday 9:20pm",
        sender: "You",
        content: "저도 좋습니다~",
      },
      {
        id: "9",
        timestamp: "Wednesday 9:21pm",
        sender: users[4],
        content: "넵:) 그럼 다들 첫 스터디 때 뵈어요~!",
      },
      {
        id: "10",
        timestamp: "Wednesday 9:20pm",
        sender: users[0],
        content: "넵!!",
      },
      // {
      //   id: "11",
      //   timestamp: "Just now",
      //   sender: "You",
      //   content: "네~ 다들 수고하셨습니당~",
      // },
    ],
  },
];
