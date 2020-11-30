import React, { useState, useEffect } from "react";
import { Media, Modal, Badge } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import Moment from "react-moment";

const IssueList = ({ issues }) => {
  return (
    <ul className="list-unstyled">
      {issues.map((item) => (
        <Item key={item.id} item={item} />
      ))}
    </ul>
  );
};

const Item = ({ item }) => {
  const [show, setShow] = useState(false);
  const [comments, setComments] = useState([]);
  const handleShow = (e) => {
    if (e === item.id) {
      setShow(true);
    }
  };
  const handleClose = () => {
    setShow(false);
  };
  useEffect(() => {
    const fetchCommentsData = async () => {
      try {
        let commentsURL = `https://api.github.com/repos/facebook/react/issues/${item.number}/comments`;
        console.log("comment URL", commentsURL);
        const res = await fetch(commentsURL);
        const data = await res.json();
        console.log("comment data", data);
        setComments(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCommentsData();
  }, [item]);

  return (
    <>
      <Media
        as="li"
        className="mt-4 listWords"
        onClick={() => handleShow(item.id)}
      >
        <img
          width={200}
          height={200}
          className="mr-3"
          src={item.user.avatar_url}
          alt="Generic placeholder"
        />
        <Media.Body>
          <h5 className="listWordDiv1">{item.title}</h5>
          <p className="thisP">#{item.number}</p>
          <div className="listWordDiv2">
            <ReactMarkdown>
              {item.body.length <= 100 ? item.body : item.body.slice(0, 99)}
            </ReactMarkdown>
          </div>
          <span>
            Last update: <Moment fromNow>{item.updated_at}</Moment>
          </span>
          <div>
            {item.labels.map((item) => (
              <Badge variant="secondary">{item.name}</Badge>
            ))}
          </div>
        </Media.Body>
      </Media>
      <Modal className="modal" show={show}>
        <div className="modalTitle">
          <div className="buttonDiv">
            <button className="commentClose" onClick={() => handleClose()}>
              {" "}
              X
            </button>
          </div>
          <h2>
            {item.title} #{item.number}
          </h2>
        </div>
        <div className="restHalf">
          <img
            width={64}
            height={64}
            className="mr-3 modalMainImg"
            src={item.user.avatar_url}
            alt="Generic placeholder"
          />
          {item.user.login}
          <ReactMarkdown className="modalPics">{item.body}</ReactMarkdown>
          <hr />
          <div>
            <h2 className="commentsSpacing">Comments</h2>
            {comments.map((item) => (
              <Media className="mediaBox" key={item.id}>
                <img
                  width={64}
                  height={64}
                  className="mr-3"
                  src={item.user.avatar_url}
                  alt="Generic placeholder"
                />
                <Media.Body>
                  <h5 className="commentTitle">{item.user.login}</h5>
                  <p>
                    <ReactMarkdown>{item.body}</ReactMarkdown>
                  </p>
                </Media.Body>
              </Media>
            ))}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default IssueList;
