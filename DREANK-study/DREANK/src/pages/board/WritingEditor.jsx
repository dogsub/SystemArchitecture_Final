//import React,
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { v4 as uuidv4 } from "uuid"; // uuid 라이브러리 불러오기
import "./DetailBoard.css";

const WritingEditor = () => {
  const [id] = useState(uuidv4()); // ID 자동 생성
  const [title, setTitle] = useState("");
  const [editorData, setEditorData] = useState("");
  const navigate = useNavigate();

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setEditorData(data);
  };

  const handleSubmit = async () => {
    // 비동기 요청으로 데이터 전송
    await fetch("http://localhost:8080/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, title, content: editorData }),
    });

    // 데이터 전송 후 즉시 페이지 전환
    navigate("/board");
  };

  return (
    <div className="editor-container">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="title-input"
      />
      <CKEditor
        editor={ClassicEditor}
        data={editorData}
        onChange={handleEditorChange}
      />
      <div className="button-container">
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default WritingEditor;
