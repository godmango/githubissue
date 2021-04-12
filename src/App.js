import React, { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { ClipLoader } from "react-spinners";
import Navbar from "./components/Navbar";
import PaginationBar from "./components/Pagination";
import IssueList from "./components/IssueList";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [owner, setOwner] = useState("");
  const [repo, setRepo] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [issues, setIssues] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [totalPageNum, setTotalPageNum] = useState(1);

  const [show, setShow] = useState(false);
  const [comments, setComments] = useState([]);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [commentsURL, setCommentsURL] = useState("");
  const [commentsPageNum, setCommentsPageNum] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.dir(e.target);
    let splitWords = e.target[0].value.split("/");
    console.log(e.target[0].value.split("/")[0]);
    console.log(e.target[0].value.split("/")[1]);
    if (splitWords.length === 2) {
      setOwner(splitWords[0]);
      setRepo(splitWords[1]);
    } else {
      alert("input in owner/repo format");
    }
  };

  useEffect(() => {
    if (!owner || !repo) return;
    const fetchIssueData = async () => {
      setLoading(true);
      try {
        const url = `https://api.github.com/repos/${owner}/${repo}/issues?page=${pageNum}&per_page=20`;
        const res = await fetch(url);
        const data = await res.json();
        console.log(data);
        if (res.status === 200) {
          const link = res.headers.get("link");
          if (link) {
            const getTotalPage = link.match(
              /page=(\d+)&per_page=\d+>; rel="last"/
            );
            if (getTotalPage) setTotalPageNum(Number(getTotalPage[1]));
          }
          setIssues(data);
          setErrorMessage("");
        } else {
          setErrorMessage(data.message);
          setIssues([]);
        }
      } catch (error) {
        setErrorMessage(error.message);
      }
      setLoading(false);
    };
    fetchIssueData();
  }, [owner, repo, pageNum]);

  // useEffect(() => {
  //   if (commentArr) setCommentArr2(commentArr.slice(0, 5));
  // }, [commentArr]);

  const loadMorePls = () => {
    setCommentsURL(
      `https://api.github.com/repos/${owner}/${repo}/issues/${
        selectedIssue.number
      }/comments?page=${commentsPageNum + 1}&per_page=5`
    );
    setCommentsPageNum(commentsPageNum + 1);
  };

  useEffect(() => {
    const fetchCommentsData = async () => {
      try {
        // console.log("comment URL", commentsURL);
        const res = await fetch(commentsURL);
        const data = await res.json();
        // console.log("comment data", data);
        setComments(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCommentsData();
  }, [commentsURL]);

  const handleClickIssue = (item) => {
    setSelectedIssue(item);
    setShow(true);
    setCommentsURL(
      `https://api.github.com/repos/${owner}/${repo}/issues/${item.number}/comments?page=1&per_page=5`
    );
  };

  return (
    <div className="theWholeThing">
      <Navbar handleSubmit={handleSubmit} />
      <Container className="theContainer">
        <PaginationBar
          pageNum={pageNum}
          setPageNum={setPageNum}
          totalPageNum={totalPageNum}
        />
        {loading ? (
          <ClipLoader color="#f86c6b" size={150} loading={true} />
        ) : (
          <IssueList
            issues={issues}
            show={show}
            setShow={setShow}
            comments={comments}
            handleClickIssue={handleClickIssue}
            loadMorePls={loadMorePls}
          />
        )}
      </Container>
    </div>
  );
};

export default App;
