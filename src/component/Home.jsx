import React, { useEffect, useState } from "react";
import { AudioOutlined } from "@ant-design/icons";
import { Input, Row, Col } from "antd";
import axios from "axios";

const { Search } = Input;

const Home = () => {
  const [emojis, setEmojis] = useState([]);
  const [displayEmojis, setDisplayEmojis] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState(null);

  useEffect(() => {
    const fetchEmojis = async () => {
      try {
        const response = await axios.get(`https://emojihub.yurace.pro/api/all`);
        setEmojis(response.data);
      } catch (error) {
        console.error("Failed to fetch emojis:", error);
      }
    };
    fetchEmojis();
  }, []);

  const handleInputChange = (e) => {
    const text = e.target.value.toLowerCase();
    setSearchText(text);
    if (text) {
      filterEmojis(text);
    } else {
      setDisplayEmojis([]);
      setSelectedEmoji(null);
    }
  };

  const handleSearch = (value) => {
    setSearchText(value);
    filterEmojis(value, true);
  };

  const filterEmojis = (value, lock = false) => {
    if (value) {
      const filtered = emojis.filter((emoji) =>
        emoji.name.toLowerCase().startsWith(value)
      );
      setDisplayEmojis(filtered);
      if (lock && filtered.length > 0) {
        setSelectedEmoji(filtered[0]);
        setDisplayEmojis([filtered[0]]);
      }
    } else {
      setDisplayEmojis([]);
    }
  };

  const decodeHtmlCode = (htmlCode) => {
    const codePoint = parseInt(htmlCode.replace(/&#(\d+);/, "$1"));
    return String.fromCodePoint(codePoint);
  };

  const handleEmojiClick = (emoji) => {
    setSelectedEmoji(emoji);
    setSearchText(emoji.name);
    setDisplayEmojis([]);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#33121d",
      }}
    >
      <div
        style={{
          maxWidth: "1000px",
          width: "100%",
          color: "white",
          background: "#33121d",
        }}
      >
        <h1 style={{ textAlign: "center", color: "white" }}>
          World Of Emojii.....
        </h1>
        <Row justify="center">
          <Col xs={24} sm={18} md={12} lg={10} xl={8}>
            <Search
              className="search-input"
              placeholder="Input search text"
              allowClear
              enterButton="Search"
              size="large"
              onChange={handleInputChange}
              onSearch={handleSearch}
              value={searchText}
            />
          </Col>
        </Row>
        <ul
          style={{
            textAlign: "left",
            listStyle: "none",
            padding: "0",
            width: "100%",
          }}
        >
          {displayEmojis.map((emoji, index) => (
            <li key={index} onClick={() => handleEmojiClick(emoji)}>
              {emoji.name} - {decodeHtmlCode(emoji.htmlCode[0])}
            </li>
          ))}
        </ul>
        {selectedEmoji && (
          <div>
            <h3>Selected Emoji:</h3>
            <p>
              {selectedEmoji.name} - {decodeHtmlCode(selectedEmoji.htmlCode[0])}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
