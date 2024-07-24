const MessageComp = ({ user, message, currentUserId, userId }) => {
  if (user) {
    return (
      <div
        className={
          currentUserId === userId
            ? "flex justify-end m-2"
            : "flex justify-start m-2"
        }
      >
        <p
          className={
            currentUserId === userId
              ? "bg-green-400 w-1/2 pl-3 pt-3 pb-3 mb-3 rounded-md"
              : "bg-blue-400 w-1/2 pl-3 pt-3 pb-3 mb-3  rounded-md"
          }
        >
          {currentUserId === userId ? "you" : user} : {message}
        </p>
      </div>
    );
  } else {
    return <div className="m-2 flex justify-center"> {message}</div>;
  }
};

export default MessageComp;
