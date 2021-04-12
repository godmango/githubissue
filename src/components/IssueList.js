import React, { useState, useEffect } from "react";
import { Media, Modal, Badge } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import Moment from "react-moment";

const IssueList = ({
  issues,
  comments,
  setShow,
  show,
  handleClickIssue,
  loadMorePls,
}) => {
  return (
    <ul className="list-unstyled">
      {issues.map((item) => (
        <Item
          key={item.id}
          item={item}
          show={show}
          setShow={setShow}
          comments={comments}
          handleClickIssue={handleClickIssue}
          loadMorePls={loadMorePls}
        />
      ))}
    </ul>
  );
};

const Item = ({
  item,
  comments,
  setShow,
  show,
  handleClickIssue,
  loadMorePls,
}) => {
  const commentArr = comments.map((item) => (
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
          <ReactMarkdown skipHtml>{item.body}</ReactMarkdown>
        </p>
      </Media.Body>
    </Media>
  ));

  return (
    <>
      <Media
        as="li"
        className="mt-4 listWords"
        onClick={() => handleClickIssue(item)}
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
            <ReactMarkdown skipHtml>
              {item.body.length <= 100 ? item.body : item.body.slice(0, 99)}
            </ReactMarkdown>
          </div>
          <span>
            Last update: <Moment fromNow>{item.updated_at}</Moment>
          </span>
          <div>
            {item.labels.map((item) => (
              <Badge key={item.id} variant="secondary">
                {item.name}
              </Badge>
            ))}
          </div>
        </Media.Body>
      </Media>
      <Modal className="modal" show={show}>
        <div className="modalTitle">
          <div className="buttonDiv">
            <button className="commentClose" onClick={() => setShow(false)}>
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
          <ReactMarkdown className="modalPics" skipHtml>
            {item.body}
          </ReactMarkdown>
          <hr />
          <div>
            <h2 className="commentsSpacing">Comments</h2>
            {commentArr}
          </div>
          <button onClick={loadMorePls}>load more</button>
        </div>
      </Modal>
    </>
  );
};

export default IssueList;
