import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/UserList.css";

function UserList() {
const [users, setUsers] = useState([]); //유저들을 리스트 형태로 저장장
const [searchUser, setSearchUser] = useState("");
//이메일과 토큰을 상단에 표시
const email = localStorage.getItem("email");
const token = localStorage.getItem("token");

useEffect(()=>{
  const handleUsers = async() => {
    try{
      const response = await axios.get("https://reqres.in/api/users",{
        headers: {
          "x-api-key": "reqres-free-v1"
        }
      });
      setUsers(response.data.data); //유저 목록을 setUsers로 저장장
    }
    catch(error){
      console.log("유저 정보가 없다")
    }
  };

  handleUsers();
}, []);

//검색창에 타이핑할 때마다 호출되는 함수
const handleChange = (e) => {
  setSearchUser(e.target.value); //입력된 값
};

//필터링- toLowerCase는 대소문자 구분 없이 비교하기 위해 사용
const matchvalue = users.filter((user) =>
  user.first_name.toLowerCase().includes(searchUser.toLowerCase()) ||
  user.email.toLowerCase().includes(searchUser.toLowerCase())
);

  return (
    <div className="user-container">
      <div className="user-info-box">
        <p><strong>이메일:</strong> {email}</p>
        <p><strong>토큰:</strong> {token}</p>
      </div>

      <h2 className="user-title">👥 유저 목록</h2>

      <input
        className="user-search"
        type="text"
        placeholder="이름 또는 이메일로 검색하세요"
        value={searchUser}
        onChange={handleChange}
      />

      {/* matchvalue 배열 반복*/}
      <div className="user-list">
        {matchvalue.map((user) => (
          <div className="user-card" key={user.id}>
            <img src={user.avatar} alt={`${user.first_name}의 프로필`} />
            <p><strong>{user.first_name} {user.last_name}</strong></p>
            <p>{user.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserList;